import { Link } from 'react-router-dom';
import { useRegister } from '../../hooks/useRegister';
import StepProgressBar from '../../components/register/StepProgressBar';
import RoleSelector from '../../components/register/RoleSelector';
import PersonalInfoForm from '../../components/register/PersonalInfoForm';
import TutorPedagogicForm from '../../components/register/TutorPedagogicForm';
import TutorDocumentsForm from '../../components/register/TutorDocumentsForm';
import ConfirmationStep from '../../components/register/ConfirmationStep';
import PublicFooter from "../../components/public/layout/PublicFooter";
const RegisterPage = () => {
  const {
    step, role, setRole,
    baseData, setBaseData,
    tutorData, setTutorData,
    documents, previews,
    errors, loading,
    stepNumber, totalSteps,
    handleDocumentSelect, handleDocumentRemove,
    handleNext, handleBack,
    navigate,
  } = useRegister();

  return (
    <>
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <nav className="bg-[#1a2744] px-6 py-3
                      flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">
          🎓 Tutor<span className="text-yellow-400">Link</span>
        </Link>
        <Link to="/connexion"
          className="text-blue-200 hover:text-white text-sm
                     transition-colors">
          J'ai déjà un compte
        </Link>
      </nav>

      {/* Carte formulaire */}
      <div className="max-w-lg mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm
                        border border-gray-100 overflow-hidden">

          {/* Barre orange en haut */}
          <div className="h-1 bg-yellow-400" />

          <div className="p-6">

            {/* Barre de progression */}
            {step !== 'confirmation' && (
              <StepProgressBar
                current={stepNumber}
                total={totalSteps}
                role={role}
              />
            )}

            {/* Contenu selon l'étape */}
            {step === 'role' && (
              <RoleSelector selected={role} onSelect={setRole} />
            )}

            {step === 'infos' && (
              <PersonalInfoForm
                data={baseData}
                onChange={setBaseData}
                errors={errors}
                role={role}
              />
            )}

            {step === 'pedagogique' && (
              <TutorPedagogicForm
                data={tutorData}
                onChange={setTutorData}
                errors={errors}
              />
            )}

            {step === 'documents' && (
              <TutorDocumentsForm
                documents={documents}
                previews={previews}
                errors={errors}
                onSelect={handleDocumentSelect}
                onRemove={handleDocumentRemove}
              />
            )}

            {step === 'confirmation' && (
              <ConfirmationStep
                role={role!}
                name={`${baseData.firstName} ${baseData.lastName}`}
                onGoToLogin={() => navigate('/connexion')}
              />
            )}

            {/* Boutons navigation — masqués à la confirmation */}
            {step !== 'confirmation' && (
              <div className="flex gap-3 mt-6">
                {/* Retour */}
                {step !== 'role' && (
                  <button
                    onClick={handleBack}
                    className="border border-gray-200 text-gray-600
                               px-5 py-2.5 rounded-xl hover:bg-gray-50
                               cursor-pointer transition-colors text-sm"
                  >
                    ← Retour
                  </button>
                )}

                {/* Suivant / Créer */}
                <button
                  onClick={handleNext}
                  disabled={loading || (step === 'role' && !role)}
                  className="flex-1 bg-[#1a2744] hover:bg-blue-900
                             text-white font-bold py-2.5 rounded-xl
                             cursor-pointer transition-colors
                             disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading ? '⏳ Traitement...'
                    : step === 'documents' ? '✅ Soumettre mon dossier'
                    : step === 'infos' && role === 'ELEVE_PARENT'
                      ? '🚀 Créer mon compte'
                    : 'Continuer →'
                  }
                </button>
              </div>
            )}

            {/* Lien connexion */}
            {step !== 'confirmation' && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Déjà inscrit ?{' '}
                <Link to="/connexion"
                  className="text-blue-600 font-bold hover:underline">
                  Se connecter
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
    <PublicFooter/>
    </>
  );
};

export default RegisterPage;