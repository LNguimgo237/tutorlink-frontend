import api from './api';
import { BookingFormData } from '../types/booking.types';

// ⚠️ BACKEND REQUIS
const bookingService = {

  // GET /tutors/:id — infos du répétiteur
  getTutorById: async (tutorId: string) => {
    const res = await api.get(`/tutors/${tutorId}`);
    return res.data;
  },

  // GET /tutors/:id/availability — créneaux disponibles
  getTutorAvailability: async (tutorId: string) => {
    const res = await api.get(`/tutors/${tutorId}/availability`);
    return res.data;
  },

  // POST /reservations — créer une réservation
  // → déclenche le paiement Mobile Money
  createReservation: async (tutorId: string, data: BookingFormData) => {
    const res = await api.post('/reservations', { tutorId, ...data });
    return res.data;
  },
};

export default bookingService;