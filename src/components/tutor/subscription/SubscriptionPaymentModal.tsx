import { SubscriptionOperator } from '../../../types/subscription.types';

interface Props {
  onPay: (operator: SubscriptionOperator) => void;
  onClose: () => void;
  loading: boolean;
  success: boolean;
  monthlyPrice: number;
}

// Modal paiement abonnement via Mobile Money
const SubscriptionPaymentModal = ({
  onPay, onClose, loading, success, monthlyPrice
}: Props) => (
  <div
    onClick={!loading ? onClose : undefined}
    className="fixed inset-0 bg-black/50 z-50
               flex items-center justify-center p-4"
  >
    <div
      onClick={e => e.stopPropagation()}
      className="bg-white rounded-2xl w-full max-w-md
                 shadow-2xl overflow-hidden"
    >
      {/* En-tête */}
      <div className="bg-[#1a2744] text-white px-6 py-4">
        <h3 className="font-bold text-lg">💳 Payer mon abonnement</h3>
        <p className="text-blue-300 text-sm">
          TutorLink — Abonnement mensuel répétiteur
        </p>
      </div>

      <div className="p-6">

        {/* Succès */}
        {success ? (
          <div className="text-center py-4">
            <div className="text-5xl mb-3">✅</div>
            <h4 className="font-bold text-green-700 text-lg">
              Paiement réussi !
            </h4>
            <p className="text-gray-500 text-sm mt-1">
              Votre abonnement est actif pour 30 jours.
              Vous pouvez continuer à recevoir des élèves.
            </p>
          </div>
        ) : (
          <>
            {/* Montant */}
            <div className="bg-yellow-50 rounded-xl p-4 text-center mb-5">
              <p className="text-xs text-yellow-600 uppercase font-semibold mb-1">
                Montant à payer
              </p>
              <p className="text-3xl font-bold text-yellow-700">
                {monthlyPrice.toLocaleString()} FCFA
              </p>
              <p className="text-xs text-yellow-500 mt-1">
                Abonnement mensuel TutorLink
              </p>
            </div>

            {/* Ce que l'abonnement inclut */}
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-500 uppercase mb-2">
                Inclus dans votre abonnement :
              </p>
              {[
                '✅ Profil visible par tous les élèves de Dschang',
                '✅ Réception illimitée de demandes de cours',
                '✅ Création de groupes de répétition',
                '✅ Messagerie avec les élèves',
                '✅ Tableau de bord et statistiques',
              ].map(item => (
                <p key={item} className="text-xs text-gray-600 py-1
                                         border-b border-gray-50 last:border-0">
                  {item}
                </p>
              ))}
            </div>

            {/* Choix opérateur */}
            <p className="text-sm font-bold text-gray-700 mb-3">
              Choisissez votre opérateur Mobile Money :
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onPay('MTN')}
                disabled={loading}
                className="flex flex-col items-center gap-2
                           border-2 border-gray-200 rounded-xl py-4
                           hover:border-yellow-400 hover:bg-yellow-50
                           cursor-pointer transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl">📱</span>
                <span className="font-bold text-sm text-gray-700">
                  MTN Mobile Money
                </span>
              </button>
              <button
                onClick={() => onPay('Orange')}
                disabled={loading}
                className="flex flex-col items-center gap-2
                           border-2 border-gray-200 rounded-xl py-4
                           hover:border-orange-400 hover:bg-orange-50
                           cursor-pointer transition-all
                           disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="text-2xl">🟠</span>
                <span className="font-bold text-sm text-gray-700">
                  Orange Money
                </span>
              </button>
            </div>

            {loading && (
              <p className="text-center text-gray-500 text-sm mt-4">
                ⏳ Traitement du paiement en cours...
              </p>
            )}

            {/* Annuler */}
            {!loading && (
              <button
                onClick={onClose}
                className="w-full mt-4 border border-gray-200
                           text-gray-500 py-2 rounded-xl
                           hover:bg-gray-50 cursor-pointer
                           transition-colors text-sm"
              >
                Annuler
              </button>
            )}
          </>
        )}
      </div>
    </div>
  </div>
);

export default SubscriptionPaymentModal;