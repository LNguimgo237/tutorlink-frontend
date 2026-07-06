// Statut du cours
export type CourseStatus = 'confirmee' | 'en_cours' | 'terminee' | 'annulee';

// Opérateur Mobile Money
export type MobileMoneyOperator = 'MTN' | 'Orange' | 'en_attente';

// Statut du paiement
export type PaymentStatus = 'paye_mtn' | 'paye_orange' | 'en_attente' | 'rembourse';

// Structure complète d'une réservation
export interface AdminReservation {
  id: string;
  reference: string;          // ex: RES-2026-001
  eleve: {
    name: string;
    email: string;
    phone: string;
  };
  repetiteur: {
    name: string;
    email: string;
    subject: string;
  };
  date: string;               // date du cours
  timeSlot: string;           // ex: 14h00 - 16h00
  duration: number;           // en heures
  amount: number;             // montant en FCFA
  courseStatus: CourseStatus;
  //paymentStatus: PaymentStatus;
  operator: MobileMoneyOperator;
  transactionId?: string;     // ID transaction Mobile Money
  quartier: string;
  createdAt: string;
  notes?: string;             // notes admin
}

// Filtres du tableau
export interface ReservationFilters {
  search: string;
  courseStatus: CourseStatus | 'TOUS';
  //paymentStatus: PaymentStatus | 'TOUS';
  dateFrom: string;
  dateTo: string;
  subject: string;
}