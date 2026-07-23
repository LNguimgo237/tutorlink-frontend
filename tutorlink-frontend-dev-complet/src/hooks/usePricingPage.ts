// ============================================================
// FICHIER : src/hooks/usePricingPage.ts
// RÔLE    : Hook central de la PricingPage.
//           Charge toutes les données dynamiques en parallèle
//           avec React Query. Gère les états de chargement.
//
// ⚠️ BACKEND : Orchestre 4 appels API publics via pricingService.ts
// ============================================================

import { useQuery } from "@tanstack/react-query";
import {
  getPlatformStats,
  getFeaturedTestimonials,
  getPublicFaq,
  getSubscriptionPlans,
} from "../services/pricingService";

export function usePricingPage() {

  // ── Stats de la plateforme ───────────────────────────────
  // Rafraîchi toutes les 5 minutes — données en quasi temps réel
  // ⚠️ BACKEND : GET /api/public/stats
  const {
    data: stats,
    isLoading: isLoadingStats,
    isError: statsError,
  } = useQuery({
    queryKey: ["platform-stats"],
    queryFn: getPlatformStats,
    staleTime: 5 * 60 * 1000,      // Considéré frais pendant 5 min
    refetchInterval: 5 * 60 * 1000, // Re-fetch automatique toutes les 5 min
    retry: 2,
  });

  // ── Témoignages mis en avant ─────────────────────────────
  // Rafraîchi toutes les heures — l'admin les modifie rarement
  // ⚠️ BACKEND : GET /api/public/testimonials/featured
  const {
    data: testimonials,
    isLoading: isLoadingTestimonials,
    isError: testimonialsError,
  } = useQuery({
    queryKey: ["featured-testimonials"],
    queryFn: getFeaturedTestimonials,
    staleTime: 60 * 60 * 1000, // Frais pendant 1 heure
    retry: 2,
  });

  // ── Questions fréquentes ─────────────────────────────────
  // Rafraîchi toutes les heures
  // ⚠️ BACKEND : GET /api/public/faq
  const {
    data: faqItems,
    isLoading: isLoadingFaq,
  } = useQuery({
    queryKey: ["public-faq"],
    queryFn: getPublicFaq,
    staleTime: 60 * 60 * 1000,
    retry: 2,
  });

  // ── Plans d'abonnement ───────────────────────────────────
  // Mis en cache longtemps — changent très rarement
  // ⚠️ BACKEND : GET /api/public/subscription-plans
  const {
    data: plans,
    isLoading: isLoadingPlans,
  } = useQuery({
    queryKey: ["subscription-plans"],
    queryFn: getSubscriptionPlans,
    staleTime: 24 * 60 * 60 * 1000, // Frais pendant 24h
    retry: 2,
  });

  return {
    // Données
    stats:         stats        ?? null,
    testimonials:  testimonials ?? [],
    faqItems:      faqItems     ?? [],
    plans:         plans        ?? [],

    // États
    isLoadingStats,
    isLoadingTestimonials,
    isLoadingFaq,
    isLoadingPlans,
    statsError,
    testimonialsError,
  };
}