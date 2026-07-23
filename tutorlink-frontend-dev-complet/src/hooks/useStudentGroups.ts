import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import studentGroupService from '../services/studentGroupService';
import { StudentGroupItem, SuggestedGroup } from '../types/studentGroup.types';

export const useStudentGroups = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: myGroups = [] } = useQuery<StudentGroupItem[]>({
    queryKey: ['student-my-groups'],
    queryFn: studentGroupService.getMyGroups,
    staleTime: 60 * 1000,
  });

  const { data: suggestedGroups = [] } = useQuery<SuggestedGroup[]>({
    queryKey: ['student-suggested-groups'],
    queryFn: studentGroupService.getSuggestedGroups,
    staleTime: 5 * 60 * 1000,
  });

  const [payingGroupId, setPayingGroupId] = useState<string | null>(null);

  const payMutation = useMutation({
    mutationFn: ({ groupId, method }: { groupId: string; method: 'MTN' | 'Orange' }) =>
      studentGroupService.payMonthly(groupId, method),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['student-my-groups'] });
      setPayingGroupId(null);
    },
  });

  const leaveMutation = useMutation({
    mutationFn: studentGroupService.leaveGroup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['student-my-groups'] }),
  });

  const handlePay = (groupId: string, method: 'MTN' | 'Orange') =>
    payMutation.mutate({ groupId, method });
  const handleLeave = (groupId: string) => leaveMutation.mutate(groupId);
  const handleViewGroup = (groupId: string) => navigate(`/groupes/${groupId}`);
  const handleJoinSuggested = (groupId: string) => navigate(`/groupes/${groupId}`);

  const stats = {
    totalGroups: myGroups.length,
    monthlyTotal: myGroups.reduce((sum, g) => sum + g.monthlyPrice, 0),
    enRetard: myGroups.filter(g => g.paymentStatus === 'en_retard').length,
    totalSessions: myGroups.reduce((sum, g) => sum + g.sessions.length, 0),
  };

  return {
    myGroups, suggestedGroups, stats,
    payingGroupId, setPayingGroupId,
    handlePay, handleLeave,
    handleViewGroup, handleJoinSuggested,
  };
};