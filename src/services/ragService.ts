// ============================================
// RAG (Retrieval-Augmented Generation) SERVICE
// ============================================

import type { DocSection } from '@/types';
import { extractKeywords, calculateRelevance } from '@/utils/keywords';
import { DOCS_CONTENT } from '@/content/docsContent';
import { CODEBASE_CONTENT } from '@/content/codebaseContent';
import { config } from '@/config';

/**
 * Retrieves relevant documentation sections based on a query
 * Uses keyword extraction and scoring
 */
export const retrieveContext = (query: string): DocSection[] => {
  const keywords = extractKeywords(query);
  
  if (keywords.length === 0) {
    return [];
  }

  return findRelevantContent(keywords);
};

/**
 * Finds and scores content matching the given keywords
 */
const findRelevantContent = (keywords: string[]): DocSection[] => {
  const { titleWeight, contentWeight, maxResults } = config.rag.keyword;

  // Combine all content sources
  const allContent: DocSection[] = [
    ...DOCS_CONTENT,
    ...CODEBASE_CONTENT.map((file) => ({
      id: file.path,
      title: `Code File: ${file.path}`,
      content: file.content,
      source: 'codebase' as const,
    })),
  ];

  // Score each section
  const scoredContent = allContent
    .map((section) => ({
      section,
      score: calculateRelevance(
        keywords,
        section.title,
        section.content,
        titleWeight,
        contentWeight
      ),
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);

  return scoredContent.map(({ section }) => section);
};

/**
 * Generates an AI response using RAG context
 * Currently returns simulated responses
 */
export const generateRAGResponse = (
  query: string,
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

  return `Based on the documentation about "${sourceNames}":\n\n${truncatedContent}`;
};

/**
 * Adds training content to the RAG context
 */
export const addTrainingContext = (
  baseContext: DocSection[],
  trainingContent: DocSection[]
): DocSection[] => {
  return [...baseContext, ...trainingContent];
};
