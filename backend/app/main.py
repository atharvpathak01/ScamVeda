
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
        (
            [
                "kyc expired",
                "update your kyc",
                "kyc update",
                "pan card update",
                "bank account will be blocked",
            ],
            "A bank or KYC alert that should be verified independently",
        ),
        (
            [
                "job offer",
                "registration fee",
                "interview fee",
                "pay to apply",
                "training fee",
            ],
            "A job offer or recruitment fee that needs careful verification",
        ),
        (
            [
                "digital arrest",
                "arrest warrant",
                "parcel seized",
                "parcel has been seized",
                "parcel release fee",
                "release your parcel",
                "calling from your bank",
            ],
            "A possible impersonation, parcel scam, or intimidation tactic",
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

    # Generate safety advice based on the message content.
    advice = []

    if any(
        keyword in message
        for keyword in [
            "otp",
            "one time password",
            "verification code",
            "upi pin",
            "share your pin",
            "bank password",
        ]
    ):
        advice.append(
            "Never share OTPs, UPI PINs, passwords, or verification codes."
        )

    if any(
        keyword in message
        for keyword in [
            "kyc expired",
            "update your kyc",
            "kyc update",
            "pan card update",
            "bank account will be blocked",
        ]
    ):
        advice.append(
            "Check your KYC status through your bank's official app "
            "or verified customer-support number."
        )

    if any(
        keyword in message
        for keyword in [
            "job offer",
            "registration fee",
            "interview fee",
            "pay to apply",
            "training fee",
        ]
    ):
        advice.append(
            "Verify the employer and vacancy through official channels "
            "before paying any recruitment-related fee."
        )

    if any(
        keyword in message
        for keyword in [
            "parcel seized",
            "parcel has been seized",
            "parcel release fee",
            "release your parcel",
        ]
    ):
        advice.append(
            "Check parcel status using the courier's official tracking "
            "service. Do not pay unexpected release fees through a message link."
        )

    if any(
        keyword in message
        for keyword in ["http://", "https://", "bit.ly", "click here"]
    ):
        advice.append(
            "Avoid unexpected links. Do not enter passwords, banking "
            "details, or OTPs on pages opened from suspicious messages."
        )

    if any(
        keyword in message
        for keyword in ["pay now", "send money", "processing fee"]
    ):
        advice.append(
            "Do not send money under pressure. Independently verify the "
            "request with the relevant organization first."
        )

    if warnings and not advice:
        advice.append(
            "Pause and verify the sender and request using an independently "
            "verified official contact method."
        )

    if not warnings:
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
