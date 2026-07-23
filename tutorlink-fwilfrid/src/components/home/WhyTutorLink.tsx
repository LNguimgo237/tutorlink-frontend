/**
 * Section FeaturesSection
 * 6 cartes fonctionnalites avec image + titre + description.
 * Images a placer dans /public/images/features/
 */

import type { Feature } from '../../types'

const FEATURES: Feature[] = [
  {
    imageUrl:    '/images/features/search.png',
    imageAlt:    'Recherche intelligente',
    title:       'Recherche intelligente',
    description: 'Filtrez par matiere, quartier, tarif et disponibilite. Trouvez le bon repetiteur en quelques secondes.',
  },
  {
    imageUrl:    '/images/features/verified.jpg',
    imageAlt:    'Repetiteurs verifies',
    title:       'Repetiteurs verifies',
    description: "Chaque repetiteur soumet ses diplomes et CNI. L'administrateur valide manuellement chaque dossier.",
  },
  {
    imageUrl:    '/images/features/messagerie.jpg',
    imageAlt:    'Messagerie securisee',
    title:       'Messagerie securisee',
    description: 'Discutez directement avec les repetiteurs pour convenir des modalites et organiser vos seances.',
  },
  {
    imageUrl:    '/images/features/agenda.jpg',
    imageAlt:    'Gestion des RDV',
    title:       'Gestion des RDV',
    description: 'Planifiez vos seances en presentiel avec rappels automatiques J-1 par SMS et notification push.',
  },
  {
    imageUrl:    '/images/features/evaluation.jpg',
    imageAlt:    "Systeme d'evaluation",
    title:       "Systeme d'evaluation",
    description: 'Notez vos seances de 1 a 5 etoiles et laissez des avis pour maintenir un standard de qualite eleve.',
  },
  {
    imageUrl:    '/images/features/geolocalisation.webp',
    imageAlt:    'Geolocalisation',
    title:       'Geolocalisation',
    description: 'Visualisez la distance entre vous et les repetiteurs pour minimiser les frais de transport.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1140px] mx-auto px-6">
        <p className="section-eyebrow">NOS FONCTIONNALITES</p>
        <h2 className="section-title">Tout ce dont vous avez besoin</h2>
        <p className="section-sub">
          Une plateforme complete pour un apprentissage reussi
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FeatureCardProps {
  feature: Feature
}

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-white border border-border-col rounded-card overflow-hidden transition-all duration-250 hover:-translate-y-1.5 hover:shadow-card-md group">
      {/* Zone image — ratio 16/9 */}
      <div className="relative w-full overflow-hidden bg-bg-light" style={{ aspectRatio: '16/9' }}>
        <img
          src={feature.imageUrl}
          alt={feature.imageAlt}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-400 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(15,23,42,0.08)]" />
      </div>
      <h4 className="font-heading font-bold text-base text-text-dark px-5 pt-5 pb-2">
        {feature.title}
      </h4>
      <p className="text-sm text-text-light px-5 pb-5 leading-relaxed">
        {feature.description}
      </p>
    </div>
  )
}
