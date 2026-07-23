import { useState } from 'react';
import {
  StudentPayment, SavedPaymentMethod,
  PaymentStats, PaymentFilters
} from '../types/studentPayment.types';

export const useStudentPayments = () => {

  // ── TRANSACTIONS MOCK ──
  const [payments] = useState<StudentPayment[]>([
    {
      id: 'p1',
      reference: 'PAY-2026-018',
      type: 'cours_individuel',
      description: 'Cours Mathématiques',
      tutorName: 'M.Napolo Nguimgo',
      amount: 4000,
      operator: 'MTN',
      transactionId: 'MTN-789456123',
      status: 'reussi',
      date: '2026-06-23',
      time: '16h02',
    },
    {
      id: 'p2',
      reference: 'PAY-2026-017',
      type: 'groupe',
      description: 'Maths BAC C/D · Groupe Élite',
      tutorName: 'M. Napolo Nguimgo',
      amount: 7000,
      operator: 'MTN',
      transactionId: 'MTN-GROUP-045',
      status: 'reussi',
      date: '2026-06-01',
      time: '08h15',
    },
    {
      id: 'p3',
      reference: 'PAY-2026-016',
      type: 'cours_individuel',
      description: 'Cours Physique-Chimie',
      tutorName: 'Mme Sonna Laressa',
      amount: 3600,
      operator: 'Orange',
      transactionId: 'ORG-456789012',
      status: 'reussi',
      date: '2026-06-18',
      time: '17h00',
    },
    {
      id: 'p4',
      reference: 'PAY-2026-015',
      type: 'groupe',
      description: 'English Club · Conversation',
      tutorName: 'Mlle Nguefack Dallya',
      amount: 5000,
      operator: 'Orange',
      transactionId: 'ORG-GROUP-022',
      status: 'en_attente',
      date: '2026-06-28',
      time: '10h30',
    },
    {
      id: 'p5',
      reference: 'PAY-2026-014',
      type: 'cours_individuel',
      description: 'Cours Anglais',
      tutorName: 'Mlle Atsafack Mystelle',
      amount: 3400,
      operator: 'MTN',
      transactionId: 'MTN-654321098',
      status: 'echoue',
      date: '2026-06-15',
      time: '15h45',
    },
    {
      id: 'p6',
      reference: 'PAY-2026-013',
      type: 'cours_individuel',
      description: 'Cours annulé — Mathématiques',
      tutorName: 'M. Folefack Erica',
      amount: 4000,
      operator: 'MTN',
      transactionId: 'MTN-987654321',
      status: 'rembourse',
      date: '2026-06-10',
      time: '09h00',
    },
  ]);

  // ── MOYENS DE PAIEMENT ENREGISTRÉS MOCK ──
  const [paymentMethods, setPaymentMethods] = useState<SavedPaymentMethod[]>([
    {
      id: 'pm1',
      operator: 'MTN',
      phoneNumber: '677 XX XX 22',
      isDefault: true,
    },
    {
      id: 'pm2',
      operator: 'Orange',
      phoneNumber: '699 XX XX 45',
      isDefault: false,
    },
  ]);

  // Filtres actifs
  const [filters, setFilters] = useState<PaymentFilters>({
    search: '', status: 'TOUS', type: 'TOUS',
    dateFrom: '', dateTo: '',
  });

  // Modal ajout moyen de paiement
  const [showAddMethod, setShowAddMethod] = useState(false);

  // Filtrage local
  const filteredPayments = payments.filter(p => {
    const matchSearch =
      !filters.search ||
      p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.reference.toLowerCase().includes(filters.search.toLowerCase()) ||
      p.tutorName.toLowerCase().includes(filters.search.toLowerCase());

    const matchStatus =
      filters.status === 'TOUS' || p.status === filters.status;

    const matchType =
      filters.type === 'TOUS' || p.type === filters.type;

    return matchSearch && matchStatus && matchType;
  });

  // Définir un moyen comme par défaut (mock)
  const handleSetDefault = (id: string) => {
    setPaymentMethods(prev => prev.map(m => ({
      ...m, isDefault: m.id === id,
    })));
    // → remplacer par studentPaymentService.setDefaultMethod(id)
  };

  // Supprimer un moyen de paiement (mock)
  const handleRemoveMethod = (id: string) => {
    setPaymentMethods(prev => prev.filter(m => m.id !== id));
    // → remplacer par studentPaymentService.removePaymentMethod(id)
  };

  // Ajouter un nouveau moyen (mock)
  const handleAddMethod = (
    operator: 'MTN' | 'Orange',
    phoneNumber: string
  ) => {
    const newMethod: SavedPaymentMethod = {
      id: `pm${Date.now()}`,
      operator,
      phoneNumber,
      isDefault: paymentMethods.length === 0,
    };
    setPaymentMethods(prev => [...prev, newMethod]);
    setShowAddMethod(false);
    // → remplacer par studentPaymentService.addPaymentMethod(operator, phoneNumber)
  };

  // Télécharger un reçu (mock)
  const handleDownloadReceipt = (paymentId: string) => {
    console.log('Téléchargement reçu pour', paymentId);
    // → remplacer par studentPaymentService.downloadReceipt(paymentId)
  };

  // Calculer les statistiques
  const successfulPayments = payments.filter(p => p.status === 'reussi');
  const stats: PaymentStats = {
    totalSpent: successfulPayments.reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: successfulPayments.length,
    pendingAmount: payments
      .filter(p => p.status === 'en_attente')
      .reduce((sum, p) => sum + p.amount, 0),
    averagePerCourse: successfulPayments.length > 0
      ? Math.round(
          successfulPayments.reduce((sum, p) => sum + p.amount, 0)
          / successfulPayments.length
        )
      : 0,
  };

  return {
    filteredPayments, filters, setFilters, stats,
    paymentMethods, showAddMethod, setShowAddMethod,
    handleSetDefault, handleRemoveMethod,
    handleAddMethod, handleDownloadReceipt,
  };
};