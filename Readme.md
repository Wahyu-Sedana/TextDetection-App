from pathlib import Path

content = """# Toxic Text Detection App

A full-stack Machine Learning project to detect whether a text is toxic or not toxic.

This project demonstrates an end-to-end ML workflow using:

- Machine Learning (Scikit-learn)
- FastAPI for inference
- Expo + React Native (TypeScript) client
- Docker and Docker Compose
- Makefile for automation

---

## Project Overview

The goal of this project is to build a complete text classification system:

1. Train a machine learning model for toxic text detection
2. Save trained model artifacts
3. Serve predictions using a FastAPI backend
4. Consume the API from a mobile application
5. Containerize services for reproducibility

---

## Project Structure

Backend (API & ML):

toxic-text-ai/

- data/ Dataset files
- training/ Jupyter notebooks and training scripts
- model/
  - toxic_model.pkl Trained ML model
  - vectorizer.pkl TF-IDF vectorizer
- main.py FastAPI application
- requirements.txt API dependencies
- Dockerfile
- docker-compose.yml
- Makefile
- README.md

Frontend (Mobile App):

toxic-client/

- App.tsx
- package.json
- tsconfig.json

---

## Machine Learning Details

- Algorithm: Multinomial Naive Bayes
- Feature extraction: TF-IDF with n-grams (1, 2)
- Dataset size: 1000 labeled samples
- Labels:
  - 1 = toxic
  - 0 = not toxic
- Text preprocessing:
  - Lowercasing
  - Removing punctuation

The model outputs both a prediction and a confidence score.

---

## FastAPI Endpoints

GET /
Health check endpoint.

POST /predict
Detects whether a given text is toxic.

Request body:
{
"text": "thank you very much"
}

Response:
{
"text": "thank you very much",
"prediction": "not toxic",
"confidence": 0.93
}

---

## Running the API Locally

Activate virtual environment:
source venv/bin/activate

Install dependencies:
pip install -r requirements.txt

Run FastAPI:
uvicorn main:app --reload

API documentation:
http://127.0.0.1:8000/docs

---

## Running with Docker

Build and start services:
make up

Stop services:
make down

View logs:
make logs

Services:

- FastAPI runs on http://localhost:8000
- Jupyter runs on http://localhost:8888

---

## Expo Mobile App

Create the Expo app:
npx create-expo-app toxic-client --template blank-typescript

Run the app:
cd toxic-client
npm start

The app sends user text to the FastAPI /predict endpoint and displays the result.

---

## Makefile Commands

make build Build Docker images
make up Start API and Jupyter
make down Stop containers
make logs Show logs
make api Run FastAPI locally
make jupyter Run Jupyter locally

---

## Example Predictions

Input: thank you very much
Output: not toxic

Input: you are useless
Output: toxic

---

## Future Improvements

- Larger and more realistic dataset
- Transformer-based models (BERT)
- Batch prediction endpoint
- Cloud deployment
- Authentication and rate limiting

---