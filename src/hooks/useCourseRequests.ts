import { useState } from 'react';
import {
  CourseRequestDetail, RequestFilters
} from '../types/courseRequest.types';

export const useCourseRequests = () => {

  // ── DEMANDES MOCK ── montants ESTIMATIFS uniquement
  const [requests, setRequests] = useState<CourseRequestDetail[]>([
    {
      id: 'r1',
      reference: 'REQ-2026-001',
      student: {
        id: 's1',
        name: 'Mystell Sonna',
        email: 'christelle@gmail.com',
        phone: '677001122',
        level: 'Terminale C',
        quartier: 'Centre Dschang',
      },
      subject: 'Mathématiques',
      requestedDate: 'Sam. 28 juin 2026',
      requestedTime: '14h00',
      duration: 2,
      message: 'Préparation examen blanc BAC, intégrales et probabilités.',
      status: 'en_attente',
      createdAt: '2026-06-25',
      estimatedAmount: 4000, // 2000 FCFA/h × 2h — indicatif
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
      status: 'en_attente',
      createdAt: '2026-06-25',
      estimatedAmount: 3000, // 2000 × 1.5h — indicatif
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
      status: 'en_attente',
      createdAt: '2026-06-24',
      estimatedAmount: 4000,
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
      message: 'Cours de révision avant examen.',
      status: 'accepte',
      createdAt: '2026-06-20',
      estimatedAmount: 4000,
    },
  ]);

  const [selectedRequest, setSelectedRequest] =
    useState<CourseRequestDetail | null>(null);
  const [filters, setFilters] = useState<RequestFilters>({
    search: '', status: 'TOUS',
  });

  const filteredRequests = requests.filter(r => {
    const matchSearch =
      r.student.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      r.reference.toLowerCase().includes(filters.search.toLowerCase());
    const matchStatus =
      filters.status === 'TOUS' || r.status === filters.status;
    return matchSearch && matchStatus;
  });

  const handleAccept = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'accepte' } : r
    ));
    setSelectedRequest(null);
  };

  const handleRefuse = (id: string) => {
    setRequests(prev => prev.map(r =>
      r.id === id ? { ...r, status: 'refuse' } : r
    ));
    setSelectedRequest(null);
  };

  // ── STATS ── sans montant total (paiement hors plateforme)
  const stats = {
    enAttente: requests.filter(r => r.status === 'en_attente').length,
    acceptees: requests.filter(r => r.status === 'accepte').length,
    refusees: requests.filter(r => r.status === 'refuse').length,
    // Montant estimatif uniquement pour information
    estimatedTotal: requests
      .filter(r => r.status === 'accepte')
      .reduce((sum, r) => sum + r.estimatedAmount, 0),
  };

  return {
    filteredRequests, filters, setFilters, stats,
    selectedRequest, setSelectedRequest,
    handleAccept, handleRefuse,
  };
};