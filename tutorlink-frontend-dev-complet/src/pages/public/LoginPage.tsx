import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useLogin } from '../../hooks/useLogin';
import GoogleLoginButton from '../../components/auth/GoogleLoginButton';

const LoginPage = () => {
  const {
    formData, setFormData,
    error, loading, googleLoading,
    handleLogin, handleGoogleLogin,
  } = useLogin();

  // Charge le script Google Identity Services
  useEffect(() => {
    if (document.getElementById('google-gsi-script')) return;
    const script = document.createElement('script');
    script.id = 'google-gsi-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

     {/* ── Navbar publique ─────────────────────────────────── */}
      <header className="bg-[#1a2744] border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4
                        flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-[#f5a623] text-2xl">🎓</span>
            <span className="font-bold text-xl text-white">
              Tutor<span className="text-[#f5a623]">Link</span>
            </span>
          </Link>

          {/* Navigation centrale */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className="text-white/80 hover:text-white text-sm transition-colors"
            >
              Accueil
            </Link>
            <Link
              to="/repetiteurs"
              className="text-white font-semibold text-sm border-b-2
                         border-[#f5a623] pb-0.5"
            >
              Répétiteurs
            </Link>
            <Link
              to="/groupes"
              className="text-white/80 hover:text-white text-sm transition-colors"
            >
              Groupes
           </Link>
          </nav>
          <Link
              to="/inscription"
              className="
                bg-[#f5a623] text-[#1a2744] font-bold text-sm
                px-5 py-2 rounded-lg hover:bg-[#bda57d]
                transition-colors
              "
            >
              S'inscrire
            </Link>
          </div>
      </header>

      {/* Contenu centré */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">

          {/* Carte formulaire */}
          <div className="bg-white rounded-2xl shadow-sm
                          border border-gray-100 overflow-hidden">

            {/* Barre dorée en haut */}
            <div className="h-1 bg-yellow-400" />

            <div className="p-8">

              {/* Titre */}
              <div className="text-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Bon retour parmi nous
                </h1>
                <p className="text-gray-400 text-sm mt-1">
                  Connectez-vous à votre espace TutorLink.
                </p>
              </div>

              {/* ── CONNEXION GOOGLE ── */}
              <div className="mb-5">
                <GoogleLoginButton
                  onSuccess={handleGoogleLogin}
                  loading={googleLoading}
                />
              </div>

              {/* Séparateur */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-100" />
                <span className="text-xs text-gray-400 font-medium">
                  ou continuer avec
                </span>
                <div className="flex-1 h-px bg-gray-100" />
              </div>

              {/* ── FORMULAIRE CLASSIQUE ── */}
              <div className="flex flex-col gap-4">

                {/* Email ou téléphone */}
                <div>
                  <label className="text-xs text-gray-500 font-semibold
                                    uppercase mb-1 block">
                    Adresse email ou téléphone
                  </label>
                  <input
                    type="text"
                    value={formData.emailOrPhone}
                    onChange={e => setFormData({
                      ...formData, emailOrPhone: e.target.value
                    })}
                    placeholder="exemple@email.com ou 6XX XX XX XX"
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    className={`w-full border rounded-xl px-4 py-3 text-sm
                                focus:outline-none focus:ring-2
                                focus:ring-blue-300 transition-colors
                                ${error?.code === 'INVALID_CREDENTIALS'
                                  ? 'border-red-300 bg-red-50'
                                  : 'border-gray-200'
                                }`}
                  />
                </div>

                {/* Mot de passe */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs text-gray-500 font-semibold uppercase">
                      Mot de passe
                    </label>
                    <Link to="/mot-de-passe-oublie"
                      className="text-xs text-blue-600 hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>
                  <input
                    type="password"
                    value={formData.password}
                    onChange={e => setFormData({
                      ...formData, password: e.target.value
                    })}
                    placeholder="••••••••"
                    onKeyDown={e => e.key === 'Enter' && handleLogin()}
                    className={`w-full border rounded-xl px-4 py-3 text-sm
                                focus:outline-none focus:ring-2
                                focus:ring-blue-300 transition-colors
                                ${error?.code === 'INVALID_CREDENTIALS'
                                  ? 'border-red-300 bg-red-50'
                                  : 'border-gray-200'
                                }`}
                  />
                </div>

                {/* Se souvenir de moi */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={formData.rememberMe}
                    onChange={e => setFormData({
                      ...formData, rememberMe: e.target.checked
                    })}
                    className="w-4 h-4 accent-blue-800 cursor-pointer"
                  />
                  <label htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer">
                    Se souvenir de moi
                  </label>
                </div>

                {/* ── MESSAGE D'ERREUR ── */}
                {error && (
                  <div className={`rounded-xl px-4 py-3 text-sm
                    ${error.code === 'ACCOUNT_SUSPENDED'
                      ? 'bg-red-50 border border-red-200 text-red-700'
                      : error.code === 'ACCOUNT_PENDING'
                        ? 'bg-yellow-50 border border-yellow-200 text-yellow-700'
                        : error.code === 'SUBSCRIPTION_EXPIRED'
                          ? 'bg-orange-50 border border-orange-200 text-orange-700'
                          : 'bg-red-50 border border-red-200 text-red-700'
                    }`}>
                    <p className="font-bold text-xs uppercase mb-0.5">
                      {error.code === 'ACCOUNT_PENDING' ? '⏳ Compte en attente'
                        : error.code === 'ACCOUNT_SUSPENDED' ? '🚫 Compte suspendu'
                        : error.code === 'SUBSCRIPTION_EXPIRED' ? '⚠️ Abonnement expiré'
                        : error.code === 'NETWORK_ERROR' ? '📡 Connexion impossible'
                        : '❌ Erreur de connexion'}
                    </p>
                    <p>{error.message}</p>
                    {/* Lien vers abonnement si expiré */}
                    {error.code === 'SUBSCRIPTION_EXPIRED' && (
                      <Link to="/repetiteur/abonnement"
                        className="text-xs font-bold underline mt-1 block">
                        → Renouveler mon abonnement
                      </Link>
                    )}
                  </div>
                )}
               
                {/* Bouton connexion */}
                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full bg-[#1a2744] hover:bg-blue-900
                             text-white font-bold py-3.5 rounded-xl
                             cursor-pointer transition-colors
                             disabled:opacity-50 disabled:cursor-not-allowed
                             flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30
                                      border-t-white rounded-full animate-spin" />
                      Connexion en cours...
                    </>
                  ) : (
                    'Se connecter'
                  )}
                </button>
                 </div>
               </div>
               </div>

          {/* Info sécurité */}
          <p className="text-center text-xs text-gray-400 mt-4">
            🔒 Connexion sécurisée · TutorLink Dschang, Cameroun
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;