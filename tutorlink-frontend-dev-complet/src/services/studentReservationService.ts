import api from './api';

// ⚠️ BACKEND REQUIS
const studentReservationService = {

  // GET /student/reservations — liste des réservations
  getReservations: async (filters: object) => {
    const res = await api.get('/student/reservations', {
      params: filters
    });
    return res.data;
  },

  // POST /student/reservations/:id/cancel — annuler une réservation
  // ❌ SUPPRIMÉ : refund — plus de paiement plateforme
  cancelReservation: async (id: string) => {
    const res = await api.post(`/student/reservations/${id}/cancel`);
    return res.data;
  },
};

export default studentReservationService;