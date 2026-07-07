import { useState, useEffect } from 'react';
import { DashboardStats, MonthlyData, ModerationAlert, RecentRegistration } from '../types/admin.types';

export const useAdminStats = () => {
  const [loading, setLoading] = useState(true);

  // ── STATS MOCK ── revenus = abonnements uniquement
  const [stats] = useState<DashboardStats>({
    totalUsers: 1284,
    totalTutors: 512,
    totalReservations: 3047,
    // ❌ SUPPRIMÉ : totalRevenue (commissions cours)
    // ✅ REMPLACÉ PAR : revenus abonnements
    totalRevenue: 1349000,        // 398×3000 + 31×5000
    tutorSubscriptionRevenue: 1194000,  // 398 répétiteurs actifs
    groupSubscriptionRevenue: 155000,   // 31 groupes actifs
    pendingValidations: 14,
    activeSessionsToday: 23,
    // ✅ NOUVEAU : abonnements en alerte
    tutorsExpiringThisWeek: 8,   // répétiteurs dont abonnement expire
    groupsExpiringThisWeek: 3,   // groupes dont abonnement expire
  });

  const [monthlyData] = useState<MonthlyData[]>([
    { month: 'Jan', reservations: 120, inscriptions: 45 },
    { month: 'Fév', reservations: 185, inscriptions: 62 },
    { month: 'Mar', reservations: 210, inscriptions: 78 },
    { month: 'Avr', reservations: 267, inscriptions: 91 },
    { month: 'Mai', reservations: 310, inscriptions: 104 },
    { month: 'Jun', reservations: 289, inscriptions: 87 },
  ]);

  const [alerts] = useState<ModerationAlert[]>([
    {
      id: '1',
      type: 'validation',
      message: '14 répétiteurs en attente de validation',
      date: '2026-06-22',
      urgent: true,
    },
    {
      id: '2',
      type: 'signalement',
      message: 'Signalement sur M. Kamga Eric',
      date: '2026-06-21',
      urgent: false,
    },
    // ✅ NOUVEAU : alertes abonnements
    {
      id: '3',
      type: 'validation',
      message: '8 répétiteurs dont l\'abonnement expire cette semaine',
      date: '2026-06-22',
      urgent: true,
    },
    {
      id: '4',
      type: 'validation',
      message: '3 groupes dont l\'abonnement expire cette semaine',
      date: '2026-06-22',
      urgent: false,
    },
  ]);

  const [recentRegistrations] = useState<RecentRegistration[]>([
    { id: '1', name: 'Mme Fotso Aline', role: 'REPETITEUR', date: '2026-06-22', status: 'en_attente' },
    { id: '2', name: 'Paul Nkeng', role: 'ELEVE', date: '2026-06-22', status: 'actif' },
    { id: '3', name: 'M. Tagne Jules', role: 'REPETITEUR', date: '2026-06-21', status: 'en_attente' },
    { id: '4', name: 'Marie Tchana', role: 'ELEVE', date: '2026-06-21', status: 'actif' },
  ]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return { stats, monthlyData, alerts, recentRegistrations, loading };
};