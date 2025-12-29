import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/stores";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "./src/hooks";
import { predictToxicity, clearResult } from "./src/stores/predictionSlice";

function ToxicDetectorScreen() {
  const [inputText, setInputText] = useState("");
  const dispatch = useAppDispatch();
  const { loading, result, error } = useAppSelector(
    (state) => state.prediction
  );

  const handlePredict = () => {
    if (inputText.trim()) {
      dispatch(predictToxicity(inputText));
    }
  };

  const handleClear = () => {
    setInputText("");
    dispatch(clearResult());
  };

  const getResultColor = () => {
    if (!result) return "#666";
    return result.prediction === "toxic" ? "#ef4444" : "#10b981";
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Toxic Text Detector</Text>
        <Text style={styles.subtitle}>
          Cek apakah teks mengandung konten toxic
        </Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ketik atau paste teks di sini..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={inputText}
            onChangeText={setInputText}
            editable={!loading}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.predictButton,
              loading && styles.buttonDisabled,
            ]}
            onPress={handlePredict}
            disabled={loading || !inputText.trim()}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Analisis</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.clearButton]}
            onPress={handleClear}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Clear</Text>
          </TouchableOpacity>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorHint}>
              Pastikan API server sudah berjalan dan URL sudah benar
            </Text>
          </View>
        )}

        {result && (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Hasil Analisis:</Text>

            <View
              style={[
                styles.predictionBadge,
                { backgroundColor: getResultColor() },
              ]}
            >
              <Text style={styles.predictionText}>
                {result.prediction.toUpperCase()}
              </Text>
            </View>

            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>Confidence:</Text>
              <Text style={styles.confidenceValue}>
                {(result.confidence * 100).toFixed(1)}%
              </Text>
            </View>

            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    width: `${result.confidence * 100}%`,
                    backgroundColor: getResultColor(),
                  },
                ]}
              />
            </View>

            <View style={styles.originalTextContainer}>
              <Text style={styles.originalTextLabel}>
                Teks yang dianalisis:
              </Text>
              <Text style={styles.originalText}>{result.text}</Text>
            </View>
          </View>
        )}

        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <ToxicDetectorScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    color: "#1e293b",
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  predictButton: {
    backgroundColor: "#3b82f6",
  },
  clearButton: {
    backgroundColor: "#64748b",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    backgroundColor: "#fee2e2",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#fecaca",
  },
  errorText: {
    color: "#dc2626",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  errorHint: {
    color: "#ef4444",
    fontSize: 14,
  },
  resultContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
  },
  predictionBadge: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginBottom: 16,
  },
  predictionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  confidenceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  confidenceLabel: {
    fontSize: 16,
    color: "#64748b",
  },
  confidenceValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1e293b",
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 20,
  },
  progressBar: {
    height: "100%",
    borderRadius: 4,
  },
  originalTextContainer: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 8,
  },
  originalTextLabel: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 8,
    fontWeight: "600",
  },
  originalText: {
    fontSize: 14,
    color: "#1e293b",
    lineHeight: 20,
  },
});
