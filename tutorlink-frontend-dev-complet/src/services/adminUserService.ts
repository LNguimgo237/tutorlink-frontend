import adminApi from './adminApi';
import { AdminUserItem, UserFilters } from '../types/adminUser.types';

const adminUserService = {
  // Récupère la liste filtrée des utilisateurs
  getUsers: async (filters: Partial<UserFilters>): Promise<AdminUserItem[]> => {
    const res = await adminApi.get('/users', { params: filters });
    return res.data;
  },

  // Suspend un compte utilisateur
  suspendUser: async (userId: string): Promise<void> => {
    await adminApi.patch(`/users/${userId}/suspend`);
  },

  // Valide un compte en attente
  validateUser: async (userId: string): Promise<void> => {
    await adminApi.patch(`/users/${userId}/validate`);
  },

  // Supprime définitivement un compte
  deleteUser: async (userId: string): Promise<void> => {
    await adminApi.delete(`/users/${userId}`);
  },
};

export default adminUserService;