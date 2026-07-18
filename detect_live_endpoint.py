# ─── Add this to your FastAPI AI server (the one running on port 8000) ─────
#
# It receives a single JPEG frame from the browser webcam (sent by
# AIScannerCard.jsx on the landing page) and returns YOLOv8 face boxes.
#
# Response shape the frontend expects:
#   { "faces": [ { "x": 55, "y": 40, "width": 150, "height": 150,
#                  "confidence": 0.93, "label": "face" }, ... ] }
#
# x, y, width, height must be in PIXELS of the frame you were sent
# (not normalized 0-1) — the frontend scales them to the on-screen video size.

from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from ultralytics import YOLO
import numpy as np
from PIL import Image
import io

app = FastAPI()

# ── CORS: allow your Vite dev server / Vercel deployment to call this ──────
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",               # your Vite dev server (actual port in use)
        "http://localhost:5173",               # default Vite port, kept just in case
        "https://faceattend-ai.vercel.app",   # your deployed frontend
    ],
    allow_methods=["POST"],
    allow_headers=["*"],
)

# ── TEMPORARY: using the standard yolov8n.pt (auto-downloads on first run,
# no manual weight file needed). It's a general object detector, not a
# face-specific one, so we filter to class 0 ("person") as a stand-in box
# just to get the camera pipeline working end-to-end.
#
# Swap this out later for a real face-detection model, e.g.:
#   model = YOLO("yolov8n-face-lindevs.pt")
#   (download from https://github.com/lindevs/yolov8-face/releases)
# or your own Project-trained weights — once you do, remove the
# `if int(box.cls[0]) == 0` class filter below, since a face model has
# no "person" class to filter by.
model = YOLO("yolov8n.pt")  # auto-downloads (~6MB) the first time this runs
PERSON_CLASS_ID = 0


@app.post("/detect/live")
async def detect_live(file: UploadFile = File(...)):
    contents = await file.read()
    image = Image.open(io.BytesIO(contents)).convert("RGB")
    frame = np.array(image)

    results = model.predict(frame, conf=0.5, verbose=False)[0]

    faces = []
    for box in results.boxes:
        if int(box.cls[0]) != PERSON_CLASS_ID:
            continue  # remove this check once using a real face model
        x1, y1, x2, y2 = box.xyxy[0].tolist()
        conf = float(box.conf[0])
        faces.append({
            "x": round(x1),
            "y": round(y1),
            "width": round(x2 - x1),
            "height": round(y2 - y1),
            "confidence": round(conf, 3),
            "label": "face",
        })

    return JSONResponse({"faces": faces})


# ── Run with: uvicorn detect_live_endpoint:app --reload --port 8000 ────────
# (Or merge this route into your existing FastAPI app instead of running
#  it standalone — just copy the /detect/live route + CORS config over.)
