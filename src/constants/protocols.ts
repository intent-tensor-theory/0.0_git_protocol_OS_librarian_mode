// ============================================
// PROTOCOL DEFINITIONS
// ============================================

import type { ProtocolDefinition } from '@/types';

export const PROTOCOL_DEFINITIONS: ProtocolDefinition[] = [
  {
    id: 'curl-default',
    name: 'Universal cURL',
    description: 'Execute any HTTP request using cURL syntax',
    whitepaper: `UNIVERSAL cURL MODE - DEFAULT READY STATE

The universal cURL mode allows you to execute any HTTP request by pasting a cURL command directly.
This is the most flexible option for testing and integrating APIs.

SUPPORTED FEATURES:
• All HTTP methods (GET, POST, PUT, DELETE, PATCH, etc.)
• Custom headers (-H flag)
• Request body (-d or --data flag)
• Basic authentication (-u flag)
• Follow redirects (-L flag)

EXAMPLE:
curl -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{"key": "value"}'`,
    fields: [],
  },
  {
    id: 'oauth-pkce',
    name: 'OAuth 2.0 PKCE',
    description: 'Secure authorization for public clients',
    whitepaper: `OAuth 2.0 PKCE FLOW - SECURE AUTHORIZATION

PKCE (Proof Key for Code Exchange) is the recommended OAuth flow for public clients like SPAs.
It prevents authorization code interception attacks.

FLOW:
1. Generate code_verifier (random string)
2. Create code_challenge = SHA256(code_verifier)
3. Redirect user to authorization URL with challenge
4. Receive authorization code
5. Exchange code + verifier for tokens

SECURITY: No client secret required. The code_verifier proves possession.`,
    fields: [
      { key: 'clientId', label: 'Client ID', type: 'text', required: true },
      { key: 'authUrl', label: 'Authorization URL', type: 'url', required: true },
      { key: 'tokenUrl', label: 'Token URL', type: 'url', required: true },
      { key: 'redirectUri', label: 'Redirect URI', type: 'url', required: true },
      { key: 'scope', label: 'Scopes', type: 'text', placeholder: 'openid profile email' },
    ],
    requiresCallback: true,
  },
  {
    id: 'oauth-auth-code',
    name: 'OAuth 2.0 Auth Code',
    description: 'Authorization code flow for confidential clients',
    whitepaper: `OAUTH 2.0 AUTHORIZATION CODE FLOW

The standard OAuth flow for server-side applications with secure client secret storage.

FLOW:
1. Redirect user to authorization URL
2. User grants permission
3. Receive authorization code via callback
4. Exchange code + client_secret for tokens

SECURITY: Requires secure storage of client_secret.`,
    fields: [
      { key: 'clientId', label: 'Client ID', type: 'text', required: true },
      { key: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
      { key: 'authUrl', label: 'Authorization URL', type: 'url', required: true },
      { key: 'tokenUrl', label: 'Token URL', type: 'url', required: true },
      { key: 'redirectUri', label: 'Redirect URI', type: 'url', required: true },
      { key: 'scope', label: 'Scopes', type: 'text' },
    ],
    requiresCallback: true,
  },
  {
    id: 'oauth-implicit',
    name: 'OAuth 2.0 Implicit',
    description: 'Legacy flow - tokens returned directly (not recommended)',
    whitepaper: `OAUTH 2.0 IMPLICIT GRANT FLOW

⚠️ LEGACY FLOW - Use PKCE instead for new applications.

Tokens are returned directly in the URL fragment. No refresh tokens available.
Only use if the authorization server doesn't support PKCE.`,
    fields: [
      { key: 'clientId', label: 'Client ID', type: 'text', required: true },
      { key: 'authUrl', label: 'Authorization URL', type: 'url', required: true },
      { key: 'redirectUri', label: 'Redirect URI', type: 'url', required: true },
      { key: 'scope', label: 'Scopes', type: 'text' },
    ],
    requiresCallback: true,
  },
  {
    id: 'client-credentials',
    name: 'OAuth 2.0 Client Credentials',
    description: 'Machine-to-machine authentication',
    whitepaper: `OAUTH 2.0 CLIENT CREDENTIALS FLOW

For server-to-server communication where no user is involved.
The application authenticates as itself using client_id and client_secret.

USE CASES:
• Background services
• Scheduled jobs
• API-to-API communication`,
    fields: [
      { key: 'clientId', label: 'Client ID', type: 'text', required: true },
      { key: 'clientSecret', label: 'Client Secret', type: 'password', required: true },
      { key: 'tokenUrl', label: 'Token URL', type: 'url', required: true },
      { key: 'scope', label: 'Scopes', type: 'text' },
    ],
  },
  {
    id: 'rest-api-key',
    name: 'REST API Key',
    description: 'Simple API key authentication',
    whitepaper: `REST API WITH API KEY AUTHENTICATION

The simplest form of API authentication. Include your API key in request headers.

COMMON PATTERNS:
• Authorization: Bearer YOUR_KEY
• X-API-Key: YOUR_KEY
• Custom header specified by the API`,
    fields: [
      { key: 'apiUrl', label: 'API URL', type: 'url', required: true },
      { key: 'apiKey', label: 'API Key', type: 'password', required: true },
      { key: 'headerName', label: 'Header Name', type: 'text', placeholder: 'Authorization' },
    ],
  },
  {
    id: 'basic-auth',
    name: 'HTTP Basic Auth',
    description: 'Username and password authentication',
    whitepaper: `HTTP BASIC AUTHENTICATION

Credentials sent as Base64-encoded "username:password" in the Authorization header.

SECURITY WARNING:
Always use HTTPS. Credentials are only encoded, not encrypted.`,
    fields: [
      { key: 'apiUrl', label: 'API URL', type: 'url', required: true },
      { key: 'username', label: 'Username', type: 'text', required: true },
      { key: 'password', label: 'Password', type: 'password', required: true },
    ],
  },
  {
    id: 'graphql',
    name: 'GraphQL',
    description: 'Query language for APIs',
    whitepaper: `GRAPHQL API PROTOCOL

GraphQL provides a complete description of the data in your API.
Request exactly what you need, nothing more.

FEATURES:
• Single endpoint
• Strongly typed schema
• Real-time subscriptions
• Introspection`,
    fields: [
      { key: 'apiUrl', label: 'GraphQL Endpoint', type: 'url', required: true },
      { key: 'authToken', label: 'Auth Token (optional)', type: 'password' },
    ],
  },
  {
    id: 'websocket',
    name: 'WebSocket',
    description: 'Real-time bidirectional communication',
    whitepaper: `WEBSOCKET REAL-TIME PROTOCOL

Full-duplex communication channel over a single TCP connection.
Ideal for real-time applications like chat, live feeds, and gaming.

LIFECYCLE:
1. HTTP upgrade handshake
2. Persistent connection established
3. Bidirectional message exchange
4. Close handshake`,
    fields: [
      { key: 'wsUrl', label: 'WebSocket URL', type: 'url', required: true, placeholder: 'wss://...' },
    ],
  },
  {
    id: 'soap-xml',
    name: 'SOAP/XML',
    description: 'XML-based web service protocol',
    whitepaper: `SOAP/XML WEB SERVICE PROTOCOL

SOAP (Simple Object Access Protocol) uses XML for message format.
Common in enterprise systems and legacy integrations.

STRUCTURE:
• Envelope (root element)
• Header (optional metadata)
• Body (the actual message)
• Fault (error handling)`,
    fields: [
      { key: 'apiUrl', label: 'SOAP Endpoint', type: 'url', required: true },
      { key: 'soapAction', label: 'SOAPAction Header', type: 'text' },
    ],
  },
  {
    id: 'grpc-web',
    name: 'gRPC-Web',
    description: 'Browser-compatible gRPC',
    whitepaper: `GRPC-WEB PROTOCOL

gRPC-Web enables browser clients to access gRPC services.
Uses Protocol Buffers for efficient serialization.

REQUIREMENTS:
• gRPC-Web proxy (Envoy) or direct server support
• Proto file definitions
• Code generation for client stubs`,
    fields: [
      { key: 'apiUrl', label: 'gRPC-Web Endpoint', type: 'url', required: true },
      { key: 'serviceName', label: 'Service Name', type: 'text', required: true },
    ],
  },
  {
    id: 'sse',
    name: 'Server-Sent Events',
    description: 'Server-to-client streaming',
    whitepaper: `SERVER-SENT EVENTS PROTOCOL

One-way real-time updates from server to client over HTTP.
Simpler than WebSockets when you only need server push.

FEATURES:
• Automatic reconnection
• Event IDs for resume
• Named event types
• Text-based (UTF-8)`,
    fields: [
      { key: 'eventUrl', label: 'SSE Endpoint', type: 'url', required: true },
      { key: 'authToken', label: 'Auth Token (optional)', type: 'password' },
    ],
  },
  {
    id: 'github-direct',
    name: 'GitHub Direct',
    description: 'Direct GitHub API access',
    whitepaper: `GITHUB DIRECT CONNECT - CUSTOM PROTOCOL

Optimized configuration for GitHub's REST and GraphQL APIs.
Includes automatic token handling and rate limit awareness.

ENDPOINTS:
• REST: https://api.github.com
• GraphQL: https://api.github.com/graphql`,
    fields: [
      { key: 'personalAccessToken', label: 'Personal Access Token', type: 'password', required: true },
      { key: 'apiVersion', label: 'API Version', type: 'text', placeholder: '2022-11-28' },
    ],
  },
  {
    id: 'keyless-scraper',
    name: 'Keyless Scraper',
    description: 'Web scraping without authentication',
    whitepaper: `KEYLESS ACCESS - WEB SCRAPER / DATA MINING

Access publicly available web content without authentication.
Use responsibly and respect robots.txt.

CONSIDERATIONS:
• Rate limiting
• User-Agent headers
• Legal compliance
• Terms of service`,
    fields: [
      { key: 'targetUrl', label: 'Target URL', type: 'url', required: true },
      { key: 'userAgent', label: 'User-Agent', type: 'text', placeholder: 'Mozilla/5.0...' },
    ],
  },
];

export const getProtocolById = (id: string): ProtocolDefinition | undefined => {
  return PROTOCOL_DEFINITIONS.find((p) => p.id === id);
};

export const CALLBACK_PROTOCOLS = ['oauth-pkce', 'oauth-auth-code', 'oauth-implicit'];
