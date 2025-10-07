// app/personal-info.tsx (modificado)
import React from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Controller } from "react-hook-form"
import { z } from 'zod';
import { router } from "expo-router";
import { useCVContext } from "../context/CVContext";
import { NavigationButton } from "../components/NavigationButton";
import { InputField } from "../components/InputField";

import { PersonalInfoSchema } from "../hooks/useZod";
import { useFormularioCV } from "../hooks/useFormularioCV";

type FormValues = z.infer<typeof PersonalInfoSchema>;

export default function PersonalInfoScreen() {
    const { updatePersonalInfo } = useCVContext();
    
    const { control, handleSubmit, formState: { errors } } = useFormularioCV(
        PersonalInfoSchema,
        'personalInfo' 
    );
    
    const handleSave = (data: FormValues) => {
        updatePersonalInfo(data); 

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
                    name="fullName"
                    render={({ field: { onChange, value } }) => (
                        <InputField
                            label="Nombre Completo"
                            placeholder="Juan Pérez"
                            value={value}
                            onChangeText={(text) => {
                                // Bloquea números y símbolos no permitidos
                                const filtered = text.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-']/g, '');
                                onChange(filtered);
                            }}
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
                            onChangeText={(text) => {
                                // Solo permite números
                                const filtered = text.replace(/[^0-9]/g, '');
                                onChange(filtered);
                            }}
                            error={errors.phone?.message}
                            keyboardType="numeric"
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
