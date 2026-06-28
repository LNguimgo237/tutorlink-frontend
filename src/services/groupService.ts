// ============================================================
// FICHIER : src/services/groupService.ts
// RÔLE    : Couche d'accès à l'API backend pour la gestion
//           des groupes côté répétiteur.
//           Données MOCK actives pendant le dev frontend.
//
// ⚠️ BACKEND — Endpoints :
//   GET    /api/tutor/groups              → TutorGroupDetail[]
//   GET    /api/tutor/groups/:id/students → GroupStudent[]
//   POST   /api/tutor/groups              → TutorGroupDetail
//   PUT    /api/tutor/groups/:id          → TutorGroupDetail
//   DELETE /api/tutor/groups/:id          → { message }
// ============================================================

import type {
  TutorGroupDetail,
  GroupStudent,
  GroupFormData,
} from "../types/tutorGroup.tytes";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";

// Headers avec le JWT du répétiteur connecté
const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") ?? ""}`,
});

// Simule une latence réseau pendant le dev
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ══════════════════════════════════════════════════════════════
// DONNÉES MOCK
// ══════════════════════════════════════════════════════════════

// Variable locale qui simule la base de données des groupes.
// Les mutations (créer/modifier/supprimer) modifient ce tableau.
let MOCK_GROUPS: TutorGroupDetail[] = [
  {
    id: "g1",
    name: "Maths BAC C/D · Groupe Élite",
    subject: "Mathématiques",
    level: "Terminale C/D",
    description:
      "Groupe d'excellence pour les élèves de Terminale C et D préparant " +
      "le BAC. Effectif limité à 8 élèves pour un suivi individualisé. " +
      "Séances : cours théoriques, exercices types BAC et examens blancs mensuels.",
    location: "Centre Dschang",
    schedule: "Mar & Sam · 16h-18h",
    scheduleDays: ["MAR", "SAM"],
    scheduleTime: "16h-18h",
    enrolledCount: 6,
    maxCapacity: 8,
    pricePerMonth: 7000,
    revenuePerMonth: 42000,
    isVerified: true,
    rating: 4.9,
    reviewCount: 24,
    status: "ACTIVE",
    createdAt: "2026-01-15T08:00:00.000Z",
    themes: [
      "Intégrales",
      "Probabilités",
      "Suites numériques",
      "Géométrie dans l'espace",
      "Arithmétique",
      "Examens blancs",
    ],
  },
  {
    id: "g2",
    name: "Soutien Maths · 3ème",
    subject: "Mathématiques",
    level: "3ème (BEPC)",
    description:
      "Préparation intensive au BEPC en mathématiques. " +
      "Focus sur les chapitres clés : algèbre, géométrie et statistiques.",
    location: "Centre Dschang",
    schedule: "Mer · 14h-16h",
    scheduleDays: ["MER"],
    scheduleTime: "14h-16h",
    enrolledCount: 5,
    maxCapacity: 10,
    pricePerMonth: 5000,
    revenuePerMonth: 25000,
    isVerified: false,
    rating: 4.6,
    reviewCount: 8,
    status: "ACTIVE",
    createdAt: "2026-03-10T08:00:00.000Z",
    themes: ["Algèbre", "Géométrie", "Statistiques", "Préparation BEPC"],
  },
];

// Élèves par groupe
const MOCK_STUDENTS: Record<string, GroupStudent[]> = {
  g1: [
    {
      id: "s1",
      name: "Junior Nkoumba",
      level: "Terminale D",
      district: "Centre Dschang",
      enrolledSince: "Janv. 2026",
      paymentStatus: "UP_TO_DATE",
      lastPaymentDate: "01/06/2026",
      phoneNumber: "+237 6 78 12 34 56",
    },
    {
      id: "s2",
      name: "Fokou Cédric",
      level: "Terminale C",
      district: "Tsinkop",
      enrolledSince: "Janv. 2026",
      paymentStatus: "UP_TO_DATE",
      lastPaymentDate: "01/06/2026",
      phoneNumber: "+237 6 99 88 77 66",
    },
    {
      id: "s3",
      name: "Talla Mireille",
      level: "Terminale D",
      district: "Foto",
      enrolledSince: "Mars 2026",
      paymentStatus: "LATE",
      lastPaymentDate: "01/04/2026",
      phoneNumber: "+237 6 55 44 33 22",
    },
    {
      id: "s4",
      name: "Ngono Christelle",
      level: "Terminale C",
      district: "Ngui",
      enrolledSince: "Févr. 2026",
      paymentStatus: "UP_TO_DATE",
      lastPaymentDate: "01/06/2026",
      phoneNumber: "+237 6 11 22 33 44",
    },
    {
      id: "s5",
      name: "Mbouh Karine",
      level: "Terminale D",
      district: "Centre Dschang",
      enrolledSince: "Avr. 2026",
      paymentStatus: "PENDING",
      lastPaymentDate: "01/05/2026",
      phoneNumber: "+237 6 66 55 44 33",
    },
    {
      id: "s6",
      name: "Tagne Paul",
      level: "Terminale C",
      district: "Foto",
      enrolledSince: "Janv. 2026",
      paymentStatus: "UP_TO_DATE",
      lastPaymentDate: "01/06/2026",
      phoneNumber: "+237 6 77 88 99 00",
    },
  ],
  g2: [
    {
      id: "s7",
      name: "Kamdem Lucie",
      level: "3ème",
      district: "Centre Dschang",
      enrolledSince: "Mars 2026",
      paymentStatus: "UP_TO_DATE",
      lastPaymentDate: "01/06/2026",
      phoneNumber: "+237 6 12 34 56 78",
    },
    {
      id: "s8",
      name: "Nkouaga Boris",
      level: "3ème",
      district: "Ngui",
      enrolledSince: "Mars 2026",
      paymentStatus: "UP_TO_DATE",
      lastPaymentDate: "01/06/2026",
      phoneNumber: "+237 6 98 76 54 32",
    },
    {
      id: "s9",
      name: "Feudjio Sandra",
      level: "3ème",
      district: "Tsinkop",
      enrolledSince: "Avr. 2026",
      paymentStatus: "LATE",
      lastPaymentDate: "01/05/2026",
      phoneNumber: "+237 6 45 67 89 01",
    },
    {
      id: "s10",
      name: "Djoumessi Marc",
      level: "3ème",
      district: "Foréké",
      enrolledSince: "Mai 2026",
      paymentStatus: "PENDING",
      lastPaymentDate: "—",
      phoneNumber: "+237 6 23 45 67 89",
    },
    {
      id: "s11",
      name: "Nguefack Brenda",
      level: "3ème",
      district: "Centre Dschang",
      enrolledSince: "Mars 2026",
      paymentStatus: "UP_TO_DATE",
      lastPaymentDate: "01/06/2026",
      phoneNumber: "+237 6 34 56 78 90",
    },
  ],
};

// ══════════════════════════════════════════════════════════════
// FONCTIONS EXPORTÉES
// ══════════════════════════════════════════════════════════════

/**
 * Récupère tous les groupes du répétiteur connecté.
 * ⚠️ BACKEND : GET /api/tutor/groups
 */
export async function getTutorGroups(): Promise<TutorGroupDetail[]> {
  // ── MOCK ──────────────────────────────────────────────────
  await delay(400);
  return [...MOCK_GROUPS];

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/tutor/groups`, {
  //   headers: headers(),
  // });
  // if (!res.ok) throw new Error("Erreur chargement groupes");
  // return res.json();
}

/**
 * Récupère les élèves inscrits dans un groupe.
 * ⚠️ BACKEND : GET /api/tutor/groups/:groupId/students
 */
export async function getGroupStudents(
  groupId: string
): Promise<GroupStudent[]> {
  // ── MOCK ──────────────────────────────────────────────────
  await delay(350);
  return MOCK_STUDENTS[groupId] ?? [];

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/tutor/groups/${groupId}/students`, {
  //   headers: headers(),
  // });
  // if (!res.ok) throw new Error("Erreur chargement élèves");
  // return res.json();
}

/**
 * Crée un nouveau groupe de répétition.
 * ⚠️ BACKEND : POST /api/tutor/groups
 *   Le backend crée le groupe avec statut "ACTIVE"
 *   et l'associe au répétiteur connecté (via JWT).
 */
export async function createGroup(
  data: GroupFormData
): Promise<TutorGroupDetail> {
  // ── MOCK ──────────────────────────────────────────────────
  await delay(700);

  // Construit l'horaire lisible depuis les jours sélectionnés
  const scheduleLabel =
    data.scheduleDays.join(" & ") + " · " + data.scheduleTime;

  const newGroup: TutorGroupDetail = {
    id: `g${Date.now()}`,
    name: data.name,
    subject: data.subject,
    level: data.level,
    description: data.description,
    location: data.location,
    schedule: scheduleLabel,
    scheduleDays: data.scheduleDays,
    scheduleTime: data.scheduleTime,
    enrolledCount: 0,
    maxCapacity: data.maxCapacity,
    pricePerMonth: data.pricePerMonth,
    revenuePerMonth: 0,
    isVerified: false,
    rating: 0,
    reviewCount: 0,
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    themes: data.themes
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };

  // Ajoute au tableau mock
  MOCK_GROUPS = [...MOCK_GROUPS, newGroup];
  return newGroup;

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/tutor/groups`, {
  //   method: "POST",
  //   headers: headers(),
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Erreur création groupe");
  // return res.json();
}

/**
 * Modifie un groupe existant.
 * ⚠️ BACKEND : PUT /api/tutor/groups/:groupId
 */
export async function updateGroup(
  groupId: string,
  data: GroupFormData
): Promise<TutorGroupDetail> {
  // ── MOCK ──────────────────────────────────────────────────
  await delay(600);

  const scheduleLabel =
    data.scheduleDays.join(" & ") + " · " + data.scheduleTime;

  MOCK_GROUPS = MOCK_GROUPS.map((g) =>
    g.id === groupId
      ? {
          ...g,
          name: data.name,
          subject: data.subject,
          level: data.level,
          description: data.description,
          location: data.location,
          schedule: scheduleLabel,
          scheduleDays: data.scheduleDays,
          scheduleTime: data.scheduleTime,
          maxCapacity: data.maxCapacity,
          pricePerMonth: data.pricePerMonth,
          revenuePerMonth: data.pricePerMonth * g.enrolledCount,
          themes: data.themes
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
        }
      : g
  );

  const updated = MOCK_GROUPS.find((g) => g.id === groupId)!;
  return updated;

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/tutor/groups/${groupId}`, {
  //   method: "PUT",
  //   headers: headers(),
  //   body: JSON.stringify(data),
  // });
  // if (!res.ok) throw new Error("Erreur modification groupe");
  // return res.json();
}

/**
 * Supprime un groupe de répétition.
 * ⚠️ BACKEND : DELETE /api/tutor/groups/:groupId
 *   Le backend vérifie qu'aucun élève n'est actif avant suppression.
 */
export async function deleteGroup(groupId: string): Promise<void> {
  // ── MOCK ──────────────────────────────────────────────────
  await delay(500);
  MOCK_GROUPS = MOCK_GROUPS.filter((g) => g.id !== groupId);

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/tutor/groups/${groupId}`, {
  //   method: "DELETE",
  //   headers: headers(),
  // });
  // if (!res.ok) throw new Error("Erreur suppression groupe");
}