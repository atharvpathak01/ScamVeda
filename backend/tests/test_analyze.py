
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


def test_kyc_alert_returns_warning():
    response = client.post(
        "/analyze",
        json={
            "message": (
                "Your KYC expired. "
                "Update your KYC or your bank account will be blocked."
            )
        },
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] == "Medium"
    assert any("KYC" in warning for warning in result["warnings"])


def test_job_registration_fee_returns_warning():
    response = client.post(
        "/analyze",
        json={
            "message": (
                "Congratulations on your job offer. "
                "Pay a registration fee to continue."
            )
        },
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] == "Medium"
    assert any("job offer" in warning for warning in result["warnings"])


def test_digital_arrest_message_returns_warning():
    response = client.post(
        "/analyze",
        json={"message": "An officer says this is a digital arrest."},
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] == "Medium"
    assert any(
        "impersonation" in warning for warning in result["warnings"]
    )



def test_ordinary_police_reference_is_not_flagged():
    response = client.post(
        "/analyze",
        json={
            "message": (
                "I watched a documentary about a police officer yesterday."
            )
        },
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] == "Low"
    assert result["warnings"] == []



def test_ordinary_bank_reference_is_not_flagged():
    response = client.post(
        "/analyze",
        json={
            "message": (
                "I visited the bank today to ask about my savings account."
            )
        },
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] == "Low"
    assert result["warnings"] == []



def test_parcel_seizure_and_payment_message_returns_warning():
    response = client.post(
        "/analyze",
        json={
            "message": (
                "Your parcel has been seized. "
                "Pay the processing fee immediately to release it."
            )
        },
    )

    assert response.status_code == 200
    result = response.json()
    assert result["risk"] in ["Medium", "High"]
    assert len(result["warnings"]) >= 2
    assert "safety_advice" in result
