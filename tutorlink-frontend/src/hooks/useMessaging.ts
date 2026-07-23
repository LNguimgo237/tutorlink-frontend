import { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '../types/messaging.types';

export const useMessaging = () => {

  // ── CONVERSATIONS MOCK ──
  const [conversations] = useState<Conversation[]>([
    {
      id: 'c1',
      contactId: 't1',
      contactName: 'M. Kamga Eric',
      contactRole: 'Mathématiques',
      lastMessage: 'D\'accord, on se voit lundi à 16h.',
      lastTime: '14:32',
      unreadCount: 0,
      isOnline: true,
    },
    {
      id: 'c2',
      contactId: 't2',
      contactName: 'Mme Tchana Sylvie',
      contactRole: 'Physique-Chimie',
      lastMessage: 'Merci pour la séance d\'hier !',
      lastTime: 'hier',
      unreadCount: 2,
      isOnline: false,
    },
    {
      id: 'c3',
      contactId: 't3',
      contactName: 'Mlle Fotso Aline',
      contactRole: 'Anglais',
      lastMessage: 'Voici le PDF pour le vocabulaire...',
      lastTime: '3j',
      unreadCount: 0,
      isOnline: false,
    },
    {
      id: 'c4',
      contactId: 't4',
      contactName: 'M. Nana Bertrand',
      contactRole: 'Français',
      lastMessage: 'Très bon travail sur la dissertation.',
      lastTime: '1 sem.',
      unreadCount: 0,
      isOnline: false,
    },
  ]);

  // ── MESSAGES MOCK par conversation ──
  const mockMessages: Record<string, Message[]> = {
    c1: [
      { id: 'm1', senderId: 't1', content: 'Bonjour Junior, comment s\'est passé ton DS de maths ?', timestamp: '14:20', status: 'lu', isOwn: false },
      { id: 'm2', senderId: 'me', content: 'Bonjour Monsieur ! J\'ai eu 15/20, je suis content 😊', timestamp: '14:25', status: 'lu', isOwn: true },
      { id: 'm3', senderId: 't1', content: 'Excellent ! On va attaquer les intégrales à la prochaine séance.', timestamp: '14:28', status: 'lu', isOwn: false },
      { id: 'm4', senderId: 'me', content: 'D\'accord. Toujours lundi prochain à 16h ?', timestamp: '14:30', status: 'lu', isOwn: true },
      { id: 'm5', senderId: 't1', content: 'D\'accord, on se voit lundi à 16h.', timestamp: '14:32', status: 'lu', isOwn: false },
    ],
    c2: [
      { id: 'm1', senderId: 't2', content: 'Bonjour ! La séance d\'hier s\'est bien passée ?', timestamp: '10:00', status: 'lu', isOwn: false },
      { id: 'm2', senderId: 'me', content: 'Oui merci beaucoup Madame !', timestamp: '10:05', status: 'lu', isOwn: true },
      { id: 'm3', senderId: 't2', content: 'Merci pour la séance d\'hier !', timestamp: 'hier', status: 'envoye', isOwn: false },
      { id: 'm4', senderId: 't2', content: 'N\'oubliez pas de réviser les lois de Newton.', timestamp: 'hier', status: 'envoye', isOwn: false },
    ],
    c3: [
      { id: 'm1', senderId: 't3', content: 'Voici le PDF pour le vocabulaire du chapitre 3.', timestamp: '3j', status: 'lu', isOwn: false },
    ],
    c4: [
      { id: 'm1', senderId: 't4', content: 'Très bon travail sur la dissertation.', timestamp: '1 sem.', status: 'lu', isOwn: false },
    ],
  };

  // Conversation active
  const [activeConvId, setActiveConvId] = useState<string>('c1');

  // Messages de la conversation active
  const [messages, setMessages] = useState<Message[]>(mockMessages['c1']);

  // Texte en cours de saisie
  const [inputText, setInputText] = useState('');

  // Ref pour scroll automatique vers le bas
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
        hour: '2-digit', minute: '2-digit'
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