import { CourseRequestDetail } from '../../../types/courseRequest.types';
import RequestStatusBadge from './RequestStatusBadge';

interface Props {
  request: CourseRequestDetail;
  onAccept: (id: string) => void;
  onRefuse: (id: string) => void;
  onDetail: (r: CourseRequestDetail) => void;
}

// Carte d'une demande de cours
const RequestCard = ({ request: r, onAccept, onRefuse, onDetail }: Props) => (
  <div className={`bg-white rounded-xl shadow-sm border-l-4 p-5
                   transition-shadow hover:shadow-md
                   ${r.status === 'en_attente'
                     ? 'border-l-orange-400'
                     : r.status === 'accepte'
                       ? 'border-l-green-500'
                       : 'border-l-red-400'
                   }`}>

    {/* En-tête carte */}
    <div className="flex justify-between items-start mb-3">
      <div>
        {/* Référence */}
        <p className="text-xs text-gray-400 font-mono mb-1">{r.reference}</p>
        {/* Nom élève */}
        <h3 className="font-bold text-gray-800">{r.student.name}</h3>
        <p className="text-xs text-gray-500">
          {r.student.level} · 📍 {r.student.quartier}
        </p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <RequestStatusBadge status={r.status} />
        <p className="text-xs text-gray-400">{r.createdAt}</p>
      </div>
    </div>

    {/* Détails du cours */}
    <div className="grid grid-cols-2 gap-3 mb-3">
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs text-gray-400 mb-1">📅 Date souhaitée</p>
        <p className="text-sm font-medium text-gray-700">
          {r.requestedDate}
        </p>
        <p className="text-xs text-gray-500">{r.requestedTime}</p>
      </div>
      <div className="bg-gray-50 rounded-lg p-3">
        <p className="text-xs text-gray-400 mb-1">📚 Matière · Durée</p>
        <p className="text-sm font-medium text-gray-700">{r.subject}</p>
        <p className="text-xs text-gray-500">{r.duration}h de cours</p>
      </div>
    </div>

    {/* Message de l'élève */}
    <div className="bg-blue-50 rounded-lg p-3 mb-3">
      <p className="text-xs text-blue-500 font-semibold mb-1">
        💬 Message de l'élève
      </p>
      <p className="text-sm text-gray-600 italic">"{r.message}"</p>
    </div>

    {/* Paiement + montant */}
    <div className="flex justify-between items-center mb-4">
      <span className="text-xs text-gray-500">
        💳 {r.paymentMethod === 'MTN' ? '📱 MTN Mobile Money' : '🟠 Orange Money'}
      </span>
      <span className="font-bold text-blue-900 text-base">
        {r.amount.toLocaleString()} FCFA
      </span>
    </div>

    {/* Boutons action */}
    <div className="flex gap-3">
      {/* Détail */}
      <button
        onClick={() => onDetail(r)}
        className="border border-gray-200 text-gray-600
                   text-sm px-4 py-2 rounded-lg hover:bg-gray-50
                   cursor-pointer transition-colors"
      >
        👁 Détail
      </button>

      {/* Accepter — uniquement si en attente */}
      {r.status === 'en_attente' && (
        <>
          <button
            onClick={() => onAccept(r.id)}
            className="flex-1 bg-[#1a2744] hover:bg-blue-900
                       text-white font-bold py-2 rounded-lg
                       cursor-pointer transition-colors"
          >
            ✅ Accepter
          </button>
          <button
            onClick={() => onRefuse(r.id)}
            className="flex-1 bg-red-500 hover:bg-red-600
                       text-white font-bold py-2 rounded-lg
                       cursor-pointer transition-colors"
          >
            ❌ Refuser
          </button>
        </>
      )}
    </div>
  </div>
);

export default RequestCard;