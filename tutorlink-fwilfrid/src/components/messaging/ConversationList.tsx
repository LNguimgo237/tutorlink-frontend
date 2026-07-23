/**
 * ConversationList.tsx  (M7 - Willer Pegasus)
 * Panneau gauche — liste des conversations + support dark mode + badge IA.
 */

import { Search, Pin, Archive, Sparkles } from 'lucide-react'
import { cn } from '../../utils/cn'
import { formatMessageTime } from '../../services/messageService'
import { AI_CONVERSATION_ID } from '../../hooks/useMessaging'
import type { Conversation } from '../../types'

// Couleurs d'avatars pour les repetiteurs humains.
// Le violet/indigo est volontairement exclu de cette liste : il est
// reserve a l'assistant IA (cf tokens ai-from/ai-to) pour que l'utilisateur
// distingue immediatement un humain d'un agent IA, meme sans lire le badge.
const AVATAR_COLORS = [
  'from-blue-500 to-blue-700',
  'from-cyan-500 to-sky-700',
  'from-emerald-500 to-teal-700',
  'from-rose-500 to-pink-700',
  'from-amber-500 to-orange-600',
]

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length]
}

function getInitials(name: string): string {
  return name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase()
}

interface ConversationListProps {
  conversations: Conversation[]
  activeId: string | null
  searchQuery: string
  isLoading: boolean
  onSelect: (id: string) => void
  onSearchChange: (q: string) => void
}

export default function ConversationList({
  conversations, activeId, searchQuery, isLoading, onSelect, onSearchChange,
}: ConversationListProps) {
  const pinned   = conversations.filter((c) => c.isPinned && !c.isArchived)
  const regular  = conversations.filter((c) => !c.isPinned && !c.isArchived)
  const archived = conversations.filter((c) => c.isArchived)

  return (
    <aside className="flex flex-col h-full
                      bg-white dark:bg-slate-800
                      border-r border-border-col dark:border-slate-700
                      transition-colors duration-300">

      {/* En-tete */}
      <div className="px-4 pt-5 pb-3 border-b border-border-col dark:border-slate-700">
        <h2 className="font-heading font-bold text-lg
                       text-text-dark dark:text-white mb-3">
          Messages
        </h2>
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light dark:text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Rechercher une conversation..."
            className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl outline-none
                       bg-bg-light dark:bg-slate-700/50
                       border border-transparent dark:border-slate-600
                       text-text-dark dark:text-white
                       placeholder:text-text-light dark:placeholder:text-slate-500
                       focus:border-primary dark:focus:border-violet-400
                       focus:ring-2 focus:ring-primary/10 dark:focus:ring-violet-400/15
                       transition-all duration-200"
          />
        </div>
      </div>

      {/* Liste */}
      <div className="flex-1 overflow-y-auto">

        {isLoading && (
          <div className="flex flex-col gap-3 p-4">
            {[1, 2, 3, 4].map((i) => <SkeletonItem key={i} />)}
          </div>
        )}

        {!isLoading && conversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 gap-2 text-text-light dark:text-slate-500">
            <Search size={28} strokeWidth={1.5} />
            <p className="text-sm">Aucune conversation trouvee</p>
          </div>
        )}

        {!isLoading && pinned.length > 0 && (
          <GroupSection label="Epingles" icon={<Pin size={12} />}>
            {pinned.map((conv, i) => (
              <ConversationItem key={conv.id} conv={conv}
                isActive={conv.id === activeId} delay={i * 0.05} onSelect={onSelect} />
            ))}
          </GroupSection>
        )}

        {!isLoading && regular.length > 0 && (
          <GroupSection label="Recentes">
            {regular.map((conv, i) => (
              <ConversationItem key={conv.id} conv={conv}
                isActive={conv.id === activeId} delay={(pinned.length + i) * 0.05} onSelect={onSelect} />
            ))}
          </GroupSection>
        )}

        {!isLoading && archived.length > 0 && (
          <GroupSection label="Archivees" icon={<Archive size={12} />}>
            {archived.map((conv, i) => (
              <ConversationItem key={conv.id} conv={conv}
                isActive={conv.id === activeId} delay={i * 0.05} onSelect={onSelect} />
            ))}
          </GroupSection>
        )}
      </div>
    </aside>
  )
}

function GroupSection({ label, icon, children }: {
  label: string; icon?: React.ReactNode; children: React.ReactNode
}) {
  return (
    <div className="pt-3">
      <div className="flex items-center gap-1.5 px-4 mb-1">
        {icon && <span className="text-text-light dark:text-slate-500">{icon}</span>}
        <span className="text-[11px] font-heading font-bold
                         text-text-light dark:text-slate-500
                         uppercase tracking-widest">
          {label}
        </span>
      </div>
      {children}
    </div>
  )
}

function ConversationItem({ conv, isActive, delay, onSelect }: {
  conv: Conversation; isActive: boolean; delay: number; onSelect: (id: string) => void
}) {
  const { participant, lastMessage, unreadCount, subject, isArchived } = conv
  const hasUnread = unreadCount > 0
  const isMe      = lastMessage?.senderId !== participant.id
  const isAi      = conv.id === AI_CONVERSATION_ID

  return (
    <button
      onClick={() => onSelect(conv.id)}
      style={{ animationDelay: `${delay}s` }}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 text-left',
        'transition-all duration-200 animate-fadeUp',
        'hover:bg-bg-light dark:hover:bg-slate-700/50 group relative',
        isActive && !isAi && 'bg-primary-light dark:bg-primary/10 border-r-2 border-primary',
        isActive && isAi  && 'bg-violet-50 dark:bg-violet-900/20 border-r-2 border-violet-500',
        isArchived && 'opacity-60'
      )}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        {isAi ? (
          /* Avatar special IA */
          <div className="w-11 h-11 rounded-full bg-gradient-to-br
                          from-ai-from to-ai-to
                          flex items-center justify-center shadow-md">
            <Sparkles size={20} className="text-white" />
          </div>
        ) : participant.avatarUrl ? (
          <img src={participant.avatarUrl} alt={participant.name}
               className="w-11 h-11 rounded-full object-cover" />
        ) : (
          <div className={cn(
            'w-11 h-11 rounded-full bg-gradient-to-br',
            'flex items-center justify-center text-white text-sm font-heading font-bold',
            getAvatarColor(participant.name)
          )}>
            {getInitials(participant.name)}
          </div>
        )}
        {/* Point en-ligne */}
        {participant.isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500
                           border-2 border-white dark:border-slate-800 rounded-full" />
        )}
      </div>

      {/* Contenu */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-0.5">
          <span className={cn(
            'text-sm truncate',
            hasUnread
              ? 'font-heading font-bold text-text-dark dark:text-white'
              : 'font-medium text-text-mid dark:text-slate-300'
          )}>
            {participant.name}
          </span>
          {lastMessage && (
            <span className="text-[11px] text-text-light dark:text-slate-500 flex-shrink-0 ml-2">
              {formatMessageTime(new Date(lastMessage.timestamp))}
            </span>
          )}
        </div>

        {subject && (
          <span className={cn(
            'text-[11px] font-semibold block mb-0.5',
            isAi ? 'text-violet-500 dark:text-violet-400' : 'text-primary dark:text-blue-400'
          )}>
            {subject}
          </span>
        )}

        <p className={cn(
          'text-xs truncate',
          hasUnread
            ? 'text-text-dark dark:text-slate-200 font-medium'
            : 'text-text-light dark:text-slate-500'
        )}>
          {isMe && !isArchived && !isAi && (
            <span className="text-text-light dark:text-slate-500">Vous : </span>
          )}
          {lastMessage?.content ?? 'Nouvelle conversation'}
        </p>
      </div>

      {/* Badge non-lu */}
      {hasUnread && (
        <span className={cn(
          'flex-shrink-0 min-w-[20px] h-5 px-1.5 text-white text-[10px] font-bold rounded-full flex items-center justify-center',
          isAi ? 'bg-violet-500' : 'bg-primary'
        )}>
          {unreadCount}
        </span>
      )}
    </button>
  )
}

function SkeletonItem() {
  return (
    <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
      <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-slate-700 flex-shrink-0" />
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded w-2/3" />
        <div className="h-2.5 bg-gray-100 dark:bg-slate-700/60 rounded w-full" />
      </div>
    </div>
  )
}
