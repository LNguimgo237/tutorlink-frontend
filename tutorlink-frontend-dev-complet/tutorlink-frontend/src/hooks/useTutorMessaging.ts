import { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '../types/messaging.types';

// Réutilise les mêmes types que la messagerie élève
export const useTutorMessaging = () => {

  // ── CONVERSATIONS MOCK répétiteur ──
  // Le répétiteur voit ses élèves dans la liste
  const [conversations] = useState<Conversation[]>([
    {
      id: 'c1',
      contactId: 's1',
      contactName: 'Junior Nkoumba',
      contactRole: 'Élève · Terminale D',
      lastMessage: 'D\'accord, on se voit lundi à 16h.',
      lastTime: '14:32',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: 'c2',
      contactId: 's2',
      contactName: 'Fokou Cédric',
      contactRole: 'Élève · Terminale C',
      lastMessage: 'Merci pour la séance d\'hier !',
      lastTime: 'hier',
      unreadCount: 3,
      isOnline: false,
    },
    {
      id: 'c3',
      contactId: 's3',
      contactName: 'Ngono Christelle',
      contactRole: 'Élève · Terminale C',
      lastMessage: 'À quelle heure samedi ?',
      lastTime: '3j',
      unreadCount: 1,
      isOnline: false,
    },
    {
      id: 'c4',
      contactId: 's4',
      contactName: 'Mbouh Karine',
      contactRole: 'Élève · Terminale D',
      lastMessage: 'J\'ai bien révisé les dérivées.',
      lastTime: '1 sem.',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 'c5',
      contactId: 's5',
      contactName: 'Talla Mireille',
      contactRole: 'Parent · Junior Nkoumba',
      lastMessage: 'Merci pour le suivi de mon fils.',
      lastTime: '2 sem.',
      unreadCount: 0,
      isOnline: false,
    },
  ]);

  // ── MESSAGES MOCK par conversation ──
  const mockMessages: Record<string, Message[]> = {
    c1: [
      {
        id: 'm1', senderId: 's1',
        content: 'Bonjour Monsieur ! J\'ai eu 15/20 au DS, je suis content 😊',
        timestamp: '14:20', status: 'lu', isOwn: false,
      },
      {
        id: 'm2', senderId: 'me',
        content: 'Excellent résultat ! Je suis fier de toi. On va continuer sur cette lancée.',
        timestamp: '14:25', status: 'lu', isOwn: true,
      },
      {
        id: 'm3', senderId: 'me',
        content: 'On va attaquer les intégrales à la prochaine séance. Prépare tes exercices.',
        timestamp: '14:28', status: 'lu', isOwn: true,
      },
      {
        id: 'm4', senderId: 's1',
        content: 'D\'accord. Toujours lundi prochain à 16h ?',
        timestamp: '14:30', status: 'lu', isOwn: false,
      },
      {
        id: 'm5', senderId: 'me',
        content: 'D\'accord, on se voit lundi à 16h.',
        timestamp: '14:32', status: 'lu', isOwn: true,
      },
    ],
    c2: [
      {
        id: 'm1', senderId: 'me',
        content: 'Bonjour Cédric ! La séance d\'hier s\'est bien passée ?',
        timestamp: '10:00', status: 'lu', isOwn: true,
      },
      {
        id: 'm2', senderId: 's2',
        content: 'Oui monsieur, j\'ai bien compris les fonctions.',
        timestamp: '10:05', status: 'lu', isOwn: false,
      },
      {
        id: 'm3', senderId: 's2',
        content: 'Merci pour la séance d\'hier !',
        timestamp: 'hier', status: 'envoye', isOwn: false,
      },
      {
        id: 'm4', senderId: 's2',
        content: 'Est-ce qu\'on peut avoir une séance supplémentaire cette semaine ?',
        timestamp: 'hier', status: 'envoye', isOwn: false,
      },
      {
        id: 'm5', senderId: 's2',
        content: 'J\'ai un examen vendredi.',
        timestamp: 'hier', status: 'envoye', isOwn: false,
      },
    ],
    c3: [
      {
        id: 'm1', senderId: 's3',
        content: 'Bonjour Monsieur, à quelle heure on se retrouve samedi ?',
        timestamp: '3j', status: 'envoye', isOwn: false,
      },
    ],
    c4: [
      {
        id: 'm1', senderId: 's4',
        content: 'Bonsoir Monsieur ! J\'ai bien révisé les dérivées comme vous l\'avez dit.',
        timestamp: '1 sem.', status: 'lu', isOwn: false,
      },
    ],
    c5: [
      {
        id: 'm1', senderId: 's5',
        content: 'Bonsoir Monsieur Kamga. Je voulais vous remercier pour le suivi de mon fils Junior.',
        timestamp: '2 sem.', status: 'lu', isOwn: false,
      },
      {
        id: 'm2', senderId: 'me',
        content: 'Merci Madame Talla. Junior est un élève très sérieux, continuez à l\'encourager.',
        timestamp: '2 sem.', status: 'lu', isOwn: true,
      },
    ],
  };

  // Conversation active
  const [activeConvId, setActiveConvId] = useState<string>('c1');

  // Messages de la conversation active
  const [messages, setMessages] = useState<Message[]>(mockMessages['c1']);

  // Texte en cours de saisie
  const [inputText, setInputText] = useState('');

  // Ref scroll automatique
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll vers le bas à chaque nouveau message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Changer de conversation
  const handleSelectConversation = (convId: string) => {
    setActiveConvId(convId);
    setMessages(mockMessages[convId] || []);
    setInputText('');
  };

  // Envoyer un message
  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      senderId: 'me',
      content: inputText.trim(),
      timestamp: new Date().toLocaleTimeString('fr-FR', {
        hour: '2-digit', minute: '2-digit',
      }),
      status: 'envoye',
      isOwn: true,
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    // → remplacer par messagingService.sendMessage(activeConvId, inputText)
  };

  // Conversation active complète
  const activeConversation = conversations.find(c => c.id === activeConvId);

  return {
    conversations, messages,
    activeConvId, activeConversation,
    inputText, setInputText,
    messagesEndRef,
    handleSelectConversation,
    handleSendMessage,
  };
};