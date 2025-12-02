// ============================================
// REQUEST INPUT COMPONENT
// ============================================

import React from 'react';
import type { ProtocolType, HandshakeInput } from '@/types';
import { GlassTextarea } from '../ui/GlassTextarea';
import { GlassInput } from '../ui/GlassInput';

type RequestInputProps = {
  protocol: ProtocolType;
  input: HandshakeInput;
  onChange: (input: HandshakeInput) => void;
};

const PLACEHOLDER_TEXT: Record<string, string> = {
  'curl-default': `curl -X POST https://api.example.com/data \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{"key": "value"}'`,
  'graphql': `query {
  user(id: "123") {
    name
    email
  }
}`,
  'soap-xml': `<?xml version="1.0"?>
<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">
  <soap:Body>
    <GetUser xmlns="http://example.com/">
      <UserId>123</UserId>
    </GetUser>
  </soap:Body>
</soap:Envelope>`,
};

export const RequestInput: React.FC<RequestInputProps> = ({
  protocol,
  input,
  onChange,
}) => {
  const placeholder = PLACEHOLDER_TEXT[protocol] || 'Enter your request...';
  
  const getModelLabel = () => {
    switch (protocol) {
      case 'curl-default':
        return 'cURL Command';
      case 'graphql':
        return 'GraphQL Query';
      case 'soap-xml':
        return 'SOAP Envelope';
      case 'websocket':
        return 'Message Payload';
      case 'sse':
        return 'Connection Config';
      default:
        return 'Request Body';
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        Request Input
      </h4>

      {/* Main Request Body */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          {getModelLabel()}
        </label>
        <GlassTextarea
          value={input.model}
          onChange={(v) => onChange({ ...input, model: v })}
          placeholder={placeholder}
          rows={6}
          className="font-mono text-xs"
        />
      </div>

      {/* Dynamic Text / Variable Substitution */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Dynamic Text <span className="text-gray-500">(optional)</span>
        </label>
        <GlassInput
          value={input.dynamicText}
          onChange={(v) => onChange({ ...input, dynamicText: v })}
          placeholder="Use {INPUT} in request body to substitute this value"
        />
        <p className="text-[10px] text-gray-500 mt-1">
          Any occurrence of <code className="text-cyan-400">{'{INPUT}'}</code> in the
          request body will be replaced with this value.
        </p>
      </div>

      {/* Preview */}
      {input.dynamicText && input.model.includes('{INPUT}') && (
        <div className="p-2 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
          <p className="text-xs text-cyan-300 mb-1">Preview:</p>
          <code className="text-xs text-gray-300 whitespace-pre-wrap">
            {input.model.replace(/\{INPUT\}/g, input.dynamicText).slice(0, 200)}
            {input.model.length > 200 ? '...' : ''}
          </code>
        </div>
      )}
    </div>
  );
};
