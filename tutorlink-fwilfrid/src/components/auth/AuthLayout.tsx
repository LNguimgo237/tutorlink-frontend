/**
 * AuthLayout.tsx  (M2 - Willer Pegasus, partage avec M5 Dallya)
 * Layout centre commun pour Connexion et Inscription.
 */

import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

interface AuthLayoutProps {
  children: React.ReactNode
  ctaLabel?: string
  ctaHref?:  string
}

export default function AuthLayout({
  children,
  ctaLabel = "J'ai deja un compte",
  ctaHref  = '/connexion',
}: AuthLayoutProps) {
  return (
    <div className="min-h-[calc(100vh-72px)] bg-bg-light flex flex-col">

      {/* Mini barre avec logo + CTA */}
      <div className="bg-navy border-b-2 border-accent px-6 py-3.5
                      flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-heading font-extrabold text-white text-lg">
          <GraduationCap size={24} className="text-accent" />
          TutorLink
        </Link>
        <Link
          to={ctaHref}
          className="text-sm font-medium text-white/80 border border-white/30
                     px-4 py-2 rounded-full hover:bg-white/10 hover:text-white
                     transition-all duration-200"
        >
          {ctaLabel}
        </Link>
      </div>

      {/* Contenu */}
      <div className="flex-1 flex items-start justify-center py-10 px-4">
        {children}
      </div>
    </div>
  )
}
