import { BookingTutor, TimeSlot, BookingFormData } from '../../types/booking.types';

interface Props {
  tutor: BookingTutor;
  selectedSlot: TimeSlot | null;
  duration: number;
  total: number;
  loading: boolean;
  onConfirm: () => void;
}

// Carte répétiteur fixe à gauche — résumé de la réservation
const TutorBookingCard = ({
  tutor, selectedSlot, duration, total, loading, onConfirm
}: Props) => (
  <div className="bg-[#1a2744] text-white rounded-xl p-5
                  flex flex-col gap-4 sticky top-6">

    {/* Avatar + infos répétiteur */}
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 rounded-full bg-yellow-400
                      flex items-center justify-center text-2xl flex-shrink-0">
        👨‍🏫
      </div>
      <div>
        <h3 className="font-bold text-base">{tutor.name}</h3>
        <p className="text-blue-200 text-xs">
          {tutor.subject} · {tutor.level}
        </p>
        <p className="text-yellow-400 text-xs font-bold mt-0.5">
          ★ {tutor.rating} ({tutor.reviewCount} avis)
        </p>
      </div>
    </div>

    {/* Séparateur */}
    <div className="border-t border-blue-700" />

    {/* Récapitulatif réservation */}
    <div className="flex flex-col gap-2 text-sm">
      <div className="flex justify-between">
        <span className="text-blue-300">Lieu</span>
        <span>📍 {tutor.quartier}</span>
      </div>
      <div className="flex justify-between">
        <span className="text-blue-300">Note</span>
        <span className="text-yellow-400 font-bold">{tutor.rating}</span>
      </div>
      {selectedSlot && (
        <div className="flex justify-between">
          <span className="text-blue-300">Créneau choisi</span>
          <span>{selectedSlot.day} · {selectedSlot.startTime}-{selectedSlot.endTime}</span>
        </div>
      )}
      <div className="flex justify-between">
        <span className="text-blue-300">Durée</span>
        <span>{duration}h</span>
      </div>
    </div>

    {/* Séparateur */}
    <div className="border-t border-blue-700" />

    {/* Total */}
    <div className="flex justify-between items-center">
      <span className="text-blue-300 text-sm">Total</span>
      <span className="text-xl font-bold text-yellow-400">
        {total.toLocaleString()} FCFA
      </span>
    </div>

    {/* Bouton confirmer */}
    <button
      onClick={onConfirm}
      disabled={loading}
      className="w-full bg-yellow-400 hover:bg-yellow-500
                 text-gray-900 font-bold py-3 rounded-xl
                 cursor-pointer transition-colors disabled:opacity-50
                 disabled:cursor-not-allowed text-sm"
    >
      {loading ? 'Traitement...' : '✅ Confirmer la réservation'}
    </button>

    {/* Note paiement */}
    <p className="text-xs text-blue-300 text-center">
      Le paiement est débité uniquement après confirmation du répétiteur.
    </p>
  </div>
);

export default TutorBookingCard;