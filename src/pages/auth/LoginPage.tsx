/**
 * InscriptionPage.tsx  (M2 - Willer Pegasus)
 * --------------------------------------------
 * Page principale d'inscription.
 * Route : /inscription  (src/routes/inscription.tsx dans le plan officiel)
 *
 * Tunnel complet :
 *   1. Choix du role (Eleve/Parent ou Repetiteur)
 *   2a. [Eleve]     Formulaire → OTP SMS/email → Compte active
 *   2b. [Repetiteur] Formulaire 3 etapes → Compte en attente
 *
 * Layout : AuthLayout (commun avec M5 Dallya pour la Connexion)
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/auth/AuthLayout'
import RoleToggle from '../../components/auth/RoleToggle'
import SignupForm from '../../components/auth/SignupForm'
import TutorSignupForm from '../../components/auth/TutorSignupForm'
import OtpVerification from '../../components/auth/OtpVerification'
import AccountActivatedScreen from '../../components/auth/AccountActivatedScreen'
import AccountPendingScreen from '../../components/auth/AccountPendingScreen'

import type { UserRole } from '../../types'

// Etapes du tunnel d'inscription
type Step = 'role_and_form' | 'otp' | 'success' | 'pending'

export default function InscriptionPage() {
  const [role,   setRole]   = useState<UserRole>('student')
  const [step,   setStep]   = useState<Step>('role_and_form')
  const [userId, setUserId] = useState('')
  const [contact,setContact]= useState('')  // telephone ou email pour l'OTP

  // Apres soumission du formulaire eleve → aller a l'OTP
  const handleOtpSent = (uid: string, phone: string) => {
    setUserId(uid)
    setContact(phone)
    setStep('otp')
  }

  // Apres soumission du formulaire repetiteur → compte en attente
  const handleTutorPending = () => {
    setStep('pending')
  }

  // OTP valide → compte active
  const handleOtpSuccess = () => {
    setStep('success')
  }

  return (
    <AuthLayout
      ctaLabel="J'ai deja un compte"
      ctaHref="/connexion"
    >
      <div className="w-full max-w-lg">

        {/* Carte principale */}
        <div className="bg-white rounded-[20px] shadow-card-md
                        border-t-4 border-accent px-8 py-8">

          {/* ── Etape : Formulaire (role + form) ── */}
          {step === 'role_and_form' && (
            <>
              <div className="mb-6">
                <h2 className="font-heading font-bold text-2xl text-text-dark mb-1">
                  Creer votre compte
                </h2>
                <p className="text-sm text-text-light">
                  Rejoignez la communaute TutorLink Dschang.
                </p>
              </div>

              {/* Selecteur de role */}
              <div className="mb-2">
                <p className="text-sm font-heading font-semibold text-text-mid mb-3">
                  Je suis
                </p>
                <RoleToggle value={role} onChange={(r) => setRole(r)} />
              </div>

              {/* Formulaire selon le role */}
              {role === 'student' ? (
                <SignupForm onOtpSent={handleOtpSent} />
              ) : (
                <TutorSignupForm onPending={handleTutorPending} />
              )}

              {/* Lien connexion */}
              <p className="text-sm text-text-light text-center mt-5">
                Deja inscrit ?{' '}
                {/* [ROUTER] Remplacer par <Link to="/connexion"> (M5 Dallya) */}
                <Link to="/connexion" className="text-primary font-semibold hover:underline">
                  Se connecter
                </Link>
              </p>
            </>
          )}

          {/* ── Etape : Verification OTP ── */}
          {step === 'otp' && (
            <>
              {/* Bouton retour */}
              <button
                onClick={() => setStep('role_and_form')}
                className="flex items-center gap-1 text-sm text-text-light
                           hover:text-primary transition-colors mb-6"
              >
                ← Modifier mes informations
              </button>
              <OtpVerification
                userId={userId}
                contact={contact}
                onSuccess={handleOtpSuccess}
              />
            </>
          )}

          {/* ── Etape : Compte active (Eleve) ── */}
          {step === 'success' && (
            <AccountActivatedScreen />
          )}

          {/* ── Etape : Compte en attente (Repetiteur) ── */}
          {step === 'pending' && (
            <AccountPendingScreen />
          )}
        </div>
      </div>
    </AuthLayout>
  )
}
