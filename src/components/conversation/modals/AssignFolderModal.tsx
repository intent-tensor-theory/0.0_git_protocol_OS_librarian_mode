// ============================================
// ASSIGN FOLDER MODAL COMPONENT
// ============================================

import React, { useState, useEffect } from 'react';
import type { Folder, Conversation } from '@/types';
import { Modal } from '../../ui/Modal';
import { GlassButton } from '../../ui/GlassButton';

type AssignFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation | null;
  folders: Folder[];
  onAssign: (conversationId: string, folderIds: string[]) => void;
};

export const AssignFolderModal: React.FC<AssignFolderModalProps> = ({
  isOpen,
  onClose,
  conversation,
  folders,
  onAssign,
}) => {
  const [selectedFolderIds, setSelectedFolderIds] = useState<Set<string>>(new Set());

  // Initialize with current folder assignments
  useEffect(() => {
    if (conversation?.folderIds) {
      setSelectedFolderIds(new Set(conversation.folderIds));
    } else {
      setSelectedFolderIds(new Set());
    }
  }, [conversation]);

  const toggleFolder = (folderId: string) => {
    const newSet = new Set(selectedFolderIds);
    if (newSet.has(folderId)) {
      newSet.delete(folderId);
    } else {
      newSet.add(folderId);
    }
    setSelectedFolderIds(newSet);
  };

  const handleSave = () => {
    if (conversation) {
      onAssign(conversation.id, Array.from(selectedFolderIds));
      onClose();
    }
  };

  if (!conversation) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Assign to Folders" size="sm">
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          Select folders for: <span className="text-white">{conversation.title}</span>
        </p>

        {folders.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No folders available. Create one first.
          </p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {folders.map((folder) => (
              <label
                key={folder.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                  ${selectedFolderIds.has(folder.id)
                    ? 'bg-cyan-500/20 ring-1 ring-cyan-400'
                    : 'bg-white/5 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedFolderIds.has(folder.id)}
                  onChange={() => toggleFolder(folder.id)}
                  className="w-4 h-4 rounded bg-black/30 border-white/20 text-cyan-500 focus:ring-cyan-400"
                />
                <span className="text-lg">📁</span>
                <span className="text-sm text-white">{folder.name}</span>
              </label>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <GlassButton variant="ghost" onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton variant="primary" onClick={handleSave}>
            Save
          </GlassButton>
        </div>
      </div>
    </Modal>
  );
};
