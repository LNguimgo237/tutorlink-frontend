import { useState } from 'react';
import { TutorValidationItem, TopRatedTutor } from '../types/tutorValidation.types';

export const useAdminTutors = () => {

  // ── DONNÉES MOCK ── à remplacer par adminTutorService quand backend prêt
  const [pendingTutors, setPendingTutors] = useState<TutorValidationItem[]>([
    {
      id: '1', name: 'Mme Fotso Aline', email: 'aline@gmail.com',
      phone: '699334455', subject: 'Physique-Chimie', level: 'Lycée',
      quartier: 'Foto', rating: 0, totalSessions: 0,
      status: 'en_attente', submittedAt: '2026-06-20',
      documents: [
        { type: 'CNI', url: '/mock/cni.jpg', label: 'Carte Nationale d\'Identité' },
        { type: 'diplome', url: '/mock/diplome.pdf', label: 'Licence Physique UDs' },
        { type: 'photo', url: '/mock/photo.jpg', label: 'Photo de profil' },
      ],
    },
    {
      id: '2', name: 'M. Tagne Jules', email: 'jules@gmail.com',
      phone: '677445566', subject: 'Mathématiques', level: 'Terminale',
      quartier: 'Bafoussam Road', rating: 0, totalSessions: 0,
      status: 'en_attente', submittedAt: '2026-06-21',
      documents: [
        { type: 'CNI', url: '/mock/cni2.jpg', label: 'Carte Nationale d\'Identité' },
        { type: 'diplome', url: '/mock/diplome2.pdf', label: 'Master Maths UDs' },
        { type: 'photo', url: '/mock/photo2.jpg', label: 'Photo de profil' },
      ],
    },
  ]);

  const [topTutors] = useState<TopRatedTutor[]>([
    { id: '3', name: 'M. Nguena Leonel', subject: 'Mathématiques', rating: 4.9, totalSessions: 97, quartier: 'Centre' },
    { id: '4', name: 'Mme Kenfack Sylvie', subject: 'Physique-Chimie', rating: 4.8, totalSessions: 64, quartier: 'Foto' },
    { id: '5', name: 'Mlle Tsafack Erica', subject: 'Anglais', rating: 4.9, totalSessions: 72, quartier: 'Centre' },
  ]);

  // Document sélectionné pour la visionneuse
  const [viewedDoc, setViewedDoc] = useState<string | null>(null);

  // Approuver un répétiteur (mock)
  const handleApprove = (tutorId: string) => {
    setPendingTutors(prev =>
      prev.map(t => t.id === tutorId ? { ...t, status: 'approuve' } : t)
    );
  };

  // Rejeter avec motif (mock)
  const handleReject = (tutorId: string, reason: string) => {
    setPendingTutors(prev =>
      prev.map(t => t.id === tutorId
        ? { ...t, status: 'rejete', rejectReason: reason }
        : t
      )
    );
  };

  // Répétiteurs encore en attente
  const pendingOnly = pendingTutors.filter(t => t.status === 'en_attente');

  return {
    pendingOnly, topTutors,
    viewedDoc, setViewedDoc,
    handleApprove, handleReject,
  };
};