import cv2
import numpy as np
import pytesseract
from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import settings

router = APIRouter(prefix="/scan", tags=["scan"])


@router.post("/document")
async def scan_document(file: UploadFile = File(...)) -> dict[str, str]:
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="Le fichier doit etre une image")

    content = await file.read()
    if not content:
        raise HTTPException(status_code=400, detail="Fichier vide")

    np_buffer = np.frombuffer(content, dtype=np.uint8)
    image = cv2.imdecode(
        np_buffer,
        cv2.IMREAD_COLOR,
    )

    if image is None:
        raise HTTPException(status_code=400, detail="Image invalide")

    if settings.tesseract_cmd:
        pytesseract.pytesseract.tesseract_cmd = settings.tesseract_cmd

    grayscale = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    text = pytesseract.image_to_string(grayscale)

    return {"extracted_text": text.strip()}
