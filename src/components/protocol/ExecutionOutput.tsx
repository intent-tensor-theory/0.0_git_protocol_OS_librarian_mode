// ============================================
// EXECUTION OUTPUT COMPONENT
// ============================================

import React, { useState } from 'react';
import type { HandshakeOutput } from '@/types';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';

type ExecutionOutputProps = {
  output: HandshakeOutput | null;
  isExecuting: boolean;
  onExecute: () => void;
  logs: string[];
};

export const ExecutionOutput: React.FC<ExecutionOutputProps> = ({
  output,
  isExecuting,
  onExecute,
  logs,
}) => {
  const [activeTab, setActiveTab] = useState<'response' | 'logs'>('response');

  const formatResponse = (response: unknown): string => {
    try {
      return JSON.stringify(response, null, 2);
    } catch {
      return String(response);
    }
  };

  const getStatusColor = (status?: number) => {
    if (!status) return 'text-gray-400';
    if (status >= 200 && status < 300) return 'text-green-400';
    if (status >= 400 && status < 500) return 'text-yellow-400';
    return 'text-red-400';
  };

  const formatBytes = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-4">
      {/* Execute Button */}
      <GlassButton
        variant="primary"
        onClick={onExecute}
        disabled={isExecuting}
        className="w-full"
      >
        {isExecuting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Executing...
          </span>
        ) : (
          <span>🚀 EXECUTE REQUEST</span>
        )}
      </GlassButton>

      {/* Metrics */}
      {output && (
        <div className="flex gap-4 text-xs">
          <div>
            <span className="text-gray-500">Status: </span>
            <span className={getStatusColor(output.status)}>
              {output.status || 'N/A'}
            </span>
          </div>
          <div>
            <span className="text-gray-500">Method: </span>
            <span className="text-white">{output.method || 'N/A'}</span>
          </div>
          <div>
            <span className="text-gray-500">Size: </span>
            <span className="text-white">{formatBytes(output.size)}</span>
          </div>
          {output.executedAt && (
            <div>
              <span className="text-gray-500">Time: </span>
              <span className="text-white">
                {new Date(output.executedAt).toLocaleTimeString()}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('response')}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            activeTab === 'response'
              ? 'bg-cyan-500/20 text-cyan-300'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Response
        </button>
        <button
          onClick={() => setActiveTab('logs')}
          className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
            activeTab === 'logs'
              ? 'bg-cyan-500/20 text-cyan-300'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Logs ({logs.length})
        </button>
      </div>

      {/* Output Display */}
      <GlassPane className="min-h-[120px] max-h-[200px] overflow-y-auto">
        {activeTab === 'response' ? (
          output?.response ? (
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap">
              {formatResponse(output.response)}
            </pre>
          ) : (
            <p className="text-xs text-gray-500 italic">
              No response yet. Click "Execute Request" to run.
            </p>
          )
        ) : (
          <div className="space-y-1">
            {logs.length === 0 ? (
              <p className="text-xs text-gray-500 italic">No logs yet.</p>
            ) : (
              logs.map((log, idx) => (
                <p key={idx} className="text-xs text-gray-400 font-mono">
                  {log}
                </p>
              ))
            )}
          </div>
        )}
      </GlassPane>
    </div>
  );
};
