import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import studentReviewService from '../services/studentREviewService';
import { StudentReview, PendingReview, StudentReviewStats } from '../types/studentReview.types';

export const useStudentReviews = () => {
  const queryClient = useQueryClient();

  const { data: reviews = [] } = useQuery<StudentReview[]>({
    queryKey: ['student-reviews'],
    queryFn: studentReviewService.getMyReviews,
    staleTime: 60 * 1000,
  });

  const { data: pendingReviews = [] } = useQuery<PendingReview[]>({
    queryKey: ['student-reviews-pending'],
    queryFn: studentReviewService.getPendingReviews,
    staleTime: 60 * 1000,
  });

  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [ratingPendingId, setRatingPendingId] = useState<string | null>(null);
  const [form, setForm] = useState({ rating: 5, comment: '' });

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['student-reviews'] });
    queryClient.invalidateQueries({ queryKey: ['student-reviews-pending'] });
  };

  const submitMutation = useMutation({
    mutationFn: ({ pending }: { pending: PendingReview }) =>
      studentReviewService.submitReview({
        tutorId: pending.tutorId,
        courseId: pending.id,
        rating: form.rating,
        comment: form.comment,
      }),
    onSuccess: () => {
      invalidate();
      setRatingPendingId(null);
      setForm({ rating: 5, comment: '' });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ reviewId }: { reviewId: string }) =>
      studentReviewService.updateReview(reviewId, {
        rating: form.rating, comment: form.comment,
      }),
    onSuccess: () => {
      invalidate();
      setEditingReviewId(null);
      setForm({ rating: 5, comment: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: studentReviewService.deleteReview,
    onSuccess: invalidate,
  });

  const handleSubmitReview = (pendingId: string) => {
    if (!form.comment.trim()) return;
    const pending = pendingReviews.find(p => p.id === pendingId);
    if (!pending) return;
    submitMutation.mutate({ pending });
  };

  const handleUpdateReview = (reviewId: string) => {
    if (!form.comment.trim()) return;
    updateMutation.mutate({ reviewId });
  };

  const handleDeleteReview = (reviewId: string) => deleteMutation.mutate(reviewId);

  const handleStartEdit = (review: StudentReview) => {
    setEditingReviewId(review.id);
    setForm({ rating: review.rating, comment: review.comment });
  };

  const stats: StudentReviewStats = {
    totalReviews: reviews.length,
    averageGiven: reviews.length > 0
      ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length * 10) / 10
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