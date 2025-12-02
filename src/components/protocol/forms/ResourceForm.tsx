// ============================================
// RESOURCE FORM COMPONENT
// ============================================

import React, { useState } from 'react';
import type { Resource } from '@/types';
import { GlassInput } from '../../ui/GlassInput';
import { GlassTextarea } from '../../ui/GlassTextarea';
import { GlassButton } from '../../ui/GlassButton';

type ResourceFormProps = {
  resource?: Resource;
  onSave: (data: {
    baseName: string;
    url?: string;
    description?: string;
    documentationUrl?: string;
    notes?: string;
  }) => void;
  onCancel: () => void;
};

export const ResourceForm: React.FC<ResourceFormProps> = ({
  resource,
  onSave,
  onCancel,
}) => {
  const [baseName, setBaseName] = useState(resource?.baseName || '');
  const [url, setUrl] = useState(resource?.url || '');
  const [description, setDescription] = useState(resource?.description || '');
  const [documentationUrl, setDocumentationUrl] = useState(resource?.documentationUrl || '');
  const [notes, setNotes] = useState(resource?.notes || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!baseName.trim()) return;

    onSave({
      baseName: baseName.trim(),
      url: url.trim() || undefined,
      description: description.trim() || undefined,
      documentationUrl: documentationUrl.trim() || undefined,
      notes: notes.trim() || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h4 className="text-sm font-bold text-cyan-300">
        {resource ? 'Edit Resource' : 'New Resource'}
      </h4>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Resource Name <span className="text-red-400">*</span>
        </label>
        <GlassInput
          value={baseName}
          onChange={setBaseName}
          placeholder="e.g., Calendar API, Users Endpoint"
          required
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Endpoint URL
        </label>
        <GlassInput
          type="url"
          value={url}
          onChange={setUrl}
          placeholder="https://api.example.com/v1/users"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Description
        </label>
        <GlassTextarea
          value={description}
          onChange={setDescription}
          placeholder="What does this resource do?"
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
          placeholder="https://docs.example.com/api/users"
        />
      </div>

      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Notes
        </label>
        <GlassTextarea
          value={notes}
          onChange={setNotes}
          placeholder="Any additional notes..."
          rows={2}
        />
      </div>

      <div className="flex gap-2 pt-2">
        <GlassButton type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </GlassButton>
        <GlassButton type="submit" variant="primary" disabled={!baseName.trim()}>
          {resource ? 'Update' : 'Create'} Resource
        </GlassButton>
      </div>
    </form>
  );
};
