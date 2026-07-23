import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminUserService from '../services/adminUserService';
import { AdminUserItem, UserFilters } from '../types/adminUser.types';

export const useAdminUsers = () => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<UserFilters>({
    search: '', role: 'TOUS', status: 'TOUS', quartier: '',
  });

  const [selectedUser, setSelectedUser] = useState<AdminUserItem | null>(null);

  const { data: filteredUsers = [], isLoading } = useQuery({
    queryKey: ['admin-users', filters],
    queryFn: () => adminUserService.getUsers(filters),
    staleTime: 60 * 1000,
  });

  const suspendMutation = useMutation({
    mutationFn: adminUserService.suspendUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const validateMutation = useMutation({
    mutationFn: adminUserService.validateUser,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-users'] }),
  });

  const deleteMutation = useMutation({
    mutationFn: adminUserService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] });
      setSelectedUser(null);
    },
  });

  const handleSuspend = (userId: string) => suspendMutation.mutate(userId);
  const handleValidate = (userId: string) => validateMutation.mutate(userId);
  const handleDelete = (userId: string) => deleteMutation.mutate(userId);

  return {
    filteredUsers, filters, setFilters, isLoading,
    selectedUser, setSelectedUser,
    handleSuspend, handleValidate, handleDelete,
  };
};