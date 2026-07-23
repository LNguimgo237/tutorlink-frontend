import { useState } from 'react';
import {
  ReportFilters, ReportStats,
  ChartDataPoint, SubjectPerformance, QuartierStats
} from '../types/adminReports.types';

export const useAdminReports = () => {

  // Filtres actifs
  const [filters, setFilters] = useState<ReportFilters>({
    period: '30j', subject: '', quartier: '',
  });

  // ── DONNÉES MOCK ── à remplacer par adminReportsService quand backend prêt

  const stats: ReportStats = {
    totalReservations: 30,
    totalRevenus: 92500,
    totalEleves: 128,
    totalRepetiteurs: 12,
    tauxSatisfaction: 98,
    revenuMoyen: 3036,
    reservationsParJour: 8,
  };

  const chartData: ChartDataPoint[] = [
    { label: 'Jan', reservations: 12, revenus: 4200, inscriptions: 10 },
    { label: 'Fév', reservations: 18, revenus: 6475, inscriptions: 12 },
    { label: 'Mar', reservations: 21, revenus: 7350, inscriptions: 18 },
    { label: 'Avr', reservations: 26, revenus: 9345, inscriptions: 19 },
    { label: 'Mai', reservations: 31, revenus: 10850, inscriptions: 22 },
    { label: 'Jun', reservations: 28, revenus: 10115, inscriptions: 20 },
  ];

  const subjectPerformance: SubjectPerformance[] = [
    { subject: 'Mathématiques', reservations: 12, revenus: 4340, satisfaction: 4.8, pct: 41 },
    { subject: 'Physique-Chimie', reservations: 20,  revenus: 28700, satisfaction: 4.7, pct: 27 },
    { subject: 'Anglais',         reservations: 54,  revenus: 18900, satisfaction: 4.9, pct: 18 },
    { subject: 'Français',        reservations: 29,  revenus: 10150, satisfaction: 4.6, pct: 10 },
    { subject: 'SVT',             reservations: 15,  revenus: 5495,  satisfaction: 4.5, pct: 4  },
  ];

  const quartierStats: QuartierStats[] = [
    { quartier: 'Centre Dschang', reservations: 12, revenus: 4340000, pct: 41 },
    { quartier: 'Foto',           reservations: 20,  revenus: 2870000, pct: 27 },
    { quartier: 'Ngui',           reservations: 15,  revenus: 1890000, pct: 18 },
    { quartier: 'Bafoussam Road', reservations: 10,  revenus: 1015000, pct: 10 },
    { quartier: 'Tsinkop',        reservations: 8,  revenus: 549500,  pct: 4  },
  ];

  // Export CSV (mock — ouvre une fenêtre de téléchargement)
  const handleExportCSV = () => {
    const rows = [
      ['Mois', 'Réservations', 'Revenus FCFA', 'Inscriptions'],
      ...chartData.map(d => [d.label, d.reservations, d.revenus, d.inscriptions]),
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
    stats, chartData, subjectPerformance, quartierStats,
    handleExportCSV,
  };
};