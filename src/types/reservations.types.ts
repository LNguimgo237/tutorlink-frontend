// ============================================================
// Types TypeScript pour la page "Mes réservations" (espace élève)
// Définit toutes les interfaces des réservations, filtres et actions
// ============================================================

// ── Statut d'une réservation ──────────────────────────────────
export type ReservationStatus =
  | "CONFIRMED"   // Confirmée par le répétiteur
  | "PENDING"     // En attente de confirmation
  | "COMPLETED"   // Cours effectué
  | "CANCELLED"   // Annulée
  | "REFUNDED";   // Remboursée

// ── Moyen de paiement ─────────────────────────────────────────
export type PaymentMethod = "MTN_MOMO" | "ORANGE_MONEY" | "CASH";

// ── Statut du paiement ────────────────────────────────────────
export type PaymentStatus =
  | "PAID"     // Payé
  | "PENDING"  // En attente de débit
  | "REFUNDED" // Remboursé
  | "FAILED";  // Échoué

// ── Filtre actif sur la liste ─────────────────────────────────
export type ReservationFilter =
  | "ALL"
  | "CONFIRMED"
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED";

// ── Répétiteur lié à une réservation ─────────────────────────
export interface ReservationTutor {
  id: string;           // Identifiant unique du répétiteur
  firstName: string;    // Prénom du répétiteur
  lastName: string;     // Nom de famille
  subject: string;      // Matière enseignée ex: "Mathématiques"
  level: string;        // Niveau enseigné ex: "Terminale C/D"
  avatarUrl?: string;   // URL photo de profil (optionnel)
  rating: number;       // Note moyenne ex: 4.9
  district: string;     // Quartier ex: "Centre Dschang"
}

// ── Une réservation complète ───────────────────────────────────
export interface Reservation {
  id: string;                    // Référence ex: "R-1287"
  tutor: ReservationTutor;       // Infos du répétiteur
  date: string;                  // Date du cours ex: "2026-06-23"
  timeRange: string;             // Plage horaire ex: "16h – 18h"
  durationHours: number;         // Durée en heures ex: 2
  subject: string;               // Matière réservée
  studentName: string;           // Nom de l'élève (peut différer du parent)
  message: string;               // Message envoyé au répétiteur
  status: ReservationStatus;     // Statut de la réservation
  paymentMethod: PaymentMethod;  // Moyen de paiement utilisé
  paymentStatus: PaymentStatus;  // Statut du paiement
  totalAmount: number;           // Montant total en FCFA
  createdAt: string;             // Date de création ISO 8601
  reviewPosted: boolean;         // true si un avis a déjà été posté
}

// ── Résumé statistique affiché en haut de la page ────────────
export interface ReservationsSummary {
  totalReservations: number;     // Total de toutes les réservations
  totalCompleted: number;        // Cours effectués
  totalSpent: number;            // Total dépensé en FCFA
  upcomingCount: number;         // Cours à venir (CONFIRMED + PENDING)
}

// ── Payload pour annuler une réservation ─────────────────────
export interface CancelReservationPayload {
  reservationId: string;         // ID de la réservation à annuler
  reason: string;                // Raison de l'annulation
}

// ── Payload pour poster un avis après un cours ───────────────
export interface PostReviewPayload {
  reservationId: string;         // ID de la réservation concernée
  tutorId: string;               // ID du répétiteur
  rating: number;                // Note de 1 à 5
  comment: string;               // Commentaire textuel
}

// ── Options de filtre pour l'affichage ───────────────────────
export interface FilterOption {
  value: ReservationFilter;      // Valeur technique du filtre
  label: string;                 // Libellé affiché à l'utilisateur
  count?: number;                // Nombre de réservations dans ce statut
}

// ── Raisons d'annulation proposées à l'utilisateur ───────────
export const CANCEL_REASONS = [
  "Empêchement personnel",
  "Répétiteur non disponible",
  "Changement de programme",
  "Problème de paiement",
  "Autre raison",
] as const;

export type CancelReason = typeof CANCEL_REASONS[number];