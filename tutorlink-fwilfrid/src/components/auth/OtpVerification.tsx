/**
 * OtpVerification.tsx  (M2 - Willer Pegasus)
 * --------------------------------------------
 * Ecran de verification OTP (6 chiffres).
 * Affiche le numero / email auquel le code a ete envoye.
 * Permet de renvoyer le code apres 60s.
 *
 * Le bon code en mode maquette : 123456
 */

import { useState, useRef, useEffect, useCallback } from 'react'
import { ShieldCheck, RefreshCw } from 'lucide-react'
import { cn } from '../../utils/cn'
import { verifyOtp, resendOtp } from '../../services/authService'

interface OtpVerificationProps {
  userId:    string
  contact:   string   // telephone ou email selon la methode d'inscription
  onSuccess: () => void
  onError?:  (msg: string) => void
}

const OTP_LENGTH  = 6
const RESEND_DELAY = 60  // secondes avant de pouvoir renvoyer

export default function OtpVerification({
  userId, contact, onSuccess, onError,
}: OtpVerificationProps) {
  const [digits,      setDigits]      = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [isLoading,   setIsLoading]   = useState(false)
  const [errorMsg,    setErrorMsg]    = useState<string | null>(null)
  const [countdown,   setCountdown]   = useState(RESEND_DELAY)
  const [isResending, setIsResending] = useState(false)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])

  // Compte a rebours pour "Renvoyer le code"
  useEffect(() => {
    if (countdown <= 0) return
    const t = setTimeout(() => setCountdown((c) => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown])

  // Focus auto sur le premier champ au montage
  useEffect(() => {
    inputsRef.current[0]?.focus()
  }, [])

  // Verification automatique quand tous les chiffres sont remplis
  useEffect(() => {
    if (digits.every((d) => d !== '') && !isLoading) {
      handleVerify()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digits])

  const handleVerify = useCallback(async () => {
    const code = digits.join('')
    if (code.length < OTP_LENGTH) return
    setIsLoading(true)
    setErrorMsg(null)
    try {
      const result = await verifyOtp(userId, code)
      if (result.success) {
        onSuccess()
      } else {
        setErrorMsg('Code incorrect. Verifiez votre SMS ou email.')
        setDigits(Array(OTP_LENGTH).fill(''))
        inputsRef.current[0]?.focus()
      }
    } catch {
      setErrorMsg('Erreur reseau. Veuillez reessayer.')
    } finally {
      setIsLoading(false)
    }
  }, [digits, userId, onSuccess])

  // Gestion de la saisie dans chaque case
  const handleChange = (index: number, value: string) => {
    // Accepte uniquement les chiffres
    const digit = value.replace(/\D/g, '').slice(-1)
    const next  = [...digits]
    next[index] = digit
    setDigits(next)
    setErrorMsg(null)

    // Avance au champ suivant si un chiffre a ete saisi
    if (digit && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  // Gestion du backspace
  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (digits[index]) {
        const next = [...digits]
        next[index] = ''
        setDigits(next)
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  // Coller un code depuis le presse-papiers
  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pasted) return
    const next = [...digits]
    pasted.split('').forEach((d, i) => { next[i] = d })
    setDigits(next)
    // Focus sur le dernier champ rempli
    const lastIndex = Math.min(pasted.length, OTP_LENGTH - 1)
    inputsRef.current[lastIndex]?.focus()
  }

  // Renvoyer le code OTP
  const handleResend = async () => {
    setIsResending(true)
    try {
      await resendOtp(userId)
      setCountdown(RESEND_DELAY)
      setDigits(Array(OTP_LENGTH).fill(''))
      setErrorMsg(null)
      inputsRef.current[0]?.focus()
    } catch {
      onError?.('Impossible de renvoyer le code.')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="text-center animate-fadeUp">

      {/* Icone */}
      <div className="w-16 h-16 bg-primary-light rounded-2xl
                      flex items-center justify-center mx-auto mb-4 text-primary">
        <ShieldCheck size={32} strokeWidth={1.8} />
      </div>

      <h3 className="font-heading font-bold text-xl text-text-dark mb-2">
        Verifiez votre identite
      </h3>
      <p className="text-sm text-text-light mb-1">
        Un code a 6 chiffres a ete envoye au
      </p>
      <p className="text-sm font-heading font-bold text-primary mb-6">
        {contact}
      </p>

      {/* Cases OTP */}
      <div className="flex justify-center gap-2 mb-4" onPaste={handlePaste}>
        {digits.map((digit, i) => (
          <input
            key={i}
            ref={(el) => { inputsRef.current[i] = el }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e)  => handleKeyDown(i, e)}
            disabled={isLoading}
            className={cn(
              'w-11 h-12 text-center text-xl font-heading font-bold rounded-card border-2',
              'outline-none transition-all duration-200',
              digit
                ? 'border-primary bg-primary-light text-primary'
                : 'border-border-col bg-white text-text-dark',
              'focus:border-primary focus:ring-2 focus:ring-primary/15',
              errorMsg && 'border-red-400 bg-red-50',
              isLoading && 'opacity-60 cursor-not-allowed'
            )}
          />
        ))}
      </div>

      {/* Message d'erreur */}
      {errorMsg && (
        <p className="text-sm text-red-500 mb-3 animate-fadeUp">{errorMsg}</p>
      )}

      {/* Loader */}
      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-sm text-text-light mb-3">
          <span className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          Verification en cours...
        </div>
      )}

      {/* Bouton verifier (si pas auto) */}
      {!isLoading && digits.some((d) => d === '') && (
        <button
          onClick={handleVerify}
          disabled={digits.some((d) => d === '')}
          className="btn-primary w-full justify-center mb-4 disabled:opacity-40"
        >
          Verifier le code
        </button>
      )}

      {/* Renvoyer le code */}
      <div className="flex items-center justify-center gap-2 text-sm">
        {countdown > 0 ? (
          <span className="text-text-light">
            Renvoyer dans <span className="font-semibold text-primary">{countdown}s</span>
          </span>
        ) : (
          <button
            onClick={handleResend}
            disabled={isResending}
            className="flex items-center gap-1.5 text-primary font-semibold
                       hover:text-primary-dark transition-colors"
          >
            <RefreshCw size={14} className={isResending ? 'animate-spin' : ''} />
            Renvoyer le code
          </button>
        )}
      </div>

      {/* Hint maquette */}
      <p className="text-[11px] text-text-light mt-4 bg-bg-light px-3 py-2 rounded-lg">
        Mode maquette — Code de test : <span className="font-mono font-bold">123456</span>
      </p>
    </div>
  )
}
