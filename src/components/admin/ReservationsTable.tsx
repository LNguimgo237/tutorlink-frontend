import { AdminReservation, CourseStatus } from '../../types/adminReservation.types';
import PaymentStatusBadge from './PaymentStatusBadge';

interface Props {
  reservations: AdminReservation[];
  onSelect: (r: AdminReservation) => void;
  onComplete: (id: string) => void;
}

// Badge statut cours
const courseConfig: Record<CourseStatus, { label: string; className: string }> = {
  confirmee: { label: 'Confirmée', className: 'bg-blue-100 text-blue-700' },
  en_cours:  { label: 'En cours',  className: 'bg-green-100 text-green-700' },
  terminee:  { label: 'Terminée',  className: 'bg-gray-100 text-gray-600' },
  annulee:   { label: 'Annulée',   className: 'bg-red-100 text-red-700' },
};

const ReservationsTable = ({ reservations, onSelect, onComplete }: Props) => (
  <div className="bg-white rounded-xl shadow-sm overflow-hidden">
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-green-900 text-white text-xs uppercase">
          {['Réf.', 'Élève', 'Répétiteur', 'Matière', 'Date / Heure',
            'Montant', 'Cours', 'Paiement', 'Actions'].map(h => (
            <th key={h} className="text-left px-4 py-3 font-semibold">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {reservations.length === 0 ? (
          <tr>
            <td colSpan={9} className="text-center py-10 text-gray-400">
              Aucune réservation trouvée
            </td>
          </tr>
        ) : reservations.map((r, i) => {
          const course = courseConfig[r.courseStatus];
          return (
            <tr
              key={r.id}
              className={`border-t border-gray-50 hover:bg-green-50
                transition-colors
                ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}`}
            >
              {/* Référence */}
              <td className="px-4 py-3 font-mono text-xs text-gray-500">
                {r.reference}
              </td>

              {/* Élève */}
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800">{r.eleve.name}</div>
                <div className="text-xs text-gray-400">{r.eleve.phone}</div>
              </td>

              {/* Répétiteur */}
              <td className="px-4 py-3">
                <div className="font-medium text-gray-800">{r.repetiteur.name}</div>
              </td>

              {/* Matière */}
              <td className="px-4 py-3 text-gray-600">{r.repetiteur.subject}</td>

              {/* Date / Heure */}
              <td className="px-4 py-3">
                <div className="text-gray-700">{r.date}</div>
                <div className="text-xs text-gray-400">{r.timeSlot}</div>
              </td>

              {/* Montant */}
              <td className="px-4 py-3 font-bold text-green-800">
                {r.amount.toLocaleString()} F
              </td>

              {/* Statut cours */}
              <td className="px-4 py-3">
                <span className={`${course.className} text-xs
                  font-bold px-2 py-1 rounded-full`}>
                  {course.label}
                </span>
              </td>

              {/* Statut paiement */}
              <td className="px-4 py-3">
                <PaymentStatusBadge status={r.paymentStatus} />
              </td>

              {/* Actions */}
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  {/* Voir détail */}
                  <button
                    onClick={() => onSelect(r)}
                    className="bg-blue-500 hover:bg-blue-600 text-white
                               text-xs font-bold px-2 py-1 rounded cursor-pointer"
                  >
                    👁 Détail
                  </button>

                  {/* Marquer terminée — uniquement si confirmée */}
                  {r.courseStatus === 'confirmee' && (
                    <button
                      onClick={() => onComplete(r.id)}
                      className="bg-green-700 hover:bg-green-800 text-white
                                 text-xs font-bold px-2 py-1 rounded cursor-pointer"
                    >
                      ✅ Terminer
                    </button>
                  )}
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

export default ReservationsTable;