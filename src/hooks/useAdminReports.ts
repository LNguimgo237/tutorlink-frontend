import { useState } from 'react';
import {
  ReportFilters, ReportStats,
  ChartDataPoint, SubjectPerformance, QuartierStats
} from '../types/adminReports.types';

export const useAdminReports = () => {
  const [filters, setFilters] = useState<ReportFilters>({
    period: '30j', subject: '', quartier: '',
  });

  // ── STATS MOCK ── revenus = abonnements uniquement
  const stats: ReportStats = {
    totalReservations: 3047,
    // ❌ SUPPRIMÉ : totalRevenus (commissions cours)
    // ✅ REMPLACÉ : revenus abonnements
    totalRevenus: 1349000,
    tutorSubscriptionRevenue: 1194000,
    groupSubscriptionRevenue: 155000,
    totalEleves: 1284,
    totalRepetiteurs: 512,
    tauxSatisfaction: 98,
    // ❌ SUPPRIMÉ : revenuMoyen par réservation
    totalGroupsActifs: 31,
    totalTutorsActifs: 398,
  };

  const chartData: ChartDataPoint[] = [
    { month: 'Jan', reservations: 120, revenus: 280000, inscriptions: 45 },
    { month: 'Fév', reservations: 185, revenus: 780000, inscriptions: 62 },
    { month: 'Mar', reservations: 210, revenus: 960000, inscriptions: 78 },
    { month: 'Avr', reservations: 267, revenus: 1100000, inscriptions: 91 },
    { month: 'Mai', reservations: 310, revenus: 1250000, inscriptions: 104 },
    { month: 'Jun', reservations: 289, revenus: 1349000, inscriptions: 87 },
  ];

  // Données abonnements pour graphique séparé
  const subscriptionData = [
    { month: 'Jan', tutors: 120, groups: 8 },
    { month: 'Fév', tutors: 198, groups: 14 },
    { month: 'Mar', tutors: 267, groups: 19 },
    { month: 'Avr', tutors: 312, groups: 24 },
    { month: 'Mai', tutors: 367, groups: 28 },
    { month: 'Jun', tutors: 398, groups: 31 },
  ];

  const subjectPerformance: SubjectPerformance[] = [
    { subject: 'Mathématiques', reservations: 1240, revenus: 0, satisfaction: 4.8, pct: 41 },
    { subject: 'Physique-Chimie', reservations: 820, revenus: 0, satisfaction: 4.7, pct: 27 },
    { subject: 'Anglais', reservations: 540, revenus: 0, satisfaction: 4.9, pct: 18 },
    { subject: 'Français', reservations: 290, revenus: 0, satisfaction: 4.6, pct: 10 },
    { subject: 'SVT', reservations: 157, revenus: 0, satisfaction: 4.5, pct: 4 },
  ];

  const quartierStats: QuartierStats[] = [
    { quartier: 'Centre Dschang', reservations: 1240, revenus: 0, pct: 41 },
    { quartier: 'Foto', reservations: 820, revenus: 0, pct: 27 },
    { quartier: 'Ngui', reservations: 540, revenus: 0, pct: 18 },
    { quartier: 'Bafoussam Road', reservations: 290, revenus: 0, pct: 10 },
    { quartier: 'Tsinkop', reservations: 157, revenus: 0, pct: 4 },
  ];

  const handleExportCSV = () => {
    const rows = [
      ['Mois', 'Réservations', 'Revenus abonnements', 'Inscriptions'],
      ...chartData.map(d => [d.month, d.reservations, d.revenus, d.inscriptions]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
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