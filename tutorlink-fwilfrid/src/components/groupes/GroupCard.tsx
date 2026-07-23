/**
 * GroupCard.tsx  (M2 - Willer Pegasus, partage avec M1 Leonel)
 * Correspond a : src/components/groupes/GroupCard.tsx
 */

import { Link } from 'react-router-dom'
import { MapPin, Star, Users } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { TutoringGroup } from '../../types'

interface GroupCardProps {
  group: TutoringGroup
}

export default function GroupCard({ group }: GroupCardProps) {
  const isFull    = group.currentStudents >= group.maxStudents
  const spotsLeft = group.maxStudents - group.currentStudents
  const fillPct   = Math.round((group.currentStudents / group.maxStudents) * 100)

  return (
    <div className="bg-white rounded-card border border-border-col overflow-hidden
                    transition-all duration-300 hover:-translate-y-2 hover:shadow-card-md
                    group flex flex-col h-full">

      {/* En-tete */}
      <div className="bg-gradient-to-br from-navy to-primary px-5 py-4
                      flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none">{group.emoji}</span>
          <div>
            <h4 className="font-heading font-bold text-white text-base leading-tight">
              {group.name}
            </h4>
            <p className="text-white/70 text-xs mt-0.5">par {group.adminName}</p>
          </div>
        </div>
        {group.verified && (
          <span className="bg-accent/20 border border-accent/40 text-accent
                           text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0">
            ✓ Verifie
          </span>
        )}
      </div>

      {/* Corps */}
      <div className="p-5 flex flex-col flex-1">

        {/* Matieres */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {group.subjects.map((s) => (
            <span key={s}
              className="text-[11px] font-semibold bg-primary-light text-primary
                         px-2.5 py-0.5 rounded-full">
              {s}
            </span>
          ))}
        </div>

        <p className="text-sm text-text-light leading-relaxed mb-4 flex-1">
          {group.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-text-light mb-3">
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{group.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star size={12} className="fill-accent text-accent" />
            <span className="font-bold text-accent">{group.rating}</span>
            <span>({group.reviewCount})</span>
          </div>
        </div>

        {/* Barre de remplissage */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1 text-xs text-text-mid">
              <Users size={12} />
              <span>{group.currentStudents} / {group.maxStudents} eleves</span>
            </div>
            {isFull ? (
              <span className="text-[10px] font-bold text-red-500 bg-red-50
                               border border-red-200 px-2 py-0.5 rounded-full">
                Complet
              </span>
            ) : (
              <span className="text-[10px] font-semibold text-emerald-600">
                {spotsLeft} place{spotsLeft > 1 ? 's' : ''} dispo
              </span>
            )}
          </div>
          <div className="h-1.5 bg-bg-light rounded-full overflow-hidden">
            <div
              className={cn(
                'h-full rounded-full transition-all duration-500',
                isFull ? 'bg-red-400' : fillPct >= 75 ? 'bg-accent' : 'bg-emerald-500'
              )}
              style={{ width: `${fillPct}%` }}
            />
          </div>
        </div>

        {/* Prix + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <span className="font-heading font-bold text-text-dark text-base">
              {group.pricePerHour.toLocaleString('fr-FR')} FCFA
            </span>
            <span className="text-xs text-text-light"> / heure</span>
          </div>
          {/* [M1 LEONEL] /groupes/:id */}
          <Link
            to={`/groupes/${group.id}`}
            className={cn(
              'text-xs font-heading font-bold px-4 py-2 rounded-full',
              'transition-all duration-200',
              isFull
                ? 'bg-bg-light text-text-light border border-border-col'
                : 'bg-navy text-white border-2 border-accent hover:bg-primary hover:border-primary'
            )}
          >
            {isFull ? "Liste d'attente" : 'Rejoindre'}
          </Link>
        </div>
      </div>
    </div>
  )
}
