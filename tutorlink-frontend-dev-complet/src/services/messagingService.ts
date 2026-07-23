import api from './api';
import { Conversation, Message } from '../types/messaging.types';

// ⚠️ BACKEND REQUIS — endpoints REST simples pour l'instant.
// Le projet a déjà VITE_SOCKET_URL défini dans .env : un vrai temps réel
// (Socket.io/WebSocket) serait une amélioration ultérieure, pas incluse ici.
const messagingService = {

  // GET /messages/conversations — liste des conversations de l'utilisateur connecté
  getConversations: async (): Promise<Conversation[]> => {
    const res = await api.get('/messages/conversations');
    return res.data;
  },

  // GET /messages/conversations/:id — messages d'une conversation
  getMessages: async (conversationId: string): Promise<Message[]> => {
    const res = await api.get(`/messages/conversations/${conversationId}`);
    return res.data;
  },

  // POST /messages/conversations/:id — envoyer un message
  sendMessage: async (conversationId: string, content: string): Promise<Message> => {
    const res = await api.post(`/messages/conversations/${conversationId}`, { content });
    return res.data;
  },
};

export default messagingService;