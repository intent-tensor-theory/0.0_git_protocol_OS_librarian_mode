# ✨ Librarian Protocol OS

A self-documenting AI assistant with universal API connectivity. Built with React, TypeScript, and a glass morphism design system.

https://render-protocol-os-librarian.onrender.com/


<img width="792" height="981" alt="image" src="https://github.com/user-attachments/assets/4fa80025-fc9c-4ca0-bb1d-5db7be8fbaef" />


## Overview

Librarian Protocol OS is a floating modal interface that provides:

- **AI Conversations** — RAG-powered chat that understands its own codebase
- **Protocol OS** — Universal API handshake system with 14 supported protocols
- **Training Profiles** — Custom personas and knowledge vaults
- **Human Interface** — Real-time logs and contact management

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

All configuration lives in **one file**: `librarian.config.ts`

```typescript
export const librarianConfig = {
  database: {
    provider: 'localStorage',  // 'localStorage' | 'firebase' | 'supabase'
  },
  ai: {
    provider: 'simulation',    // 'simulation' | 'openai' | 'anthropic' | 'google'
  },
  rag: {
    provider: 'keyword',       // 'keyword' | 'pinecone'
    maxResults: 2,
  },
  features: {
    auth: false,               // Enable login flow
    subscription: false,       // Enable subscription gates
  },
};
```

## Architecture

```
src/
├── components/
│   ├── auth/           # Login, Subscription, Profile
│   ├── conversation/   # Tab 1: Chat interface
│   ├── protocol/       # Tab 2: API connections
│   ├── training/       # Tab 3: Persona & knowledge
│   ├── human/          # Tab 4: Logs & contacts
│   ├── layout/         # Header, DocsPage, App shell
│   └── ui/             # Glass design system
├── hooks/
│   └── useLibrarian.ts # Master hook (composes all state)
├── services/
│   ├── logger.ts       # Centralized logging
│   ├── storage.ts      # Persistence abstraction
│   └── ragService.ts   # Keyword-based RAG
├── constants/
│   ├── engines.ts      # AI engine definitions
│   ├── protocols.ts    # 14 protocol definitions
│   └── messages.ts     # System messages
├── types/              # TypeScript definitions
├── utils/              # Helpers (cURL parser, PKCE, etc.)
└── content/            # RAG content (docs, codebase)
```

## 4-Tab Interface

| Tab | Purpose |
|-----|---------|
| **Conversation** | AI chat with RAG context, conversation history, folders |
| **Protocol OS / Sync** | Platform → Resource → Handshake hierarchy for APIs |
| **Train** | Persona cores, system prompts, knowledge vault |
| **Human** | Activity logs, contact manager, export tools |

## Supported Protocols

1. `curl-default` — Universal cURL passthrough
2. `oauth-pkce` — OAuth 2.0 with PKCE (SPAs)
3. `oauth-auth-code` — OAuth 2.0 Authorization Code
4. `oauth-implicit` — OAuth 2.0 Implicit (legacy)
5. `client-credentials` — OAuth 2.0 Client Credentials
6. `rest-api-key` — REST with API Key
7. `basic-auth` — HTTP Basic Authentication
8. `graphql` — GraphQL queries/mutations
9. `websocket` — WebSocket connections
10. `soap-xml` — SOAP/XML services
11. `grpc-web` — gRPC-Web protocol
12. `sse` — Server-Sent Events
13. `github-direct` — GitHub API shortcuts
14. `keyless-scraper` — Public endpoint scraping

## Design System

Glass morphism with cyan accent (#22d3ee):

- `GlassPane` — Container with backdrop blur
- `GlassButton` — Variants: default, primary, danger, ghost
- `GlassInput` — Text input with focus states
- `GlassSelect` — Dropdown selector
- `GlassTextarea` — Multi-line input
- `CollapsibleCard` — Expandable sections
- `Modal` — Full-screen overlay

## Data Flow

```
User Action
    ↓
useLibrarian (master hook)
    ↓
Sub-hooks (useAuth, useConversations, useProtocolOS, useTraining)
    ↓
Services (storage, logger, ragService)
    ↓
localStorage (or Firebase/Supabase)
```

## RAG System

The RAG service uses keyword-based search (no vectors required):

1. Extract keywords from user query
2. Search docs + codebase content
3. Score matches by keyword frequency + title weight
4. Return top N relevant sections
5. Include context in AI response

To add custom knowledge:
- Upload files via Train → Knowledge Vault
- Add to `src/content/docsContent.ts`
- Add to `src/content/codebaseContent.ts`

## Environment Variables

Copy `.env.example` to `.env` and configure:

```env
# AI Providers (optional - simulation mode works without)
VITE_OPENAI_API_KEY=
VITE_ANTHROPIC_API_KEY=
VITE_GOOGLE_AI_API_KEY=

# Database (optional - localStorage is default)
VITE_FIREBASE_API_KEY=
VITE_SUPABASE_URL=

# RAG (optional - keyword search is default)
VITE_PINECONE_API_KEY=
```

## Scripts

```bash
npm run dev      # Start dev server (port 5173)
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run typecheck # Run TypeScript compiler
```

## Tech Stack

- **React 18** — UI framework
- **TypeScript 5** — Type safety
- **Vite 5** — Build tool
- **Tailwind CSS 3** — Styling
- **localStorage** — Default persistence

## License

MIT

---

Built with Intent Tensor Theory principles. Self-documenting by design.
