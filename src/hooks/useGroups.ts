import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import groupeService from '../services/groupeService';
import { Group, GroupFilters } from '../types/group.types';

export const useGroups = () => {
  const [filters, setFilters] = useState<GroupFilters>({
    subject: '', level: '', quartier: '', maxPrice: null,
  });

  const { data: filteredGroups = [], isLoading } = useQuery<Group[]>({
    queryKey: ['public-groups', filters],
    queryFn: () => groupeService.getGroups(filters),
    staleTime: 60 * 1000,
  });

  return { filteredGroups, filters, setFilters, isLoading };
};