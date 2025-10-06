// app/personal-info.tsx
import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Alert,
    ScrollView,
} from "react-native";
import { Controller } from "react-hook-form"
import { router } from "expo-router";
import { useCVContext } from "../context/CVContext";
import { NavigationButton } from "../components/NavigationButton";
import { InputField } from "../components/InputField";
import { PersonalInfo } from "../types/cv.types";

import { PersonalInfoSchema } from "../hooks/useZod";
import { useFormularioCV } from "../hooks/useFormularioCV";

export default function PersonalInfoScreen() {
    const { cvData, updatePersonalInfo } = useCVContext();
    const [formData, setFormData] = useState<PersonalInfo>(cvData.personalInfo);

    const { control, handleSubmit, formState: { errors } } = useFormularioCV(
        PersonalInfoSchema,
        'personalInfo' // La clave del objeto CVData a usar como defaultValues
    );
    useEffect(() => {
        setFormData(cvData.personalInfo);
    }, [cvData.personalInfo]);

    const handleSave = () => {
        // Simple validation
        if (!formData.fullName || !formData.email) {
            Alert.alert("Error", "Por favor completa al menos el nombre y email");
            return;
        }

        updatePersonalInfo(formData);
        Alert.alert(
            "Éxito",
            "Información guardada correctamente",
            [{ text: "OK", onPress: () => router.back() }],
        );
    
        
    };
    

    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>

                {/* Nombre Completo */}
                <Controller
                    control={control}
                    name="fullName" // Debe coincidir con PersonalInfoSchema
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Nombre Completo"
                            placeholder="Juan Pérez"
                            value={value}
                            onChangeText={onChange}
                            error={errors.fullName?.message} 
                        />
                    )}
                />
                 <Controller
                    control={control}
                    name="email" 
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Email"
                            placeholder="juan.perez@mail.com"
                            value={value}
                            onChangeText={onChange}
                            error={errors.email?.message} 
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    )}
                />

{/* Teléfono */}
                <Controller
                    control={control}
                    name="phone" 
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Teléfono"
                            placeholder="+593 99 999 9999"
                            value={value}
                            onChangeText={onChange}
                            error={errors.phone?.message}
                            keyboardType="phone-pad"
                        />
                    )}
                />

                {/* Ubicación */}
                <Controller
                    control={control}
                    name="location" 
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Ubicación"
                            placeholder="Quito, Ecuador"
                            value={value}
                            onChangeText={onChange}
                            error={errors.location?.message}
                        />
                    )}
                />

                {/* Resumen Profesional */}
                <Controller
                    control={control}
                    name="summary" 
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Resumen Profesional"
                            placeholder="Describe brevemente tu perfil profesional..."
                            value={value}
                            onChangeText={onChange}
                            error={errors.summary?.message}
                            multiline
                            numberOfLines={4}
                            style={[{ height: 100, textAlignVertical: "top" }]}
                        />
                    )}
                />

                {/* 4. Botón de Guardar: Llama al handleSubmit de RHF */}
                <NavigationButton 
                    title="Guardar Información" 
                    onPress={handleSubmit(handleSave)} 
                />
                
                <NavigationButton
                    title="Cancelar"
                    onPress={() => router.back()}
                    variant="secondary"
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
});