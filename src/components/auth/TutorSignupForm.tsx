/**
 * TutorSignupForm.tsx  (M2 - Willer Pegasus)
 * ---------------------------------------------
 * Formulaire d'inscription pour les Repetiteurs.
 * Champs : infos perso + academique + matieres/niveaux + CNI + CV.
 * Apres soumission → compte EN ATTENTE de validation admin.
 */

import { useState, useRef } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Eye, EyeOff, User, Phone, Mail, MapPin, Lock,
  GraduationCap, BookOpen, Upload, X, CheckCircle2,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import PasswordStrength from './PasswordStrength'
import SocialSignupButtons from './SocialSignupButtons'
import { tutorSignupSchema, type TutorSignupValues } from '../../services/auth.schemas'
import {
  registerTutor,
  QUARTIERS_DSCHANG,
  MATIERES,
  NIVEAUX,
} from '../../services/authService'

interface TutorSignupFormProps {
  onPending: () => void
}

// Sections du formulaire repetiteur
type Section = 'personal' | 'academic' | 'documents'

export default function TutorSignupForm({ onPending }: TutorSignupFormProps) {
  const [section,    setSection]    = useState<Section>('personal')
  const [showPwd,    setShowPwd]    = useState(false)
  const [showCpwd,   setShowCpwd]   = useState(false)
  const [isLoading,  setIsLoading]  = useState(false)
  const [serverError,setServerError]= useState<string | null>(null)
  const [cniFile,    setCniFile]    = useState<File | null>(null)
  const [cvFile,     setCvFile]     = useState<File | null>(null)
  const cniInputRef = useRef<HTMLInputElement>(null)
  const cvInputRef  = useRef<HTMLInputElement>(null)

  const {
    register,
    handleSubmit,
    watch,
    control,
    trigger,
    formState: { errors },
  } = useForm<TutorSignupValues>({
    resolver: zodResolver(tutorSignupSchema),
    defaultValues: {
      subjects: [],
      levels:   [],
      zones:    [],
      hourlyRate: 2500,
      acceptCgu: false,
    },
  })

  const pwd = watch('password', '')

  // Navigation entre sections avec validation partielle
  const goToSection = async (next: Section) => {
    const fieldsToValidate: (keyof TutorSignupValues)[] =
      section === 'personal'
        ? ['lastName','firstName','phone','email','quartier','password','confirmPassword','acceptCgu']
        : section === 'academic'
        ? ['diploma','university','graduationYear','subjects','levels','hourlyRate','zones','bio']
        : []

    const ok = await trigger(fieldsToValidate)
    if (ok) setSection(next)
  }

  const onSubmit = async (data: TutorSignupValues) => {
    setIsLoading(true)
    setServerError(null)
    try {
      await registerTutor(data, cniFile ?? undefined, cvFile ?? undefined)
      onPending()
    } catch {
      setServerError("Une erreur est survenue. Veuillez reessayer.")
    } finally {
      setIsLoading(false)
    }
  }

  // Stepper UI
  const STEPS: { id: Section; label: string; num: number }[] = [
    { id: 'personal',  label: 'Informations', num: 1 },
    { id: 'academic',  label: 'Profil',        num: 2 },
    { id: 'documents', label: 'Documents',     num: 3 },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>

      {/* Stepper */}
      <div className="flex items-center gap-0 mb-6">
        {STEPS.map((step, i) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className={cn(
              'flex items-center gap-2 flex-1',
              i < STEPS.length - 1 && 'mr-0'
            )}>
              <div className={cn(
                'w-7 h-7 rounded-full flex items-center justify-center',
                'text-xs font-heading font-bold flex-shrink-0 transition-all duration-200',
                section === step.id
                  ? 'bg-navy text-accent border-2 border-accent'
                  : STEPS.findIndex(s => s.id === section) > i
                    ? 'bg-primary text-white'
                    : 'bg-border-col text-text-light'
              )}>
                {STEPS.findIndex(s => s.id === section) > i
                  ? <CheckCircle2 size={14} />
                  : step.num
                }
              </div>
              <span className={cn(
                'text-xs font-heading font-semibold hidden sm:block',
                section === step.id ? 'text-navy' : 'text-text-light'
              )}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                'h-px flex-1 mx-2 transition-all duration-300',
                STEPS.findIndex(s => s.id === section) > i
                  ? 'bg-primary'
                  : 'bg-border-col'
              )} />
            )}
          </div>
        ))}
      </div>

      {/* ══ SECTION 1 : Informations personnelles ══ */}
      {section === 'personal' && (
        <div className="animate-fadeUp space-y-0">
          <SocialSignupButtons
            role="tutor"
            onSuccess={(data) => {
              console.log('Tutor social signup:', data)
              // [BACKEND] Pre-remplir les champs avec les donnees du compte social
            }}
          />
          <div className="h-4" />

          <div className="grid grid-cols-2 gap-3">
            <Field label="Nom" error={errors.lastName?.message}>
              <InputIcon icon={<User size={15} />}>
                <input {...register('lastName')} placeholder="Kamga" className={iCls(!!errors.lastName)} />
              </InputIcon>
            </Field>
            <Field label="Prenom" error={errors.firstName?.message}>
              <InputIcon icon={<User size={15} />}>
                <input {...register('firstName')} placeholder="Eric" className={iCls(!!errors.firstName)} />
              </InputIcon>
            </Field>
          </div>

          <Field label="Telephone (Mobile Money)" error={errors.phone?.message}>
            <InputIcon icon={<Phone size={15} />} prefix="+237">
              <input {...register('phone')} type="tel" placeholder="6XX XX XX XX" className={iCls(!!errors.phone)} />
            </InputIcon>
          </Field>

          <Field label="Email" error={errors.email?.message}>
            <InputIcon icon={<Mail size={15} />}>
              <input {...register('email')} type="email" placeholder="exemple@email.com" className={iCls(!!errors.email)} />
            </InputIcon>
          </Field>

          <Field label="Quartier a Dschang" error={errors.quartier?.message}>
            <InputIcon icon={<MapPin size={15} />}>
              <select {...register('quartier')} className={cn(iCls(!!errors.quartier), 'pr-8')}>
                <option value="">-- Choisir --</option>
                {QUARTIERS_DSCHANG.map(q => <option key={q} value={q}>{q}</option>)}
              </select>
            </InputIcon>
          </Field>

          <Field label="Mot de passe" error={errors.password?.message}>
            <InputIcon icon={<Lock size={15} />}>
              <input {...register('password')} type={showPwd ? 'text' : 'password'}
                placeholder="Min. 8 caracteres" className={iCls(!!errors.password)} />
              <ToggleEye show={showPwd} onToggle={() => setShowPwd(!showPwd)} />
            </InputIcon>
            <PasswordStrength password={pwd} />
          </Field>

          <Field label="Confirmer" error={errors.confirmPassword?.message}>
            <InputIcon icon={<Lock size={15} />}>
              <input {...register('confirmPassword')} type={showCpwd ? 'text' : 'password'}
                placeholder="••••••••" className={iCls(!!errors.confirmPassword)} />
              <ToggleEye show={showCpwd} onToggle={() => setShowCpwd(!showCpwd)} />
            </InputIcon>
          </Field>

          <div className="flex items-start gap-2 py-2">
            <input {...register('acceptCgu')} type="checkbox" id="cgu-t"
              className="mt-0.5 w-4 h-4 accent-navy cursor-pointer" />
            <label htmlFor="cgu-t" className="text-sm text-text-mid cursor-pointer leading-relaxed">
              J'accepte les <span className="text-primary underline cursor-pointer">CGU</span>
              {' '}et la <span className="text-primary underline cursor-pointer">politique de confidentialite</span>
            </label>
          </div>
          {errors.acceptCgu && <p className="text-xs text-red-500">{errors.acceptCgu.message}</p>}

          <NavBtn onClick={() => goToSection('academic')} label="Continuer — Profil academique →" />
        </div>
      )}

      {/* ══ SECTION 2 : Profil académique ══ */}
      {section === 'academic' && (
        <div className="animate-fadeUp space-y-0">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Diplome" error={errors.diploma?.message}>
              <InputIcon icon={<GraduationCap size={15} />}>
                <input {...register('diploma')} placeholder="Licence Mathematiques" className={iCls(!!errors.diploma)} />
              </InputIcon>
            </Field>
            <Field label="Annee d'obtention" error={errors.graduationYear?.message}>
              <input {...register('graduationYear')} placeholder="2022"
                className={cn(iCls(!!errors.graduationYear), 'pl-4')} />
            </Field>
          </div>

          <Field label="Etablissement" error={errors.university?.message}>
            <InputIcon icon={<BookOpen size={15} />}>
              <input {...register('university')} placeholder="Universite de Dschang"
                className={iCls(!!errors.university)} />
            </InputIcon>
          </Field>

          {/* Matieres enseignees */}
          <Field label="Matieres enseignees (une ou plusieurs)" error={(errors.subjects as { message?: string })?.message}>
            <Controller
              control={control}
              name="subjects"
              render={({ field }) => (
                <CheckboxGrid
                  options={MATIERES}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
          </Field>

          {/* Niveaux */}
          <Field label="Niveaux enseignes" error={(errors.levels as { message?: string })?.message}>
            <Controller
              control={control}
              name="levels"
              render={({ field }) => (
                <CheckboxGrid
                  options={NIVEAUX}
                  value={field.value}
                  onChange={field.onChange}
                  columns={2}
                />
              )}
            />
          </Field>

          {/* Tarif */}
          <Field label="Tarif horaire (FCFA)" error={errors.hourlyRate?.message}>
            <div className="relative">
              <input
                {...register('hourlyRate', { valueAsNumber: true })}
                type="number"
                min={1000}
                max={20000}
                step={500}
                placeholder="3500"
                className={cn(iCls(!!errors.hourlyRate), 'pl-4 pr-16')}
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-light font-semibold">
                FCFA/h
              </span>
            </div>
          </Field>

          {/* Zones d'intervention */}
          <Field label="Zones d'intervention (quartiers)" error={(errors.zones as { message?: string })?.message}>
            <Controller
              control={control}
              name="zones"
              render={({ field }) => (
                <CheckboxGrid
                  options={QUARTIERS_DSCHANG}
                  value={field.value}
                  onChange={field.onChange}
                  columns={3}
                />
              )}
            />
          </Field>

          {/* Bio */}
          <Field label="Presentation (bio)" error={errors.bio?.message}>
            <textarea
              {...register('bio')}
              rows={3}
              placeholder="Decrivez votre experience, votre methode pedagogique et ce qui vous distingue..."
              className={cn(iCls(!!errors.bio), 'pl-4 resize-none leading-relaxed')}
            />
            <p className="text-[11px] text-text-light mt-1">
              {watch('bio', '').length} / 500 caracteres (min 30)
            </p>
          </Field>

          <div className="flex gap-3">
            <button type="button" onClick={() => setSection('personal')}
              className="flex-1 py-3 rounded-card border-2 border-border-col text-text-mid
                         font-heading font-semibold text-sm hover:border-primary hover:text-primary
                         transition-all duration-200">
              ← Retour
            </button>
            <NavBtn onClick={() => goToSection('documents')} label="Documents →" className="flex-1" />
          </div>
        </div>
      )}

      {/* ══ SECTION 3 : Documents ══ */}
      {section === 'documents' && (
        <div className="animate-fadeUp space-y-4">
          {/* Info banniere */}
          <div className="bg-amber-50 border border-amber-200 rounded-card p-3 text-sm text-amber-800">
            <p className="font-semibold mb-1">📋 Documents requis</p>
            <p>Ces documents seront examines par notre equipe avant l'activation de votre profil.</p>
          </div>

          {/* Upload CNI */}
          <UploadZone
            label="Carte Nationale d'Identite (CNI)"
            hint="Scan ou photo nette — JPEG, PNG ou PDF — max 5 Mo"
            accept=".jpg,.jpeg,.png,.pdf"
            file={cniFile}
            inputRef={cniInputRef}
            onSelect={setCniFile}
            onRemove={() => setCniFile(null)}
            required
          />

          {/* Upload CV */}
          <UploadZone
            label="Curriculum Vitae (CV)"
            hint="PDF recommande — max 5 Mo"
            accept=".pdf,.doc,.docx"
            file={cvFile}
            inputRef={cvInputRef}
            onSelect={setCvFile}
            onRemove={() => setCvFile(null)}
            required
          />

          {/* Erreur serveur */}
          {serverError && (
            <div className="text-sm text-red-500 bg-red-50 border border-red-200 px-3 py-2.5 rounded-card">
              {serverError}
            </div>
          )}

          <div className="flex gap-3">
            <button type="button" onClick={() => setSection('academic')}
              className="flex-1 py-3 rounded-card border-2 border-border-col text-text-mid
                         font-heading font-semibold text-sm hover:border-primary hover:text-primary
                         transition-all duration-200">
              ← Retour
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={cn(
                'flex-1 py-3 rounded-card font-heading font-bold text-sm text-white',
                'bg-navy border-2 border-accent transition-all duration-200',
                isLoading
                  ? 'opacity-60 cursor-not-allowed'
                  : 'hover:bg-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-card-md'
              )}>
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Envoi du dossier...
                </span>
              ) : (
                'Soumettre mon dossier'
              )}
            </button>
          </div>

          <p className="text-[11px] text-text-light text-center">
            Votre profil sera active apres verification de vos documents (sous 24-48h).
          </p>
        </div>
      )}
    </form>
  )
}

// ── CheckboxGrid ──────────────────────────────────────────────────────────────
function CheckboxGrid({
  options, value, onChange, columns = 2,
}: {
  options: string[]
  value: string[]
  onChange: (v: string[]) => void
  columns?: number
}) {
  const toggle = (opt: string) => {
    onChange(
      value.includes(opt)
        ? value.filter((v) => v !== opt)
        : [...value, opt]
    )
  }
  return (
    <div className={cn('grid gap-2', columns === 2 ? 'grid-cols-2' : 'grid-cols-3')}>
      {options.map((opt) => {
        const checked = value.includes(opt)
        return (
          <label key={opt}
            className={cn(
              'flex items-center gap-2 px-3 py-2 rounded-card border cursor-pointer',
              'text-xs font-medium transition-all duration-150',
              checked
                ? 'border-primary bg-primary-light text-primary'
                : 'border-border-col hover:border-primary/40 text-text-mid'
            )}>
            <input
              type="checkbox"
              checked={checked}
              onChange={() => toggle(opt)}
              className="w-3.5 h-3.5 accent-navy"
            />
            {opt}
          </label>
        )
      })}
    </div>
  )
}

// ── UploadZone ────────────────────────────────────────────────────────────────
function UploadZone({
  label, hint, accept, file, inputRef, onSelect, onRemove, required,
}: {
  label: string; hint: string; accept: string
  file: File | null; inputRef: React.RefObject<HTMLInputElement | null>
  onSelect: (f: File) => void; onRemove: () => void; required?: boolean
}) {
  return (
    <div>
      <p className="text-sm font-heading font-semibold text-text-mid mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      {file ? (
        <div className="flex items-center gap-3 px-4 py-3 rounded-card border-2
                        border-primary bg-primary-light">
          <CheckCircle2 size={18} className="text-primary flex-shrink-0" />
          <span className="text-sm text-primary font-medium truncate flex-1">{file.name}</span>
          <button type="button" onClick={onRemove}
            className="text-text-light hover:text-red-500 transition-colors">
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full py-6 border-2 border-dashed border-border-col rounded-card
                     flex flex-col items-center gap-2 text-text-light
                     hover:border-primary hover:text-primary hover:bg-primary-light
                     transition-all duration-200">
          <Upload size={22} />
          <span className="text-sm font-semibold">Cliquer pour uploader</span>
          <span className="text-xs">{hint}</span>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0]
          if (f) onSelect(f)
        }}
      />
    </div>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-heading font-semibold text-text-mid mb-1.5">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}

function InputIcon({ icon, prefix, children }: { icon: React.ReactNode; prefix?: string; children: React.ReactNode }) {
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

function ToggleEye({ show, onToggle }: { show: boolean; onToggle: () => void }) {
  return (
    <button type="button" onClick={onToggle}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text-mid">
      {show ? <EyeOff size={15} /> : <Eye size={15} />}
    </button>
  )
}

function NavBtn({ onClick, label, className }: { onClick: () => void; label: string; className?: string }) {
  return (
    <button type="button" onClick={onClick}
      className={cn(
        'w-full py-3 rounded-card font-heading font-bold text-sm text-white',
        'bg-navy border-2 border-accent mt-2',
        'hover:bg-primary hover:border-primary hover:-translate-y-0.5 hover:shadow-card-md',
        'transition-all duration-200',
        className
      )}>
      {label}
    </button>
  )
}

function iCls(hasError: boolean) {
  return cn(
    'w-full py-2.5 pr-4 text-sm rounded-card border outline-none',
    'transition-all duration-200 bg-white',
    'focus:ring-2 focus:ring-primary/10 focus:border-primary',
    hasError ? 'border-red-400 bg-red-50' : 'border-border-col hover:border-primary/40'
  )
}
