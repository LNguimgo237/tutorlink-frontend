/**
 * Composant Navbar
 * - Logo (image + fallback texte si image absente)
 * - Liens de navigation desktop
 * - Bouton "Creer un compte" -> [BACKEND] redirigera vers /register
 * - Burger menu mobile
 * - Effet scroll : fond devient opaque apres 50px
 *
 * NOTE : tous les liens utilisent PlaceholderLink (preventDefault) en
 * attendant le branchement de react-router-dom (M1 Leonel).
 */

import { useState, useEffect } from 'react'
import { Menu, X, GraduationCap } from 'lucide-react'
import { cn } from '../../utils/cn'
import PlaceholderLink from '../ui/PlaceholderLink'
import type { NavLink } from '../../types'

const NAV_LINKS: NavLink[] = [
  { label: 'Accueil',               href: '#' },
  { label: 'Trouver un repetiteur', href: '#' },
  { label: 'Devenir repetiteur',    href: '#' },
  { label: 'A propos',              href: '#' },
  { label: 'Contact',               href: '#' },
]

export default function Navbar() {
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [scrolled,  setScrolled]  = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 h-navbar z-50',
        'bg-navy transition-shadow duration-300',
        scrolled && 'shadow-[0_2px_20px_rgba(0,0,0,0.15)]'
      )}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center gap-8">

        {/* Logo */}
        <PlaceholderLink className="flex items-center gap-2 flex-shrink-0">
          <img
            src="/logo.png"
            alt="TutorLink Logo"
            className="h-10 w-auto object-contain"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <span className="flex items-center gap-2 font-heading font-extrabold text-xl text-white">
            <GraduationCap size={28} className="text-accent" />
            TutorLink
          </span>
        </PlaceholderLink>

        {/* Liens desktop */}
        <ul className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <PlaceholderLink
                className="text-sm font-medium text-white/85 px-3 py-1.5
                           rounded-lg transition-colors duration-200
                           hover:bg-primary-light hover:text-primary inline-block"
              >
                {link.label}
              </PlaceholderLink>
            </li>
          ))}
        </ul>

        {/* CTA "Creer un compte"
            [BACKEND] Redirige vers /register (M2 Dallya) */}
        <PlaceholderLink className="hidden md:inline-flex btn-primary ml-auto">
          Creer un compte
        </PlaceholderLink>

        {/* Burger menu mobile */}
        <button
          className="md:hidden ml-auto p-1.5 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile deroulant */}
      {menuOpen && (
        <div className="md:hidden absolute top-navbar left-0 right-0 bg-white
                        border-b border-border-col shadow-lg px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <PlaceholderLink
              key={link.label}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-text-mid
                         rounded-lg hover:bg-primary-light hover:text-primary
                         transition-colors duration-200"
            >
              {link.label}
            </PlaceholderLink>
          ))}
          {/* [BACKEND] Redirige vers /register */}
          <PlaceholderLink className="btn-primary mt-2 justify-center">
            Creer un compte
          </PlaceholderLink>
        </div>
      )}
    </nav>
  )
}
