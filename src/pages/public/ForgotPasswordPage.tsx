import { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../services/authService';

const ForgotPasswordPage = () => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!emailOrPhone.trim()) {
      setError('Entrez votre email ou téléphone.');
      return;
    }
    setLoading(true);
    try {
      await authService.forgotPassword(emailOrPhone);
      setSent(true);
    } catch {
      setError('Aucun compte trouvé avec cet email ou ce numéro.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-[#1a2744] px-6 py-3">
        <Link to="/" className="font-bold text-lg">
          🎓 Tutor<span className="text-yellow-400">Link</span>
        </Link>
      </nav>

      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <div className="h-1 bg-yellow-400 -mt-8 -mx-8 mb-8 rounded-t-2xl" />

            {sent ? (
              <div className="text-center">
                <div className="text-5xl mb-4">📱</div>
                <h2 className="font-bold text-gray-800 text-lg mb-2">
                  Instructions envoyées !
                </h2>
                <p className="text-gray-500 text-sm mb-6">
                  Vérifiez votre email ou SMS pour réinitialiser
                  votre mot de passe.
                </p>
                <Link to="/connexion"
                  className="text-blue-600 font-bold hover:underline text-sm">
                  ← Retour à la connexion
                </Link>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-gray-800 text-xl mb-1">
                  Mot de passe oublié ?
                </h2>
                <p className="text-gray-400 text-sm mb-6">
                  Entrez votre email ou numéro de téléphone. Nous vous
                  enverrons les instructions de réinitialisation.
                </p>

                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    value={emailOrPhone}
                    onChange={e => {
                      setEmailOrPhone(e.target.value);
                      setError('');
                    }}
                    placeholder="exemple@email.com ou 6XX XX XX XX"
                    onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                    className={`w-full border rounded-xl px-4 py-3 text-sm
                                focus:outline-none focus:ring-2 focus:ring-blue-300
                                ${error ? 'border-red-300' : 'border-gray-200'}`}
                  />
                  {error && (
                    <p className="text-red-500 text-xs">{error}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full bg-[#1a2744] hover:bg-blue-900
                               text-white font-bold py-3 rounded-xl
                               cursor-pointer transition-colors
                               disabled:opacity-50"
                  >
                    {loading ? '⏳ Envoi...' : 'Envoyer les instructions'}
                  </button>

                  <Link to="/connexion"
                    className="text-center text-sm text-gray-500
                               hover:text-gray-700">
                    ← Retour à la connexion
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;