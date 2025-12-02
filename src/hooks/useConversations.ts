// ============================================
// CONVERSATIONS STATE HOOK
// ============================================

import { useState, useCallback, useMemo } from 'react';
import type { Message, Conversation, Folder, ChatMessages } from '@/types';
import { INITIAL_CHAT_MESSAGES } from '@/constants';
import { conversationStorage, folderStorage } from '@/services/storage';
import { logger } from '@/services/logger';
import { generateId } from '@/utils/serialGenerator';

export const useConversations = () => {
  const [chatMessages, setChatMessages] = useState<ChatMessages>(INITIAL_CHAT_MESSAGES);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>(() => conversationStorage.get());
  const [folders, setFolders] = useState<Folder[]>(() => folderStorage.get());

  // ==========================================
  // CONVERSATION CRUD
  // ==========================================

  const saveConversationsToStorage = useCallback((convs: Conversation[]) => {
    const sorted = [...convs].sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    conversationStorage.set(sorted);
    return sorted;
  }, []);

  const createConversationPlaceholder = useCallback((initialTitle: string): string => {
    const id = generateId();
    const newConv: Conversation = {
      id,
      title: initialTitle,
      messagesJson: JSON.stringify([]),
      createdAt: Date.now(),
      updatedAt: new Date(),
      folderIds: [],
    };
    setConversations((prev) => saveConversationsToStorage([newConv, ...prev]));
    logger.log('INFO', `Created conversation: ${initialTitle}`);
    return id;
  }, [saveConversationsToStorage]);

  const saveFullConversation = useCallback((id: string, messages: Message[]) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === id
          ? { ...c, messagesJson: JSON.stringify(messages), updatedAt: new Date() }
          : c
      );
      return saveConversationsToStorage(updated);
    });
  }, [saveConversationsToStorage]);

  const loadConversation = useCallback((id: string) => {
    const conv = conversations.find((c) => c.id === id);
    if (conv) {
      try {
        const messages = JSON.parse(conv.messagesJson) as Message[];
        setChatMessages((prev) => ({ ...prev, Sentient: messages }));
        setCurrentConversationId(id);
        logger.log('ACTION', `Loaded conversation: ${conv.title}`);
      } catch (error) {
        logger.log('ERROR', 'Failed to parse conversation messages');
      }
    }
  }, [conversations]);

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => {
      const updated = prev.filter((c) => c.id !== id);
      conversationStorage.set(updated);
      return updated;
    });
    
    // Remove from folders
    setFolders((prev) => {
      const updated = prev.map((f) => ({
        ...f,
        conversationIds: f.conversationIds?.filter((cid) => cid !== id) || [],
      }));
      folderStorage.set(updated);
      return updated;
    });

    if (currentConversationId === id) {
      resetChatState();
    }
    
    logger.log('INFO', `Deleted conversation: ${id}`);
  }, [currentConversationId]);

  const deleteMultipleConversations = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    
    setConversations((prev) => {
      const updated = prev.filter((c) => !idSet.has(c.id));
      conversationStorage.set(updated);
      return updated;
    });

    setFolders((prev) => {
      const updated = prev.map((f) => ({
        ...f,
        conversationIds: f.conversationIds?.filter((cid) => !idSet.has(cid)) || [],
      }));
      folderStorage.set(updated);
      return updated;
    });

    if (currentConversationId && idSet.has(currentConversationId)) {
      resetChatState();
    }
    
    logger.log('INFO', `Deleted ${ids.length} conversations`);
  }, [currentConversationId]);

  const renameConversation = useCallback((id: string, newTitle: string) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === id ? { ...c, title: newTitle, updatedAt: new Date() } : c
      );
      return saveConversationsToStorage(updated);
    });
    logger.log('INFO', `Renamed conversation to: ${newTitle}`);
  }, [saveConversationsToStorage]);

  // ==========================================
  // CHAT STATE
  // ==========================================

  const resetChatState = useCallback(() => {
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setCurrentConversationId(null);
  }, []);

  const startNewConversation = useCallback((currentMessages: Message[]) => {
    // Save current conversation if it exists
    if (currentConversationId && currentMessages.length > 1) {
      saveFullConversation(currentConversationId, currentMessages);
    }
    resetChatState();
    logger.log('ACTION', 'Started new conversation');
  }, [currentConversationId, saveFullConversation, resetChatState]);

  const updateChatSession = useCallback((messages: Message[]) => {
    setChatMessages((prev) => ({ ...prev, Sentient: messages }));
    
    // Auto-save to current conversation
    if (currentConversationId) {
      saveFullConversation(currentConversationId, messages);
    }
  }, [currentConversationId, saveFullConversation]);

  // ==========================================
  // FOLDER CRUD
  // ==========================================

  const saveFoldersToStorage = useCallback((fldrs: Folder[]) => {
    const sorted = [...fldrs].sort((a, b) => a.name.localeCompare(b.name));
    folderStorage.set(sorted);
    return sorted;
  }, []);

  const saveFolder = useCallback((folderName: string): string => {
    const id = generateId();
    const newFolder: Folder = {
      id,
      name: folderName,
      createdAt: new Date(),
      conversationIds: [],
    };
    setFolders((prev) => saveFoldersToStorage([...prev, newFolder]));
    logger.log('INFO', `Created folder: ${folderName}`);
    return id;
  }, [saveFoldersToStorage]);

  const deleteMultipleFolders = useCallback((ids: string[]) => {
    const idSet = new Set(ids);
    
    setFolders((prev) => {
      const updated = prev.filter((f) => !idSet.has(f.id));
      folderStorage.set(updated);
      return updated;
    });

    // Remove folder references from conversations
    setConversations((prev) => {
      const updated = prev.map((c) => ({
        ...c,
        folderIds: c.folderIds?.filter((fid) => !idSet.has(fid)) || [],
      }));
      conversationStorage.set(updated);
      return updated;
    });
    
    logger.log('INFO', `Deleted ${ids.length} folders`);
  }, []);

  const assignFoldersToConversation = useCallback((conversationId: string, folderIds: string[]) => {
    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === conversationId ? { ...c, folderIds } : c
      );
      conversationStorage.set(updated);
      return updated;
    });

    setFolders((prev) => {
      const updated = prev.map((folder) => {
        const shouldHave = folderIds.includes(folder.id);
        const hasConv = folder.conversationIds?.includes(conversationId);
        
        if (shouldHave && !hasConv) {
          return { ...folder, conversationIds: [...(folder.conversationIds || []), conversationId] };
        }
        if (!shouldHave && hasConv) {
          return { ...folder, conversationIds: folder.conversationIds?.filter((id) => id !== conversationId) };
        }
        return folder;
      });
      folderStorage.set(updated);
      return updated;
    });
  }, []);

  const addConversationsToFolder = useCallback((folderId: string, conversationIds: string[]) => {
    setFolders((prev) => {
      const updated = prev.map((folder) => {
        if (folder.id === folderId) {
          const existing = new Set(folder.conversationIds || []);
          conversationIds.forEach((id) => existing.add(id));
          return { ...folder, conversationIds: Array.from(existing) };
        }
        return folder;
      });
      folderStorage.set(updated);
      return updated;
    });

    setConversations((prev) => {
      const updated = prev.map((conv) => {
        if (conversationIds.includes(conv.id)) {
          const existing = new Set(conv.folderIds || []);
          existing.add(folderId);
          return { ...conv, folderIds: Array.from(existing) };
        }
        return conv;
      });
      conversationStorage.set(updated);
      return updated;
    });
  }, []);

  const removeConversationFromFolder = useCallback((folderId: string, conversationId: string) => {
    setFolders((prev) => {
      const updated = prev.map((f) =>
        f.id === folderId
          ? { ...f, conversationIds: f.conversationIds?.filter((id) => id !== conversationId) }
          : f
      );
      folderStorage.set(updated);
      return updated;
    });

    setConversations((prev) => {
      const updated = prev.map((c) =>
        c.id === conversationId
          ? { ...c, folderIds: c.folderIds?.filter((id) => id !== folderId) }
          : c
      );
      conversationStorage.set(updated);
      return updated;
    });
  }, []);

  return {
    // State
    chatMessages,
    currentConversationId,
    conversations,
    folders,
    
    // Conversation actions
    setCurrentConversationId,
    createConversationPlaceholder,
    loadConversation,
    startNewConversation,
    deleteConversation,
    deleteMultipleConversations,
    renameConversation,
    updateChatSession,
    
    // Folder actions
    saveFolder,
    deleteMultipleFolders,
    assignFoldersToConversation,
    addConversationsToFolder,
    removeConversationFromFolder,
  };
};

export type UseConversationsReturn = ReturnType<typeof useConversations>;
