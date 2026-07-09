import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import subscriptionService from '../services/subscriptionService';
import { TutorSubscription, SubscriptionOperator } from '../types/subscription.types';

export const useGroupSubscription = (groupId: string) => {
  const queryClient = useQueryClient();

  const { data: subscription } = useQuery<TutorSubscription>({
    queryKey: ['group-subscription', groupId],
    queryFn: () => subscriptionService.getGroupSubscription(groupId),
    enabled: !!groupId,
    staleTime: 60 * 1000,
  });

  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  const payMutation = useMutation({
    mutationFn: (operator: SubscriptionOperator) =>
      subscriptionService.payGroupSubscription(groupId, operator),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group-subscription', groupId] });
      setSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setSuccess(false);
      }, 2000);
    },
  });

  const handlePay = (operator: SubscriptionOperator) => payMutation.mutate(operator);

  return {
    subscription, showModal, setShowModal,
    loading: payMutation.isPending, success, handlePay,
  };
};