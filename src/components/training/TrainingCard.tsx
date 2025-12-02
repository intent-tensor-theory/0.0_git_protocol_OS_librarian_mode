// ============================================
// TRAINING CARD COMPONENT
// ============================================

import React from 'react';
import type { Training } from '@/types';
import { GlassPane } from '../ui/GlassPane';

type TrainingCardProps = {
  training: Training;
  isActive: boolean;
  onSelect: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

export const TrainingCard: React.FC<TrainingCardProps> = ({
  training,
  isActive,
  onSelect,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <GlassPane
      className={`cursor-pointer transition-all ${
        isActive ? 'ring-2 ring-cyan-400 bg-cyan-500/10' : 'hover:bg-white/5'
      }`}
      onClick={onSelect}
    >
      <div className="flex items-start justify-between">
        <div className="flex-grow min-w-0">
          {/* Header */}
          <div className="flex items-center gap-2">
            <span className="text-lg">🧠</span>
            <h5 className="text-sm font-medium text-white truncate">
              {training.name}
            </h5>
            {isActive && (
              <span className="px-1.5 py-0.5 text-[10px] bg-cyan-500/30 text-cyan-300 rounded-full">
                ACTIVE
              </span>
            )}
          </div>

          {/* System Prompt Preview */}
          {training.systemPrompt && (
            <p className="text-xs text-gray-400 mt-1 line-clamp-2">
              {training.systemPrompt}
            </p>
          )}

          {/* Meta Info */}
          <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
            {training.tone && (
              <span className="px-1.5 py-0.5 bg-purple-500/20 text-purple-300 rounded">
                {training.tone}
              </span>
            )}
            {training.knowledgeFiles && training.knowledgeFiles.length > 0 && (
              <span>📚 {training.knowledgeFiles.length} files</span>
            )}
            <span>Updated {formatDate(training.updatedAt)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 ml-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            className="p-1.5 text-gray-400 hover:text-cyan-300 rounded transition-colors"
            title="Edit training"
          >
            ✏️
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete training profile "${training.name}"?`)) {
                onDelete();
              }
            }}
            className="p-1.5 text-gray-400 hover:text-red-400 rounded transition-colors"
            title="Delete training"
          >
            🗑️
          </button>
        </div>
      </div>
    </GlassPane>
  );
};
