import { useState } from 'react';
import {
  TutorReview, ReviewStats, ReviewFilters
} from '../types/review.types';

export const useTutorReviews = () => {

  // ── AVIS MOCK ──
  const [reviews, setReviews] = useState<TutorReview[]>([
    {
      id: 'rv1',
      author: 'Talla Paul',
      authorRole: 'parent',
      studentName: 'Mystelle Laressa',
      rating: 5,
      comment: 'Mon fils a gagné 4 points de moyenne en mathématiques en deux mois. M. Kamga est très pédagogue et ponctuel. Je recommande vivement.',
      subject: 'Mathématiques',
      date: 'il y a 3 jours',
      isNew: true,
    },
    {
      id: 'rv2',
      author: 'Guimdo Erica',
      authorRole: 'eleve',
      rating: 5,
      comment: 'Excellent prof, il explique les intégrales d\'une façon que je comprends enfin. Toujours disponible pour répondre aux questions par message.',
      subject: 'Mathématiques',
      date: 'il y a 1 semaine',
      isNew: true,
    },
    {
      id: 'rv3',
      author: 'Fokou Cédric',
      authorRole: 'eleve',
      rating: 4,
      comment: 'Très bon accompagnement pour le BAC blanc. Cours bien structurés avec des exercices types examen.',
      subject: 'Mathématiques',
      date: 'il y a 2 semaines',
      isNew: false,
      reply: 'Merci Cédric ! Continue à travailler régulièrement, tu es sur la bonne voie.',
    },
    {
      id: 'rv4',
      author: 'Ngono Christelle',
      authorRole: 'eleve',
      rating: 5,
      comment: 'Monsieur Kamga est très patient et sait adapter ses explications à mon niveau. Les exercices donnés après chaque séance m\'ont vraiment aidée.',
      subject: 'Mathématiques',
      date: 'il y a 3 semaines',
      isNew: false,
    },
    {
      id: 'rv5',
      author: 'Mbouh Pierre',
      authorRole: 'parent',
      studentName: 'Mbouh Karine',
      rating: 4,
      comment: 'Très bon rapport qualité/prix. Ma fille progresse régulièrement depuis l\'inscription. Le professeur est sérieux et ponctuel.',
      subject: 'Mathématiques',
      date: 'il y a 1 mois',
      isNew: false,
      reply: 'Merci beaucoup ! Karine est une élève très assidue, c\'est un plaisir de travailler avec elle.',
    },
    {
      id: 'rv6',
      author: 'Tagne Paul',
      authorRole: 'parent',
      studentName: 'Tagne Junior',
      rating: 3,
      comment: 'Bon professeur mais parfois en retard. Les cours sont de qualité mais la ponctualité pourrait être améliorée.',
      subject: 'Mathématiques',
      date: 'il y a 2 mois',
      isNew: false,
    },
  ]);

  // Filtres actifs
  const [filters, setFilters] = useState<ReviewFilters>({
    rating: null,
    subject: '',
  });

  // ID de l'avis en cours de réponse
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // Texte de la réponse en cours
  const [replyText, setReplyText] = useState('');

  // Filtrage local
  const filteredReviews = reviews.filter(r => {
    const matchRating = filters.rating === null || r.rating === filters.rating;
    const matchSubject = !filters.subject ||
      r.subject.toLowerCase().includes(filters.subject.toLowerCase());
    return matchRating && matchSubject;
  });

  // Soumettre une réponse à un avis
  const handleSubmitReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r =>
      r.id === reviewId ? { ...r, reply: replyText.trim() } : r
    ));
    setReplyingTo(null);
    setReplyText('');
    // → remplacer par reviewService.replyToReview(reviewId, replyText)
  };

  // Calculer les statistiques
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? Math.round(
        reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews * 10
      ) / 10
    : 0;

  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    return {
      stars,
      count,
      pct: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0,
    };
  });

  const stats: ReviewStats = {
    averageRating,
    totalReviews,
    distribution,
  };

  return {
    filteredReviews, filters, setFilters, stats,
    replyingTo, setReplyingTo,
    replyText, setReplyText,
    handleSubmitReply,
  };
};