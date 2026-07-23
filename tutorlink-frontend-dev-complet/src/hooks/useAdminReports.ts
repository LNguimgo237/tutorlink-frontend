import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import adminReportsService from '../services/adminReportsService';
import {
  ReportFilters, ReportStats,
  ChartDataPoint, SubjectPerformance, QuartierStats,
} from '../types/adminReports.types';

const EMPTY_STATS: ReportStats = {
  totalReservations: 0, totalRevenus: 0,
  tutorSubscriptionRevenue: 0, groupSubscriptionRevenue: 0,
  totalEleves: 0, totalRepetiteurs: 0, tauxSatisfaction: 0,
  totalGroupsActifs: 0, totalTutorsActifs: 0,
};

export const useAdminReports = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    period: '30j', subject: '', quartier: '',
  });

  const { data: stats = EMPTY_STATS } = useQuery({
    queryKey: ['admin-reports-stats', filters],
    queryFn: () => adminReportsService.getStats(filters),
    staleTime: 60 * 1000,
  });

  const { data: chartData = [] } = useQuery<ChartDataPoint[]>({
    queryKey: ['admin-reports-chart', filters],
    queryFn: () => adminReportsService.getChartData(filters),
    staleTime: 60 * 1000,
  });

  const { data: subjectPerformance = [] } = useQuery<SubjectPerformance[]>({
    queryKey: ['admin-reports-subjects', filters],
    queryFn: () => adminReportsService.getSubjectPerformance(filters),
    staleTime: 60 * 1000,
  });

  const { data: quartierStats = [] } = useQuery<QuartierStats[]>({
    queryKey: ['admin-reports-quartiers', filters],
    queryFn: () => adminReportsService.getQuartierStats(filters),
    staleTime: 60 * 1000,
  });

  // ⚠️ Aucun endpoint backend prévu pour "subscriptionData" (évolution mensuelle
  // du nombre d'abonnements tuteurs/groupes) — à ajouter côté backend si ce
  // graphique doit rester. En attendant, tableau vide pour ne pas planter l'UI.
  const subscriptionData: { month: string; tutors: number; groups: number }[] = [];

  const handleExportCSV = async () => {
    const blob: Blob = await adminReportsService.exportCSV(filters);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `rapport-tutorlink-${filters.period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    filters, setFilters,
    stats, chartData, subscriptionData,
    subjectPerformance, quartierStats,
    handleExportCSV,
  };
};