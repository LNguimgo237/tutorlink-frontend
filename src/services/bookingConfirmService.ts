import api from "./api";
import type { BookingConfirmData } from "../types/bookingConfirm.types";

/**
 * Récupère une réservation par son ID.
 * Endpoint conservé : GET /bookings/:bookingId
 */
export async function getBookingById(
  bookingId: string
): Promise<BookingConfirmData> {
  const res = await api.get<BookingConfirmData>(`/bookings/${bookingId}`);
  return res.data;
}