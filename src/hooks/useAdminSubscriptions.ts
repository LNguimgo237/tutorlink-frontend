import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import adminSubscriptionService from '../services/adminSubscriptionService';
import { AdminSubscriptionFilters, SubscriptionGlobalStats } from '../types/adminSubscription.types';

const EMPTY_STATS: SubscriptionGlobalStats = {
  totalTutors: 0, tutorsTrial: 0, tutorsActive: 0, tutorsSuspended: 0, tutorsRevenue: 0,
  totalGroups: 0, groupsTrial: 0, groupsActive: 0, groupsSuspended: 0, groupsRevenue: 0,
  totalMonthlyRevenue: 0, totalAnnualRevenue: 0,
};

export const useAdminSubscriptions = () => {
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState<'tutors' | 'groups'>('tutors');
  const [filters, setFilters] = useState<AdminSubscriptionFilters>({
    search: '', status: 'TOUS', type: 'TOUS',
  });

  const { data: stats = EMPTY_STATS } = useQuery({
    queryKey: ['admin-subscriptions-stats'],
    queryFn: adminSubscriptionService.getGlobalStats,
    staleTime: 2 * 60 * 1000,
  });

  const { data: filteredTutors = [] } = useQuery({
    queryKey: ['admin-subscriptions-tutors', filters],
    queryFn: () => adminSubscriptionService.getTutorSubscriptions(filters),
    staleTime: 60 * 1000,
  });

  const { data: filteredGroups = [] } = useQuery({
    queryKey: ['admin-subscriptions-groups', filters],
    queryFn: () => adminSubscriptionService.getGroupSubscriptions(filters),
    staleTime: 60 * 1000,
  });

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: ['admin-subscriptions-tutors'] });
    queryClient.invalidateQueries({ queryKey: ['admin-subscriptions-groups'] });
    queryClient.invalidateQueries({ queryKey: ['admin-subscriptions-stats'] });
  };

  const activateTutorMutation = useMutation({
    mutationFn: adminSubscriptionService.activateTutorSubscription,
    onSuccess: invalidateAll,
  });
  const suspendTutorMutation = useMutation({
    mutationFn: adminSubscriptionService.suspendTutorSubscription,
    onSuccess: invalidateAll,
  });
  const activateGroupMutation = useMutation({
    mutationFn: adminSubscriptionService.activateGroupSubscription,
    onSuccess: invalidateAll,
  });
  const suspendGroupMutation = useMutation({
    mutationFn: adminSubscriptionService.suspendGroupSubscription,
    onSuccess: invalidateAll,
  });

  const handleActivateTutor = (tutorId: string) => activateTutorMutation.mutate(tutorId);
  const handleSuspendTutor = (tutorId: string) => suspendTutorMutation.mutate(tutorId);
  const handleActivateGroup = (groupId: string) => activateGroupMutation.mutate(groupId);
  const handleSuspendGroup = (groupId: string) => suspendGroupMutation.mutate(groupId);

  // Export réel via le backend (endpoint déjà défini : GET /subscriptions/export)
  // au lieu de reconstruire un CSV côté client à partir des données affichées.
  const handleExportCSV = async () => {
    const blob: Blob = await adminSubscriptionService.exportCSV();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'abonnements-tutorlink.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    activeTab, setActiveTab,
    filters, setFilters,
    stats,
    filteredTutors, filteredGroups,
    handleActivateTutor, handleSuspendTutor,
    handleActivateGroup, handleSuspendGroup,
    handleExportCSV,
  };
};