// ============================================================
// Hook central de la page de connexion
// Gère le formulaire, les données mock de test, la validation,
// la soumission et la redirection selon le rôle
// ============================================================

import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { loginUser, requestPasswordReset } from "../services/authService";
import type {
  LoginFormData,
  LoginResponse,
  LoginErrorCode,
} from "../types/auth.types";
import { ROLE_REDIRECT_MAP } from "../types/auth.types";

// ══════════════════════════════════════════════════════════════
// DONNÉES MOCK — à remplacer par loginUser() quand backend prêt
// ══════════════════════════════════════════════════════════════

// ── DONNÉES MOCK ── à remplacer par loginUser() quand backend prêt
// Comptes de test pour valider les différents rôles et redirections
const MOCK_ACCOUNTS: Record<
  string,
  { password: string; response: LoginResponse }
> = {
  "l.nguefack@gmail.com": {
    password: "eleve123",
    response: {
      token: "mock_jwt_student",
      refreshToken: "mock_refresh_student",
      expiresIn: 3600,
      user: {
        id: "u1",
        firstName: "Leonel",
        lastName: "Nguefack",
        email: "l.nguefack@gmail.com",
        phone: "+237 6 78 12 34 56",
        role: "STUDENT",
        district: "Centre Dschang",
      },
    },
  },
  "l.nanfack@tutorlink.cm": {
    password: "repetiteur123",
    response: {
      token: "mock_jwt_tutor",
      refreshToken: "mock_refresh_tutor",
      expiresIn: 3600,
      user: {
        id: "t1",
        firstName: "Leonel",
        lastName: "Nanfack",
        email: "l.nanfack@tutorlink.cm",
        phone: "+237 6 99 88 77 66",
        role: "TUTOR",
        district: "Centre Dschang",
      },
    },
  },
  "admin@tutorlink.cm": {
    password: "admin123",
    response: {
      token: "mock_jwt_admin",
      refreshToken: "mock_refresh_admin",
      expiresIn: 3600,
      user: {
        id: "a1",
        firstName: "Administrateur",
        lastName: "Principal",
        email: "admin@tutorlink.cm",
        phone: "+237 6 00 00 00 00",
        role: "ADMIN",
        district: "Centre Dschang",
      },
    },
  },
};

// ── Messages d'erreur lisibles par code ───────────────────────
const ERROR_MESSAGES: Record<LoginErrorCode, string> = {
  INVALID_CREDENTIALS:
    "Email/téléphone ou mot de passe incorrect.",
  ACCOUNT_SUSPENDED:
    "Votre compte a été suspendu. Contactez le support.",
  ACCOUNT_NOT_VERIFIED:
    "Votre dossier répétiteur est en attente de validation par l'administrateur.",
  NETWORK_ERROR:
    "Impossible de se connecter au serveur. Vérifiez votre connexion.",
  UNKNOWN:
    "Une erreur est survenue. Veuillez réessayer.",
};

// ══════════════════════════════════════════════════════════════
// INTERFACE DE RETOUR DU HOOK
// ══════════════════════════════════════════════════════════════

interface UseLoginPageReturn {
  // Formulaire
  identifier: string;
  setIdentifier: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;

  // Soumission
  handleSubmit: () => void;
  isSubmitting: boolean;
  errorMessage: string | null;

  // Visibilité du mot de passe
  showPassword: boolean;
  toggleShowPassword: () => void;

  // Modal mot de passe oublié
  forgotPasswordOpen: boolean;
  openForgotPassword: () => void;
  closeForgotPassword: () => void;
  handleForgotPasswordSubmit: (identifier: string) => void;
  isSendingResetCode: boolean;
  resetCodeSent: boolean;
}

// ══════════════════════════════════════════════════════════════
// HOOK PRINCIPAL
// ══════════════════════════════════════════════════════════════

export function useLoginPage(): UseLoginPageReturn {
  const navigate = useNavigate();
  const location = useLocation();

  // ── État du formulaire ────────────────────────────────────
  const [identifier,  setIdentifier]  = useState("");
  const [password,    setPassword]    = useState("");
  const [rememberMe,  setRememberMe]  = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // ── État du modal mot de passe oublié ─────────────────────
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetCodeSent,      setResetCodeSent]       = useState(false);

  // ── Mutation : connexion ──────────────────────────────────
  // → remplacer par loginUser(data) quand backend prêt
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData): Promise<LoginResponse> => {
      // ── DONNÉES MOCK ── à remplacer par loginUser(data)
      // quand backend prêt
      await new Promise((r) => setTimeout(r, 700));

      const account = MOCK_ACCOUNTS[data.identifier.toLowerCase().trim()];

      // Identifiant inexistant
      if (!account) {
        throw new Error("INVALID_CREDENTIALS" as LoginErrorCode);
      }

      // Mot de passe incorrect
      if (account.password !== data.password) {
        throw new Error("INVALID_CREDENTIALS" as LoginErrorCode);
      }

      return account.response;
      // → remplacer par : return loginUser(data);
    },
    onSuccess: (response) => {
      // Stocke le token et les infos utilisateur
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", response.token);
      storage.setItem("refresh_token", response.refreshToken);
      storage.setItem("user_role", response.user.role);
      storage.setItem("user_first_name", response.user.firstName);

      // Stocke aussi des infos spécifiques utiles aux layouts
      if (response.user.role === "TUTOR") {
        localStorage.setItem("tutor_first_name", response.user.firstName);
      }

      // Redirige vers la page d'origine si elle existait (route protégée)
      // sinon vers le dashboard correspondant au rôle
      const redirectTo =
        (location.state as { from?: string })?.from ??
        ROLE_REDIRECT_MAP[response.user.role];

      navigate(redirectTo, { replace: true });
    },
    onError: (error: Error) => {
      const code = (error.message as LoginErrorCode) || "UNKNOWN";
      setErrorMessage(ERROR_MESSAGES[code] ?? ERROR_MESSAGES.UNKNOWN);
    },
  });

  // ── Mutation : mot de passe oublié ────────────────────────
  // → remplacer par requestPasswordReset(payload) quand backend prêt
  const forgotPasswordMutation = useMutation({
    mutationFn: async (id: string) => {
      // ── DONNÉES MOCK ── à remplacer par requestPasswordReset()
      await new Promise((r) => setTimeout(r, 600));
      // → remplacer par : return requestPasswordReset({ identifier: id });
    },
    onSuccess: () => {
      setResetCodeSent(true);
    },
  });

  // ── Soumet le formulaire de connexion ─────────────────────
  const handleSubmit = useCallback(() => {
    setErrorMessage(null);

    // Validation simple côté client avant l'appel
    if (!identifier.trim()) {
      setErrorMessage("Veuillez saisir votre email ou téléphone.");
      return;
    }
    if (!password) {
      setErrorMessage("Veuillez saisir votre mot de passe.");
      return;
    }

    loginMutation.mutate({ identifier: identifier.trim(), password, rememberMe });
  }, [identifier, password, rememberMe, loginMutation]);

  // ── Toggle affichage du mot de passe ──────────────────────
  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  // ── Actions modal mot de passe oublié ─────────────────────
  const openForgotPassword = useCallback(() => {
    setResetCodeSent(false);
    setForgotPasswordOpen(true);
  }, []);

  const closeForgotPassword = useCallback(() => {
    setForgotPasswordOpen(false);
    setResetCodeSent(false);
  }, []);

  const handleForgotPasswordSubmit = useCallback(
    (id: string) => {
      forgotPasswordMutation.mutate(id);
    },
    [forgotPasswordMutation]
  );

  return {
    identifier,
    setIdentifier,
    password,
    setPassword,
    rememberMe,
    setRememberMe,
    handleSubmit,
    isSubmitting: loginMutation.isPending,
    errorMessage,
    showPassword,
    toggleShowPassword,
    forgotPasswordOpen,
    openForgotPassword,
    closeForgotPassword,
    handleForgotPasswordSubmit,
    isSendingResetCode: forgotPasswordMutation.isPending,
    resetCodeSent,
  };
}