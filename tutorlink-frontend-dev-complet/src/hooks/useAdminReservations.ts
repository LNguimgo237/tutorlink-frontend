import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminReservationService from '../services/adminReservationService';
import { AdminReservation, ReservationFilters } from '../types/adminReservation.types';

export const useAdminReservations = () => {
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<ReservationFilters>({
    search: '', courseStatus: 'TOUS',
    dateFrom: '', dateTo: '',
  });

  const [selectedReservation, setSelectedReservation] =
    useState<AdminReservation | null>(null);

  const { data: filtered = [], isLoading } = useQuery({
    queryKey: ['admin-reservations', filters],
    queryFn: () => adminReservationService.getReservations(filters),
    staleTime: 60 * 1000,
  });

  const cancelMutation = useMutation({
    mutationFn: adminReservationService.cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-reservations'] });
      setSelectedReservation(null);
    },
  });

  const handleCancel = (id: string) => cancelMutation.mutate(id);

  const stats = {
    total: filtered.length,
    confirmees: filtered.filter((r: AdminReservation) => r.courseStatus === 'confirmee').length,
    terminees: filtered.filter((r: AdminReservation) => r.courseStatus === 'terminee').length,
    annulees: filtered.filter((r: AdminReservation) => r.courseStatus === 'annulee').length,
  };

  return {
    filtered, filters, setFilters, stats, isLoading,
    selectedReservation, setSelectedReservation,
    handleCancel,
  };
};