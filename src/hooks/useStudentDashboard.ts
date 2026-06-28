import { useState, useEffect } from 'react';
import {
  StudentStats, UpcomingCourse,
  StudentGroup, SubjectProgress, RecentActivity
} from '../types/student.types';

export const useStudentDashboard = () => {
  const [loading, setLoading] = useState(true);

  // ── DONNÉES MOCK ── à remplacer par studentService quand backend prêt

  const [stats] = useState<StudentStats>({
    totalHours: 24,
    activeTutors: 3,
    currentAverage: 15.2,
    upcomingCourses: 2,
  });

  const [upcomingCourses] = useState<UpcomingCourse[]>([
    {
      id: '1',
      date: 'Lun. 23 juin',
      time: '16h – 18h',
      subject: 'Mathématiques',
      tutorName: 'M. Nguimgo',
      status: 'confirme',
    },
    {
      id: '2',
      date: 'Mer. 25 juin',
      time: '17h – 19h',
      subject: 'Physique-Chimie',
      tutorName: 'Mme Tchana Myster',
      status: 'en_attente',
    },
    {
      id: '3',
      date: 'Ven. 27 juin',
      time: '15h – 17h',
      subject: 'Anglais',
      tutorName: 'Mlle Kenfack Laressa',
      status: 'confirme',
    },
  ]);

  const [myGroups] = useState<StudentGroup[]>([
    {
      id: '1',
      name: 'Maths BAC C/D · Groupe Élite',
      subject: 'Mathématiques',
      tutorName: 'M. Nguene Brice',
      nextSession: 'Sam. 28 juin · 16h',
      monthlyPrice: 7000,
      paymentStatus: 'a_jour',
      status: 'actif',
    },
    {
      id: '2',
      name: 'English Club · Conversation',
      subject: 'Anglais',
      tutorName: 'Mlle Fotso Mystelle',
      nextSession: 'Sam. 28 juin · 09h',
      monthlyPrice: 5000,
      paymentStatus: 'a_jour',
      status: 'actif',
    },
  ]);

  const [progress] = useState<SubjectProgress[]>([
    { subject: 'Mathématiques', score: 16, color: 'bg-[#1a2744]' },
    { subject: 'Physique-Chimie', score: 14, color: 'bg-[#1a2744]' },
    { subject: 'Anglais', score: 17, color: 'bg-yellow-400' },
    { subject: 'Français', score: 13, color: 'bg-yellow-400' },
  ]);

  const [recentActivity] = useState<RecentActivity[]>([
    {
      id: '1',
      icon: '✅',
      message: 'Cours de maths complété avec M. Kamga',
      time: 'il y a 2h',
      isNew: true,
    },
    {
      id: '2',
      icon: '⭐',
      message: 'Vous avez noté Mme Tchana 5 étoiles',
      time: 'hier',
      isNew: true,
    },
    {
      id: '3',
      icon: '💰',
      message: 'Paiement reçu de 4 000 FCFA via MTN MoMo',
      time: 'hier',
      isNew: false,
    },
    {
      id: '4',
      icon: '💬',
      message: 'Nouveau message de Mlle Fotso',
      time: 'il y a 3j',
      isNew: false,
    },
  ]);

  // Simule un chargement
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, []);

  return {
    loading, stats,
    upcomingCourses, myGroups,
    progress, recentActivity,
  };
};