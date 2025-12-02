// ============================================
// PROTOCOL OS PANEL COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Platform, Resource, Handshake } from '@/types';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { PlatformCard } from './PlatformCard';
import { NestedFormBuilder } from './forms/NestedFormBuilder';

type ProtocolOSPanelProps = {
  platforms: Platform[];
  savePlatform: (platform: Platform) => void;
  deletePlatform: (platformId: string) => void;
  saveResource: (platformId: string, resource: Resource) => void;
  deleteResource: (platformId: string, resourceId: string) => void;
  saveHandshake: (platformId: string, resourceId: string, handshake: Handshake) => void;
  deleteHandshake: (platformId: string, resourceId: string, handshakeId: string) => void;
};

export const ProtocolOSPanel: React.FC<ProtocolOSPanelProps> = ({
  platforms,
  savePlatform,
  deletePlatform,
  saveResource,
  deleteResource,
  saveHandshake,
  deleteHandshake,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter platforms by search
  const filteredPlatforms = searchQuery
    ? platforms.filter(
        (p) =>
          p.baseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.resources.some(
            (r) =>
              r.baseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
              r.handshakes.some((h) =>
                h.baseName.toLowerCase().includes(searchQuery.toLowerCase())
              )
          )
      )
    : platforms;

  // Calculate totals
  const totalResources = platforms.reduce((acc, p) => acc + p.resources.length, 0);
  const totalHandshakes = platforms.reduce(
    (acc, p) => acc + p.resources.reduce((a, r) => a + r.handshakes.length, 0),
    0
  );

  const handleCreateComplete = (platform: Platform) => {
    savePlatform(platform);
    setIsCreating(false);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search platforms..."
            className="px-3 py-1.5 text-sm bg-black/30 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400/50 w-40"
          />
          <span className="text-xs text-gray-500">
            {platforms.length} platforms • {totalResources} resources •{' '}
            {totalHandshakes} handshakes
          </span>
        </div>
        <GlassButton
          size="sm"
          variant="primary"
          onClick={() => setIsCreating(true)}
        >
          ➕ Add Platform
        </GlassButton>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto min-h-0">
        {isCreating ? (
          <NestedFormBuilder
            onComplete={handleCreateComplete}
            onCancel={() => setIsCreating(false)}
          />
        ) : filteredPlatforms.length === 0 ? (
          <GlassPane className="text-center py-12">
            {searchQuery ? (
              <>
                <p className="text-gray-400 mb-2">
                  No results for "{searchQuery}"
                </p>
                <GlassButton
                  size="sm"
                  variant="ghost"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </GlassButton>
              </>
            ) : (
              <>
                <div className="text-5xl mb-4">🔗</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  No Platforms Yet
                </h3>
                <p className="text-sm text-gray-400 mb-4 max-w-sm mx-auto">
                  Create your first platform to start connecting to APIs. You
                  can add resources and handshakes to organize your integrations.
                </p>
                <GlassButton
                  variant="primary"
                  onClick={() => setIsCreating(true)}
                >
                  ➕ Create First Platform
                </GlassButton>
              </>
            )}
          </GlassPane>
        ) : (
          <div className="space-y-4">
            {filteredPlatforms.map((platform) => (
              <PlatformCard
                key={platform.id}
                platform={platform}
                onUpdate={savePlatform}
                onDelete={() => deletePlatform(platform.id)}
                onSaveResource={(resource) => saveResource(platform.id, resource)}
                onDeleteResource={(resourceId) =>
                  deleteResource(platform.id, resourceId)
                }
                onSaveHandshake={(resourceId, handshake) =>
                  saveHandshake(platform.id, resourceId, handshake)
                }
                onDeleteHandshake={(resourceId, handshakeId) =>
                  deleteHandshake(platform.id, resourceId, handshakeId)
                }
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
