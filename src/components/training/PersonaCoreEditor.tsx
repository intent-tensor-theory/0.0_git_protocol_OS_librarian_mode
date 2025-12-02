// ============================================
// PERSONA CORE EDITOR COMPONENT
// ============================================

import React from 'react';
import type { Training } from '@/types';
import { GlassInput } from '../ui/GlassInput';
import { GlassTextarea } from '../ui/GlassTextarea';
import { GlassSelect } from '../ui/GlassSelect';

type PersonaCoreEditorProps = {
  training: Training;
  onChange: (training: Training) => void;
};

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professional' },
  { value: 'casual', label: 'Casual' },
  { value: 'technical', label: 'Technical' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'formal', label: 'Formal' },
  { value: 'creative', label: 'Creative' },
];

const EXPERTISE_OPTIONS = [
  { value: 'beginner', label: 'Beginner-friendly' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced / Expert' },
  { value: 'mixed', label: 'Adaptive' },
];

export const PersonaCoreEditor: React.FC<PersonaCoreEditorProps> = ({
  training,
  onChange,
}) => {
  const updateField = <K extends keyof Training>(key: K, value: Training[K]) => {
    onChange({ ...training, [key]: value });
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-bold text-cyan-300">Persona Core</h4>
      <p className="text-xs text-gray-400">
        Define how the AI assistant should behave and respond.
      </p>

      {/* Name */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Training Profile Name <span className="text-red-400">*</span>
        </label>
        <GlassInput
          value={training.name}
          onChange={(v) => updateField('name', v)}
          placeholder="e.g., Customer Support Agent"
        />
      </div>

      {/* System Prompt */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          System Prompt
        </label>
        <GlassTextarea
          value={training.systemPrompt || ''}
          onChange={(v) => updateField('systemPrompt', v)}
          placeholder="You are a helpful assistant that specializes in..."
          rows={4}
        />
        <p className="text-[10px] text-gray-500 mt-1">
          This instruction is prepended to every conversation.
        </p>
      </div>

      {/* Tone & Style */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-300 mb-1">Tone</label>
          <GlassSelect
            value={training.tone || 'professional'}
            onChange={(v) => updateField('tone', v)}
            options={TONE_OPTIONS}
          />
        </div>
        <div>
          <label className="block text-xs text-gray-300 mb-1">
            Expertise Level
          </label>
          <GlassSelect
            value={training.expertiseLevel || 'intermediate'}
            onChange={(v) => updateField('expertiseLevel', v)}
            options={EXPERTISE_OPTIONS}
          />
        </div>
      </div>

      {/* Response Guidelines */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Response Guidelines
        </label>
        <GlassTextarea
          value={training.responseGuidelines || ''}
          onChange={(v) => updateField('responseGuidelines', v)}
          placeholder="- Always greet the user&#10;- Keep responses concise&#10;- Provide examples when explaining concepts"
          rows={3}
        />
      </div>

      {/* Forbidden Topics */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Forbidden Topics <span className="text-gray-500">(one per line)</span>
        </label>
        <GlassTextarea
          value={training.forbiddenTopics?.join('\n') || ''}
          onChange={(v) =>
            updateField(
              'forbiddenTopics',
              v
                .split('\n')
                .map((t) => t.trim())
                .filter(Boolean)
            )
          }
          placeholder="competitor pricing&#10;legal advice&#10;medical diagnoses"
          rows={3}
        />
      </div>

      {/* Example Exchanges */}
      <div>
        <label className="block text-xs text-gray-300 mb-1">
          Example Exchanges
        </label>
        <GlassTextarea
          value={training.exampleExchanges || ''}
          onChange={(v) => updateField('exampleExchanges', v)}
          placeholder="User: How do I reset my password?&#10;Assistant: I'd be happy to help! To reset your password..."
          rows={4}
        />
        <p className="text-[10px] text-gray-500 mt-1">
          Provide example conversations to guide the AI's style.
        </p>
      </div>
    </div>
  );
};
