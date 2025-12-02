// ============================================
// CONVERSATION TYPES
// ============================================

export type MessageSender = 'ai' | 'user';

export type Message = {
  id: number;
  text: string;
  sender: MessageSender;
  timestamp?: number;
};

export type Conversation = {
  id: string;
  title: string;
  messagesJson: string; // Serialized Message[]
  createdAt: number;
  updatedAt: Date;
  folderIds?: string[];
};

export type Folder = {
  id: string;
  name: string;
  createdAt: Date;
  conversationIds?: string[];
};

export type ChatMessages = {
  Sentient: Message[];
  Wizard: Message[];
};
