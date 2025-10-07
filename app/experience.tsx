import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { InputField } from "../components/InputField";
import { NavigationButton } from "../components/NavigationButton";
import { useCVContext } from "../context/CVContext";
import { Experience } from "../types/cv.types";

export default function ExperienceScreen() {
  const router = useRouter();
  const { cvData, addExperience, deleteExperience } = useCVContext();

  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    company: "",
    position: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  // === Filtrar solo letras y algunos caracteres permitidos ===
  const filterLetters = (text: string) => {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-']*$/;
    if (regex.test(text)) {
      return text;
    } else {
      Alert.alert(
        "Caracter inválido",
        "Solo se permiten letras, espacios y caracteres especiales válidos (. - ')"
      );
      return formData.company; // o formData.position según el campo
    }
  };

  const handleAdd = () => {
    if (!formData.company || !formData.position || !formData.startDate) {
      Alert.alert(
        "Error",
        "Por favor completa al menos empresa, cargo y fecha de inicio"
      );
      return;
    }

    const newExperience: Experience = {
      id: Date.now().toString(),
      ...formData,
    };

    addExperience(newExperience);

    // Limpiar formulario
    setFormData({
      company: "",
      position: "",
      startDate: "",
      endDate: "",
      description: "",
    });

    Alert.alert("Éxito", "Experiencia agregada correctamente");
  };

  const handleDelete = (id: string) => {
    Alert.alert("Confirmar", "¿Estás seguro de eliminar esta experiencia?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Eliminar",
        style: "destructive",
        onPress: () => deleteExperience(id),
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Agregar Nueva Experiencia</Text>

        <InputField
          label="Empresa *"
          placeholder="Nombre de la empresa"
          value={formData.company}
          onChangeText={(text) =>
            setFormData({ ...formData, company: filterLetters(text) })
          }
        />

        <InputField
          label="Cargo *"
          placeholder="Tu posición"
          value={formData.position}
          onChangeText={(text) =>
            setFormData({ ...formData, position: filterLetters(text) })
          }
        />

        {/* === Fecha de Inicio === */}
        <Text style={styles.label}>Fecha de Inicio *</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowStartPicker(true)}
        >
          <MaterialIcons name="calendar-today" size={22} color="#2c3e50" />
          <Text style={styles.dateText}>
            {formData.startDate ? formData.startDate : "Seleccionar fecha"}
          </Text>
        </TouchableOpacity>

        {showStartPicker && (
          <DateTimePicker
            value={formData.startDate ? new Date(formData.startDate) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowStartPicker(false);
              if (date) {
                setFormData({
                  ...formData,
                  startDate: date.toISOString().split("T")[0],
                });
              }
            }}
          />
        )}

        {/* === Fecha de Fin === */}
        <Text style={styles.label}>Fecha de Fin</Text>
        <TouchableOpacity
          style={styles.dateInput}
          onPress={() => setShowEndPicker(true)}
        >
          <MaterialIcons name="calendar-today" size={22} color="#2c3e50" />
          <Text style={styles.dateText}>
            {formData.endDate ? formData.endDate : "Seleccionar fecha"}
          </Text>
        </TouchableOpacity>

        {showEndPicker && (
          <DateTimePicker
            value={formData.endDate ? new Date(formData.endDate) : new Date()}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={(event, date) => {
              setShowEndPicker(false);
              if (date) {
                setFormData({
                  ...formData,
                  endDate: date.toISOString().split("T")[0],
                });
              }
            }}
          />
        )}

        <InputField
          label="Descripción"
          placeholder="Describe tus responsabilidades y logros..."
          value={formData.description}
          onChangeText={(text) =>
            setFormData({ ...formData, description: text })
          }
          multiline
          numberOfLines={4}
          style={{ height: 100, textAlignVertical: "top" }}
        />

        <NavigationButton title="Agregar Experiencia" onPress={handleAdd} />

        {cvData.experiences.length > 0 && (
          <>
            <Text style={styles.listTitle}>Experiencias Agregadas</Text>
            {cvData.experiences.map((exp) => (
              <View key={exp.id} style={styles.card}>
                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle}>{exp.position}</Text>
                  <Text style={styles.cardSubtitle}>{exp.company}</Text>
                  <Text style={styles.cardDate}>
                    {exp.startDate} - {exp.endDate || "Actual"}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(exp.id)}
                >
                  <Text style={styles.deleteButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </>
        )}

        <NavigationButton
          title="Volver"
          onPress={() => router.back()}
          variant="secondary"
          style={{ marginTop: 16 }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#2c3e50",
    marginBottom: 6,
    fontWeight: "500",
  },
  dateInput: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  dateText: {
    color: "#34495e",
    fontSize: 14,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#2c3e50",
    marginTop: 24,
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#7f8c8d",
    marginBottom: 4,
  },
  cardDate: {
    fontSize: 12,
    color: "#95a5a6",
  },
  deleteButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e74c3c",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
