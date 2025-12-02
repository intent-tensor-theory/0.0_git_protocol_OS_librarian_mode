// ============================================
// RAG SERVICE - KEYWORD-BASED RETRIEVAL
// ============================================

import { DOCS_CONTENT, type DocSection } from '@/content/docsContent';
import { CODEBASE_CONTENT } from '@/content/codebaseContent';
import { extractKeywords } from '@/utils/keywords';

const ALL_DOCS = [...DOCS_CONTENT, ...CODEBASE_CONTENT];

/**
 * Retrieves relevant documentation sections based on a query
 * Uses keyword matching with title weighting
 */
export const retrieveContext = (query: string): DocSection[] => {
  const keywords = extractKeywords(query);

  if (keywords.length === 0) {
    return [];
  }

  // Score each document section
  const scored = ALL_DOCS.map((doc) => {
    const titleLower = doc.title.toLowerCase();
    const contentLower = doc.content.toLowerCase();

    let score = 0;

    keywords.forEach((keyword) => {
      // Title matches are worth more
      if (titleLower.includes(keyword)) {
        score += 3;
      }
      // Count content occurrences
      const contentMatches = (
        contentLower.match(new RegExp(keyword, 'g')) || []
      ).length;
      score += contentMatches;
    });

    return { doc, score };
  });

  // Sort by score and return top results
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((s) => s.doc);
};

/**
 * Formats context sections for inclusion in a prompt
 */
export const formatContextForPrompt = (sections: DocSection[]): string => {
  if (sections.length === 0) return '';

  return sections
    .map((s) => `## ${s.title}\n${s.content}`)
    .join('\n\n---\n\n');
};

/**
 * Generates an AI response using RAG context
 * Currently returns simulated responses
 */
export const generateRAGResponse = (
  _query: string,
  context: DocSection[]
): string => {
  if (context.length === 0) {
    return `I couldn't find specific information about that in my documentation. Could you try rephrasing your question, or ask about a specific feature of this app?`;
  }

  const sourceNames = context.map((s) => s.title).join(' & ');
  const primaryContent = context[0].content;

  // Truncate if too long
  const maxContentLength = 500;
  const truncatedContent =
    primaryContent.length > maxContentLength
      ? primaryContent.substring(0, maxContentLength) + '...'
      : primaryContent;

  return `Based on my documentation (${sourceNames}):\n\n${truncatedContent}\n\nWould you like me to elaborate on any part of this?`;
};
