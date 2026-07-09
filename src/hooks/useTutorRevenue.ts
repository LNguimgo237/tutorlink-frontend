import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import revenueService from '../services/revenueService';
import {
  RevenuePeriod, RevenueStats,
  RevenueDataPoint, RevenueTransaction
} from '../types/revenue.types';

const EMPTY_STATS: RevenueStats = {
  totalBrut: 0, totalCommission: 0, totalNet: 0,
  totalIndividuel: 0, totalGroupe: 0, evolution: 0,
};

export const useTutorRevenue = () => {
  const [period, setPeriod] = useState<RevenuePeriod>('30j');

  const { data: stats = EMPTY_STATS } = useQuery({
    queryKey: ['tutor-revenue-stats', period],
    queryFn: () => revenueService.getStats(period),
    staleTime: 60 * 1000,
  });

  const { data: chartData = [] } = useQuery<RevenueDataPoint[]>({
    queryKey: ['tutor-revenue-chart', period],
    queryFn: () => revenueService.getChartData(period),
    staleTime: 60 * 1000,
  });

  const { data: transactions = [] } = useQuery<RevenueTransaction[]>({
    queryKey: ['tutor-revenue-transactions', period],
    queryFn: () => revenueService.getTransactions(period),
    staleTime: 60 * 1000,
  });

  // Export réel via le backend au lieu de reconstruire un CSV côté client
  const handleExportCSV = async () => {
    const blob: Blob = await revenueService.exportCSV(period);
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `revenus-tutorlink-${period}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    period, setPeriod,
    stats, chartData, transactions,
    handleExportCSV,
  };
};