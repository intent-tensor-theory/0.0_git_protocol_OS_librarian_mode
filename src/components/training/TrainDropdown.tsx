// ============================================
// TRAIN DROPDOWN COMPONENT
// ============================================

import React from 'react';
import type { Training } from '@/types';

type TrainDropdownProps = {
  trainings: Training[];
  activeTrainingId: string | null;
};

export const TrainDropdown: React.FC<TrainDropdownProps> = ({
  trainings,
  activeTrainingId,
}) => {
  const activeTraining = (trainings || []).find((t) => t.id === activeTrainingId);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-lg">🧠</span>
        <div>
          <p className="text-sm font-bold text-white">Training Profiles</p>
          <p className="text-xs text-gray-400">
            Customize AI behavior with personas and knowledge
          </p>
        </div>
      </div>

      {/* Active Profile */}
      <div className="p-3 bg-white/5 rounded-lg">
        <p className="text-xs text-gray-400 mb-1">Active Profile</p>
        {activeTraining ? (
          <div>
            <p className="text-sm font-medium text-cyan-300">
              {activeTraining.name}
            </p>
            {activeTraining.tone && (
              <p className="text-xs text-gray-500 mt-1">
                Tone: {activeTraining.tone}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">No profile active</p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-cyan-300">{(trainings || []).length}</p>
          <p className="text-xs text-gray-400">Profiles</p>
        </div>
        <div className="p-3 bg-white/5 rounded-lg">
          <p className="text-2xl font-bold text-purple-300">
            {(trainings || []).reduce(
              (acc, t) => acc + (t.knowledgeFiles?.length || 0),
              0
            )}
          </p>
          <p className="text-xs text-gray-400">Knowledge Files</p>
        </div>
      </div>

      {/* Features */}
      <div className="space-y-2">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          Training Features
        </p>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <span>👤</span>
            <span className="text-white">Persona Core</span>
            <span className="text-gray-500">— System prompts & tone</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <span>📚</span>
            <span className="text-white">Knowledge Vault</span>
            <span className="text-gray-500">— Upload docs for RAG</span>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded">
            <span>💬</span>
            <span className="text-white">Example Exchanges</span>
            <span className="text-gray-500">— Guide response style</span>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
        <p className="text-xs text-cyan-300">
          💡 Create different profiles for different use cases — customer
          support, technical docs, creative writing, etc.
        </p>
      </div>
    </div>
  );
};
