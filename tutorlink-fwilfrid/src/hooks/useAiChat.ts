/**
 * useAiChat.ts  (M7 - Willer Pegasus)
 * --------------------------------------
 * Hook de gestion de la conversation avec l'assistant IA.
 * Gere : historique, envoi, etat de chargement, scroll auto.
 */

import { useState, useRef, useCallback, useEffect } from 'react'
import { askAiAssistant, type AiMessage } from '../services/aiService'

// Message affiche dans l'UI (avec id unique et timestamp)
export interface AiChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  isLoading?: boolean   // true pendant que l'IA genere la reponse
}

// Message de bienvenue au premier chargement
const WELCOME_MESSAGE: AiChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: "Bonjour ! Je suis l'assistant TutorLink 🎓\n\nJe peux vous aider a :\n• Trouver le bon repetiteur\n• Repondre a vos questions scolaires\n• Expliquer le fonctionnement de la plateforme\n\nComment puis-je vous aider ?",
  timestamp: new Date(),
}

// Suggestions rapides affichees au demarrage
export const AI_SUGGESTIONS = [
  "Trouver un repetiteur en maths",
  "Comment fonctionne TutorLink ?",
  "Quels sont les tarifs ?",
  "Aide pour le BAC",
]

export function useAiChat() {
  const [messages,    setMessages]    = useState<AiChatMessage[]>([WELCOME_MESSAGE])
  const [inputValue,  setInputValue]  = useState('')
  const [isLoading,   setIsLoading]   = useState(false)
  const [error,       setError]       = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Convertit les messages UI en format API Anthropic
  const toApiHistory = (msgs: AiChatMessage[]): AiMessage[] =>
    msgs
      .filter((m) => !m.isLoading && m.id !== 'welcome')
      .map((m) => ({ role: m.role, content: m.content }))

  // Envoie un message a l'IA
  const sendMessage = useCallback(async (text?: string) => {
    const content = (text ?? inputValue).trim()
    if (!content || isLoading) return

    setInputValue('')
    setError(null)

    // Ajoute le message utilisateur
    const userMsg: AiChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content,
      timestamp: new Date(),
    }

    // Ajoute un placeholder "chargement" pour l'IA
    const loadingMsg: AiChatMessage = {
      id: `ai-loading-${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: new Date(),
      isLoading: true,
    }

    setMessages((prev) => [...prev, userMsg, loadingMsg])
    setIsLoading(true)

    try {
      // Construit l'historique avec le nouveau message utilisateur
      const history: AiMessage[] = [
        ...toApiHistory(messages),
        { role: 'user', content },
      ]

      const response = await askAiAssistant(history)

      // Remplace le placeholder par la vraie reponse
      setMessages((prev) =>
        prev.map((m) =>
          m.id === loadingMsg.id
            ? { ...m, content: response, isLoading: false }
            : m
        )
      )
    } catch {
      setError("Une erreur s'est produite. Veuillez reessayer.")
      // Supprime le placeholder en cas d'erreur
      setMessages((prev) => prev.filter((m) => m.id !== loadingMsg.id))
    } finally {
      setIsLoading(false)
    }
  }, [inputValue, isLoading, messages])

  // Gestion de la touche Entree
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }, [sendMessage])

  // Reinitialise la conversation
  const resetChat = useCallback(() => {
    setMessages([WELCOME_MESSAGE])
    setError(null)
    setInputValue('')
  }, [])

  return {
    messages,
    inputValue,
    isLoading,
    error,
    messagesEndRef,
    setInputValue,
    sendMessage,
    handleKeyDown,
    resetChat,
  }
}
