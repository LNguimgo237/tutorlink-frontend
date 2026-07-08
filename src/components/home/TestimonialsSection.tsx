/**
 * TestimonialsSection.tsx — Carrousel des temoignages
 * -----------------------------------------------------
 * Section temoignages avec carrousel automatique.
 *
 * Fonctionnalites :
 * - Defilement automatique toutes les 5s
 * - Transition fondu + glissement vertical
 * - Navigation dots
 * - Citation mise en valeur avec guillemets decoratifs
 * - Avatar + nom + role + note en etoiles
 * - Badge de matiere
 *
 * [BACKEND] Donnees statiques — remplacer par :
 * useQuery({ queryKey: ['reviews','featured'], queryFn: fetchFeaturedReviews })
 * Endpoint : GET /api/reviews?featured=true&limit=6
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '../../utils/cn'

// Type temoignage
interface Testimonial {
  id: string
  authorName: string
  authorRole: string      // "Parent" | "Eleve - Terminale D"
  avatarInitials: string
  avatarColor: string     // classe Tailwind gradient
  rating: number
  subject: string         // matiere concernee
  tutorName: string       // repetiteur concerne
  content: string
}

// Donnees fictives — [BACKEND] a remplacer par l'API
const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    authorName: 'Talla Mireille',
    authorRole: 'Parent - Terminale C',
    avatarInitials: 'TM',
    avatarColor: 'from-cyan-500 to-sky-700',
    rating: 5,
    subject: 'Mathematiques',
    tutorName: 'M. Kamga Eric',
    content:
      "Mon fils a gagne 4 points de moyenne en mathematiques en seulement deux mois. M. Kamga est tres pedagogique, patient et toujours a l'heure. Je recommande vivement TutorLink a tous les parents de Dschang.",
  },
  {
    id: '2',
    authorName: 'Junior Nkoumba',
    authorRole: 'Eleve - Terminale D',
    avatarInitials: 'JN',
    avatarColor: 'from-blue-500 to-blue-700',
    rating: 5,
    subject: 'Mathematiques',
    tutorName: 'M. Kamga Eric',
    content:
      "Avant TutorLink, j'avais 8/20 en maths. Apres 3 mois avec M. Kamga, j'ai eu 16/20 au BAC blanc. Il explique les integrales et les probabilites d'une facon que je comprends enfin. Merci TutorLink !",
  },
  {
    id: '3',
    authorName: 'Ngono Christelle',
    authorRole: 'Eleve - Premiere S',
    avatarInitials: 'NC',
    avatarColor: 'from-emerald-500 to-teal-700',
    rating: 5,
    subject: 'Physique-Chimie',
    tutorName: 'Mme Tchana Sylvie',
    content:
      "Mme Tchana est une excellente professeure. Elle explique la mecanique et l'electricite avec des exemples concrets. Grace a elle, la physique est devenue ma matiere preferee. Je recommande a 100%.",
  },
  {
    id: '4',
    authorName: 'Fokou Cedric',
    authorRole: 'Eleve - Terminale A',
    avatarInitials: 'FC',
    avatarColor: 'from-rose-500 to-pink-700',
    rating: 5,
    subject: 'Anglais',
    tutorName: 'Mlle Fotso Aline',
    content:
      "J'avais peur de parler anglais. Apres 2 mois avec Mlle Fotso, je discute couramment. Sa methode immersive est vraiment efficace. La plateforme TutorLink est simple a utiliser et tres professionnelle.",
  },
  {
    id: '5',
    authorName: 'Mbouh Patrick',
    authorRole: 'Parent - 3eme',
    avatarInitials: 'MP',
    avatarColor: 'from-amber-500 to-orange-600',
    rating: 5,
    subject: 'Francais',
    tutorName: 'M. Nana Bertrand',
    content:
      "Ma fille a reussi son BEPC avec mention grace a M. Nana. Il a su la motiver et lui apprendre a structurer ses dissertations. TutorLink nous a permis de trouver exactement le bon repetiteur pres de chez nous.",
  },
  {
    id: '6',
    authorName: 'Kenfack Sophie',
    authorRole: 'Eleve - Terminale C',
    avatarInitials: 'KS',
    avatarColor: 'from-cyan-500 to-blue-600',
    rating: 4,
    subject: 'Informatique',
    tutorName: 'M. Tagne Junior',
    content:
      "M. Tagne m'a appris Python et les bases du developpement web en quelques semaines. Il est patient et tres competent. Je n'aurais jamais pense coder un jour. TutorLink change vraiment la vie des etudiants de Dschang.",
  },
]

const AUTO_PLAY_MS = 5000

export default function TestimonialsSection() {
  const [current,    setCurrent]    = useState(0)
  const [isPaused,   setIsPaused]   = useState(false)
  const [isExiting,  setIsExiting]  = useState(false)
  const [direction,  setDirection]  = useState<'next' | 'prev'>('next')
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const touchStartX  = useRef<number>(0)
  const total = TESTIMONIALS.length

  // Transition entre les slides
  const goTo = useCallback((next: number, dir: 'next' | 'prev' = 'next') => {
    setDirection(dir)
    setIsExiting(true)
    setTimeout(() => {
      setCurrent((next + total) % total)
      setIsExiting(false)
    }, 280)

    if (intervalRef.current) clearInterval(intervalRef.current)
  }, [total])

  const goPrev = () => goTo(current - 1, 'prev')
  const goNext = () => goTo(current + 1, 'next')

  // Swipe tactile mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev()
    }
  }

  // Auto-play
  useEffect(() => {
    if (isPaused) return
    intervalRef.current = setInterval(() => {
      goTo(current + 1, 'next')
    }, AUTO_PLAY_MS)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [current, isPaused, goTo])

  const t = TESTIMONIALS[current]

  return (
    <section className="bg-navy py-24 overflow-hidden">
      <div className="max-w-[900px] mx-auto px-6">

        {/* En-tete */}
        <p className="section-eyebrow" style={{ color: '#f59e0b' }}>
          TEMOIGNAGES
        </p>
        <h2 className="section-title" style={{ color: '#ffffff' }}>
          Ils nous font confiance
        </h2>
        <p className="section-sub" style={{ color: 'rgba(255,255,255,0.65)' }}>
          Des centaines de familles et d'eleves ont transforme leur parcours scolaire grace a TutorLink.
        </p>

        {/* Carrousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carte temoignage */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className={cn(
              'bg-white/10 backdrop-blur-sm border border-white/15',
              'rounded-[20px] p-8 md:p-10 relative',
              'transition-all duration-300 select-none touch-pan-y',
              isExiting
                ? direction === 'next'
                  ? 'opacity-0 -translate-y-4'
                  : 'opacity-0 translate-y-4'
                : 'opacity-100 translate-y-0'
            )}
          >
            {/* Guillemet decoratif */}
            <div className="absolute top-6 right-8 opacity-10">
              <Quote size={80} className="text-white fill-white" />
            </div>

            {/* Etoiles */}
            <div className="flex gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={cn(
                    i < t.rating
                      ? 'fill-accent text-accent'
                      : 'fill-white/20 text-white/20'
                  )}
                />
              ))}
            </div>

            {/* Contenu */}
            <blockquote className="text-white/90 text-base md:text-lg leading-relaxed
                                   font-body mb-8 relative z-10">
              &ldquo;{t.content}&rdquo;
            </blockquote>

            {/* Auteur */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div
                  className={cn(
                    'w-12 h-12 rounded-full bg-gradient-to-br flex-shrink-0',
                    'flex items-center justify-center text-white font-heading font-bold',
                    t.avatarColor
                  )}
                >
                  {t.avatarInitials}
                </div>
                <div>
                  <p className="font-heading font-bold text-white text-sm">
                    {t.authorName}
                  </p>
                  <p className="text-white/60 text-xs mt-0.5">
                    {t.authorRole}
                  </p>
                </div>
              </div>

              {/* Badge tuteur + matiere */}
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-white/50">Cours avec</span>
                <span className="text-xs font-semibold text-white bg-white/10
                                 px-3 py-1 rounded-full border border-white/20">
                  {t.tutorName}
                </span>
                <span className="text-[11px] text-accent font-semibold">
                  {t.subject}
                </span>
              </div>
            </div>
          </div>

          {/* Fleches navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5
                         flex items-center justify-center text-white/70
                         hover:bg-white/15 hover:text-white hover:border-white/40
                         transition-all duration-200"
              aria-label="Precedent"
            >
              <ChevronLeft size={18} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === current
                      ? 'w-6 h-2.5 bg-accent'
                      : 'w-2.5 h-2.5 bg-white/25 hover:bg-white/50'
                  )}
                  aria-label={`Temoignage ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/5
                         flex items-center justify-center text-white/70
                         hover:bg-white/15 hover:text-white hover:border-white/40
                         transition-all duration-200"
              aria-label="Suivant"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Compteur */}
          <p className="text-center text-white/35 text-xs mt-4 font-heading">
            {current + 1} / {total}
          </p>
        </div>
      </div>
    </section>
  )
}
