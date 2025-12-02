// ============================================
// PROTOCOL DROPDOWN COMPONENT
// ============================================

import React from 'react';
import { PROTOCOL_DEFINITIONS } from '@/constants';

export const ProtocolDropdown: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-lg">🔗</span>
        <div>
          <p className="text-sm font-bold text-white">Protocol OS</p>
          <p className="text-xs text-gray-400">
            Universal API handshake system — connect to any service
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-cyan-300">
            {PROTOCOL_DEFINITIONS.length}
          </p>
          <p className="text-xs text-gray-400">Supported Protocols</p>
        </div>
        <div className="p-3 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-purple-300">3</p>
          <p className="text-xs text-gray-400">Hierarchy Levels</p>
        </div>
      </div>

      {/* Hierarchy Explanation */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Data Hierarchy
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <span>🏢</span>
            <span className="text-white font-medium">Platform</span>
            <span className="text-gray-500">— Company or service (e.g., Google)</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded ml-4">
            <span>📦</span>
            <span className="text-white font-medium">Resource</span>
            <span className="text-gray-500">— API endpoint (e.g., Calendar API)</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded ml-8">
            <span>🤝</span>
            <span className="text-white font-medium">Handshake</span>
            <span className="text-gray-500">— Actual API call config</span>
          </div>
        </div>
      </div>

      {/* Protocol Categories */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Protocol Categories
        </p>
        <div className="flex flex-wrap gap-1">
          {['OAuth', 'REST', 'GraphQL', 'WebSocket', 'SOAP', 'gRPC', 'SSE'].map(
            (cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 text-[10px] bg-purple-500/20 text-purple-300 rounded-full"
              >
                {cat}
              </span>
            )
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <p className="text-xs text-cyan-300">
          💡 <strong>Getting Started:</strong> Click "+ Add Platform" below to
          create your first API connection. You can add resources and handshakes
          in one flow.
        </p>
      </div>
    </div>
  );
};
