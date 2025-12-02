// ============================================
// FOLDER MANAGER COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Folder } from '@/types';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';

type FolderManagerProps = {
  folders: Folder[];
  onCreateFolder: (name: string) => void;
  onDeleteFolders: (ids: string[]) => void;
};

export const FolderManager: React.FC<FolderManagerProps> = ({
  folders,
  onCreateFolder,
  onDeleteFolders,
}) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isCreating, setIsCreating] = useState(false);

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleCreate = () => {
    if (newFolderName.trim()) {
      onCreateFolder(newFolderName.trim());
      setNewFolderName('');
      setIsCreating(false);
    }
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size > 0) {
      onDeleteFolders(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-gray-300">Folders</h3>
        <GlassButton
          size="sm"
          variant="ghost"
          onClick={() => setIsCreating(!isCreating)}
        >
          {isCreating ? 'Cancel' : '+ New Folder'}
        </GlassButton>
      </div>

      {/* Create Folder Form */}
      {isCreating && (
        <div className="flex gap-2">
          <GlassInput
            value={newFolderName}
            onChange={setNewFolderName}
            placeholder="Folder name..."
            className="flex-grow"
          />
          <GlassButton size="sm" variant="primary" onClick={handleCreate}>
            Create
          </GlassButton>
        </div>
      )}

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded-lg">
          <span className="text-xs text-red-300">
            {selectedIds.size} selected
          </span>
          <GlassButton
            size="sm"
            variant="danger"
            onClick={handleDeleteSelected}
          >
            Delete
          </GlassButton>
        </div>
      )}

      {/* Folder List */}
      {folders.length === 0 ? (
        <p className="text-gray-500 text-xs text-center py-2">
          No folders yet
        </p>
      ) : (
        <div className="space-y-1">
          {folders.map((folder) => (
            <div
              key={folder.id}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                selectedIds.has(folder.id)
                  ? 'bg-cyan-500/20'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
            >
              <input
                type="checkbox"
                checked={selectedIds.has(folder.id)}
                onChange={() => toggleSelect(folder.id)}
                className="w-3 h-3 rounded bg-black/30 border-white/20 text-cyan-500"
              />
              <span className="text-sm">📁</span>
              <span className="text-sm text-white flex-grow truncate">
                {folder.name}
              </span>
              <span className="text-xs text-gray-500">
                {folder.conversationIds?.length || 0}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
