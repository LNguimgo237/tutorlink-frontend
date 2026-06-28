// Statut d'une demande
export type RequestStatus = 'en_attente' | 'accepte' | 'refuse';

// Détail complet d'une demande de cours
export interface CourseRequestDetail {
  id: string;
  reference: string;          // ex: "REQ-2026-001"
  student: {
    id: string;
    name: string;
    email: string;
    phone: string;
    level: string;            // ex: "Terminale D"
    quartier: string;
  };
  subject: string;
  requestedDate: string;      // ex: "Sam. 28 juin 2026"
  requestedTime: string;      // ex: "14h00"
  duration: number;           // en heures
  message: string;            // message de l'élève
  paymentMethod: 'MTN' | 'Orange';
  amount: number;             // montant en FCFA
  status: RequestStatus;
  createdAt: string;          // date de la demande
}

// Filtres de la page
export interface RequestFilters {
  search: string;
  status: RequestStatus | 'TOUS';
}