// ============================================================
// FICHIER : src/store/themeStore.ts
// RÔLE    : Store Zustand pour gérer le thème sombre/clair
//           Persiste dans localStorage.
//           Applique/retire la classe 'dark' sur <html>
//           immédiatement à chaque changement.
// ============================================================

import { create } from "zustand";
import { persist } from "zustand/middleware";

// ── Interface du store ────────────────────────────────────────

interface ThemeState {
  isDark: boolean;              // true = thème sombre actif
  toggleTheme: () => void;      // Bascule entre clair et sombre
  setDark: (dark: boolean) => void; // Force un thème précis
}

// ── Utilitaire : applique/retire la classe 'dark' sur <html> ──
// Doit être appelé à chaque changement de thème pour que
// Tailwind darkMode: 'class' prenne effet immédiatement
const applyThemeToDOM = (isDark: boolean) => {
  if (typeof document !== "undefined") {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
};

// ── Store Zustand avec persistance localStorage ───────────────
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDark: false, // Thème clair par défaut

      toggleTheme: () =>
        set((state) => {
          const newDark = !state.isDark;
          applyThemeToDOM(newDark);
          return { isDark: newDark };
        }),

      setDark: (dark: boolean) => {
        applyThemeToDOM(dark);
        set({ isDark: dark });
      },
    }),
    {
      name: "tutorlink-theme", // Clé dans localStorage
      onRehydrateStorage: () => (state) => {
        // À la réhydratation (chargement de la page),
        // applique immédiatement le thème sauvegardé
        if (state) applyThemeToDOM(state.isDark);
      },
    }
  )
);