import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { PredictionState, PredictionResponse } from "../types";
import { predictToxicity as predictAPI } from "../services/api";

const initialState: PredictionState = {
  loading: false,
  result: null,
  error: null,
};

export const predictToxicity = createAsyncThunk(
  "prediction/predictToxicity",
  async (text: string) => {
    const response = await predictAPI(text);
    return response;
  }
);

const predictionSlice = createSlice({
  name: "prediction",
  initialState,
  reducers: {
    clearResult: (state) => {
      state.result = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(predictToxicity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        predictToxicity.fulfilled,
        (state, action: PayloadAction<PredictionResponse>) => {
          state.loading = false;
          state.result = action.payload;
        }
      )
      .addCase(predictToxicity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Something went wrong";
      });
  },
});

export const { clearResult } = predictionSlice.actions;
export default predictionSlice.reducer;
