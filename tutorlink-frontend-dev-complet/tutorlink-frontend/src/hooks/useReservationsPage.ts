// ============================================================
// Hook central de la page "Mes réservations" (espace élève)
// Gère les données mock, les filtres, les modals et les actions
// ============================================================

import { useState, useMemo, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getStudentReservations,
  getReservationsSummary,
  cancelReservation,
  postReview,
} from "../services/reservationsService";
import type {
  Reservation,
  ReservationFilter,
  CancelReservationPayload,
  PostReviewPayload,
  ReservationStatus,
  ReservationTutor,
} from "../types/reservations.types";

// ══════════════════════════════════════════════════════════════
// DONNÉES MOCK — à remplacer par getStudentReservations()
// quand le backend sera prêt
// ══════════════════════════════════════════════════════════════

const MOCK_TUTOR_KAMGA: ReservationTutor = {
  id: "t1",
  firstName: "Eric",
  lastName: "Kamga",
  subject: "Mathématiques",
  level: "Terminale C/D",
  rating: 4.9,
  district: "Centre Dschang",
};

const MOCK_TUTOR_TCHANA: ReservationTutor = {
  id: "t2",
  firstName: "Sylvie",
  lastName: "Tchana",
  subject: "Physique-Chimie",
  level: "Lycée",
  rating: 4.8,
  district: "Quartier Foto",
};

const MOCK_TUTOR_FOTSO: ReservationTutor = {
  id: "t3",
  firstName: "Aline",
  lastName: "Fotso",
  subject: "Anglais",
  level: "Tous niveaux",
  rating: 4.9,
  district: "Centre Dschang",
};

const MOCK_TUTOR_NANA: ReservationTutor = {
  id: "t4",
  firstName: "Bertrand",
  lastName: "Nana",
  subject: "Français",
  level: "Collège & Lycée",
  rating: 4.7,
  district: "Ngui Dschang",
};

// ── DONNÉES MOCK ── à remplacer par getStudentReservations()
// quand backend prêt
const MOCK_RESERVATIONS: Reservation[] = [
  {
    id: "R-1287",
    tutor: MOCK_TUTOR_KAMGA,
    date: "2026-06-23",
    timeRange: "16h – 18h",
    durationHours: 2,
    subject: "Mathématiques",
    studentName: "Junior Nkoumba",
    message: "Revoir les intégrales avant le BAC blanc",
    status: "CONFIRMED",
    paymentMethod: "MTN_MOMO",
    paymentStatus: "PAID",
    totalAmount: 4000,
    createdAt: "2026-06-20T10:00:00.000Z",
    reviewPosted: false,
  },
  {
    id: "R-1288",
    tutor: MOCK_TUTOR_TCHANA,
    date: "2026-06-25",
    timeRange: "17h – 19h",
    durationHours: 2,
    subject: "Physique-Chimie",
    studentName: "Junior Nkoumba",
    message: "Préparation contrôle de chimie organique",
    status: "PENDING",
    paymentMethod: "ORANGE_MONEY",
    paymentStatus: "PENDING",
    totalAmount: 3600,
    createdAt: "2026-06-21T09:00:00.000Z",
    reviewPosted: false,
  },
  {
    id: "R-1289",
    tutor: MOCK_TUTOR_FOTSO,
    date: "2026-06-27",
    timeRange: "15h – 17h",
    durationHours: 2,
    subject: "Anglais",
    studentName: "Junior Nkoumba",
    message: "Travail sur la compréhension orale",
    status: "CONFIRMED",
    paymentMethod: "ORANGE_MONEY",
    paymentStatus: "PAID",
    totalAmount: 3400,
    createdAt: "2026-06-22T11:00:00.000Z",
    reviewPosted: false,
  },
  {
    id: "R-1286",
    tutor: MOCK_TUTOR_NANA,
    date: "2026-06-22",
    timeRange: "10h – 11h30",
    durationHours: 1.5,
    subject: "Français",
    studentName: "Junior Nkoumba",
    message: "Dissertation sur le romantisme",
    status: "COMPLETED",
    paymentMethod: "MTN_MOMO",
    paymentStatus: "PAID",
    totalAmount: 2250,
    createdAt: "2026-06-18T14:00:00.000Z",
    reviewPosted: false,
  },
  {
    id: "R-1285",
    tutor: MOCK_TUTOR_KAMGA,
    date: "2026-06-15",
    timeRange: "16h – 18h",
    durationHours: 2,
    subject: "Mathématiques",
    studentName: "Junior Nkoumba",
    message: "Géométrie dans l'espace — suites",
    status: "COMPLETED",
    paymentMethod: "MTN_MOMO",
    paymentStatus: "PAID",
    totalAmount: 4000,
    createdAt: "2026-06-10T08:00:00.000Z",
    reviewPosted: true,
  },
  {
    id: "R-1284",
    tutor: MOCK_TUTOR_TCHANA,
    date: "2026-06-10",
    timeRange: "14h – 15h30",
    durationHours: 1.5,
    subject: "Physique-Chimie",
    studentName: "Junior Nkoumba",
    message: "Électrocinétique — loi des mailles",
    status: "CANCELLED",
    paymentMethod: "ORANGE_MONEY",
    paymentStatus: "REFUNDED",
    totalAmount: 2700,
    createdAt: "2026-06-05T16:00:00.000Z",
    reviewPosted: false,
  },
];

// ══════════════════════════════════════════════════════════════
// INTERFACE DE RETOUR DU HOOK
// ══════════════════════════════════════════════════════════════

interface UseReservationsPageReturn {
  // Données filtrées et brutes
  reservations: Reservation[];
  filteredReservations: Reservation[];
  isLoading: boolean;
  hasError: boolean;

  // Résumé statistique
  summary: {
    totalReservations: number;
    totalCompleted: number;
    totalSpent: number;
    upcomingCount: number;
  };

  // Filtre actif
  activeFilter: ReservationFilter;
  setActiveFilter: (filter: ReservationFilter) => void;
  filterCounts: Record<ReservationFilter, number>;

  // Modal d'annulation
  cancelModalOpen: boolean;
  reservationToCancel: Reservation | null;
  openCancelModal: (reservation: Reservation) => void;
  closeCancelModal: () => void;
  handleConfirmCancel: (reason: string) => void;
  isCancelling: boolean;

  // Modal d'avis
  reviewModalOpen: boolean;
  reservationToReview: Reservation | null;
  openReviewModal: (reservation: Reservation) => void;
  closeReviewModal: () => void;
  handleSubmitReview: (rating: number, comment: string) => void;
  isPostingReview: boolean;

  // Modal détail
  detailModalOpen: boolean;
  reservationDetail: Reservation | null;
  openDetailModal: (reservation: Reservation) => void;
  closeDetailModal: () => void;
}

// ══════════════════════════════════════════════════════════════
// HOOK PRINCIPAL
// ══════════════════════════════════════════════════════════════

export function useReservationsPage(): UseReservationsPageReturn {
  const queryClient = useQueryClient();

  // ── Filtre actif ─────────────────────────────────────────
  const [activeFilter, setActiveFilter] = useState<ReservationFilter>("ALL");

  // ── États des modals ─────────────────────────────────────
  const [cancelModalOpen,       setCancelModalOpen]       = useState(false);
  const [reservationToCancel,   setReservationToCancel]   = useState<Reservation | null>(null);
  const [reviewModalOpen,       setReviewModalOpen]       = useState(false);
  const [reservationToReview,   setReservationToReview]   = useState<Reservation | null>(null);
  const [detailModalOpen,       setDetailModalOpen]       = useState(false);
  const [reservationDetail,     setReservationDetail]     = useState<Reservation | null>(null);

  // ── Chargement des réservations ───────────────────────────
  // → remplacer par getStudentReservations() quand backend prêt
  const {
    data: reservationsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["student-reservations"],
    queryFn: async () => {
      // ── DONNÉES MOCK ── à remplacer par getStudentReservations()
      // quand backend prêt
      await new Promise((r) => setTimeout(r, 400));
      return MOCK_RESERVATIONS;
      // → remplacer par : return getStudentReservations();
    },
    staleTime: 2 * 60 * 1000,
  });

  const reservations = reservationsData ?? [];

  // ── Calcul du résumé statistique ─────────────────────────
  // Calculé côté frontend depuis la liste (pas d'appel API séparé)
  const summary = useMemo(() => {
    const completed  = reservations.filter((r) => r.status === "COMPLETED");
    const upcoming   = reservations.filter(
      (r) => r.status === "CONFIRMED" || r.status === "PENDING"
    );
    const totalSpent = reservations
      .filter((r) => r.paymentStatus === "PAID")
      .reduce((sum, r) => sum + r.totalAmount, 0);

    return {
      totalReservations: reservations.length,
      totalCompleted: completed.length,
      totalSpent,
      upcomingCount: upcoming.length,
    };
  }, [reservations]);

  // ── Filtrage de la liste ──────────────────────────────────
  const filteredReservations = useMemo(() => {
    if (activeFilter === "ALL") return reservations;
    return reservations.filter((r) => r.status === activeFilter);
  }, [reservations, activeFilter]);

  // ── Compteurs par statut pour les onglets de filtre ──────
  const filterCounts = useMemo<Record<ReservationFilter, number>>(() => {
    const count = (status: ReservationStatus) =>
      reservations.filter((r) => r.status === status).length;
    return {
      ALL:       reservations.length,
      CONFIRMED: count("CONFIRMED"),
      PENDING:   count("PENDING"),
      COMPLETED: count("COMPLETED"),
      CANCELLED: count("CANCELLED"),
    };
  }, [reservations]);

  // ── Mutation : annuler une réservation ───────────────────
  // → remplacer par cancelReservation() quand backend prêt
  const cancelMutation = useMutation({
    mutationFn: async (payload: CancelReservationPayload) => {
      // ── DONNÉES MOCK ── à remplacer par cancelReservation(payload)
      await new Promise((r) => setTimeout(r, 600));
      // → remplacer par : return cancelReservation(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-reservations"] });
      setCancelModalOpen(false);
      setReservationToCancel(null);
    },
  });

  // ── Mutation : poster un avis ─────────────────────────────
  // → remplacer par postReview() quand backend prêt
  const reviewMutation = useMutation({
    mutationFn: async (payload: PostReviewPayload) => {
      // ── DONNÉES MOCK ── à remplacer par postReview(payload)
      await new Promise((r) => setTimeout(r, 500));
      // → remplacer par : return postReview(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["student-reservations"] });
      setReviewModalOpen(false);
      setReservationToReview(null);
    },
  });

  // ── Actions : modal annulation ────────────────────────────
  const openCancelModal = useCallback((reservation: Reservation) => {
    setReservationToCancel(reservation);
    setCancelModalOpen(true);
  }, []);

  const closeCancelModal = useCallback(() => {
    setCancelModalOpen(false);
    setReservationToCancel(null);
  }, []);

  /** Confirme l'annulation avec la raison choisie */
  const handleConfirmCancel = useCallback(
    (reason: string) => {
      if (!reservationToCancel) return;
      cancelMutation.mutate({
        reservationId: reservationToCancel.id,
        reason,
      });
    },
    [reservationToCancel, cancelMutation]
  );

  // ── Actions : modal avis ──────────────────────────────────
  const openReviewModal = useCallback((reservation: Reservation) => {
    setReservationToReview(reservation);
    setReviewModalOpen(true);
  }, []);

  const closeReviewModal = useCallback(() => {
    setReviewModalOpen(false);
    setReservationToReview(null);
  }, []);

  /** Soumet l'avis avec la note et le commentaire */
  const handleSubmitReview = useCallback(
    (rating: number, comment: string) => {
      if (!reservationToReview) return;
      reviewMutation.mutate({
        reservationId: reservationToReview.id,
        tutorId: reservationToReview.tutor.id,
        rating,
        comment,
      });
    },
    [reservationToReview, reviewMutation]
  );

  // ── Actions : modal détail ────────────────────────────────
  const openDetailModal = useCallback((reservation: Reservation) => {
    setReservationDetail(reservation);
    setDetailModalOpen(true);
  }, []);

  const closeDetailModal = useCallback(() => {
    setDetailModalOpen(false);
    setReservationDetail(null);
  }, []);

  return {
    reservations,
    filteredReservations,
    isLoading,
    hasError: !!error,
    summary,
    activeFilter,
    setActiveFilter,
    filterCounts,
    cancelModalOpen,
    reservationToCancel,
    openCancelModal,
    closeCancelModal,
    handleConfirmCancel,
    isCancelling: cancelMutation.isPending,
    reviewModalOpen,
    reservationToReview,
    openReviewModal,
    closeReviewModal,
    handleSubmitReview,
    isPostingReview: reviewMutation.isPending,
    detailModalOpen,
    reservationDetail,
    openDetailModal,
    closeDetailModal,
  };
}