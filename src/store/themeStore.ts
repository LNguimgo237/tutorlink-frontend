/**
 * themeStore.ts  (M7 - Willer Pegasus)
 * --------------------------------------
 * Store Zustand pour le theme clair / sombre.
 *
 * - Persiste le choix dans localStorage
 * - Applique la classe "dark" sur <html> automatiquement
 * - Detecte la preference systeme au premier chargement
 */

import { create } from 'zustand'

type Theme = 'light' | 'dark'

interface ThemeStore {
  theme: Theme
  toggleTheme: () => void
  setTheme: (t: Theme) => void
}

// Applique ou retire la classe "dark" sur <html>
function applyTheme(theme: Theme) {
  const root = document.documentElement
  if (theme === 'dark') {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
}

// Lit le theme initial :
// 1. localStorage (choix precedent de l'utilisateur)
// 2. Sinon preference systeme (prefers-color-scheme)
// 3. Sinon light par defaut
function getInitialTheme(): Theme {
  const stored = localStorage.getItem('tutorlink-theme') as Theme | null
  if (stored === 'dark' || stored === 'light') return stored

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return prefersDark ? 'dark' : 'light'
}

// Initialisation immediate (avant le premier render React)
const initialTheme = getInitialTheme()
applyTheme(initialTheme)

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: initialTheme,

  toggleTheme: () =>
    set((state) => {
      const next: Theme = state.theme === 'light' ? 'dark' : 'light'
      applyTheme(next)
      localStorage.setItem('tutorlink-theme', next)
      return { theme: next }
    }),

  setTheme: (t: Theme) =>
    set(() => {
      applyTheme(t)
      localStorage.setItem('tutorlink-theme', t)
      return { theme: t }
    }),
}))
