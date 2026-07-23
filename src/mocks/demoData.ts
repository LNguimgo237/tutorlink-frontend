// ============================================================
// FICHIER : src/mocks/demoData.ts
// RÔLE    : Base de données factice unique, partagée par tous
//           les handlers MSW. Centraliser ici évite d'avoir des
//           IDs incohérents entre deux endpoints différents
//           (ex: un tuteur trouvé en recherche doit avoir le
//           même ID que celui qu'on récupère sur sa page profil).
// ============================================================

// ── COMPTES DE DÉMONSTRATION (à donner au prof / jury) ──
export const DEMO_ACCOUNTS = {
  student: { identifier: 'eleve@demo.tutorlink.cm', password: 'demo1234' },
  tutor: { identifier: 'tuteur@demo.tutorlink.cm', password: 'demo1234' },
  admin: { identifier: 'admin@demo.tutorlink.cm', password: 'demo1234', otp: '123456' },
};

export type DemoUserRole = 'ELEVE' | 'REPETITEUR' | 'ADMIN';

export interface DemoUser {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  district: string;
  role: DemoUserRole;
  isVerified: boolean;
}

export const demoUsers: Record<'student' | 'tutor' | 'admin', DemoUser> = {
  student: {
    userId: 1, firstName: 'Aline', lastName: 'Fotso',
    email: DEMO_ACCOUNTS.student.identifier, phone: '699000001',
    district: 'Foto', role: 'ELEVE', isVerified: true,
  },
  tutor: {
    userId: 2, firstName: 'Jean', lastName: 'Nguemo',
    email: DEMO_ACCOUNTS.tutor.identifier, phone: '699000002',
    district: 'Ngui', role: 'REPETITEUR', isVerified: true,
  },
  admin: {
    userId: 3, firstName: 'Admin', lastName: 'TutorLink',
    email: DEMO_ACCOUNTS.admin.identifier, phone: '699000003',
    district: 'Centre', role: 'ADMIN', isVerified: true,
  },
};

export const demoTutors = [
  {
    id: '1', firstName: 'Jean', lastName: 'Nguemo',
    subject: 'Mathématiques', level: 'Terminale', district: 'Ngui',
    bio: "Professeur de mathématiques depuis 6 ans, spécialiste de la préparation au BAC C/D.",
    pricePerHour: 2000, rating: 4.8, reviewCount: 34, isVerified: true,
    formation: 'Master en Mathématiques — Université de Dschang',
  },
  {
    id: '2', firstName: 'Aline', lastName: 'Kamdem',
    subject: 'Physique-Chimie', level: 'Première', district: 'Foto',
    bio: "Répétitrice passionnée, approche pratique avec beaucoup d'exercices corrigés.",
    pricePerHour: 1800, rating: 4.6, reviewCount: 21, isVerified: true,
    formation: 'Licence en Physique — Université de Dschang',
  },
  {
    id: '3', firstName: 'Paul', lastName: 'Tchoumi',
    subject: 'Français', level: 'BEPC', district: 'Centre',
    bio: "10 ans d'expérience dans l'enseignement secondaire, spécialiste dissertation et résumé.",
    pricePerHour: 1500, rating: 4.9, reviewCount: 48, isVerified: true,
    formation: 'CAPES Lettres Modernes',
  },
  {
    id: '4', firstName: 'Sandrine', lastName: 'Talla',
    subject: 'Anglais', level: 'Terminale', district: 'Foto',
    bio: "Bilingue, prépare aussi aux certifications internationales (TOEFL, IELTS).",
    pricePerHour: 2200, rating: 4.7, reviewCount: 17, isVerified: true,
    formation: 'Master en Langues Étrangères Appliquées',
  },
];

export const demoTutorReviews = [
  { id: 'r1', author: 'Marie D.', rating: 5, comment: 'Excellent pédagogue, mon fils a beaucoup progressé.', date: '2026-06-12' },
  { id: 'r2', author: 'Paul K.', rating: 4, comment: 'Très ponctuel et sérieux.', date: '2026-05-28' },
  { id: 'r3', author: 'Chantal N.', rating: 5, comment: 'Je recommande vivement, résultats visibles en 1 mois.', date: '2026-05-10' },
];

export const demoAvailability = [
  { day: 'LUN', label: 'Lundi', startTime: '16h', endTime: '18h', available: true },
  { day: 'MER', label: 'Mercredi', startTime: '14h', endTime: '16h', available: true },
  { day: 'SAM', label: 'Samedi', startTime: '09h', endTime: '11h', available: true },
];

export const demoGroups = [
  {
    id: 'g1', name: 'Groupe Maths Terminale C', subject: 'Mathématiques', level: 'Terminale',
    district: 'Foto', tutorName: 'Jean Nguemo', monthlyPrice: 8000,
    currentMembers: 6, maxMembers: 10, status: 'actif',
    sessions: [{ day: 'MAR', time: '17h-19h' }, { day: 'VEN', time: '17h-19h' }],
  },
  {
    id: 'g2', name: 'Groupe Physique Première', subject: 'Physique-Chimie', level: 'Première',
    district: 'Ngui', tutorName: 'Aline Kamdem', monthlyPrice: 7000,
    currentMembers: 4, maxMembers: 8, status: 'actif',
    sessions: [{ day: 'JEU', time: '16h-18h' }],
  },
];

export const demoGroupReviews = [
  { id: 'gr1', author: 'Famille Kenmoe', role: 'parent', rating: 5, comment: 'Ambiance studieuse, très bon suivi.', date: '2026-06-01' },
];

export const demoBookings = new Map<string, any>([
  ['bk1', {
    id: 'bk1', tutorId: '1', studentId: '1',
    subject: 'Mathématiques', duration: 2, date: '2026-07-25',
    amount: 4000, status: 'confirme',
  }],
]);