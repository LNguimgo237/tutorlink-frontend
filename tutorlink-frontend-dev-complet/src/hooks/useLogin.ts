import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import authService from '../services/authService';
import { LoginCredentials, AuthError } from '../types/auth.types';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const [formData, setFormData] = useState<LoginCredentials>({
    emailOrPhone: '',
    password: '',
    rememberMe: false,
  });

  const [error, setError] = useState<AuthError | null>(null);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Messages d'erreur lisibles pour l'utilisateur
  const errorMessages: Record<string, string> = {
    INVALID_CREDENTIALS: 'Email/téléphone ou mot de passe incorrect.',
    ACCOUNT_SUSPENDED: 'Votre compte a été suspendu. Contactez l\'administrateur.',
    ACCOUNT_PENDING: 'Votre dossier est en cours de validation par notre équipe (24-48h).',
    SUBSCRIPTION_EXPIRED: 'Votre abonnement TutorLink a expiré. Renouvelez-le pour continuer.',
    NETWORK_ERROR: 'Serveur indisponible. Vérifiez votre connexion internet.',
    GOOGLE_AUTH_FAILED: 'La connexion avec Google a échoué. Réessayez.',
  };

  // Redirige selon le rôle de l'utilisateur
  const redirectByRole = (role: string) => {
    switch (role) {
      case 'ELEVE':
      case 'PARENT':
        navigate('/eleve/dashboard');
        break;
      case 'REPETITEUR':
        navigate('/repetiteur/dashboard');
        break;
      case 'ADMIN':
        navigate('/admin/dashboard');
        break;
      default:
        navigate('/');
    }
  };

  // Connexion classique email/téléphone + mot de passe
  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    setError(null);

    if (!formData.emailOrPhone || !formData.password) {
      setError({
        code: 'INVALID_CREDENTIALS',
        message: 'Veuillez remplir tous les champs.'
      });
      return;
    }

    setLoading(true);
    try {
      // ── APPEL BACKEND RÉEL ──
      const response = await authService.login(formData);
      setAuth(response.user, response.token);
      redirectByRole(response.user.role);

    } catch (err: any) {
      const code = err?.response?.data?.code || 'NETWORK_ERROR';
      setError({
        code,
        message: errorMessages[code] || 'Une erreur est survenue.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Connexion via Google OAuth
  const handleGoogleLogin = async (credential: string) => {
    setError(null);
    setGoogleLoading(true);
    try {
      // ── APPEL BACKEND RÉEL ──
      const response = await authService.loginWithGoogle({ credential });
      setAuth(response.user, response.token);
      redirectByRole(response.user.role);

    } catch (err: any) {
      const code = err?.response?.data?.code || 'GOOGLE_AUTH_FAILED';
      setError({
        code,
        message: errorMessages[code] || 'Connexion Google échouée.'
      });
    } finally {
      setGoogleLoading(false);
    }
  };

  return {
    formData, setFormData,
    error, loading, googleLoading,
    handleLogin, handleGoogleLogin,
  };
};