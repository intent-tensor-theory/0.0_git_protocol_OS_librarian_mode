// ============================================
// TRAINING TYPES
// ============================================

export type KnowledgeFile = {
  id: string;
  name: string;
  content: string;
  size: number;
  uploadedAt: number;
};

export type Training = {
  id: string;
  title: string;
  personaCore: string; // System instruction for AI
  knowledgeVault: KnowledgeFile[];
  createdAt: number;
  updatedAt: number;
  isActive?: boolean;
};

// RAG content section (used by ragService)
export type DocSection = {
  id: string;
  title: string;
  content: string;
  source?: 'docs' | 'codebase' | 'training';
};
