import { useState } from 'react';
import { Group, GroupReview } from '../types/group.types';

export const useGroupDetail = (groupId: string) => {
  // Mock groupe détaillé
  const [group] = useState<Group>({
    id: groupId,
    name: 'Maths BAC C/D · Groupe Élite',
    subject: 'Mathématiques',
    level: 'Terminale C/D',
    quartier: 'Centre Dschang',
    description: 'Groupe d\'excellence pour les élèves de Terminale C et D préparant le BAC. Effectif limité à 8 élèves pour garantir un suivi individualisé. Les séances combinent cours théoriques, exercices types BAC et examens blancs mensuels.',
    tutor: {
      id: 't1', name: 'M. Kamga Eric',
      subject: 'Mathématiques', rating: 4.9,
      totalSessions: 312, diploma: 'Licence Mathématiques · Université de Dschang',
    },
    rating: 4.9, reviewCount: 24,
    currentMembers: 6, maxMembers: 8,
    monthlyPrice: 7000,
    sessions: [
      { day: 'MAR', startTime: '16h', endTime: '18h' },
      { day: 'SAM', startTime: '16h', endTime: '18h' },
    ],
    themes: ['Intégrales', 'Probabilités', 'Suites numériques', 'Géométrie dans l\'espace', 'Arithmétique', 'Examens blancs'],
    status: 'actif',
    isVerified: true,
    createdAt: '2026-01-15',
  });

  const [reviews] = useState<GroupReview[]>([
    { id: '1', author: 'Leonel Nguimgo', role: 'eleve', rating: 5, comment: 'Ambiance studieuse, le prof prend le temps d\'expliquer à chacun. Les examens blancs sont très utiles.', date: 'il y a 5 jours' },
    { id: '2', author: 'Tsafack Dilane', role: 'eleve', rating: 5, comment: 'Bien mieux que les répétitions individuelles : on apprend aussi des questions des autres élèves.', date: 'il y a 2 semaines' },
    { id: '3', author: 'Laressa Donfack', role: 'parent', rating: 4, comment: 'Très bon rapport qualité/prix. Mon fils progresse régulièrement depuis l\'inscription.', date: 'il y a 1 mois' },
  ]);

  // Coût individuel équivalent pour la comparaison tarifaire
  const individualCost = group.tutor.totalSessions > 0
    ? 2000 * 16  // 2000 FCFA/h * 16h/mois
    : 0;

  const savings = individualCost - group.monthlyPrice;

  const handleJoin = (method: 'MTN' | 'Orange') => {
    console.log(`Rejoindre groupe ${groupId} via ${method}`);
    // → appeler groupService.joinGroup(groupId, method)
  };

  const handleWaitlist = () => {
    console.log(`Liste d'attente groupe ${groupId}`);
    // → appeler groupService.joinWaitlist(groupId)
  };

  return { group, reviews, individualCost, savings, handleJoin, handleWaitlist };
};