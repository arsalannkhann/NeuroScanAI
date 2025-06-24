from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import gdown
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import io

app = FastAPI(title="Brain Tumor Classifier")

# Allow CORS (if frontend is separate)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

GDRIVE_FILE_ID = "1aEc1Ni1mds5anu28giaiXkcM9_OOxV2y"
MODEL_PATH = "best_model.keras"
class_names = ['glioma', 'meningioma', 'notumor', 'pituitary']
model = None

# Download model from Google Drive
def download_model():
    if not os.path.exists(MODEL_PATH):
        print("Downloading model from Google Drive...")
        url = f"https://drive.google.com/uc?id={GDRIVE_FILE_ID}"
        gdown.download(url, MODEL_PATH, quiet=False)
        print("Model downloaded.")

# Load model
def load_ml_model():
    global model
    try:
        download_model()
        physical_devices = tf.config.list_physical_devices('GPU')
        if physical_devices:
            for device in physical_devices:
                tf.config.experimental.set_memory_growth(device, True)
        model = load_model(MODEL_PATH, compile=False)
        model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'], run_eagerly=False)
        dummy_input = np.zeros((1, 299, 299, 3))
        model.predict(dummy_input)
        print("Model loaded and warmed up.")
    except Exception as e:
        print(f"Error loading model: {str(e)}")

# Prediction helper
def get_prediction(image: Image.Image):
    try:
        if model is None:
            raise ValueError("Model not loaded")
        img = image.convert('RGB').resize((299, 299), Image.Resampling.LANCZOS)
        img_array = np.array(img, dtype=np.float32) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        predictions = model.predict(img_array, batch_size=1)
        predicted_class = np.argmax(predictions[0])
        confidence = float(predictions[0][predicted_class])
        return class_names[predicted_class], confidence
    except Exception as e:
        print(f"Prediction error: {str(e)}")
        return None, None

# Load the model at startup
load_ml_model()
@app.get("/")
def root():
    return {"message": "API is live"}
async def home():
    return """
    <h2>Brain Tumor Detection API</h2>
    <p>Go to <a href="/docs">/docs</a> for Swagger UI.</p>
    """

@app.post("/api/predict")
async def predict(image: UploadFile = File(...)):
    try:
        if not image:
            raise HTTPException(status_code=400, detail="No image uploaded.")
        contents = await image.read()
        img = Image.open(io.BytesIO(contents))
        predicted_class, confidence = get_prediction(img)
        if predicted_class is None:
            raise HTTPException(status_code=500, detail="Prediction failed.")
        return {
            "tumor_type": predicted_class,
            "confidence": confidence
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
