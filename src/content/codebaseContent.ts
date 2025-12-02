// ============================================
// CODEBASE CONTENT FOR RAG
// ============================================
// Key code files included in RAG context for technical questions

export type CodeFile = {
  path: string;
  content: string;
};

export const CODEBASE_CONTENT: CodeFile[] = [
  {
    path: 'librarian.config.ts',
    content: `// The main configuration file for Librarian Protocol OS
// Edit this single file to configure:
// - Database provider (localStorage, Firebase, Supabase)
// - AI provider (simulation, OpenAI, Anthropic, Google)
// - RAG provider (keyword, Pinecone, Supabase vectors)
// - Feature flags (auth, subscription, tabs)
// - UI settings (modal size, theme, animations)

export const LIBRARIAN_CONFIG = {
  database: { provider: 'localStorage' },
  ai: { provider: 'simulation' },
  rag: { provider: 'keyword', keyword: { maxResults: 2 } },
  features: { auth: false, protocolOS: true, training: true },
  // ... more settings
};`,
  },
  {
    path: 'src/hooks/useLibrarian.ts',
    content: `// Master state management hook
// Combines all sub-hooks into a single interface
// Manages: auth, conversations, folders, platforms, trainings, logs

// Returns everything needed to run the Librarian:
// - Auth state and methods (login, logout, subscribe)
// - Conversation CRUD operations
// - Folder management
// - Protocol OS platform/resource/handshake CRUD
// - Training profile management
// - Log access and clearing`,
  },
  {
    path: 'src/services/ragService.ts',
    content: `// RAG (Retrieval-Augmented Generation) Service
// Provides context to AI responses by searching documentation

// retrieveContext(query: string): DocSection[]
// 1. Extracts keywords from query (removes stopwords)
// 2. Searches docsContent and codebaseContent
// 3. Scores matches (title matches weighted 3x)
// 4. Returns top 2 most relevant sections

// The AI uses these sections to generate informed responses`,
  },
  {
    path: 'src/components/LibrarianModal.tsx',
    content: `// The main modal component with 4 tabs
// Tabs: Conversation, Sync (Protocol OS), Train, Human

// State management:
// - activeSection: which tab is active
// - isDropdownExpanded: tab-specific dropdown visibility
// - globalIsConnected: Sentient vs Wizard mode

// Each tab has:
// - A dropdown control (expanded when clicking active tab)
// - A main content panel`,
  },
  {
    path: 'src/components/protocol/ProtocolOSPanel.tsx',
    content: `// The Protocol OS panel for managing API connections
// Hierarchical structure: Platform → Resource → Handshake

// Features:
// - Create nested platform/resource/handshake in one flow
// - 14 protocol types supported
// - Live execution testing
// - Persistent storage
// - One-click rerun of saved handshakes`,
  },
  {
    path: 'src/types/protocol.ts',
    content: `// Protocol OS type definitions

type Platform = {
  id, serial, version, baseName,
  url, description, documentationUrl, authNotes,
  resources: Resource[]
};

type Resource = {
  id, serial, version, baseName,
  url, description, documentationUrl, notes,
  handshakes: Handshake[]
};

type Handshake = {
  id, serial, version, baseName,
  protocol: ProtocolType,
  config: Record<string, string>,
  input: { model: string, dynamicText: string },
  output?: { status, method, size, response }
};`,
  },
];
