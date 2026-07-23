import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getBookingById } from "../services/bookingConfirmService";
import tutorProfileService from "../services/tutorProfileService";
import { useAuthStore } from "../store/authStore";
import type {
  BookingConfirmData,
  BookingConfirmTutor,
  BookingConfirmState,
} from "../types/bookingConfirm.types";

export function useBookingConfirmPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingId = "" } = useParams<{ bookingId: string }>();
  const user = useAuthStore((s) => s.user);

  const stateData = location.state as BookingConfirmState | null;
  const isFromState = !!(stateData?.booking && stateData?.tutor);

  // ── Fallback réservation si location.state absent ──
  const { data: apiBooking, isLoading, error } = useQuery({
    queryKey: ["booking-confirm", bookingId],
    queryFn: () => getBookingById(bookingId),
    enabled: !isFromState && !!bookingId,
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });

  // ── Fallback tuteur : appel réel GET /tutors/:id (déjà existant, non mocké) ──
  const { data: apiTutor } = useQuery({
    queryKey: ["booking-confirm-tutor", apiBooking?.tutorId],
    queryFn: () => tutorProfileService.getTutorProfile(apiBooking!.tutorId),
    enabled: !isFromState && !!apiBooking?.tutorId,
    staleTime: 10 * 60 * 1000,
  });

  const booking: BookingConfirmData | null =
    stateData?.booking ?? apiBooking ?? null;

  const tutor: BookingConfirmTutor | null =
    stateData?.tutor ?? (apiTutor as BookingConfirmTutor) ?? null;

  const goToDashboard = () => {
    navigate(user?.role === "TUTOR" ? "/repetiteur/dashboard" : "/eleve/dashboard");
  };

  const goToSearchPage = () => navigate("/repetiteurs");

  const goToTutorProfile = () => {
    if (tutor?.id) navigate(`/repetiteurs/${tutor.id}`);
  };

  return {
    booking,
    tutor,
    bookingId,
    isLoading: !isFromState && isLoading,
    hasError: !isFromState && !!error && !apiBooking,
    isFromState,
    goToDashboard,
    goToSearchPage,
    goToTutorProfile,
  };
}