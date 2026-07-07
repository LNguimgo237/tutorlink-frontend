import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  StudentReservation,
  StudentReservationFilters
} from '../types/studentReservation.types';

export const useStudentReservations = () => {
  const navigate = useNavigate();

  // ── RÉSERVATIONS MOCK ── sans données paiement
  const [reservations, setReservations] =
    useState<StudentReservation[]>([
    {
      id: 'r1',
      reference: 'REQ-2026-001',
      tutorName: 'M.NGUIMGO Leo',
      tutorPhone: '677 00 11 22',
      tutorSubject: 'Mathématiques',
      date: 'Lun. 23 juin 2026',
      time: '16h – 18h',
      duration: 2,
      status: 'confirme',
      estimatedAmount: 4000,
      quartier: 'Centre Dschang',
      message: 'Révision intégrales BAC',
    },
    {
      id: 'r2',
      reference: 'REQ-2026-002',
      tutorName: 'Mme Donfack Mystelle',
      tutorPhone: '699 33 44 55',
      tutorSubject: 'Physique-Chimie',
      date: 'Mer. 25 juin 2026',
      time: '17h – 19h',
      duration: 2,
      status: 'en_attente',
      estimatedAmount: 3600,
      quartier: 'Quartier Foto',
    },
    {
      id: 'r3',
      reference: 'REQ-2026-003',
      tutorName: 'Mlle Fotso Aline',
      tutorPhone: '655 77 88 99',
      tutorSubject: 'Anglais',
      date: 'Ven. 27 juin 2026',
      time: '15h – 17h',
      duration: 2,
      status: 'confirme',
      estimatedAmount: 3400,
      quartier: 'Centre Dschang',
    },
    {
      id: 'r4',
      reference: 'REQ-2026-000',
      tutorName: 'M.Nanfack Franck',
      tutorPhone: '677 00 11 22',
      tutorSubject: 'Mathématiques',
      date: 'Lun. 16 juin 2026',
      time: '16h – 18h',
      duration: 2,
      status: 'termine',
      estimatedAmount: 4000,
      quartier: 'Centre Dschang',
    },
    {
      id: 'r5',
      reference: 'REQ-2026-X01',
      tutorName: 'M. Nana Bertrand',
      tutorPhone: '677 44 55 66',
      tutorSubject: 'Français',
      date: 'Sam. 15 juin 2026',
      time: '10h – 12h',
      duration: 2,
      status: 'annule',
      estimatedAmount: 3000,
      quartier: 'Ngui Dschang',
    },
  ]);

  const [filters, setFilters] = useState<StudentReservationFilters>({
    search: '', status: 'TOUS',
  });

  // Réservation sélectionnée pour le détail
  const [selectedReservation, setSelectedReservation] =
    useState<StudentReservation | null>(null);

  // Filtrage
  const filteredReservations = reservations.filter(r => {
    const matchSearch =
      !filters.search ||
      r.tutorName.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.reference.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.tutorSubject.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus =
      filters.status === 'TOUS' || r.status === filters.status;
    return matchSearch && matchStatus;
  });

  // Annuler une réservation (mock)
  const handleCancel = (id: string) => {
    setReservations(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'annule' } : r
    ));
    setSelectedReservation(null);
  };

  // Contacter le répétiteur
  const handleContact = (tutorName: string) => {
    navigate('/messagerie');
  };

  // Statistiques
  const stats = {
    total: reservations.length,
    confirmees: reservations.filter(r => r.status === 'confirme').length,
    enAttente: reservations.filter(r => r.status === 'en_attente').length,
    terminees: reservations.filter(r => r.status === 'termine').length,
  };

  return {
    filteredReservations, filters, setFilters, stats,
    selectedReservation, setSelectedReservation,
    handleCancel, handleContact,
  };
};