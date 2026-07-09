import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import homeService from '../services/homeService';
import {
  FeaturedTutor, FeaturedGroup,
  PlatformStat, HowItWorksStep, PlatformAdvantage
} from '../types/home.types';

export const useHome = () => {
  const navigate = useNavigate();

  const { data: featuredTutors = [] } = useQuery<FeaturedTutor[]>({
    queryKey: ['home-featured-tutors'],
    queryFn: homeService.getFeaturedTutors,
    staleTime: 5 * 60 * 1000,
  });

  const { data: featuredGroups = [] } = useQuery<FeaturedGroup[]>({
    queryKey: ['home-featured-groups'],
    queryFn: homeService.getFeaturedGroups,
    staleTime: 5 * 60 * 1000,
  });

  const { data: stats = [] } = useQuery<PlatformStat[]>({
    queryKey: ['home-platform-stats'],
    queryFn: homeService.getPlatformStats,
    staleTime: 10 * 60 * 1000,
  });

  // Contenu éditorial statique — pas de donnée backend, reste en dur volontairement
  const steps: HowItWorksStep[] = [
    { number: 1, title: 'Recherchez', description: 'Parcourez les profils de répétiteurs vérifiés par matière, niveau et quartier (Foto, Ngui, Centre...).', icon: '🔍' },
    { number: 2, title: 'Réservez', description: 'Choisissez le créneau qui vous convient et réservez en quelques clics. Paiement sécurisé via MTN Mobile Money ou Orange Money.', icon: '📅' },
    { number: 3, title: 'Progressez', description: 'Suivez les progrès de votre enfant, échangez avec le répétiteur, et célébrez les succès aux examens BEPC et BAC.', icon: '📈' },
  ];

  const advantages: PlatformAdvantage[] = [
    { icon: '🛡️', title: 'Profils vérifiés', description: 'Tous nos répétiteurs sont validés (CNI, diplômes, références).', color: 'bg-blue-50' },
    { icon: '📍', title: 'Proche de chez vous', description: 'Cours à domicile dans tous les quartiers de Dschang.', color: 'bg-yellow-50' },
    { icon: '💰', title: 'Tarifs justes', description: 'De 1 500 à 3 000 FCFA/h. Groupes dès 5 000 FCFA/mois.', color: 'bg-green-50' },
    { icon: '⭐', title: 'Avis transparents', description: 'Notations et témoignages réels de parents et élèves.', color: 'bg-purple-50' },
  ];

  return {
    featuredTutors, featuredGroups,
    stats, steps, advantages,
    navigate,
  };
};