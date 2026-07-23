import { useQuery } from '@tanstack/react-query';
import adminDashboardService from '../services/adminDashboardService';

export const useAdminStats = () => {
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ['admin-dashboard-stats'],
    queryFn: adminDashboardService.getStats,
    staleTime: 2 * 60 * 1000,
  });

  const { data: monthlyData = [], isLoading: isLoadingMonthly } = useQuery({
    queryKey: ['admin-dashboard-monthly'],
    queryFn: adminDashboardService.getMonthlyData,
    staleTime: 5 * 60 * 1000,
  });

  const { data: alerts = [], isLoading: isLoadingAlerts } = useQuery({
    queryKey: ['admin-dashboard-alerts'],
    queryFn: adminDashboardService.getAlerts,
    staleTime: 60 * 1000,
  });

  const { data: recentRegistrations = [], isLoading: isLoadingRegistrations } = useQuery({
    queryKey: ['admin-dashboard-registrations'],
    queryFn: adminDashboardService.getRecentRegistrations,
    staleTime: 60 * 1000,
  });

  const loading =
    isLoadingStats || isLoadingMonthly || isLoadingAlerts || isLoadingRegistrations;

  return { stats, monthlyData, alerts, recentRegistrations, loading };
};