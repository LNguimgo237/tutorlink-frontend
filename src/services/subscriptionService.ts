import api from './api';
import { SubscriptionOperator } from '../types/subscription.types';

// ⚠️ BACKEND REQUIS
const subscriptionService = {

  // GET /tutor/subscription — statut abonnement actuel
  // Backend calcule les jours restants et le statut
  getSubscription: async () => {
    const res = await api.get('/tutor/subscription');
    return res.data;
  },

  // GET /tutor/subscription/payments — historique paiements
  getPaymentHistory: async () => {
    const res = await api.get('/tutor/subscription/payments');
    return res.data;
  },
// À AJOUTER dans src/services/subscriptionService.ts, dans l'objet subscriptionService

  // GET /groups/:groupId/subscription — statut abonnement du groupe
  getGroupSubscription: async (groupId: string) => {
    const res = await api.get(`/groups/${groupId}/subscription`);
    return res.data;
  },

  // POST /groups/:groupId/subscription/pay — payer l'abonnement du groupe
  payGroupSubscription: async (groupId: string, operator: SubscriptionOperator) => {
    const res = await api.post(`/groups/${groupId}/subscription/pay`, { operator });
    return res.data;
  },
  // POST /tutor/subscription/pay — payer l'abonnement mensuel
  // → Backend initie paiement MTN MoMo ou Orange Money
  // → Backend active le compte pour 30 jours supplémentaires
  // → Backend envoie SMS + email de confirmation
  paySubscription: async (operator: SubscriptionOperator) => {
    const res = await api.post('/tutor/subscription/pay', { operator });
    return res.data;
  },

  // PUT /tutor/subscription/auto-renew — activer/désactiver
  // renouvellement automatique
  toggleAutoRenew: async (enabled: boolean) => {
    const res = await api.put('/tutor/subscription/auto-renew', {
      enabled

    });

    return res.data;
  },

  // GET /tutor/subscription/notifications — alertes abonnement
  getNotifications: async () => {
    const res = await api.get('/tutor/subscription/notifications');
    return res.data;
  },
  
};

export default subscriptionService;