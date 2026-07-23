/**
 * AccountPendingScreen.tsx  (M2 - Willer Pegasus)
 * Ecran affiché au répétiteur après soumission de son dossier.
 * Son compte est EN ATTENTE — aucun accès à la plateforme.
 */

import { Link } from 'react-router-dom'
import { Clock, CheckCircle2, FileText, ShieldCheck, Mail } from 'lucide-react'

export default function AccountPendingScreen() {
  return (
    <div className="text-center animate-fadeUp max-w-md mx-auto">

      {/* Icone principale */}
      <div className="relative mx-auto w-20 h-20 mb-6">
        <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
          <Clock size={36} className="text-accent" />
        </div>
        <span className="absolute -top-1 -right-1 w-7 h-7 bg-accent rounded-full
                         flex items-center justify-center text-white">
          <CheckCircle2 size={14} />
        </span>
      </div>

      <h3 className="font-heading font-bold text-2xl text-text-dark mb-3">
        Dossier soumis avec succes !
      </h3>

      <p className="text-text-light text-sm leading-relaxed mb-6">
        Votre dossier a bien ete recu et est en cours d'examen par notre equipe.
        Vous recevrez une notification par SMS et email des que votre profil sera valide.
      </p>

      {/* Etapes de validation */}
      <div className="bg-bg-light rounded-card p-5 mb-6 text-left space-y-4">
        <h4 className="font-heading font-bold text-sm text-text-dark mb-3">
          Processus de validation
        </h4>
        {[
          { icon: <FileText size={16} />,   label: 'Verification des documents', desc: 'CNI et CV examines par notre equipe',     status: 'current' },
          { icon: <ShieldCheck size={16} />, label: 'Validation du profil',       desc: 'Confirmation de vos qualifications',      status: 'pending' },
          { icon: <Mail size={16} />,        label: 'Notification',               desc: "SMS + email d'activation de votre compte", status: 'pending' },
        ].map((step, i) => (
          <div key={i} className="flex items-start gap-3">
            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center
              ${step.status === 'current' ? 'bg-accent text-white' : 'bg-border-col text-text-light'}`}>
              {step.icon}
            </div>
            <div>
              <p className={`text-sm font-semibold ${step.status === 'current' ? 'text-text-dark' : 'text-text-light'}`}>
                {step.label}
              </p>
              <p className="text-xs text-text-light mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delai */}
      <div className="bg-amber-50 border border-amber-200 rounded-card px-4 py-3 mb-6">
        <p className="text-sm text-amber-800">
          ⏱️ Delai de traitement habituel : <span className="font-bold">24 à 48 heures</span> ouvrables.
        </p>
      </div>

      <Link to="/" className="btn-primary justify-center w-full mb-3 inline-flex">
        Retour a l'accueil
      </Link>

      <p className="text-xs text-text-light">
        Une question ? <span className="text-primary font-medium">contact@tutorlink.cm</span>
      </p>
    </div>
  )
}
