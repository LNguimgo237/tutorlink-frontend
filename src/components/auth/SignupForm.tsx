/**
 * SignupForm.tsx  (M2 - Willer Pegasus)
 * ---------------------------------------
 * Formulaire d'inscription pour Eleve / Parent.
 * Correspond a : src/components/auth/SignupForm.tsx
 *
 * Champs : nom, prenom, telephone, email, quartier, mot de passe, CGU.
 * Validation Zod via react-hook-form.
 * Apres soumission : OTP envoye par SMS → onOtpSent(userId, phone)
 */

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, User, Phone, Mail, MapPin, Lock } from 'lucide-react'
import { cn } from '../../utils/cn'
import PasswordStrength from './PasswordStrength'
import SocialSignupButtons from './SocialSignupButtons'
import { studentSignupSchema, type StudentSignupValues } from '../../services/auth.schemas'
import { registerStudent, QUARTIERS_DSCHANG } from '../../services/authService'

interface SignupFormProps {
  onOtpSent: (userId: string, phone: string) => void
}

export default function SignupForm({ onOtpSent }: SignupFormProps) {
  const [showPwd,    setShowPwd]    = useState(false)
  const [showCpwd,   setShowCpwd]   = useState(false)
  const [isLoading,  setIsLoading]  = useState(false)
  const [serverError,setServerError]= useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<StudentSignupValues>({
    resolver: zodResolver(studentSignupSchema),
    defaultValues: { acceptCgu: false },
  })

  const pwd = watch('password', '')

  const onSubmit = async (data: StudentSignupValues) => {
    setIsLoading(true)
    setServerError(null)
    try {
      const result = await registerStudent(data)
      onOtpSent(result.userId, result.phone)
    } catch {
      setServerError("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-0">

      {/* Connexion sociale */}
      <SocialSignupButtons
        role="student"
        onSuccess={(data) => {
          // [BACKEND] Apres OAuth, ouvrir l'OTP avec l'email du compte social
          console.log('Social signup success:', data)
          onOtpSent(data.userId, data.email)
        }}
      />

      <div className="h-4" />

      {/* Nom + Prénom */}
      <div className="grid grid-cols-2 gap-3">
        <Field label="Nom" error={errors.lastName?.message}>
          <InputWrapper icon={<User size={15} />}>
            <input
              {...register('lastName')}
              placeholder="Kamga"
              className={inputCls(!!errors.lastName)}
            />
          </InputWrapper>
        </Field>
        <Field label="Prenom" error={errors.firstName?.message}>
          <InputWrapper icon={<User size={15} />}>
            <input
              {...register('firstName')}
              placeholder="Eric"
              className={inputCls(!!errors.firstName)}
            />
          </InputWrapper>
        </Field>
      </div>

      {/* Téléphone */}
      <Field label="Telephone (Mobile Money)" error={errors.phone?.message}>
        <InputWrapper icon={<Phone size={15} />} prefix="+237">
          <input
            {...register('phone')}
            type="tel"
            placeholder="6XX XX XX XX"
            className={inputCls(!!errors.phone)}
          />
        </InputWrapper>
        <p className="text-[11px] text-text-light mt-1">
          Un code de verification sera envoye a ce numero.
        </p>
      </Field>

      {/* Email */}
      <Field label="Email" error={errors.email?.message}>
        <InputWrapper icon={<Mail size={15} />}>
          <input
            {...register('email')}
            type="email"
            placeholder="exemple@email.com"
            className={inputCls(!!errors.email)}
          />
        </InputWrapper>
      </Field>

      {/* Quartier */}
      <Field label="Quartier a Dschang" error={errors.quartier?.message}>
        <InputWrapper icon={<MapPin size={15} />}>
          <select {...register('quartier')} className={cn(inputCls(!!errors.quartier), 'pr-8')}>
            <option value="">-- Choisir un quartier --</option>
            {QUARTIERS_DSCHANG.map((q) => (
              <option key={q} value={q}>{q}</option>
            ))}
          </select>
        </InputWrapper>
      </Field>

      {/* Mot de passe */}
      <Field label="Mot de passe" error={errors.password?.message}>
        <InputWrapper icon={<Lock size={15} />}>
          <input
            {...register('password')}
            type={showPwd ? 'text' : 'password'}
            placeholder="Min. 8 caracteres"
            className={inputCls(!!errors.password)}
          />
          <button
            type="button"
            onClick={() => setShowPwd(!showPwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-mid"
          >
            {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </InputWrapper>
        <PasswordStrength password={pwd} />
      </Field>

      {/* Confirmer */}
      <Field label="Confirmer le mot de passe" error={errors.confirmPassword?.message}>
        <InputWrapper icon={<Lock size={15} />}>
          <input
            {...register('confirmPassword')}
            type={showCpwd ? 'text' : 'password'}
            placeholder="••••••••"
            className={inputCls(!!errors.confirmPassword)}
          />
          <button
            type="button"
            onClick={() => setShowCpwd(!showCpwd)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-mid"
          >
            {showCpwd ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </InputWrapper>
      </Field>

      {/* CGU */}
      <div className="flex items-start gap-2 py-2">
        <input
          {...register('acceptCgu')}
          type="checkbox"
          id="cgu"
          className="mt-0.5 w-4 h-4 accent-navy cursor-pointer"
        />
        <label htmlFor="cgu" className="text-sm text-text-mid cursor-pointer leading-relaxed">
          J'accepte les{' '}
          <span className="text-primary underline underline-offset-2 cursor-pointer">CGU</span>
          {' '}et la{' '}
          <span className="text-primary underline underline-offset-2 cursor-pointer">
            politique de confidentialite
          </span>
        </label>
      </div>
      {errors.acceptCgu && (
        <p className="text-xs text-red-500 -mt-1">{errors.acceptCgu.message}</p>
      )}

      {/* Erreur serveur */}
      {serverError && (
        <div className="text-sm text-red-500 bg-red-50 border border-red-200 px-3 py-2.5 rounded-card">
          {serverError}
        </div>
      )}

      {/* Bouton soumettre */}
      <button
        type="submit"
        disabled={isLoading}
        className={cn(
          'w-full py-3.5 rounded-card font-heading font-bold text-sm text-white',
          'bg-navy border-2 border-accent',
          'transition-all duration-200 mt-2',
          isLoading
            ? 'opacity-60 cursor-not-allowed'
            : 'hover:bg-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-card-md'
        )}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            Creation en cours...
          </span>
        ) : (
          'Creer mon compte'
        )}
      </button>
    </form>
  )
}

// ── Helpers UI ────────────────────────────────────────────────────────────────
function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-heading font-semibold text-text-mid mb-1.5">
        {label}
      </label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function InputWrapper({
  icon, prefix, children,
}: { icon: React.ReactNode; prefix?: string; children: React.ReactNode }) {
  return (
    <div className="relative flex items-center">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light z-10 flex items-center gap-1">
        {icon}
        {prefix && <span className="text-xs font-medium text-text-mid ml-0.5">{prefix}</span>}
      </span>
      <div className={cn('w-full', prefix ? '[&>input]:pl-16' : '[&>input]:pl-9 [&>select]:pl-9')}>
        {children}
      </div>
    </div>
  )
}

function inputCls(hasError: boolean) {
  return cn(
    'w-full py-2.5 pr-4 text-sm rounded-card border',
    'outline-none transition-all duration-200 bg-white',
    'focus:ring-2 focus:ring-primary/10 focus:border-primary',
    hasError
      ? 'border-red-400 bg-red-50'
      : 'border-border-col hover:border-primary/40'
  )
}
