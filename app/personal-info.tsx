// app/personal-info.tsx (VERSION FINAL)
import React from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Controller } from "react-hook-form"
import { z } from 'zod'; // Necesario para inferir el tipo FormValues
import { router } from "expo-router";
import { useCVContext } from "../context/CVContext";
import { NavigationButton } from "../components/NavigationButton";
import { InputField } from "../components/InputField";

import { PersonalInfoSchema } from "../hooks/useZod";
import { useFormularioCV } from "../hooks/useFormularioCV";

// Define el tipo de datos que se recibirá después de la validación de Zod
type FormValues = z.infer<typeof PersonalInfoSchema>;

export default function PersonalInfoScreen() {
    const { updatePersonalInfo } = useCVContext();
    
    // 1. INICIALIZACIÓN: Todo el estado y la validación son manejados por el hook
    const { control, handleSubmit, formState: { errors } } = useFormularioCV(
        PersonalInfoSchema,
        'personalInfo' 
    );
    
    // 2. FUNCIÓN DE GUARDADO: Se llama solo con datos validados
    const handleSave = (data: FormValues) => {
        // 'data' contiene los valores de todos los campos, validados por Zod.
        updatePersonalInfo(data); 

        Alert.alert(
            "Éxito",
            "Información guardada correctamente",
            [{ text: "OK", onPress: () => router.back() }],
        );
    };
    
    // 3. RENDERIZADO: Todos los InputFields usan Controller para vincularse al formulario
    return (
        <ScrollView style={styles.container}>
            <View style={styles.content}>

                {/* Nombre Completo */}
                <Controller
                    control={control}
                    name="fullName"
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

                {/* Email */}
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
                            keyboardType="numeric" // Usar "numeric" para forzar solo números
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

                {/* Botón de Guardar */}
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