import api from './api';
import { GroupFilters } from '../types/group.types';

// ⚠️ BACKEND REQUIS
const groupService = {

  // GET /groups — liste publique filtrée
  getGroups: async (filters: Partial<GroupFilters>) => {
    const res = await api.get('/groups', { params: filters });
    return res.data;
  },

  // GET /groups/:id — détail complet d'un groupe
  getGroupById: async (id: string) => {
    const res = await api.get(`/groups/${id}`);
    return res.data;
  },

  // GET /groups/:id/reviews — avis des membres
  getGroupReviews: async (id: string) => {
    const res = await api.get(`/groups/${id}/reviews`);
    return res.data;
  },

  // POST /groups/:id/join — rejoindre un groupe
  // → déclenche paiement Mobile Money
  joinGroup: async (groupId: string, paymentMethod: 'MTN' | 'Orange') => {
    const res = await api.post(`/groups/${groupId}/join`, { paymentMethod });
    return res.data;
  },

  // POST /groups/:id/waitlist — liste d'attente si complet
  joinWaitlist: async (groupId: string) => {
    const res = await api.post(`/groups/${groupId}/waitlist`);
    return res.data;
  },

  // POST /groups/:id/leave — quitter un groupe
  leaveGroup: async (groupId: string) => {
    const res = await api.post(`/groups/${groupId}/leave`);
    return res.data;
  },
};

export default groupService;