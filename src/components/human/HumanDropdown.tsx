// ============================================
// HUMAN DROPDOWN COMPONENT
// ============================================

import React from 'react';
import type { LogEntry, Contact } from '@/types';

type HumanDropdownProps = {
  logs: LogEntry[];
  contacts: Contact[];
};

export const HumanDropdown: React.FC<HumanDropdownProps> = ({
  logs,
  contacts,
}) => {
  // Count logs by type
  const logCounts = (logs || []).reduce((acc, log) => {
    acc[log.type] = (acc[log.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-lg">👤</span>
        <div>
          <p className="text-sm font-bold text-white">Human Interface</p>
          <p className="text-xs text-gray-400">
            System logs, contacts, and escalation
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-cyan-300">{(logs || []).length}</p>
          <p className="text-xs text-gray-400">Log Entries</p>
        </div>
        <div className="p-3 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-purple-300">{(contacts || []).length}</p>
          <p className="text-xs text-gray-400">Contacts</p>
        </div>
      </div>

      {/* Log Type Breakdown */}
      {(logs || []).length > 0 && (
        <div className="space-y-2">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            Log Breakdown
          </p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(logCounts).map(([type, count]) => (
              <span
                key={type}
                className={`px-2 py-1 text-xs rounded ${
                  type === 'ERROR'
                    ? 'bg-red-500/20 text-red-300'
                    : type === 'WARNING'
                    ? 'bg-orange-500/20 text-orange-300'
                    : type === 'SUCCESS'
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-white/10 text-gray-300'
                }`}
              >
                {type}: {count}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Features */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Human Tab Features
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <span>📋</span>
            <span className="text-white">Activity Log</span>
            <span className="text-gray-500">— Real-time system events</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <span>👥</span>
            <span className="text-white">Contacts</span>
            <span className="text-gray-500">— Human escalation points</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <span>📤</span>
            <span className="text-white">Export</span>
            <span className="text-gray-500">— Download logs as text</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <p className="text-xs text-cyan-300">
          💡 The Human tab keeps you in control. Monitor system activity,
          manage contacts for escalation, and export logs for debugging.
        </p>
      </div>
    </div>
  );
};
