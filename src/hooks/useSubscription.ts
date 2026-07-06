import { useState } from 'react';
import {
  TutorSubscription, SubscriptionPayment,
  SubscriptionNotification, SubscriptionOperator
} from '../types/subscription.types';

export const useSubscription = () => {

  // ── ABONNEMENT MOCK ──
  // Simule un répétiteur en période d'essai avec 12 jours restants
  const [subscription, setSubscription] = useState<TutorSubscription>({
    id: 'sub1',
    tutorId: 't1',
    status: 'trial',
    trialStartDate: '2026-05-01',
    trialEndDate: '2026-07-01',
    currentPeriodStart: '2026-05-01',
    currentPeriodEnd: '2026-07-01',
    monthlyPrice: 3000,
    daysRemaining: 12,
    isTrialPeriod: true,
    autoRenew: false,
  });

  // ── HISTORIQUE PAIEMENTS MOCK ──
  const [payments] = useState<SubscriptionPayment[]>([
    {
      id: 'p1',
      reference: 'SUB-2026-003',
      amount: 3000,
      operator: 'MTN',
      transactionId: 'MTN-SUB-789456',
      status: 'reussi',
      date: '2026-06-01',
      period: 'Juin 2026',
    },
    {
      id: 'p2',
      reference: 'SUB-2026-002',
      amount: 3000,
      operator: 'Orange',
      transactionId: 'ORG-SUB-456123',
      status: 'reussi',
      date: '2026-05-01',
      period: 'Mai 2026',
    },
  ]);

  // ── NOTIFICATIONS MOCK ──
  const [notifications] = useState<SubscriptionNotification[]>([
    {
      id: 'n1',
      type: 'trial_ending_soon',
      message: 'Votre période d\'essai gratuite se termine dans 12 jours. Activez votre abonnement pour continuer à recevoir des élèves.',
      daysLeft: 12,
      date: '2026-06-19',
      isRead: false,
    },
    {
      id: 'n2',
      type: 'payment_success',
      message: 'Paiement de 3 000 FCFA reçu pour le mois de Juin 2026.',
      date: '2026-06-01',
      isRead: true,
    },
  ]);

  // Modal paiement actif
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Payer l'abonnement (mock)
  const handlePay = async (operator: SubscriptionOperator) => {
    setPaymentLoading(true);
    // → remplacer par subscriptionService.paySubscription(operator)
    await new Promise(res => setTimeout(res, 1500));
    setPaymentLoading(false);
    setPaymentSuccess(true);
    setSubscription(prev => ({
      ...prev,
      status: 'active',
      isTrialPeriod: false,
      daysRemaining: 30,
    }));
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentSuccess(false);
    }, 2000);
  };

  // Basculer renouvellement automatique (mock)
  const handleToggleAutoRenew = () => {
    setSubscription(prev => ({
      ...prev, autoRenew: !prev.autoRenew,
    }));
    // → remplacer par subscriptionService.toggleAutoRenew(!subscription.autoRenew)
  };

  return {
    subscription, payments, notifications,
    showPaymentModal, setShowPaymentModal,
    paymentLoading, paymentSuccess,
    handlePay, handleToggleAutoRenew,
  };
};