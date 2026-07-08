/**
 * AiChatPanel.tsx  (M7 - Willer Pegasus)
 * ----------------------------------------
 * Panneau de conversation avec l'assistant IA TutorLink.
 * S'affiche comme une conversation speciale dans la messagerie.
 *
 * Design :
 * - Fond distinctif (degrade violet/indigo) pour differencier de l'IA vs humains
 * - Bulles IA : fond violet doux
 * - Bulles utilisateur : fond bleu primaire (coherent avec le reste)
 * - Suggestions rapides cliquables au demarrage
 * - Indicateur de frappe anime pendant que l'IA repond
 * - Support dark mode complet
 */

import { Send, Sparkles, RotateCcw, Zap } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useAiChat, AI_SUGGESTIONS, type AiChatMessage } from '../../hooks/useAiChat'

export default function AiChatPanel() {
  const {
    messages,
    inputValue,
    isLoading,
    error,
    messagesEndRef,
    setInputValue,
    sendMessage,
    handleKeyDown,
    resetChat,
  } = useAiChat()

  // Determine si on affiche les suggestions (seulement le message de bienvenue)
  const showSuggestions = messages.length === 1

  return (
    <div className="flex flex-col h-full bg-[#f8fafc] dark:bg-slate-900">

      {/* ── En-tete ── */}
      <header className="flex items-center justify-between px-5 py-3.5
                         bg-white dark:bg-slate-800
                         border-b border-border-col dark:border-slate-700
                         shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-center gap-3">
          {/* Avatar IA */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br
                            from-ai-from to-ai-to
                            flex items-center justify-center shadow-md">
              <Sparkles size={18} className="text-white" />
            </div>
            {/* Point "actif" toujours vert pour l'IA */}
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500
                             border-2 border-white dark:border-slate-800 rounded-full" />
          </div>

          <div>
            <h3 className="font-heading font-bold text-sm text-text-dark
                           dark:text-white leading-tight flex items-center gap-1.5">
              Assistant TutorLink
              <span className="text-[10px] bg-violet-100 dark:bg-violet-900/40
                               text-violet-600 dark:text-violet-300
                               px-1.5 py-0.5 rounded-full font-semibold">
                IA
              </span>
            </h3>
            <p className="text-xs text-emerald-500 font-medium mt-0.5">
              Toujours disponible
            </p>
          </div>
        </div>

        {/* Bouton reset */}
        <button
          onClick={resetChat}
          className="p-2 rounded-xl text-text-light dark:text-slate-400
                     hover:text-violet-500 hover:bg-violet-50
                     dark:hover:bg-violet-900/30 transition-all duration-200"
          title="Reinitialiser la conversation"
        >
          <RotateCcw size={16} />
        </button>
      </header>

      {/* ── Zone de messages ── */}
      <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-3">

        {messages.map((msg) => (
          <AiMessageBubble key={msg.id} message={msg} />
        ))}

        {/* Suggestions rapides — seulement au debut */}
        {showSuggestions && (
          <div className="flex flex-col gap-2 mt-2 animate-fadeUp">
            <p className="text-[11px] text-text-light dark:text-slate-500
                          font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Zap size={11} className="text-violet-400" />
              Suggestions rapides
            </p>
            {AI_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                className="text-left text-sm px-4 py-2.5 rounded-xl
                           bg-white dark:bg-slate-800
                           border border-border-col dark:border-slate-700
                           text-text-mid dark:text-slate-300
                           hover:border-violet-300 hover:text-violet-600
                           dark:hover:border-violet-500 dark:hover:text-violet-300
                           hover:bg-violet-50 dark:hover:bg-violet-900/20
                           transition-all duration-200 shadow-card"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}

        {/* Message d'erreur */}
        {error && (
          <div className="text-xs text-red-500 dark:text-red-400
                          bg-red-50 dark:bg-red-900/20
                          border border-red-200 dark:border-red-800
                          px-3 py-2 rounded-lg">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Barre de saisie ── */}
      <div className="px-4 py-3
                      bg-white dark:bg-slate-800
                      border-t border-border-col dark:border-slate-700
                      shadow-[0_-1px_8px_rgba(0,0,0,0.04)]">
        <div className="flex items-end gap-3
                        bg-bg-light dark:bg-slate-700/50
                        rounded-2xl border border-border-col dark:border-slate-600
                        px-4 py-2.5
                        focus-within:border-violet-400
                        focus-within:ring-2 focus-within:ring-violet-400/15
                        transition-all duration-200">
          <textarea
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
              e.target.style.height = 'auto'
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px'
            }}
            onKeyDown={handleKeyDown}
            placeholder="Posez votre question a l'assistant..."
            rows={1}
            disabled={isLoading}
            className="flex-1 bg-transparent text-sm text-text-dark dark:text-white
                       placeholder:text-text-light dark:placeholder:text-slate-500
                       resize-none outline-none leading-relaxed
                       max-h-[120px] py-1 disabled:opacity-60"
            style={{ minHeight: '24px' }}
          />

          <button
            onClick={() => sendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className={cn(
              'flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center',
              'transition-all duration-200',
              inputValue.trim() && !isLoading
                ? 'bg-gradient-to-br from-ai-from to-ai-to text-white hover:scale-105 shadow-[0_4px_12px_rgba(139,92,246,0.4)]'
                : 'bg-border-col dark:bg-slate-600 text-text-light cursor-not-allowed'
            )}
            aria-label="Envoyer"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            ) : (
              <Send size={15} />
            )}
          </button>
        </div>

        {/* Astuce clavier — masquee sur tactile */}
        <p className="hidden md:block text-[11px] text-text-light dark:text-slate-500
                      text-center mt-1.5">
          Appuyez sur{' '}
          <kbd className="font-mono bg-gray-100 dark:bg-slate-700
                          px-1 py-0.5 rounded text-[10px]">
            Entree
          </kbd>{' '}
          pour envoyer
        </p>
      </div>
    </div>
  )
}

// ── Bulle de message IA / utilisateur ────────────────────────────────────────
function AiMessageBubble({ message }: { message: AiChatMessage }) {
  const isUser = message.role === 'user'
  const time   = message.timestamp.toLocaleTimeString('fr-FR', {
    hour: '2-digit', minute: '2-digit',
  })

  return (
    <div
      className={cn(
        'flex items-end gap-2 animate-fadeUp',
        isUser ? 'flex-row-reverse' : 'flex-row'
      )}
    >
      {/* Avatar IA */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br
                        from-ai-from to-ai-to
                        flex items-center justify-center flex-shrink-0 mb-1">
          <Sparkles size={12} className="text-white" />
        </div>
      )}

      <div className={cn('max-w-[80%] flex flex-col', isUser ? 'items-end' : 'items-start')}>

        {/* Bulle */}
        <div
          className={cn(
            'px-4 py-3 text-sm leading-relaxed',
            isUser
              /* Utilisateur — bleu primaire coherent avec la messagerie */
              ? 'bg-gradient-to-br from-primary to-primary-dark text-white rounded-2xl rounded-br-sm shadow-[0_4px_16px_rgba(37,99,235,0.3)]'
              /* IA — violet doux pour se distinguer des repetiteurs */
              : message.isLoading
                ? 'bg-white dark:bg-slate-800 border border-border-col dark:border-slate-700 rounded-2xl rounded-bl-sm shadow-card'
                : 'bg-white dark:bg-slate-800 border border-violet-100 dark:border-violet-900/50 rounded-2xl rounded-bl-sm shadow-card text-text-dark dark:text-white'
          )}
        >
          {/* Indicateur chargement IA */}
          {message.isLoading ? (
            <div className="flex items-center gap-1.5 h-5 px-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 bg-violet-400 rounded-full"
                  style={{
                    animation: 'typingDot 1.2s ease infinite',
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          ) : (
            /* Texte avec support retours a la ligne */
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          )}

          {/* Heure */}
          {!message.isLoading && (
            <span
              className={cn(
                'block text-[10px] mt-1.5',
                isUser ? 'text-white/60 text-right' : 'text-text-light dark:text-slate-500'
              )}
            >
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
