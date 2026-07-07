import { useParams, Link } from 'react-router-dom';
import { useBooking } from '../../hooks/useBooking';
import TutorBookingCard from '../../components/booking/TutorBookingCard';
import SlotCalendar from '../../components/booking/SlotCalendar';
import BookingForm from '../../components/booking/BookingForm';

const BookingPage = () => {
  const { tutorId } = useParams<{ tutorId: string }>();
  const {
    tutor, slots, formData, setFormData,
    error, loading, submitted, estimatedAmount,
    handleSelectSlot, handleSubmit,
  } = useBooking(tutorId);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Barre du haut */}
      <div className="bg-[#1a2744] text-white px-6 py-3
                      flex justify-between items-center">
        <span className="text-yellow-400 font-bold text-lg">
          🎓 TutorLink
        </span>
        <Link to={`/repetiteurs/${tutor.id}`}
          className="text-blue-300 hover:text-white text-sm transition-colors">
          ← Profil répétiteur
        </Link>
      </div>

      {/* Breadcrumb */}
      <div className="px-6 py-3 bg-white border-b border-gray-100
                      text-xs text-gray-400">
        <Link to="/" className="hover:text-gray-600">Accueil</Link>
        <span className="mx-2">›</span>
        <Link to="/repetiteurs" className="hover:text-gray-600">
          Répétiteurs
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600 font-medium">Demande de cours</span>
      </div>

      {/* Contenu principal */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="grid grid-cols-3 gap-6">

          {/* Gauche — carte répétiteur */}
          <div className="col-span-1">
            <TutorBookingCard
              tutor={tutor}
              selectedSlot={formData.selectedSlot}
              duration={formData.duration}
              estimatedAmount={estimatedAmount}
              loading={loading}
              submitted={submitted}
              onConfirm={handleSubmit}
            />
          </div>

          {/* Droite — calendrier + formulaire */}
          <div className="col-span-2 flex flex-col gap-5">
            <SlotCalendar
              slots={slots}
              selectedSlot={formData.selectedSlot}
              onSelect={handleSelectSlot}
            />
            {/* Passe le téléphone et tarif au formulaire */}
            <BookingForm
              formData={formData}
              onChange={setFormData}
              error={error}
              tutorPhone={tutor.phone}
              hourlyPrice={tutor.hourlyPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;