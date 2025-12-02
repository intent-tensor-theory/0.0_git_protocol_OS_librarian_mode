// ============================================
// PLATFORM CARD COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Platform, Resource, Handshake } from '@/types';
import { CollapsibleCard } from '../ui/CollapsibleCard';
import { GlassButton } from '../ui/GlassButton';
import { GlassPane } from '../ui/GlassPane';
import { ResourceCard } from './ResourceCard';
import { PlatformForm } from './forms/PlatformForm';
import { ResourceForm } from './forms/ResourceForm';
import { generateId, generateSerial, generateVersion } from '@/utils/serialGenerator';

type PlatformCardProps = {
  platform: Platform;
  onUpdate: (platform: Platform) => void;
  onDelete: () => void;
  onSaveResource: (resource: Resource) => void;
  onDeleteResource: (resourceId: string) => void;
  onSaveHandshake: (resourceId: string, handshake: Handshake) => void;
  onDeleteHandshake: (resourceId: string, handshakeId: string) => void;
};

export const PlatformCard: React.FC<PlatformCardProps> = ({
  platform,
  onUpdate,
  onDelete,
  onSaveResource,
  onDeleteResource,
  onSaveHandshake,
  onDeleteHandshake,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingResource, setIsAddingResource] = useState(false);

  const handlePlatformUpdate = (data: {
    baseName: string;
    url?: string;
    description?: string;
    documentationUrl?: string;
    authNotes?: string;
  }) => {
    onUpdate({ ...platform, ...data });
    setIsEditing(false);
  };

  const handleResourceSave = (data: {
    baseName: string;
    url?: string;
    description?: string;
    documentationUrl?: string;
    notes?: string;
  }) => {
    const newResource: Resource = {
      id: generateId(),
      serial: generateSerial('RES'),
      version: generateVersion(),
      ...data,
      handshakes: [],
    };
    onSaveResource(newResource);
    setIsAddingResource(false);
  };

  const headerActions = (
    <div className="flex items-center gap-1">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsAddingResource(true);
        }}
        className="p-1 text-gray-400 hover:text-cyan-300 rounded"
        title="Add resource"
      >
        ➕
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsEditing(true);
        }}
        className="p-1 text-gray-400 hover:text-cyan-300 rounded"
        title="Edit platform"
      >
        ✏️
      </button>
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (confirm(`Delete platform "${platform.baseName}" and all its resources?`)) {
            onDelete();
          }
        }}
        className="p-1 text-gray-400 hover:text-red-400 rounded"
        title="Delete platform"
      >
        🗑️
      </button>
    </div>
  );

  const totalHandshakes = platform.resources.reduce(
    (acc, r) => acc + r.handshakes.length,
    0
  );

  return (
    <>
      <CollapsibleCard
        title={`🏢 ${platform.baseName}`}
        headerActions={headerActions}
        defaultExpanded={true}
        className="mb-3"
      >
        {/* Platform Details */}
        {platform.description && (
          <p className="text-xs text-gray-400 mb-2">{platform.description}</p>
        )}
        
        <div className="flex gap-4 text-xs text-gray-500 mb-4">
          {platform.url && (
            <a
              href={platform.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cyan-300"
            >
              🔗 {platform.url}
            </a>
          )}
          <span>📦 {platform.resources.length} resources</span>
          <span>🤝 {totalHandshakes} handshakes</span>
        </div>

        {/* Resources List */}
        <div className="space-y-2">
          {platform.resources.length === 0 ? (
            <GlassPane className="text-center py-4">
              <p className="text-xs text-gray-500 mb-2">
                No resources yet. Add one to organize your API endpoints.
              </p>
              <GlassButton
                size="sm"
                variant="primary"
                onClick={() => setIsAddingResource(true)}
              >
                ➕ Add First Resource
              </GlassButton>
            </GlassPane>
          ) : (
            <>
              {platform.resources.map((resource) => (
                <ResourceCard
                  key={resource.id}
                  resource={resource}
                  platformId={platform.id}
                  onUpdate={(updatedResource) => {
                    const updatedResources = platform.resources.map((r) =>
                      r.id === resource.id ? updatedResource : r
                    );
                    onUpdate({ ...platform, resources: updatedResources });
                  }}
                  onDelete={() => onDeleteResource(resource.id)}
                  onSaveHandshake={(handshake) =>
                    onSaveHandshake(resource.id, handshake)
                  }
                  onDeleteHandshake={(handshakeId) =>
                    onDeleteHandshake(resource.id, handshakeId)
                  }
                />
              ))}
              <GlassButton
                size="sm"
                variant="ghost"
                onClick={() => setIsAddingResource(true)}
                className="w-full"
              >
                ➕ Add Resource
              </GlassButton>
            </>
          )}
        </div>
      </CollapsibleCard>

      {/* Edit Platform Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-md">
            <GlassPane variant="modal">
              <PlatformForm
                platform={platform}
                onSave={handlePlatformUpdate}
                onCancel={() => setIsEditing(false)}
              />
            </GlassPane>
          </div>
        </div>
      )}

      {/* Add Resource Modal */}
      {isAddingResource && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="w-full max-w-md">
            <GlassPane variant="modal">
              <ResourceForm
                onSave={handleResourceSave}
                onCancel={() => setIsAddingResource(false)}
              />
            </GlassPane>
          </div>
        </div>
      )}
    </>
  );
};
