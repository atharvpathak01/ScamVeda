
from fastapi import FastAPI
from pydantic import BaseModel, Field

app = FastAPI(
    title="ScamVeda API",
    description="Helps users identify potential online scams.",
    version="0.1.0",
)


class AnalyzeRequest(BaseModel):
    message: str = Field(min_length=1, max_length=5000)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "message": "ScamVeda API is running",
    }


@app.post("/analyze")
def analyze_message(request: AnalyzeRequest):
    message = request.message.strip().lower()
    warnings = []

    checks = [
        (
            ["otp", "one time password", "verification code"],
            "Requests or references to an OTP or verification code",
        ),
        (
            ["urgent", "immediately", "act now", "account blocked"],
            "Urgent language that may pressure you to act quickly",
        ),
        (
            ["upi pin", "share your pin", "bank password"],
            "A request involving sensitive banking credentials",
        ),
        (
            ["prize", "lottery", "you won", "claim reward"],
            "A prize or reward claim that may be misleading",
        ),
        (
            ["pay now", "send money", "processing fee"],
            "A request to send money or pay a fee",
        ),
        (
            ["http://", "https://", "bit.ly", "click here"],
            "A link or instruction to click a link",
        ),
    ]

    for keywords, warning in checks:
        if any(keyword in message for keyword in keywords):
            warnings.append(warning)

    if len(warnings) >= 3:
        risk = "High"
    elif warnings:
        risk = "Medium"
    else:
        risk = "Low"

    if warnings:
        advice = [
            "Do not share OTPs, PINs, passwords, or banking details.",
            "Verify requests through an official app or contact number.",
            "Avoid clicking unexpected links or sending money under pressure.",
        ]
    else:
        advice = [
            "No listed warning patterns were detected, but scams can still be missed.",
            "Verify the sender and any unexpected requests independently.",
        ]

    return {
        "risk": risk,
        "warnings": warnings,
        "safety_advice": advice,
        "disclaimer": (
            "This rule-based result is not proof that a message is safe or fraudulent."
        ),
    }
