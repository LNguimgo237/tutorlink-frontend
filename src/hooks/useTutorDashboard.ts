import { useState, useEffect } from 'react';
import {
  TutorStats, CourseRequest, AvailabilitySlot,
  ConfirmedCourse, TutorGroup, RevenueDataPoint, TutorActivity
} from '../types/tutor.types';

export const useTutorDashboard = () => {
  const [loading, setLoading] = useState(true);

  // ── STATS MOCK ──
  const [stats] = useState<TutorStats>({
    coursesThisMonth: 18,
    activeStudents: 12,
    monthlyRevenue: 94500,
    pendingRequests: 3,
  });

  // ── DEMANDES EN ATTENTE MOCK ──
  const [requests, setRequests] = useState<CourseRequest[]>([
    {
      id: 'r1',
      studentName: 'Ngono Christelle',
      subject: 'Mathématiques',
      requestedDate: 'Sam. 28 juin · 14h',
      duration: 2,
      message: 'Préparation examen blanc',
      status: 'en_attente',
    },
    {
      id: 'r2',
      studentName: 'Donfack Manuella',
      subject: 'Mathématiques',
      requestedDate: 'Lun. 30 juin · 16h',
      duration: 1.5,
      message: 'Révision des dérivées',
      status: 'en_attente',
    },
    {
      id: 'r3',
      studentName: 'Talla Junior',
      subject: 'Mathématiques',
      requestedDate: 'Mer. 2 juil. · 10h',
      duration: 2,
      message: 'Soutien BAC, fonctions',
      status: 'en_attente',
    },
  ]);

  // ── DISPONIBILITÉS MOCK ──
  const [availability] = useState<AvailabilitySlot[]>([
    { day: 'LUN', startTime: '16h', endTime: '18h', available: true },
    { day: 'LUN', startTime: '18h', endTime: '20h', available: false },
    { day: 'MAR', startTime: '16h', endTime: '18h', available: false },
    { day: 'MAR', startTime: '18h', endTime: '20h', available: true },
    { day: 'MER', startTime: '14h', endTime: '16h', available: true },
    { day: 'MER', startTime: '16h', endTime: '18h', available: true },
    { day: 'JEU', startTime: '17h', endTime: '19h', available: true },
    { day: 'VEN', startTime: '15h', endTime: '17h', available: false },
    { day: 'SAM', startTime: '09h', endTime: '11h', available: true },
    { day: 'SAM', startTime: '14h', endTime: '16h', available: true },
  ]);

  // ── COURS CONFIRMÉS MOCK ──
  const [confirmedCourses] = useState<ConfirmedCourse[]>([
    { id: 'cc1', date: 'Lun. 23 juin', time: '16h – 18h', studentName: 'Junior Nkoumba', subject: 'Mathématiques', status: 'confirme' },
    { id: 'cc2', date: 'Mer. 25 juin', time: '14h – 16h', studentName: 'Fokou Cédric', subject: 'Mathématiques', status: 'confirme' },
    { id: 'cc3', date: 'Sam. 28 juin', time: '09h – 11h', studentName: 'Ngono Christelle', subject: 'Mathématiques', status: 'en_attente' },
  ]);

  // ── GROUPES MOCK ──
  const [myGroups] = useState<TutorGroup[]>([
    {
      id: 'g1',
      name: 'Maths BAC C/D · Groupe Élite',
      subject: 'Mathématiques',
      currentMembers: 6,
      maxMembers: 8,
      schedule: 'Mar & Sam · 16h-18h',
      monthlyPrice: 7000,
      monthlyRevenue: 42000,
    },
    {
      id: 'g2',
      name: 'Soutien Maths · 3ème',
      subject: 'Mathématiques',
      currentMembers: 5,
      maxMembers: 10,
      schedule: 'Mer · 14h-16h',
      monthlyPrice: 500,
      monthlyRevenue: 2500,
    },
  ]);

  // ── REVENUS 6 MOIS MOCK ──
  const [revenueData] = useState<RevenueDataPoint[]>([
    { month: 'Janv', amount: 5200 },
    { month: 'Févr', amount: 6800 },
    { month: 'Mars', amount: 7600 },
    { month: 'Avr',  amount: 8700 },
    { month: 'Mai',  amount: 9100 },
    { month: 'Juin', amount: 9450 },
  ]);

  // ── ACTIVITÉ RÉCENTE MOCK ──
  // Dans le tableau recentActivity — modifier uniquement cette partie :
const [activity] = useState<TutorActivity[]>([
  {
    id: 'a1',
    icon: '✅',
    message: 'Cours avec Junior Nkoumba marqué terminé',
    time: 'il y a 2h',
    isNew: true,
  },
  {
    id: 'a2',
    icon: '⭐',
    message: 'Nouvel avis 5 étoiles de Talla Mireille',
    time: 'hier',
    isNew: true,
  },
  {
    id: 'a3',
    icon: '👥',
    message: 'Cotisation groupe Maths BAC C/D reçue — Juillet 2026',
    time: 'hier',
    isNew: false,
  },
  {
    id: 'a4',
    icon: '📩',
    message: 'Nouvelle demande de Mbouh Karine',
    time: 'il y a 3j',
    isNew: false,
  },
]);

  // Accepter une demande (mock)
  const handleAcceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(r =>
      r.id === requestId ? { ...r, status: 'accepte' } : r
    ));
    // → remplacer par tutorDashboardService.acceptRequest(requestId)
  };

  // Refuser une demande (mock)
  const handleRefuseRequest = (requestId: string) => {
    setRequests(prev => prev.map(r =>
      r.id === requestId ? { ...r, status: 'refuse' } : r
    ));
    // → remplacer par tutorDashboardService.refuseRequest(requestId)
  };

  // Revenus groupes ce mois
  const groupRevenue = myGroups.reduce((sum, g) => sum + g.monthlyRevenue, 0);
  const totalGroupStudents = myGroups.reduce((sum, g) => sum + g.currentMembers, 0);

  // Simulation chargement
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return {
    loading, stats, requests, availability,
    confirmedCourses, myGroups, revenueData, activity,
    groupRevenue, totalGroupStudents,
    handleAcceptRequest, handleRefuseRequest,
  };
};