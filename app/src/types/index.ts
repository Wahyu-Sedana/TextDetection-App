export interface TextInput {
  text: string;
}

export interface PredictionResponse {
  text: string;
  prediction: "toxic" | "not toxic";
  confidence: number;
}

export interface PredictionState {
  loading: boolean;
  result: PredictionResponse | null;
  error: string | null;
}

export interface RootState {
  prediction: PredictionState;
}
