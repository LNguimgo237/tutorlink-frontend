import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BookingTutor, TimeSlot, BookingFormData
} from '../types/booking.types';

export const useBooking = (tutorId?: string) => {
  const navigate = useNavigate();

  // ── DONNÉES MOCK répétiteur ──
  const [tutor] = useState<BookingTutor>({
    id: tutorId || 't1',
    name: 'M. Kenfack Leo',
    subject: 'Mathématiques',
    level: 'Terminale C/D',
    quartier: 'Centre Dschang',
    rating: 4.9,
    reviewCount: 87,
    hourlyPrice: 2000,
  });

  // ── CRÉNEAUX DISPONIBLES MOCK ──
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

  // État du formulaire
  const [formData, setFormData] = useState<BookingFormData>({
    selectedSlot: null,
    subject: 'Mathématiques',
    duration: 2,
    studentName: '',
    message: '',
    paymentMethod: null,
  });

  // Message d'erreur
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Sélectionner un créneau
  const handleSelectSlot = (slot: TimeSlot) => {
    if (!slot.available) return;
    setFormData(prev => ({ ...prev, selectedSlot: slot }));
    setError('');
  };

  // Changer le moyen de paiement
  const handleSelectPayment = (method: 'MTN' | 'Orange') => {
    setFormData(prev => ({ ...prev, paymentMethod: method }));
    setError('');
  };

  // Calculer le total
  const total = tutor.hourlyPrice * formData.duration;

  // Soumettre la réservation
  const handleSubmit = async () => {
    // Validations
    if (!formData.selectedSlot) {
      setError('Sélectionnez un créneau avant de confirmer.');
      return;
    }
    if (!formData.paymentMethod) {
      setError('Choisissez un moyen de paiement.');
      return;
    }

    try {
      setLoading(true);
      // → remplacer par bookingService.createReservation(tutor.id, formData)
      console.log('Réservation:', formData);

      // Simulation succès → redirige vers dashboard
      setTimeout(() => {
        navigate('/booking/confirm/:bookingId');
      }, 1000);
    } catch {
      setError('Une erreur est survenue. Réessayez.');
    } finally {
      setLoading(false);
    }
  };

  return {
    tutor, slots, formData, setFormData,
    error, loading, total,
    handleSelectSlot, handleSelectPayment, handleSubmit,
  };
};