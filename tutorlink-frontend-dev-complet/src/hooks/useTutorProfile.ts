import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import tutorProfileService from '../services/tutorProfileService';
import type { TutorPublicProfile, PublicReview, PublicAvailabilitySlot } from '../types/tutorProfile.types';

export const useTutorProfile = (tutorId?: string) => {
  const navigate = useNavigate();

  const { data: baseProfile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['tutor-profile', tutorId],
    queryFn: () => tutorProfileService.getTutorProfile(tutorId!),
    enabled: !!tutorId,
  });

  const { data: reviews = [] } = useQuery<PublicReview[]>({
    queryKey: ['tutor-profile-reviews', tutorId],
    queryFn: () => tutorProfileService.getTutorReviews(tutorId!),
    enabled: !!tutorId,
  });

  const { data: availability = [] } = useQuery<PublicAvailabilitySlot[]>({
    queryKey: ['tutor-profile-availability', tutorId],
    queryFn: () => tutorProfileService.getTutorAvailability(tutorId!),
    enabled: !!tutorId,
  });

  const profile: TutorPublicProfile | undefined = baseProfile
    ? { ...baseProfile, reviews, availability }
    : undefined;

  const [selectedSlot, setSelectedSlot] =
    useState<{ day: string; startTime: string; endTime: string } | null>(null);

  const handleSelectSlot = (slot: { day: string; startTime: string; endTime: string }) => {
    setSelectedSlot(slot);
  };

  const handleBookCourse = () => {
    if (profile?.id) navigate(`/reserver/${profile.id}`);
  };

  return {
    profile, selectedSlot, isLoading: isLoadingProfile,
    handleSelectSlot, handleBookCourse,
  };
};