import { StudentGroupItem } from '../../../types/studentGroup.types';

interface Props {
  group: StudentGroupItem;
  onPay: (groupId: string, method: 'MTN' | 'Orange') => void;
  onClose: () => void;
}

// Modal de paiement mensuel Mobile Money
const GroupPaymentModal = ({ group, onPay, onClose }: Props) => (
  <div
    onClick={onClose}
    className="fixed inset-0 bg-black/50 z-50
               flex items-center justify-center p-4"
  >
    <div
      onClick={e => e.stopPropagation()}
      className="bg-white rounded-xl w-full max-w-md
                 shadow-2xl overflow-hidden"
    >
      {/* En-tête */}
      <div className="bg-[#1a2744] text-white px-6 py-4">
        <h3 className="font-bold text-lg">💰 Payer le mois</h3>
        <p className="text-blue-300 text-sm">{group.name}</p>
      </div>

      {/* Corps */}
      <div className="p-6">

        {/* Montant */}
        <div className="bg-yellow-50 rounded-xl p-4 text-center mb-6">
          <p className="text-xs text-yellow-600 uppercase font-semibold mb-1">
            Montant à payer
          </p>
          <p className="text-3xl font-bold text-yellow-700">
            {group.monthlyPrice.toLocaleString()} FCFA
          </p>
          <p className="text-xs text-yellow-500 mt-1">pour le mois en cours</p>
        </div>

        {/* Choix opérateur */}
        <p className="text-sm font-semibold text-gray-700 mb-3">
          Choisissez votre opérateur :
        </p>
        <div className="grid grid-cols-2 gap-3">

          {/* MTN Mobile Money */}
          <button
            onClick={() => onPay(group.id, 'MTN')}
            className="flex flex-col items-center gap-2
                       border-2 border-gray-200 rounded-xl py-4
                       hover:border-yellow-400 hover:bg-yellow-50
                       cursor-pointer transition-all"
          >
            <span className="text-2xl">📱</span>
            <span className="font-bold text-sm text-gray-700">
              MTN Mobile Money
            </span>
          </button>

          {/* Orange Money */}
          <button
            onClick={() => onPay(group.id, 'Orange')}
            className="flex flex-col items-center gap-2
                       border-2 border-gray-200 rounded-xl py-4
                       hover:border-orange-400 hover:bg-orange-50
                       cursor-pointer transition-all"
          >
            <span className="text-2xl">🟠</span>
            <span className="font-bold text-sm text-gray-700">
              Orange Money
            </span>
          </button>
        </div>

        {/* Note */}
        <p className="text-xs text-gray-400 text-center mt-4">
          Le paiement est sécurisé via Mobile Money.
          Vous recevrez une confirmation par SMS.
        </p>

        {/* Annuler */}
        <button
          onClick={onClose}
          className="w-full mt-4 border border-gray-200 text-gray-500
                     py-2 rounded-lg hover:bg-gray-50
                     cursor-pointer transition-colors text-sm"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
);

export default GroupPaymentModal;