// ============================================
// HANDSHAKE CARD COMPONENT
// ============================================

import React from 'react';
import type { Handshake } from '@/types';
import { getProtocolById } from '@/constants';
import { GlassPane } from '../ui/GlassPane';

type HandshakeCardProps = {
  handshake: Handshake;
  onEdit: () => void;
  onDelete: () => void;
  onRerun: () => void;
};

export const HandshakeCard: React.FC<HandshakeCardProps> = ({
  handshake,
  onEdit,
  onDelete,
  onRerun,
}) => {
  const protocol = getProtocolById(handshake.protocol);

  const getStatusIcon = () => {
    if (!handshake.output) return '⚪';
    if (handshake.output.status && handshake.output.status >= 200 && handshake.output.status < 300) {
      return '✅';
    }
    return '❌';
  };

  return (
    <GlassPane className="hover:bg-white/5 transition-colors">
      <div className="flex items-start justify-between">
        <div className="flex-grow min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-sm">🤝</span>
            <h5 className="text-sm font-medium text-white truncate">
              {handshake.baseName}
            </h5>
            <span className="text-xs">{getStatusIcon()}</span>
          </div>

          {/* Protocol Badge */}
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[10px] px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
              {protocol?.name || handshake.protocol}
            </span>
            <span className="text-[10px] text-gray-500 font-mono">
              {handshake.serial}
            </span>
          </div>

          {/* Last Result */}
          {handshake.output && (
            <div className="mt-2 text-xs text-gray-400">
              Last run: {handshake.output.status} • {handshake.output.method}
              {handshake.output.executedAt && (
                <span className="ml-2">
                  {new Date(handshake.output.executedAt).toLocaleString()}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={onRerun}
            className="p-1.5 text-gray-400 hover:text-yellow-300 rounded transition-colors"
            title="Re-run handshake"
          >
            ⚡
          </button>
          <button
            onClick={onEdit}
            className="p-1.5 text-gray-400 hover:text-cyan-300 rounded transition-colors"
            title="Edit handshake"
          >
            ✏️
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 text-gray-400 hover:text-red-400 rounded transition-colors"
            title="Delete handshake"
          >
            🗑️
          </button>
        </div>
      </div>
    </GlassPane>
  );
};
