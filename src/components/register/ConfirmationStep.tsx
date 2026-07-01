import { RegisterRole } from '../../types/register.types';

interface Props {
  role: RegisterRole;
  name: string;
  onGoToLogin: () => void;
}

// Étape finale — confirmation d'inscription
const ConfirmationStep = ({ role, name, onGoToLogin }: Props) => (
  <div className="text-center flex flex-col items-center gap-5 py-4">

    {/* Icône succès */}
    <div className="w-20 h-20 rounded-full bg-green-100
                    flex items-center justify-center text-4xl">
      {role === 'REPETITEUR' ? '⏳' : '✅'}
    </div>

    {/* Titre */}
    <div>
      <h2 className="text-xl font-bold text-gray-800">
        {role === 'REPETITEUR'
          ? 'Dossier soumis avec succès !'
          : 'Compte créé avec succès !'
        }
      </h2>
      <p className="text-gray-500 text-sm mt-2">
        Bienvenue sur TutorLink, <strong>{name}</strong> !
      </p>
    </div>

    {/* Message selon rôle */}
    {role === 'REPETITEUR' ? (
      <div className="bg-yellow-50 border border-yellow-200
                      rounded-xl px-5 py-4 text-left w-full">
        <p className="text-sm font-bold text-yellow-700 mb-2">
          ⏳ Votre dossier est en cours de vérification
        </p>
        <ul className="text-xs text-yellow-600 flex flex-col gap-1.5">
          <li>✓ CNI vérifiée par notre équipe</li>
          <li>✓ Diplôme authentifié</li>
          <li>✓ Notification SMS + email dès validation</li>
          <li>✓ Délai : 24 à 48 heures ouvrables</li>
        </ul>
      </div>
    ) : (
      <div className="bg-green-50 border border-green-200
                      rounded-xl px-5 py-4 text-left w-full">
        <p className="text-sm font-bold text-green-700 mb-2">
          ✅ Votre compte est actif
        </p>
        <ul className="text-xs text-green-600 flex flex-col gap-1.5">
          <li>✓ Recherchez des répétiteurs près de chez vous</li>
          <li>✓ Réservez des cours en quelques clics</li>
          <li>✓ Rejoignez des groupes de révision</li>
          <li>✓ Paiement sécurisé MTN MoMo ou Orange Money</li>
        </ul>
      </div>
    )}

    {/* Bouton connexion */}
    <button
      onClick={onGoToLogin}
      className="w-full bg-[#1a2744] hover:bg-blue-900 text-white
                 font-bold py-3 rounded-xl cursor-pointer
                 transition-colors"
    >
      {role === 'REPETITEUR'
        ? 'Compris, j\'attends la validation'
        : '🚀 Accéder à mon espace'
      }
    </button>
  </div>
);

export default ConfirmationStep;