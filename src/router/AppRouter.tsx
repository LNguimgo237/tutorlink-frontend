/**
 * AppRouter.tsx  (M2 - Willer Pegasus)
 * --------------------------------------
 * Configuration centrale du routeur React.
 * Correspond à src/routes/ dans le plan TanStack officiel.
 *
 * Routes implementees (M2 — Willer) :
 *   /            → HomePage        (public)
 *   /inscription → InscriptionPage (public)
 *   /messagerie  → MessagingPage   (protege : necessite un compte)
 *
 * Routes a brancher par les autres membres :
 *   /connexion              → M5 Dallya
 *   /repetiteurs            → M3 Mystelle
 *   /repetiteurs/:tutorId   → M3 Mystellez
 *   /reservation/:tutorId   → M6 Melvina
 *   /eleve/dashboard        → M4 Malyse
 *   /repetiteur/dashboard   → M7 Meymouna
 *   /groupes                → M1 Leonel
 *   /groupes/:groupId       → M1 Leonel
 *   /admin/*                → M1 Leonel
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import SiteHeader    from '../components/layout/SiteHeader'
import SiteFooter    from '../components/layout/SiteFooter'
import HomePage      from '../pages/home/HomePage'
import InscriptionPage from '../pages/auth/LoginPage'
import MessagingPage from '../pages/messaging/MessagingPage'

// ── Layout public (avec header + footer) ────────────────────────────────────
function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <SiteFooter />
    </>
  )
}

// ── Route protegee (necessite connexion)
// [BACKEND] Remplacer par la vraie verification d'auth (M2 Dallya / authStore)
// Pour la maquette : on simule toujours "connecte" = true
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isAuthenticated = true // [BACKEND] authStore.isAuthenticated
  if (!isAuthenticated) {
    return <Navigate to="/connexion" replace />
  }
  return <>{children}</>
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── Pages publiques (avec SiteHeader + SiteFooter) ── */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />

        <Route
          path="/inscription"
          element={
            <PublicLayout>
              <InscriptionPage />
            </PublicLayout>
          }
        />

        {/* ── Page Connexion (M5 Dallya) — stub pour eviter les 404 ── */}
        {/* [M5 DALLYA] Remplacer ce stub par la vraie page */}
        <Route
          path="/connexion"
          element={
            <PublicLayout>
              <div className="flex items-center justify-center min-h-[60vh]">
                <p className="text-text-light font-heading">
                  Page Connexion — M5 Dallya
                </p>
              </div>
            </PublicLayout>
          }
        />

        {/* ── Messagerie (protegee) — sans SiteHeader/SiteFooter ── */}
        <Route
          path="/messagerie"
          element={
            <ProtectedRoute>
              <MessagingPage />
            </ProtectedRoute>
          }
        />

        {/* ── Stubs pour les autres membres (evite les 404) ── */}
        {/* [M3 MYSTELLE] */}
        <Route path="/repetiteurs" element={<div className="p-8 text-center text-text-light">Page Repetiteurs — M3 Mystelle</div>} />
        <Route path="/repetiteurs/:tutorId" element={<div className="p-8 text-center text-text-light">Profil Repetiteur — M3 Mystelle</div>} />

        {/* [M6 MELVINA] */}
        <Route path="/reservation/:tutorId" element={<div className="p-8 text-center text-text-light">Reservation — M6 Melvina</div>} />

        {/* [M4 MALYSE] */}
        <Route path="/eleve/dashboard" element={<div className="p-8 text-center text-text-light">Dashboard Eleve — M4 Malyse</div>} />

        {/* [M7 MEYMOUNA] */}
        <Route path="/repetiteur/dashboard" element={<div className="p-8 text-center text-text-light">Dashboard Repetiteur — M7 Meymouna</div>} />

        {/* [M1 LEONEL] */}
        <Route path="/groupes" element={<div className="p-8 text-center text-text-light">Groupes — M1 Leonel</div>} />
        <Route path="/groupes/:groupId" element={<div className="p-8 text-center text-text-light">Detail Groupe — M1 Leonel</div>} />
        <Route path="/admin/*" element={<div className="p-8 text-center text-text-light">Admin — M1 Leonel</div>} />

        {/* ── 404 ── */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  )
}
