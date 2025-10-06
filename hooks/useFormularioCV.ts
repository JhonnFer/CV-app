// cv-creator-app/hooks/useFormularioCV.ts

import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCVContext } from '../context/CVContext';
import { CVData } from '../types/cv.types'; // Interfaz CVData

/**
 * 1. Hacemos el hook genérico sobre el tipo de los valores del formulario (TFormValues).
 * 2. TFormValues debe ser un objeto.
 */
export const useFormularioCV = <TFormValues extends z.ZodTypeAny>(
    
    // El esquema ahora está tipado como el tipo genérico TFormValues.
    schema: TFormValues, 
    
    // La sección debe ser una clave de CVData
    section: keyof CVData
    
): UseFormReturn<z.infer<TFormValues>> => { // El hook retorna los métodos de RHF, tipados por Zod
    
    const { cvData } = useCVContext();
    
    // 3. Obtener el tipo de los valores de Zod
    type FormValues = z.infer<TFormValues>;

    // 4. Aseguramos que los valores por defecto son del tipo FormValues (aunque TS siga quejándose, esto es lo más correcto)
    const defaults = cvData[section] as FormValues;
    
    // 5. Inicializa React Hook Form
    const methods = useForm<FormValues>({ // RHF ahora sabe el tipo exacto
        resolver: zodResolver(schema),
        defaultValues: defaults, // El valor por defecto ahora usa el tipo correcto
        mode: "onChange",
    });

    return methods;
};