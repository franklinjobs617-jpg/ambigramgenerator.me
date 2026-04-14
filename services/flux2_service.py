import base64
import json
import os
import re
import time
from typing import Any, Dict, List, Optional

import requests


class Flux2Error(Exception):
    def __init__(self, message: str, code: str = "FLUX2_ERROR", status_code: int = 500):
        super().__init__(message)
        self.message = message
        self.code = code
        self.status_code = status_code


class Flux2Service:
    def __init__(self):
        self.api_key = "8aafc2f52f715e83cbfc4664413a77ac"
        self.base_url = (os.getenv("KIE_API_BASE_URL") or "https://api.kie.ai").strip().rstrip("/")
        self.create_path = (os.getenv("KIE_CREATE_TASK_PATH") or "/api/v1/jobs/createTask").strip()
        self.detail_path = (os.getenv("KIE_RECORD_INFO_PATH") or "/api/v1/jobs/recordInfo").strip()
        self.model_name = (os.getenv("KIE_FLUX2_MODEL") or "flux-2/pro-text-to-image").strip()
        self.image_to_image_model_name = (os.getenv("KIE_FLUX2_I2I_MODEL") or "flux-2/flex-image-to-image").strip()
        self.file_upload_base_url = (os.getenv("KIE_FILE_UPLOAD_BASE_URL") or "https://kieai.redpandaai.co").strip().rstrip("/")
        self.file_upload_url_path = (os.getenv("KIE_FILE_UPLOAD_URL_PATH") or "/api/file-url-upload").strip()
        self.file_upload_stream_path = (os.getenv("KIE_FILE_UPLOAD_STREAM_PATH") or "/api/file-stream-upload").strip()
        self.file_upload_path_prefix = (os.getenv("KIE_FILE_UPLOAD_PATH_PREFIX") or "images/ai-tattoo-generator").strip()
        self.force_upload_remote_urls = self._env_bool("KIE_FORCE_UPLOAD_REMOTE_URLS", False)
        self.enable_negative_prompt = self._env_bool("KIE_ENABLE_NEGATIVE_PROMPT", False)
        self.nsfw_checker = False
        self.timeout_seconds = max(20, int(os.getenv("KIE_TASK_TIMEOUT_SECONDS", "120")))
        # Faster perceived result return after task completion.
        self.poll_interval_seconds = max(1, int(os.getenv("KIE_TASK_POLL_INTERVAL_SECONDS", "1")))
        # Reuse HTTP connections to reduce TLS and handshake overhead on polling.
        self.session = requests.Session()
        self.success_states = {"success", "succeeded", "completed", "done", "finish", "finished"}
        self.processing_states = {
            "waiting",
            "queuing",
            "queued",
            "pending",
            "processing",
            "generating",
            "running",
            "in_progress",
            "submitted",
            "unknown",
        }
        self.failure_states = {"fail", "failed", "error", "canceled", "cancelled", "timeout"}

    @staticmethod
    def _env_bool(name: str, default: bool = False) -> bool:
        raw = str(os.getenv(name, "true" if default else "false")).strip().lower()
        return raw in {"1", "true", "yes", "y", "on"}

    def _headers(self) -> Dict[str, str]:
        if not self.api_key:
            raise Flux2Error("Missing KIE_API_KEY.", "CONFIG_MISSING_KIE_KEY", 500)
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def _auth_headers(self) -> Dict[str, str]:
        if not self.api_key:
            raise Flux2Error("Missing KIE_API_KEY.", "CONFIG_MISSING_KIE_KEY", 500)
        return {
            "Authorization": f"Bearer {self.api_key}",
        }

    @staticmethod
    def _normalize_style(style: str) -> str:
        mapping = {
            "line-art": "fine line",
            "traditional": "traditional",
            "minimal": "minimalist",
            "blackwork": "blackwork",
        }
        return mapping.get((style or "").strip(), (style or "tattoo").strip())

    @staticmethod
    def _style_profile(style: str) -> Dict[str, str]:
        normalized = (style or "").strip().lower()
        profiles: Dict[str, Dict[str, str]] = {
            "line-art": {
                "name": "fine line",
                "linework": "ultra-clean contour lines, minimal shading",
                "texture": "smooth and precise strokes",
            },
            "traditional": {
                "name": "traditional tattoo flash",
                "linework": "bold black outlines with strong shape readability",
                "texture": "solid fills and classic flash contrast",
            },
            "minimal": {
                "name": "minimalist",
                "linework": "simple and elegant line hierarchy",
                "texture": "sparse details with intentional negative space",
            },
            "blackwork": {
                "name": "blackwork",
                "linework": "dense blacks with powerful silhouette",
                "texture": "high-density fill balanced by clean negative space",
            },
        }
        return profiles.get(
            normalized,
            {
                "name": "tattoo design",
                "linework": "clean stencil-ready linework",
                "texture": "controlled contrast",
            },
        )

    @staticmethod
    def _clean_prompt_text(prompt: str) -> str:
        return re.sub(r"\s+", " ", (prompt or "").strip())

    @staticmethod
    def _placement_layout_hint(placement: str) -> str:
        normalized = (placement or "").strip().lower()
        elongated = {"forearm", "ribs"}
        wide = {"chest", "back", "shoulder"}
        compact = {"ankle", "wrist", "neck"}
        if normalized in elongated:
            return "elongated vertical flash layout"
        if normalized in wide:
            return "wide balanced flash layout"
        if normalized in compact:
            return "compact emblem-like flash layout"
        return "balanced centered flash layout"

    @staticmethod
    def _size_density_hint(size: str) -> str:
        normalized = (size or "").strip().lower()
        if normalized in {"small", "s"}:
            return "low visual density with clear silhouette at small scale"
        if normalized in {"large", "l"}:
            return "high-detail structure with strong readability at large scale"
        return "medium detail density with clear readable hierarchy"

    @staticmethod
    def _has_explicit_color_intent(prompt: str) -> bool:
        text = (prompt or "").lower()
        if not text:
            return False
        color_keywords = (
            "color",
            "colour",
            "colored",
            "red",
            "blue",
            "green",
            "yellow",
            "orange",
            "purple",
            "pink",
            "gold",
            "silver",
            "watercolor",
        )
        return any(keyword in text for keyword in color_keywords)

    def _color_guidance(self, prompt: str, style: str) -> str:
        if self._has_explicit_color_intent(prompt):
            return "preserve the user-requested color intent with tattoo-friendly contrast"
        normalized_style = (style or "").strip().lower()
        if normalized_style in {"line-art", "minimal", "blackwork"}:
            return "black and grey ink only"
        if normalized_style == "traditional":
            return "bold tattoo color palette with strong black outlines"
        return "controlled tattoo-ready color palette"

    @staticmethod
    def _aspect_ratio_by_size(size: str) -> str:
        # Keep square output by product decision.
        _ = size
        return "1:1"

    @staticmethod
    def _normalize_resolution(resolution: str) -> str:
        normalized = (resolution or "").strip().upper()
        return "2K" if normalized == "2K" else "1K"

    @staticmethod
    def _looks_like_simple_prompt(prompt: str) -> bool:
        text = (prompt or "").strip()
        if not text:
            return False
        tokens = [token for token in re.split(r"\s+", text) if token]
        return len(tokens) <= 3 and len(text) <= 24

    @staticmethod
    def _join_prompt_segments(segments: List[str]) -> str:
        return ", ".join([segment.strip() for segment in segments if segment and segment.strip()])

    def _build_prompt(self, prompt: str, style: str, placement: str, size: str) -> str:
        base = self._clean_prompt_text(prompt)
        if self._looks_like_simple_prompt(base):
            keyword = re.sub(r"\s+", " ", base).strip().strip("\"'")
            base = f"{keyword} tattoo concept"
        style_profile = self._style_profile(style)
        layout_hint = self._placement_layout_hint(placement)
        density_hint = self._size_density_hint(size)
        color_text = self._color_guidance(base, style)
        segments = [
            f"subject {base}",
            "2D tattoo flash sheet design",
            f"style {style_profile['name']}",
            style_profile["linework"],
            style_profile["texture"],
            layout_hint,
            density_hint,
            f"color guidance {color_text}",
            "stencil-ready",
            "high contrast",
            "crisp edges",
            "clean negative space",
            "isolated design",
            "pure white background",
        ]
        return self._join_prompt_segments(segments)

    def _build_t2i_negative_prompt(self) -> str:
        segments = [
            "skin",
            "arm",
            "body",
            "person",
            "face",
            "photo background",
            "realistic photography",
            "mockup",
            "watermark",
            "logo",
            "text overlay",
            "signature",
            "frame",
            "low quality",
            "blurry",
        ]
        return self._join_prompt_segments(segments)

    def _build_create_payload(self, *, prompt: str, style: str, placement: str, size: str, resolution: str) -> Dict[str, Any]:
        composed_prompt = self._build_prompt(prompt, style, placement, size)
        negative_prompt = self._build_t2i_negative_prompt()
        aspect_ratio = self._aspect_ratio_by_size(size)
        normalized_resolution = self._normalize_resolution(resolution)
        input_payload = {
            "prompt": composed_prompt,
            "aspect_ratio": aspect_ratio,
            "resolution": normalized_resolution,
            "nsfw_checker": self.nsfw_checker,
        }
        if self.enable_negative_prompt and negative_prompt:
            input_payload["negative_prompt"] = negative_prompt
        return {
            "model": self.model_name,
            "callBackUrl": "",
            "input": input_payload,
        }

    def _build_i2i_prompt(self, prompt: str, style: str, placement: str, size: str) -> str:
        base_prompt = self._clean_prompt_text(prompt)
        if not base_prompt:
            base_prompt = "Refine the tattoo try-on result with realistic skin rendering."
        style_profile = self._style_profile(style)
        placement_text = (placement or "forearm").strip()
        density_hint = self._size_density_hint(size)
        color_text = self._color_guidance(base_prompt, style)
        segments = [
            "realistic tattoo try-on render",
            f"user intent {base_prompt}",
            "image 1 is body photo",
            "image 2 is tattoo design reference",
            f"apply tattoo on {placement_text}",
            "preserve tattoo structure from reference",
            f"style {style_profile['name']}",
            style_profile["linework"],
            density_hint,
            f"color guidance {color_text}",
            "match skin texture and lighting naturally",
            "keep identity and background stable",
            "no extra symbols",
            "no extra text",
            "no logo",
            "no watermark",
        ]
        return self._join_prompt_segments(segments)

    def _build_i2i_negative_prompt(self) -> str:
        segments = [
            "duplicate tattoo",
            "extra limbs",
            "distorted anatomy",
            "deformed skin texture",
            "heavy blur",
            "watermark",
            "logo",
            "text",
            "new random symbols",
        ]
        return self._join_prompt_segments(segments)

    def _build_i2i_create_payload(
        self,
        *,
        prompt: str,
        style: str,
        placement: str,
        size: str,
        resolution: str,
        input_urls: List[str],
    ) -> Dict[str, Any]:
        normalized_resolution = self._normalize_resolution(resolution)
        aspect_ratio = self._aspect_ratio_by_size(size)
        negative_prompt = self._build_i2i_negative_prompt()
        input_payload = {
            "prompt": self._build_i2i_prompt(prompt, style, placement, size),
            "input_urls": input_urls,
            "aspect_ratio": aspect_ratio,
            "resolution": normalized_resolution,
            "nsfw_checker": self.nsfw_checker,
        }
        if self.enable_negative_prompt and negative_prompt:
            input_payload["negative_prompt"] = negative_prompt
        return {
            "model": self.image_to_image_model_name,
            "callBackUrl": "",
            "input": input_payload,
        }

    @staticmethod
    def _extract_task_id(payload: Dict[str, Any]) -> Optional[str]:
        candidates = [
            payload.get("taskId"),
            payload.get("task_id"),
            payload.get("id"),
        ]
        data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
        candidates.extend([data.get("taskId"), data.get("task_id"), data.get("id")])
        for value in candidates:
            if isinstance(value, str) and value.strip():
                return value.strip()
            if isinstance(value, (int, float)) and str(value).strip():
                return str(value).strip()
        return None

    @staticmethod
    def _extract_status(payload: Dict[str, Any]) -> str:
        data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
        for key in ("status", "state", "taskStatus"):
            value = data.get(key) if key in data else payload.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip().lower()
        return "unknown"

    @staticmethod
    def _extract_code(payload: Dict[str, Any]) -> Optional[int]:
        raw = payload.get("code")
        if raw is None:
            return None
        try:
            return int(str(raw).strip())
        except Exception:
            return None

    @staticmethod
    def _is_success_code(payload: Dict[str, Any]) -> bool:
        code = Flux2Service._extract_code(payload)
        return code in (None, 200)

    @staticmethod
    def _extract_image_url(payload: Dict[str, Any]) -> Optional[str]:
        data = payload.get("data") if isinstance(payload.get("data"), dict) else {}

        result_json = data.get("resultJson")
        if isinstance(result_json, str):
            try:
                result_json = json.loads(result_json)
            except Exception:
                result_json = None

        if isinstance(result_json, dict):
            for key in ("imageUrl", "image_url", "url"):
                value = result_json.get(key)
                if isinstance(value, str) and value.strip():
                    return value.strip()
            for key in ("resultUrls", "images", "output", "urls"):
                arr = result_json.get(key)
                if isinstance(arr, list) and arr and isinstance(arr[0], str):
                    return arr[0].strip()
            nested = result_json.get("result")
            if isinstance(nested, dict):
                for key in ("url", "imageUrl", "image_url"):
                    value = nested.get(key)
                    if isinstance(value, str) and value.strip():
                        return value.strip()

        for key in ("resultUrls", "images", "output", "urls"):
            arr = data.get(key)
            if isinstance(arr, list) and arr and isinstance(arr[0], str):
                return arr[0].strip()
        for key in ("imageUrl", "image_url", "url"):
            value = data.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip()
        return None

    @staticmethod
    def _extract_error_message(payload: Dict[str, Any]) -> str:
        for key in ("message", "msg", "error", "reason", "failMsg"):
            value = payload.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip()
        data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
        for key in ("message", "msg", "error", "reason", "failMsg"):
            value = data.get(key)
            if isinstance(value, str) and value.strip():
                return value.strip()
        return "Task failed."

    @staticmethod
    def _extract_uploaded_file_url(payload: Dict[str, Any]) -> Optional[str]:
        if not isinstance(payload, dict):
            return None
        data = payload.get("data") if isinstance(payload.get("data"), dict) else {}
        for container in (payload, data):
            for key in ("fileUrl", "downloadUrl", "url"):
                value = container.get(key)
                if isinstance(value, str) and value.strip():
                    return value.strip()
        return None

    @staticmethod
    def _looks_like_data_url(value: str) -> bool:
        return value.startswith("data:") and ";base64," in value

    @staticmethod
    def _looks_like_remote_url(value: str) -> bool:
        lowered = value.lower()
        return lowered.startswith("http://") or lowered.startswith("https://")

    def _upload_remote_url(self, source_url: str, upload_path: str) -> str:
        endpoint = f"{self.file_upload_base_url}{self.file_upload_url_path}"
        payload = {
            "fileUrl": source_url,
            "uploadPath": upload_path,
        }
        try:
            response = self.session.post(endpoint, headers=self._headers(), json=payload, timeout=30)
        except requests.RequestException as exc:
            raise Flux2Error(f"Kie file-url upload failed: {exc}", "KIE_UPLOAD_REQUEST_FAILED", 502) from exc

        try:
            body = response.json() if response.text else {}
        except Exception as exc:
            raise Flux2Error("Kie file-url upload returned invalid JSON.", "KIE_UPLOAD_BAD_JSON", 502) from exc

        if response.status_code >= 400:
            message = self._extract_error_message(body if isinstance(body, dict) else {})
            raise Flux2Error(
                f"Kie file-url upload failed ({response.status_code}): {message}",
                "KIE_UPLOAD_FAILED",
                502,
            )
        if not isinstance(body, dict) or not self._is_success_code(body):
            message = self._extract_error_message(body if isinstance(body, dict) else {})
            raise Flux2Error(f"Kie file-url upload rejected: {message}", "KIE_UPLOAD_REJECTED", 502)

        uploaded_url = self._extract_uploaded_file_url(body)
        if not uploaded_url:
            raise Flux2Error("Kie file-url upload did not return file URL.", "KIE_UPLOAD_NO_URL", 502)
        return uploaded_url

    @staticmethod
    def _parse_data_url(source_data: str) -> Dict[str, Any]:
        matched = re.match(r"^data:([^;]+);base64,(.+)$", source_data, flags=re.IGNORECASE | re.DOTALL)
        if not matched:
            raise Flux2Error("Invalid data URL format.", "KIE_UPLOAD_INVALID_DATA_URL", 400)

        mime_type = (matched.group(1) or "image/png").strip().lower()
        payload = (matched.group(2) or "").strip()
        if not payload:
            raise Flux2Error("Data URL payload is empty.", "KIE_UPLOAD_EMPTY_DATA", 400)

        try:
            raw_bytes = base64.b64decode(payload, validate=True)
        except Exception as exc:
            raise Flux2Error("Data URL base64 decode failed.", "KIE_UPLOAD_DECODE_FAILED", 400) from exc

        if not raw_bytes:
            raise Flux2Error("Decoded image bytes are empty.", "KIE_UPLOAD_EMPTY_BYTES", 400)

        return {
            "mimeType": mime_type,
            "bytes": raw_bytes,
        }

    def _upload_stream_data(self, source_data: str, upload_path: str, file_name: str) -> str:
        endpoint = f"{self.file_upload_base_url}{self.file_upload_stream_path}"
        parsed = self._parse_data_url(source_data)
        mime_type = str(parsed.get("mimeType") or "image/png")
        raw_bytes = parsed.get("bytes")
        if not isinstance(raw_bytes, (bytes, bytearray)):
            raise Flux2Error("Decoded image bytes are invalid.", "KIE_UPLOAD_INVALID_BYTES", 400)

        data = {
            "uploadPath": upload_path,
        }
        files = {
            "file": (file_name, bytes(raw_bytes), mime_type),
        }
        try:
            response = self.session.post(endpoint, headers=self._auth_headers(), data=data, files=files, timeout=40)
        except requests.RequestException as exc:
            raise Flux2Error(f"Kie file-stream upload failed: {exc}", "KIE_UPLOAD_REQUEST_FAILED", 502) from exc

        try:
            body = response.json() if response.text else {}
        except Exception as exc:
            raise Flux2Error("Kie file-stream upload returned invalid JSON.", "KIE_UPLOAD_BAD_JSON", 502) from exc

        if response.status_code >= 400:
            message = self._extract_error_message(body if isinstance(body, dict) else {})
            raise Flux2Error(
                f"Kie file-stream upload failed ({response.status_code}): {message}",
                "KIE_UPLOAD_FAILED",
                502,
            )
        if not isinstance(body, dict) or not self._is_success_code(body):
            message = self._extract_error_message(body if isinstance(body, dict) else {})
            raise Flux2Error(f"Kie file-stream upload rejected: {message}", "KIE_UPLOAD_REJECTED", 502)

        uploaded_url = self._extract_uploaded_file_url(body)
        if not uploaded_url:
            raise Flux2Error("Kie file-stream upload did not return file URL.", "KIE_UPLOAD_NO_URL", 502)
        return uploaded_url

    def _normalize_input_image(self, value: str, label: str) -> str:
        source = (value or "").strip()
        if not source:
            raise Flux2Error(f"{label} image is required.", "KIE_INPUT_IMAGE_MISSING", 400)

        upload_path = f"{self.file_upload_path_prefix}/{label}"
        file_name = f"{label}-{int(time.time() * 1000)}.png"

        if self._looks_like_data_url(source):
            return self._upload_stream_data(source, upload_path, file_name)

        if source.lower().startswith("blob:"):
            raise Flux2Error(
                f"{label} image blob URL is not accessible by backend. Please provide data URL or public URL.",
                "KIE_INPUT_BLOB_UNSUPPORTED",
                400,
            )

        if self._looks_like_remote_url(source):
            if self.force_upload_remote_urls:
                return self._upload_remote_url(source, upload_path)
            return source

        raise Flux2Error(
            f"{label} image must be a data URL or public http(s) URL.",
            "KIE_INPUT_IMAGE_INVALID",
            400,
        )

    def create_task(self, *, prompt: str, style: str, placement: str, size: str, resolution: str = "1K") -> str:
        payload = self._build_create_payload(
            prompt=prompt,
            style=style,
            placement=placement,
            size=size,
            resolution=resolution,
        )
        url = f"{self.base_url}{self.create_path}"
        try:
            response = self.session.post(url, headers=self._headers(), json=payload, timeout=45)
        except requests.RequestException as exc:
            raise Flux2Error(f"Kie request failed: {exc}", "KIE_CREATE_REQUEST_FAILED", 502) from exc

        try:
            body = response.json() if response.text else {}
        except Exception as exc:
            raise Flux2Error("Kie create task returned invalid JSON.", "KIE_CREATE_BAD_JSON", 502) from exc

        if not isinstance(body, dict):
            raise Flux2Error("Kie create task response is invalid.", "KIE_CREATE_INVALID", 502)

        message = self._extract_error_message(body)
        if response.status_code >= 400:
            raise Flux2Error(
                f"Kie create task failed ({response.status_code}): {message}",
                "KIE_CREATE_FAILED",
                502,
            )

        if not self._is_success_code(body):
            raise Flux2Error(
                f"Kie create task rejected: {message}",
                "KIE_CREATE_REJECTED",
                502,
            )

        task_id = self._extract_task_id(body)
        if not task_id:
            raise Flux2Error(
                f"Kie create task did not return taskId. Response: {message}",
                "KIE_MISSING_TASK_ID",
                502,
            )
        return task_id

    def create_image_to_image_task(
        self,
        *,
        body_image: str,
        tattoo_image: str,
        prompt: str,
        style: str,
        placement: str,
        size: str,
        resolution: str = "1K",
    ) -> str:
        body_url = self._normalize_input_image(body_image, "body")
        tattoo_url = self._normalize_input_image(tattoo_image, "tattoo")
        payload = self._build_i2i_create_payload(
            prompt=prompt,
            style=style,
            placement=placement,
            size=size,
            resolution=resolution,
            input_urls=[body_url, tattoo_url],
        )

        url = f"{self.base_url}{self.create_path}"
        try:
            response = self.session.post(url, headers=self._headers(), json=payload, timeout=45)
        except requests.RequestException as exc:
            raise Flux2Error(f"Kie i2i create task failed: {exc}", "KIE_I2I_CREATE_REQUEST_FAILED", 502) from exc

        try:
            body = response.json() if response.text else {}
        except Exception as exc:
            raise Flux2Error("Kie i2i create task returned invalid JSON.", "KIE_I2I_CREATE_BAD_JSON", 502) from exc

        if not isinstance(body, dict):
            raise Flux2Error("Kie i2i create task response is invalid.", "KIE_I2I_CREATE_INVALID", 502)

        message = self._extract_error_message(body)
        if response.status_code >= 400:
            raise Flux2Error(
                f"Kie i2i create task failed ({response.status_code}): {message}",
                "KIE_I2I_CREATE_FAILED",
                502,
            )

        if not self._is_success_code(body):
            raise Flux2Error(
                f"Kie i2i create task rejected: {message}",
                "KIE_I2I_CREATE_REJECTED",
                502,
            )

        task_id = self._extract_task_id(body)
        if not task_id:
            raise Flux2Error(
                f"Kie i2i create task did not return taskId. Response: {message}",
                "KIE_I2I_MISSING_TASK_ID",
                502,
            )
        return task_id

    def get_task_detail(self, task_id: str) -> Dict[str, Any]:
        url = f"{self.base_url}{self.detail_path}"
        params = {"taskId": task_id}
        try:
            response = self.session.get(url, headers=self._headers(), params=params, timeout=30)
        except requests.RequestException as exc:
            raise Flux2Error(f"Kie polling failed: {exc}", "KIE_POLL_FAILED", 502) from exc

        try:
            body = response.json() if response.text else {}
        except Exception as exc:
            raise Flux2Error("Kie task detail returned invalid JSON.", "KIE_DETAIL_BAD_JSON", 502) from exc

        if not isinstance(body, dict):
            raise Flux2Error("Kie task detail response is invalid.", "KIE_DETAIL_INVALID", 502)

        message = self._extract_error_message(body)
        if response.status_code >= 400:
            raise Flux2Error(
                f"Kie task detail failed ({response.status_code}): {message}",
                "KIE_DETAIL_FAILED",
                502,
            )
        if not self._is_success_code(body):
            raise Flux2Error(
                f"Kie task detail rejected: {message}",
                "KIE_DETAIL_REJECTED",
                502,
            )
        return body

    def get_task_state(self, task_id: str) -> Dict[str, Any]:
        body = self.get_task_detail(task_id)
        status = self._extract_status(body)

        if status in self.success_states:
            image_url = self._extract_image_url(body)
            if not image_url:
                return {
                    "taskId": task_id,
                    "status": "failed",
                    "code": "KIE_NO_IMAGE_URL",
                    "message": "Kie task finished but image URL is empty.",
                }
            return {
                "taskId": task_id,
                "status": "completed",
                "finalUrl": image_url,
                "raw": body,
            }

        if status in self.failure_states:
            reason = self._extract_error_message(body)
            return {
                "taskId": task_id,
                "status": "failed",
                "code": "KIE_TASK_FAILED",
                "message": reason or "Task failed.",
                "raw": body,
            }

        if status not in self.processing_states:
            reason = self._extract_error_message(body)
            return {
                "taskId": task_id,
                "status": "failed",
                "code": "KIE_TASK_UNKNOWN",
                "message": reason or f"Unknown task status: {status}",
                "raw": body,
            }

        return {
            "taskId": task_id,
            "status": "processing",
            "raw": body,
        }

    def create_and_wait(self, *, prompt: str, style: str, placement: str, size: str, resolution: str = "1K") -> Dict[str, Any]:
        normalized_resolution = self._normalize_resolution(resolution)
        task_id = self.create_task(
            prompt=prompt,
            style=style,
            placement=placement,
            size=size,
            resolution=normalized_resolution,
        )
        started_at = time.time()
        while time.time() - started_at <= self.timeout_seconds:
            task_state = self.get_task_state(task_id)
            status = task_state.get("status")
            if status == "completed":
                return {
                    "taskId": task_id,
                    "status": "completed",
                    "finalUrl": task_state.get("finalUrl"),
                    "resolution": normalized_resolution,
                    "raw": task_state.get("raw"),
                }
            if status == "failed":
                raise Flux2Error(
                    str(task_state.get("message") or "Task failed."),
                    str(task_state.get("code") or "KIE_TASK_FAILED"),
                    502,
                )

            time.sleep(self.poll_interval_seconds)

        raise Flux2Error("Kie task timed out.", "KIE_TASK_TIMEOUT", 504)
