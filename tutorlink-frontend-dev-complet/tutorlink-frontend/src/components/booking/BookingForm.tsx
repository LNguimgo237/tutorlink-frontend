import { BookingFormData } from '../../types/booking.types';

interface Props {
  formData: BookingFormData;
  onChange: (data: BookingFormData) => void;
  error: string;
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

// Formulaire détails de la demande + moyen de paiement
const BookingForm = ({ formData, onChange, error }: Props) => (
  <div className="flex flex-col gap-4">

    {/* Section détails de la demande */}
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

        {/* Durée souhaitée */}
        <div>
          <label className="text-xs text-gray-500 font-semibold
                            uppercase mb-1 block">
            Durée souhaitée
          </label>
          <select
            value={formData.duration}
            onChange={e => onChange({ ...formData, duration: Number(e.target.value) })}
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
          placeholder="Nom de l'élève (si différent de vous)"
          className="w-full border border-gray-200 rounded-lg
                     px-3 py-2 text-sm focus:outline-none
                     focus:ring-2 focus:ring-blue-300"
        />
      </div>

      {/* Message optionnel */}
      <div className="mt-4">
        <label className="text-xs text-gray-500 font-semibold
                          uppercase mb-1 block">
          Message pour le répétiteur
          <span className="text-gray-300 font-normal ml-1">(optionnel)</span>
        </label>
        <textarea
          value={formData.message}
          onChange={e => onChange({ ...formData, message: e.target.value })}
          placeholder="Ex : nous aimerions revoir le chapitre sur les intégrales avant le BAC blanc."
          rows={3}
          className="w-full border border-gray-200 rounded-lg
                     px-3 py-2 text-sm focus:outline-none
                     focus:ring-2 focus:ring-blue-300 resize-none"
        />
      </div>
    </div>

    {/* Section moyen de paiement */}
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h3 className="font-bold text-gray-700 mb-4">
        💰 Moyen de paiement
      </h3>

      <div className="grid grid-cols-2 gap-3">

        {/* MTN Mobile Money */}
        <button
          onClick={() => onChange({ ...formData, paymentMethod: 'MTN' })}
          className={`flex items-center justify-center gap-2
                      border-2 rounded-xl py-4 font-bold text-sm
                      cursor-pointer transition-all
                      ${formData.paymentMethod === 'MTN'
                        ? 'border-[#1a2744] bg-[#1a2744] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-blue-300'
                      }`}
        >
          <span className="text-lg">📱</span>
          MTN Mobile Money
        </button>

        {/* Orange Money */}
        <button
          onClick={() => onChange({ ...formData, paymentMethod: 'Orange' })}
          className={`flex items-center justify-center gap-2
                      border-2 rounded-xl py-4 font-bold text-sm
                      cursor-pointer transition-all
                      ${formData.paymentMethod === 'Orange'
                        ? 'border-orange-500 bg-orange-500 text-white'
                        : 'border-gray-200 text-gray-700 hover:border-orange-300'
                      }`}
        >
          <span className="text-lg text-orange-400">🟠</span>
          Orange Money
        </button>
      </div>

      {/* Note paiement différé */}
      <p className="text-xs text-gray-400 mt-3 text-center">
        Le paiement est débité uniquement après confirmation du répétiteur.
      </p>
    </div>

    {/* Message d'erreur global */}
    {error && (
      <div className="bg-red-50 border border-red-200 rounded-lg
                      px-4 py-3 text-sm text-red-700">
        ⚠️ {error}
      </div>
    )}
  </div>
);

export default BookingForm;