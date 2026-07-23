/**
 * Donnees fictives pour la messagerie (mode maquette)
 * ---------------------------------------------------
 * [BACKEND] Toutes ces donnees seront remplacees par des appels API reels :
 *   GET /api/conversations       → liste des conversations
 *   GET /api/messages/:convId    → messages d'une conversation
 *   POST /api/messages           → envoyer un message
 *   SOCKET 'message:new'         → reception en temps reel (socket.io)
 */

import type { Conversation, Message } from '../types'

// ID de l'utilisateur connecte (a remplacer par le store d'auth)
export const CURRENT_USER_ID = 'user-junior'

// Conversations fictives
export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    participant: {
      id: 'tutor-kamga',
      name: 'M. Kamga Eric',
      role: 'tutor',
      isOnline: true,
    },
    lastMessage: {
      id: 'msg-5',
      conversationId: 'conv-1',
      senderId: 'tutor-kamga',
      content: "D'accord, on se voit lundi a 16h. Prepare les exercices du chapitre 5 !",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      status: 'delivered',
      type: 'text',
    },
    unreadCount: 2,
    subject: 'Mathematiques',
    isArchived: false,
    isPinned: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
  {
    id: 'conv-2',
    participant: {
      id: 'tutor-tchana',
      name: 'Mme Tchana Sylvie',
      role: 'tutor',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 45),
    },
    lastMessage: {
      id: 'msg-tc-3',
      conversationId: 'conv-2',
      senderId: 'tutor-tchana',
      content: 'Merci pour la seance d\'hier, bon courage pour le devoir !',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    subject: 'Physique-Chimie',
    isArchived: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10),
  },
  {
    id: 'conv-3',
    participant: {
      id: 'tutor-fotso',
      name: 'Mlle Fotso Aline',
      role: 'tutor',
      isOnline: true,
    },
    lastMessage: {
      id: 'msg-fa-4',
      conversationId: 'conv-3',
      senderId: 'tutor-fotso',
      content: 'Voici le PDF avec le vocabulaire pour la prochaine seance.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    subject: 'Anglais',
    isArchived: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15),
  },
  {
    id: 'conv-4',
    participant: {
      id: 'tutor-nana',
      name: 'M. Nana Bertrand',
      role: 'tutor',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3),
    },
    lastMessage: {
      id: 'msg-nb-2',
      conversationId: 'conv-4',
      senderId: 'tutor-nana',
      content: 'Tres bon travail sur la dissertation, je suis fier de vous.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    subject: 'Francais',
    isArchived: false,
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 20),
  },
  {
    id: 'conv-5',
    participant: {
      id: 'tutor-tagne',
      name: 'M. Tagne Junior',
      role: 'tutor',
      isOnline: false,
      lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    },
    lastMessage: {
      id: 'msg-tj-1',
      conversationId: 'conv-5',
      senderId: CURRENT_USER_ID,
      content: 'Bonjour, je voudrais commencer Python la semaine prochaine.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      status: 'read',
      type: 'text',
    },
    unreadCount: 0,
    subject: 'Informatique',
    isArchived: true,
    isPinned: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30),
  },
]

// Messages de la conversation conv-1 (Kamga Eric)
export const MOCK_MESSAGES: Record<string, Message[]> = {
  'conv-1': [
    {
      id: 'msg-1',
      conversationId: 'conv-1',
      senderId: 'tutor-kamga',
      content: 'Bonjour Junior, comment s\'est passe ton DS de maths ?',
      timestamp: new Date(Date.now() - 1000 * 60 * 42),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-2',
      conversationId: 'conv-1',
      senderId: CURRENT_USER_ID,
      content: "Bonjour Monsieur ! J'ai eu 15/20, je suis content de mes resultats !",
      timestamp: new Date(Date.now() - 1000 * 60 * 38),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-3',
      conversationId: 'conv-1',
      senderId: 'tutor-kamga',
      content: "Excellent resultat ! C'est le fruit de votre travail. On va attaquer les integrales a la prochaine seance.",
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-4',
      conversationId: 'conv-1',
      senderId: CURRENT_USER_ID,
      content: "D'accord Monsieur. Toujours lundi prochain a 16h ?",
      timestamp: new Date(Date.now() - 1000 * 60 * 12),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-5',
      conversationId: 'conv-1',
      senderId: 'tutor-kamga',
      content: "D'accord, on se voit lundi a 16h. Prepare les exercices du chapitre 5 !",
      timestamp: new Date(Date.now() - 1000 * 60 * 3),
      status: 'delivered',
      type: 'text',
    },
  ],
  'conv-2': [
    {
      id: 'msg-tc-1',
      conversationId: 'conv-2',
      senderId: CURRENT_USER_ID,
      content: 'Bonsoir Mme Tchana, j\'aimerais revoir le chapitre sur la mecanique.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-tc-2',
      conversationId: 'conv-2',
      senderId: 'tutor-tchana',
      content: 'Bien sur ! Nous le ferons lors de notre prochaine seance mercredi.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22.5),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-tc-3',
      conversationId: 'conv-2',
      senderId: 'tutor-tchana',
      content: 'Merci pour la seance d\'hier, bon courage pour le devoir !',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 22),
      status: 'read',
      type: 'text',
    },
  ],
  'conv-3': [
    {
      id: 'msg-fa-1',
      conversationId: 'conv-3',
      senderId: 'tutor-fotso',
      content: 'Hello Junior! Ready to practice your English today?',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.5),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-fa-2',
      conversationId: 'conv-3',
      senderId: CURRENT_USER_ID,
      content: 'Yes, I am ready! Let\'s do it.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.2),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-fa-3',
      conversationId: 'conv-3',
      senderId: 'tutor-fotso',
      content: 'Great! Here is a document to prepare for Thursday.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3.1),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-fa-4',
      conversationId: 'conv-3',
      senderId: 'tutor-fotso',
      content: 'Voici le PDF avec le vocabulaire pour la prochaine seance.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
      status: 'read',
      type: 'text',
    },
  ],
  'conv-4': [
    {
      id: 'msg-nb-1',
      conversationId: 'conv-4',
      senderId: CURRENT_USER_ID,
      content: 'Monsieur, j\'ai rendu ma dissertation sur Moliere.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7.2),
      status: 'read',
      type: 'text',
    },
    {
      id: 'msg-nb-2',
      conversationId: 'conv-4',
      senderId: 'tutor-nana',
      content: 'Tres bon travail sur la dissertation, je suis fier de vous.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
      status: 'read',
      type: 'text',
    },
  ],
  'conv-5': [
    {
      id: 'msg-tj-1',
      conversationId: 'conv-5',
      senderId: CURRENT_USER_ID,
      content: 'Bonjour, je voudrais commencer Python la semaine prochaine.',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      status: 'read',
      type: 'text',
    },
  ],
}
