import { useParams, Link } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import TutorBookingCard from '../../components/booking/TutorBookingCard';
import SlotCalendar from '../../components/booking/SlotCalendar';
import BookingForm from '../../components/booking/BookingForm';

const BookingPage = () => {
  // Récupère l'id du répétiteur depuis l'URL (/reserver/:tutorId)
  const { tutorId } = useParams<{ tutorId: string }>();

  const {
    tutor, slots, formData, setFormData,
    error, loading, total,
    handleSelectSlot, handleSelectPayment, handleSubmit,
  } = useBooking(tutorId);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Barre du haut */}
      <div className="bg-[#1a2744] text-white px-6 py-3
                      flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-yellow-400 font-bold text-lg">🎓 TutorLink</span>
        </div>
        <Link
          to={`/repetiteurs/${tutor.id}`}
          className="text-blue-300 hover:text-white text-sm transition-colors"
        >
          ← Profil répétiteur
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="px-6 py-3 bg-white border-b border-gray-100
                      text-xs text-gray-400">
        <Link to="/" className="hover:text-gray-600">Accueil</Link>
        <span className="mx-2">›</span>
        <Link to="/repetiteurs" className="hover:text-gray-600">Répétiteurs</Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600 font-medium">Réservation</span>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-6">

          {/* Colonne gauche — carte répétiteur fixe */}
          <div className="col-span-1">
            <TutorBookingCard
              tutor={tutor}
              selectedSlot={formData.selectedSlot}
              duration={formData.duration}
              total={total}
              loading={loading}
              onConfirm={handleSubmit}
            />
          </div>

          {/* Colonne droite — calendrier + formulaire */}
          <div className="col-span-2 flex flex-col gap-5">

            {/* Calendrier des créneaux */}
            <SlotCalendar
              slots={slots}
              selectedSlot={formData.selectedSlot}
              onSelect={handleSelectSlot}
            />

            {/* Formulaire détails + paiement */}
            <BookingForm
              formData={formData}
              onChange={setFormData}
              error={error}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;