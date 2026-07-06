import adminApi from './adminApi';

// ⚠️ BACKEND REQUIS
const adminSubscriptionService = {

  // GET /admin/subscriptions/stats — statistiques globales
  getGlobalStats: async () => {
    const res = await adminApi.get('/subscriptions/stats');
    return res.data;
  },

  // GET /admin/subscriptions/tutors — tous les abonnements répétiteurs
  getTutorSubscriptions: async (filters: object) => {
    const res = await adminApi.get('/subscriptions/tutors', {
      params: filters
    });
    return res.data;
  },

  // GET /admin/subscriptions/groups — tous les abonnements groupes
  getGroupSubscriptions: async (filters: object) => {
    const res = await adminApi.get('/subscriptions/groups', {
      params: filters
    });
    return res.data;
  },

  // POST /admin/subscriptions/tutors/:id/activate
  // → admin active manuellement un abonnement
  activateTutorSubscription: async (tutorId: string) => {
    const res = await adminApi.post(
      `/subscriptions/tutors/${tutorId}/activate`
    );
    return res.data;
  },

  // POST /admin/subscriptions/tutors/:id/suspend
  // → admin suspend manuellement un abonnement
  suspendTutorSubscription: async (tutorId: string) => {
    const res = await adminApi.post(
      `/subscriptions/tutors/${tutorId}/suspend`
    );
    return res.data;
  },

  // POST /admin/subscriptions/groups/:id/activate
  activateGroupSubscription: async (groupId: string) => {
    const res = await adminApi.post(
      `/subscriptions/groups/${groupId}/activate`
    );
    return res.data;
  },

  // POST /admin/subscriptions/groups/:id/suspend
  suspendGroupSubscription: async (groupId: string) => {
    const res = await adminApi.post(
      `/subscriptions/groups/${groupId}/suspend`
    );
    return res.data;
  },

  // POST /admin/subscriptions/notify — envoyer rappel manuel
  // → envoie SMS + email au répétiteur ou admin groupe
  sendReminderManually: async (
    id: string,
    type: 'tutor' | 'group'
  ) => {
    const res = await adminApi.post('/subscriptions/notify', {
      id, type
    });
    return res.data;
  },

  // GET /admin/subscriptions/export — export CSV
  exportCSV: async () => {
    const res = await adminApi.get('/subscriptions/export', {
      responseType: 'blob'
    });
    return res.data;
  },
};

export default adminSubscriptionService;