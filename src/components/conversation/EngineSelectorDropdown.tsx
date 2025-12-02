// ============================================
// ENGINE SELECTOR DROPDOWN COMPONENT
// ============================================

import React from 'react';
import { AVAILABLE_ENGINES, STATUS_MAP } from '@/constants';
import { GlassButton } from '../ui/GlassButton';

type EngineSelectorDropdownProps = {
  isSentient: boolean;
  activeEngineId: string;
  onEngineSelect: (engineId: string) => void;
};

export const EngineSelectorDropdown: React.FC<EngineSelectorDropdownProps> = ({
  isSentient,
  activeEngineId,
  onEngineSelect,
}) => {
  return (
    <div className="space-y-4">
      {/* Mode Indicator */}
      <div className="flex items-center gap-3">
        <span className="text-lg">
          {isSentient ? '🤖' : '🧙‍♂️'}
        </span>
        <div>
          <p className="text-sm font-bold text-white">
            {isSentient ? 'Sentient Mode' : 'Wizard Mode'}
          </p>
          <p className="text-xs text-gray-400">
            {isSentient
              ? 'AI-powered responses with RAG context'
              : 'Disconnected - Setup and diagnostics only'}
          </p>
        </div>
      </div>

      {/* Engine List */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Available Engines
        </p>
        {AVAILABLE_ENGINES.map((engine) => {
          const status = STATUS_MAP[engine.status];
          const isActive = engine.id === activeEngineId && isSentient;
          
          return (
            <button
              key={engine.id}
              onClick={() => onEngineSelect(engine.id)}
              disabled={engine.status === 'disconnected'}
              className={`
                w-full p-3 rounded-lg text-left transition-all
                ${isActive
                  ? 'bg-cyan-500/20 ring-1 ring-cyan-400'
                  : 'bg-white/5 hover:bg-white/10'
                }
                ${engine.status === 'disconnected' ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-white">
                    {engine.name}
                  </p>
                  <p className="text-xs text-gray-400">{engine.schema}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg">{status.icon}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${status.colorClass}`}>
                    {status.text}
                  </span>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                <span>Last edited: {engine.lastEdited}</span>
                <span className="font-mono">{engine.serialNumber.slice(0, 20)}...</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Disconnect Button */}
      {isSentient && (
        <GlassButton
          variant="danger"
          size="sm"
          onClick={() => onEngineSelect('disconnect')}
          className="w-full"
        >
          🔌 Disconnect (Enter Wizard Mode)
        </GlassButton>
      )}
    </div>
  );
};
