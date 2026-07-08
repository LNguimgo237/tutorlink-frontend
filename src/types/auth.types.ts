// Rôle de l'utilisateur connecté
export type UserRole = 'ELEVE' | 'PARENT' | 'REPETITEUR' | 'ADMIN';

// Données renvoyées par le backend après connexion réussie
export interface AuthResponse {
  token: string;           // JWT signé par le backend
  refreshToken?: string;   // optionnel si implémenté
  user: AuthUser;
}

// Profil utilisateur minimal stocké dans le store
export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
  isVerified: boolean;     // compte validé par l'admin (répétiteur)
  subscriptionStatus?: 'trial' | 'active' | 'suspended'; // répétiteur
}

// Données du formulaire de connexion
export interface LoginCredentials {
  emailOrPhone: string;    // email OU numéro de téléphone
  password: string;
  rememberMe: boolean;
}

// Réponse Google OAuth
export interface GoogleAuthResponse {
  credential: string;      // ID token Google
}

// Erreur d'authentification
export interface AuthError {
  code:
    | 'INVALID_CREDENTIALS'    // email/mot de passe incorrect
    | 'ACCOUNT_SUSPENDED'      // compte suspendu
    | 'ACCOUNT_PENDING'        // répétiteur en attente validation
    | 'SUBSCRIPTION_EXPIRED'   // abonnement répétiteur expiré
    | 'NETWORK_ERROR'          // serveur indisponible
    | 'GOOGLE_AUTH_FAILED';    // échec connexion Google
  message: string;
}