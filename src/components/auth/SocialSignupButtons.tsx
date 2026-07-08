/**
 * SocialSignupButtons.tsx  (M2 - Willer Pegasus)
 * ------------------------------------------------
 * Boutons de connexion sociale : Google, Apple, Microsoft (Outlook).
 * Communs a l'inscription ET a la connexion (partage avec M5 Dallya).
 *
 * En mode maquette : simule la redirection OAuth et renvoie un email fictif.
 * [BACKEND] Implémenter les redirections OAuth2 reelles dans authService.ts
 */

import { useState } from 'react'
import { cn } from '../../utils/cn'
import { socialSignup, type SocialProvider } from '../../services/authService'
import type { UserRole } from '../../types'

interface SocialSignupButtonsProps {
  role: UserRole
  onSuccess: (data: { userId: string; email: string; name: string }) => void
  onError?: (msg: string) => void
}

const PROVIDERS: {
  id: SocialProvider
  label: string
  icon: React.ReactNode
  bg: string
  border: string
  text: string
}[] = [
  {
    id: 'google',
    label: 'Google',
    bg: 'bg-white hover:bg-gray-50',
    border: 'border-border-col',
    text: 'text-text-dark',
    icon: (
      <svg width="18" height="18" viewBox="0 0 48 48">
        <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.2l6.8-6.8C35.8 2.2 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.9 6.1C12.3 13 17.7 9.5 24 9.5z"/>
        <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17z"/>
        <path fill="#FBBC05" d="M10.5 28.6A14.5 14.5 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.9-6.1A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.9-6.1z"/>
        <path fill="#34A853" d="M24 48c6.2 0 11.4-2 15.2-5.5l-7.5-5.8c-2 1.4-4.6 2.2-7.7 2.2-6.3 0-11.7-4.3-13.5-10l-7.9 6.1C6.5 42.6 14.6 48 24 48z"/>
      </svg>
    ),
  },
  {
    id: 'apple',
    label: 'Apple',
    bg: 'bg-black hover:bg-gray-900',
    border: 'border-black',
    text: 'text-white',
    icon: (
      <svg width="16" height="18" viewBox="0 0 814 1000" fill="white">
        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4C46 376.7 0 264.9 0 177.8 0 80.6 55.7 27.9 138.7 27.9c44.3 0 81.8 27.9 109.3 27.9 26.3 0 67.3-28.4 114.8-28.4 18.1 0 72.3 1.9 108.6 55.1zm-87.6-168.2c17-20.8 30.3-50.3 30.3-79.8 0-4.5-.3-9-.6-13.5-29 1.1-63.7 19.5-84.9 44.3-16.3 18.7-31.2 48.6-31.2 78.7 0 5.1.9 10.2 1.3 11.9 1.7.3 4.5.6 7.3.6 26.3 0 58.5-17.6 77.8-42.2z"/>
      </svg>
    ),
  },
  {
    id: 'microsoft',
    label: 'Outlook',
    bg: 'bg-white hover:bg-gray-50',
    border: 'border-border-col',
    text: 'text-text-dark',
    icon: (
      <svg width="18" height="18" viewBox="0 0 23 23">
        <rect x="0" y="0" width="11" height="11" fill="#F25022"/>
        <rect x="12" y="0" width="11" height="11" fill="#7FBA00"/>
        <rect x="0" y="12" width="11" height="11" fill="#00A4EF"/>
        <rect x="12" y="12" width="11" height="11" fill="#FFB900"/>
      </svg>
    ),
  },
]

export default function SocialSignupButtons({
  role,
  onSuccess,
  onError,
}: SocialSignupButtonsProps) {
  const [loading, setLoading] = useState<SocialProvider | null>(null)

  const handleSocial = async (provider: SocialProvider) => {
    setLoading(provider)
    try {
      const data = await socialSignup(provider, role)
      onSuccess(data)
    } catch {
      onError?.("Erreur de connexion sociale. Veuillez reessayer.")
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-3">
      {/* Separateur */}
      <div className="flex items-center gap-3 my-2">
        <div className="flex-1 h-px bg-border-col" />
        <span className="text-xs text-text-light font-medium">ou continuer avec</span>
        <div className="flex-1 h-px bg-border-col" />
      </div>

      {/* Boutons sociaux */}
      <div className="grid grid-cols-3 gap-2">
        {PROVIDERS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => handleSocial(p.id)}
            disabled={!!loading}
            className={cn(
              'flex items-center justify-center gap-2 py-2.5 px-3 rounded-card',
              'border text-sm font-semibold font-heading',
              'transition-all duration-200',
              p.bg, p.border, p.text,
              loading === p.id && 'opacity-60 cursor-not-allowed',
              !loading && 'hover:shadow-card'
            )}
          >
            {loading === p.id ? (
              <div className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : (
              p.icon
            )}
            <span className="hidden sm:inline text-xs">{p.label}</span>
          </button>
        ))}
      </div>

      <p className="text-[11px] text-text-light text-center">
        En continuant, le code de verification sera envoye a votre adresse email du compte social.
      </p>
    </div>
  )
}
