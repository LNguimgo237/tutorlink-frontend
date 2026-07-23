// ============================================================
// Service API pour la page "Mes réservations" (espace élève)
// Tous les appels vers le backend Express/Node.js
// ============================================================

import type {
  Reservation,
  ReservationsSummary,
  CancelReservationPayload,
  PostReviewPayload,
} from "../types/reservations.types";

// URL de base de l'API
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Headers avec JWT de l'élève connecté
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
});

// ── Latence simulée pour le développement ─────────────────────
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ══════════════════════════════════════════════════════════════
// FONCTIONS DU SERVICE
// ══════════════════════════════════════════════════════════════

/**
 * Récupère toutes les réservations de l'élève connecté.
 * ⚠️ BACKEND REQUIS — GET /api/student/reservations
 * Le backend filtre les réservations par l'ID élève extrait du JWT.
 * Retourne la liste triée par date décroissante.
 */
export async function getStudentReservations(): Promise<Reservation[]> {
  // ── PRODUCTION (décommenter lors de l'intégration) ────────
  // const res = await fetch(`${BASE_URL}/student/reservations`, {
  //   headers: authHeaders(),
  // });
  // if (!res.ok) throw new Error("Erreur chargement réservations");
  // return res.json();

  // ── MOCK temporaire ───────────────────────────────────────
  await delay(450);
  return [];
}

/**
 * Récupère le résumé statistique des réservations de l'élève.
 * ⚠️ BACKEND REQUIS — GET /api/student/reservations/summary
 * Le backend calcule : total, complétées, montant dépensé, à venir.
 */
export async function getReservationsSummary(): Promise<ReservationsSummary> {
  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/student/reservations/summary`, {
  //   headers: authHeaders(),
  // });
  // if (!res.ok) throw new Error("Erreur chargement résumé");
  // return res.json();

  await delay(300);
  return {
    totalReservations: 0,
    totalCompleted: 0,
    totalSpent: 0,
    upcomingCount: 0,
  };
}

/**
 * Récupère le détail d'une réservation spécifique.
 * ⚠️ BACKEND REQUIS — GET /api/student/reservations/:id
 * Le backend vérifie que la réservation appartient bien à l'élève connecté.
 */
export async function getReservationById(
  reservationId: string
): Promise<Reservation> {
  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(
  //   `${BASE_URL}/student/reservations/${reservationId}`,
  //   { headers: authHeaders() }
  // );
  // if (!res.ok) throw new Error("Réservation introuvable");
  // return res.json();

  await delay(300);
  throw new Error("Non implémenté en mock");
}

/**
 * Annule une réservation avec une raison.
 * ⚠️ BACKEND REQUIS — PATCH /api/student/reservations/:id/cancel
 * Le backend :
 *   1. Vérifie que le statut est CONFIRMED ou PENDING
 *   2. Change le statut → CANCELLED
 *   3. Déclenche le remboursement Mobile Money si PAID
 *   4. Envoie un SMS de notification au répétiteur
 */
export async function cancelReservation(
  payload: CancelReservationPayload
): Promise<void> {
  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(
  //   `${BASE_URL}/student/reservations/${payload.reservationId}/cancel`,
  //   {
  //     method: "PATCH",
  //     headers: authHeaders(),
  //     body: JSON.stringify({ reason: payload.reason }),
  //   }
  // );
  // if (!res.ok) throw new Error("Erreur lors de l'annulation");

  await delay(600);
}

/**
 * Poste un avis après un cours complété.
 * ⚠️ BACKEND REQUIS — POST /api/student/reviews
 * Le backend :
 *   1. Vérifie que le cours est bien COMPLETED
 *   2. Vérifie qu'aucun avis n'existe déjà pour cette réservation
 *   3. Crée l'avis et met à jour la note moyenne du répétiteur
 *   4. Envoie une notification SMS au répétiteur
 */
export async function postReview(payload: PostReviewPayload): Promise<void> {
  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/student/reviews`, {
  //   method: "POST",
  //   headers: authHeaders(),
  //   body: JSON.stringify(payload),
  // });
  // if (!res.ok) throw new Error("Erreur lors de l'envoi de l'avis");

  await delay(500);
}