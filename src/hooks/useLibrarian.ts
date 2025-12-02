// ============================================
// MASTER LIBRARIAN HOOK
// ============================================
// Combines all sub-hooks into a single interface

import { useState, useEffect } from 'react';
import type { LogEntry } from '@/types';
import { useAuth } from './useAuth';
import { useConversations } from './useConversations';
import { useProtocolOS } from './useProtocolOS';
import { useTraining } from './useTraining';
import { logger } from '@/services/logger';
import { features } from '@/config';

export const useLibrarian = () => {
  // ==========================================
  // LIBRARIAN UI STATE
  // ==========================================
  const [isLibrarianVisible, setIsLibrarianVisible] = useState(true);
  const [globalIsConnected, setGlobalIsConnected] = useState(true);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // ==========================================
  // COMPOSE SUB-HOOKS
  // ==========================================
  const auth = useAuth();
  const conversations = useConversations();
  const protocolOS = useProtocolOS();
  const training = useTraining();

  // ==========================================
  // LOGGING
  // ==========================================
  useEffect(() => {
    logger.log('INFO', 'Librarian session initialized');
    const unsubscribe = logger.subscribe(setLogs);
    return () => unsubscribe();
  }, []);

  const clearLogs = () => {
    logger.clear();
    logger.log('ACTION', 'Logs cleared by user');
  };

  // ==========================================
  // COMPUTED STATE
  // ==========================================
  const mode = globalIsConnected ? 'Sentient' : 'Wizard';
  const currentMessages = conversations.chatMessages[mode];

  // ==========================================
  // AUTH OVERRIDE (when auth is disabled)
  // ==========================================
  const effectiveAuthStatus = features.auth ? auth.authStatus : 'loggedIn';

  // ==========================================
  // RETURN UNIFIED API
  // ==========================================
  return {
    // ---- Librarian UI State ----
    isLibrarianVisible,
    setIsLibrarianVisible,
    globalIsConnected,
    setGlobalIsConnected,
    mode,
    currentMessages,
    
    // ---- Logs ----
    logs,
    clearLogs,
    
    // ---- Auth (from useAuth) ----
    authStatus: effectiveAuthStatus,
    user: auth.user,
    subscriptionStatus: auth.subscriptionStatus,
    accountHistory: auth.accountHistory,
    login: auth.login,
    subscribe: auth.subscribe,
    logout: auth.logout,
    isLoggedIn: auth.isLoggedIn || !features.auth,
    
    // ---- Conversations (from useConversations) ----
    chatMessages: conversations.chatMessages,
    currentConversationId: conversations.currentConversationId,
    conversations: conversations.conversations,
    folders: conversations.folders,
    setCurrentConversationId: conversations.setCurrentConversationId,
    createConversationPlaceholder: conversations.createConversationPlaceholder,
    loadConversation: conversations.loadConversation,
    startNewConversation: conversations.startNewConversation,
    deleteConversation: conversations.deleteConversation,
    deleteMultipleConversations: conversations.deleteMultipleConversations,
    renameConversation: conversations.renameConversation,
    updateChatSession: conversations.updateChatSession,
    saveFolder: conversations.saveFolder,
    deleteMultipleFolders: conversations.deleteMultipleFolders,
    assignFoldersToConversation: conversations.assignFoldersToConversation,
    addConversationsToFolder: conversations.addConversationsToFolder,
    removeConversationFromFolder: conversations.removeConversationFromFolder,
    
    // ---- Protocol OS (from useProtocolOS) ----
    platforms: protocolOS.platforms,
    savePlatform: protocolOS.savePlatform,
    deletePlatform: protocolOS.deletePlatform,
    saveResource: protocolOS.saveResource,
    deleteResource: protocolOS.deleteResource,
    saveHandshake: protocolOS.saveHandshake,
    deleteHandshake: protocolOS.deleteHandshake,
    
    // ---- Training (from useTraining) ----
    trainings: training.trainings,
    contacts: training.contacts,
    saveTraining: training.saveTraining,
    updateTraining: training.updateTraining,
    deleteTraining: training.deleteTraining,
    addKnowledgeFile: training.addKnowledgeFile,
    removeKnowledgeFile: training.removeKnowledgeFile,
    saveContact: training.saveContact,
  };
};

export type UseLibrarianReturn = ReturnType<typeof useLibrarian>;
