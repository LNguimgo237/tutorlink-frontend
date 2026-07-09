import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import subscriptionService from '../services/subscriptionService';
import {
  TutorSubscription, SubscriptionPayment,
  SubscriptionNotification, SubscriptionOperator
} from '../types/subscription.types';

export const useSubscription = () => {
  const queryClient = useQueryClient();

  const { data: subscription } = useQuery<TutorSubscription>({
    queryKey: ['tutor-subscription'],
    queryFn: subscriptionService.getSubscription,
    staleTime: 60 * 1000,
  });

  const { data: payments = [] } = useQuery<SubscriptionPayment[]>({
    queryKey: ['tutor-subscription-payments'],
    queryFn: subscriptionService.getPaymentHistory,
    staleTime: 60 * 1000,
  });

  const { data: notifications = [] } = useQuery<SubscriptionNotification[]>({
    queryKey: ['tutor-subscription-notifications'],
    queryFn: subscriptionService.getNotifications,
    staleTime: 60 * 1000,
  });

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const payMutation = useMutation({
    mutationFn: subscriptionService.paySubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-subscription'] });
      queryClient.invalidateQueries({ queryKey: ['tutor-subscription-payments'] });
      setPaymentSuccess(true);
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentSuccess(false);
      }, 2000);
    },
  });

  const autoRenewMutation = useMutation({
    mutationFn: subscriptionService.toggleAutoRenew,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tutor-subscription'] }),
  });

  const handlePay = (operator: SubscriptionOperator) => payMutation.mutate(operator);
  const handleToggleAutoRenew = () => autoRenewMutation.mutate(!subscription?.autoRenew);

  return {
    subscription, payments, notifications,
    showPaymentModal, setShowPaymentModal,
    paymentLoading: payMutation.isPending, paymentSuccess,
    handlePay, handleToggleAutoRenew,
  };
};