// ============================================
// RESOURCE CARD COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Resource, Handshake } from '@/types';
import { CollapsibleCard } from '../ui/CollapsibleCard';
import { GlassButton } from '../ui/GlassButton';
import { HandshakeCard } from './HandshakeCard';
import { HandshakeEditor } from './HandshakeEditor';
import { ResourceForm } from './forms/ResourceForm';

type ResourceCardProps = {
  resource: Resource;
  platformId: string;
  onUpdate: (resource: Resource) => void;
  onDelete: () => void;
  onSaveHandshake: (handshake: Handshake) => void;
  onDeleteHandshake: (handshakeId: string) => void;
};

export const ResourceCard: React.FC<ResourceCardProps> = ({
  resource,
  platformId,
  onUpdate,
  onDelete,
  onSaveHandshake,
  onDeleteHandshake,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingHandshake, setIsAddingHandshake] = useState(false);
  const [editingHandshakeId, setEditingHandshakeId] = useState<string | null>(null);

  const handleResourceUpdate = (data: {
    baseName: string;
    url?: string;
    description?: string;
    documentationUrl?: string;
    notes?: string;
  }) => {
    onUpdate({ ...resource, ...data });
    setIsEditing(false);
  };

  const handleHandshakeSave = (data: Omit<Handshake, 'id' | 'serial' | 'version'>) => {
    const existingHandshake = editingHandshakeId
      ? resource.handshakes.find((h) => h.id === editingHandshakeId)
      : null;

    const handshake: Handshake = existingHandshake
      ? { ...existingHandshake, ...data }
      : {
          id: crypto.randomUUID(),
          serial: `HS-${String(resource.handshakes.length + 1).padStart(3, '0')}`,
          version: '1.0.0',
          ...data,
        };

    onSaveHandshake(handshake);
    setIsAddingHandshake(false);
    setEditingHandshakeId(null);
  };

  const headerActions = (
    <div className="flex items-center gap-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsAddingHandshake(true);
        }}
        className="p-1 text-gray-400 hover:text-cyan-300 rounded"
        title="Add handshake"
      >
        ➕
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className="p-1 text-gray-400 hover:text-cyan-300 rounded"
        title="Edit resource"
      >
        ✏️
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (confirm(`Delete resource "${resource.baseName}"?`)) {
            onDelete();
          }
        }}
        className="p-1 text-gray-400 hover:text-red-400 rounded"
        title="Delete resource"
      >
        🗑️
      </button>
    </div>
  );

  return (
    <>
      <CollapsibleCard
        title={`📦 ${resource.baseName}`}
        headerActions={headerActions}
        defaultExpanded={false}
      >
        {/* Resource Details */}
        {resource.description && (
          <p className="text-xs text-gray-400 mb-3">{resource.description}</p>
        )}
        {resource.url && (
          <p className="text-xs text-gray-500 mb-3 font-mono">{resource.url}</p>
        )}

        {/* Handshakes List */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h5 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Handshakes ({resource.handshakes.length})
            </h5>
          </div>

          {resource.handshakes.length === 0 ? (
            <p className="text-xs text-gray-500 italic py-2">
              No handshakes yet. Add one to start making API calls.
            </p>
          ) : (
            resource.handshakes.map((handshake) => (
              <HandshakeCard
                key={handshake.id}
                handshake={handshake}
                onEdit={() => setEditingHandshakeId(handshake.id)}
                onDelete={() => {
                  if (confirm(`Delete handshake "${handshake.baseName}"?`)) {
                    onDeleteHandshake(handshake.id);
                  }
                }}
                onRerun={() => setEditingHandshakeId(handshake.id)}
              />
            ))
          )}

          <GlassButton
            size="sm"
            variant="ghost"
            onClick={() => setIsAddingHandshake(true)}
            className="w-full"
          >
            ➕ Add Handshake
          </GlassButton>
        </div>
      </CollapsibleCard>

      {/* Edit Resource Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-md">
            <ResourceForm
              resource={resource}
              onSave={handleResourceUpdate}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        </div>
      )}

      {/* Add/Edit Handshake Modal */}
      {(isAddingHandshake || editingHandshakeId) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 overflow-y-auto">
          <div className="w-full max-w-2xl my-8">
            <HandshakeEditor
              handshake={
                editingHandshakeId
                  ? resource.handshakes.find((h) => h.id === editingHandshakeId)
                  : undefined
              }
              onSave={handleHandshakeSave}
              onCancel={() => {
                setIsAddingHandshake(false);
                setEditingHandshakeId(null);
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};
