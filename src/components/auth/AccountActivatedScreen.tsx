/**
 * AccountActivatedScreen.tsx  (M2 - Willer Pegasus)
 * Ecran de succes apres verification OTP reussie.
 */

import { Link } from 'react-router-dom'
import { CheckCircle2, Sparkles } from 'lucide-react'

export default function AccountActivatedScreen() {
  return (
    <div className="text-center animate-fadeUp max-w-md mx-auto">

      <div className="relative mx-auto w-20 h-20 mb-6">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center
                        animate-[pulse_2s_ease_3]">
          <CheckCircle2 size={40} className="text-emerald-500" />
        </div>
        <span className="absolute -top-1 -right-1 w-7 h-7 bg-accent rounded-full
                         flex items-center justify-center">
          <Sparkles size={14} className="text-white" />
        </span>
      </div>

      <h3 className="font-heading font-bold text-2xl text-text-dark mb-3">
        Compte active ! 🎉
      </h3>
      <p className="text-text-light text-sm leading-relaxed mb-8">
        Votre compte TutorLink est desormais actif. Vous pouvez maintenant
        trouver le meilleur repetiteur pres de chez vous a Dschang.
      </p>

      <div className="space-y-3">
        {/* [M4 MALYSE] Dashboard eleve */}
        <Link to="/eleve/dashboard"
          className="btn-primary justify-center w-full text-base py-3.5 inline-flex">
          Acceder a mon espace →
        </Link>
        {/* [M3 MYSTELLE] Liste repetiteurs */}
        <Link to="/repetiteurs"
          className="w-full py-3 rounded-full font-heading font-semibold text-sm
                     border-2 border-border-col text-text-mid hover:border-primary
                     hover:text-primary transition-all duration-200 flex justify-center">
          Chercher un repetiteur
        </Link>
      </div>
    </div>
  )
}
