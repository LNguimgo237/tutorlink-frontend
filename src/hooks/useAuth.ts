import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';
import type { LoginCredentials, RegisterData } from '@/services/authService';

export const useAuth = () => {
  const navigate = useNavigate();
  const { setAuth, logout } = useAuthStore();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginCredentials) => authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Bon retour parmi nous !');
      navigate('/');
    },
    onError: () => {
      toast.error('Email ou mot de passe incorrect.');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterData) => authService.register(userData),
    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success('Compte créé avec succès !');
      navigate('/');
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de l'inscription.");
    },
  });

  const handleLogout = () => {
    logout();
    toast.success('Déconnexion réussie.');
    navigate('/login');
  };

  return {
    login: loginMutation.mutate,
    isLoginLoading: loginMutation.isPending,
    register: registerMutation.mutate,
    isRegisterLoading: registerMutation.isPending,
    logout: handleLogout,
  };
};