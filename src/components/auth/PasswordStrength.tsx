/**
 * PasswordStrength.tsx  (M2 - Willer Pegasus)
 * ---------------------------------------------
 * Indicateur visuel de force du mot de passe.
 * Correspond a : src/components/auth/PasswordStrength.tsx
 */

import { cn } from '../../utils/cn'

interface PasswordStrengthProps {
  password: string
}

interface StrengthLevel {
  label: string
  color: string
  bars: number
}

function getStrength(pwd: string): StrengthLevel {
  if (!pwd) return { label: '', color: '', bars: 0 }
  let score = 0
  if (pwd.length >= 8)          score++
  if (pwd.length >= 12)         score++
  if (/[A-Z]/.test(pwd))        score++
  if (/[0-9]/.test(pwd))        score++
  if (/[^A-Za-z0-9]/.test(pwd)) score++

  if (score <= 1) return { label: 'Trop faible',  color: 'bg-red-500',    bars: 1 }
  if (score === 2) return { label: 'Faible',       color: 'bg-orange-400', bars: 2 }
  if (score === 3) return { label: 'Moyen',        color: 'bg-accent',     bars: 3 }
  if (score === 4) return { label: 'Fort',         color: 'bg-emerald-500',bars: 4 }
  return                  { label: 'Tres fort',    color: 'bg-emerald-600',bars: 5 }
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = getStrength(password)
  if (!password) return null

  return (
    <div className="mt-2">
      {/* Barres */}
      <div className="flex gap-1 mb-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-all duration-300',
              i < strength.bars ? strength.color : 'bg-border-col'
            )}
          />
        ))}
      </div>
      {/* Label */}
      <p className={cn(
        'text-[11px] font-semibold',
        strength.bars <= 1 ? 'text-red-500' :
        strength.bars === 2 ? 'text-orange-400' :
        strength.bars === 3 ? 'text-accent' :
        'text-emerald-500'
      )}>
        {strength.label}
      </p>
    </div>
  )
}
