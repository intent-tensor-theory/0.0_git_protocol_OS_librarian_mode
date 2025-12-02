// ============================================
// NESTED FORM BUILDER COMPONENT
// ============================================
// Allows creating Platform → Resource → Handshake in one flow

import React, { useState } from 'react';
import type { Platform, Resource, Handshake } from '@/types';
import { generateId, generateSerial, generateVersion } from '@/utils/serialGenerator';
import { GlassPane } from '../../ui/GlassPane';
import { GlassButton } from '../../ui/GlassButton';
import { PlatformForm } from './PlatformForm';
import { ResourceForm } from './ResourceForm';
import { HandshakeEditor } from '../HandshakeEditor';

type NestedFormBuilderProps = {
  onComplete: (platform: Platform) => void;
  onCancel: () => void;
};

type Step = 'platform' | 'resource' | 'handshake' | 'done';

export const NestedFormBuilder: React.FC<NestedFormBuilderProps> = ({
  onComplete,
  onCancel,
}) => {
  const [step, setStep] = useState<Step>('platform');
  const [platform, setPlatform] = useState<Platform | null>(null);
  const [resource, setResource] = useState<Resource | null>(null);

  const handlePlatformSave = (data: {
    baseName: string;
    url?: string;
    description?: string;
    documentationUrl?: string;
    authNotes?: string;
  }) => {
    const newPlatform: Platform = {
      id: generateId(),
      serial: generateSerial('PLAT'),
      version: generateVersion(),
      ...data,
      resources: [],
    };
    setPlatform(newPlatform);
    setStep('resource');
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
    setResource(newResource);
    setStep('handshake');
  };

  const handleHandshakeSave = (data: Omit<Handshake, 'id' | 'serial' | 'version'>) => {
    const newHandshake: Handshake = {
      id: generateId(),
      serial: generateSerial('HS'),
      version: generateVersion(),
      ...data,
    };

    if (platform && resource) {
      const completedResource = { ...resource, handshakes: [newHandshake] };
      const completedPlatform = { ...platform, resources: [completedResource] };
      onComplete(completedPlatform);
    }
  };

  const handleSkipResource = () => {
    if (platform) {
      onComplete(platform);
    }
  };

  const handleSkipHandshake = () => {
    if (platform && resource) {
      const completedPlatform = { ...platform, resources: [resource] };
      onComplete(completedPlatform);
    }
  };

  // Progress indicator
  const steps = [
    { key: 'platform', label: '1. Platform', icon: '🏢' },
    { key: 'resource', label: '2. Resource', icon: '📦' },
    { key: 'handshake', label: '3. Handshake', icon: '🤝' },
  ];

  return (
    <div className="space-y-4">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-6">
        {steps.map((s, idx) => (
          <React.Fragment key={s.key}>
            <div
              className={`flex items-center gap-2 ${
                step === s.key
                  ? 'text-cyan-300'
                  : steps.findIndex((x) => x.key === step) > idx
                  ? 'text-green-400'
                  : 'text-gray-500'
              }`}
            >
              <span className="text-lg">{s.icon}</span>
              <span className="text-xs font-medium hidden sm:inline">{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <div className="flex-grow mx-2 h-px bg-gray-700" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <GlassPane>
        {step === 'platform' && (
          <PlatformForm onSave={handlePlatformSave} onCancel={onCancel} />
        )}

        {step === 'resource' && (
          <div className="space-y-4">
            <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg text-xs text-green-300">
              ✅ Platform "{platform?.baseName}" created!
            </div>
            <ResourceForm
              onSave={handleResourceSave}
              onCancel={() => setStep('platform')}
            />
            <div className="pt-2 border-t border-white/10">
              <GlassButton variant="ghost" size="sm" onClick={handleSkipResource}>
                Skip → Save Platform Only
              </GlassButton>
            </div>
          </div>
        )}

        {step === 'handshake' && (
          <div className="space-y-4">
            <div className="p-2 bg-green-500/10 border border-green-500/30 rounded-lg text-xs text-green-300">
              ✅ Platform "{platform?.baseName}" → Resource "{resource?.baseName}" created!
            </div>
            <HandshakeEditor
              onSave={handleHandshakeSave}
              onCancel={() => setStep('resource')}
            />
            <div className="pt-2 border-t border-white/10">
              <GlassButton variant="ghost" size="sm" onClick={handleSkipHandshake}>
                Skip → Save Without Handshake
              </GlassButton>
            </div>
          </div>
        )}
      </GlassPane>
    </div>
  );
};
