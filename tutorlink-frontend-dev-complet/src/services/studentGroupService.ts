import api from './api';

// ⚠️ BACKEND REQUIS
const studentGroupService = {

  // GET /student/groups — groupes de l'élève connecté
  getMyGroups: async () => {
    const res = await api.get('/student/groups');
    return res.data;
  },

  // GET /groups/suggested — groupes suggérés selon matières
  // Le backend suggère des groupes selon le niveau et
  // les matières des cours réservés par l'élève
  getSuggestedGroups: async () => {
    const res = await api.get('/groups/suggested');
    return res.data;
  },

  // POST /groups/:id/pay — payer le mois en cours
  // → déclenche paiement MTN MoMo ou Orange Money
  // → backend confirme et met à jour le statut paiement
  payMonthly: async (
    groupId: string,
    method: 'MTN' | 'Orange'
  ) => {
    const res = await api.post(`/groups/${groupId}/pay`, {
      method
    });
    return res.data;
  },

  // POST /groups/:id/leave — quitter un groupe
  // → backend notifie le répétiteur
  // → backend libère la place
  leaveGroup: async (groupId: string) => {
    const res = await api.post(`/groups/${groupId}/leave`);
    return res.data;
  },
};

export default studentGroupService;