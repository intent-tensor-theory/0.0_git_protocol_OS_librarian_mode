// ============================================
// PROTOCOL OS TYPES
// ============================================

export type ProtocolType =
  | 'curl-default'
  | 'oauth-pkce'
  | 'oauth-auth-code'
  | 'oauth-implicit'
  | 'client-credentials'
  | 'rest-api-key'
  | 'basic-auth'
  | 'graphql'
  | 'websocket'
  | 'soap-xml'
  | 'grpc-web'
  | 'sse'
  | 'github-direct'
  | 'keyless-scraper';

export type HandshakeInput = {
  model: string;       // The request body/query/command
  dynamicText: string; // Variable substitution text
};

export type HandshakeOutput = {
  status?: number;
  method?: string;
  size?: number;
  response?: unknown;
  executedAt?: number;
};

export type Handshake = {
  id: string;
  serial: string;
  version: string;
  baseName: string;
  protocol: ProtocolType;
  config: Record<string, string>;
  input: HandshakeInput;
  output?: HandshakeOutput;
};

export type Resource = {
  id: string;
  serial: string;
  version: string;
  baseName: string;
  url?: string;
  description?: string;
  documentationUrl?: string;
  notes?: string;
  handshakes: Handshake[];
};

export type Platform = {
  id: string;
  serial: string;
  version: string;
  baseName: string;
  url?: string;
  description?: string;
  documentationUrl?: string;
  authNotes?: string;
  resources: Resource[];
};

// Protocol config field definitions
export type ProtocolField = {
  key: string;
  label: string;
  type: 'text' | 'password' | 'url' | 'textarea';
  placeholder?: string;
  required?: boolean;
};

export type ProtocolDefinition = {
  id: ProtocolType;
  name: string;
  description: string;
  whitepaper: string;
  fields: ProtocolField[];
  requiresCallback?: boolean;
};
