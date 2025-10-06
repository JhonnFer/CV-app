// hooks/useZod.ts (Ejemplo de PersonalInfo)

import { z } from 'zod';

export const PersonalInfoSchema = z.object({
    // 1. fullName: Requerido, Longitud, Sin números
    fullName: z
      .string({ required_error: "El nombre es obligatorio." })
      .min(3, "El nombre debe tener al menos 3 caracteres.")
      // Excluye números y la mayoría de símbolos, permite acentos, espacios, puntos y guiones.
      .regex(
          /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s\.\-']+$/, 
          "El nombre no puede contener números ni caracteres especiales no permitidos."
      ),
      
    // 2. email: Requerido, Formato de email
    email: z
      .string({ required_error: "El email es obligatorio." })
      .email("Formato de correo electrónico inválido."),
      
    // 3. phone: Opcional, pero si tiene contenido, debe seguir un formato de teléfono básico
    phone: z
      .string({required_error:"se espera un numero entero"})
      .min(10, "El numero debe tener 10 digitos ")
      .max(10, "El numero debe tener  maximo 10 digitos ")
      
      // Permite que el campo esté completamente vacío ('') o sea undefined
      .optional()
      .or(z.literal('')), 

    // 4. location: Opcional, solo permite que sea una cadena vacía si no se usa
    location: z
      .string()
      .optional()
      .or(z.literal('')),
      
    // 5. summary: Opcional, Longitud Máxima
    summary: z
      .string()
      .max(500, "El resumen profesional no debe exceder los 500 caracteres.")
      .optional()
      .or(z.literal('')),
    

      

});
export const ExperienceSchema = z.object({
  id: z.string(), // Omitiremos 'id' en el formulario, pero Zod lo necesita en la inferencia
  company: z.string().min(2, "El nombre de la empresa es obligatorio."),
  position: z.string().min(2, "El cargo o posición es obligatorio."),
  
  // Validamos que el string sea un formato de fecha válido (YYYY-MM-DD es estándar)
  startDate: z.string().date("La fecha de inicio es obligatoria y debe ser válida."),
  
  // endDate es opcional, pero si tiene valor, debe ser una fecha válida o la palabra 'Actual'
  endDate: z.string().optional().or(z.literal(''))
    .pipe(z.string().trim())
    .refine(
        (val) => val === 'Actual' || !val || z.string().date().safeParse(val).success,
        { message: "Debe ser una fecha válida (AAAA-MM-DD) o la palabra 'Actual'." }
    ),
  
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres."),
}).partial({ id: true }); // Permite que el formulario no incluya 'id' al inicio


// Y repites para ExperienceSchema y EducationSchema...