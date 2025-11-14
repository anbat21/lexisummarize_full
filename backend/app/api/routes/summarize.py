
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import os
import requests
import logging

router = APIRouter()


class Req(BaseModel):
    text: str
    length: str = "medium"


def _map_length_to_params(length: str):
    # Simple mapping for HF parameters; adjust if you change model or API
    if length == "short":
        return {"max_length": 50}
    if length == "long":
        return {"max_length": 300}
    return {"max_length": 150}


@router.post("/")
def summarize(req: Req):
    HF_API_KEY = os.getenv("HF_API_KEY", "")
    if not HF_API_KEY:
        raise HTTPException(status_code=500, detail="HF_API_KEY missing")

    headers = {"Authorization": f"Bearer {HF_API_KEY}"}
    payload = {"inputs": req.text, "parameters": _map_length_to_params(req.length)}

    try:
     r = requests.post(
    "https://router.huggingface.co/hf-inference/models/facebook/bart-large-cnn",
    headers=headers,
    json=payload,
    timeout=20,
)
    except requests.RequestException as e:
        logging.exception("Request to HF inference API failed")
        raise HTTPException(status_code=502, detail=str(e))

    if r.status_code != 200:
        # Bubble up HF error for easier debugging
        logging.error("HF API returned non-200: %s %s", r.status_code, r.text)
        raise HTTPException(status_code=502, detail=f"HF API error: {r.status_code}")

    try:
        result = r.json()
    except Exception:
        logging.exception("Failed to parse HF API response as JSON")
        raise HTTPException(status_code=502, detail="Invalid response from HF API")

    # Handle common response shapes
    summary = None
    if isinstance(result, list) and len(result) > 0 and isinstance(result[0], dict):
        summary = result[0].get("summary_text")
    elif isinstance(result, dict) and "summary_text" in result:
        summary = result.get("summary_text")
    elif isinstance(result, dict) and "error" in result:
        logging.error("HF API error payload: %s", result)
        raise HTTPException(status_code=502, detail=result.get("error"))

    if not summary:
        logging.error("Unexpected HF response structure: %s", result)
        raise HTTPException(status_code=502, detail="Could not extract summary from HF response")

    return {"summary": summary, "vocabulary": []}
