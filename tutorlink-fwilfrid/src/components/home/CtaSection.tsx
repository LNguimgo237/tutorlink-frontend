/**
 * CtaSection.tsx  (M2 - Willer Pegasus)
 */
import { Link } from 'react-router-dom'

export default function CtaSection() {
  return (
    <section className="bg-navy py-20 px-6 text-center">
      <div className="max-w-xl mx-auto animate-fadeUp">
        <h2
          className="font-heading font-extrabold text-white mb-4"
          style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
        >
          Prêt à commencer ?
        </h2>
        <p className="text-white/82 text-lg mb-8">
          Rejoignez des centaines de familles et répétiteurs sur TutorLink
        </p>
        <Link to="/inscription" className="btn-cta">
          Créer un compte gratuit
        </Link>
      </div>
    </section>
  )
}
