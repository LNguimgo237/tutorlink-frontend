/**
 * MessagingPage.tsx  (M2 - Willer Pegasus)
 * ------------------------------------------
 * Route officielle : /messagerie
 * Correspond a : src/routes/messagerie.tsx (plan officiel)
 *
 * Acces reserve aux utilisateurs connectes (ProtectedRoute dans AppRouter).
 * Ajout : bouton retour vers le dashboard (eleve ou repetiteur).
 */

import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, BookOpen, Sparkles, LayoutDashboard } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useMessaging, AI_CONVERSATION_ID } from '../../hooks/useMessaging'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import ConversationList from '../../components/messaging/ConversationList'
import ChatThread from '../../components/messaging/ChatThread'
import AiChatPanel from '../../components/messaging/AiChatPanel'
import ThemeToggle from '../../components/ui/ThemeToggle'
import type { Conversation } from '../../types'

// Conversation IA injectee en tete de liste
const AI_CONVERSATION_BASE: Conversation = {
  id: AI_CONVERSATION_ID,
  participant: {
    id: 'ai',
    name: 'Assistant TutorLink',
    role: 'tutor',
    isOnline: true,
  },
  lastMessage: {
    id: 'ai-welcome',
    conversationId: AI_CONVERSATION_ID,
    senderId: 'ai',
    content: 'Bonjour ! Comment puis-je vous aider ?',
    timestamp: new Date(),
    status: 'delivered',
    type: 'text',
  },
  unreadCount: 1,
  subject: 'Assistant IA',
  isArchived: false,
  isPinned: true,
  createdAt: new Date(),
}

export default function MessagingPage() {
  const {
    conversations,
    activeConversationId,
    activeConversation,
    activeMessages,
    inputValue,
    isSending,
    isLoadingConversations,
    isLoadingMessages,
    sendError,
    searchQuery,
    messagesEndRef,
    handleSelectConversation,
    handleSendMessage,
    handleInputChange,
    handleKeyDown,
    setSearchQuery,
  } = useMessaging()

  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const [isAiRead,   setIsAiRead]   = useState(false)

  const isAiActive = activeConversationId === AI_CONVERSATION_ID

  const handleSelect = (id: string) => {
    handleSelectConversation(id)
    if (id === AI_CONVERSATION_ID) setIsAiRead(true)
    setMobileView('chat')
  }

  const aiConversation: Conversation = useMemo(
    () => ({ ...AI_CONVERSATION_BASE, unreadCount: isAiRead ? 0 : 1 }),
    [isAiRead]
  )

  // Recherche incluant la conv IA
  const allConversations = useMemo(() => {
    const q = searchQuery.toLowerCase().trim()
    const aiMatches =
      !q ||
      aiConversation.participant.name.toLowerCase().includes(q) ||
      aiConversation.subject?.toLowerCase().includes(q)
    return aiMatches ? [aiConversation, ...conversations] : conversations
  }, [aiConversation, conversations, searchQuery])

  // Titre de l'onglet avec compteur non-lus
  const totalUnread = useMemo(
    () => allConversations.reduce((s, c) => s + c.unreadCount, 0),
    [allConversations]
  )
  useDocumentTitle(totalUnread)

  return (
    <div className="flex flex-col h-dvh bg-bg-light dark:bg-slate-900 transition-colors duration-300">

      {/* ── Header messagerie ── */}
      <header className="flex items-center justify-between px-6 py-3.5
                         bg-white dark:bg-slate-800
                         border-b border-border-col dark:border-slate-700
                         shadow-[0_1px_12px_rgba(0,0,0,0.06)]
                         sticky top-0 z-20 transition-colors duration-300">
        <div className="flex items-center gap-3">

          {/* Retour mobile */}
          {mobileView === 'chat' && (
            <button
              onClick={() => setMobileView('list')}
              className="md:hidden p-2 -ml-2 rounded-xl text-text-mid dark:text-slate-300
                         hover:bg-bg-light dark:hover:bg-slate-700 transition-colors"
              aria-label="Retour a la liste"
            >
              <ArrowLeft size={20} />
            </button>
          )}

          {/* Logo / titre — clique -> accueil */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary-dark
                            flex items-center justify-center text-white
                            transition-transform duration-200 group-hover:scale-105">
              <BookOpen size={16} />
            </div>
            <div>
              <h1 className="font-heading font-bold text-base
                             text-text-dark dark:text-white leading-tight">
                Messagerie TutorLink
              </h1>
              <p className="text-xs text-text-light dark:text-slate-400">
                {conversations.length} conversation{conversations.length > 1 ? 's' : ''}
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-2">

          {/* Toggle dark/light */}
          <ThemeToggle variant="icon" />

          {/* Bouton retour Dashboard
              [BACKEND] adapter selon le role : /eleve/dashboard ou /repetiteur/dashboard
              Pour la maquette on pointe vers /eleve/dashboard (M4 Malyse) */}
          <Link
            to="/eleve/dashboard"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       text-xs font-heading font-semibold
                       bg-bg-light dark:bg-slate-700
                       text-text-mid dark:text-slate-300
                       border border-border-col dark:border-slate-600
                       hover:border-primary hover:text-primary
                       dark:hover:border-blue-400 dark:hover:text-blue-400
                       transition-all duration-200"
          >
            <LayoutDashboard size={13} />
            Tableau de bord
          </Link>

          {/* Acces rapide assistant IA */}
          <button
            onClick={() => handleSelect(AI_CONVERSATION_ID)}
            className={cn(
              'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full',
              'text-xs font-semibold transition-all duration-200',
              isAiActive
                ? 'bg-violet-100 dark:bg-violet-900/40 text-violet-600 dark:text-violet-300'
                : 'bg-bg-light dark:bg-slate-700 text-text-mid dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-violet-900/20 hover:text-violet-500'
            )}
          >
            <Sparkles size={13} />
            Assistant IA
            {!isAiRead && (
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            )}
          </button>

          <div className="w-px h-6 bg-border-col dark:bg-slate-700" />

          {/* Badge utilisateur
              [BACKEND] Remplacer par authStore (M2 Dallya) */}
          <div className="flex items-center gap-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-semibold text-text-dark dark:text-white leading-tight">
                Junior Nkoumba
              </p>
              <p className="text-xs text-text-light dark:text-slate-400">
                Eleve · Terminale D
              </p>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-orange-600
                            flex items-center justify-center
                            text-white text-sm font-heading font-bold">
              JN
            </div>
          </div>
        </div>
      </header>

      {/* ── Layout principal ── */}
      <div className="flex-1 flex overflow-hidden animate-fadeUp">

        {/* Colonne gauche — liste */}
        <div className={cn(
          'flex-shrink-0 overflow-hidden w-full md:w-[300px] lg:w-[320px]',
          mobileView === 'chat' ? 'hidden md:flex md:flex-col' : 'flex flex-col'
        )}>
          <ConversationList
            conversations={allConversations}
            activeId={activeConversationId}
            searchQuery={searchQuery}
            isLoading={isLoadingConversations}
            onSelect={handleSelect}
            onSearchChange={setSearchQuery}
          />
        </div>

        <div className="hidden md:block w-px bg-border-col dark:bg-slate-700 flex-shrink-0" />

        {/* Colonne droite — chat ou IA */}
        <div className={cn(
          'flex-1 flex flex-col overflow-hidden',
          mobileView === 'list' ? 'hidden md:flex' : 'flex'
        )}>
          {isAiActive ? (
            <AiChatPanel />
          ) : (
            <ChatThread
              conversation={activeConversation}
              messages={activeMessages}
              inputValue={inputValue}
              isSending={isSending}
              isLoadingMessages={isLoadingMessages}
              sendError={sendError}
              onInputChange={handleInputChange}
              onSend={handleSendMessage}
              onKeyDown={handleKeyDown}
              messagesEndRef={messagesEndRef}
            />
          )}
        </div>
      </div>
    </div>
  )
}
