import { useState } from 'react';
import { AdminGroup, AdminGroupFilters } from '../types/adminGroup.types';

export const useAdminGroups = () => {

  // ── DONNÉES MOCK ── à remplacer par adminGroupService
  const [groups, setGroups] = useState<AdminGroup[]>([
    {
      id: '1',
      name: 'Maths BAC C/D · Groupe Élite',
      subject: 'Mathématiques',
      level: 'Terminale C/D',
      quartier: 'Centre Dschang',
      tutorName: 'M. Nguimgo',
      tutorId: 't1',
      currentMembers: 6,
      maxMembers: 8,
      monthlyPrice: 7000,
      totalRevenue: 294000,
      status: 'actif',
      isVerified: true,
      createdAt: '2026-01-15',
      sessionsPerWeek: 2,
    },
    {
      id: '2',
      name: 'Physique-Chimie · Première',
      subject: 'Physique-Chimie',
      level: '1ère S',
      quartier: 'Quartier Foto',
      tutorName: 'Mme Laressa Mystelle',
      tutorId: 't2',
      currentMembers: 4,
      maxMembers: 6,
      monthlyPrice: 6000,
      totalRevenue: 144000,
      status: 'actif',
      isVerified: true,
      createdAt: '2026-02-01',
      sessionsPerWeek: 2,
    },
    {
      id: '3',
      name: 'English Club · Conversation',
      subject: 'Anglais',
      level: 'Collège & Lycée',
      quartier: 'Centre Dschang',
      tutorName: 'Mlle Fotso Mystelle',
      tutorId: 't3',
      currentMembers: 7,
      maxMembers: 10,
      monthlyPrice: 5000,
      totalRevenue: 175000,
      status: 'actif',
      isVerified: true,
      createdAt: '2026-02-10',
      sessionsPerWeek: 1,
    },
    {
      id: '4',
      name: 'SVT · Prépa BAC D',
      subject: 'SVT',
      level: 'Terminale D',
      quartier: 'Ngui Dschang',
      tutorName: 'Mme Donfack Laressa',
      tutorId: 't5',
      currentMembers: 8,
      maxMembers: 8,
      monthlyPrice: 6500,
      totalRevenue: 312000,
      status: 'complet',
      isVerified: true,
      createdAt: '2026-01-20',
      sessionsPerWeek: 1,
    },
    {
      id: '5',
      name: 'Initiation Programmation',
      subject: 'Informatique',
      level: 'Lycée',
      quartier: 'Quartier Foto',
      tutorName: 'M. Tagne Junior',
      tutorId: 't4',
      currentMembers: 3,
      maxMembers: 6,
      monthlyPrice: 7000,
      totalRevenue: 63000,
      status: 'en_attente',
      isVerified: false,
      createdAt: '2026-06-20',
      sessionsPerWeek: 1,
    },
  ]);

  // Filtres actifs
  const [filters, setFilters] = useState<AdminGroupFilters>({
    search: '', status: 'TOUS', subject: '',
  });

  // Groupe sélectionné pour le modal détail
  const [selectedGroup, setSelectedGroup] = useState<AdminGroup | null>(null);

  // Filtrage local
  const filteredGroups = groups.filter(g => {
    const matchSearch =
      g.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      g.tutorName.toLowerCase().includes(filters.search.toLowerCase()) ||
      g.subject.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus = filters.status === 'TOUS' || g.status === filters.status;
    const matchSubject = !filters.subject ||
      g.subject.toLowerCase().includes(filters.subject.toLowerCase());
    return matchSearch && matchStatus && matchSubject;
  });

  // Vérifier un groupe (mock)
  const handleVerify = (id: string) => {
    setGroups(prev => prev.map(g =>
      g.id === id ? { ...g, isVerified: true, status: 'actif' } : g
    ));
  };

  // Suspendre un groupe (mock)
  const handleSuspend = (id: string) => {
    setGroups(prev => prev.map(g =>
      g.id === id ? { ...g, status: 'suspendu' } : g
    ));
    setSelectedGroup(null);
  };

  // Supprimer un groupe (mock)
  const handleDelete = (id: string) => {
    setGroups(prev => prev.filter(g => g.id !== id));
    setSelectedGroup(null);
  };

  // Statistiques rapides
  const stats = {
    total: groups.length,
    actifs: groups.filter(g => g.status === 'actif').length,
    enAttente: groups.filter(g => g.status === 'en_attente').length,
    totalEleves: groups.reduce((sum, g) => sum + g.currentMembers, 0),
    totalRevenus: groups.reduce((sum, g) => sum + g.totalRevenue, 0),
  };

  return {
    filteredGroups, filters, setFilters, stats,
    selectedGroup, setSelectedGroup,
    handleVerify, handleSuspend, handleDelete,
  };
};