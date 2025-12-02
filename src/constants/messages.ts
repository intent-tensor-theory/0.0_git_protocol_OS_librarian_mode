// ============================================
// MESSAGE CONSTANTS
// ============================================

import type { Message } from '@/types';

export const INITIAL_SENTIENT_MESSAGE: Message = {
  id: 1,
  text: "Hi! I'm the Librarian, your self-documenting AI assistant. I can help you understand this app, configure API connections, and answer questions about the codebase. What would you like to know?",
  sender: 'ai',
  timestamp: Date.now(),
};

export const WIZARD_MODE_MESSAGES: Message[] = [
  {
    id: 1,
    text: "Welcome to Wizard Mode. I'm operating in a limited state for system setup and diagnostics.",
    sender: 'ai',
    timestamp: Date.now(),
  },
  {
    id: 2,
    text: 'How do I switch to Sentient Mode?',
    sender: 'user',
    timestamp: Date.now() + 1000,
  },
  {
    id: 3,
    text: "To switch to Sentient Mode, go to the 'Conversation Engines' tab and select an active AI engine from the dropdown. Once connected, I'll have full capabilities.",
    sender: 'ai',
    timestamp: Date.now() + 2000,
  },
];

export const INITIAL_CHAT_MESSAGES = {
  Sentient: [INITIAL_SENTIENT_MESSAGE],
  Wizard: WIZARD_MODE_MESSAGES,
};

// Simulated AI responses when no RAG match is found
export const FALLBACK_RESPONSES = [
  "I couldn't find specific documentation about that. Could you rephrase your question?",
  "That topic isn't in my current knowledge base. Try asking about app features or API configuration.",
  "I don't have information on that yet. Would you like to add it to a training profile?",
];

export const getRandomFallback = (): string => {
  return FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
};
