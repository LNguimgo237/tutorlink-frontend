import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminGroupService from '../services/adminGroupeService';
import { AdminGroup, AdminGroupFilters } from '../types/adminGroup.types';

export const useAdminGroups = () => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<AdminGroupFilters>({
    search: '', status: 'TOUS', subject: '',
  });

  const [selectedGroup, setSelectedGroup] = useState<AdminGroup | null>(null);

  const { data: filteredGroups = [], isLoading } = useQuery({
    queryKey: ['admin-groups', filters],
    queryFn: () => adminGroupService.getGroups(filters),
    staleTime: 60 * 1000,
  });

  const verifyMutation = useMutation({
    mutationFn: adminGroupService.verifyGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-groups'] }),
  });

  const suspendMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      adminGroupService.suspendGroup(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-groups'] });
      setSelectedGroup(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: adminGroupService.deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-groups'] });
      setSelectedGroup(null);
    },
  });

  const handleVerify = (id: string) => verifyMutation.mutate(id);
  const handleSuspend = (id: string) =>
    suspendMutation.mutate({ id, reason: 'Suspendu par l\'administrateur' });
  const handleDelete = (id: string) => deleteMutation.mutate(id);

  const stats = {
    total: filteredGroups.length,
    actifs: filteredGroups.filter((g: AdminGroup) => g.status === 'actif').length,
    enAttente: filteredGroups.filter((g: AdminGroup) => g.status === 'en_attente').length,
    totalEleves: filteredGroups.reduce((sum: number, g: AdminGroup) => sum + g.currentMembers, 0),
    totalRevenus: filteredGroups.reduce((sum: number, g: AdminGroup) => sum + g.totalRevenue, 0),
  };

  return {
    filteredGroups, filters, setFilters, stats, isLoading,
    selectedGroup, setSelectedGroup,
    handleVerify, handleSuspend, handleDelete,
  };
};