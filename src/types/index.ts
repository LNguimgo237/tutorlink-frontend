/**
 * Types TypeScript partagés dans toute l'application TutorLink
 * Chaque interface reflète les données renvoyées par l'API backend
 */

// ── Répétiteur (carte + profil) ──────────────────────────────────────────────
export interface Tutor {
  id: string
  name: string
  subject: string       // Ex : "Mathématiques • Terminale C/D"
  description: string
  location: string      // Ex : "Centre Dschang"
  rating: number        // 0–5
  reviewCount: number
  pricePerHour: number  // En FCFA
  imageUrl: string
  verified: boolean
}

// ── Statistique homepage ──────────────────────────────────────────────────────
export interface Stat {
  icon: React.ReactNode
  value: string
  label: string
}

// ── Étape "Comment ça marche" ─────────────────────────────────────────────────
export interface Step {
  number: string        // "01", "02" …
  icon: React.ReactNode
  title: string
  description: string
}

// ── Fonctionnalité (section Features) ────────────────────────────────────────
export interface Feature {
  imageUrl: string
  imageAlt: string
  title: string
  description: string
}

// ── Lien de navigation ────────────────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
}

// ============================================================
// MESSAGERIE (M7 - Willer Pegasus)
// ============================================================

// Statut d'un message
export type MessageStatus = 'sending' | 'sent' | 'delivered' | 'read'

// Un message individuel dans une conversation
export interface Message {
  id: string
  conversationId: string
  senderId: string          // ID de l'expediteur
  content: string
  timestamp: Date
  status: MessageStatus
  type: 'text' | 'image' | 'file'
  fileUrl?: string          // si type = 'image' | 'file'
  fileName?: string
}

// Un participant a une conversation (eleve ou repetiteur)
export interface Participant {
  id: string
  name: string
  avatarUrl?: string        // photo de profil (optionnel)
  role: 'student' | 'tutor'
  isOnline: boolean
  lastSeen?: Date
}

// Une conversation (thread entre eleve et repetiteur)
export interface Conversation {
  id: string
  participant: Participant  // l'autre personne (pas soi-meme)
  lastMessage?: Message
  unreadCount: number
  subject?: string          // matiere concernee (ex: "Mathematiques")
  isArchived: boolean
  isPinned: boolean
  createdAt: Date
}

// Payload pour envoyer un nouveau message
// [BACKEND] POST /api/messages
export interface SendMessagePayload {
  conversationId: string
  content: string
  type: 'text' | 'image' | 'file'
  fileUrl?: string
}

// Etat global de la messagerie (zustand store)
export interface MessagingState {
  conversations: Conversation[]
  activeConversationId: string | null
  messages: Record<string, Message[]>  // key = conversationId
  isLoadingConversations: boolean
  isLoadingMessages: boolean
  isSending: boolean
  searchQuery: string
  currentUserId: string
}

// ============================================================
// INSCRIPTION  (M2 - Willer Pegasus)
// ============================================================

// Role de l'utilisateur lors de l'inscription
export type UserRole = 'student' | 'tutor'

// Etapes du tunnel d'inscription
export type SignupStep = 'role' | 'form' | 'otp' | 'pending' | 'success'

// Donnees communes aux deux types de comptes
export interface SignupBaseData {
  lastName:   string
  firstName:  string
  phone:      string
  email:      string
  quartier:   string
  password:   string
  confirmPassword: string
  acceptCgu:  boolean
}

// Donnees supplementaires pour le repetiteur
export interface TutorSignupData extends SignupBaseData {
  // Informations academiques
  diploma:     string   // ex: "Licence Mathematiques"
  university:  string   // ex: "Universite de Dschang"
  graduationYear: string
  // Matieres et niveaux
  subjects:    string[] // ex: ["Mathematiques", "Physique"]
  levels:      string[] // ex: ["Terminale C", "Premiere D"]
  // Tarif horaire
  hourlyRate:  number   // en FCFA
  // Zone d'intervention
  zones:       string[] // quartiers
  // Documents (upload)
  cniFile?:    File
  cvFile?:     File
  bio:         string
}

// ============================================================
// GROUPES DE REPETITION  (M1 Leonel - partage avec M2)
// ============================================================

export interface TutoringGroup {
  id:          string
  name:        string   // ex: "Groupe La Reussite"
  emoji:       string   // ex: "🏆"
  adminName:   string   // Nom du repetiteur responsable
  adminId:     string
  subjects:    string[]
  levels:      string[]
  location:    string
  maxStudents: number
  currentStudents: number
  pricePerHour: number  // en FCFA
  rating:      number
  reviewCount: number
  description: string
  verified:    boolean
}
