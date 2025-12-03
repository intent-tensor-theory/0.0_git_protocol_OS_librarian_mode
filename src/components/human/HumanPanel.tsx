// ============================================
// HUMAN PANEL COMPONENT
// ============================================

import React, { useState, useRef, useEffect } from 'react';
import type { LogEntry as LogEntryType, Contact } from '@/types';
import { logger } from '@/services/logger';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { LogEntry } from './LogEntry';
import { ContactManager } from './ContactManager';

type HumanPanelProps = {
  logs: LogEntryType[];
  contacts: Contact[];
  saveContact: (contact: Contact) => void;
  deleteContact: (contactId: string) => void;
};

export const HumanPanel: React.FC<HumanPanelProps> = ({
  logs,
  contacts,
  saveContact,
  deleteContact,
}) => {
  const [activeTab, setActiveTab] = useState<'logs' | 'contacts'>('logs');
  const [autoScroll, setAutoScroll] = useState(true);
  const [filterType, setFilterType] = useState<string | null>(null);
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (autoScroll && activeTab === 'logs') {
      logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, autoScroll, activeTab]);

  // Filter logs by type
  const filteredLogs = filterType
    ? (logs || []).filter((log) => log.type === filterType)
    : (logs || []);

  const handleExportLogs = () => {
    const text = logger.formatForExport();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `librarian-logs-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleClearLogs = () => {
    if (confirm('Clear all logs? This cannot be undone.')) {
      logger.clear();
    }
  };

  const logTypes = ['RENDER', 'ACTION', 'INFO', 'SUCCESS', 'WARNING', 'ERROR', 'SYSTEM'];

  return (
    <div className="h-full flex flex-col">
      {/* Tabs */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'logs'
                ? 'bg-cyan-500/20 text-cyan-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            📋 Logs ({(logs || []).length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'contacts'
                ? 'bg-cyan-500/20 text-cyan-300'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            👥 Contacts ({(contacts || []).length})
          </button>
        </div>

        {activeTab === 'logs' && (
          <div className="flex items-center gap-2">
            <GlassButton size="sm" variant="ghost" onClick={handleExportLogs}>
              📤 Export
            </GlassButton>
            <GlassButton size="sm" variant="danger" onClick={handleClearLogs}>
              🗑️ Clear
            </GlassButton>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow overflow-hidden min-h-0">
        {activeTab === 'logs' ? (
          <div className="h-full flex flex-col">
            {/* Log Filters */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <button
                onClick={() => setFilterType(null)}
                className={`px-2 py-0.5 text-xs rounded transition-colors ${
                  filterType === null
                    ? 'bg-cyan-500/30 text-cyan-300'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                All
              </button>
              {logTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2 py-0.5 text-xs rounded transition-colors ${
                    filterType === type
                      ? 'bg-cyan-500/30 text-cyan-300'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10'
                  }`}
                >
                  {type}
                </button>
              ))}
              <div className="flex-grow" />
              <label className="flex items-center gap-1 text-xs text-gray-400">
                <input
                  type="checkbox"
                  checked={autoScroll}
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="w-3 h-3 rounded bg-black/30 border-white/20 text-cyan-500"
                />
                Auto-scroll
              </label>
            </div>

            {/* Log List */}
            <GlassPane className="flex-grow overflow-y-auto">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-3xl mb-2">📋</div>
                  <p className="text-xs text-gray-500">
                    {filterType ? `No ${filterType} logs` : 'No logs yet'}
                  </p>
                </div>
              ) : (
                <div>
                  {filteredLogs.map((entry) => (
                    <LogEntry key={entry.id} entry={entry} />
                  ))}
                  <div ref={logsEndRef} />
                </div>
              )}
            </GlassPane>
          </div>
        ) : (
          <ContactManager
            contacts={contacts}
            onSaveContact={saveContact}
            onDeleteContact={deleteContact}
          />
        )}
      </div>
    </div>
  );
};
