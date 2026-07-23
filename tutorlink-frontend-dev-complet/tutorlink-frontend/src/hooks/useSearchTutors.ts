import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  SearchTutor, SearchFilters, SortOption
} from '../types/search.types';

export const useSearchTutors = () => {
  const navigate = useNavigate();

  // ── DONNÉES MOCK ── à remplacer par searchService quand backend prêt
  const [tutors] = useState<SearchTutor[]>([
    {
      id: 't1',
      name: 'M. Paul Leonel',
      subject: 'Mathématiques',
      subjects: ['Mathématiques', 'Physique'],
      level: 'Terminale C/D',
      quartier: 'Centre Dschang',
      rating: 4.9,
      reviewCount: 87,
      hourlyPrice: 2000,
      totalSessions: 312,
      bio: '10 ans d\'expérience, ancien enseignant au Lycée Classique de Dschang. Spécialisé BAC C et D.',
      isVerified: true,
      isAvailable: true,
      diploma: 'Licence Mathématiques · UDs',
    },
    {
      id: 't2',
      name: 'Mme Donfack Myster',
      subject: 'Physique-Chimie',
      subjects: ['Physique-Chimie', 'Mathématiques'],
      level: 'Lycée',
      quartier: 'Quartier Foto',
      rating: 4.8,
      reviewCount: 64,
      hourlyPrice: 1800,
      totalSessions: 248,
      bio: 'Doctorante en physique à l\'Université de Dschang. Cours collectifs avec travaux pratiques.',
      isVerified: true,
      isAvailable: true,
      diploma: 'Master Physique · UDs',
    },
    {
      id: 't3',
      name: 'Mlle Atonfack Mystelle',
      subject: 'Anglais',
      subjects: ['Anglais', 'Français'],
      level: 'Tous niveaux',
      quartier: 'Centre Dschang',
      rating: 4.9,
      reviewCount: 73,
      hourlyPrice: 1700,
      totalSessions: 289,
      bio: 'Bilingue, méthode immersive et conversationnelle. Préparation aux examens BEPC et BAC.',
      isVerified: true,
      isAvailable: false,
      diploma: 'Licence Anglais · UDs',
    },
    {
      id: 't4',
      name: 'M. Kenne victor',
      subject: 'Français',
      subjects: ['Français', 'Histoire-Géo'],
      level: 'Collège & Lycée',
      quartier: 'Ngui Dschang',
      rating: 4.7,
      reviewCount: 52,
      hourlyPrice: 1500,
      totalSessions: 198,
      bio: 'Spécialiste de la dissertation et du commentaire composé. Préparation BEPC et BAC.',
      isVerified: true,
      isAvailable: true,
      diploma: 'Licence Lettres · UDs',
    },
    {
      id: 't5',
      name: 'M. Abarka jule',
      subject: 'Informatique',
      subjects: ['Informatique', 'Mathématiques'],
      level: 'Lycée',
      quartier: 'Quartier Foto',
      rating: 4.8,
      reviewCount: 41,
      hourlyPrice: 2000,
      totalSessions: 156,
      bio: 'Ingénieur logiciel, initiation à la programmation Python et algorithmique.',
      isVerified: true,
      isAvailable: true,
      diploma: 'Master Informatique · UDs',
    },
    {
      id: 't6',
      name: 'Mme Nanfack Erica',
      subject: 'SVT',
      subjects: ['SVT', 'Chimie'],
      level: '3ème & Lycée',
      quartier: 'Ngui Dschang',
      rating: 4.6,
      reviewCount: 38,
      hourlyPrice: 1600,
      totalSessions: 89,
      bio: 'Préparation rigoureuse au BEPC et au BAC D. Génétique, écosystèmes, physiologie.',
      isVerified: false,
      isAvailable: true,
      diploma: 'Licence SVT · UDs',
    },
  ]);

  // Filtres actifs
  const [filters, setFilters] = useState<SearchFilters>({
    search: '',
    subject: '',
    level: '',
    quartier: '',
    maxPrice: null,
    minRating: null,
    verifiedOnly: false,
  });

  // Option de tri active
  const [sort, setSort] = useState<SortOption>('rating');

  // Filtrage local
  const filteredTutors = tutors
    .filter(t => {
      const matchSearch =
        !filters.search ||
        t.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.subject.toLowerCase().includes(filters.search.toLowerCase());

      const matchSubject =
        !filters.subject ||
        t.subjects.some(s =>
          s.toLowerCase().includes(filters.subject.toLowerCase())
        );

      const matchLevel =
        !filters.level ||
        t.level.toLowerCase().includes(filters.level.toLowerCase());

      const matchQuartier =
        !filters.quartier ||
        t.quartier.toLowerCase().includes(filters.quartier.toLowerCase());

      const matchPrice =
        !filters.maxPrice || t.hourlyPrice <= filters.maxPrice;

      const matchRating =
        !filters.minRating || t.rating >= filters.minRating;

      const matchVerified =
        !filters.verifiedOnly || t.isVerified;

      return matchSearch && matchSubject && matchLevel &&
             matchQuartier && matchPrice && matchRating && matchVerified;
    })
    // Tri
    .sort((a, b) => {
      switch (sort) {
        case 'rating':     return b.rating - a.rating;
        case 'price_asc':  return a.hourlyPrice - b.hourlyPrice;
        case 'price_desc': return b.hourlyPrice - a.hourlyPrice;
        case 'sessions':   return b.totalSessions - a.totalSessions;
        default:           return 0;
      }
    });

  // Réinitialiser tous les filtres
  const handleResetFilters = () => {
    setFilters({
      search: '', subject: '', level: '',
      quartier: '', maxPrice: null,
      minRating: null, verifiedOnly: false,
    });
  };

  // Voir le profil d'un répétiteur
  const handleViewProfile = (tutorId: string) => {
    navigate(`/repetiteurs/${tutorId}`);
  };

  // Réserver directement depuis la liste
  const handleBooking = (tutorId: string) => {
    navigate(`/reserver/${tutorId}`);
  };

  return {
    filteredTutors, filters, setFilters,
    sort, setSort,
    handleResetFilters,
    handleViewProfile, handleBooking,
  };
};