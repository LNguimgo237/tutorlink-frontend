import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StudentGroupItem, SuggestedGroup
} from '../types/studentGroup.types';

export const useStudentGroups = () => {
  const navigate = useNavigate();

  // ── GROUPES DE L'ÉLÈVE MOCK ──
  const [myGroups, setMyGroups] = useState<StudentGroupItem[]>([
    {
      id: 'g1',
      name: 'Maths BAC C/D · Groupe Élite',
      subject: 'Mathématiques',
      level: 'Terminale C/D',
      quartier: 'Centre Dschang',
      tutorName: 'M. Sonna Franck',
      tutorId: 't1',
      currentMembers: 6,
      maxMembers: 8,
      monthlyPrice: 7000,
      sessions: [
        { day: 'MAR', startTime: '16h', endTime: '18h' },
        { day: 'SAM', startTime: '16h', endTime: '18h' },
      ],
      nextSession: 'Sam. 28 juin · 16h',
      memberStatus: 'actif',
      paymentStatus: 'a_jour',
      lastPaymentDate: '2026-06-01',
      joinedAt: '2026-01-15',
      rating: 4.9,
      themes: [
        'Intégrales', 'Probabilités',
        'Suites numériques', 'Examens blancs',
      ],
    },
    {
      id: 'g2',
      name: 'English Club · Conversation',
      subject: 'Anglais',
      level: 'Collège & Lycée',
      quartier: 'Centre Dschang',
      tutorName: 'Mlle Mystelle Nguela',
      tutorId: 't3',
      currentMembers: 7,
      maxMembers: 10,
      monthlyPrice: 5000,
      sessions: [
        { day: 'SAM', startTime: '09h', endTime: '11h' },
      ],
      nextSession: 'Sam. 28 juin · 09h',
      memberStatus: 'actif',
      paymentStatus: 'en_retard',
      lastPaymentDate: '2026-05-01',
      joinedAt: '2026-02-10',
      rating: 4.9,
      themes: [
        'Conversation', 'Vocabulaire',
        'Grammaire', 'Préparation examens',
      ],
    },
  ]);

  // ── GROUPES SUGGÉRÉS MOCK ──
  const [suggestedGroups] = useState<SuggestedGroup[]>([
    {
      id: 'g3',
      name: 'Physique-Chimie · Première',
      subject: 'Physique-Chimie',
      tutorName: 'Mme Tchuam Laressa',
      monthlyPrice: 6000,
      currentMembers: 4,
      maxMembers: 6,
      rating: 4.8,
      nextSession: 'Mer. 25 juin · 17h',
    },
    {
      id: 'g4',
      name: 'Français · BEPC',
      subject: 'Français',
      tutorName: 'M. Nguefack Ammanuel',
      monthlyPrice: 5500,
      currentMembers: 5,
      maxMembers: 8,
      rating: 4.7,
      nextSession: 'Lun. 23 juin · 16h',
    },
  ]);

  // Modal paiement actif
  const [payingGroupId, setPayingGroupId] = useState<string | null>(null);

  // Payer le mois d'un groupe (mock)
  const handlePay = (groupId: string, method: 'MTN' | 'Orange') => {
    setMyGroups(prev => prev.map(g =>
      g.id === groupId
        ? { ...g, paymentStatus: 'a_jour', lastPaymentDate: '2026-06-28' }
        : g
    ));
    setPayingGroupId(null);
    // → remplacer par studentGroupService.payMonthly(groupId, method)
  };

  // Quitter un groupe (mock)
  const handleLeave = (groupId: string) => {
    setMyGroups(prev => prev.filter(g => g.id !== groupId));
    // → remplacer par studentGroupService.leaveGroup(groupId)
  };

  // Voir le détail d'un groupe
  const handleViewGroup = (groupId: string) => {
    navigate(`/groupes/${groupId}`);
  };

  // Rejoindre un groupe suggéré
  const handleJoinSuggested = (groupId: string) => {
    navigate(`/groupes/${groupId}`);
  };

  // Statistiques rapides
  const stats = {
    totalGroups: myGroups.length,
    monthlyTotal: myGroups.reduce((sum, g) => sum + g.monthlyPrice, 0),
    enRetard: myGroups.filter(g => g.paymentStatus === 'en_retard').length,
    totalSessions: myGroups.reduce((sum, g) => sum + g.sessions.length, 0),
  };

  return {
    myGroups, suggestedGroups, stats,
    payingGroupId, setPayingGroupId,
    handlePay, handleLeave,
    handleViewGroup, handleJoinSuggested,
  };
};