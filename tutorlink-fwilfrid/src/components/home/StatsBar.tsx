/**
 * Section StatsBar
 * ─────────────────
 * 4 cartes de statistiques : répétiteurs vérifiés, élèves actifs,
 * séances réalisées, note moyenne.
 *
 * [BACKEND] Ces valeurs sont statiques pour la maquette.
 * À remplacer par un appel API GET /api/stats (à brancher avec react-query).
 */

import { ShieldCheck, Users, CalendarCheck, Star } from 'lucide-react'
import type { Stat } from '../../types'

// Données statiques — à remplacer par l'API
const STATS: Stat[] = [
  {
    icon: <ShieldCheck size={28} />,
    value: '248+',
    label: 'Répétiteurs vérifiés',
  },
  {
    icon: <Users size={28} />,
    value: '1 200+',
    label: 'Élèves actifs',
  },
  {
    icon: <CalendarCheck size={28} />,
    value: '3 450+',
    label: 'Séances réalisées',
  },
  {
    icon: <Star size={28} className="fill-accent text-accent" />,
    value: '4.8 ★',
    label: 'Note moyenne',
  },
]

export default function StatsBar() {
  return (
    <section className="bg-white py-12 border-b border-border-col">
      <div className="max-w-[1140px] mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 bg-bg-light rounded-card
                         px-6 py-5 transition-shadow duration-200
                         hover:shadow-card-md"
            >
              {/* Icône */}
              <span
                className="w-13 h-13 flex-shrink-0 flex items-center justify-center
                           bg-primary-light rounded-xl text-primary"
                style={{ width: '52px', height: '52px' }}
              >
                {stat.icon}
              </span>

              {/* Valeur + libellé */}
              <div>
                <span className="block font-heading font-extrabold text-2xl
                                 text-text-dark leading-none">
                  {stat.value}
                </span>
                <span className="block text-xs text-text-light mt-1">
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
