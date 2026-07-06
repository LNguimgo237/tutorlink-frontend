import { useState } from 'react';
import { AdminUserItem, UserFilters } from '../types/adminUser.types';

export const useAdminUsers = () => {
  // Données mock — remplacer par adminUserService quand backend prêt
  const [users, setUsers] = useState<AdminUserItem[]>([
    { id: '1', name: 'Leonel Nguims', email: 'leonel@gmail.com', phone: '683428312',
      role: 'ELEVE', status: 'actif', quartier: 'Centre Dschang', createdAt: '2026-05-10', lastLogin: '2026-06-21' },
    { id: '2', name: 'Mme Fotso Aline', email: 'aline@gmail.com', phone: '699334455',
      role: 'REPETITEUR', status: 'a_valider', quartier: 'Foto', createdAt: '2026-06-20', lastLogin: '2026-06-20' },
    { id: '3', name: 'Marie Francine', email: 'marie@gmail.com', phone: '655778899',
      role: 'PARENT', status: 'actif', quartier: 'Ngui', createdAt: '2026-04-15', lastLogin: '2026-06-18' },
    { id: '4', name: 'M. Sonfack Jules', email: 'jules@gmail.com', phone: '677445566',
      role: 'REPETITEUR', status: 'suspendu', quartier: 'Bafoussam Road', createdAt: '2026-03-01', lastLogin: '2026-05-30' },
    { id: '5', name: 'Sophie Nguena', email: 'sophie@gmail.com', phone: '699112233',
      role: 'ELEVE', status: 'actif', quartier: 'Tsinkop', createdAt: '2026-06-01', lastLogin: '2026-06-22' },
  ]);

  // Filtres actifs
  const [filters, setFilters] = useState<UserFilters>({
    search: '', role: 'TOUS', status: 'TOUS', quartier: '',
  });

  // Utilisateur sélectionné pour le modal de détail
  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  // Filtre les utilisateurs selon les critères actifs
  const filteredUsers = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(filters.search.toLowerCase())
      || u.email.toLowerCase().includes(filters.search.toLowerCase());
    const matchRole = filters.role === 'TOUS' || u.role === filters.role;
    const matchStatus = filters.status === 'TOUS' || u.status === filters.status;
    const matchQuartier = !filters.quartier || u.quartier.toLowerCase().includes(filters.quartier.toLowerCase());
    return matchSearch && matchRole && matchStatus && matchQuartier;
  });

  // Suspend un utilisateur (mock)
  //const handleSuspend = (userId: string) => {
    //setUsers(prev => prev.map(u =>
      //u.id === userId ? { ...u, status: 'suspendu' } : u
    //));
  //};

  // Valide un utilisateur (mock)
  //const handleValidate = (userId: string) => {
    //setUsers(prev => prev.map(u =>
     // u.id === userId ? { ...u, status: 'actif' } : u
    //));
 // };

  // Supprime un utilisateur (mock)
  const handleDelete = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
    setSelectedUser(null);
  };

  return {
    filteredUsers, filters, setFilters,
    selectedUser, setSelectedUser,
     handleDelete,
  };
};