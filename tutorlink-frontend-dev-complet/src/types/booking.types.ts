// Créneau horaire disponible
export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  available: boolean;
}

// Infos répétiteur sur la page réservation
export interface BookingTutor {
  id: string;
  name: string;
  subject: string;
  level: string;
  quartier: string;
  rating: number;
  reviewCount: number;
  hourlyPrice: number;
  phone: string;          // ← AJOUTÉ : numéro pour paiement direct
}

// Données formulaire réservation
// ❌ SUPPRIMÉ : paymentMethod — paiement direct hors plateforme
export interface BookingFormData {
  selectedSlot: TimeSlot | null;
  subject: string;
  duration: number;
  studentName: string;
  message: string;
}