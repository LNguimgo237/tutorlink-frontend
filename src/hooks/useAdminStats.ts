import { useState, useEffect } from 'react';
import { DashboardStats, MonthlyData, ModerationAlert, RecentRegistration } from '../types/admin.types';

export const useAdminStats = () => {
  const [loading, setLoading] = useState(true);

  // Données mock — à remplacer par adminDashboardService quand le backend est prêt
  const [stats] = useState<DashboardStats>({
    totalUsers: 56,
    totalTutors: 5,
    totalReservations: 22,
    totalRevenue: 9250,
    pendingValidations: 15,
    activeSessionsToday: 20,
  });

  const [monthlyData] = useState<MonthlyData[]>([
    { month: 'Jan', reservations: 80, inscriptions: 45 },
    { month: 'Fév', reservations: 100, inscriptions: 62 },
    { month: 'Mar', reservations: 120, inscriptions: 78 },
    { month: 'Avr', reservations: 60, inscriptions: 45 },
    { month: 'Mai', reservations: 45, inscriptions: 19 },
    { month: 'Jun', reservations: 23, inscriptions: 12 },
  ]);

  const [alerts] = useState<ModerationAlert[]>([
    { id: '1', type: 'validation', message: '12 répétiteurs en attente de validation', date: '2026-06-22', urgent: true },
    { id: '2', type: 'signalement', message: 'Signalement sur M. Nguimgo L.', date: '2026-06-21', urgent: false },
    { id: '3', type: 'litige', message: 'Litige paiement — réservation #1042', date: '2026-06-20', urgent: true },
  ]);

  const [recentRegistrations] = useState<RecentRegistration[]>([
    { id: '1', name: 'M. Leonel Nguimgo', role:'REPETITEUR', date: '2026-06-22', status: 'en_attente' },
    { id: '2', name: 'Mll Larissa', role: 'ELEVE', date: '2026-06-22', status: 'actif' },
    { id: '3', name: 'M. Nguena Jules', role: 'REPETITEUR', date: '2026-06-21', status: 'en_attente' },
    { id: '4', name: 'Abarka', role: 'ELEVE', date: '2026-06-21', status: 'actif' },
  ]);

  useEffect(() => {
    // Simule un chargement de 800ms
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return { stats, monthlyData, alerts, recentRegistrations, loading };
};