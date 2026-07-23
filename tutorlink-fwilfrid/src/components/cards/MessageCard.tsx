/**
 * MessageCard.tsx  (M7 - Willer Pegasus)
 * Bulle de message individuelle avec support dark mode.
 */

import { Check, CheckCheck, Clock } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { Message, MessageStatus } from '../../types'

function StatusIcon({ status }: { status: MessageStatus }) {
  if (status === 'sending')   return <Clock size={11} className="text-white/60" />
  if (status === 'sent')      return <Check size={11} className="text-white/70" />
  if (status === 'delivered') return <CheckCheck size={11} className="text-white/70" />
  return <CheckCheck size={11} className="text-accent" />
}

interface MessageCardProps {
  message: Message
  isOwn: boolean
  showAvatar: boolean
  senderName?: string
}

export default function MessageCard({ message, isOwn, showAvatar, senderName }: MessageCardProps) {
  const time = new Date(message.timestamp).toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <div className={cn('flex items-end gap-2 group animate-fadeUp', isOwn ? 'flex-row-reverse' : 'flex-row')}>

      {/* Avatar expediteur */}
      {!isOwn && (
        <div className="w-7 h-7 flex-shrink-0 mb-1">
          {showAvatar && (
            <div className="w-7 h-7 rounded-full bg-gradient-to-br
                            from-primary to-primary-dark
                            flex items-center justify-center
                            text-white text-[10px] font-bold">
              {senderName?.[0] ?? '?'}
            </div>
          )}
        </div>
      )}

      {/* Bulle */}
      <div className={cn('max-w-[65%] flex flex-col', isOwn ? 'items-end' : 'items-start')}>

        {!isOwn && showAvatar && senderName && (
          <span className="text-[11px] font-semibold text-primary dark:text-blue-400 ml-1 mb-1">
            {senderName}
          </span>
        )}

        <div className={cn(
          'relative px-4 py-2.5 text-sm leading-relaxed transition-all duration-200',
          isOwn
            ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-br-sm shadow-[0_4px_16px_rgba(37,99,235,0.35)]'
            : 'bg-white dark:bg-slate-800 text-text-dark dark:text-white rounded-2xl rounded-bl-sm border border-border-col dark:border-slate-700 shadow-card'
        )}>
          <p className="whitespace-pre-wrap break-words">{message.content}</p>

          <div className={cn('flex items-center gap-1 mt-1', isOwn ? 'justify-end' : 'justify-start')}>
            <span className={cn('text-[10px]', isOwn ? 'text-white/60' : 'text-text-light dark:text-slate-500')}>
              {time}
            </span>
            {isOwn && <StatusIcon status={message.status} />}
          </div>
        </div>
      </div>
    </div>
  )
}
