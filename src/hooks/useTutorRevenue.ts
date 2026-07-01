import { useState } from 'react';
import {
  RevenuePeriod, RevenueStats,
  RevenueDataPoint, RevenueTransaction
} from '../types/revenue.types';

export const useTutorRevenue = () => {

  // Période active
  const [period, setPeriod] = useState<RevenuePeriod>('30j');

  // ── STATS MOCK ──
  const [stats] = useState<RevenueStats>({
    totalBrut: 94500,
    totalCommission: 9450,
    totalNet: 85050,
    totalIndividuel: 27500,
    totalGroupe: 67000,
    evolution: 18,
  });

  // ── DONNÉES GRAPHIQUE MOCK ──
  const [chartData] = useState<RevenueDataPoint[]>([
    { month: 'Janv', individual: 32000, group: 20000, total: 52000 },
    { month: 'Févr', individual: 28000, group: 40000, total: 68000 },
    { month: 'Mars', individual: 36000, group: 40000, total: 76000 },
    { month: 'Avr',  individual: 47000, group: 40000, total: 87000 },
    { month: 'Mai',  individual: 44000, group: 47000, total: 91000 },
    { month: 'Juin', individual: 27500, group: 67000, total: 94500 },
  ]);

  // ── TRANSACTIONS MOCK ──
  const [transactions] = useState<RevenueTransaction[]>([
    {
      id: 't1',
      reference: 'VRS-2026-018',
      studentName: 'Leonel Nguena',
      type: 'individuel',
      subject: 'Mathématiques',
      date: '2026-06-23',
      amount: 4000,
      commission: 400,
      netAmount: 3600,
      operator: 'MTN',
      transactionId: 'MTN-789456123',
      status: 'recu',
    },
    {
      id: 't2',
      reference: 'VRS-2026-017',
      studentName: 'Maths BAC C/D · Groupe Élite',
      type: 'groupe',
      subject: 'Mathématiques',
      date: '2026-06-20',
      amount: 42000,
      commission: 4200,
      netAmount: 37800,
      operator: 'MTN',
      transactionId: 'MTN-GROUP-001',
      status: 'recu',
    },
    {
      id: 't3',
      reference: 'VRS-2026-016',
      studentName: 'Fokou Cédric',
      type: 'individuel',
      subject: 'Mathématiques',
      date: '2026-06-18',
      amount: 4000,
      commission: 400,
      netAmount: 3600,
      operator: 'Orange',
      transactionId: 'ORG-456789012',
      status: 'recu',
    },
    {
      id: 't4',
      reference: 'VRS-2026-015',
      studentName: 'Soutien Maths 3ème',
      type: 'groupe',
      subject: 'Mathématiques',
      date: '2026-06-15',
      amount: 25000,
      commission: 2500,
      netAmount: 22500,
      operator: 'Orange',
      transactionId: 'ORG-GROUP-002',
      status: 'recu',
    },
    {
      id: 't5',
      reference: 'VRS-2026-014',
      studentName: 'Ngono Mystelle',
      type: 'individuel',
      subject: 'Mathématiques',
      date: '2026-06-28',
      amount: 4000,
      commission: 400,
      netAmount: 3600,
      operator: 'MTN',
      transactionId: 'MTN-PENDING-001',
      status: 'en_attente',
    },
  ]);

  // Export CSV (mock)
  const handleExportCSV = () => {
    const rows = [
      ['Référence', 'Élève/Groupe', 'Type', 'Date',
       'Montant brut', 'Commission', 'Net reçu', 'Opérateur', 'Statut'],
      ...transactions.map(t => [
        t.reference, t.studentName, t.type, t.date,
        t.amount, t.commission, t.netAmount, t.operator, t.status,
      ]),
    ];
    const csv = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
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