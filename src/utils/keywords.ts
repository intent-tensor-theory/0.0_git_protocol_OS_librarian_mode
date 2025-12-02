// ============================================
// KEYWORD EXTRACTION UTILITIES
// ============================================

// Common English stopwords to filter out
export const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
  'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
  'would', 'should', 'could', 'may', 'might', 'can', 'about', 'into',
  'through', 'during', 'before', 'after', 'above', 'below', 'between',
  'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when',
  'where', 'why', 'how', 'all', 'both', 'each', 'few', 'more', 'most',
  'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same',
  'so', 'than', 'too', 'very', 'just', 'these', 'those', 'this', 'that',
  'what', 'who', 'which', 'i', 'me', 'my', 'you', 'your', 'it', 'its',
  'we', 'our', 'they', 'their', 'he', 'she', 'him', 'her', 'if', 'any',
]);

/**
 * Extracts meaningful keywords from a query string
 * Removes punctuation, converts to lowercase, filters stopwords
 */
export const extractKeywords = (query: string): string[] => {
  return query
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove punctuation
    .split(/\s+/)
    .filter((word) => word && word.length > 1 && !STOPWORDS.has(word));
};

/**
 * Calculates a simple relevance score between keywords and text
 */
export const calculateRelevance = (
  keywords: string[],
  title: string,
  content: string,
  titleWeight = 3,
  contentWeight = 1
): number => {
  if (keywords.length === 0) return 0;

  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();
  let score = 0;

  for (const keyword of keywords) {
    if (lowerTitle.includes(keyword)) {
      score += titleWeight;
    }
    if (lowerContent.includes(keyword)) {
      score += contentWeight;
    }
  }

  return score;
};
