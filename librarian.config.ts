// ============================================
// LIBRARIAN CONFIGURATION
// THE ONE FILE TO EDIT
// ============================================

export interface LibrarianConfig {
  database: {
    provider: 'localStorage' | 'firebase' | 'supabase';
    firebaseConfig?: {
      apiKey: string;
      authDomain: string;
      projectId: string;
    };
    supabaseConfig?: {
      url: string;
      anonKey: string;
    };
  };
  ai: {
    provider: 'simulation' | 'openai' | 'anthropic' | 'google';
    apiKey?: string;
    model?: string;
  };
  rag: {
    provider: 'keyword' | 'pinecone';
    pineconeConfig?: {
      apiKey: string;
      environment: string;
      indexName: string;
    };
    maxResults: number;
  };
  features: {
    auth: boolean;
    subscription: boolean;
  };
}

export const librarianConfig: LibrarianConfig = {
  // ==========================================
  // DATABASE CONFIGURATION
  // ==========================================
  database: {
    provider: 'localStorage',
    // Uncomment and configure for Firebase:
    // provider: 'firebase',
    // firebaseConfig: {
    //   apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    //   authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    //   projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    // },
    // Uncomment and configure for Supabase:
    // provider: 'supabase',
    // supabaseConfig: {
    //   url: import.meta.env.VITE_SUPABASE_URL,
    //   anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    // },
  },

  // ==========================================
  // AI PROVIDER CONFIGURATION
  // ==========================================
  ai: {
    provider: 'simulation',
    // Uncomment and configure for OpenAI:
    // provider: 'openai',
    // apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    // model: 'gpt-4-turbo-preview',
    // Uncomment and configure for Anthropic:
    // provider: 'anthropic',
    // apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
    // model: 'claude-3-opus-20240229',
    // Uncomment and configure for Google:
    // provider: 'google',
    // apiKey: import.meta.env.VITE_GOOGLE_AI_API_KEY,
    // model: 'gemini-pro',
  },

  // ==========================================
  // RAG CONFIGURATION
  // ==========================================
  rag: {
    provider: 'keyword',
    maxResults: 2,
    // Uncomment and configure for Pinecone:
    // provider: 'pinecone',
    // pineconeConfig: {
    //   apiKey: import.meta.env.VITE_PINECONE_API_KEY,
    //   environment: 'us-east-1-aws',
    //   indexName: 'librarian-docs',
    // },
  },

  // ==========================================
  // FEATURE FLAGS
  // ==========================================
  features: {
    auth: false,        // Set to true to enable login flow
    subscription: false, // Set to true to require subscription
  },
};

// ==========================================
// UI CONFIGURATION
// ==========================================
export const uiConfig = {
  floatingIcon: {
    position: 'bottom-right' as const,
    size: 56,
    icon: '✨',
  },
  modal: {
    width: 900,
    height: 700,
  },
  theme: {
    primary: '#22d3ee',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },
};
