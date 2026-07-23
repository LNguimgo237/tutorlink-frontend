import api from './api';

// ⚠️ BACKEND REQUIS
const tutorProfileService = {

  // GET /tutors/:id — profil public complet
  getTutorProfile: async (tutorId: string) => {
    const res = await api.get(`/tutors/${tutorId}`);
    return res.data;
  },

  // GET /tutors/:id/reviews — tous les avis du répétiteur
  getTutorReviews: async (tutorId: string) => {
    const res = await api.get(`/tutors/${tutorId}/reviews`);
    return res.data;
  },

  // GET /tutors/:id/availability — créneaux disponibles
  getTutorAvailability: async (tutorId: string) => {
    const res = await api.get(`/tutors/${tutorId}/availability`);
    return res.data;
  },
};

export default tutorProfileService;