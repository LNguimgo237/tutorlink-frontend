import { useState } from 'react';
import { AdminReservation, ReservationFilters, CourseStatus } from '../types/adminReservation.types';

export const useAdminReservations = () => {

  // ── RÉSERVATIONS MOCK ── sans données paiement
  const [reservations, setReservations] = useState<AdminReservation[]>([
    {
      id: '1',
      reference: 'RES-2026-001',
      eleve: { name: 'Paul Nkeng', email: 'paul@gmail.com', phone: '677001122' },
      repetiteur: { name: 'M. Kamga Eric', email: 'kamga@gmail.com', subject: 'Mathématiques', phone: '677 00 11 22' },
      date: '2026-06-22',
      timeSlot: '16h00 - 18h00',
      duration: 2,
      courseStatus: 'terminee',
      quartier: 'Centre',
      createdAt: '2026-06-20',
      estimatedAmount: 4000,
    },
    {
      id: '2',
      reference: 'RES-2026-002',
      eleve: { name: 'Sophie Nguena', email: 'sophie@gmail.com', phone: '699112233' },
      repetiteur: { name: 'Mme Tchana Sylvie', email: 'tchana@gmail.com', subject: 'Physique-Chimie', phone: '699 33 44 55' },
      date: '2026-06-23',
      timeSlot: '10h00 - 12h00',
      duration: 2,
      courseStatus: 'confirmee',
      quartier: 'Foto',
      createdAt: '2026-06-21',
      estimatedAmount: 3600,
    },
    {
      id: '3',
      reference: 'RES-2026-003',
      eleve: { name: 'Marie Francine', email: 'marie@gmail.com', phone: '655778899' },
      repetiteur: { name: 'Mlle Fotso Aline', email: 'aline@gmail.com', subject: 'Anglais', phone: '655 77 88 99' },
      date: '2026-06-24',
      timeSlot: '16h00 - 18h00',
      duration: 2,
      courseStatus: 'confirmee',
      quartier: 'Ngui',
      createdAt: '2026-06-22',
      estimatedAmount: 3400,
    },
    {
      id: '4',
      reference: 'RES-2026-004',
      eleve: { name: 'Lionel Nguims', email: 'lionel@gmail.com', phone: '683428312' },
      repetiteur: { name: 'M. Kamga Eric', email: 'kamga@gmail.com', subject: 'Mathématiques', phone: '677 00 11 22' },
      date: '2026-06-20',
      timeSlot: '08h00 - 10h00',
      duration: 2,
      courseStatus: 'annulee',
      quartier: 'Centre',
      createdAt: '2026-06-18',
      estimatedAmount: 4000,
    },
  ]);

  const [filters, setFilters] = useState<ReservationFilters>({
    search: '', courseStatus: 'TOUS',
    dateFrom: '', dateTo: '',
  });

  const [selectedReservation, setSelectedReservation] =
    useState<AdminReservation | null>(null);

  // Filtrage
  const filtered = reservations.filter(r => {
    const matchSearch =
      r.eleve.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.repetiteur.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.reference.toLowerCase().includes(filters.search.toLowerCase());
    const matchCourse =
      filters.courseStatus === 'TOUS' || r.courseStatus === filters.courseStatus;
    return matchSearch && matchCourse;
  });

  // Annuler une réservation (mock)
  const handleCancel = (id: string) => {
    setReservations(prev => prev.map(r =>
      r.id === id ? { ...r, courseStatus: 'annulee' } : r
    ));
    setSelectedReservation(null);
  };

  // Stats simplifiées
  const stats = {
    total: reservations.length,
    confirmees: reservations.filter(r => r.courseStatus === 'confirmee').length,
    terminees: reservations.filter(r => r.courseStatus === 'terminee').length,
    annulees: reservations.filter(r => r.courseStatus === 'annulee').length,
  };

  return {
    filtered, filters, setFilters, stats,
    selectedReservation, setSelectedReservation,
    handleCancel,
  };
};