import { BookingFormData } from '../../types/booking.types';

interface Props {
  formData: BookingFormData;
  onChange: (data: BookingFormData) => void;
  error: string;
  tutorPhone: string;       // numéro du répétiteur
  hourlyPrice: number;      // tarif pour info
}

const subjects = [
  'Mathématiques', 'Physique-Chimie', 'Anglais',
  'Français', 'SVT', 'Informatique', 'Histoire-Géo',
];

const durations = [
  { label: '1h', value: 1 },
  { label: '1h30', value: 1.5 },
  { label: '2h', value: 2 },
  { label: '3h', value: 3 },
];

// Formulaire demande de cours
// ❌ SUPPRIMÉ : section moyen de paiement
// ✅ AJOUTÉ : info paiement direct
const BookingForm = ({
  formData, onChange, error, tutorPhone, hourlyPrice
}: Props) => (
  <div className="flex flex-col gap-4">

    {/* Détails de la demande */}
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-gray-700 mb-4">
        📝 Détails de la demande
      </h3>

      <div className="grid grid-cols-2 gap-4">

        {/* Matière */}
        <div>
          <label className="text-xs text-gray-500 font-semibold
                            uppercase mb-1 block">
            Matière
          </label>
          <select
            value={formData.subject}
            onChange={e => onChange({ ...formData, subject: e.target.value })}
            className="w-full border border-gray-200 rounded-lg
                       px-3 py-2 text-sm focus:outline-none
                       focus:ring-2 focus:ring-blue-300"
          >
            {subjects.map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Durée */}
        <div>
          <label className="text-xs text-gray-500 font-semibold
                            uppercase mb-1 block">
            Durée souhaitée
          </label>
          <select
            value={formData.duration}
            onChange={e => onChange({
              ...formData, duration: Number(e.target.value)
            })}
            className="w-full border border-gray-200 rounded-lg
                       px-3 py-2 text-sm focus:outline-none
                       focus:ring-2 focus:ring-blue-300"
          >
            {durations.map(d => (
              <option key={d.value} value={d.value}>{d.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Élève concerné */}
      <div className="mt-4">
        <label className="text-xs text-gray-500 font-semibold
                          uppercase mb-1 block">
          Élève concerné
          <span className="text-gray-300 font-normal ml-1">
            (si différent de vous)
          </span>
        </label>
        <input
          type="text"
          value={formData.studentName}
          onChange={e => onChange({ ...formData, studentName: e.target.value })}
          placeholder="Nom de l'élève"
          className="w-full border border-gray-200 rounded-lg
                     px-3 py-2 text-sm focus:outline-none
                     focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Message */}
      <div className="mt-4">
        <label className="text-xs text-gray-500 font-semibold
                          uppercase mb-1 block">
          Message pour le répétiteur
          <span className="text-gray-300 font-normal ml-1">(optionnel)</span>
        </label>
        <textarea
          value={formData.message}
          onChange={e => onChange({ ...formData, message: e.target.value })}
          placeholder="Ex : je voudrais revoir les intégrales avant le BAC blanc."
          rows={3}
          className="w-full border border-gray-200 rounded-lg
                     px-3 py-2 text-sm focus:outline-none
                     focus:ring-2 focus:ring-blue-300 resize-none"
        />
      </div>
    </div>

    {/* ✅ INFO PAIEMENT DIRECT — remplace la section paiement */}
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-gray-700 mb-3">
        💰 Paiement du cours
      </h3>

      {/* Tarif estimatif */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Tarif estimatif ({formData.duration}h)
          </span>
          <span className="font-bold text-[#1a2744] text-lg">
            {(hourlyPrice * formData.duration).toLocaleString()} FCFA
          </span>
        </div>
        <p className="text-xs text-gray-400 mt-1">
          Basé sur {hourlyPrice.toLocaleString()} FCFA/heure
        </p>
      </div>

      {/* Explication modèle paiement direct */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm font-bold text-blue-800 mb-2">
          📱 Comment payer votre répétiteur ?
        </p>
        <div className="flex flex-col gap-2 text-xs text-blue-700">
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0">1️⃣</span>
            <span>Envoyez votre demande de cours en cliquant sur le bouton.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0">2️⃣</span>
            <span>Le répétiteur confirme votre demande sous 24h.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="flex-shrink-0">3️⃣</span>
            <span>
              Payez directement via MTN MoMo ou Orange Money au :
              <br />
              <strong className="text-blue-900 text-sm">📱 {tutorPhone}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>

    {/* Message d'erreur */}
    {error && (
      <div className="bg-red-50 border border-red-200 rounded-lg
                      px-4 py-3 text-sm text-red-700">
        ⚠️ {error}
      </div>
    )}
  </div>
);

export default BookingForm;