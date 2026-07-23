/**
 * auth.schemas.ts  (M2 - Willer Pegasus)
 * ----------------------------------------
 * Schemas de validation Zod pour les formulaires d'authentification.
 * Partage avec M5 Dallya (AuthLayout commun).
 *
 * Correspond a : src/schemas/auth.schema.ts dans le plan officiel
 */

import { z } from 'zod'

// ── Champs communs ────────────────────────────────────────────────────────────
const phoneRegex = /^6[0-9]{8}$/  // Format camerounais : 6XX XX XX XX

const baseFields = {
  lastName:  z.string().min(2, 'Le nom doit contenir au moins 2 caracteres'),
  firstName: z.string().min(2, 'Le prenom doit contenir au moins 2 caracteres'),
  phone: z
    .string()
    .regex(phoneRegex, 'Format invalide — ex : 6XX XX XX XX'),
  email: z.string().email('Adresse email invalide'),
  quartier: z.string().min(1, 'Veuillez choisir un quartier'),
  password: z
    .string()
    .min(8, 'Le mot de passe doit contenir au moins 8 caracteres')
    .regex(/[A-Z]/, 'Au moins une majuscule requise')
    .regex(/[0-9]/, 'Au moins un chiffre requis'),
  confirmPassword: z.string(),
  acceptCgu: z.boolean().refine((v) => v, {
    message: 'Vous devez accepter les CGU',
  }),
}

// ── Schema Eleve / Parent ─────────────────────────────────────────────────────
export const studentSignupSchema = z
  .object(baseFields)
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export type StudentSignupValues = z.infer<typeof studentSignupSchema>

// ── Schema Repetiteur ─────────────────────────────────────────────────────────
export const tutorSignupSchema = z
  .object({
    ...baseFields,
    diploma:        z.string().min(2, 'Diplome requis'),
    university:     z.string().min(2, 'Etablissement requis'),
    graduationYear: z.string().regex(/^\d{4}$/, 'Annee invalide'),
    subjects:       z.array(z.string()).min(1, 'Choisissez au moins une matiere'),
    levels:         z.array(z.string()).min(1, 'Choisissez au moins un niveau'),
    hourlyRate: z
      .number()
      .min(1000, 'Tarif minimum : 1 000 FCFA')
      .max(20000, 'Tarif maximum : 20 000 FCFA'),
    zones:  z.array(z.string()).min(1, 'Choisissez au moins un quartier'),
    bio:    z.string().min(30, 'La bio doit contenir au moins 30 caracteres').max(500),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirmPassword'],
  })

export type TutorSignupValues = z.infer<typeof tutorSignupSchema>

// ── Schema OTP ────────────────────────────────────────────────────────────────
export const otpSchema = z.object({
  code: z
    .string()
    .length(6, 'Le code doit contenir exactement 6 chiffres')
    .regex(/^\d+$/, 'Le code ne doit contenir que des chiffres'),
})

export type OtpValues = z.infer<typeof otpSchema>
