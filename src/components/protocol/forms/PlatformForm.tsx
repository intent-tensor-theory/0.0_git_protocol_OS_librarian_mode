// ============================================
// PLATFORM FORM COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Platform } from '@/types';
import { GlassInput } from '../../ui/GlassInput';
import { GlassTextarea } from '../../ui/GlassTextarea';
import { GlassButton } from '../../ui/GlassButton';

type PlatformFormProps = {
  platform?: Platform;
  onSave: (data: {
    baseName: string;
    url?: string;
    description?: string;
    documentationUrl?: string;
    authNotes?: string;
  }) => void;
  onCancel: () => void;
};

export const PlatformForm: React.FC<PlatformFormProps> = ({
  platform,
  onSave,
  onCancel,
}) => {
  const [baseName, setBaseName] = useState(platform?.baseName || '');
  const [url, setUrl] = useState(platform?.url || '');
  const [description, setDescription] = useState(platform?.description || '');
  const [documentationUrl, setDocumentationUrl] = useState(platform?.documentationUrl || '');
  const [authNotes, setAuthNotes] = useState(platform?.authNotes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseName.trim()) return;

    onSave({
      baseName: baseName.trim(),
      url: url.trim() || undefined,
      description: description.trim() || undefined,
      documentationUrl: documentationUrl.trim() || undefined,
      authNotes: authNotes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-sm font-bold text-cyan-300">
        {platform ? 'Edit Platform' : 'New Platform'}
      </h4>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Platform Name <span className="text-red-400">*</span>
        </label>
        <GlassInput
          value={baseName}
          onChange={setBaseName}
          placeholder="e.g., Google, OpenAI, Stripe"
          required
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Base URL
        </label>
        <GlassInput
          type="url"
          value={url}
          onChange={setUrl}
          placeholder="https://api.example.com"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Description
        </label>
        <GlassTextarea
          value={description}
          onChange={setDescription}
          placeholder="Brief description of this platform..."
          rows={2}
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Documentation URL
        </label>
        <GlassInput
          type="url"
          value={documentationUrl}
          onChange={setDocumentationUrl}
          placeholder="https://docs.example.com"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Auth Notes
        </label>
        <GlassTextarea
          value={authNotes}
          onChange={setAuthNotes}
          placeholder="Notes about authentication requirements..."
          rows={2}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <GlassButton type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </GlassButton>
        <GlassButton type="submit" variant="primary" disabled={!baseName.trim()}>
          {platform ? 'Update' : 'Create'} Platform
        </GlassButton>
      </div>
    </form>
  );
};
