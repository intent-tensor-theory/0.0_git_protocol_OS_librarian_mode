// ============================================
// ADD TO FOLDER MODAL COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Folder, Conversation } from '@/types';
import { Modal } from '../../ui/Modal';
import { GlassButton } from '../../ui/GlassButton';

type AddToFolderModalProps = {
  isOpen: boolean;
  onClose: () => void;
  folder: Folder | null;
  conversations: Conversation[];
  onAdd: (folderId: string, conversationIds: string[]) => void;
};

export const AddToFolderModal: React.FC<AddToFolderModalProps> = ({
  isOpen,
  onClose,
  folder,
  conversations,
  onAdd,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  // Filter out conversations already in this folder
  const availableConversations = conversations.filter(
    (c) => !folder?.conversationIds?.includes(c.id)
  );

  const toggleConversation = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleAdd = () => {
    if (folder && selectedIds.size > 0) {
      onAdd(folder.id, Array.from(selectedIds));
      setSelectedIds(new Set());
      onClose();
    }
  };

  if (!folder) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Conversations" size="md">
      <div className="space-y-4">
        <p className="text-sm text-gray-400">
          Add conversations to: <span className="text-cyan-300">📁 {folder.name}</span>
        </p>

        {availableConversations.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-4">
            No available conversations to add.
          </p>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {availableConversations.map((conv) => (
              <label
                key={conv.id}
                className={`
                  flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors
                  ${selectedIds.has(conv.id)
                    ? 'bg-cyan-500/20 ring-1 ring-cyan-400'
                    : 'bg-white/5 hover:bg-white/10'
                  }
                `}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(conv.id)}
                  onChange={() => toggleConversation(conv.id)}
                  className="w-4 h-4 rounded bg-black/30 border-white/20 text-cyan-500 focus:ring-cyan-400"
                />
                <div className="flex-grow min-w-0">
                  <p className="text-sm text-white truncate">{conv.title}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(conv.updatedAt).toLocaleDateString()}
                  </p>
                </div>
              </label>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-4 border-t border-white/10">
          <GlassButton variant="ghost" onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton
            variant="primary"
            onClick={handleAdd}
            disabled={selectedIds.size === 0}
          >
            Add {selectedIds.size > 0 ? `(${selectedIds.size})` : ''}
          </GlassButton>
        </div>
      </div>
    </Modal>
  );
};
