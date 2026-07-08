/**
 * GroupesVedettes.tsx  (M2 - Willer Pegasus)
 * ---------------------------------------------
 * Carrousel des groupes de repetition vedettes sur la homepage.
 * Meme mecanique que FeaturedTutors : defilement auto + fleches + dots + swipe.
 *
 * [BACKEND] GET /api/groups?featured=true&limit=6
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'
import { Link } from 'react-router-dom'
import GroupCard from './GroupCard'

import { FEATURED_GROUPS } from './groups.data'

const VISIBLE_DESKTOP = 3
const VISIBLE_MOBILE  = 1
const AUTO_PLAY_MS    = 4500

export default function GroupesVedettes() {
  const [current,    setCurrent]    = useState(0)
  const [isPaused,   setIsPaused]   = useState(false)
  const [isAnimating,setIsAnimating]= useState(false)
  const [isMobile,   setIsMobile]   = useState(false)
  const touchStartX  = useRef<number>(0)
  const intervalRef  = useRef<ReturnType<typeof setInterval> | null>(null)

  const visible  = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP
  const maxIndex = FEATURED_GROUPS.length - visible

  // Detection mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const startAuto = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      if (!isPaused) setCurrent((p) => (p >= maxIndex ? 0 : p + 1))
    }, AUTO_PLAY_MS)
  }, [isPaused, maxIndex])

  useEffect(() => {
    startAuto()
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [startAuto])

  const goTo = useCallback((index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(Math.max(0, Math.min(index, maxIndex)))
    setTimeout(() => setIsAnimating(false), 400)
    startAuto()
  }, [isAnimating, maxIndex, startAuto])

  const goPrev = () => goTo(current <= 0 ? maxIndex : current - 1)
  const goNext = () => goTo(current >= maxIndex ? 0 : current + 1)

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX }
  const handleTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
  }

  const cardWidthPct = 100 / visible

  return (
    <section className="bg-white py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6">

        {/* En-tete */}
        <p className="section-eyebrow">NOS GROUPES VEDETTES</p>
        <h2 className="section-title">Groupes de repetition</h2>
        <p className="section-sub">
          Apprenez en equipe a petit prix. Chaque groupe est anime par un
          repetiteur verifie de la plateforme.
        </p>

        {/* Carrousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Fleche gauche */}
          <NavBtn direction="left"  onClick={goPrev} disabled={isAnimating} />

          {/* Fenetre glissante */}
          <div
            className="overflow-hidden mx-10"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * cardWidthPct}%)`,
                width: `${(FEATURED_GROUPS.length / visible) * 100}%`,
              }}
            >
              {FEATURED_GROUPS.map((group) => (
                <div
                  key={group.id}
                  style={{ width: `${cardWidthPct / (FEATURED_GROUPS.length / visible)}%` }}
                  className="px-3 flex-shrink-0"
                >
                  <GroupCard group={group} />
                </div>
              ))}
            </div>
          </div>

          {/* Fleche droite */}
          <NavBtn direction="right" onClick={goNext} disabled={isAnimating} />

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={cn(
                  'rounded-full transition-all duration-300',
                  i === current
                    ? 'w-6 h-2.5 bg-primary'
                    : 'w-2.5 h-2.5 bg-border-col hover:bg-primary/40'
                )}
                aria-label={`Groupe ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          {/* [ROUTER] /groupes — M1 Leonel */}
          <Link to="/groupes" className="btn-primary">
            Voir tous les groupes →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ── Bouton de navigation ──────────────────────────────────────────────────────
function NavBtn({ direction, onClick, disabled }: {
  direction: 'left' | 'right'; onClick: () => void; disabled: boolean
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-10',
        'w-10 h-10 rounded-full bg-white border border-border-col',
        'flex items-center justify-center text-text-mid shadow-card',
        'transition-all duration-200',
        'hover:bg-primary hover:text-white hover:border-primary hover:scale-110',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        direction === 'left' ? 'left-0' : 'right-0'
      )}
      aria-label={direction === 'left' ? 'Precedent' : 'Suivant'}
    >
      {direction === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  )
}
