import { useState } from 'react';
import {
  StudentReview, PendingReview, StudentReviewStats
} from '../types/studentReview.types';

export const useStudentReviews = () => {

  // ── AVIS PUBLIÉS MOCK ──
  const [reviews, setReviews] = useState<StudentReview[]>([
    {
      id: 'rv1',
      tutorId: 't1',
      tutorName: 'M.Serge Kenfack',
      tutorSubject: 'Mathématiques',
      courseDate: '2026-06-23',
      rating: 5,
      comment: 'Excellent prof, il explique les intégrales d\'une façon que je comprends enfin. Toujours disponible pour répondre aux questions par message.',
      status: 'publie',
      createdAt: '2026-06-23',
      tutorReply: 'Merci Junior ! Continue à travailler régulièrement, tu es sur la bonne voie pour le BAC.',
    },
    {
      id: 'rv2',
      tutorId: 't2',
      tutorName: 'Mme Takam Myster',
      tutorSubject: 'Physique-Chimie',
      courseDate: '2026-06-18',
      rating: 4,
      comment: 'Très bonne pédagogie, les exercices pratiques m\'ont beaucoup aidé. Je recommande pour la physique.',
      status: 'publie',
      createdAt: '2026-06-18',
    },
    {
      id: 'rv3',
      tutorId: 't3',
      tutorName: 'Mlle Fotso Mystelle',
      tutorSubject: 'Anglais',
      courseDate: '2026-06-10',
      rating: 5,
      comment: 'Méthode conversationnelle très efficace. Mon niveau en anglais a vraiment progressé en quelques séances.',
      status: 'publie',
      createdAt: '2026-06-10',
      tutorReply: 'Merci beaucoup ! Votre implication et votre sérieux font toute la différence.',
    },
    {
      id: 'rv4',
      tutorId: 't4',
      tutorName: 'M. Nana Bertrand',
      tutorSubject: 'Français',
      courseDate: '2026-05-28',
      rating: 3,
      comment: 'Bon professeur mais les exercices manquaient parfois de variété. Le cours de dissertation était bien structuré.',
      status: 'publie',
      createdAt: '2026-05-28',
    },
  ]);

  // ── COURS EN ATTENTE D'AVIS MOCK ──
  const [pendingReviews] = useState<PendingReview[]>([
    {
      id: 'pr1',
      tutorId: 't1',
      tutorName: 'M.Nguena Paul',
      tutorSubject: 'Mathématiques',
      courseDate: '2026-06-27',
      courseTime: '16h – 18h',
    },
    {
      id: 'pr2',
      tutorId: 't2',
      tutorName: 'Mme Kouam Emmanuel',
      tutorSubject: 'Physique-Chimie',
      courseDate: '2026-06-25',
      courseTime: '17h – 19h',
    },
  ]);

  // ID de l'avis en cours d'édition
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // ID du cours en cours de notation (nouvel avis)
  const [ratingPendingId, setRatingPendingId] = useState<string | null>(null);

  // Formulaire nouvel avis / modification
  const [form, setForm] = useState({ rating: 5, comment: '' });

  // Soumettre un nouvel avis (mock)
  const handleSubmitReview = (pendingId: string) => {
    if (!form.comment.trim()) return;
    const pending = pendingReviews.find(p => p.id === pendingId);
    if (!pending) return;

    const newReview: StudentReview = {
      id: `rv${Date.now()}`,
      tutorId: pending.tutorId,
      tutorName: pending.tutorName,
      tutorSubject: pending.tutorSubject,
      courseDate: pending.courseDate,
      rating: form.rating,
      comment: form.comment,
      status: 'publie',
      createdAt: new Date().toISOString().split('T')[0],
    };

    setReviews(prev => [newReview, ...prev]);
    setRatingPendingId(null);
    setForm({ rating: 5, comment: '' });
    // → remplacer par studentReviewService.submitReview(...)
  };

  // Modifier un avis existant (mock)
  const handleUpdateReview = (reviewId: string) => {
    if (!form.comment.trim()) return;
    setReviews(prev => prev.map(r =>
      r.id === reviewId
        ? { ...r, rating: form.rating, comment: form.comment }
        : r
    ));
    setEditingReviewId(null);
    setForm({ rating: 5, comment: '' });
    // → remplacer par studentReviewService.updateReview(reviewId, form)
  };

  // Supprimer un avis (mock)
  const handleDeleteReview = (reviewId: string) => {
    setReviews(prev => prev.filter(r => r.id !== reviewId));
    // → remplacer par studentReviewService.deleteReview(reviewId)
  };

  // Ouvrir le formulaire de modification
  const handleStartEdit = (review: StudentReview) => {
    setEditingReviewId(review.id);
    setForm({ rating: review.rating, comment: review.comment });
  };

  // Statistiques
  const stats: StudentReviewStats = {
    totalReviews: reviews.length,
    averageGiven: reviews.length > 0
      ? Math.round(
          reviews.reduce((sum, r) => sum + r.rating, 0)
          / reviews.length * 10
        ) / 10
      : 0,
    pendingCount: pendingReviews.length,
  };

  return {
    reviews, pendingReviews, stats,
    editingReviewId, setEditingReviewId,
    ratingPendingId, setRatingPendingId,
    form, setForm,
    handleSubmitReview, handleUpdateReview,
    handleDeleteReview, handleStartEdit,
  };
};