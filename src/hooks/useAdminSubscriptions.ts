import { useState } from 'react';
import {
  AdminTutorSubscription, AdminGroupSubscription,
  SubscriptionGlobalStats, AdminSubscriptionFilters
} from '../types/adminSubscription.types';

export const useAdminSubscriptions = () => {

  // Onglet actif : répétiteurs ou groupes
  const [activeTab, setActiveTab] = useState<'tutors' | 'groups'>('tutors');

  // Filtres actifs
  const [filters, setFilters] = useState<AdminSubscriptionFilters>({
    search: '', status: 'TOUS', type: 'TOUS',
  });

  // ── STATS GLOBALES MOCK ──
  const [stats] = useState<SubscriptionGlobalStats>({
    totalTutors: 512,
    tutorsTrial: 87,
    tutorsActive: 398,
    tutorsSuspended: 27,
    tutorsRevenue: 1194000,       // 398 × 3000 FCFA

    totalGroups: 42,
    groupsTrial: 8,
    groupsActive: 31,
    groupsSuspended: 3,
    groupsRevenue: 155000,        // 31 × 5000 FCFA

    totalMonthlyRevenue: 1349000, // total mensuel
    totalAnnualRevenue: 16188000, // projection annuelle
  });

  // ── ABONNEMENTS RÉPÉTITEURS MOCK ──
  const [tutorSubscriptions, setTutorSubscriptions] =
    useState<AdminTutorSubscription[]>([
      {
        id: 'ts1',
        tutorId: 't1',
        tutorName: 'M. Kamga Eric',
        tutorEmail: 'kamga@gmail.com',
        tutorPhone: '677001122',
        subject: 'Mathématiques',
        quartier: 'Centre Dschang',
        status: 'active',
        trialStartDate: '2026-01-01',
        trialEndDate: '2026-03-01',
        currentPeriodEnd: '2026-07-15',
        daysRemaining: 12,
        isTrialPeriod: false,
        monthlyPrice: 3000,
        totalPaid: 18000,
        paymentsCount: 6,
        autoRenew: true,
        lastPaymentDate: '2026-06-15',
        joinedAt: '2026-01-01',
      },
      {
        id: 'ts2',
        tutorId: 't2',
        tutorName: 'Mme Tchana Sylvie',
        tutorEmail: 'tchana@gmail.com',
        tutorPhone: '699334455',
        subject: 'Physique-Chimie',
        quartier: 'Quartier Foto',
        status: 'trial',
        trialStartDate: '2026-06-01',
        trialEndDate: '2026-08-01',
        currentPeriodEnd: '2026-08-01',
        daysRemaining: 29,
        isTrialPeriod: true,
        monthlyPrice: 3000,
        totalPaid: 0,
        paymentsCount: 0,
        autoRenew: false,
        lastPaymentDate: '',
        joinedAt: '2026-06-01',
      },
      {
        id: 'ts3',
        tutorId: 't3',
        tutorName: 'Mlle Fotso Aline',
        tutorEmail: 'aline@gmail.com',
        tutorPhone: '655778899',
        subject: 'Anglais',
        quartier: 'Centre Dschang',
        status: 'suspended',
        trialStartDate: '2026-02-01',
        trialEndDate: '2026-04-01',
        currentPeriodEnd: '2026-06-20',
        daysRemaining: 0,
        isTrialPeriod: false,
        monthlyPrice: 3000,
        totalPaid: 9000,
        paymentsCount: 3,
        autoRenew: false,
        lastPaymentDate: '2026-05-20',
        joinedAt: '2026-02-01',
      },
    ]);

  // ── ABONNEMENTS GROUPES MOCK ──
  const [groupSubscriptions, setGroupSubscriptions] =
    useState<AdminGroupSubscription[]>([
      {
        id: 'gs1',
        groupId: 'g1',
        groupName: 'Maths BAC C/D · Groupe Élite',
        tutorName: 'M. Kamga Eric',
        tutorId: 't1',
        subject: 'Mathématiques',
        currentMembers: 6,
        maxMembers: 8,
        status: 'active',
        trialStartDate: '2026-01-15',
        trialEndDate: '2026-02-15',
        currentPeriodEnd: '2026-07-15',
        daysRemaining: 12,
        isTrialPeriod: false,
        monthlyPrice: 5000,
        totalPaid: 30000,
        paymentsCount: 6,
        lastPaymentDate: '2026-06-15',
      },
      {
        id: 'gs2',
        groupId: 'g2',
        groupName: 'English Club · Conversation',
        tutorName: 'Mlle Fotso Aline',
        tutorId: 't3',
        subject: 'Anglais',
        currentMembers: 7,
        maxMembers: 10,
        status: 'trial',
        trialStartDate: '2026-06-10',
        trialEndDate: '2026-07-10',
        currentPeriodEnd: '2026-07-10',
        daysRemaining: 7,
        isTrialPeriod: true,
        monthlyPrice: 5000,
        totalPaid: 0,
        paymentsCount: 0,
        lastPaymentDate: '',
      },
      {
        id: 'gs3',
        groupId: 'g3',
        groupName: 'SVT · Prépa BAC D',
        tutorName: 'Mme Mbouh Carine',
        tutorId: 't5',
        subject: 'SVT',
        currentMembers: 8,
        maxMembers: 8,
        status: 'suspended',
        trialStartDate: '2026-01-20',
        trialEndDate: '2026-02-20',
        currentPeriodEnd: '2026-06-15',
        daysRemaining: 0,
        isTrialPeriod: false,
        monthlyPrice: 5000,
        totalPaid: 20000,
        paymentsCount: 4,
        lastPaymentDate: '2026-05-15',
      },
    ]);

  // Filtrage répétiteurs
  const filteredTutors = tutorSubscriptions.filter(t => {
    const matchSearch =
      !filters.search ||
      t.tutorName.toLowerCase().includes(filters.search.toLowerCase()) ||
      t.tutorEmail.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus =
      filters.status === 'TOUS' || t.status === filters.status;
    return matchSearch && matchStatus;
  });

  // Filtrage groupes
  const filteredGroups = groupSubscriptions.filter(g => {
    const matchSearch =
      !filters.search ||
      g.groupName.toLowerCase().includes(filters.search.toLowerCase()) ||
      g.tutorName.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus =
      filters.status === 'TOUS' || g.status === filters.status;
    return matchSearch && matchStatus;
  });

  // Activer manuellement un abonnement répétiteur (mock)
  const handleActivateTutor = (tutorId: string) => {
    setTutorSubscriptions(prev => prev.map(t =>
      t.tutorId === tutorId
        ? { ...t, status: 'active', daysRemaining: 30 }
        : t
    ));
  };

  // Suspendre manuellement un abonnement répétiteur (mock)
  const handleSuspendTutor = (tutorId: string) => {
    setTutorSubscriptions(prev => prev.map(t =>
      t.tutorId === tutorId
        ? { ...t, status: 'suspended' }
        : t
    ));
  };

  // Activer manuellement un abonnement groupe (mock)
  const handleActivateGroup = (groupId: string) => {
    setGroupSubscriptions(prev => prev.map(g =>
      g.groupId === groupId
        ? { ...g, status: 'active', daysRemaining: 30 }
        : g
    ));
  };

  // Suspendre manuellement un abonnement groupe (mock)
  const handleSuspendGroup = (groupId: string) => {
    setGroupSubscriptions(prev => prev.map(g =>
      g.groupId === groupId
        ? { ...g, status: 'suspended' }
        : g
    ));
  };

  // Export CSV (mock)
  const handleExportCSV = () => {
    const rows = [
      ['Nom', 'Type', 'Statut', 'Jours restants',
       'Montant/mois', 'Total payé', 'Dernière date'],
      ...filteredTutors.map(t => [
        t.tutorName, 'Répétiteur', t.status,
        t.daysRemaining, t.monthlyPrice, t.totalPaid, t.lastPaymentDate
      ]),
      ...filteredGroups.map(g => [
        g.groupName, 'Groupe', g.status,
        g.daysRemaining, g.monthlyPrice, g.totalPaid, g.lastPaymentDate
      ]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
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