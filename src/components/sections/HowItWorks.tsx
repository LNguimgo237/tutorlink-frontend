/**
 * Section HowItWorks
 * 5 etapes numerotees expliquant le fonctionnement de TutorLink.
 */

import { Search, UserCheck, MessageCircle, CalendarDays, Star } from 'lucide-react'
import type { Step } from '../../types'

const STEPS: Step[] = [
  {
    number: '01',
    icon: <Search size={36} strokeWidth={1.8} />,
    title: 'Recherchez un repetiteur',
    description: 'Filtrez par matiere, quartier, niveau scolaire et disponibilite. Trouvez le profil ideal en quelques secondes.',
  },
  {
    number: '02',
    icon: <UserCheck size={36} strokeWidth={1.8} />,
    title: 'Verifiez le profil',
    description: "Consultez les diplomes valides, les avis d'autres eleves et la distance geographique du repetiteur.",
  },
  {
    number: '03',
    icon: <MessageCircle size={36} strokeWidth={1.8} />,
    title: 'Contactez via la messagerie',
    description: 'Echangez directement et en toute securite avec le repetiteur pour convenir des modalites.',
  },
  {
    number: '04',
    icon: <CalendarDays size={36} strokeWidth={1.8} />,
    title: 'Planifiez vos seances',
    description: 'Organisez vos rendez-vous en presentiel avec rappels automatiques J-1 par SMS et notification.',
  },
  {
    number: '05',
    icon: <Star size={36} strokeWidth={1.8} />,
    title: 'Evaluez votre experience',
    description: 'Apres chaque seance, notez votre repetiteur et laissez un avis pour aider la communaute TutorLink.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-bg-light py-24">
      <div className="max-w-[1140px] mx-auto px-6">
        <p className="section-eyebrow">COMMENT CA MARCHE</p>
        <h2 className="section-title">Comment ca fonctionne ?</h2>
        <p className="section-sub">
          Trouvez, connectez-vous et apprenez en 5 etapes simples
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {STEPS.map((step, index) => (
            <StepCard key={step.number} step={step} delay={index * 0.07} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface StepCardProps {
  step: Step
  delay: number
}

function StepCard({ step, delay }: StepCardProps) {
  return (
    <div
      className="relative bg-white/80 rounded-card px-5 py-8 text-center shadow-card transition-all duration-250 hover:-translate-y-1.5 hover:shadow-card-md animate-fadeUp group"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Numero d'etape */}
      <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-7 h-7 flex items-center justify-center bg-primary text-white text-xs font-heading font-bold rounded-full">
        {step.number}
      </span>

      {/* Icone */}
      <div className="w-[70px] h-[70px] mx-auto mb-5 mt-3 flex items-center justify-center bg-primary-light rounded-[18px] text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
        {step.icon}
      </div>

      <h4 className="font-heading font-bold text-base text-text-dark mb-2.5">
        {step.title}
      </h4>
      <p className="text-sm text-text-light leading-relaxed">
        {step.description}
      </p>
    </div>
  )
}
