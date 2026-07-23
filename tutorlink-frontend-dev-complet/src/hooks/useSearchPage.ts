import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { SearchFilters } from "../types/searchs.types";
import { DEFAULT_FILTERS } from "../types/searchs.types";
import { searchTutors } from "../services/searchsService";
import { useAuthStore } from "../store/authStore";

export function useSearchPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  const [filters, setFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [pendingFilters, setPendingFilters] = useState<SearchFilters>(DEFAULT_FILTERS);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["tutors-search", filters],
    queryFn: () => searchTutors(filters),
  });

  const onPendingFilterChange = useCallback(
    (key: keyof SearchFilters, value: string | number) => {
      setPendingFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const onApplyFilters = useCallback(() => {
    setFilters({ ...pendingFilters });
  }, [pendingFilters]);

  const onResetFilters = useCallback(() => {
    setFilters(DEFAULT_FILTERS);
    setPendingFilters(DEFAULT_FILTERS);
  }, []);

  const onViewProfile = useCallback(
    (tutorId: string) => navigate(`/repetiteurs/${tutorId}`),
    [navigate]
  );

  const onBookTutor = useCallback(
    (tutorId: string) => {
      if (!isAuthenticated) {
        navigate("/connexion", { state: { from: `/reserver/${tutorId}` } });
        return;
      }
      navigate(`/reserver/${tutorId}`);
    },
    [navigate, isAuthenticated]
  );

  return {
    tutors: data?.tutors ?? [],
    totalCount: data?.total ?? 0,
    isLoading,
    hasError: isError,
    filters,
    pendingFilters,
    onPendingFilterChange,
    onApplyFilters,
    onResetFilters,
    onViewProfile,
    onBookTutor,
  };
}