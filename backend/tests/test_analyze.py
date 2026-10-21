
from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_suspicious_message_returns_warnings():
    response = client.post(
        "/analyze",
        json={
            "message": (
                "URGENT! Your account is blocked. "
                "Click here to claim your prize and pay now."
            )
        },
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] == "High"
    assert len(result["warnings"]) >= 3
    assert "safety_advice" in result
    assert "disclaimer" in result


def test_ordinary_message_is_not_declared_safe():
    response = client.post(
        "/analyze",
        json={"message": "Hello, see you tomorrow."},
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] == "Low"
    assert result["warnings"] == []
    assert "not proof" in result["disclaimer"]


def test_empty_message_is_rejected():
    response = client.post("/analyze", json={"message": ""})

    assert response.status_code == 422


def test_message_over_limit_is_rejected():
    response = client.post(
        "/analyze",
        json={"message": "a" * 5001},
    )

    assert response.status_code == 422
