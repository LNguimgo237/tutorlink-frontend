/**
 * ChatArea.tsx  (M7 - Willer Pegasus)
 * Panneau droit — zone de chat avec support dark mode complet.
 */

import { useRef, useEffect, useMemo } from 'react'
import {
  Send, Phone, Video, MoreVertical, Info, MessageSquareDashed,
} from 'lucide-react'
import { cn } from '../../utils/cn'
import MessageCard from './MessageCard'
import { groupMessagesByDate, CURRENT_USER_ID } from '../../services/messageService'
import type { Conversation, Message } from '../../types'

interface ChatAreaProps {
  conversation: Conversation | undefined
  messages: Message[]
  inputValue: string
  isSending: boolean
  isLoadingMessages: boolean
  sendError: string | null
  onInputChange: (v: string) => void
  onSend: () => void
  onKeyDown: (e: React.KeyboardEvent) => void
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export default function ChatArea({
  conversation, messages, inputValue, isSending,
  isLoadingMessages, sendError, onInputChange, onSend, onKeyDown, messagesEndRef,
}: ChatAreaProps) {

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const grouped = useMemo(() => groupMessagesByDate(messages), [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [conversation?.id])

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onInputChange(e.target.value)
    e.target.style.height = 'auto'
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
  }

  if (!conversation) return <EmptyState />

  const { participant } = conversation

  return (
    <div className="flex flex-col h-full
                    bg-[#f8fafc] dark:bg-slate-900
                    transition-colors duration-300">

      {/* En-tete */}
      <header className="flex items-center justify-between px-5 py-3.5
                         bg-white dark:bg-slate-800
                         border-b border-border-col dark:border-slate-700
                         shadow-[0_1px_8px_rgba(0,0,0,0.04)]
                         transition-colors duration-300">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br
                            from-primary to-primary-dark
                            flex items-center justify-center
                            text-white text-sm font-heading font-bold">
              {participant.name[0]}
            </div>
            {participant.isOnline && (
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500
                               border-2 border-white dark:border-slate-800 rounded-full" />
            )}
          </div>
          <div>
            <h3 className="font-heading font-bold text-sm
                           text-text-dark dark:text-white leading-tight">
              {participant.name}
            </h3>
            <p className="text-xs mt-0.5">
              {participant.isOnline ? (
                <span className="text-emerald-500 font-medium">En ligne</span>
              ) : participant.lastSeen ? (
                <span className="text-text-light dark:text-slate-400">
                  Vu {new Date(participant.lastSeen).toLocaleTimeString('fr-FR', {
                    hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              ) : (
                <span className="text-text-light dark:text-slate-400">Hors ligne</span>
              )}
              {conversation.subject && (
                <span className="text-primary dark:text-blue-400 font-semibold ml-1.5">
                  · {conversation.subject}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* [BACKEND] Appel audio */}
          <HeaderBtn icon={<Phone size={17} />} label="Appel" />
          {/* [BACKEND] Appel video */}
          <HeaderBtn icon={<Video size={17} />} label="Video" />
          <HeaderBtn icon={<Info size={17} />} label="Infos" />
          <HeaderBtn icon={<MoreVertical size={17} />} label="Plus" />
        </div>
      </header>

      {/* Zone messages */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-1">

        {isLoadingMessages && (
          <div className="flex flex-col gap-4 pt-4">
            {[1, 2, 3].map((i) => <SkeletonBubble key={i} isOwn={i % 2 === 0} />)}
          </div>
        )}

        {!isLoadingMessages && grouped.map(({ date, messages: dayMsgs }) => (
          <div key={date} className="flex flex-col gap-1.5">
            <DateSeparator label={date} />
            {dayMsgs.map((msg, idx) => {
              const isOwn     = msg.senderId === CURRENT_USER_ID
              const prevMsg   = dayMsgs[idx - 1]
              const showAvatar = !isOwn && (!prevMsg || prevMsg.senderId !== msg.senderId)
              return (
                <MessageCard
                  key={msg.id}
                  message={msg}
                  isOwn={isOwn}
                  showAvatar={showAvatar}
                  senderName={showAvatar ? participant.name : undefined}
                />
              )
            })}
          </div>
        ))}

        {/* Indicateur "en train d'ecrire"
            [BACKEND] Declenche par l'evenement socket 'typing:start' */}
        {participant.isOnline && <TypingIndicator name={participant.name} />}

        {/* Erreur d'envoi — meme style que le panneau IA pour coherence */}
        {sendError && (
          <div className="text-xs text-red-500 dark:text-red-400
                          bg-red-50 dark:bg-red-900/20
                          border border-red-200 dark:border-red-800
                          px-3 py-2 rounded-lg animate-fadeUp">
            {sendError}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Barre de saisie */}
      <div className="px-4 py-3
                      bg-white dark:bg-slate-800
                      border-t border-border-col dark:border-slate-700
                      shadow-[0_-1px_8px_rgba(0,0,0,0.04)]
                      transition-colors duration-300">
        <div className="flex items-end gap-3
                        bg-bg-light dark:bg-slate-700/50
                        rounded-2xl border border-border-col dark:border-slate-600
                        px-4 py-2.5
                        focus-within:border-primary dark:focus-within:border-blue-400
                        focus-within:ring-2 focus-within:ring-primary/10 dark:focus-within:ring-blue-400/15
                        transition-all duration-200">
          <textarea
            ref={inputRef}
            value={inputValue}
            onChange={handleTextareaChange}
            onKeyDown={onKeyDown}
            placeholder="Ecrire un message..."
            rows={1}
            className="flex-1 bg-transparent text-sm
                       text-text-dark dark:text-white
                       placeholder:text-text-light dark:placeholder:text-slate-500
                       resize-none outline-none leading-relaxed max-h-[120px] py-1"
            style={{ minHeight: '24px' }}
          />
          <button
            onClick={onSend}
            disabled={!inputValue.trim() || isSending}
            className={cn(
              'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center',
              'transition-all duration-200',
              inputValue.trim() && !isSending
                ? 'bg-primary text-white hover:bg-primary-dark hover:scale-105 shadow-[0_4px_12px_rgba(37,99,235,0.4)]'
                : 'bg-border-col dark:bg-slate-600 text-text-light cursor-not-allowed'
            )}
            aria-label="Envoyer"
          >
            {isSending
              ? <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              : <Send size={16} />
            }
          </button>
        </div>
        {/* Astuce clavier — masquee sur tactile, pas de touche Entree physique */}
        <p className="hidden md:block text-[11px] text-text-light dark:text-slate-500 text-center mt-1.5">
          Appuyez sur{' '}
          <kbd className="font-mono bg-gray-100 dark:bg-slate-700 px-1 py-0.5 rounded text-[10px]">
            Entree
          </kbd>{' '}
          pour envoyer
        </p>
      </div>
    </div>
  )
}

function HeaderBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="p-2 rounded-xl text-text-light dark:text-slate-400
                 hover:text-primary dark:hover:text-blue-400
                 hover:bg-primary-light dark:hover:bg-blue-900/20
                 transition-all duration-200"
      aria-label={label} title={label}
    >
      {icon}
    </button>
  )
}

function DateSeparator({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 my-3">
      <div className="flex-1 h-px bg-border-col dark:bg-slate-700" />
      <span className="text-[11px] font-semibold
                       text-text-light dark:text-slate-500
                       bg-[#f8fafc] dark:bg-slate-900 px-2 capitalize">
        {label}
      </span>
      <div className="flex-1 h-px bg-border-col dark:bg-slate-700" />
    </div>
  )
}

function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-end gap-2 animate-fadeUp">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-dark
                      flex items-center justify-center text-white text-[10px] font-bold">
        {name[0]}
      </div>
      <div className="bg-white dark:bg-slate-800
                      border border-border-col dark:border-slate-700
                      rounded-2xl rounded-bl-sm px-4 py-3 shadow-card">
        <div className="flex items-center gap-1.5 h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 bg-text-light dark:bg-slate-500 rounded-full"
              style={{ animation: 'typingDot 1.2s ease infinite', animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function SkeletonBubble({ isOwn }: { isOwn: boolean }) {
  return (
    <div className={cn('flex gap-2 animate-pulse', isOwn && 'flex-row-reverse')}>
      {!isOwn && <div className="w-7 h-7 rounded-full bg-gray-200 dark:bg-slate-700 flex-shrink-0" />}
      <div className={cn('h-10 rounded-2xl bg-gray-200 dark:bg-slate-700', isOwn ? 'w-48' : 'w-56')} />
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4
                    bg-bg-light dark:bg-slate-900 text-center px-8
                    transition-colors duration-300">
      <div className="w-20 h-20 rounded-2xl
                      bg-primary-light dark:bg-primary/10
                      flex items-center justify-center text-primary dark:text-blue-400">
        <MessageSquareDashed size={40} strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-heading font-bold text-text-dark dark:text-white text-lg mb-2">
          Selectionnez une conversation
        </h3>
        <p className="text-sm text-text-light dark:text-slate-400 max-w-xs">
          Choisissez une conversation dans la liste pour afficher les messages
          et communiquer avec votre repetiteur.
        </p>
      </div>
    </div>
  )
}
