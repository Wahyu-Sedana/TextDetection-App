from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import re

model = joblib.load("./toxic-text-ai/model/toxic_model.pkl")
vectorizer = joblib.load("./toxic-text-ai/model/vectorizer.pkl")

app = FastAPI(title="Toxic Text Detector")


class TextInput(BaseModel):
    text: str


def clean_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r"[^a-z\s]", "", text)
    return text


@app.get("/")
def root():
    return {"message": "Toxic Text Detection API is running"}


@app.post("/predict")
def predict_toxicity(data: TextInput):
    cleaned = clean_text(data.text)
    vector = vectorizer.transform([cleaned])
    prediction = model.predict(vector)[0]
    prob = model.predict_proba(vector)[0].max()

    return {
        "text": data.text,
        "prediction": "toxic" if prediction == 1 else "not toxic",
        "confidence": round(float(prob), 3),
    }
