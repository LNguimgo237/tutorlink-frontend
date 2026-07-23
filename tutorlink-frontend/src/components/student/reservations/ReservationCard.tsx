// ============================================================
// Carte affichant une réservation dans la liste
// Affiche : répétiteur, date/heure, matière, statut, montant
// Boutons contextuels selon le statut de la réservation
// ============================================================

import React from "react";
import type { Reservation } from "../../../types/reservations.types";
import ReservationStatusBadge from "./ReservationStatusBadge";
import PaymentBadge from "./PaymentBadge";

interface Props {
  reservation: Reservation;                        // Données de la réservation
  onViewDetail: (reservation: Reservation) => void; // Ouvre le modal de détail
  onCancel: (reservation: Reservation) => void;     // Ouvre le modal d'annulation
  onReview: (reservation: Reservation) => void;     // Ouvre le modal d'avis
}

const ReservationCard: React.FC<Props> = ({
  reservation,
  onViewDetail,
  onCancel,
  onReview,
}) => {
  const { tutor, status, paymentMethod, paymentStatus } = reservation;

  // Détermine si la réservation peut être annulée
  const canCancel = status === "CONFIRMED" || status === "PENDING";

  // Détermine si l'élève peut poster un avis
  const canReview = status === "COMPLETED" && !reservation.reviewPosted;

  // Formate la date lisiblement
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("fr-FR", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm
                 hover:shadow-md transition-shadow duration-200
                 overflow-hidden"
    >
      {/* ── Header : répétiteur ──────────────────────────── */}
      <div className="bg-[#1a2744] px-5 py-4 flex items-center
                      justify-between gap-3">

        <div className="flex items-center gap-3">
          {/* Avatar initiales */}
          <div className="w-10 h-10 rounded-full bg-[#f5a623]
                          flex items-center justify-center
                          text-[#1a2744] font-bold text-sm flex-shrink-0">
            {tutor.firstName[0]}{tutor.lastName[0]}
          </div>

          <div>
            <p className="font-bold text-white text-sm">
              {tutor.firstName} {tutor.lastName}
            </p>
            <p className="text-white/70 text-xs">
              {tutor.subject} · {tutor.level}
            </p>
          </div>
        </div>

        {/* Référence */}
        <span className="text-white/50 text-xs font-mono flex-shrink-0">
          #{reservation.id}
        </span>
      </div>

      {/* ── Corps de la carte ─────────────────────────────── */}
      <div className="px-5 py-4 space-y-3">

        {/* Date + Heure */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400">📅</span>
            <span className="font-medium text-[#1a2744]">
              {formatDate(reservation.date)}
            </span>
            <span className="text-gray-400">·</span>
            <span className="text-gray-600">{reservation.timeRange}</span>
          </div>

          {/* Durée */}
          <span className="text-xs text-gray-500 bg-gray-100
                           px-2 py-0.5 rounded-full">
            ⏱ {reservation.durationHours}h
          </span>
        </div>

        {/* Matière + Localisation */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>📚 {reservation.subject}</span>
          <span>📍 {tutor.district}</span>
          <span>⭐ {tutor.rating}</span>
        </div>

        {/* Message (tronqué) */}
        {reservation.message && (
          <p className="text-xs text-gray-500 italic line-clamp-1">
            "{reservation.message}"
          </p>
        )}

        {/* Statut + Paiement */}
        <div className="flex items-center justify-between flex-wrap gap-2">
          <ReservationStatusBadge status={reservation.status} />
          <PaymentBadge
            method={paymentMethod}
            status={paymentStatus}
          />
        </div>

        {/* Montant */}
        <div className="flex items-center justify-between
                        pt-2 border-t border-gray-100">
          <span className="text-xs text-gray-500">Montant total</span>
          <span className="font-bold text-[#1a2744] text-base">
            {reservation.totalAmount.toLocaleString("fr-FR")} FCFA
          </span>
        </div>
      </div>

      {/* ── Actions contextuelles ─────────────────────────── */}
      <div className="px-5 pb-5 flex gap-2 flex-wrap">

        {/* Voir détail — toujours disponible */}
        <button
          type="button"
          onClick={() => onViewDetail(reservation)}
          className="
            flex-1 py-2 rounded-lg border border-gray-300
            text-gray-700 text-xs font-semibold
            hover:bg-gray-50 transition-colors cursor-pointer
          "
        >
          Détails
        </button>

        {/* Annuler — si CONFIRMED ou PENDING */}
        {canCancel && (
          <button
            type="button"
            onClick={() => onCancel(reservation)}
            className="
              flex-1 py-2 rounded-lg border border-red-200
              text-red-500 text-xs font-semibold
              hover:bg-red-50 transition-colors cursor-pointer
            "
          >
            Annuler
          </button>
        )}

        {/* Laisser un avis — si COMPLETED et pas encore noté */}
        {canReview && (
          <button
            type="button"
            onClick={() => onReview(reservation)}
            className="
              flex-1 py-2 rounded-lg bg-[#f5a623]
              text-[#1a2744] text-xs font-bold
              hover:bg-[#e09415] transition-colors cursor-pointer
            "
          >
            ⭐ Noter
          </button>
        )}

        {/* Avis déjà posté */}
        {status === "COMPLETED" && reservation.reviewPosted && (
          <span className="
            flex-1 py-2 text-center text-xs text-green-600
            font-semibold bg-green-50 rounded-lg border border-green-200
          ">
            ✅ Avis posté
          </span>
        )}
      </div>
    </div>
  );
};

export default ReservationCard;