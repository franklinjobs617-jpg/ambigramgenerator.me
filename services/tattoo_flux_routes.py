import os
import threading
import time
import uuid
import logging
from decimal import Decimal, InvalidOperation
from typing import Any, Dict, Optional, Tuple

import requests
from flask import Blueprint, jsonify, request

from services.flux2_service import Flux2Error, Flux2Service
from services.tattoo_quota_service import DailyGuestQuota


tattoo_flux_bp = Blueprint("tattoo_flux_bp", __name__)
_logger = logging.getLogger(__name__)

_guest_quota = DailyGuestQuota(
    daily_limit=int(os.getenv("AI_TATTOO_GUEST_DAILY_LIMIT", "2")),
    ttl_seconds=int(os.getenv("AI_TATTOO_GUEST_QUOTA_TTL_SECONDS", str(2 * 24 * 60 * 60))),
)
_flux_service = Flux2Service()

_auth_base_url = (os.getenv("AUTH_SERVICE_BASE_URL") or "https://api.ambigramgenerator.me").strip().rstrip("/")
_auth_user_path = (os.getenv("AUTH_GET_USER_PATH") or "/prod-api/g/getUser").strip()
_auth_consume_path = (os.getenv("AUTH_CONSUME_CREDITS_PATH") or "/prod-api/g/credits/consume").strip()
_auth_app_type = (os.getenv("AUTH_APP_TYPE") or "ambigr").strip()
_auth_consume_type = (os.getenv("AUTH_CONSUME_TYPE") or "8").strip()
_credits_1k = max(1, int(os.getenv("AI_TATTOO_CREDITS_1K", "1")))
_credits_2k = max(_credits_1k, int(os.getenv("AI_TATTOO_CREDITS_2K", "2")))
_consume_reason = (os.getenv("AI_TATTOO_CONSUME_REASON") or "ai_tattoo_generate").strip()
_task_registry_ttl_seconds = max(300, int(os.getenv("AI_TATTOO_TASK_REGISTRY_TTL_SECONDS", str(2 * 60 * 60))))
_task_registry: Dict[str, Dict[str, Any]] = {}
_task_registry_lock = threading.Lock()


def _error_response(code: str, message: str, status: int, data: Optional[Dict[str, Any]] = None):
    payload: Dict[str, Any] = {
        "status": "failed",
        "code": code,
        "message": message,
    }
    if data is not None:
        payload["data"] = data
    return jsonify(payload), status


def _extract_auth_header() -> str:
    auth = (request.headers.get("Authorization") or "").strip()
    if auth:
        return auth
    raw = (request.headers.get("X-Auth-Token") or "").strip()
    if raw:
        return raw if raw.lower().startswith("bearer ") else f"Bearer {raw}"
    return ""


def _resolve_app_type() -> str:
    incoming = (
        request.headers.get("X-App-Type")
        or request.headers.get("X-Product-Type")
        or ""
    ).strip()
    return incoming or _auth_app_type


def _with_type_query(url: str, app_type: str) -> str:
    if not app_type:
        return url
    joiner = "&" if "?" in url else "?"
    return f"{url}{joiner}type={app_type}"


def _parse_response_json(resp: requests.Response) -> Dict[str, Any]:
    try:
        body = resp.json()
        return body if isinstance(body, dict) else {}
    except Exception:
        return {}


def _extract_user_payload(body: Dict[str, Any]) -> Dict[str, Any]:
    if not body:
        return {}
    if isinstance(body.get("data"), dict):
        return body["data"]
    return body


def _parse_credits(user_payload: Dict[str, Any]) -> int:
    raw = user_payload.get("credits")
    if raw is not None:
        value = str(raw).strip()
        if value:
            normalized = value.replace(",", "")
            try:
                parsed = Decimal(normalized)
                if not parsed.is_nan():
                    return max(0, int(parsed))
            except (InvalidOperation, ValueError):
                pass

    nested_user = user_payload.get("user")
    if isinstance(nested_user, dict) and "credits" in nested_user:
        return _parse_credits(nested_user)
    return 0


def _normalize_resolution(raw: Any) -> str:
    normalized = str(raw or "").strip().upper()
    return "2K" if normalized == "2K" else "1K"


def _credits_required(resolution: str) -> int:
    return _credits_2k if _normalize_resolution(resolution) == "2K" else _credits_1k


def _verify_paid_user(auth_header: str, app_type: str, required_credits: int, resolution: str) -> Tuple[bool, Optional[Dict[str, Any]], Optional[Tuple]]:
    if not auth_header:
        return False, None, None

    user_url = _with_type_query(f"{_auth_base_url}{_auth_user_path}", app_type)
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json",
    }
    if app_type:
        headers["X-App-Type"] = app_type
        headers["X-Product-Type"] = app_type
    try:
        user_resp = requests.get(
            user_url,
            headers=headers,
            timeout=15,
        )
    except requests.RequestException:
        return False, None, (_error_response("AUTH_SERVICE_UNAVAILABLE", "Unable to verify user now. Please retry.", 502))

    if user_resp.status_code >= 400:
        return False, None, (_error_response("LOGIN_REQUIRED", "Please log in to continue generating.", 401))

    user_body = _parse_response_json(user_resp)
    user_payload = _extract_user_payload(user_body)
    if not user_payload or not user_payload.get("email"):
        return False, None, (_error_response("LOGIN_REQUIRED", "Please log in to continue generating.", 401))

    credits = _parse_credits(user_payload)
    if credits < required_credits:
        return False, user_payload, (
            _error_response(
                "PAYMENT_REQUIRED",
                "Credits are insufficient. Please purchase credits to continue.",
                402,
                {
                    "currentCredits": credits,
                    "requiredCredits": required_credits,
                    "resolution": resolution,
                },
            )
        )

    return True, user_payload, None


def _consume_credit_request(
    auth_header: str,
    app_type: str,
    credits_to_consume: int,
    resolution: str,
) -> Tuple[int, Dict[str, Any]]:
    consume_url = _with_type_query(f"{_auth_base_url}{_auth_consume_path}", app_type)
    payload = {
        "amount": credits_to_consume,
        "reason": _consume_reason,
        "idempotencyKey": str(uuid.uuid4()),
        "type": _auth_consume_type,
        "metadata": {
            "tool": "ai_tattoo_generator",
            "source": "flux2",
            "appType": app_type,
            "resolution": resolution,
        },
    }
    headers = {
        "Authorization": auth_header,
        "Content-Type": "application/json",
    }
    if app_type:
        headers["X-App-Type"] = app_type
        headers["X-Product-Type"] = app_type

    resp = requests.post(
        consume_url,
        headers=headers,
        json=payload,
        timeout=20,
    )
    return resp.status_code, _parse_response_json(resp)


def _consume_credit_async(
    auth_header: str,
    app_type: str,
    credits_to_consume: int,
    resolution: str,
) -> None:
    try:
        status_code, body = _consume_credit_request(
            auth_header=auth_header,
            app_type=app_type,
            credits_to_consume=credits_to_consume,
            resolution=resolution,
        )
        if status_code >= 400:
            _logger.warning(
                "Async credit consume failed. status=%s appType=%s resolution=%s body=%s",
                status_code,
                app_type,
                resolution,
                body,
            )
    except Exception as exc:
        _logger.exception("Async credit consume error: %s", exc)


def _cleanup_task_registry_unlocked(now_ts: float) -> None:
    stale = []
    for key, payload in _task_registry.items():
        expires_at = float(payload.get("expiresAt", 0))
        if expires_at and now_ts >= expires_at:
            stale.append(key)
    for key in stale:
        _task_registry.pop(key, None)


def _save_task_meta(task_id: str, payload: Dict[str, Any]) -> None:
    now_ts = time.time()
    with _task_registry_lock:
        _cleanup_task_registry_unlocked(now_ts)
        payload["expiresAt"] = now_ts + _task_registry_ttl_seconds
        _task_registry[task_id] = payload


def _read_task_meta(task_id: str) -> Optional[Dict[str, Any]]:
    now_ts = time.time()
    with _task_registry_lock:
        _cleanup_task_registry_unlocked(now_ts)
        record = _task_registry.get(task_id)
        if not isinstance(record, dict):
            return None
        return dict(record)


def _update_task_meta(task_id: str, fields: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    now_ts = time.time()
    with _task_registry_lock:
        _cleanup_task_registry_unlocked(now_ts)
        record = _task_registry.get(task_id)
        if not isinstance(record, dict):
            return None
        record.update(fields)
        record["expiresAt"] = now_ts + _task_registry_ttl_seconds
        _task_registry[task_id] = record
        return dict(record)


def _build_access_payload(meta: Optional[Dict[str, Any]]) -> Dict[str, Any]:
    if not isinstance(meta, dict):
        return {}
    access: Dict[str, Any] = {
        "mode": meta.get("accessMode") or "guest",
        "resolution": meta.get("resolution") or "1K",
        "creditsUsed": int(meta.get("requiredCredits") or 0),
    }
    if meta.get("userEmail"):
        access["userEmail"] = meta.get("userEmail")
    if meta.get("remainingCredits") is not None:
        access["remainingCredits"] = meta.get("remainingCredits")
    if meta.get("debitStatus"):
        access["debitStatus"] = meta.get("debitStatus")
    if isinstance(meta.get("guestQuota"), dict):
        access["guestQuota"] = meta.get("guestQuota")
    return access


def _consume_credit_async_for_task(
    task_id: str,
    auth_header: str,
    app_type: str,
    credits_to_consume: int,
    resolution: str,
) -> None:
    status = "failed"
    body: Dict[str, Any] = {}
    status_code = 500
    try:
        status_code, body = _consume_credit_request(
            auth_header=auth_header,
            app_type=app_type,
            credits_to_consume=credits_to_consume,
            resolution=resolution,
        )
        status = "completed" if status_code < 400 else "failed"
    except Exception as exc:
        _logger.exception("Async credit consume error for task %s: %s", task_id, exc)
    finally:
        _update_task_meta(task_id, {"debitStatus": status, "authHeader": ""})
        if status != "completed":
            _logger.warning(
                "Async credit consume failed for task %s. status=%s code=%s body=%s",
                task_id,
                status,
                status_code,
                body,
            )


@tattoo_flux_bp.route("/api/tattoo/flux/create", methods=["POST"])
def create_tattoo_flux_task():
    data = request.get_json(silent=True) or {}
    prompt = (data.get("prompt") or "").strip()
    style = (data.get("style") or "line-art").strip()
    placement = (data.get("placement") or "forearm").strip()
    size = (data.get("size") or "medium").strip()
    resolution = _normalize_resolution(data.get("resolution") or "1K")
    required_credits = _credits_required(resolution)

    if len(prompt) < 1:
        return _error_response("INVALID_PROMPT", "Prompt cannot be empty.", 400)

    auth_header = _extract_auth_header()
    app_type = _resolve_app_type()
    quota_info: Optional[Dict[str, Any]] = None
    access_mode = "guest"
    user_payload: Optional[Dict[str, Any]] = None
    guest_fingerprint: Optional[str] = None

    if auth_header:
        ok, user_payload, err = _verify_paid_user(auth_header, app_type, required_credits, resolution)
        if not ok:
            return err
        access_mode = "paid"
    else:
        guest_fingerprint = _guest_quota.build_fingerprint(request)
        allowed, quota_info = _guest_quota.reserve(guest_fingerprint)
        if not allowed:
            return _error_response(
                "GUEST_LIMIT_EXCEEDED",
                "Free guest attempts reached. Please log in and purchase credits.",
                429,
                quota_info,
            )

    try:
        task_id = _flux_service.create_task(
            prompt=prompt,
            style=style,
            placement=placement,
            size=size,
            resolution=resolution,
        )
    except Flux2Error as exc:
        if guest_fingerprint:
            _guest_quota.rollback(guest_fingerprint)
        return _error_response(exc.code, exc.message, exc.status_code)
    except Exception as exc:
        if guest_fingerprint:
            _guest_quota.rollback(guest_fingerprint)
        return _error_response("GENERATION_FAILED", str(exc), 500)

    remaining_credits: Optional[int] = None
    debit_status: Optional[str] = None
    if access_mode == "paid":
        debit_status = "pending"
        if user_payload:
            current_credits = _parse_credits(user_payload)
            remaining_credits = max(0, current_credits - required_credits)

    _save_task_meta(
        task_id,
        {
            "accessMode": access_mode,
            "resolution": resolution,
            "requiredCredits": required_credits,
            "guestQuota": quota_info,
            "guestFingerprint": guest_fingerprint,
            "guestRolledBack": False,
            "appType": app_type,
            "authHeader": auth_header if access_mode == "paid" else "",
            "userEmail": (user_payload or {}).get("email"),
            "remainingCredits": remaining_credits,
            "debitStatus": debit_status,
            "debitStarted": False,
        },
    )

    access_payload = _build_access_payload(_read_task_meta(task_id))
    response_payload: Dict[str, Any] = {
        "jobId": task_id,
        "status": "queued",
        "pollAfterMs": 1200,
        "access": access_payload,
    }
    return jsonify(response_payload)


@tattoo_flux_bp.route("/api/tattoo/flux/tryon/create", methods=["POST"])
def create_tattoo_flux_tryon_task():
    data = request.get_json(silent=True) or {}
    prompt = (data.get("prompt") or "").strip()
    style = (data.get("style") or "line-art").strip()
    placement = (data.get("placement") or "forearm").strip()
    size = (data.get("size") or "medium").strip()
    resolution = _normalize_resolution(data.get("resolution") or "1K")
    body_image = str(data.get("bodyImage") or "").strip()
    tattoo_image = str(data.get("tattooImage") or "").strip()
    required_credits = _credits_required(resolution)

    if not body_image:
        return _error_response("INVALID_BODY_IMAGE", "Body image is required.", 400)
    if not tattoo_image:
        return _error_response("INVALID_TATTOO_IMAGE", "Tattoo image is required.", 400)

    auth_header = _extract_auth_header()
    app_type = _resolve_app_type()
    quota_info: Optional[Dict[str, Any]] = None
    access_mode = "guest"
    user_payload: Optional[Dict[str, Any]] = None
    guest_fingerprint: Optional[str] = None

    if auth_header:
        ok, user_payload, err = _verify_paid_user(auth_header, app_type, required_credits, resolution)
        if not ok:
            return err
        access_mode = "paid"
    else:
        guest_fingerprint = _guest_quota.build_fingerprint(request)
        allowed, quota_info = _guest_quota.reserve(guest_fingerprint)
        if not allowed:
            return _error_response(
                "GUEST_LIMIT_EXCEEDED",
                "Free guest attempts reached. Please log in and purchase credits.",
                429,
                quota_info,
            )

    try:
        task_id = _flux_service.create_image_to_image_task(
            body_image=body_image,
            tattoo_image=tattoo_image,
            prompt=prompt,
            style=style,
            placement=placement,
            size=size,
            resolution=resolution,
        )
    except Flux2Error as exc:
        if guest_fingerprint:
            _guest_quota.rollback(guest_fingerprint)
        return _error_response(exc.code, exc.message, exc.status_code)
    except Exception as exc:
        if guest_fingerprint:
            _guest_quota.rollback(guest_fingerprint)
        return _error_response("TRYON_CREATE_FAILED", str(exc), 500)

    remaining_credits: Optional[int] = None
    debit_status: Optional[str] = None
    if access_mode == "paid":
        debit_status = "pending"
        if user_payload:
            current_credits = _parse_credits(user_payload)
            remaining_credits = max(0, current_credits - required_credits)

    _save_task_meta(
        task_id,
        {
            "jobType": "image_to_image",
            "accessMode": access_mode,
            "resolution": resolution,
            "requiredCredits": required_credits,
            "guestQuota": quota_info,
            "guestFingerprint": guest_fingerprint,
            "guestRolledBack": False,
            "appType": app_type,
            "authHeader": auth_header if access_mode == "paid" else "",
            "userEmail": (user_payload or {}).get("email"),
            "remainingCredits": remaining_credits,
            "debitStatus": debit_status,
            "debitStarted": False,
        },
    )

    access_payload = _build_access_payload(_read_task_meta(task_id))
    response_payload: Dict[str, Any] = {
        "jobId": task_id,
        "status": "queued",
        "pollAfterMs": 1100,
        "access": access_payload,
    }
    return jsonify(response_payload)


@tattoo_flux_bp.route("/api/tattoo/flux/status", methods=["GET"])
def get_tattoo_flux_status():
    task_id = (request.args.get("taskId") or request.args.get("jobId") or "").strip()
    if not task_id:
        return _error_response("INVALID_TASK_ID", "taskId is required.", 400)

    task_meta = _read_task_meta(task_id)

    try:
        task_state = _flux_service.get_task_state(task_id)
    except Flux2Error as exc:
        return _error_response(exc.code, exc.message, exc.status_code)
    except Exception as exc:
        return _error_response("GENERATION_STATUS_FAILED", str(exc), 500)

    status = (task_state.get("status") or "processing").strip().lower()
    if status == "completed":
        if task_meta and task_meta.get("accessMode") == "paid":
            should_start_debit = False
            fresh_meta = _read_task_meta(task_id) or {}
            if not fresh_meta.get("debitStarted"):
                _update_task_meta(task_id, {"debitStarted": True, "debitStatus": "pending"})
                should_start_debit = True
                fresh_meta = _read_task_meta(task_id) or fresh_meta
            if should_start_debit:
                threading.Thread(
                    target=_consume_credit_async_for_task,
                    args=(
                        task_id,
                        str(fresh_meta.get("authHeader") or ""),
                        str(fresh_meta.get("appType") or _auth_app_type),
                        int(fresh_meta.get("requiredCredits") or 0),
                        str(fresh_meta.get("resolution") or "1K"),
                    ),
                    daemon=True,
                ).start()
            task_meta = _read_task_meta(task_id)

        response_payload: Dict[str, Any] = {
            "jobId": task_id,
            "status": "completed",
            "previewUrl": task_state.get("finalUrl"),
            "finalUrl": task_state.get("finalUrl"),
            "access": _build_access_payload(task_meta),
        }
        return jsonify(response_payload)

    if status == "failed":
        if task_meta and task_meta.get("accessMode") == "guest" and not task_meta.get("guestRolledBack"):
            fingerprint = str(task_meta.get("guestFingerprint") or "").strip()
            if fingerprint:
                _guest_quota.rollback(fingerprint)
            task_meta = _update_task_meta(task_id, {"guestRolledBack": True}) or task_meta

        response_payload = {
            "jobId": task_id,
            "status": "failed",
            "code": task_state.get("code") or "KIE_TASK_FAILED",
            "message": task_state.get("message") or "Generation failed.",
            "access": _build_access_payload(task_meta),
        }
        return jsonify(response_payload)

    response_payload = {
        "jobId": task_id,
        "status": "processing",
        "pollAfterMs": 1200,
        "access": _build_access_payload(task_meta),
    }
    return jsonify(response_payload)


@tattoo_flux_bp.route("/api/tattoo/flux/tryon/status", methods=["GET"])
def get_tattoo_flux_tryon_status():
    task_id = (request.args.get("taskId") or request.args.get("jobId") or "").strip()
    if not task_id:
        return _error_response("INVALID_TASK_ID", "taskId is required.", 400)

    task_meta = _read_task_meta(task_id)

    try:
        task_state = _flux_service.get_task_state(task_id)
    except Flux2Error as exc:
        return _error_response(exc.code, exc.message, exc.status_code)
    except Exception as exc:
        return _error_response("TRYON_STATUS_FAILED", str(exc), 500)

    status = (task_state.get("status") or "processing").strip().lower()
    if status == "completed":
        if task_meta and task_meta.get("accessMode") == "paid":
            should_start_debit = False
            fresh_meta = _read_task_meta(task_id) or {}
            if not fresh_meta.get("debitStarted"):
                _update_task_meta(task_id, {"debitStarted": True, "debitStatus": "pending"})
                should_start_debit = True
                fresh_meta = _read_task_meta(task_id) or fresh_meta
            if should_start_debit:
                threading.Thread(
                    target=_consume_credit_async_for_task,
                    args=(
                        task_id,
                        str(fresh_meta.get("authHeader") or ""),
                        str(fresh_meta.get("appType") or _auth_app_type),
                        int(fresh_meta.get("requiredCredits") or 0),
                        str(fresh_meta.get("resolution") or "1K"),
                    ),
                    daemon=True,
                ).start()
            task_meta = _read_task_meta(task_id)

        response_payload: Dict[str, Any] = {
            "jobId": task_id,
            "status": "completed",
            "previewUrl": task_state.get("finalUrl"),
            "finalUrl": task_state.get("finalUrl"),
            "access": _build_access_payload(task_meta),
        }
        return jsonify(response_payload)

    if status == "failed":
        if task_meta and task_meta.get("accessMode") == "guest" and not task_meta.get("guestRolledBack"):
            fingerprint = str(task_meta.get("guestFingerprint") or "").strip()
            if fingerprint:
                _guest_quota.rollback(fingerprint)
            task_meta = _update_task_meta(task_id, {"guestRolledBack": True}) or task_meta

        response_payload = {
            "jobId": task_id,
            "status": "failed",
            "code": task_state.get("code") or "KIE_TASK_FAILED",
            "message": task_state.get("message") or "Try-on generation failed.",
            "access": _build_access_payload(task_meta),
        }
        return jsonify(response_payload)

    response_payload = {
        "jobId": task_id,
        "status": "processing",
        "pollAfterMs": 1100,
        "access": _build_access_payload(task_meta),
    }
    return jsonify(response_payload)


@tattoo_flux_bp.route("/api/tattoo/flux/generate", methods=["POST"])
def generate_tattoo_flux():
    data = request.get_json(silent=True) or {}
    prompt = (data.get("prompt") or "").strip()
    style = (data.get("style") or "line-art").strip()
    placement = (data.get("placement") or "forearm").strip()
    size = (data.get("size") or "medium").strip()
    resolution = _normalize_resolution(data.get("resolution") or "1K")
    required_credits = _credits_required(resolution)

    if len(prompt) < 1:
        return _error_response("INVALID_PROMPT", "Prompt cannot be empty.", 400)

    auth_header = _extract_auth_header()
    app_type = _resolve_app_type()
    quota_info: Optional[Dict[str, Any]] = None
    access_mode = "guest"
    user_payload: Optional[Dict[str, Any]] = None
    guest_fingerprint: Optional[str] = None

    if auth_header:
        ok, user_payload, err = _verify_paid_user(auth_header, app_type, required_credits, resolution)
        if not ok:
            return err
        access_mode = "paid"
    else:
        guest_fingerprint = _guest_quota.build_fingerprint(request)
        allowed, quota_info = _guest_quota.reserve(guest_fingerprint)
        if not allowed:
            return _error_response(
                "GUEST_LIMIT_EXCEEDED",
                "Free guest attempts reached. Please log in and purchase credits.",
                429,
                quota_info,
            )

    try:
        result = _flux_service.create_and_wait(
            prompt=prompt,
            style=style,
            placement=placement,
            size=size,
            resolution=resolution,
        )
    except Flux2Error as exc:
        if guest_fingerprint:
            _guest_quota.rollback(guest_fingerprint)
        return _error_response(exc.code, exc.message, exc.status_code)
    except Exception as exc:
        if guest_fingerprint:
            _guest_quota.rollback(guest_fingerprint)
        return _error_response("GENERATION_FAILED", str(exc), 500)

    remaining_credits: Optional[int] = None
    debit_status: Optional[str] = None
    if access_mode == "paid":
        # Return image immediately, then deduct credits in background to improve UX latency.
        threading.Thread(
            target=_consume_credit_async,
            args=(auth_header, app_type, required_credits, resolution),
            daemon=True,
        ).start()
        debit_status = "pending"
        if user_payload:
            current_credits = _parse_credits(user_payload)
            remaining_credits = max(0, current_credits - required_credits)

    response_payload: Dict[str, Any] = {
        "jobId": result.get("taskId"),
        "status": "completed",
        "previewUrl": result.get("finalUrl"),
        "finalUrl": result.get("finalUrl"),
        "access": {
            "mode": access_mode,
            "resolution": resolution,
            "creditsUsed": required_credits,
        },
    }
    if quota_info is not None:
        response_payload["access"]["guestQuota"] = quota_info
    if user_payload and user_payload.get("email"):
        response_payload["access"]["userEmail"] = user_payload.get("email")
    if remaining_credits is not None:
        response_payload["access"]["remainingCredits"] = remaining_credits
    if debit_status:
        response_payload["access"]["debitStatus"] = debit_status

    return jsonify(response_payload)
