import { useState } from 'react';
import { Group, GroupFilters } from '../types/group.types';

export const useGroups = () => {
  const [filters, setFilters] = useState<GroupFilters>({
    subject: '', level: '', quartier: '', maxPrice: null,
  });

  // ── DONNÉES MOCK ──
  const [groups] = useState<Group[]>([
    {
      id: '1',
      name: 'Maths BAC C/D · Groupe Élite',
      subject: 'Mathématiques',
      level: 'Terminale',
      quartier: 'Centre Dschang',
      description: 'Groupe d\'excellence pour les élèves de Terminale C et D préparant le BAC.',
      tutor: { id: 't1', name: 'M. Kamga Eric', subject: 'Mathématiques', rating: 4.9, totalSessions: 312, diploma: 'Licence Maths UDs' },
      rating: 4.9, reviewCount: 24,
      currentMembers: 6, maxMembers: 8,
      monthlyPrice: 7000,
      sessions: [
        { day: 'MAR', startTime: '16h', endTime: '18h' },
        { day: 'SAM', startTime: '16h', endTime: '18h' },
      ],
      themes: ['Intégrales', 'Probabilités', 'Suites numériques', 'Géométrie dans l\'espace', 'Examens blancs'],
      status: 'actif',
      isVerified: true,
      createdAt: '2026-01-15',
    },
    {
      id: '2',
      name: 'Physique-Chimie · Première',
      subject: 'Physique-Chimie',
      level: '1ère S',
      quartier: 'Quartier Foto',
      description: 'Cours collectifs avec travaux pratiques.',
      tutor: { id: 't2', name: 'Mme Tchana Sylvie', subject: 'Physique-Chimie', rating: 4.8, totalSessions: 248, diploma: 'Master Physique UDs' },
      rating: 4.8, reviewCount: 18,
      currentMembers: 4, maxMembers: 6,
      monthlyPrice: 6000,
      sessions: [
        { day: 'MER', startTime: '17h', endTime: '19h' },
        { day: 'VEN', startTime: '17h', endTime: '19h' },
      ],
      themes: ['Mécanique', 'Électricité', 'Chimie organique', 'TP pratiques'],
      status: 'actif',
      isVerified: true,
      createdAt: '2026-02-01',
    },
    {
      id: '3',
      name: 'SVT · Prépa BAC D',
      subject: 'SVT',
      level: 'Terminale D',
      quartier: 'Ngui Dschang',
      description: 'Génétique, écosystèmes, BAC blanc.',
      tutor: { id: 't5', name: 'Mme Mbouh Carine', subject: 'SVT', rating: 4.6, totalSessions: 89, diploma: 'Licence SVT UDs' },
      rating: 4.6, reviewCount: 15,
      currentMembers: 8, maxMembers: 8,
      monthlyPrice: 6500,
      sessions: [{ day: 'SAM', startTime: '14h', endTime: '17h' }],
      themes: ['Génétique', 'Écosystèmes', 'Physiologie', 'BAC blanc'],
      status: 'complet',
      isVerified: true,
      createdAt: '2026-01-20',
    },
  ]);

  // Filtrage local
  const filteredGroups = groups.filter(g => {
    const matchSubject = !filters.subject || g.subject.toLowerCase().includes(filters.subject.toLowerCase());
    const matchLevel = !filters.level || g.level.toLowerCase().includes(filters.level.toLowerCase());
    const matchQuartier = !filters.quartier || g.quartier.toLowerCase().includes(filters.quartier.toLowerCase());
    const matchPrice = !filters.maxPrice || g.monthlyPrice <= filters.maxPrice;
    return matchSubject && matchLevel && matchQuartier && matchPrice;
  });

  return { filteredGroups, filters, setFilters };
};