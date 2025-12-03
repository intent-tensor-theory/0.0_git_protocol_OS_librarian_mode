// ============================================
// TRAIN PANEL COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Training, KnowledgeFile } from '@/types';
import { generateId, generateVersion } from '@/utils/serialGenerator';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { TrainingCard } from './TrainingCard';
import { PersonaCoreEditor } from './PersonaCoreEditor';
import { KnowledgeVault } from './KnowledgeVault';

type TrainPanelProps = {
  trainings: Training[];
  activeTrainingId: string | null;
  saveTraining: (training: Training) => void;
  deleteTraining: (trainingId: string) => void;
  setActiveTrainingId: (id: string | null) => void;
  addKnowledgeFile: (trainingId: string, file: File) => void;
  removeKnowledgeFile: (trainingId: string, fileId: string) => void;
};

export const TrainPanel: React.FC<TrainPanelProps> = ({
  trainings,
  activeTrainingId,
  saveTraining,
  deleteTraining,
  setActiveTrainingId,
  addKnowledgeFile,
  removeKnowledgeFile,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTraining, setEditingTraining] = useState<Training | null>(null);

  const handleNewTraining = () => {
    const newTraining: Training = {
      id: generateId(),
      name: 'New Training Profile',
      version: generateVersion(),
      createdAt: new Date(),
      updatedAt: new Date(),
      systemPrompt: '',
      tone: 'professional',
      expertiseLevel: 'intermediate',
      knowledgeFiles: [],
    };
    setEditingTraining(newTraining);
    setIsEditing(true);
  };

  const handleEditTraining = (training: Training) => {
    setEditingTraining({ ...training });
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editingTraining) {
      saveTraining({
        ...editingTraining,
        updatedAt: new Date(),
      });
      setIsEditing(false);
      setEditingTraining(null);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingTraining(null);
  };

  const handleSelectTraining = (training: Training) => {
    if (activeTrainingId === training.id) {
      setActiveTrainingId(null); // Deselect
    } else {
      setActiveTrainingId(training.id);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <span className="text-xs text-gray-500">
          {(trainings || []).length} profiles •{' '}
          {activeTrainingId ? 'Profile active' : 'No active profile'}
        </span>
        {!isEditing && (
          <GlassButton size="sm" variant="primary" onClick={handleNewTraining}>
            ➕ New Profile
          </GlassButton>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto min-h-0">
        {isEditing && editingTraining ? (
          <GlassPane variant="modal" className="space-y-6">
            {/* Editor Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-cyan-300">
                {editingTraining.id && (trainings || []).find((t) => t.id === editingTraining.id)
                  ? 'Edit Profile'
                  : 'New Profile'}
              </h3>
              <button onClick={handleCancel} className="text-gray-400 hover:text-white">
                ✕
              </button>
            </div>

            {/* Persona Core Editor */}
            <PersonaCoreEditor
              training={editingTraining}
              onChange={setEditingTraining}
            />

            {/* Knowledge Vault */}
            {editingTraining.id && (trainings || []).find((t) => t.id === editingTraining.id) && (
              <KnowledgeVault
                files={editingTraining.knowledgeFiles || []}
                onAddFile={(file) => addKnowledgeFile(editingTraining.id, file)}
                onRemoveFile={(fileId) => removeKnowledgeFile(editingTraining.id, fileId)}
              />
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-white/10">
              <GlassButton variant="ghost" onClick={handleCancel}>
                Cancel
              </GlassButton>
              <GlassButton
                variant="primary"
                onClick={handleSave}
                disabled={!editingTraining.name.trim()}
              >
                💾 Save Profile
              </GlassButton>
            </div>
          </GlassPane>
        ) : (trainings || []).length === 0 ? (
          <GlassPane className="text-center py-12">
            <div className="text-5xl mb-4">🧠</div>
            <h3 className="text-lg font-bold text-white mb-2">
              No Training Profiles
            </h3>
            <p className="text-sm text-gray-400 mb-4 max-w-sm mx-auto">
              Create training profiles to customize the AI's personality,
              expertise, and knowledge base.
            </p>
            <GlassButton variant="primary" onClick={handleNewTraining}>
              ➕ Create First Profile
            </GlassButton>
          </GlassPane>
        ) : (
          <div className="space-y-3">
            {(trainings || []).map((training) => (
              <TrainingCard
                key={training.id}
                training={training}
                isActive={activeTrainingId === training.id}
                onSelect={() => handleSelectTraining(training)}
                onEdit={() => handleEditTraining(training)}
                onDelete={() => deleteTraining(training.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
