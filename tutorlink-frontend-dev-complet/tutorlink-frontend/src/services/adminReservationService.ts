import adminApi from './adminApi';
import { ReservationFilters } from '../types/adminReservation.types';

// ⚠️ BACKEND REQUIS — actif quand l'API sera prête
const adminReservationService = {

  // GET /admin/reservations — liste filtrée
  getReservations: async (filters: Partial<ReservationFilters>) => {
    const res = await adminApi.get('/reservations', { params: filters });
    return res.data;
  },

  // PATCH /admin/reservations/:id/complete — marquer comme terminée
  markAsComplete: async (id: string) => {
    const res = await adminApi.patch(`/reservations/${id}/complete`);
    return res.data;
  },

  // PATCH /admin/reservations/:id/cancel — annuler une réservation
  cancelReservation: async (id: string, reason: string) => {
    const res = await adminApi.patch(`/reservations/${id}/cancel`, { reason });
    return res.data;
  },

  // POST /admin/reservations/:id/refund — rembourser via Mobile Money
  refundReservation: async (id: string) => {
    const res = await adminApi.post(`/reservations/${id}/refund`);
    return res.data;
  },
};

export default adminReservationService;