import { Message } from '../../types/messaging.types';

interface Props { message: Message; }

// Bulle de message — droite si envoyé, gauche si reçu
const MessageBubble = ({ message }: Props) => (
  <div className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'} mb-3`}>
    <div className={`max-w-xs lg:max-w-md xl:max-w-lg`}>

      {/* Contenu du message */}
      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed
        ${message.isOwn
          ? 'bg-[#1a2744] text-white rounded-br-sm'  // droite — bleu foncé
          : 'bg-white text-gray-800 shadow-sm rounded-bl-sm border border-gray-100' // gauche — blanc
        }`}>
        {message.content}
      </div>

      {/* Heure + statut */}
      <div className={`flex items-center gap-1 mt-1
        ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
        <span className="text-xs text-gray-400">{message.timestamp}</span>
        {/* Indicateur lu/envoyé uniquement pour ses propres messages */}
        {message.isOwn && (
          <span className="text-xs text-gray-400">
            {message.status === 'lu' ? '✓✓' : '✓'}
          </span>
        )}
      </div>
    </div>
  </div>
);

export default MessageBubble;