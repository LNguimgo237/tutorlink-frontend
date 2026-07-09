import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import searchService from '../services/searchService';
import { SearchTutor, SearchFilters, SortOption } from '../types/search.types';

export const useSearchTutors = () => {
  const navigate = useNavigate();

  const [filters, setFilters] = useState<SearchFilters>({
    search: '', subject: '', level: '', quartier: '',
    maxPrice: null, minRating: null, verifiedOnly: false,
  });

  const [sort, setSort] = useState<SortOption>('rating');

  const { data: filteredTutors = [] } = useQuery<SearchTutor[]>({
    queryKey: ['search-tutors', filters, sort],
    queryFn: () => searchService.getTutors(filters, sort),
    staleTime: 60 * 1000,
  });

  const handleResetFilters = () => {
    setFilters({
      search: '', subject: '', level: '',
      quartier: '', maxPrice: null,
      minRating: null, verifiedOnly: false,
    });
  };

  const handleViewProfile = (tutorId: string) => navigate(`/repetiteurs/${tutorId}`);
  const handleBooking = (tutorId: string) => navigate(`/reserver/${tutorId}`);

  return {
    filteredTutors, filters, setFilters,
    sort, setSort,
    handleResetFilters,
    handleViewProfile, handleBooking,
  };
};