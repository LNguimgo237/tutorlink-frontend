/**
 * ThemeToggle.tsx  (M7 - Willer Pegasus)
 * ----------------------------------------
 * Bouton animé soleil / lune pour basculer entre light et dark mode.
 * S'integre dans le header de la messagerie et la Navbar.
 *
 * Variantes :
 * - "icon"   : bouton icone seul (compact, pour le header messagerie)
 * - "pill"   : bouton pill avec label (pour la navbar ou settings)
 */

import { Sun, Moon } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'
import { cn } from '../../utils/cn'

interface ThemeToggleProps {
  variant?: 'icon' | 'pill'
  className?: string
}

export default function ThemeToggle({
  variant = 'icon',
  className,
}: ThemeToggleProps) {
  const { theme, toggleTheme } = useThemeStore()
  const isDark = theme === 'dark'

  if (variant === 'pill') {
    return (
      <button
        onClick={toggleTheme}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium',
          'border transition-all duration-300',
          isDark
            ? 'bg-slate-700 border-slate-600 text-amber-300 hover:bg-slate-600'
            : 'bg-white border-border-col text-text-mid hover:border-primary hover:text-primary',
          className
        )}
        aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      >
        <span
          className="transition-transform duration-500"
          style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}
        >
          {isDark ? <Sun size={14} /> : <Moon size={14} />}
        </span>
        <span>{isDark ? 'Mode clair' : 'Mode sombre'}</span>
      </button>
    )
  }

  // Variant "icon" — bouton compact avec animation
  return (
    <button
      onClick={toggleTheme}
      className={cn(
        'relative w-9 h-9 rounded-xl flex items-center justify-center',
        'transition-all duration-300 overflow-hidden',
        isDark
          ? 'bg-slate-700 text-amber-300 hover:bg-slate-600'
          : 'bg-bg-light text-text-mid hover:bg-primary-light hover:text-primary dark:bg-slate-800',
        className
      )}
      aria-label={isDark ? 'Passer en mode clair' : 'Passer en mode sombre'}
      title={isDark ? 'Mode clair' : 'Mode sombre'}
    >
      {/* Icone soleil */}
      <Sun
        size={17}
        className={cn(
          'absolute transition-all duration-400',
          isDark
            ? 'opacity-100 rotate-0 scale-100'
            : 'opacity-0 rotate-90 scale-50'
        )}
      />
      {/* Icone lune */}
      <Moon
        size={17}
        className={cn(
          'absolute transition-all duration-400',
          isDark
            ? 'opacity-0 -rotate-90 scale-50'
            : 'opacity-100 rotate-0 scale-100'
        )}
      />
    </button>
  )
}
