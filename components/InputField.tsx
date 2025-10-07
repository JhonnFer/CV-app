// components/InputField.tsx (modificado)
import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

interface InputFieldProps extends TextInputProps {
  label: string;
  error?: string;
  filterRegex?: RegExp; // Nuevo prop opcional
}

export const InputField = ({ label, error, filterRegex, onChangeText, ...props }: InputFieldProps) => {
  // Función interna que filtra si filterRegex está definido
  const handleChangeText = (text: string) => {
    const filtered = filterRegex ? text.replace(filterRegex, "") : text;
    onChangeText?.(filtered);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, error && styles.inputError]}
        placeholderTextColor="#999"
        onChangeText={handleChangeText}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  inputError: {
    borderColor: "#e74c3c",
  },
  errorText: {
    color: "#e74c3c",
    fontSize: 12,
    marginTop: 4,
  },
});
