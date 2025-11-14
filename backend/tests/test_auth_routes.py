import time
from fastapi.testclient import TestClient
from app.main import app


class FakeCollection:
    def __init__(self):
        self._data = {}

    def find_one(self, q):
        return self._data.get(q.get("email"))

    def insert_one(self, doc):
        email = doc.get("email")
        if email in self._data:
            from pymongo.errors import DuplicateKeyError

            raise DuplicateKeyError("duplicate")
        self._data[email] = doc

    def create_index(self, *a, **k):
        return None


def test_register_and_login(monkeypatch):
    from app import db

    fake = FakeCollection()
    monkeypatch.setattr(db, "users_collection", fake)

    client = TestClient(app)

    # register
    r = client.post("/api/auth/register", json={"email": "bob@example.com", "password": "pw"})
    assert r.status_code == 200
    assert r.json()["msg"] == "ok"

    # duplicate register
    r2 = client.post("/api/auth/register", json={"email": "bob@example.com", "password": "pw"})
    assert r2.status_code == 400

    # login
    r3 = client.post("/api/auth/login", json={"email": "bob@example.com", "password": "pw"})
    assert r3.status_code == 200
    assert "token" in r3.json()
