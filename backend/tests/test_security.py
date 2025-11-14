from app.auth.security import hash_pw, verify_pw


def test_hash_and_verify():
    pw = "s3cr3t"
    h = hash_pw(pw)
    assert h != pw
    assert verify_pw(pw, h)
    assert not verify_pw("wrong", h)
