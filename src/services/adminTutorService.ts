import adminApi from './adminApi';

// ⚠️ BACKEND REQUIS — ces appels seront actifs quand l'API sera prête
const adminTutorService = {

  // GET /admin/tutors/pending — liste des répétiteurs en attente
  getPendingTutors: async () => {
    const res = await adminApi.get('/tutors/pending');
    return res.data;
  },

  // GET /admin/tutors/top-rated — répétiteurs les mieux notés
  getTopRatedTutors: async () => {
    const res = await adminApi.get('/tutors/top-rated');
    return res.data;
  },

  // PATCH /admin/tutors/:id/approve — approuver un répétiteur
  approveTutor: async (tutorId: string) => {
    const res = await adminApi.patch(`/tutors/${tutorId}/approve`);
    return res.data;
  },

  // PATCH /admin/tutors/:id/reject — rejeter avec motif obligatoire
  rejectTutor: async (tutorId: string, reason: string) => {
    const res = await adminApi.patch(`/tutors/${tutorId}/reject`, { reason });
    return res.data;
  },
};

export default adminTutorService;