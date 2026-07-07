import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookingTutor, TimeSlot, BookingFormData } from '../types/booking.types';

export const useBooking = (tutorId?: string) => {
  const navigate = useNavigate();

  // ── RÉPÉTITEUR MOCK ── ajout du numéro de téléphone
  const [tutor] = useState<BookingTutor>({
    id: tutorId || 't1',
    name: 'M. Guena Paul',
    subject: 'Mathématiques',
    level: 'Terminale C/D',
    quartier: 'Centre Dschang',
    rating: 4.9,
    reviewCount: 87,
    hourlyPrice: 2000,
    phone: '677 00 11 22',  // ← pour paiement direct MTN/Orange
  });

  const [slots] = useState<TimeSlot[]>([
    { id: 's1', day: 'LUN', startTime: '16h', endTime: '18h', available: true },
    { id: 's2', day: 'LUN', startTime: '18h', endTime: '20h', available: false },
    { id: 's3', day: 'MAR', startTime: '16h', endTime: '18h', available: false },
    { id: 's4', day: 'MAR', startTime: '18h', endTime: '20h', available: true },
    { id: 's5', day: 'MER', startTime: '14h', endTime: '16h', available: true },
    { id: 's6', day: 'MER', startTime: '16h', endTime: '18h', available: true },
    { id: 's7', day: 'JEU', startTime: '17h', endTime: '19h', available: true },
    { id: 's8', day: 'VEN', startTime: '15h', endTime: '17h', available: true },
    { id: 's9', day: 'SAM', startTime: '09h', endTime: '11h', available: true },
    { id: 's10', day: 'SAM', startTime: '14h', endTime: '16h', available: true },
  ]);

  // ❌ SUPPRIMÉ : paymentMethod dans le formData
  const [formData, setFormData] = useState<BookingFormData>({
    selectedSlot: null,
    subject: 'Mathématiques',
    duration: 2,
    studentName: '',
    message: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSelectSlot = (slot: TimeSlot) => {
    if (!slot.available) return;
    setFormData(prev => ({ ...prev, selectedSlot: slot }));
    setError('');
  };

  // Calcul indicatif du montant — pour info seulement
  const estimatedAmount = tutor.hourlyPrice * formData.duration;

  // Soumettre la demande de cours (sans paiement plateforme)
  const handleSubmit = async () => {
    if (!formData.selectedSlot) {
      setError('Sélectionnez un créneau avant de confirmer.');
      return;
    }
    try {
      setLoading(true);
      // → remplacer par bookingService.createReservation(tutor.id, formData)
      console.log('Demande de cours:', formData);
      await new Promise(res => setTimeout(res, 800));
      setSubmitted(true);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch {
      setError('Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return {
    tutor, slots, formData, setFormData,
    error, loading, submitted, estimatedAmount,
    handleSelectSlot, handleSubmit,
  };
};