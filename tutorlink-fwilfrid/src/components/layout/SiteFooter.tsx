/**
 * SiteFooter.tsx  (M2 - Willer Pegasus)
 * ----------------------------------------
 * Footer public partage.
 * Correspond a : src/components/layout/SiteFooter.tsx
 */

import { Link } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="bg-[#0f172a] text-white/65 pt-16">
      <div className="max-w-[1140px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2
                      lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 pb-12">

        {/* Marque */}
        <div>
          <div className="flex items-center gap-2 font-heading font-extrabold text-xl text-white mb-3">
            <GraduationCap size={24} className="text-accent" />
            TutorLink
          </div>
          <p className="text-sm leading-relaxed max-w-[260px]">
            La plateforme de reference du soutien scolaire a Dschang.<br />
            Projet Universite de Dschang, 2026.
          </p>
        </div>

        {/* Liens rapides */}
        <div>
          <h5 className="font-heading text-sm font-bold text-white tracking-wider uppercase mb-4">
            Plateforme
          </h5>
          <ul className="space-y-2.5">
            {[
              { label: 'Comment ca marche', to: '/#how-it-works' },
              { label: 'Devenir repetiteur', to: '/inscription' },
              { label: 'Groupes de repetition', to: '/groupes' },
              { label: 'FAQ', to: '#' },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to}
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h5 className="font-heading text-sm font-bold text-white tracking-wider uppercase mb-4">
            Legal
          </h5>
          <ul className="space-y-2.5">
            {['CGU', 'Politique de confidentialite', 'Cookies', 'Mentions legales'].map((item) => (
              <li key={item}>
                <Link to="#"
                  className="text-sm text-white/55 hover:text-white transition-colors duration-200">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="font-heading text-sm font-bold text-white tracking-wider uppercase mb-4">
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
        © 2026 TutorLink · Tous droits reserves · Made with ❤️ a Dschang
      </div>
    </footer>
  )
}
