"""Ticker → company name from the SEC's public company list.

Needs no API key. SEC asks automated clients to send a descriptive
User-Agent. The list (~10k rows) is cached in memory for a day."""

from __future__ import annotations

import time

import httpx
from loguru import logger

URL = "https://www.sec.gov/files/company_tickers.json"
USER_AGENT = "FinSentimentAI/1.0 (contact: admin@finsentiment.local)"
CACHE_TTL_SECONDS = 24 * 60 * 60
NAME_MAX_LEN = 100

_cache: dict[str, str] = {}
_loaded_at: float = 0.0


def _normalize(symbol: str) -> str:
    # SEC writes share classes with a dash (BRK-B); users may type BRK.B.
    return symbol.strip().upper().replace(".", "-")


async def _load() -> dict[str, str]:
    global _cache, _loaded_at
    if _cache and time.monotonic() - _loaded_at < CACHE_TTL_SECONDS:
        return _cache
    try:
        async with httpx.AsyncClient(timeout=10.0, headers={"User-Agent": USER_AGENT}) as client:
            resp = await client.get(URL)
            resp.raise_for_status()
            rows = resp.json()
    except Exception as e:  # noqa: BLE001 — lookup is best-effort
        logger.warning("SEC ticker list fetch failed: {}", e)
        return _cache
    _cache = {
        str(r["ticker"]).upper(): str(r["title"]).strip()
        for r in rows.values()
        if r.get("ticker") and r.get("title")
    }
    _loaded_at = time.monotonic()
    return _cache


async def lookup_company_name(symbol: str) -> str | None:
    """Company name for a US ticker, or None if unknown / list unavailable."""
    name = (await _load()).get(_normalize(symbol))
    return name[:NAME_MAX_LEN] if name else None
