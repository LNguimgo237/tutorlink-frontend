/**
 * RoleToggle.tsx  (M2 - Willer Pegasus)
 * ---------------------------------------
 * Selecteur de role au debut de l'inscription.
 * Correspond a : src/components/auth/RoleToggle.tsx
 *
 * Design coherent avec les boutons de la homepage :
 * - Role actif  : fond navy + bordure accent + texte blanc
 * - Role inactif : fond blanc + bordure grise + texte mid
 */

import { Users, GraduationCap } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { UserRole } from '../../types'

interface RoleToggleProps {
  value: UserRole
  onChange: (role: UserRole) => void
}

const ROLES: { value: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
  {
    value: 'student',
    label: 'Eleve / Parent',
    icon: <Users size={20} />,
    desc: 'Je cherche un repetiteur pour moi ou mon enfant',
  },
  {
    value: 'tutor',
    label: 'Repetiteur',
    icon: <GraduationCap size={20} />,
    desc: 'Je souhaite proposer des cours particuliers',
  },
]

export default function RoleToggle({ value, onChange }: RoleToggleProps) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {ROLES.map((role) => {
        const isActive = value === role.value
        return (
          <button
            key={role.value}
            type="button"
            onClick={() => onChange(role.value)}
            className={cn(
              'flex flex-col items-center gap-2 px-4 py-4 rounded-card',
              'border-2 text-sm font-heading font-semibold',
              'transition-all duration-200 cursor-pointer',
              isActive
                ? 'bg-navy text-white border-accent shadow-card-md'
                : 'bg-white text-text-mid border-border-col hover:border-primary hover:text-primary'
            )}
          >
            <span className={cn('transition-colors', isActive ? 'text-accent' : 'text-text-light')}>
              {role.icon}
            </span>
            <span>{role.label}</span>
            <span
              className={cn(
                'text-[11px] font-body font-normal text-center leading-tight',
                isActive ? 'text-white/70' : 'text-text-light'
              )}
            >
              {role.desc}
            </span>
          </button>
        )
      })}
    </div>
  )
}
