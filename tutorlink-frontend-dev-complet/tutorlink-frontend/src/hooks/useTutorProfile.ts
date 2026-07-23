import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { TutorPublicProfile } from '../types/tutorProfile.types';

export const useTutorProfile = (tutorId?: string) => {
  const navigate = useNavigate();

  // ── DONNÉES MOCK ── à remplacer par tutorProfileService
  const [profile] = useState<TutorPublicProfile>({
    id: tutorId || 't1',
    name: 'M. Kamga Eric',
    subject: 'Mathématiques',
    level: 'Terminale C/D',
    quartier: 'Centre Dschang',
    rating: 4.9,
    reviewCount: 87,
    diploma: 'Licence Mathématiques · Université de Dschang',
    totalSessions: 312,
    hourlyPrice: 2000,
    isVerified: true,
    bio: '10 ans d\'expérience dans l\'enseignement des mathématiques, ancien enseignant titulaire au Lycée Classique de Dschang. Spécialisé dans la préparation au BAC C et D : fonctions, intégrales, probabilités et géométrie dans l\'espace. Pédagogie patiente et méthodique, adaptée au rythme de chaque élève. Plus de 300 élèves accompagnés depuis 2016, avec un taux de réussite au BAC de 94%.',
    subjectsTaught: [
      { label: 'Mathématiques · Terminale C' },
      { label: 'Mathématiques · Terminale D' },
      { label: 'Mathématiques · Première' },
      { label: 'Préparation BAC' },
      { label: 'Soutien BEPC' },
    ],
    verifications: [
      { type: 'identite', label: 'Identité (CNI)', verified: true },
      { type: 'diplome', label: 'Diplôme', verified: true },
      { type: 'adresse', label: 'Adresse Dschang', verified: true },
    ],
    availability: [
      { day: 'LUN', startTime: '16h', endTime: '18h', available: true },
      { day: 'LUN', startTime: '18h', endTime: '20h', available: true },
      { day: 'MAR', startTime: '16h', endTime: '18h', available: false },
      { day: 'MER', startTime: '14h', endTime: '16h', available: true },
      { day: 'MER', startTime: '16h', endTime: '18h', available: true },
      { day: 'JEU', startTime: '17h', endTime: '19h', available: true },
      { day: 'VEN', startTime: '15h', endTime: '17h', available: true },
      { day: 'SAM', startTime: '09h', endTime: '11h', available: true },
      { day: 'SAM', startTime: '14h', endTime: '16h', available: true },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'Talla Mireille',
        authorRole: 'parent',
        rating: 5,
        comment: 'Mon fils a gagné 4 points de moyenne en mathématiques en deux mois. M. Kamga est très pédagogue et ponctuel. Je recommande vivement.',
        date: 'il y a 3 jours',
      },
      {
        id: 'r2',
        author: 'Junior Nkoumba',
        authorRole: 'eleve',
        rating: 5,
        comment: 'Excellent prof, il explique les intégrales d\'une façon que je comprends enfin. Toujours disponible pour répondre aux questions par message.',
        date: 'il y a 1 semaine',
      },
      {
        id: 'r3',
        author: 'Fokou Cédric',
        authorRole: 'eleve',
        rating: 4,
        comment: 'Très bon accompagnement pour le BAC blanc. Cours bien structurés avec des exercices types examen.',
        date: 'il y a 3 semaines',
      },
    ],
  });

  // Créneau sélectionné pour réservation rapide
  const [selectedSlot, setSelectedSlot] =
    useState<{ day: string; startTime: string; endTime: string } | null>(null);

  // Sélectionner un créneau
  const handleSelectSlot = (slot: { day: string; startTime: string; endTime: string }) => {
    setSelectedSlot(slot);
  };

  // Aller vers la page de réservation
  const handleBookCourse = () => {
    navigate(`/reserver/${profile.id}`);
  };

  return {
    profile, selectedSlot,
    handleSelectSlot, handleBookCourse,
  };
};