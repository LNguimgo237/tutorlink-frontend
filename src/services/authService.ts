/**
 * authService.ts  (M2 - Willer Pegasus)
 * ---------------------------------------
 * Service d'authentification : inscription, OTP, connexion sociale.
 *
 * [BACKEND] Tous les appels sont simules pour la maquette.
 * Les points d'integration sont clairement marques.
 */

import type { StudentSignupValues, TutorSignupValues } from './auth.schemas'

// Delai reseau simule
const fakeDelay = (ms = 800) => new Promise<void>((r) => setTimeout(r, ms))

// ── Inscription Eleve / Parent ────────────────────────────────────────────────
/**
 * [BACKEND] POST /api/auth/register/student
 * Retourne un OTP envoye par SMS au numero de telephone fourni.
 */
export async function registerStudent(
  data: StudentSignupValues
): Promise<{ userId: string; phone: string }> {
  await fakeDelay(1000)
  console.log('[authService] registerStudent →', data.email)
  // [BACKEND] const res = await axios.post('/api/auth/register/student', data)
  // return res.data
  return { userId: `student-${Date.now()}`, phone: data.phone }
}

// ── Inscription Repetiteur ────────────────────────────────────────────────────
/**
 * [BACKEND] POST /api/auth/register/tutor (multipart/form-data pour les uploads)
 * Le compte reste EN ATTENTE jusqu'a validation admin.
 */
export async function registerTutor(
  data: TutorSignupValues,
  cniFile?: File,
  cvFile?: File
): Promise<{ userId: string; status: 'pending' }> {
  await fakeDelay(1500)
  console.log('[authService] registerTutor →', data.email, { cniFile, cvFile })
  // [BACKEND]
  // const formData = new FormData()
  // Object.entries(data).forEach(([k, v]) => formData.append(k, String(v)))
  // if (cniFile) formData.append('cni', cniFile)
  // if (cvFile)  formData.append('cv',  cvFile)
  // const res = await axios.post('/api/auth/register/tutor', formData)
  // return res.data
  return { userId: `tutor-${Date.now()}`, status: 'pending' }
}

// ── Verification OTP ──────────────────────────────────────────────────────────
/**
 * [BACKEND] POST /api/auth/verify-otp
 * Le bon code OTP en mode maquette est : 123456
 */
export async function verifyOtp(
  userId: string,
  code: string
): Promise<{ success: boolean; token?: string }> {
  await fakeDelay(700)
  console.log('[authService] verifyOtp →', userId, code)
  // [BACKEND] const res = await axios.post('/api/auth/verify-otp', { userId, code })
  const success = code === '123456'  // Simulation : bon code = 123456
  return { success, token: success ? `token-${Date.now()}` : undefined }
}

// ── Renvoyer l'OTP ────────────────────────────────────────────────────────────
/**
 * [BACKEND] POST /api/auth/resend-otp
 */
export async function resendOtp(userId: string): Promise<void> {
  await fakeDelay(500)
  console.log('[authService] resendOtp →', userId)
  // [BACKEND] await axios.post('/api/auth/resend-otp', { userId })
}

// ── Connexion sociale ─────────────────────────────────────────────────────────
/**
 * Connexion via Google / Apple / Microsoft (Outlook).
 * Le code OTP sera envoye a l'adresse email du compte social.
 *
 * [BACKEND] Implementer OAuth2 avec les providers :
 *   Google    → https://accounts.google.com/o/oauth2/v2/auth
 *   Apple     → https://appleid.apple.com/auth/authorize
 *   Microsoft → https://login.microsoftonline.com/
 *
 * Pour la maquette : simule la redirection et retourne un email fictif.
 */
export type SocialProvider = 'google' | 'apple' | 'microsoft'

export async function socialSignup(
  provider: SocialProvider,
  role: 'student' | 'tutor'
): Promise<{ userId: string; email: string; name: string }> {
  await fakeDelay(800)
  console.log('[authService] socialSignup →', provider, role)

  // [BACKEND]
  // window.location.href = `/api/auth/${provider}?role=${role}`
  // Puis callback OAuth redirige vers /inscription/callback?token=...

  // Simulation :
  const mockData = {
    google:    { email: 'utilisateur@gmail.com',   name: 'Utilisateur Google' },
    apple:     { email: 'utilisateur@icloud.com',  name: 'Utilisateur Apple' },
    microsoft: { email: 'utilisateur@outlook.com', name: 'Utilisateur Outlook' },
  }
  return {
    userId: `social-${Date.now()}`,
    ...mockData[provider],
  }
}

// ── Donnees statiques ─────────────────────────────────────────────────────────
export const QUARTIERS_DSCHANG = [
  'Centre Dschang',
  'Foto',
  'Ngui',
  'Tsinkop',
  'Foreke',
  'Nkong',
  'Tadzou',
]

export const MATIERES = [
  'Mathematiques',
  'Physique-Chimie',
  'Sciences de la Vie et de la Terre (SVT)',
  'Francais',
  'Anglais',
  'Histoire-Geographie',
  'Philosophie',
  'Informatique',
  'Economie',
  'Comptabilite',
]

export const NIVEAUX = [
  'Primaire (CP - CM2)',
  '6eme',
  '5eme',
  '4eme',
  '3eme (BEPC)',
  '2nde',
  '1ere',
  'Terminale A',
  'Terminale C',
  'Terminale D',
  'Terminale E',
  'Preparation BAC',
  'Superieur (Licence)',
]
