import hashlib
import threading
import time
from typing import Dict, Tuple
from urllib.parse import urlparse


class DailyGuestQuota:
    def __init__(self, daily_limit: int = 2, ttl_seconds: int = 2 * 24 * 60 * 60):
        self.daily_limit = max(1, int(daily_limit))
        self.ttl_seconds = max(60, int(ttl_seconds))
        self._usage: Dict[str, Dict[str, float]] = {}
        self._lock = threading.Lock()

    @staticmethod
    def _current_day() -> str:
        return time.strftime("%Y-%m-%d", time.localtime())

    @staticmethod
    def is_http_url(value: str) -> bool:
        if not value:
            return False
        try:
            parsed = urlparse(value.strip())
            return parsed.scheme in ("http", "https")
        except Exception:
            return False

    @staticmethod
    def build_fingerprint(req) -> str:
        xff = (req.headers.get("X-Forwarded-For") or "").strip()
        xri = (req.headers.get("X-Real-IP") or "").strip()
        remote = (req.remote_addr or "").strip()
        ip_part = (xff.split(",")[0].strip() if xff else (xri or remote or "0.0.0.0"))
        ua_part = (req.headers.get("User-Agent") or "").strip()
        raw = f"{ip_part}|{ua_part}"
        return hashlib.sha256(raw.encode("utf-8")).hexdigest()

    def _cleanup_unlocked(self, now_ts: float):
        stale = []
        for key, record in self._usage.items():
            updated_at = float(record.get("updated_at", 0))
            if now_ts - updated_at > self.ttl_seconds:
                stale.append(key)
        for key in stale:
            self._usage.pop(key, None)

    def reserve(self, fingerprint: str) -> Tuple[bool, Dict[str, int]]:
        now_ts = time.time()
        day = self._current_day()
        with self._lock:
            self._cleanup_unlocked(now_ts)
            record = self._usage.get(fingerprint) or {"day": day, "count": 0, "updated_at": now_ts}
            if record.get("day") != day:
                record["day"] = day
                record["count"] = 0
            used = int(record.get("count", 0))
            if used >= self.daily_limit:
                return False, {
                    "daily_limit": self.daily_limit,
                    "attempts_used": used,
                    "attempts_left": 0,
                }

            record["count"] = used + 1
            record["updated_at"] = now_ts
            self._usage[fingerprint] = record
            next_used = int(record["count"])
            return True, {
                "daily_limit": self.daily_limit,
                "attempts_used": next_used,
                "attempts_left": max(0, self.daily_limit - next_used),
            }

    def rollback(self, fingerprint: str) -> None:
        now_ts = time.time()
        day = self._current_day()
        with self._lock:
            record = self._usage.get(fingerprint)
            if not record:
                return
            if record.get("day") != day:
                return
            current = int(record.get("count", 0))
            if current <= 0:
                return
            record["count"] = current - 1
            record["updated_at"] = now_ts
            self._usage[fingerprint] = record

