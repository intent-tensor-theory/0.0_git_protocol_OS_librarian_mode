// ============================================
// SELF-DOCUMENTATION CONTENT
// ============================================
// This content is displayed on the Docs page AND used by the RAG system

import type { DocSection } from '@/types';
import { RAG_README_CONTENT } from './ragReadme';

export const DOCS_CONTENT: DocSection[] = [
  {
    id: 'intro',
    title: 'Welcome to the Librarian Protocol OS',
    content: `The Librarian Protocol OS is a self-documenting AI assistant framework. 
It ships as a clonable template that immediately works out of the box. 

The key innovation: this AI reads its own documentation and codebase, 
then answers questions about itself. No pre-training required.

Just add your app's documentation, and the Librarian instantly knows 
how to help your users.`,
    source: 'docs',
  },
  {
    id: 'modes',
    title: 'Switching Modes: Sentient vs. Wizard',
    content: `The Librarian operates in two modes:

**Sentient Mode** 🤖
- Connected to an AI engine
- Full conversational capabilities
- RAG-powered responses
- Access to all features

**Wizard Mode** 🧙‍♂️
- Disconnected state
- System setup and diagnostics
- Limited responses
- Use to configure before connecting

To switch from Wizard to Sentient: Go to the "Conversation Engines" tab 
and select an active engine from the dropdown.`,
    source: 'docs',
  },
  {
    id: 'floating-icon',
    title: 'The Floating Icon',
    content: `The ✨ icon in the bottom-right corner is your gateway to the Librarian.

- **Green border**: Connected (Sentient Mode)
- **Red border**: Disconnected (Wizard Mode)
- **Click**: Opens/closes the Librarian modal

The icon pulses gently to indicate the system is alive and ready.`,
    source: 'docs',
  },
  {
    id: 'tab-conversation',
    title: 'Tab 1: Conversation Engines',
    content: `The main chat interface for interacting with the AI.

**Features:**
- Real-time conversation with RAG context
- Conversation history with save/load
- Folder organization for conversations
- Engine selection dropdown
- New chat / delete conversation controls

**Dropdown Control:**
Click the tab to expand the engine selector. Choose from available 
AI engines (Gemini, Claude, GPT-4, etc.) or disconnect to enter Wizard Mode.`,
    source: 'docs',
  },
  {
    id: 'tab-sync',
    title: 'Tab 2: Sync (Protocol OS)',
    content: `The Universal API Handshake system for connecting to any external service.

**Hierarchy:**
- 🏢 Platform: Top-level (company/service)
- 📦 Resource: API endpoint or module  
- 🤝 Handshake: Actual API call configuration

**Supported Protocols (14):**
Universal cURL, OAuth PKCE, OAuth Auth Code, OAuth Implicit, 
Client Credentials, REST API Key, Basic Auth, GraphQL, 
WebSocket, SOAP/XML, gRPC-Web, SSE, GitHub Direct, Keyless Scraper

**Workflow:**
1. Click "+ Add Platform"
2. Fill platform details
3. Add resources within platform
4. Add handshakes within resources
5. Configure, test, and save`,
    source: 'docs',
  },
  {
    id: 'tab-train',
    title: 'Tab 3: Train (Custom Training)',
    content: `Create personalized AI profiles for different users or use cases.

**Training Profile Components:**

🧠 **Persona Core**
The system instruction that defines the AI's personality and behavior.
Example: "You are a friendly support agent who specializes in..."

📚 **Knowledge Vault**
Upload documents (.txt, .md, code files) that get added to the RAG context.
The AI will use these documents when answering questions.

**Per-User Training:**
Different users can have different training profiles active.
Same app, personalized AI experience.`,
    source: 'docs',
  },
  {
    id: 'tab-human',
    title: 'Tab 4: Human (Application Logs)',
    content: `Real-time logging of all application events.

**Log Types:**
- RENDER: Component renders
- ACTION: User interactions
- INFO: General information
- SUCCESS: Successful operations
- WARNING: Potential issues
- ERROR: Failures and exceptions
- SYSTEM: System-level events

**Controls:**
- Copy: Export logs to clipboard
- Clear: Remove all logs

Useful for debugging and monitoring application behavior.`,
    source: 'docs',
  },
  {
    id: 'rag-system',
    title: 'How the RAG System Works',
    content: RAG_README_CONTENT,
    source: 'docs',
  },
  {
    id: 'configuration',
    title: 'Configuration: librarian.config.ts',
    content: `All configuration is centralized in one file: librarian.config.ts

**Sections:**

🔧 **app**: Name, version, description
💾 **database**: localStorage, Firebase, or Supabase
🤖 **ai**: Simulation, OpenAI, Anthropic, or Google
🔍 **rag**: Keyword search or vector embeddings
🎛️ **features**: Toggle tabs and functionality
🎨 **ui**: Modal size, icon position, theme

**Getting Started:**
1. Clone the repo
2. Edit librarian.config.ts
3. npm install && npm run dev
4. The Librarian works immediately`,
    source: 'docs',
  },
  {
    id: 'developer-workflow',
    title: 'Developer Workflow',
    content: `How to integrate the Librarian into your app:

1. **Clone**: Get the template
2. **Configure**: Edit librarian.config.ts
3. **Document**: Add your app docs to /content/docsContent.ts
4. **Build**: Create your app pages alongside the Librarian
5. **Deploy**: The Librarian comes with your app

**Adding Documentation:**
Edit src/content/docsContent.ts to add your own documentation sections.
These automatically become searchable by the AI.

**Adding Code Context:**
Edit src/content/codebaseContent.ts to include key code files.
The AI can then explain implementation details.`,
    source: 'docs',
  },
];
