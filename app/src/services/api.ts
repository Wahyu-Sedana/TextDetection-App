import { TextInput, PredictionResponse } from "../types";

const API_URL = "http://192.168.1.155:8000";

export const predictToxicity = async (
  text: string
): Promise<PredictionResponse> => {
  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  if (!response.ok) {
    throw new Error("Failed to predict toxicity");
  }

  return response.json();
};
