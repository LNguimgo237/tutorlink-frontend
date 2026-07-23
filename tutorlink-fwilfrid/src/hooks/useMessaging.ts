/**
 * useMessaging.ts  (M7 - Willer Pegasus)
 * ----------------------------------------
 * Hook principal de la messagerie.
 * Gere : chargement des conversations, messages actifs,
 *        envoi, recherche, marquage lu, conversation active unique.
 *
 * Le store Zustand est la SEULE source de verite pour la conversation
 * active (activeConversationId), y compris pour l'assistant IA.
 * Cela evite toute desynchronisation entre composants.
 */

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { create } from 'zustand'
import type { Conversation, Message, MessagingState } from '../types'
import {
  fetchConversations,
  fetchMessages,
  sendMessage,
  markAsRead,
  CURRENT_USER_ID,
} from '../services/messageService'
import type { SendMessagePayload } from '../types'

// ID special de la conversation IA — partage entre tous les composants
export const AI_CONVERSATION_ID = 'ai-assistant'

// ============================================================
// ZUSTAND STORE — etat global de la messagerie
// ============================================================
interface MessagingStore extends MessagingState {
  setConversations: (convs: Conversation[]) => void
  setActiveConversation: (id: string | null) => void
  setMessages: (convId: string, msgs: Message[]) => void
  addMessage: (convId: string, msg: Message) => void
  setSearchQuery: (q: string) => void
  setLoadingConversations: (v: boolean) => void
  setLoadingMessages: (v: boolean) => void
  setSending: (v: boolean) => void
  decrementUnread: (convId: string) => void
}

export const useMessagingStore = create<MessagingStore>((set) => ({
  conversations: [],
  activeConversationId: null,
  messages: {},
  isLoadingConversations: false,
  isLoadingMessages: false,
  isSending: false,
  searchQuery: '',
  currentUserId: CURRENT_USER_ID,

  setConversations: (convs) => set({ conversations: convs }),
  setActiveConversation: (id) => set({ activeConversationId: id }),
  setMessages: (convId, msgs) =>
    set((s) => ({ messages: { ...s.messages, [convId]: msgs } })),
  addMessage: (convId, msg) =>
    set((s) => ({
      messages: { ...s.messages, [convId]: [...(s.messages[convId] ?? []), msg] },
      conversations: s.conversations.map((c) =>
        c.id === convId ? { ...c, lastMessage: msg } : c
      ),
    })),
  setSearchQuery: (q) => set({ searchQuery: q }),
  setLoadingConversations: (v) => set({ isLoadingConversations: v }),
  setLoadingMessages: (v) => set({ isLoadingMessages: v }),
  setSending: (v) => set({ isSending: v }),
  decrementUnread: (convId) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === convId ? { ...c, unreadCount: 0 } : c
      ),
    })),
}))

// ============================================================
// HOOK PRINCIPAL
// ============================================================
export function useMessaging() {
  const store = useMessagingStore()
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sendError, setSendError] = useState<string | null>(null)
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Charge les conversations au montage
  useEffect(() => {
    async function load() {
      store.setLoadingConversations(true)
      const convs = await fetchConversations()
      store.setConversations(convs)
      store.setLoadingConversations(false)

      // Ouvre la premiere conversation par defaut (jamais l'IA au demarrage)
      if (convs.length > 0 && !store.activeConversationId) {
        store.setActiveConversation(convs[0].id)
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Charge les messages quand la conversation active change
  // (ignore l'IA, geree separement par useAiChat)
  useEffect(() => {
    const convId = store.activeConversationId
    if (!convId || convId === AI_CONVERSATION_ID) return

    async function loadMessages() {
      store.setLoadingMessages(true)
      const msgs = await fetchMessages(convId!)
      store.setMessages(convId!, msgs)
      store.setLoadingMessages(false)
      markAsRead(convId!)
      store.decrementUnread(convId!)
    }

    if (!store.messages[convId]) {
      loadMessages()
    } else {
      // Conversation deja en memoire : marque quand meme comme lue
      store.decrementUnread(convId)
    }
  }, [store.activeConversationId])

  // Scroll auto vers le dernier message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [store.messages, store.activeConversationId])

  // Selectionner une conversation (humaine ou IA)
  const handleSelectConversation = useCallback((id: string) => {
    store.setActiveConversation(id)
    setInputValue('')
  }, [])

  // Envoyer un message
  const handleSendMessage = useCallback(async () => {
    const text = inputValue.trim()
    if (!text || !store.activeConversationId || store.isSending) return
    if (store.activeConversationId === AI_CONVERSATION_ID) return // gere par useAiChat

    setInputValue('')
    setSendError(null)
    store.setSending(true)

    const payload: SendMessagePayload = {
      conversationId: store.activeConversationId,
      content: text,
      type: 'text',
    }

    try {
      const newMsg = await sendMessage(payload)
      store.addMessage(store.activeConversationId, newMsg)
    } catch {
      setSendError("Le message n'a pas pu etre envoye. Verifiez votre connexion.")
      // Remet le texte dans le champ pour ne pas le perdre
      setInputValue(text)
    } finally {
      store.setSending(false)
    }
  }, [inputValue, store])

  // Gestion de la frappe (indicateur "en train d'ecrire")
  const handleInputChange = useCallback((value: string) => {
    setInputValue(value)
    // [BACKEND] emitTyping(store.activeConversationId!)
    setIsTyping(true)
    if (typingTimer.current) clearTimeout(typingTimer.current)
    typingTimer.current = setTimeout(() => setIsTyping(false), 2000)
  }, [])

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSendMessage()
      }
    },
    [handleSendMessage]
  )

  // Conversations filtrees par la recherche (memoise pour la perf)
  const filteredConversations = useMemo(() => {
    const q = store.searchQuery.toLowerCase().trim()
    if (!q) return store.conversations
    return store.conversations.filter((c) =>
      c.participant.name.toLowerCase().includes(q) ||
      c.subject?.toLowerCase().includes(q) ||
      c.lastMessage?.content.toLowerCase().includes(q)
    )
  }, [store.conversations, store.searchQuery])

  const activeConversation = store.conversations.find(
    (c) => c.id === store.activeConversationId
  )

  const activeMessages = store.activeConversationId
    ? (store.messages[store.activeConversationId] ?? [])
    : []

  return {
    conversations: filteredConversations,
    activeConversationId: store.activeConversationId,
    activeConversation,
    activeMessages,
    inputValue,
    isTyping,
    sendError,
    currentUserId: store.currentUserId,
    isLoadingConversations: store.isLoadingConversations,
    isLoadingMessages: store.isLoadingMessages,
    isSending: store.isSending,
    searchQuery: store.searchQuery,
    messagesEndRef,

    handleSelectConversation,
    handleSendMessage,
    handleInputChange,
    handleKeyDown,
    setSearchQuery: store.setSearchQuery,
    clearSendError: () => setSendError(null),
  }
}
