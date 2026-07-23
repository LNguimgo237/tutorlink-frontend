/**
 * SiteHeader.tsx  (M2 - Willer Pegasus)
 * ----------------------------------------
 * Header public partage — identique a Navbar.tsx renomme.
 * Correspond a : src/components/layout/SiteHeader.tsx (plan officiel)
 *
 * Liens :
 * - Logo → /
 * - Accueil, Repetiteurs, Groupes, Comment ca marche
 * - Connexion → /connexion (M5 Dallya)
 * - S'inscrire → /inscription (M2 Willer)
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, GraduationCap } from 'lucide-react'
import { cn } from '../../utils/cn'

const NAV_LINKS = [
  { label: 'Accueil',          to: '/' },
  { label: 'Repetiteurs',      to: '/repetiteurs' },
  { label: 'Groupes',          to: '/groupes' },
  { label: 'Comment ca marche', to: '/#how-it-works' },
]

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 h-navbar z-50 bg-navy transition-shadow duration-300',
      scrolled && 'shadow-[0_2px_20px_rgba(0,0,0,0.15)]'
    )}>
      <div className="max-w-[1200px] mx-auto px-6 h-full flex items-center gap-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <GraduationCap size={28} className="text-accent" />
          <span className="font-heading font-extrabold text-xl text-white">
            TutorLink
          </span>
        </Link>

        {/* Liens desktop */}
        <ul className="hidden md:flex items-center gap-1 flex-1">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                to={link.to}
                className="text-sm font-medium text-white/85 px-3 py-1.5 rounded-lg
                           transition-colors duration-200
                           hover:bg-primary-light hover:text-primary"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3 ml-auto">
          {/* [M5 DALLYA] Connexion */}
          <Link
            to="/connexion"
            className="text-sm font-heading font-semibold text-white/85
                       border border-white/30 px-4 py-2 rounded-full
                       hover:bg-white/10 hover:text-white transition-all duration-200"
          >
            Connexion
          </Link>
          {/* Inscription */}
          <Link
            to="/inscription"
            className="btn-primary text-sm py-2.5"
          >
            S'inscrire
          </Link>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden ml-auto p-1.5 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fermer' : 'Menu'}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-navbar left-0 right-0 bg-white
                        border-b border-border-col shadow-lg px-6 py-4 flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-medium text-text-mid rounded-lg
                         hover:bg-primary-light hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/connexion" onClick={() => setMenuOpen(false)}
            className="btn-outline-white mt-2 justify-center text-text-mid
                       !text-text-mid !border-border-col hover:!border-primary">
            Connexion
          </Link>
          <Link to="/inscription" onClick={() => setMenuOpen(false)}
            className="btn-primary mt-1 justify-center">
            S'inscrire
          </Link>
        </div>
      )}
    </nav>
  )
}
