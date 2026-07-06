import { useState } from 'react';
import { AdminReservation, ReservationFilters } from '../types/adminReservation.types';

export const useAdminReservations = () => {

  // ── DONNÉES MOCK ── à remplacer par adminReservationService
  const [reservations, setReservations] = useState<AdminReservation[]>([
    {
      id: '1', reference: 'RES-2026-001',
      eleve: { name: 'Paul leonel', email: 'paul@gmail.com', phone: '677001122' },
      repetiteur: { name: 'M. sonfack Eric', email: 'sonfack@gmail.com', subject: 'Mathématiques' },
      date: '2026-06-22', timeSlot: '14h00 - 16h00', duration: 2,
      amount: 7000, courseStatus: 'terminee', 
      operator: 'MTN', transactionId: 'MTN-789456123',
      quartier: 'Centre', createdAt: '2026-06-20',
    },
    {
      id: '2', reference: 'RES-2026-002',
      eleve: { name: 'Sophie Nguena', email: 'sophie@gmail.com', phone: '699112233' },
      repetiteur: { name: 'Mme Mambe Sylvie', email: 'tchana@gmail.com', subject: 'Physique-Chimie' },
      date: '2026-06-23', timeSlot: '10h00 - 12h00', duration: 2,
      amount: 6000, courseStatus: 'confirmee', 
      operator: 'Orange', transactionId: 'ORG-456123789',
      quartier: 'Foto', createdAt: '2026-06-21',
    },
    {
      id: '3', reference: 'RES-2026-003',
      eleve: { name: 'Marie Francine', email: 'marie@gmail.com', phone: '655778899' },
      repetiteur: { name: 'Mlle Tsafack Erica', email: 'erica@gmail.com', subject: 'Anglais' },
      date: '2026-06-24', timeSlot: '16h00 - 18h00', duration: 2,
      amount: 5600, courseStatus: 'confirmee', 
      operator: 'en_attente', quartier: 'Ngui', createdAt: '2026-06-22',
    },
    {
      id: '4', reference: 'RES-2026-004',
      eleve: { name: 'Lionel Nguims', email: 'lionel@gmail.com', phone: '683428312' },
      repetiteur: { name: 'M. Kamga Eric', email: 'kamga@gmail.com', subject: 'Mathématiques' },
      date: '2026-06-20', timeSlot: '08h00 - 10h00', duration: 2,
      amount: 7000, courseStatus: 'annulee', 
      operator: 'MTN', transactionId: 'MTN-123456789',
      quartier: 'Centre', createdAt: '2026-06-18',
    },
  ]);

  // Filtres actifs
  const [filters, setFilters] = useState<ReservationFilters>({
    search: '', courseStatus: 'TOUS', 
    dateFrom: '', dateTo: '', subject: '',
  });

  // Réservation sélectionnée pour le drawer de détail
  const [selectedReservation, setSelectedReservation] =
    useState<AdminReservation | null>(null);

  // Filtrage local
  const filtered = reservations.filter(r => {
    const matchSearch =
      r.eleve.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.repetiteur.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.reference.toLowerCase().includes(filters.search.toLowerCase());
    const matchCourse = filters.courseStatus === 'TOUS' ||
      r.courseStatus === filters.courseStatus;
    const matchPayment = filters.paymentStatus === 'TOUS' ||
      r.paymentStatus === filters.paymentStatus;
    const matchSubject = !filters.subject ||
      r.repetiteur.subject.toLowerCase().includes(filters.subject.toLowerCase());
    return matchSearch && matchCourse && matchPayment && matchSubject;
  });

  // Marquer comme terminée (mock)
  const handleComplete = (id: string) => {
    setReservations(prev => prev.map(r =>
      r.id === id ? { ...r, courseStatus: 'terminee' } : r
    ));
  };

  // Annuler (mock)
  const handleCancel = (id: string) => {
    setReservations(prev => prev.map(r =>
      r.id === id ? { ...r, courseStatus: 'annulee' } : r
    ));
    setSelectedReservation(null);
  };

  // Statistiques rapides pour l'en-tête
  const stats = {
    total: reservations.length,
    confirmees: reservations.filter(r => r.courseStatus === 'confirmee').length,
    terminees: reservations.filter(r => r.courseStatus === 'terminee').length,
    enAttentePaiement: reservations.filter(r => r.paymentStatus === 'en_attente').length,
    revenuTotal: reservations
      .filter(r => r.paymentStatus !== 'en_attente' && r.paymentStatus !== 'rembourse')
      .reduce((sum, r) => sum + r.amount, 0),
  };

  return {
    filtered, filters, setFilters, stats,
    selectedReservation, setSelectedReservation,
    handleComplete, handleCancel,
  };
};