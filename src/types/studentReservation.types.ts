// Statut du cours uniquement — plus de statut paiement
export type StudentCourseStatus =
  | 'confirme'
  | 'en_attente'
  | 'termine'
  | 'annule';

// Réservation vue par l'élève
// ❌ SUPPRIMÉ : amount, operator, paymentStatus, transactionId
export interface StudentReservation {
  id: string;
  reference: string;
  tutorName: string;
  tutorPhone: string;       // ← pour contacter / payer directement
  tutorSubject: string;
  date: string;
  time: string;
  duration: number;
  status: StudentCourseStatus;
  estimatedAmount: number;  // montant indicatif seulement
  message?: string;
  quartier: string;
}

// Filtres de la page
export interface StudentReservationFilters {
  search: string;
  status: StudentCourseStatus | 'TOUS';
}