import api from './api';
import {
  LoginCredentials, AuthResponse, GoogleAuthResponse
} from '../types/auth.types';

const authService = {

  // POST /auth/login — connexion email/téléphone + mot de passe
  // Backend vérifie les credentials et retourne un JWT
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const res = await api.post('/auth/login', credentials);
    return res.data;
  },

  // POST /auth/google — connexion via Google OAuth
  // Frontend envoie le token Google, backend le vérifie
  // et crée/retrouve le compte utilisateur
  loginWithGoogle: async (
    data: GoogleAuthResponse
  ): Promise<AuthResponse> => {
    const res = await api.post('/auth/google', data);
    return res.data;
  },

  // POST /auth/logout — invalide le token côté backend
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  // POST /auth/refresh — renouvelle le token JWT
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const res = await api.post('/auth/refresh', { refreshToken });
    return res.data;
  },

  // GET /auth/me — récupère le profil de l'utilisateur connecté
  // Utilisé au démarrage de l'app pour vérifier si la session est valide
  getMe: async () => {
    const res = await api.get('/auth/me');
    return res.data;
  },

  // POST /auth/forgot-password — envoie SMS/email de réinitialisation
  forgotPassword: async (emailOrPhone: string): Promise<void> => {
    await api.post('/auth/forgot-password', { emailOrPhone });
  },
};

export default authService;