// ============================================================
// Badge affichant le statut d'une réservation avec couleur
// Utilisé dans la carte et le tableau des réservations
// ============================================================

import React from "react";
import type { ReservationStatus } from "../../../types/reservations.types";

interface Props {
  status: ReservationStatus; // Statut de la réservation à afficher
}

// Configuration visuelle par statut
const STATUS_CONFIG: Record<
  ReservationStatus,
  { label: string; className: string; dot: string }
> = {
  CONFIRMED: {
    label: "Confirmée",
    className: "bg-green-100 text-green-700",
    dot: "bg-green-500",
  },
  PENDING: {
    label: "En attente",
    className: "bg-amber-100 text-amber-700",
    dot: "bg-amber-500",
  },
  COMPLETED: {
    label: "Terminée",
    className: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  CANCELLED: {
    label: "Annulée",
    className: "bg-red-100 text-red-700",
    dot: "bg-red-500",
  },
  REFUNDED: {
    label: "Remboursée",
    className: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
  },
};

const ReservationStatusBadge: React.FC<Props> = ({ status }) => {
  const { label, className, dot } = STATUS_CONFIG[status];

  return (
    <span
      className={`
        inline-flex items-center gap-1.5
        px-2.5 py-1 rounded-full
        text-[11px] font-bold
        ${className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
};

export default ReservationStatusBadge;