from fastapi.testclient import TestClient
from app.main import app
import requests


class MockResponse:
    def __init__(self, status_code=200, json_data=None, text=""):
        self.status_code = status_code
        self._json = json_data or [{"summary_text": "short summary"}]
        self.text = text

    def json(self):
        return self._json


def test_summarize_happy_path(monkeypatch):
    # Ensure HF_API_KEY present for the route (tests mock the external call)
    monkeypatch.setenv("HF_API_KEY", "fake-key")

    # monkeypatch requests.post used in summarize route
    def fake_post(url, headers=None, json=None, timeout=None):
        return MockResponse()

    monkeypatch.setattr(requests, "post", fake_post)

    client = TestClient(app)
    r = client.post("/api/summarize/", json={"text": "Very long text", "length": "short"})
    assert r.status_code == 200
    assert r.json()["summary"] == "short summary"
