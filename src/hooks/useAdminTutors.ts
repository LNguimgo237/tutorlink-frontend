import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminTutorService from '../services/adminTutorService';

export const useAdminTutors = () => {
  const queryClient = useQueryClient();

  const { data: pendingOnly = [], isLoading: isLoadingPending } = useQuery({
    queryKey: ['admin-tutors-pending'],
    queryFn: adminTutorService.getPendingTutors,
    staleTime: 60 * 1000,
  });

  const { data: topTutors = [], isLoading: isLoadingTop } = useQuery({
    queryKey: ['admin-tutors-top-rated'],
    queryFn: adminTutorService.getTopRatedTutors,
    staleTime: 5 * 60 * 1000,
  });

  const [viewedDoc, setViewedDoc] = useState<string | null>(null);

  const approveMutation = useMutation({
    mutationFn: adminTutorService.approveTutor,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-tutors-pending'] }),
  });

  const rejectMutation = useMutation({
    mutationFn: ({ tutorId, reason }: { tutorId: string; reason: string }) =>
      adminTutorService.rejectTutor(tutorId, reason),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-tutors-pending'] }),
  });

  const handleApprove = (tutorId: string) => approveMutation.mutate(tutorId);
  const handleReject = (tutorId: string, reason: string) =>
    rejectMutation.mutate({ tutorId, reason });

  return {
    pendingOnly, topTutors,
    isLoading: isLoadingPending || isLoadingTop,
    viewedDoc, setViewedDoc,
    handleApprove, handleReject,
  };
};