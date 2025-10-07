import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { useCVContext } from "../context/CVContext";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";

export default function HomeScreen() {
  const router = useRouter();
  const { cvData } = useCVContext();

  const isPersonalInfoComplete =
    cvData.personalInfo.fullName && cvData.personalInfo.email;
  const hasExperience = cvData.experiences.length > 0;
  const hasEducation = cvData.education.length > 0;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📝 Crea tu CV Profesional</Text>

      {/* Sección: Información Personal */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Ionicons name="person-circle-outline" size={28} color="#2980b9" />
          <Text style={styles.sectionTitle}>Información Personal</Text>
        </View>
        <Text
          style={[
            styles.status,
            { color: isPersonalInfoComplete ? "#27ae60" : "#e74c3c" },
          ]}
        >
          {isPersonalInfoComplete ? "✓ Completado" : "Pendiente"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/personal-info")}
        >
          <Text style={styles.buttonText}>Editar Información</Text>
        </TouchableOpacity>
      </View>

      {/* Sección: Experiencia */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <MaterialIcons name="work-outline" size={26} color="#2980b9" />
          <Text style={styles.sectionTitle}>Experiencia Laboral</Text>
        </View>
        <Text
          style={[
            styles.status,
            { color: hasExperience ? "#27ae60" : "#e74c3c" },
          ]}
        >
          {hasExperience
            ? `✓ ${cvData.experiences.length} agregada(s)`
            : "Pendiente"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/experience")}
        >
          <Text style={styles.buttonText}>Agregar Experiencia</Text>
        </TouchableOpacity>
      </View>

      {/* Sección: Educación */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <FontAwesome5 name="graduation-cap" size={24} color="#2980b9" />
          <Text style={styles.sectionTitle}>Educación</Text>
        </View>
        <Text
          style={[
            styles.status,
            { color: hasEducation ? "#27ae60" : "#e74c3c" },
          ]}
        >
          {hasEducation
            ? `✓ ${cvData.education.length} agregada(s)`
            : "Pendiente"}
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/education")}
        >
          <Text style={styles.buttonText}>Agregar Educación</Text>
        </TouchableOpacity>
      </View>

      {/* Botón Vista Previa */}
      <TouchableOpacity
        style={[styles.button, styles.previewButton]}
        onPress={() => router.push("/preview")}
      >
        <Ionicons name="eye-outline" size={20} color="#fff" />
        <Text style={[styles.buttonText, { marginLeft: 8 }]}>
          Ver Vista Previa del CV
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f4f8fb",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#2c3e50",
    textAlign: "center",
  },
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34495e",
  },
  status: {
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  previewButton: {
    backgroundColor: "#2ecc71",
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});
