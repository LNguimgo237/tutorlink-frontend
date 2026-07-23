// ============================================================
// Page "Mes réservations" du tableau de bord élève
// Affiche toutes les réservations avec filtres, cartes et modals
// Routing : /eleve/reservations (protégé par StudentLayout)
// ============================================================

import React from "react";
import { Link } from "react-router-dom";
import { useReservationsPage }       from "@/hooks/useReservationsPage";
import ReservationSummaryCards       from "../../components/student/reservations/ReservationSummaryCards";
import ReservationFilterTabs         from "../../components/student/reservations/ReservationFilterTabs";
import ReservationCard               from "../../components/student/reservations/ReservationCard";
import ReservationDetailModal        from "../../components/student/reservations/ReservationDetailModal";
import CancelReservationModal        from "../../components/student/reservations/CancelReservationModal";
import ReviewModal                   from "../../components/student/reservations/ReviewModal";

const StudentReservationsPage: React.FC = () => {

  const {
    filteredReservations,
    isLoading,
    hasError,
    summary,
    activeFilter,
    setActiveFilter,
    filterCounts,
    cancelModalOpen,
    reservationToCancel,
    openCancelModal,
    closeCancelModal,
    handleConfirmCancel,
    isCancelling,
    reviewModalOpen,
    reservationToReview,
    openReviewModal,
    closeReviewModal,
    handleSubmitReview,
    isPostingReview,
    detailModalOpen,
    reservationDetail,
    openDetailModal,
    closeDetailModal,
  } = useReservationsPage();

  return (
    <div className="space-y-6 max-w-5xl mx-auto">

      {/* ── En-tête de la page ──────────────────────────── */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-xl font-bold text-[#1a2744]">
            📋 Mes réservations
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Suivez vos cours réservés, confirmez et évaluez vos répétiteurs.
          </p>
        </div>

        {/* Bouton Nouvelle réservation */}
        <Link
          to="/repetiteurs"
          className="
            flex items-center gap-2 px-5 py-2.5 rounded-lg
            bg-[#f5a623] text-[#1a2744] font-bold text-sm
            hover:bg-[#e09415] transition-colors shadow-md
            hover:shadow-lg flex-shrink-0
          "
        >
          ➕ Nouvelle réservation
        </Link>
      </div>

      {/* ── Cartes de résumé ─────────────────────────────── */}
      <ReservationSummaryCards
        totalReservations={summary.totalReservations}
        totalCompleted={summary.totalCompleted}
        totalSpent={summary.totalSpent}
        upcomingCount={summary.upcomingCount}
        isLoading={isLoading}
      />

      {/* ── Erreur de chargement ─────────────────────────── */}
      {hasError && (
        <div className="bg-red-50 border border-red-200 rounded-lg
                        px-4 py-3 text-red-700 text-sm flex items-center gap-2">
          ⚠️ Impossible de charger les réservations. Veuillez rafraîchir.
        </div>
      )}

      {/* ── Filtres ──────────────────────────────────────── */}
      <ReservationFilterTabs
        activeFilter={activeFilter}
        filterCounts={filterCounts}
        onChange={setActiveFilter}
      />

      {/* ── Liste des réservations ───────────────────────── */}

      {/* Skeleton de chargement */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl border border-gray-200
                         shadow-sm overflow-hidden animate-pulse"
            >
              <div className="h-20 bg-gray-200" />
              <div className="p-4 space-y-3">
                <div className="h-3 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded" />
                <div className="h-8 bg-gray-200 rounded mt-2" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Grille des cartes */}
      {!isLoading && filteredReservations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredReservations.map((reservation) => (
            <ReservationCard
              key={reservation.id}
              reservation={reservation}
              onViewDetail={openDetailModal}
              onCancel={openCancelModal}
              onReview={openReviewModal}
            />
          ))}
        </div>
      )}

      {/* État vide : aucune réservation dans ce filtre */}
      {!isLoading && filteredReservations.length === 0 && !hasError && (
        <div className="bg-white rounded-xl border border-gray-200
                        shadow-sm py-16 text-center">
          <span className="text-5xl block mb-4">📋</span>
          <h3 className="text-lg font-bold text-[#1a2744] mb-2">
            {activeFilter === "ALL"
              ? "Aucune réservation"
              : `Aucune réservation "${activeFilter.toLowerCase()}"`}
          </h3>
          <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
            {activeFilter === "ALL"
              ? "Vous n'avez pas encore réservé de cours. Trouvez un répétiteur pour commencer !"
              : "Aucune réservation ne correspond à ce filtre."}
          </p>
          {activeFilter === "ALL" && (
            <Link
              to="/repetiteurs"
              className="
                inline-flex items-center gap-2 px-6 py-3 rounded-lg
                bg-[#f5a623] text-[#1a2744] font-bold text-sm
                hover:bg-[#e09415] transition-colors shadow-md
              "
            >
              🔍 Trouver un répétiteur
            </Link>
          )}
        </div>
      )}

      {/* ══ MODALS ══════════════════════════════════════════ */}

      {/* Modal Détail */}
      <ReservationDetailModal
        isOpen={detailModalOpen}
        reservation={reservationDetail}
        onClose={closeDetailModal}
        onCancel={openCancelModal}
        onReview={openReviewModal}
      />

      {/* Modal Annulation */}
      <CancelReservationModal
        isOpen={cancelModalOpen}
        reservation={reservationToCancel}
        onClose={closeCancelModal}
        onConfirm={handleConfirmCancel}
        isLoading={isCancelling}
      />

      {/* Modal Avis */}
      <ReviewModal
        isOpen={reviewModalOpen}
        reservation={reservationToReview}
        onClose={closeReviewModal}
        onSubmit={handleSubmitReview}
        isLoading={isPostingReview}
      />
    </div>
  );
};

export default StudentReservationsPage;