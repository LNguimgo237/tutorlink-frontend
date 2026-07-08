/**
 * FeaturedTutors.tsx  (M2 - Willer Pegasus)
 * Carrousel des repetiteurs vedettes.
 * Correspond a : src/components/home/FeaturedTutors.tsx
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { Tutor } from '../../types'

const FEATURED_TUTORS: Tutor[] = [
  { id: '1', name: 'M. Kamga Eric',    subject: 'Mathematiques - Terminale C/D', description: "10 ans d'experience dans l'enseignement secondaire.", location: 'Centre Dschang', rating: 4.9, reviewCount: 87, pricePerHour: 3500, imageUrl: '/images/tutors/kamga-eric.jpg',    verified: true },
  { id: '2', name: 'Mme Tchana Sylvie', subject: 'Physique-Chimie - Lycee',       description: "Doctorante en physique a l'Universite de Dschang.",  location: 'Foto',           rating: 4.8, reviewCount: 64, pricePerHour: 3000, imageUrl: '/images/tutors/tchana-sylvie.jpg', verified: true },
  { id: '3', name: 'Mlle Fotso Aline',  subject: 'Anglais - Tous niveaux',         description: 'Methode immersive et conversationnelle.',             location: 'Centre Dschang', rating: 4.9, reviewCount: 73, pricePerHour: 2800, imageUrl: '/images/tutors/fotso-aline.jpg',   verified: true },
  { id: '4', name: 'M. Nana Bertrand',  subject: 'Francais - College & Lycee',     description: 'Specialiste de la dissertation.',                     location: 'Ngui Dschang',   rating: 4.7, reviewCount: 52, pricePerHour: 2500, imageUrl: '/images/tutors/nana-bertrand.jpg', verified: true },
  { id: '5', name: 'M. Tagne Junior',   subject: 'Informatique - Lycee',            description: 'Ingenieur logiciel, Python et algorithmique.',        location: 'Foto',           rating: 4.8, reviewCount: 41, pricePerHour: 3200, imageUrl: '/images/tutors/tagne-junior.jpg',  verified: true },
  { id: '6', name: 'Mme Mbouh Carine',  subject: 'SVT - 3eme & Lycee',             description: 'Preparation rigoureuse au BEPC et BAC D.',            location: 'Ngui Dschang',   rating: 4.6, reviewCount: 38, pricePerHour: 2700, imageUrl: '/images/tutors/mbouh-carine.jpg',  verified: false },
]

const VISIBLE_DESKTOP = 3
const VISIBLE_MOBILE  = 1
const AUTO_PLAY_MS    = 4000

export default function FeaturedTutors() {
  const [current,     setCurrent]     = useState(0)
  const [isPaused,    setIsPaused]    = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMobile,    setIsMobile]    = useState(false)
  const touchStartX = useRef<number>(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const visible  = isMobile ? VISIBLE_MOBILE : VISIBLE_DESKTOP
  const maxIndex = FEATURED_TUTORS.length - visible

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

  const cardWidthPct = 100 / visible

  return (
    <section className="bg-bg-light py-24 overflow-hidden">
      <div className="max-w-[1140px] mx-auto px-6">
        <p className="section-eyebrow">NOS MEILLEURS REPETITEURS</p>
        <h2 className="section-title">Nos répétiteurs vedettes</h2>
        <p className="section-sub">Découvrez les enseignants les mieux notés de TutorLink Dschang.</p>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <NavBtn direction="left"  onClick={goPrev} disabled={isAnimating} />
          <div
            className="overflow-hidden mx-10"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
            onTouchEnd={(e) => {
              const diff = touchStartX.current - e.changedTouches[0].clientX
              if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev()
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${current * cardWidthPct}%)`,
                width: `${(FEATURED_TUTORS.length / visible) * 100}%`,
              }}
            >
              {FEATURED_TUTORS.map((tutor) => (
                <div
                  key={tutor.id}
                  style={{ width: `${cardWidthPct / (FEATURED_TUTORS.length / visible)}%` }}
                  className="px-3 flex-shrink-0"
                >
                  <TutorCard tutor={tutor} />
                </div>
              ))}
            </div>
          </div>
          <NavBtn direction="right" onClick={goNext} disabled={isAnimating} />

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={cn('rounded-full transition-all duration-300',
                  i === current ? 'w-6 h-2.5 bg-primary' : 'w-2.5 h-2.5 bg-border-col hover:bg-primary/40'
                )}
              />
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          {/* [M3 MYSTELLE] */}
          <Link to="/repetiteurs" className="btn-primary">
            Voir tous les répétiteurs →
          </Link>
        </div>
      </div>
    </section>
  )
}

function NavBtn({ direction, onClick, disabled }: { direction: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  return (
    <button onClick={onClick} disabled={disabled}
      className={cn(
        'absolute top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full',
        'bg-white border border-border-col flex items-center justify-center',
        'text-text-mid shadow-card transition-all duration-200',
        'hover:bg-primary hover:text-white hover:border-primary hover:scale-110',
        'disabled:opacity-40 disabled:cursor-not-allowed',
        direction === 'left' ? 'left-0' : 'right-0'
      )}>
      {direction === 'left' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  )
}

function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <div className="bg-white rounded-card overflow-hidden border border-border-col
                    transition-all duration-300 hover:-translate-y-2 hover:shadow-card-md group h-full flex flex-col">
      <div className="relative h-[220px] overflow-hidden flex-shrink-0">
        <img src={tutor.imageUrl} alt={tutor.name} loading="lazy" decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"
          onError={(e) => { e.currentTarget.style.display = 'none' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {tutor.verified && (
          <span className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1.5 rounded-full">
            ✓ Verifie
          </span>
        )}
        <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100
                        transition-all duration-300 translate-y-2 group-hover:translate-y-0">
          <span className="bg-white/95 text-primary font-heading font-bold text-sm px-3 py-1 rounded-full shadow">
            {tutor.pricePerHour.toLocaleString('fr-FR')} FCFA/h
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className="font-heading font-bold text-base text-text-dark leading-tight">{tutor.name}</h4>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={13} className="fill-accent text-accent" />
            <span className="text-sm font-bold text-accent">{tutor.rating}</span>
          </div>
        </div>
        <p className="text-primary text-xs font-semibold mb-2">{tutor.subject}</p>
        <p className="text-text-light text-xs leading-relaxed mb-3 flex-1">{tutor.description}</p>
        <div className="flex items-center justify-between text-xs text-text-mid mb-4">
          <div className="flex items-center gap-1"><MapPin size={12} className="text-text-light" /><span>{tutor.location}</span></div>
          <span>{tutor.reviewCount} avis</span>
        </div>
        {/* [M3 MYSTELLE] */}
        <Link to={`/repetiteurs/${tutor.id}`} className="btn-primary justify-center text-xs py-2.5">
          Voir le profil
        </Link>
      </div>
    </div>
  )
}
