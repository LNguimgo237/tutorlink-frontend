import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import courseRequestService from '../services/courseRequestService';
import { CourseRequestDetail, RequestFilters } from '../types/courseRequest.types';

export const useCourseRequests = () => {
  const queryClient = useQueryClient();

  const { data: requests = [] } = useQuery<CourseRequestDetail[]>({
    queryKey: ['course-requests'],
    queryFn: courseRequestService.getRequests,
    staleTime: 30 * 1000,
  });

  const [selectedRequest, setSelectedRequest] = useState<CourseRequestDetail | null>(null);
  const [filters, setFilters] = useState<RequestFilters>({ search: '', status: 'TOUS' });

  const filteredRequests = requests.filter(r => {
    const matchSearch =
      r.student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.reference.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = filters.status === 'TOUS' || r.status === filters.status;
    return matchSearch && matchStatus;
  });

  const acceptMutation = useMutation({
    mutationFn: courseRequestService.acceptRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-requests'] });
      setSelectedRequest(null);
    },
  });

  const refuseMutation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason?: string }) =>
      courseRequestService.refuseRequest(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-requests'] });
      setSelectedRequest(null);
    },
  });

  const handleAccept = (id: string) => acceptMutation.mutate(id);
  const handleRefuse = (id: string) => refuseMutation.mutate({ id });

  const stats = {
    enAttente: requests.filter(r => r.status === 'en_attente').length,
    acceptees: requests.filter(r => r.status === 'accepte').length,
    refusees: requests.filter(r => r.status === 'refuse').length,
    estimatedTotal: requests
      .filter(r => r.status === 'accepte')
      .reduce((sum, r) => sum + r.estimatedAmount, 0),
  };

  return {
    filteredRequests, filters, setFilters, stats,
    selectedRequest, setSelectedRequest,
    handleAccept, handleRefuse,
  };
};