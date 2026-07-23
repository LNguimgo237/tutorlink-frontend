// ============================================================
// Service API pour l'authentification (connexion)
// Tous les appels vers le backend Express/Node.js
// ============================================================

import type {
  LoginFormData,
  LoginResponse,
  ForgotPasswordPayload,
} from "../types/auth.types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// ── Latence simulée pour le développement ─────────────────────
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ══════════════════════════════════════════════════════════════
// FONCTIONS DU SERVICE
// ══════════════════════════════════════════════════════════════

/**
 * Connecte un utilisateur avec email/téléphone + mot de passe.
 * ⚠️ BACKEND REQUIS — POST /api/auth/login
 * Le backend :
 *   1. Cherche l'utilisateur par email OU téléphone (identifiant unique)
 *   2. Vérifie le mot de passe avec bcrypt
 *   3. Vérifie que le compte n'est pas suspendu
 *   4. Génère un JWT (+ refreshToken si rememberMe = true, durée longue)
 *   5. Retourne le JWT + les infos utilisateur (avec son rôle)
 */
export async function loginUser(data: LoginFormData): Promise<LoginResponse> {
  // ── PRODUCTION (décommenter lors de l'intégration) ────────
  // const res = await fetch(`${BASE_URL}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) {
  //   const err = await res.json();
  //   throw new Error(err.code ?? "UNKNOWN");
  // }
  // return res.json();

  // ── MOCK temporaire ───────────────────────────────────────
  await delay(700);
  throw new Error("NETWORK_ERROR");
}

/**
 * Envoie une demande de réinitialisation de mot de passe.
 * ⚠️ BACKEND REQUIS — POST /api/auth/forgot-password
 * Le backend :
 *   1. Vérifie que l'identifiant correspond à un compte existant
 *   2. Génère un code OTP à 6 chiffres
 *   3. Envoie le code par SMS (Mobile Money API) ou par email
 *   4. Le code expire après 10 minutes
 */
export async function requestPasswordReset(
  payload: ForgotPasswordPayload
): Promise<void> {
  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/auth/forgot-password`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Erreur lors de l'envoi du code");

  await delay(600);
}

/**
 * Rafraîchit le token JWT expiré à l'aide du refreshToken.
 * ⚠️ BACKEND REQUIS — POST /api/auth/refresh
 * Le backend vérifie le refreshToken et génère un nouveau JWT.
 * Utilisé automatiquement par l'intercepteur Axios (hors scope ici).
 */
export async function refreshAuthToken(
  refreshToken: string
): Promise<{ token: string; expiresIn: number }> {
  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/auth/refresh`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ refreshToken }),
  // });
  // if (!res.ok) throw new Error("Session expirée");
  // return res.json();

  await delay(300);
  throw new Error("Non implémenté en mock");
}