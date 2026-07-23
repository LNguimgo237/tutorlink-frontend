import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthUser, UserRole } from '../types/auth.types';

interface AuthStore {
  // État
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  role: UserRole | null;

  // Actions
  setAuth: (user: AuthUser, token: string) => void;
  logout: () => void;
  updateUser: (user: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      role: null,

      // Appelé après connexion réussie
      setAuth: (user, token) => set({
        user,
        token,
        isAuthenticated: true,
        role: user.role,
      }),

      // Déconnexion — efface tout
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
        role: null,
      }),

      // Mise à jour du profil sans déconnecter
      updateUser: (updates) => set(state => ({
        user: state.user ? { ...state.user, ...updates } : null,
      })),
    }),
    {
      name: 'tutorlink-auth',  // clé localStorage
      // Ne persiste que le token et le user
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        role: state.role,
      }),
    }
  )
);