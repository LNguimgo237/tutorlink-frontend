import adminApi from './adminApi';

// ⚠️ BACKEND REQUIS
const adminGroupService = {

  // GET /admin/groups — liste tous les groupes
  getGroups: async (filters: object) => {
    const res = await adminApi.get('/groups', { params: filters });
    return res.data;
  },

  // PATCH /admin/groups/:id/verify — vérifier un groupe
  verifyGroup: async (id: string) => {
    const res = await adminApi.patch(`/groups/${id}/verify`);
    return res.data;
  },

  // PATCH /admin/groups/:id/suspend — suspendre un groupe
  suspendGroup: async (id: string, reason: string) => {
    const res = await adminApi.patch(`/groups/${id}/suspend`, { reason });
    return res.data;
  },

  // DELETE /admin/groups/:id — supprimer un groupe
  deleteGroup: async (id: string) => {
    await adminApi.delete(`/groups/${id}`);
  },

  // GET /admin/groups/:id/members — membres d'un groupe
  getGroupMembers: async (id: string) => {
    const res = await adminApi.get(`/groups/${id}/members`);
    return res.data;
  },
};

export default adminGroupService;