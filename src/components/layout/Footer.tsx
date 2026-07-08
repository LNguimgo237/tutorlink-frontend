/**
 * Composant Footer
 * - Logo + description
 * - Liens rapides / Legal / Contact
 * - Barre de copyright
 */

import { GraduationCap } from 'lucide-react'
import PlaceholderLink from '../ui/PlaceholderLink'

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white/65 pt-16">

      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2
                      lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-12">

        {/* Colonne 1 - Marque */}
        <div>
          <img
            src="/logo-white.png"
            alt="TutorLink"
            className="h-9 w-auto object-contain mb-3"
            onError={(e) => { e.currentTarget.style.display = 'none' }}
          />
          <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-white mb-3">
            <GraduationCap size={24} className="text-accent" />
            TutorLink
          </div>
          <p className="text-sm leading-relaxed max-w-[260px]">
            La plateforme de reference du soutien scolaire a Dschang.<br />
            Projet Universite de Dschang, 2026.
          </p>
        </div>

        {/* Colonne 2 - Liens rapides
            [BACKEND] Deviendront des <Link> react-router (M1 Leonel) */}
        <div>
          <h5 className="font-heading text-sm font-bold text-white
                         tracking-wider uppercase mb-4">
            Liens rapides
          </h5>
          <ul className="space-y-2.5">
            {['Accueil', 'Trouver un repetiteur', 'Devenir repetiteur'].map((item) => (
              <li key={item}>
                <PlaceholderLink className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                  {item}
                </PlaceholderLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 3 - Legal */}
        <div>
          <h5 className="font-heading text-sm font-bold text-white
                         tracking-wider uppercase mb-4">
            Legal
          </h5>
          <ul className="space-y-2.5">
            {['Politique de confidentialite', "Conditions d'utilisation"].map((item) => (
              <li key={item}>
                <PlaceholderLink className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                  {item}
                </PlaceholderLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Colonne 4 - Contact */}
        <div>
          <h5 className="font-heading text-sm font-bold text-white
                         tracking-wider uppercase mb-4">
            Contact
          </h5>
          <ul className="space-y-2.5 text-sm text-white/55">
            <li>📧 contact@tutorlink.cm</li>
            <li>📞 +237 6XX XX XX XX</li>
            <li>📍 Dschang, Ouest Cameroun</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-sm">
        © 2025 TutorLink. Tous droits reserves.
      </div>
    </footer>
  )
}
