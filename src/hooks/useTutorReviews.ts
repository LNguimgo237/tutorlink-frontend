import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import reviewService from '../services/reviewService';
import { TutorReview, ReviewStats, ReviewFilters } from '../types/review.types';

export const useTutorReviews = () => {
  const queryClient = useQueryClient();

  const { data: reviews = [] } = useQuery<TutorReview[]>({
    queryKey: ['tutor-reviews'],
    queryFn: reviewService.getReviews,
    staleTime: 60 * 1000,
  });

  const [filters, setFilters] = useState<ReviewFilters>({ rating: null, subject: '' });
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const filteredReviews = reviews.filter(r => {
    const matchRating = filters.rating === null || r.rating === filters.rating;
    const matchSubject = !filters.subject ||
      r.subject.toLowerCase().includes(filters.subject.toLowerCase());
    return matchRating && matchSubject;
  });

  const replyMutation = useMutation({
    mutationFn: ({ reviewId, reply }: { reviewId: string; reply: string }) =>
      reviewService.replyToReview(reviewId, reply),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-reviews'] });
      setReplyingTo(null);
      setReplyText('');
    },
  });

  const handleSubmitReply = (reviewId: string) => {
    if (!replyText.trim()) return;
    replyMutation.mutate({ reviewId, reply: replyText.trim() });
  };

  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews * 10) / 10
    : 0;

  const distribution = [5, 4, 3, 2, 1].map(stars => {
    const count = reviews.filter(r => r.rating === stars).length;
    return { stars, count, pct: totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0 };
  });

  const stats: ReviewStats = { averageRating, totalReviews, distribution };

  return {
    filteredReviews, filters, setFilters, stats,
    replyingTo, setReplyingTo,
    replyText, setReplyText,
    handleSubmitReply,
  };
};