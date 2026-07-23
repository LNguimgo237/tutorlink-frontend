// ============================================================
// FICHIER : src/mocks/handlers.ts
// RÔLE    : Définit ce que chaque endpoint "backend" doit répondre
//           en mode démo. C'est l'équivalent d'un vrai serveur,
//           mais qui tourne entièrement dans le navigateur.
//
// COMMENT AJOUTER UNE ROUTE MANQUANTE :
//   1. Copie un bloc existant du même type (GET liste / GET détail / POST)
//   2. Change le chemin et les données renvoyées
//   3. C'est tout — pas besoin de toucher aux hooks/services
// ============================================================

import { http, HttpResponse } from 'msw';
import {
  DEMO_ACCOUNTS, demoUsers,type DemoUser ,demoTutors, demoTutorReviews,
  demoAvailability, demoGroups, demoGroupReviews, demoBookings,
} from './demoData';



const API = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080/api';

// Petit utilitaire pour simuler un temps de réponse réseau réaliste
const delay = (ms = 400) => new Promise((r) => setTimeout(r, ms));

function authResponse(user: DemoUser, twoFactorRequired = false) {
  if (twoFactorRequired) {
    return { twoFactorRequired: true, message: 'Code de vérification envoyé.' };
  }
  return {
    token: 'DEMO_TOKEN_' + user.role, refreshToken: 'DEMO_REFRESH_' + user.role,
    expiresIn: 3600, ...user, twoFactorRequired: false, message: null,
  };
}

export const handlers = [

  // ══════════════════ AUTHENTIFICATION ══════════════════

  http.post(`${API}/auth/login`, async ({ request }) => {
    await delay();
    const body = (await request.json()) as { identifier: string; password: string };

    if (body.identifier === DEMO_ACCOUNTS.student.identifier && body.password === DEMO_ACCOUNTS.student.password)
      return HttpResponse.json(authResponse(demoUsers.student));

    if (body.identifier === DEMO_ACCOUNTS.tutor.identifier && body.password === DEMO_ACCOUNTS.tutor.password)
      return HttpResponse.json(authResponse(demoUsers.tutor));

    if (body.identifier === DEMO_ACCOUNTS.admin.identifier && body.password === DEMO_ACCOUNTS.admin.password)
      return HttpResponse.json(authResponse(demoUsers.admin, true)); // admin passe par la 2FA

    return HttpResponse.json({ code: 'INVALID_CREDENTIALS', message: 'Identifiants incorrects.' }, { status: 401 });
  }),

  // Connexion admin (même route que ci-dessus côté frontend, préfixe /admin)
  http.post(`${API}/admin/auth/login`, async ({ request }) => {
    await delay();
    const body = (await request.json()) as { identifier: string; password: string };
    if (body.identifier === DEMO_ACCOUNTS.admin.identifier && body.password === DEMO_ACCOUNTS.admin.password)
      return HttpResponse.json({ twoFactorRequired: true, message: 'Code envoyé par SMS.' });
    return HttpResponse.json({ code: 'INVALID_CREDENTIALS', message: 'Identifiants incorrects.' }, { status: 401 });
  }),

  http.post(`${API}/admin/auth/verify-otp`, async ({ request }) => {
    await delay();
    const body = (await request.json()) as { otp: string };
    if (body.otp === DEMO_ACCOUNTS.admin.otp)
      return HttpResponse.json(authResponse(demoUsers.admin));
    return HttpResponse.json({ code: 'OTP_INVALID', message: 'Code incorrect.' }, { status: 400 });
  }),

  http.post(`${API}/auth/register/student`, async () => {
    await delay(); return HttpResponse.json({ message: 'Inscription réussie.' }, { status: 201 });
  }),
  http.post(`${API}/auth/register/tutor`, async () => {
    await delay(); return HttpResponse.json({ message: 'Inscription réussie, en attente de validation.' }, { status: 201 });
  }),

  // ══════════════════ ACCUEIL (page publique) ══════════════════

  http.get(`${API}/home/tutors/featured`, () => HttpResponse.json(demoTutors.slice(0, 3))),
  http.get(`${API}/home/groups/featured`, () => HttpResponse.json(demoGroups)),
  http.get(`${API}/home/stats`, () => HttpResponse.json([
    { label: 'Répétiteurs', value: '500+' },
    { label: 'Élèves', value: '3 000+' },
    { label: 'Satisfaction', value: '98%' },
  ])),

  // ══════════════════ RECHERCHE / TUTEURS ══════════════════

  http.get(`${API}/tutors`, ({ request }) => {
    const url = new URL(request.url);
    const subject = url.searchParams.get('subject');
    const district = url.searchParams.get('district');
    let results = demoTutors;
    if (subject) results = results.filter(t => t.subject.toLowerCase().includes(subject.toLowerCase()));
    if (district) results = results.filter(t => t.district.toLowerCase().includes(district.toLowerCase()));
    return HttpResponse.json({ tutors: results, total: results.length, page: 1, hasMore: false });
  }),

  http.get(`${API}/tutors/subjects`, () => HttpResponse.json(['Mathématiques', 'Physique-Chimie', 'Français', 'Anglais', 'SVT'])),
  http.get(`${API}/tutors/quartiers`, () => HttpResponse.json(['Foto', 'Ngui', 'Centre', 'Vallée', 'Tsinkop'])),

  http.get(`${API}/tutors/:id`, ({ params }) => {
    const tutor = demoTutors.find(t => t.id === params.id) ?? demoTutors[0];
    return HttpResponse.json(tutor);
  }),
  http.get(`${API}/tutors/:id/reviews`, () => HttpResponse.json(demoTutorReviews)),
  http.get(`${API}/tutors/:id/availability`, () => HttpResponse.json(demoAvailability)),

  // ══════════════════ RÉSERVATION ══════════════════

  http.post(`${API}/reservations`, async ({ request }) => {
    await delay();
    const body = await request.json() as any;
    const id = 'bk' + (demoBookings.size + 1);
    const booking = { id, ...body, status: 'confirme' };
    demoBookings.set(id, booking);
    return HttpResponse.json(booking, { status: 201 });
  }),
  http.get(`${API}/bookings/:id`, ({ params }) => {
    const booking = demoBookings.get(params.id as string);
    return booking ? HttpResponse.json(booking) : HttpResponse.json({ message: 'Introuvable' }, { status: 404 });
  }),

  // ══════════════════ GROUPES (publics) ══════════════════

  http.get(`${API}/groups`, () => HttpResponse.json(demoGroups)),
  http.get(`${API}/groups/:id`, ({ params }) => {
    const group = demoGroups.find(g => g.id === params.id) ?? demoGroups[0];
    return HttpResponse.json(group);
  }),
  http.get(`${API}/groups/:id/reviews`, () => HttpResponse.json(demoGroupReviews)),
  http.post(`${API}/groups/:id/join`, async () => { await delay(); return HttpResponse.json({ message: 'Inscription au groupe réussie.' }); }),
  http.post(`${API}/groups/:id/waitlist`, async () => { await delay(); return HttpResponse.json({ message: "Ajouté à la liste d'attente." }); }),

  // ══════════════════ ESPACE ÉLÈVE ══════════════════

  http.get(`${API}/students/me/stats`, () => HttpResponse.json({
    totalHours: 42, activeTutors: 3, currentAverage: 14.5, upcomingCourses: 2,
  })),
  http.get(`${API}/students/me/upcoming-courses`, () => HttpResponse.json([
    { id: 'c1', tutorName: 'Jean Nguemo', subject: 'Mathématiques', date: '2026-07-22', time: '17h00' },
  ])),
  http.get(`${API}/students/me/groups`, () => HttpResponse.json(demoGroups.slice(0, 1))),
  http.get(`${API}/students/me/progress`, () => HttpResponse.json([
    { subject: 'Mathématiques', progress: 72 }, { subject: 'Physique-Chimie', progress: 58 },
  ])),
  http.get(`${API}/students/me/activity`, () => HttpResponse.json([
    { id: 'a1', text: 'Cours de Mathématiques terminé', date: '2026-07-18' },
  ])),

  http.get(`${API}/student/reservations`, () => HttpResponse.json([
    { id: 'r1', tutorName: 'Jean Nguemo', subject: 'Mathématiques', date: '2026-07-25', status: 'confirme' },
  ])),
  http.delete(`${API}/student/reservations/:id`, async () => { await delay(); return HttpResponse.json({ message: 'Annulé.' }); }),

  http.get(`${API}/student/payments`, () => HttpResponse.json([
    { id: 'p1', amount: 4000, method: 'MTN', status: 'reussi', date: '2026-07-10' },
  ])),
  http.get(`${API}/student/payments/stats`, () => HttpResponse.json({
    totalGroupsPayments: 8000, activeGroups: 1, nextPaymentDate: '2026-08-01', nextPaymentAmount: 8000,
  })),

  http.get(`${API}/student/reviews`, () => HttpResponse.json([])),
  http.get(`${API}/student/reviews/pending`, () => HttpResponse.json([
    { id: 'pr1', tutorId: '1', tutorName: 'Jean Nguemo', subject: 'Mathématiques' },
  ])),
  http.post(`${API}/student/reviews`, async () => { await delay(); return HttpResponse.json({ message: 'Avis publié.' }, { status: 201 }); }),

  http.get(`${API}/student/settings/profile`, () => HttpResponse.json({
    name: 'Aline Fotso', email: demoUsers.student.email, phone: demoUsers.student.phone,
    level: 'Terminale C', quartier: 'Foto', bio: '',
  })),
  http.get(`${API}/student/settings/notifications`, () => HttpResponse.json({
    emailReservation: true, emailMessage: true, smsReminder: true, smsPayment: true, pushNotifications: false,
  })),
  http.get(`${API}/student/settings/privacy`, () => HttpResponse.json({
    showProfileToTutors: true, showInReviews: true, allowDataExport: true,
  })),

  // ══════════════════ ESPACE RÉPÉTITEUR ══════════════════

  http.get(`${API}/tutor/dashboard/stats`, () => HttpResponse.json({
    coursesThisMonth: 18, activeStudents: 9, monthlyRevenue: 76000, pendingRequests: 3,
  })),
  http.get(`${API}/tutor/dashboard/requests`, () => HttpResponse.json([
    { id: 'req1', studentName: 'Marc D.', subject: 'Mathématiques', date: '2026-07-21' },
  ])),
  http.get(`${API}/tutor/dashboard/availability`, () => HttpResponse.json(demoAvailability)),
  http.get(`${API}/tutor/dashboard/confirmed-courses`, () => HttpResponse.json([
    { id: 'cc1', studentName: 'Marc D.', subject: 'Mathématiques', date: '2026-07-22' },
  ])),
  http.get(`${API}/tutor/dashboard/groups`, () => HttpResponse.json(demoGroups.slice(0, 1))),
  http.get(`${API}/tutor/dashboard/revenue`, () => HttpResponse.json(
    Array.from({ length: 6 }).map((_, i) => ({ month: `2026-0${i + 1}`, amount: 50000 + i * 5000 }))
  )),
  http.get(`${API}/tutor/dashboard/activity`, () => HttpResponse.json([
    { id: 'act1', text: 'Nouvelle demande de cours reçue', date: '2026-07-18' },
  ])),
  http.post(`${API}/tutor/dashboard/requests/:id/accept`, async () => { await delay(); return HttpResponse.json({ message: 'Accepté.' }); }),
  http.post(`${API}/tutor/dashboard/requests/:id/refuse`, async () => { await delay(); return HttpResponse.json({ message: 'Refusé.' }); }),

  http.get(`${API}/tutor/revenue/stats`, () => HttpResponse.json({
    totalBrut: 320000, totalCommission: 32000, totalNet: 288000,
    totalIndividuel: 200000, totalGroupe: 120000, evolution: 12,
  })),
  http.get(`${API}/tutor/revenue/chart`, () => HttpResponse.json(
    Array.from({ length: 6 }).map((_, i) => ({ month: `2026-0${i + 1}`, amount: 50000 + i * 4000 }))
  )),
  http.get(`${API}/tutor/revenue/transactions`, () => HttpResponse.json([
    { id: 't1', studentName: 'Marc D.', amount: 4000, date: '2026-07-15' },
  ])),

  http.get(`${API}/tutor/reviews`, () => HttpResponse.json(demoTutorReviews)),
  http.post(`${API}/tutor/reviews/:id/reply`, async () => { await delay(); return HttpResponse.json({ message: 'Réponse envoyée.' }); }),

  http.get(`${API}/tutor/availability`, () => HttpResponse.json(demoAvailability)),
  http.put(`${API}/tutor/availability`, async () => { await delay(); return HttpResponse.json({ message: 'Disponibilités enregistrées.' }); }),

  http.get(`${API}/tutor/course-requests`, () => HttpResponse.json([
    { id: 'req1', reference: 'REQ-001', student: { name: 'Marc D.' }, subject: 'Mathématiques', status: 'en_attente', estimatedAmount: 4000 },
  ])),
  http.post(`${API}/tutor/course-requests/:id/accept`, async () => { await delay(); return HttpResponse.json({ message: 'Accepté.' }); }),
  http.post(`${API}/tutor/course-requests/:id/refuse`, async () => { await delay(); return HttpResponse.json({ message: 'Refusé.' }); }),

  http.get(`${API}/tutor/subscription`, () => HttpResponse.json({
    status: 'actif', plan: 'Standard', nextPaymentDate: '2026-08-01', autoRenew: true,
  })),
  http.get(`${API}/tutor/subscription/payments`, () => HttpResponse.json([])),
  http.get(`${API}/tutor/subscription/notifications`, () => HttpResponse.json([])),
  http.post(`${API}/tutor/subscription/pay`, async () => { await delay(); return HttpResponse.json({ message: 'Paiement réussi.' }); }),

  http.get(`${API}/tutor/groups`, () => HttpResponse.json(demoGroups.slice(0, 1))),
  http.get(`${API}/tutor/groups/:id/students`, () => HttpResponse.json([
    { id: 's1', name: 'Marc D.', joinedAt: '2026-06-01' },
  ])),
  http.post(`${API}/tutor/groups`, async () => { await delay(); return HttpResponse.json({ message: 'Groupe créé.' }, { status: 201 }); }),

  http.get(`${API}/tutor/profile`, () => HttpResponse.json({
    firstName: 'Jean', lastName: 'Nguemo', email: demoUsers.tutor.email,
    phone: demoUsers.tutor.phone, bio: demoTutors[0].bio,
  })),
  http.get(`${API}/tutor/subjects`, () => HttpResponse.json([
    { id: 'sub1', name: 'Mathématiques', level: 'Terminale' },
  ])),

  // ══════════════════ MESSAGERIE (élève + tuteur) ══════════════════

  http.get(`${API}/messages/conversations`, () => HttpResponse.json([
    { id: 'conv1', name: 'Jean Nguemo', lastMessage: 'À demain 17h !', unread: 0 },
  ])),
  http.get(`${API}/messages/conversations/:id`, () => HttpResponse.json([
    { id: 'm1', senderId: '2', content: 'Bonjour, tout est confirmé pour demain.', date: '2026-07-18T10:00:00Z' },
  ])),
  http.post(`${API}/messages/conversations/:id`, async ({ request }) => {
    await delay();
    const body = await request.json() as { content: string };
    return HttpResponse.json({ id: 'm' + Date.now(), senderId: 'me', content: body.content, date: new Date().toISOString() }, { status: 201 });
  }),

  // ══════════════════ ADMIN ══════════════════

  http.get(`${API}/admin/dashboard/stats`, () => HttpResponse.json({
    totalUsers: 342, totalTutors: 87, totalReservations: 512, totalRevenue: 1250000,
    tutorSubscriptionRevenue: 450000, groupSubscriptionRevenue: 210000,
    pendingValidations: 6, activeSessionsToday: 14, tutorsExpiringThisWeek: 3, groupsExpiringThisWeek: 1,
  })),
  http.get(`${API}/admin/dashboard/monthly`, () => HttpResponse.json(
    Array.from({ length: 6 }).map((_, i) => ({ month: `2026-0${i + 1}`, revenus: 150000 + i * 20000, reservations: 60 + i * 5 }))
  )),
  http.get(`${API}/admin/dashboard/alerts`, () => HttpResponse.json([
    { id: 'al1', message: '3 profils tuteurs en attente de validation', severity: 'warning' },
  ])),
  http.get(`${API}/admin/dashboard/registrations`, () => HttpResponse.json([
    { id: 'reg1', name: 'Paul Kamga', role: 'STUDENT', date: '2026-07-18' },
  ])),

  http.get(`${API}/admin/users`, () => HttpResponse.json([
    { id: 'u1', name: 'Aline Fotso', email: demoUsers.student.email, role: 'STUDENT', status: 'actif', quartier: 'Foto' },
    { id: 'u2', name: 'Jean Nguemo', email: demoUsers.tutor.email, role: 'TUTOR', status: 'actif', quartier: 'Ngui' },
  ])),
  http.post(`${API}/admin/users/:id/suspend`, async () => { await delay(); return HttpResponse.json({ message: 'Suspendu.' }); }),
  http.post(`${API}/admin/users/:id/validate`, async () => { await delay(); return HttpResponse.json({ message: 'Validé.' }); }),
  http.delete(`${API}/admin/users/:id`, async () => { await delay(); return HttpResponse.json({ message: 'Supprimé.' }); }),

  http.get(`${API}/admin/tutors/pending`, () => HttpResponse.json([
    { id: 't1', name: 'Sandrine Talla', subject: 'Anglais', submittedAt: '2026-07-15', status: 'en_attente' },
  ])),
  http.get(`${API}/admin/tutors/top-rated`, () => HttpResponse.json(demoTutors.slice(0, 3))),
  http.post(`${API}/admin/tutors/:id/approve`, async () => { await delay(); return HttpResponse.json({ message: 'Approuvé.' }); }),
  http.post(`${API}/admin/tutors/:id/reject`, async () => { await delay(); return HttpResponse.json({ message: 'Rejeté.' }); }),

  http.get(`${API}/admin/groups`, () => HttpResponse.json(demoGroups.map(g => ({
    ...g, currentMembers: g.currentMembers, totalRevenue: g.monthlyPrice * g.currentMembers,
  })))),
  http.post(`${API}/admin/groups/:id/verify`, async () => { await delay(); return HttpResponse.json({ message: 'Vérifié.' }); }),
  http.post(`${API}/admin/groups/:id/suspend`, async () => { await delay(); return HttpResponse.json({ message: 'Suspendu.' }); }),
  http.delete(`${API}/admin/groups/:id`, async () => { await delay(); return HttpResponse.json({ message: 'Supprimé.' }); }),

  http.get(`${API}/admin/reservations`, () => HttpResponse.json([
    { id: 'ar1', studentName: 'Aline Fotso', tutorName: 'Jean Nguemo', date: '2026-07-25', courseStatus: 'confirmee' },
  ])),
  http.post(`${API}/admin/reservations/:id/cancel`, async () => { await delay(); return HttpResponse.json({ message: 'Annulé.' }); }),

  http.get(`${API}/admin/subscriptions/stats`, () => HttpResponse.json({
    totalTutors: 87, tutorsTrial: 12, tutorsActive: 70, tutorsSuspended: 5, tutorsRevenue: 450000,
    totalGroups: 24, groupsTrial: 4, groupsActive: 19, groupsSuspended: 1, groupsRevenue: 210000,
    totalMonthlyRevenue: 660000, totalAnnualRevenue: 7920000,
  })),
  http.get(`${API}/admin/subscriptions/tutors`, () => HttpResponse.json([])),
  http.get(`${API}/admin/subscriptions/groups`, () => HttpResponse.json([])),
  http.post(`${API}/admin/subscriptions/tutors/:id/activate`, async () => { await delay(); return HttpResponse.json({ message: 'Activé.' }); }),
  http.post(`${API}/admin/subscriptions/tutors/:id/suspend`, async () => { await delay(); return HttpResponse.json({ message: 'Suspendu.' }); }),

  http.get(`${API}/admin/reports/stats`, () => HttpResponse.json({
    totalReservations: 512, totalRevenus: 1250000, tutorSubscriptionRevenue: 450000,
    groupSubscriptionRevenue: 210000, totalEleves: 255, totalRepetiteurs: 87,
    tauxSatisfaction: 98, totalGroupsActifs: 19, totalTutorsActifs: 70,
  })),
  http.get(`${API}/admin/reports/chart`, () => HttpResponse.json(
    Array.from({ length: 6 }).map((_, i) => ({ month: `2026-0${i + 1}`, reservations: 60 + i * 5, revenus: 150000 + i * 20000, inscriptions: 20 + i * 2 }))
  )),
  http.get(`${API}/admin/reports/subjects`, () => HttpResponse.json([
    { subject: 'Mathématiques', reservations: 180, satisfaction: 97 },
  ])),
  http.get(`${API}/admin/reports/quartiers`, () => HttpResponse.json([
    { quartier: 'Foto', reservations: 120, tutors: 22 },
  ])),
];