// ============================================
// LOG ENTRY COMPONENT
// ============================================

import React from 'react';
import type { LogEntry as LogEntryType } from '@/types';

type LogEntryProps = {
  entry: LogEntryType;
};

const TYPE_STYLES: Record<string, { color: string; icon: string }> = {
  RENDER: { color: 'text-blue-400', icon: '🎨' },
  ACTION: { color: 'text-yellow-400', icon: '⚡' },
  INFO: { color: 'text-gray-400', icon: 'ℹ️' },
  SUCCESS: { color: 'text-green-400', icon: '✅' },
  WARNING: { color: 'text-orange-400', icon: '⚠️' },
  ERROR: { color: 'text-red-400', icon: '❌' },
  SYSTEM: { color: 'text-purple-400', icon: '🔧' },
};

export const LogEntry: React.FC<LogEntryProps> = ({ entry }) => {
  const style = TYPE_STYLES[entry.type] || TYPE_STYLES.INFO;

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="flex items-start gap-2 py-1.5 px-2 hover:bg-white/5 rounded text-xs font-mono">
      {/* Timestamp */}
      <span className="text-gray-600 flex-shrink-0">
        [{formatTimestamp(entry.timestamp)}]
      </span>

      {/* Type Badge */}
      <span className={`flex-shrink-0 ${style.color}`}>
        {style.icon}
      </span>

      {/* Type Label */}
      <span className={`flex-shrink-0 w-16 ${style.color}`}>
        {entry.type}
      </span>

      {/* Message */}
      <span className="text-gray-300 break-all">
        {entry.message}
      </span>
    </div>
  );
};
