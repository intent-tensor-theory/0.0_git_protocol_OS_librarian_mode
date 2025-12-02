// ============================================
// CODEBASE CONTENT FOR RAG
// ============================================
// Key code files included in RAG context for technical questions

import type { DocSection } from './docsContent';

export const CODEBASE_CONTENT: DocSection[] = [
  {
    id: 'code-config',
    title: 'librarian.config.ts - Main Configuration',
    content: `The main configuration file for Librarian Protocol OS.
Edit this single file to configure:
- Database provider (localStorage, Firebase, Supabase)
- AI provider (simulation, OpenAI, Anthropic, Google)
- RAG provider (keyword, Pinecone)
- Feature flags (auth, subscription)
- UI settings (modal size, theme)

Example configuration:
export const librarianConfig = {
  database: { provider: 'localStorage' },
  ai: { provider: 'simulation' },
  rag: { provider: 'keyword', maxResults: 2 },
  features: { auth: false, subscription: false },
};`,
  },
  {
    id: 'code-hooks',
    title: 'useLibrarian.ts - Master Hook',
    content: `The master React hook that composes all state management.
Combines: useAuth, useConversations, useProtocolOS, useTraining.
Manages: logs, contacts, UI state (active tab, modal visibility).
Returns everything needed for the entire application.

Usage:
const librarian = useLibrarian();
const { conversations, addMessage, platforms, logs } = librarian;`,
  },
  {
    id: 'code-rag',
    title: 'ragService.ts - RAG Service',
    content: `Keyword-based retrieval system for documentation.
Functions:
- retrieveContext(query): Finds relevant doc sections
- formatContextForPrompt(sections): Formats for AI prompt
- generateRAGResponse(query, context): Creates response

Uses keyword matching with title weighting.
Searches both DOCS_CONTENT and CODEBASE_CONTENT.`,
  },
  {
    id: 'code-protocols',
    title: 'protocols.ts - Protocol Definitions',
    content: `Defines all 14 supported API protocols:
1. curl-default - Universal cURL passthrough
2. oauth-pkce - OAuth 2.0 with PKCE
3. oauth-auth-code - OAuth 2.0 Authorization Code
4. oauth-implicit - OAuth 2.0 Implicit (legacy)
5. client-credentials - OAuth 2.0 Client Credentials
6. rest-api-key - REST with API Key
7. basic-auth - HTTP Basic Authentication
8. graphql - GraphQL queries/mutations
9. websocket - WebSocket connections
10. soap-xml - SOAP/XML services
11. grpc-web - gRPC-Web protocol
12. sse - Server-Sent Events
13. github-direct - GitHub API shortcuts
14. keyless-scraper - Public endpoint scraping

Each protocol has: id, name, category, description, fields, whitepaper.`,
  },
  {
    id: 'code-storage',
    title: 'storage.ts - Storage Service',
    content: `Abstraction layer for data persistence.
Currently supports localStorage with structure ready for:
- Firebase Firestore
- Supabase PostgreSQL

Provides typed get/set operations with JSON serialization.
All hooks use this service for persistence.`,
  },
];
