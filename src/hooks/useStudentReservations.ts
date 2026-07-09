import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import studentReservationService from '../services/studentReservationService';
import { StudentReservation, StudentReservationFilters } from '../types/studentReservation.types';

export const useStudentReservations = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [filters, setFilters] = useState<StudentReservationFilters>({
    search: '', status: 'TOUS',
  });

  const [selectedReservation, setSelectedReservation] =
    useState<StudentReservation | null>(null);

  const { data: filteredReservations = [] } = useQuery<StudentReservation[]>({
    queryKey: ['student-reservations', filters],
    queryFn: () => studentReservationService.getReservations(filters),
    staleTime: 60 * 1000,
  });

  const cancelMutation = useMutation({
    mutationFn: studentReservationService.cancelReservation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-reservations'] });
      setSelectedReservation(null);
    },
  });

  const handleCancel = (id: string) => cancelMutation.mutate(id);
  const handleContact = (_tutorName: string) => navigate('/messagerie');

  const stats = {
    total: filteredReservations.length,
    confirmees: filteredReservations.filter(r => r.status === 'confirme').length,
    enAttente: filteredReservations.filter(r => r.status === 'en_attente').length,
    terminees: filteredReservations.filter(r => r.status === 'termine').length,
  };

  return {
    filteredReservations, filters, setFilters, stats,
    selectedReservation, setSelectedReservation,
    handleCancel, handleContact,
  };
};