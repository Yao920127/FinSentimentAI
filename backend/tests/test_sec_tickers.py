import pytest

from services import sec_tickers


@pytest.fixture(autouse=True)
def _reset_cache(monkeypatch):
    monkeypatch.setattr(sec_tickers, "_cache", {})
    monkeypatch.setattr(sec_tickers, "_loaded_at", 0.0)


class _Resp:
    def raise_for_status(self):
        pass

    def json(self):
        return {
            "0": {"cik_str": 1, "ticker": "NVDA", "title": "NVIDIA CORP"},
            "1": {"cik_str": 2, "ticker": "BRK-B", "title": "BERKSHIRE HATHAWAY INC"},
        }


class _Client:
    def __init__(self, *a, **k):
        pass

    async def __aenter__(self):
        return self

    async def __aexit__(self, *a):
        pass

    async def get(self, url):
        return _Resp()


@pytest.mark.asyncio
async def test_returns_name_for_known_ticker(monkeypatch):
    monkeypatch.setattr(sec_tickers.httpx, "AsyncClient", _Client)
    assert await sec_tickers.lookup_company_name("nvda") == "NVIDIA CORP"


@pytest.mark.asyncio
async def test_maps_dot_class_suffix_to_dash(monkeypatch):
    monkeypatch.setattr(sec_tickers.httpx, "AsyncClient", _Client)
    assert await sec_tickers.lookup_company_name("BRK.B") == "BERKSHIRE HATHAWAY INC"


@pytest.mark.asyncio
async def test_returns_none_when_fetch_fails(monkeypatch):
    class _Boom(_Client):
        async def get(self, url):
            raise RuntimeError("down")

    monkeypatch.setattr(sec_tickers.httpx, "AsyncClient", _Boom)
    assert await sec_tickers.lookup_company_name("NVDA") is None
