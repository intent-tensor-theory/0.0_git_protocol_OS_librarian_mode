// ============================================
// RAG SYSTEM DOCUMENTATION
// ============================================

export const RAG_README_CONTENT = `
# RAG-Lite: Self-Documenting AI Without Vector Databases

## How This AI Understands Itself

The Librarian Protocol OS uses a lightweight Retrieval-Augmented Generation (RAG) 
system that allows the AI to answer questions about itself and the host application 
without requiring expensive vector databases or complex embeddings.

## The Magic: Keyword-Based Retrieval

When you ask a question, the system:

1. **Extracts Keywords**: Removes common words (the, a, is, etc.) to find meaningful terms
2. **Searches Content**: Looks through documentation and code files
3. **Scores Matches**: Weights title matches higher than content matches
4. **Returns Context**: Provides the top matches to the AI for response generation

## Content Sources

### Documentation (/content/docsContent.ts)
Pre-written explanations of features, organized by topic.
These get searched first and weighted heavily.

### Codebase (/content/codebaseContent.ts)
Key code files included for technical questions.
Allows the AI to explain implementation details.

### Training Profiles (User-Defined)
Custom knowledge uploaded by users.
Per-user personalization of AI responses.

## Why Not Vector Embeddings?

For a self-contained, clonable template:
- No external API costs for embeddings
- No database setup required
- Works offline
- Instant setup (clone → run → works)

## Upgrading to Vectors

When you need more sophisticated retrieval:
1. Change \`rag.provider\` in librarian.config.ts
2. Add Pinecone/Supabase credentials
3. The same content gets embedded automatically

## The Self-Documentation Principle

The key insight: **The app documents itself, then reads its own documentation.**

This creates a virtuous cycle:
- Developer adds features
- Developer documents features in /content
- AI immediately knows about features
- Users can ask about anything
- No separate "training" step required
`.trim();
