// ============================================
// CONVERSATION HISTORY COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Conversation, Folder } from '@/types';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';

type ConversationHistoryProps = {
  conversations: Conversation[];
  folders: Folder[];
  currentConversationId: string | null;
  onLoad: (id: string) => void;
  onDelete: (id: string) => void;
  onDeleteMultiple: (ids: string[]) => void;
  onRename: (id: string, newTitle: string) => void;
  onAssignFolders: (conversationId: string) => void;
};

export const ConversationHistory: React.FC<ConversationHistoryProps> = ({
  conversations,
  folders,
  currentConversationId,
  onLoad,
  onDelete,
  onDeleteMultiple,
  onRename,
  onAssignFolders,
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [filterFolderId, setFilterFolderId] = useState<string | null>(null);

  // Filter conversations by folder
  const filteredConversations = filterFolderId
    ? conversations.filter((c) => c.folderIds?.includes(filterFolderId))
    : conversations;

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const handleStartRename = (conv: Conversation) => {
    setEditingId(conv.id);
    setEditTitle(conv.title);
  };

  const handleSaveRename = () => {
    if (editingId && editTitle.trim()) {
      onRename(editingId, editTitle.trim());
    }
    setEditingId(null);
    setEditTitle('');
  };

  const handleDeleteSelected = () => {
    if (selectedIds.size > 0) {
      onDeleteMultiple(Array.from(selectedIds));
      setSelectedIds(new Set());
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-3">
      {/* Folder Filter */}
      {folders.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterFolderId(null)}
            className={`px-3 py-1 text-xs rounded-full transition-colors ${
              filterFolderId === null
                ? 'bg-cyan-500/30 text-cyan-300'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
          >
            All
          </button>
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() => setFilterFolderId(folder.id)}
              className={`px-3 py-1 text-xs rounded-full transition-colors ${
                filterFolderId === folder.id
                  ? 'bg-cyan-500/30 text-cyan-300'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              📁 {folder.name}
            </button>
          ))}
        </div>
      )}

      {/* Bulk Actions */}
      {selectedIds.size > 0 && (
        <div className="flex items-center gap-2 p-2 bg-red-500/10 rounded-lg">
          <span className="text-sm text-red-300">
            {selectedIds.size} selected
          </span>
          <GlassButton
            size="sm"
            variant="danger"
            onClick={handleDeleteSelected}
          >
            Delete Selected
          </GlassButton>
          <GlassButton
            size="sm"
            variant="ghost"
            onClick={() => setSelectedIds(new Set())}
          >
            Clear
          </GlassButton>
        </div>
      )}

      {/* Conversation List */}
      {filteredConversations.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4">
          No conversations yet
        </p>
      ) : (
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {filteredConversations.map((conv) => (
            <GlassPane
              key={conv.id}
              className={`cursor-pointer transition-all ${
                currentConversationId === conv.id
                  ? 'ring-1 ring-cyan-400'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={selectedIds.has(conv.id)}
                  onChange={() => toggleSelect(conv.id)}
                  className="w-4 h-4 rounded bg-black/30 border-white/20 text-cyan-500 focus:ring-cyan-400"
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Content */}
                <div
                  className="flex-grow min-w-0"
                  onClick={() => onLoad(conv.id)}
                >
                  {editingId === conv.id ? (
                    <GlassInput
                      value={editTitle}
                      onChange={setEditTitle}
                      onKeyDown={(e: React.KeyboardEvent) => {
                        if (e.key === 'Enter') handleSaveRename();
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="text-sm"
                    />
                  ) : (
                    <>
                      <p className="text-sm text-white truncate font-medium">
                        {conv.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(conv.updatedAt)}
                      </p>
                    </>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onAssignFolders(conv.id);
                    }}
                    className="p-1 text-gray-400 hover:text-white rounded"
                    title="Assign to folder"
                  >
                    📁
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartRename(conv);
                    }}
                    className="p-1 text-gray-400 hover:text-white rounded"
                    title="Rename"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="p-1 text-gray-400 hover:text-red-400 rounded"
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </GlassPane>
          ))}
        </div>
      )}
    </div>
  );
};
