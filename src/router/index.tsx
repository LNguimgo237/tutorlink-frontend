import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const ReservationPage = lazy(() => import('@/routes/reservation/tutorld'))

export const AppRouter = () => (
  <Suspense fallback={<div>Chargement...</div>}>
    <Routes>
      <Route path="/reservation/:tutorId" element={<ReservationPage />} />
      <Route path="*" element={<div style={{ textAlign: 'center', padding: 40 }}>Page non trouvée</div>} />
    </Routes>
  </Suspense>
)