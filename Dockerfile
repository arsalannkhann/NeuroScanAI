# Use lightweight base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN gdown https://drive.google.com/uc?id=1aEc1Ni1mds5anu28giaiXkcM9_OOxV2y -O best_model.keras

# Copy all source files in current directory to /app
COPY . .

# Expose the port used by FastAPI
EXPOSE 8000

# Run the app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
