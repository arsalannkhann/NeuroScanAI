from fastapi import FastAPI, File, UploadFile, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import os
import gdown
from PIL import Image
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
import io

app = FastAPI(title="Brain Tumor Classifier")

# ✅ Specific frontend origin allowed
origins = [
    "https://neuro-scan-predict-ui.lovable.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)
# Constants
GDRIVE_FILE_ID = "1aEc1Ni1mds5anu28giaiXkcM9_OOxV2y"
MODEL_PATH = "best_model.keras"
class_names = ['glioma', 'meningioma', 'notumor', 'pituitary']
model = None  # Global model object

# Download model if not exists
def download_model():
    if not os.path.exists(MODEL_PATH):
        print("Downloading model from Google Drive...")
        url = f"https://drive.google.com/uc?id={GDRIVE_FILE_ID}"
        gdown.download(url, MODEL_PATH, quiet=False)
        print("Model downloaded.")

# Load model lazily
def load_ml_model():
    global model
    if model is None:
        try:
            download_model()
            print("Loading model...")
            # Optional GPU memory control (safe fallback)
            try:
                physical_devices = tf.config.list_physical_devices('GPU')
                for device in physical_devices:
                    tf.config.experimental.set_memory_growth(device, True)
            except:
                pass
            model = load_model(MODEL_PATH, compile=False)
            print("Model loaded successfully.")
        except Exception as e:
            print(f"Error loading model: {str(e)}")
            raise

# Image prediction
def get_prediction(image: Image.Image):
    global model
    if model is None:
        load_ml_model()
    img = image.convert('RGB').resize((299, 299), Image.Resampling.LANCZOS)
    img_array = np.array(img, dtype=np.float32) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    predictions = model.predict(img_array)
    predicted_class = np.argmax(predictions[0])
    confidence = float(predictions[0][predicted_class])
    return class_names[predicted_class], confidence

# Health route
@app.get("/")
def root():
    return {
        "message": "Brain Tumor Classifier API is running. Visit /docs to test."
    }

# Predict route

@app.post("/api/predict")
async def predict(request: Request, image: UploadFile = File(...)):
    print(f"🔍 Received method: {request.method}")
    try:
        contents = await image.read()
        img = Image.open(io.BytesIO(contents))
        predicted_class, confidence = get_prediction(img)
        return {
            "tumor_type": predicted_class,
            "confidence": round(confidence, 4)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")
