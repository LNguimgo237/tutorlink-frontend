import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import studentPaymentService from '../services/studentPaymentService';
import type { StudentPayment, PaymentStats, PaymentFilters } from '../types/studentPayment.types';

const EMPTY_STATS: PaymentStats = {
  totalSpent: 0, totalTransactions: 0, pendingAmount: 0, averagePerCourse: 0,
};

export const useStudentPayments = () => {
  const [filters, setFilters] = useState<PaymentFilters>({
    search: '', status: 'TOUS', type: 'TOUS', dateFrom: '', dateTo: '',
  });

  const { data: filteredPayments = [] } = useQuery<StudentPayment[]>({
    queryKey: ['student-payments', filters],
    queryFn: () => studentPaymentService.getPayments(filters),
    staleTime: 60 * 1000,
  });

  const { data: stats = EMPTY_STATS } = useQuery<PaymentStats>({
    queryKey: ['student-payments-stats'],
    queryFn: studentPaymentService.getStats,
    staleTime: 60 * 1000,
  });

  return { filteredPayments, filters, setFilters, stats };
};