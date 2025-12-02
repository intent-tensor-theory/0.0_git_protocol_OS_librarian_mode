// ============================================
// PROTOCOL SELECTOR COMPONENT
// ============================================

import React, { useState } from 'react';
import type { ProtocolType } from '@/types';
import { PROTOCOL_DEFINITIONS, getProtocolById } from '@/constants';
import { GlassSelect } from '../ui/GlassSelect';
import { GlassPane } from '../ui/GlassPane';

type ProtocolSelectorProps = {
  value: ProtocolType;
  onChange: (protocol: ProtocolType) => void;
};

export const ProtocolSelector: React.FC<ProtocolSelectorProps> = ({
  value,
  onChange,
}) => {
  const [showWhitepaper, setShowWhitepaper] = useState(false);
  
  const selectedProtocol = getProtocolById(value);

  const options = PROTOCOL_DEFINITIONS.map((p) => ({
    value: p.id,
    label: p.name,
  }));

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <div className="flex-grow">
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
            Protocol
          </label>
          <GlassSelect
            value={value}
            onChange={(v) => onChange(v as ProtocolType)}
            options={options}
          />
        </div>
        <button
          onClick={() => setShowWhitepaper(!showWhitepaper)}
          className="mt-5 p-2 text-gray-400 hover:text-cyan-300 transition-colors"
          title="View protocol documentation"
        >
          📄
        </button>
      </div>

      {/* Protocol Description */}
      {selectedProtocol && (
        <p className="text-xs text-gray-400">{selectedProtocol.description}</p>
      )}

      {/* Whitepaper */}
      {showWhitepaper && selectedProtocol && (
        <GlassPane className="mt-2">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-bold text-cyan-300">
              📄 Protocol Whitepaper
            </h4>
            <button
              onClick={() => setShowWhitepaper(false)}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
          <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto">
            {selectedProtocol.whitepaper}
          </pre>
        </GlassPane>
      )}
    </div>
  );
};
