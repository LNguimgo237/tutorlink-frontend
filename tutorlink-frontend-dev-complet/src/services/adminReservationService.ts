import adminApi from './adminApi';

// ⚠️ BACKEND REQUIS
const adminReservationService = {

  // GET /admin/reservations — liste filtrée
  getReservations: async (filters: object) => {
    const res = await adminApi.get('/reservations', { params: filters });
    return res.data;
  },

  // PATCH /admin/reservations/:id/cancel — annuler
  // ❌ SUPPRIMÉ : markAsComplete, refundReservation
  cancelReservation: async (id: string) => {
    const res = await adminApi.patch(`/reservations/${id}/cancel`);
    return res.data;
  },
};

export default adminReservationService;