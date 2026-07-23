// Créneau horaire disponible
export interface TimeSlot {
  id: string;
  day: string;          // 'LUN' | 'MAR' | 'MER' | 'JEU' | 'VEN' | 'SAM' | 'DIM'
  startTime: string;    // ex: '16h'
  endTime: string;      // ex: '18h'
  available: boolean;   // disponible ou déjà réservé
}

// Informations du répétiteur sur la page réservation
export interface BookingTutor {
  id: string;
  name: string;
  subject: string;
  level: string;
  quartier: string;
  rating: number;
  reviewCount: number;
  hourlyPrice: number;  // prix par heure en FCFA
  avatar?: string;
}

// Données du formulaire de réservation
export interface BookingFormData {
  selectedSlot: TimeSlot | null;
  subject: string;
  duration: number;         // en heures (1h, 1.5h, 2h, 3h)
  studentName: string;      // élève concerné si différent
  message: string;          // message optionnel au répétiteur
  paymentMethod: 'MTN' | 'Orange' | null;
}

// Moyen de paiement
export type PaymentMethod = 'MTN' | 'Orange';