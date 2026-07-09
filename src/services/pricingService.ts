// ============================================================
// FICHIER : src/services/pricingService.ts
// RÔLE    : Appels API pour les données dynamiques de la page
//           des tarifs. Données MOCK actives pendant le dev.
//           Chaque appel réel est commenté avec l'endpoint exact
//           et ce que le backend doit retourner.
//
// ⚠️ BACKEND — Endpoints publics (sans JWT) :
//   GET /api/public/stats
//   GET /api/public/testimonials/featured
//   GET /api/public/faq
//   GET /api/public/subscription-plans
// ============================================================

import type {
  PlatformStats,
  Testimonial,
  FaqItem,
  SubscriptionPlan,
} from "../types/pricing.types";

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000/api";
const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));

// ══════════════════════════════════════════════════════════════
// DONNÉES MOCK — à remplacer par les appels API réels
// ══════════════════════════════════════════════════════════════

// ── DONNÉES MOCK ── remplacer par GET /api/public/stats
const MOCK_STATS: PlatformStats = {
  totalTutors: 512,
  totalStudents: 3247,
  satisfactionRate: 98,
  totalGroups: 42,
  totalCourses: 8940,
  totalDistricts: 5,
};

// ── DONNÉES MOCK ── remplacer par GET /api/public/testimonials/featured
// Ces témoignages seront gérés par l'admin depuis le back-office
// Il pourra en ajouter, modifier, masquer sans toucher au code
const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    authorName: "Talla Mireille",
    authorRole: "Parent d'élève · Quartier Foto",
    authorInitials: "TM",
    rating: 5,
    text: "Mon fils a gagné 4 points de moyenne en mathématiques en deux mois grâce à M. Kamga. La plateforme est simple à utiliser et tous les répétiteurs sont sérieux et vérifiés.",
    subject: "Mathématiques · Terminale D",
    createdAt: "2026-05-15T10:00:00Z",
    type: "PARENT",
  },
  {
    id: "t2",
    authorName: "Junior Nkoumba",
    authorRole: "Élève · Terminale D · Centre Dschang",
    authorInitials: "JN",
    rating: 5,
    text: "J'ai eu 15/20 en physique-chimie au DS grâce aux cours de Mme Tchana. La réservation prend 2 minutes et le répétiteur répond toujours aux messages.",
    subject: "Physique-Chimie · Lycée",
    createdAt: "2026-06-01T08:00:00Z",
    type: "STUDENT",
  },
  {
    id: "t3",
    authorName: "M. Kamga Eric",
    authorRole: "Répétiteur Mathématiques · 312 cours donnés",
    authorInitials: "KE",
    rating: 5,
    text: "Depuis mon abonnement TutorLink, j'ai plus de 12 élèves actifs. Je gère tout depuis mon téléphone : disponibilités, réservations, messagerie. Et je garde 100% de mes revenus.",
    subject: "Abonnement Répétiteur · 3 000 FCFA/mois",
    createdAt: "2026-06-10T09:00:00Z",
    type: "TUTOR",
  },
  {
    id: "t4",
    authorName: "Ngono Christelle",
    authorRole: "Élève · 3ème · Ngui Dschang",
    authorInitials: "NC",
    rating: 5,
    text: "J'ai eu mon BEPC avec mention grâce au soutien en SVT et en Français. Les groupes de répétition sont top : on apprend aussi des questions des autres élèves.",
    subject: "SVT + Français · 3ème BEPC",
    createdAt: "2026-06-20T14:00:00Z",
    type: "STUDENT",
  },
];

// ── DONNÉES MOCK ── remplacer par GET /api/public/faq
// L'admin peut modifier ces questions depuis le back-office
const MOCK_FAQ: FaqItem[] = [
  {
    id: "f1",
    question: "TutorLink est-il gratuit pour les élèves ?",
    answer: "Oui, entièrement gratuit. Les élèves et parents créent un compte, cherchent un répétiteur et réservent des cours sans payer aucun frais à TutorLink. Le paiement des cours se règle directement avec le répétiteur.",
    order: 1,
    category: "STUDENT",
  },
  {
    id: "f2",
    question: "Comment fonctionne l'abonnement répétiteur ?",
    answer: "L'abonnement Répétiteur coûte 3 000 FCFA/mois et donne accès à votre profil public, la gestion des disponibilités, la messagerie et votre tableau de bord. L'abonnement Répétiteur + Groupes (5 000 FCFA/mois) ajoute la création de groupes de répétition. Paiement via MTN MoMo ou Orange Money.",
    order: 2,
    category: "PRICING",
  },
  {
    id: "f3",
    question: "Comment les répétiteurs sont-ils vérifiés ?",
    answer: "Chaque répétiteur soumet sa CNI, son diplôme et son adresse à Dschang. L'équipe TutorLink vérifie manuellement ces documents avant d'activer le profil et d'afficher le badge 'Vérifié'.",
    order: 3,
    category: "TUTOR",
  },
  {
    id: "f4",
    question: "TutorLink prend-il une commission sur les cours ?",
    answer: "Non. TutorLink ne prélève aucune commission sur les cours donnés. Le modèle économique repose uniquement sur les abonnements répétiteurs. Les répétiteurs gardent 100% de leurs revenus de cours.",
    order: 4,
    category: "PRICING",
  },
  {
    id: "f5",
    question: "Comment annuler mon abonnement répétiteur ?",
    answer: "Vous pouvez annuler à tout moment depuis votre espace Paramètres → Abonnement. L'annulation prend effet à la fin de la période en cours. Aucuns frais d'annulation.",
    order: 5,
    category: "TUTOR",
  },
  {
    id: "f6",
    question: "Quels quartiers de Dschang sont couverts ?",
    answer: "Centre Dschang, Quartier Foto, Ngui Dschang, Tsinkop et Foréké. D'autres quartiers seront ajoutés selon la demande. Tous les cours sont en présentiel à domicile ou dans un lieu convenu.",
    order: 6,
    category: "GENERAL",
  },
];

// ── DONNÉES MOCK ── remplacer par GET /api/public/subscription-plans
// L'admin peut changer les prix et fonctionnalités depuis le back-office
const MOCK_PLANS: SubscriptionPlan[] = [
  {
    id: "plan_free",
    name: "Élève / Parent",
    slug: "student",
    pricePerMonth: 0,
    description: "Accès complet pour trouver et réserver un répétiteur.",
    features: [
      "Recherche de répétiteurs vérifiés",
      "Consultation des profils et avis",
      "Réservation de cours en ligne",
      "Messagerie avec le répétiteur",
      "Tableau de bord personnel",
      "Suivi des progrès scolaires",
      "Accès aux groupes de répétition",
    ],
    isPopular: false,
    isFree: true,
    trialDays: 0,
    maxStudents: null,
    maxGroups: null,
    color: "gray",
  },
  {
    id: "plan_tutor",
    name: "Répétiteur",
    slug: "tutor",
    pricePerMonth: 3000,
    description: "Pour les répétiteurs individuels qui veulent développer leur activité.",
    features: [
      "Profil public vérifié et visible",
      "Gestion des disponibilités",
      "Réception des demandes de cours",
      "Messagerie illimitée",
      "1 groupe de répétition",
      "Tableau de bord et statistiques",
      "0% de commission sur vos revenus",
      "Badge Répétiteur Vérifié",
    ],
    isPopular: true,
    isFree: false,
    trialDays: 14,
    maxStudents: 20,
    maxGroups: 1,
    color: "gold",
  },
  {
    id: "plan_groups",
    name: "Répétiteur + Groupes",
    slug: "tutor-groups",
    pricePerMonth: 5000,
    description: "Pour les répétiteurs qui souhaitent aussi gérer des groupes.",
    features: [
      "Tout du plan Répétiteur",
      "Groupes de répétition illimités",
      "Jusqu'à 15 élèves par groupe",
      "Gestion des inscriptions groupes",
      "Planning des séances de groupe",
      "Badge Répétiteur Pro",
      "Position prioritaire dans les résultats",
      "Statistiques revenus groupes",
    ],
    isPopular: false,
    isFree: false,
    trialDays: 14,
    maxStudents: null,
    maxGroups: null,
    color: "navy",
  },
];

// ══════════════════════════════════════════════════════════════
// FONCTIONS EXPORTÉES
// ══════════════════════════════════════════════════════════════

/**
 * Statistiques globales publiques de la plateforme.
 * ⚠️ BACKEND REQUIS — GET /api/public/stats
 * Route publique — pas de JWT requis.
 * Le backend calcule en temps réel depuis la base de données.
 * Cache Redis de 5 minutes recommandé côté serveur.
 */
export async function getPlatformStats(): Promise<PlatformStats> {
  // ── MOCK ─────────────────────────────────────────────────
  await delay(300);
  return { ...MOCK_STATS };

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/public/stats`);
  // if (!res.ok) throw new Error("Erreur chargement stats");
  // return res.json();
}

/**
 * Témoignages mis en avant par l'admin.
 * ⚠️ BACKEND REQUIS — GET /api/public/testimonials/featured
 * Route publique — pas de JWT requis.
 * L'admin marque certains avis comme "featured" depuis le back-office.
 * Filtre : is_published = true AND is_featured = true
 * Limite : 4 par défaut, modifiable via ?limit=N
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  // ── MOCK ─────────────────────────────────────────────────
  await delay(400);
  return [...MOCK_TESTIMONIALS];

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/public/testimonials/featured?limit=4`);
  // if (!res.ok) throw new Error("Erreur chargement témoignages");
  // return res.json();
}

/**
 * Questions fréquentes gérées par l'admin.
 * ⚠️ BACKEND REQUIS — GET /api/public/faq
 * Route publique — pas de JWT requis.
 * L'admin ajoute/modifie/supprime les FAQs depuis le back-office.
 * Retournées triées par le champ "order" croissant.
 */
export async function getPublicFaq(): Promise<FaqItem[]> {
  // ── MOCK ─────────────────────────────────────────────────
  await delay(250);
  return [...MOCK_FAQ].sort((a, b) => a.order - b.order);

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/public/faq`);
  // if (!res.ok) throw new Error("Erreur chargement FAQ");
  // return res.json();
}

/**
 * Plans d'abonnement disponibles.
 * ⚠️ BACKEND REQUIS — GET /api/public/subscription-plans
 * Route publique — pas de JWT requis.
 * Permet à l'admin de modifier les prix et fonctionnalités
 * sans recompiler le frontend.
 */
export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  // ── MOCK ─────────────────────────────────────────────────
  await delay(200);
  return [...MOCK_PLANS];

  // ── PRODUCTION ────────────────────────────────────────────
  // const res = await fetch(`${BASE_URL}/public/subscription-plans`);
  // if (!res.ok) throw new Error("Erreur chargement plans");
  // return res.json();
}