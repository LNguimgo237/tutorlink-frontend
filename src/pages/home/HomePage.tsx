/**
 * HomePage.tsx  (M2 - Willer Pegasus)
 * Route officielle : src/pages/home/HomePage.tsx
 * Correspond a : src/routes/index.tsx dans le plan TanStack
 *
 * Assemble toutes les sections de la page d'accueil dans l'ordre :
 * Hero → Stats → HowItWorks → WhyTutorLink → FeaturedTutors
 * → GroupesVedettes → Testimonials → CTA
 */

import Hero               from '../../components/home/Hero'
import StatsBar           from '../../components/home/StatsBar'
import HowItWorks         from '../../components/home/HowItWorks'
import WhyTutorLink       from '../../components/home/WhyTutorLink'
import FeaturedTutors     from '../../components/home/FeaturedTutors'
import GroupesVedettes    from '../../components/groupes/GroupesVedettes'
import TestimonialsSection from '../../components/home/TestimonialsSection'
import CtaSection         from '../../components/home/CtaSection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <StatsBar />
      <HowItWorks />
      <WhyTutorLink />
      <FeaturedTutors />
      <GroupesVedettes />
      <TestimonialsSection />
      <CtaSection />
    </main>
  )
}
