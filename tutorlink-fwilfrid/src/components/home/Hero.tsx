/**
 * Hero.tsx  (M2 - Willer Pegasus)
 * Route : src/components/home/Hero.tsx (plan officiel)
 */

import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section
      className="relative min-h-dvh flex items-center justify-center
                 pt-navbar overflow-hidden"
    >
      {/* Image de fond — placer dans /public/images/hero.webp */}
      <div
        className="absolute inset-0 z-0 bg-navy"
        style={{
          backgroundImage: "url('/images/Hero.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      />
      {/* Overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(15,23,42,0.72) 0%, rgba(37,99,235,0.45) 100%)',
        }}
      />

      {/* Contenu */}
      <div className="relative z-20 max-w-2xl px-6 py-16 text-center
                      flex flex-col items-center animate-fadeUp">
        <h1
          className="font-heading font-medium text-white leading-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)' }}
        >
          Trouvez le meilleur répétiteur<br />près de chez vous
        </h1>

        <p className="text-white/88 text-lg mb-9 max-w-lg">
          TutorLink connecte les élèves et parents aux répétiteurs qualifiés
          et vérifiés dans votre quartier. Cours en présentiel, simples et sécurisés.
        </p>

        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {/* [M3 MYSTELLE] /repetiteurs */}
          <Link to="/repetiteurs" className="btn-primary text-base px-7 py-3.5">
            🎓 Trouver un répétiteur
          </Link>
          {/* Inscription role repetiteur */}
          <Link to="/inscription" className="btn-outline-white text-base px-7 py-3.5">
            📚 Devenir répétiteur
          </Link>
        </div>

        <a
          href="#how-it-works"
          className="inline-flex items-center gap-2 text-white/75 text-sm
                     font-medium hover:text-white transition-colors duration-200
                     animate-hero-bounce"
        >
          Comment ça marche
          <ChevronDown size={18} />
        </a>
      </div>
    </section>
  )
}
