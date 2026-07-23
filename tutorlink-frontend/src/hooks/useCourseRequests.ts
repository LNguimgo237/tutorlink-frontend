import { useState } from 'react';
import {
  CourseRequestDetail,
  RequestFilters
} from '../types/courseRequest.types';

export const useCourseRequests = () => {

  // ── DONNÉES MOCK ──
  const [requests, setRequests] = useState<CourseRequestDetail[]>([
    {
      id: 'r1',
      reference: 'REQ-2026-001',
      student: {
        id: 's1',
        name: 'Ngono Christelle',
        email: 'christelle@gmail.com',
        phone: '677001122',
        level: 'Terminale C',
        quartier: 'Centre Dschang',
      },
      subject: 'Mathématiques',
      requestedDate: 'Sam. 28 juin 2026',
      requestedTime: '14h00',
      duration: 2,
      message: 'Préparation examen blanc BAC, je veux revoir les intégrales et les probabilités.',
      paymentMethod: 'MTN',
      amount: 4000,
      status: 'en_attente',
      createdAt: '2026-06-25',
    },
    {
      id: 'r2',
      reference: 'REQ-2026-002',
      student: {
        id: 's2',
        name: 'Mbouh Karine',
        email: 'karine@gmail.com',
        phone: '699334455',
        level: 'Terminale D',
        quartier: 'Foto',
      },
      subject: 'Mathématiques',
      requestedDate: 'Lun. 30 juin 2026',
      requestedTime: '16h00',
      duration: 1.5,
      message: 'Révision des dérivées et fonctions.',
      paymentMethod: 'Orange',
      amount: 3000,
      status: 'en_attente',
      createdAt: '2026-06-25',
    },
    {
      id: 'r3',
      reference: 'REQ-2026-003',
      student: {
        id: 's3',
        name: 'Talla Junior',
        email: 'junior@gmail.com',
        phone: '655778899',
        level: 'Terminale C',
        quartier: 'Ngui',
      },
      subject: 'Mathématiques',
      requestedDate: 'Mer. 2 juil. 2026',
      requestedTime: '10h00',
      duration: 2,
      message: 'Soutien BAC, fonctions et suites numériques.',
      paymentMethod: 'MTN',
      amount: 4000,
      status: 'en_attente',
      createdAt: '2026-06-24',
    },
    {
      id: 'r4',
      reference: 'REQ-2026-004',
      student: {
        id: 's4',
        name: 'Fokou Cédric',
        email: 'cedric@gmail.com',
        phone: '677112233',
        level: 'Terminale C',
        quartier: 'Centre Dschang',
      },
      subject: 'Mathématiques',
      requestedDate: 'Lun. 23 juin 2026',
      requestedTime: '16h00',
      duration: 2,
      message: 'Cours de révision avant l\'examen.',
      paymentMethod: 'MTN',
      amount: 4000,
      status: 'accepte',
      createdAt: '2026-06-20',
    },
    {
      id: 'r5',
      reference: 'REQ-2026-005',
      student: {
        id: 's5',
        name: 'Sophie Nguena',
        email: 'sophie@gmail.com',
        phone: '699112233',
        level: 'Première C',
        quartier: 'Bafoussam Road',
      },
      subject: 'Mathématiques',
      requestedDate: 'Ven. 20 juin 2026',
      requestedTime: '15h00',
      duration: 2,
      message: 'Préparation DS de mathématiques.',
      paymentMethod: 'Orange',
      amount: 4000,
      status: 'refuse',
      createdAt: '2026-06-18',
    },
  ]);

  // Demande sélectionnée pour le drawer détail
  const [selectedRequest, setSelectedRequest] =
    useState<CourseRequestDetail | null>(null);

  // Filtres actifs
  const [filters, setFilters] = useState<RequestFilters>({
    search: '', status: 'TOUS',
  });

  // Filtrage local
  const filteredRequests = requests.filter(r => {
    const matchSearch =
      r.student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.reference.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.subject.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus =
      filters.status === 'TOUS' || r.status === filters.status;
    return matchSearch && matchStatus;
  });

  // Accepter une demande (mock)
  const handleAccept = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'accepte' } : r
    ));
    setSelectedRequest(null);
    // → remplacer par courseRequestService.acceptRequest(id)
  };

  // Refuser une demande (mock)
  const handleRefuse = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'refuse' } : r
    ));
    setSelectedRequest(null);
    // → remplacer par courseRequestService.refuseRequest(id)
  };

  // Statistiques rapides
  const stats = {
    enAttente: requests.filter(r => r.status === 'en_attente').length,
    acceptees: requests.filter(r => r.status === 'accepte').length,
    refusees: requests.filter(r => r.status === 'refuse').length,
    totalMontant: requests
      .filter(r => r.status === 'accepte')
      .reduce((sum, r) => sum + r.amount, 0),
  };

  return {
    filteredRequests, filters, setFilters, stats,
    selectedRequest, setSelectedRequest,
    handleAccept, handleRefuse,
  };
};