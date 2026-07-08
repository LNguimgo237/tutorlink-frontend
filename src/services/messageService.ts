/**
 * messageService.ts  (M7 - Willer Pegasus)
 * ------------------------------------------
 * Couche service pour la messagerie.
 * Encapsule tous les appels HTTP et la connexion socket.io.
 *
 * [BACKEND] Remplacer BASE_URL par la vraie URL du serveur
 * [BACKEND] Decommmenter les appels axios reels quand le backend est pret
 */

// import axios from 'axios'
// import { io, Socket } from 'socket.io-client'
import type { Conversation, Message, SendMessagePayload } from '../types'
import {
  MOCK_CONVERSATIONS,
  MOCK_MESSAGES,
  CURRENT_USER_ID,
} from './messagingMockData'

// [BACKEND] URL de base de l'API
// const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

// ── Simule un delai reseau (a supprimer en production) ──────────────────────
const fakeDelay = (ms = 400) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms))

// ============================================================
// CONVERSATIONS
// ============================================================

/**
 * Recupere la liste des conversations de l'utilisateur connecte.
 * [BACKEND] GET /api/conversations
 */
export async function fetchConversations(): Promise<Conversation[]> {
  await fakeDelay(600)
  // [BACKEND] return (await axios.get(`${BASE_URL}/api/conversations`)).data
  return MOCK_CONVERSATIONS
}

// ============================================================
// MESSAGES
// ============================================================

/**
 * Recupere les messages d'une conversation.
 * [BACKEND] GET /api/messages/:conversationId
 */
export async function fetchMessages(conversationId: string): Promise<Message[]> {
  await fakeDelay(400)
  // [BACKEND] return (await axios.get(`${BASE_URL}/api/messages/${conversationId}`)).data
  return MOCK_MESSAGES[conversationId] ?? []
}

/**
 * Envoie un nouveau message.
 * [BACKEND] POST /api/messages
 */
export async function sendMessage(
  payload: SendMessagePayload
): Promise<Message> {
  await fakeDelay(300)

  // [BACKEND]
  // const res = await axios.post(`${BASE_URL}/api/messages`, payload)
  // return res.data

  // Simulation locale : cree un message avec statut 'sent'
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    conversationId: payload.conversationId,
    senderId: CURRENT_USER_ID,
    content: payload.content,
    timestamp: new Date(),
    status: 'sent',
    type: payload.type,
    fileUrl: payload.fileUrl,
  }

  // Ajoute dans les donnees mock (en memoire seulement)
  if (!MOCK_MESSAGES[payload.conversationId]) {
    MOCK_MESSAGES[payload.conversationId] = []
  }
  MOCK_MESSAGES[payload.conversationId].push(newMessage)

  return newMessage
}

/**
 * Marque tous les messages d'une conversation comme lus.
 * [BACKEND] PATCH /api/conversations/:id/read
 */
export async function markAsRead(conversationId: string): Promise<void> {
  await fakeDelay(200)
  // [BACKEND] await axios.patch(`${BASE_URL}/api/conversations/${conversationId}/read`)

  // Simulation : remet le compteur a 0
  const conv = MOCK_CONVERSATIONS.find((c) => c.id === conversationId)
  if (conv) conv.unreadCount = 0
}

// ============================================================
// SOCKET.IO  (temps reel)
// [BACKEND] Decommenter quand le serveur socket est pret
// ============================================================

/*
let socket: Socket | null = null

export function connectSocket(token: string): Socket {
  socket = io(BASE_URL, {
    auth: { token },
    transports: ['websocket'],
  })

  socket.on('connect', () => console.log('[Socket] Connecte'))
  socket.on('disconnect', () => console.log('[Socket] Deconnecte'))

  return socket
}

export function onNewMessage(cb: (msg: Message) => void): void {
  socket?.on('message:new', cb)
}

export function offNewMessage(cb: (msg: Message) => void): void {
  socket?.off('message:new', cb)
}

export function onTyping(cb: (data: { userId: string; conversationId: string }) => void): void {
  socket?.on('typing:start', cb)
}

export function emitTyping(conversationId: string): void {
  socket?.emit('typing:start', { conversationId })
}

export function disconnectSocket(): void {
  socket?.disconnect()
  socket = null
}
*/

// ============================================================
// UTILITAIRES
// ============================================================

/**
 * Formate un timestamp en heure lisible (ex: "14:32" ou "hier" ou "lundi")
 */
export function formatMessageTime(date: Date): string {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMs / 3600000)
  const diffD = Math.floor(diffMs / 86400000)

  if (diffMin < 1) return "A l'instant"
  if (diffMin < 60) return `${diffMin} min`
  if (diffH < 24) return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
  if (diffD === 1) return 'Hier'
  if (diffD < 7) return date.toLocaleDateString('fr-FR', { weekday: 'long' })
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })
}

/**
 * Regroupe les messages par date pour afficher les separateurs
 */
export function groupMessagesByDate(
  messages: Message[]
): { date: string; messages: Message[] }[] {
  const groups: Record<string, Message[]> = {}

  messages.forEach((msg) => {
    const dateKey = new Date(msg.timestamp).toLocaleDateString('fr-FR', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })
    if (!groups[dateKey]) groups[dateKey] = []
    groups[dateKey].push(msg)
  })

  return Object.entries(groups).map(([date, msgs]) => ({ date, messages: msgs }))
}

export { CURRENT_USER_ID }
