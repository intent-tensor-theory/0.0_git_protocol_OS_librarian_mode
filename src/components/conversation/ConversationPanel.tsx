// ============================================
// CONVERSATION PANEL COMPONENT
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import type { Message, Conversation, Folder, LibrarianMode } from '@/types';
import { retrieveContext, generateRAGResponse } from '@/services/ragService';
import { logger } from '@/services/logger';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';
import { MessageBubble } from './MessageBubble';
import { ConversationHistory } from './ConversationHistory';
import { FolderManager } from './FolderManager';
import { AssignFolderModal } from './modals/AssignFolderModal';

type ConversationPanelProps = {
  mode: LibrarianMode;
  activeEngineId: string;
  chatMessages: { Sentient: Message[]; Wizard: Message[] };
  currentConversationId: string | null;
  conversations: Conversation[];
  folders: Folder[];
  updateChatSession: (messages: Message[]) => void;
  createConversationPlaceholder: (title: string) => string;
  loadConversation: (id: string) => void;
  startNewConversation: (currentMessages: Message[]) => void;
  deleteConversation: (id: string) => void;
  deleteMultipleConversations: (ids: string[]) => void;
  renameConversation: (id: string, newTitle: string) => void;
  saveFolder: (name: string) => void;
  deleteMultipleFolders: (ids: string[]) => void;
  assignFoldersToConversation: (conversationId: string, folderIds: string[]) => void;
  setCurrentConversationId: (id: string | null) => void;
};

export const ConversationPanel: React.FC<ConversationPanelProps> = ({
  mode,
  activeEngineId,
  chatMessages,
  currentConversationId,
  conversations,
  folders,
  updateChatSession,
  createConversationPlaceholder,
  loadConversation,
  startNewConversation,
  deleteConversation,
  deleteMultipleConversations,
  renameConversation,
  saveFolder,
  deleteMultipleFolders,
  assignFoldersToConversation,
  setCurrentConversationId,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [assignModalConversationId, setAssignModalConversationId] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const currentMessages = chatMessages[mode];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };

    const newMessages = [...currentMessages, userMessage];
    updateChatSession(newMessages);
    setInputValue('');
    setIsTyping(true);

    logger.log('ACTION', `User sent message: "${userMessage.text.slice(0, 50)}..."`);

    // Auto-create conversation if this is the first user message
    if (!currentConversationId && newMessages.length === 2) {
      const title = userMessage.text.slice(0, 50) + (userMessage.text.length > 50 ? '...' : '');
      const newId = createConversationPlaceholder(title);
      setCurrentConversationId(newId);
    }

    // Simulate AI response
    await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 400));

    let responseText: string;

    if (mode === 'Wizard') {
      responseText = "I'm in Wizard Mode (disconnected). To get AI-powered responses, go to the Engines tab and connect to an active engine.";
    } else {
      // RAG lookup
      const context = retrieveContext(userMessage.text);
      responseText = generateRAGResponse(userMessage.text, context);
      
      if (context.length > 0) {
        logger.log('INFO', `RAG found ${context.length} relevant sections`);
      }
    }

    const aiMessage: Message = {
      id: Date.now() + 1,
      text: responseText,
      sender: 'ai',
      timestamp: Date.now(),
    };

    updateChatSession([...newMessages, aiMessage]);
    setIsTyping(false);
    logger.log('INFO', 'AI response generated');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewConversation = () => {
    startNewConversation(currentMessages);
    setShowHistory(false);
    inputRef.current?.focus();
  };

  const assignModalConversation = conversations.find((c) => c.id === assignModalConversationId);

  return (
    <div className="h-full flex flex-col">
      {/* Header Controls */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <GlassButton
            size="sm"
            variant={showHistory ? 'primary' : 'default'}
            onClick={() => setShowHistory(!showHistory)}
          >
            📜 History
          </GlassButton>
          <GlassButton size="sm" variant="ghost" onClick={handleNewConversation}>
            ✨ New Chat
          </GlassButton>
        </div>
        <span className="text-xs text-gray-500">
          {mode === 'Sentient' ? `🟢 ${activeEngineId}` : '🔴 Disconnected'}
        </span>
      </div>

      {/* Main Content Area */}
      {showHistory ? (
        <div className="flex-grow overflow-y-auto space-y-4">
          <ConversationHistory
            conversations={conversations}
            folders={folders}
            currentConversationId={currentConversationId}
            onLoad={(id) => {
              loadConversation(id);
              setShowHistory(false);
            }}
            onDelete={deleteConversation}
            onDeleteMultiple={deleteMultipleConversations}
            onRename={renameConversation}
            onAssignFolders={setAssignModalConversationId}
          />
          <FolderManager
            folders={folders}
            onCreateFolder={saveFolder}
            onDeleteFolders={deleteMultipleFolders}
          />
        </div>
      ) : (
        <>
          {/* Messages Container */}
          <GlassPane className="flex-grow overflow-y-auto mb-3 min-h-0">
            <div className="space-y-1">
              {currentMessages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </GlassPane>

          {/* Input Area */}
          <div className="flex gap-2 flex-shrink-0">
            <GlassInput
              ref={inputRef}
              value={inputValue}
              onChange={setInputValue}
              onKeyDown={handleKeyPress}
              placeholder={
                mode === 'Sentient'
                  ? 'Ask the Librarian anything...'
                  : 'Wizard Mode - Limited responses'
              }
              disabled={isTyping}
              className="flex-grow"
            />
            <GlassButton
              variant="primary"
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
            >
              Send
            </GlassButton>
          </div>
        </>
      )}

      {/* Assign Folder Modal */}
      <AssignFolderModal
        isOpen={!!assignModalConversationId}
        onClose={() => setAssignModalConversationId(null)}
        conversation={assignModalConversation || null}
        folders={folders}
        onAssign={assignFoldersToConversation}
      />
    </div>
  );
};
