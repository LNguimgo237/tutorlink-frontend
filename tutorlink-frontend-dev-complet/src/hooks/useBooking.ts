import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import bookingService from '../services/bookingService';
import { BookingTutor, TimeSlot, BookingFormData } from '../types/booking.types';

export const useBooking = (tutorId?: string) => {
  const navigate = useNavigate();

  const { data: tutor } = useQuery<BookingTutor>({
    queryKey: ['booking-tutor', tutorId],
    queryFn: () => bookingService.getTutorById(tutorId!),
    enabled: !!tutorId,
  });

  const { data: slots = [] } = useQuery<TimeSlot[]>({
    queryKey: ['booking-availability', tutorId],
    queryFn: () => bookingService.getTutorAvailability(tutorId!),
    enabled: !!tutorId,
  });

  const [formData, setFormData] = useState<BookingFormData>({
    selectedSlot: null,
    subject: '',
    duration: 2,
    studentName: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSelectSlot = (slot: TimeSlot) => {
    if (!slot.available) return;
    setFormData(prev => ({ ...prev, selectedSlot: slot }));
    setError('');
  };

  const estimatedAmount = (tutor?.hourlyPrice ?? 0) * formData.duration;

  const bookingMutation = useMutation({
    mutationFn: () => bookingService.createReservation(tutorId!, formData),
    onSuccess: () => {
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    },
    onError: () => setError('Une erreur est survenue. Réessayez.'),
  });

  const handleSubmit = () => {
    if (!formData.selectedSlot) {
      setError('Sélectionnez un créneau avant de confirmer.');
      return;
    }
    bookingMutation.mutate();
  };

  return {
    tutor, slots, formData, setFormData,
    error, loading: bookingMutation.isPending, submitted, estimatedAmount,
    handleSelectSlot, handleSubmit,
  };
};