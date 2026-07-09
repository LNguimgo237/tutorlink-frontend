// ============================================================
// FICHIER : src/types/pricing.types.ts
// RÔLE    : Types pour toutes les données de la PricingPage.
//           Distingue ce qui vient du backend (API) de ce
//           qui est statique (contenu éditorial fixe).
// ============================================================

// ══════════════════════════════════════════════════════════════
// DONNÉES DYNAMIQUES (viendront du backend)
// ══════════════════════════════════════════════════════════════

/**
 * Statistiques globales de la plateforme.
 * ⚠️ BACKEND : GET /api/public/stats
 * Recalculées en temps réel côté serveur.
 * Mises à jour toutes les 5 minutes via React Query.
 */
export interface PlatformStats {
  totalTutors: number;      // Nombre de répétiteurs actifs validés
  totalStudents: number;    // Nombre d'élèves inscrits
  satisfactionRate: number; // Taux de satisfaction en % (moyenne des avis)
  totalGroups: number;      // Nombre de groupes actifs
  totalCourses: number;     // Total de cours donnés sur la plateforme
  totalDistricts: number;   // Quartiers couverts à Dschang
}

/**
 * Un témoignage client affiché dans la section "Ce qu'ils en disent".
 * ⚠️ BACKEND : GET /api/public/testimonials/featured
 * L'admin choisit lesquels sont "featured" (mis en avant).
 * Filtrés par is_published = true et is_featured = true.
 */
export interface Testimonial {
  id: string;
  authorName: string;       // "Talla Mireille"
  authorRole: string;       // "Parent d'élève · Quartier Foto"
  authorInitials: string;   // "TM" — pour l'avatar
  rating: number;           // Note de 1 à 5 étoiles
  text: string;             // Le témoignage complet
  subject: string;          // Contexte ex: "Mathématiques · Terminale D"
  createdAt: string;        // Date ISO pour tri éventuel
  type: TestimonialType;    // Permet d'afficher un badge différent
}

/** Type d'auteur du témoignage */
export type TestimonialType = "STUDENT" | "PARENT" | "TUTOR";

/**
 * Une question/réponse de la FAQ.
 * ⚠️ BACKEND : GET /api/public/faq
 * L'admin peut ajouter/modifier les FAQs depuis le back-office.
 * Ordonnées par le champ "order" côté backend.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  order: number;       // Ordre d'affichage (géré par l'admin)
  category: FaqCategory;
}

export type FaqCategory =
  | "STUDENT"   // Questions pour élèves/parents
  | "TUTOR"     // Questions pour répétiteurs
  | "PRICING"   // Questions sur les tarifs
  | "GENERAL";  // Questions générales

/**
 * Un plan d'abonnement.
 * ⚠️ BACKEND : GET /api/public/subscription-plans
 * Permet à l'admin de changer les prix sans recompiler le front.
 * Les features sont un tableau de strings stocké en JSON en base.
 */
export interface SubscriptionPlan {
  id: string;
  name: string;           // "Répétiteur" | "Répétiteur + Groupes"
  slug: string;           // "tutor" | "tutor-groups"
  pricePerMonth: number;  // 3000 | 5000
  description: string;    // Courte description du plan
  features: string[];     // Liste des fonctionnalités incluses
  isPopular: boolean;     // Affiche le badge "Plus populaire"
  isFree: boolean;        // true pour le plan Élève (gratuit)
  trialDays: number;      // Jours d'essai gratuit (14 par défaut)
  maxStudents: number | null; // null = illimité
  maxGroups: number | null;   // null = illimité
  color: "gold" | "navy" | "gray"; // Couleur de la carte
}

// ══════════════════════════════════════════════════════════════
// DONNÉES STATIQUES (contenu éditorial — ne changent pas souvent)
// Ces données n'ont PAS besoin de venir du backend.
// Modifiables directement ici dans le code.
// ══════════════════════════════════════════════════════════════

/** Une étape dans la section "Comment ça marche" */
export interface HowItWorksStep {
  icon: string;
  title: string;
  description: string;
}

/** Un avantage dans la section "Pourquoi TutorLink" */
export interface Advantage {
  icon: string;
  title: string;
  description: string;
  gradientClass: string; // Classe Tailwind du gradient de la carte
}

/** Une zone géographique couverte */
export interface District {
  name: string;
  tutorCount: string; // Affiché tel quel ex: "187+"
}

// ══════════════════════════════════════════════════════════════
// ÉTAT GLOBAL DE LA PAGE
// ══════════════════════════════════════════════════════════════

/** État complet retourné par usePricingPage */
export interface PricingPageState {
  // Données dynamiques (depuis API)
  stats: PlatformStats | null;
  testimonials: Testimonial[];
  faqItems: FaqItem[];
  plans: SubscriptionPlan[];

  // États de chargement individuels
  isLoadingStats: boolean;
  isLoadingTestimonials: boolean;
  isLoadingFaq: boolean;
  isLoadingPlans: boolean;

  // Erreurs éventuelles
  statsError: boolean;
  testimonialsError: boolean;
}

// ══════════════════════════════════════════════════════════════
// CONSTANTES STATIQUES
// ══════════════════════════════════════════════════════════════

/** Matières enseignées — statique */
export const PLATFORM_SUBJECTS = [
  "Mathématiques", "Physique-Chimie", "SVT",
  "Français", "Anglais", "Informatique",
  "Histoire-Géo", "Philosophie", "Économie",
] as const;

/** Quartiers couverts — statique */
export const PLATFORM_DISTRICTS: District[] = [
  { name: "Centre Dschang", tutorCount: "187+" },
  { name: "Quartier Foto",  tutorCount: "124+" },
  { name: "Ngui Dschang",   tutorCount: "98+"  },
  { name: "Tsinkop",        tutorCount: "76+"  },
  { name: "Foréké",         tutorCount: "27+"  },
];