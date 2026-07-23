import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import messagingService from '../services/messagingService';
import { Conversation, Message } from '../types/messaging.types';

export const useTutorMessaging = () => {
  const queryClient = useQueryClient();

  const { data: conversations = [] } = useQuery<Conversation[]>({
    queryKey: ['tutor-conversations'],
    queryFn: messagingService.getConversations,
    staleTime: 30 * 1000,
  });

  const [activeConvId, setActiveConvId] = useState<string>('');

  useEffect(() => {
    if (!activeConvId && conversations.length > 0) {
      setActiveConvId(conversations[0].id);
    }
  }, [conversations, activeConvId]);

  const { data: messages = [] } = useQuery<Message[]>({
    queryKey: ['tutor-messages', activeConvId],
    queryFn: () => messagingService.getMessages(activeConvId),
    enabled: !!activeConvId,
    staleTime: 10 * 1000,
  });

  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSelectConversation = (convId: string) => {
    setActiveConvId(convId);
    setInputText('');
  };

  const sendMutation = useMutation({
    mutationFn: (content: string) => messagingService.sendMessage(activeConvId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tutor-messages', activeConvId] });
      queryClient.invalidateQueries({ queryKey: ['tutor-conversations'] });
      setInputText('');
    },
  });

  const handleSendMessage = () => {
    if (!inputText.trim()) return;
    sendMutation.mutate(inputText.trim());
  };

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