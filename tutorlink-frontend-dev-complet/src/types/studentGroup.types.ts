// Statut de l'inscription dans un groupe
export type GroupMemberStatus = 'actif' | 'en_attente' | 'suspendu';

// Statut du paiement mensuel
export type GroupPaymentStatus = 'a_jour' | 'en_retard' | 'en_attente';

// Séance d'un groupe
export interface GroupSession {
  day: string;          // ex: 'MAR', 'SAM'
  startTime: string;    // ex: '16h'
  endTime: string;      // ex: '18h'
}

// Groupe auquel l'élève est inscrit
export interface StudentGroupItem {
  id: string;
  name: string;             // ex: "Maths BAC C/D · Groupe Élite"
  subject: string;
  level: string;
  quartier: string;
  tutorName: string;        // répétiteur admin du groupe
  tutorId: string;
  currentMembers: number;   // membres actuels
  maxMembers: number;       // capacité max
  monthlyPrice: number;     // prix mensuel en FCFA
  sessions: GroupSession[]; // séances hebdomadaires
  nextSession: string;      // prochaine séance ex: "Sam. 28 juin · 16h"
  memberStatus: GroupMemberStatus;
  paymentStatus: GroupPaymentStatus;
  lastPaymentDate: string;  // date du dernier paiement
  joinedAt: string;         // date d'inscription
  rating: number;           // note du groupe
  themes: string[];         // thèmes abordés
}

// Groupe disponible à rejoindre (suggestion)
export interface SuggestedGroup {
  id: string;
  name: string;
  subject: string;
  tutorName: string;
  monthlyPrice: number;
  currentMembers: number;
  maxMembers: number;
  rating: number;
  nextSession: string;
}