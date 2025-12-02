// ============================================
// LIBRARIAN PROTOCOL OS - CONFIGURATION
// ============================================
// This is the ONE FILE you need to edit to configure your Librarian.
// All other configuration is derived from this file.

export const LIBRARIAN_CONFIG = {
  // ==========================================
  // APP IDENTITY
  // ==========================================
  app: {
    name: 'Librarian Protocol OS',
    version: '1.0.0',
    description: 'Self-documenting RAG-powered AI assistant',
  },

  // ==========================================
  // DATABASE CONFIGURATION
  // ==========================================
  // Start with localStorage, swap to Firebase/Supabase when ready
  database: {
    provider: 'localStorage' as const, // 'localStorage' | 'firebase' | 'supabase'
    
    // Uncomment when using Firebase
    // firebase: {
    //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // },
    
    // Uncomment when using Supabase
    // supabase: {
    //   url: import.meta.env.VITE_SUPABASE_URL,
    //   anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    // },
  },

  // ==========================================
  // AI PROVIDER CONFIGURATION
  // ==========================================
  // Start with simulation, swap to real AI when ready
  ai: {
    provider: 'simulation' as const, // 'simulation' | 'openai' | 'anthropic' | 'google'
    
    // Uncomment when using real AI
    // openai: {
    //   apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    //   model: 'gpt-4o',
    // },
    
    // anthropic: {
    //   apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    //   model: 'claude-3-opus-20240229',
    // },
    
    // google: {
    //   apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
    //   model: 'gemini-pro',
    // },
  },

  // ==========================================
  // RAG CONFIGURATION
  // ==========================================
  // Start with keyword search, upgrade to vectors when ready
  rag: {
    provider: 'keyword' as const, // 'keyword' | 'pinecone' | 'supabase-vectors'
    
    // Keyword search settings
    keyword: {
      maxResults: 2,
      titleWeight: 3,
      contentWeight: 1,
    },
    
    // Uncomment when using Pinecone
    // pinecone: {
    //   apiKey: import.meta.env.VITE_PINECONE_API_KEY,
    //   environment: import.meta.env.VITE_PINECONE_ENVIRONMENT,
    //   indexName: 'librarian-docs',
    // },
  },

  // ==========================================
  // FEATURE FLAGS
  // ==========================================
  features: {
    // Auth & Subscription
    auth: false,           // Enable login gate
    subscription: false,   // Enable paywall after login
    
    // Tabs
    conversation: true,    // Tab 1: AI Chat
    protocolOS: true,      // Tab 2: API Handshakes
    training: true,        // Tab 3: Custom Training
    humanLogs: true,       // Tab 4: Application Logs
    
    // Extras
    darkMode: true,        // Dark theme (glass aesthetic)
    animations: true,      // Pulsating effects
  },

  // ==========================================
  // UI CONFIGURATION
  // ==========================================
  ui: {
    // Librarian modal
    modal: {
      width: '640px',
      maxHeight: '85vh',
      position: 'right' as const, // 'right' | 'center' | 'left'
    },
    
    // Floating icon
    floatingIcon: {
      position: 'bottom-right' as const,
      size: '56px',
      connectedEmoji: '✨',
      disconnectedEmoji: '✨',
    },
    
    // Theme
    theme: {
      accentColor: 'cyan',
      glassOpacity: 0.1,
    },
  },

  // ==========================================
  // STORAGE KEYS
  // ==========================================
  storageKeys: {
    platforms: 'librarian-protocol-os-platforms',
    conversations: 'librarian-protocol-os-conversations',
    folders: 'librarian-protocol-os-folders',
    trainings: 'librarian-protocol-os-trainings',
    contacts: 'librarian-protocol-os-contacts',
  },
} as const;

// Type export for use throughout the app
export type LibrarianConfig = typeof LIBRARIAN_CONFIG;
