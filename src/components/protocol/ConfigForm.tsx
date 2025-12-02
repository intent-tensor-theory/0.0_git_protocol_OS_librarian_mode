// ============================================
// CONFIG FORM COMPONENT
// ============================================

import React from 'react';
import type { ProtocolType, ProtocolField } from '@/types';
import { getProtocolById } from '@/constants';
import { GlassInput } from '../ui/GlassInput';
import { GlassTextarea } from '../ui/GlassTextarea';

type ConfigFormProps = {
  protocol: ProtocolType;
  config: Record<string, string>;
  onChange: (config: Record<string, string>) => void;
};

export const ConfigForm: React.FC<ConfigFormProps> = ({
  protocol,
  config,
  onChange,
}) => {
  const protocolDef = getProtocolById(protocol);
  
  if (!protocolDef || protocolDef.fields.length === 0) {
    return (
      <p className="text-xs text-gray-500 italic">
        No configuration required for this protocol.
      </p>
    );
  }

  const handleFieldChange = (key: string, value: string) => {
    onChange({ ...config, [key]: value });
  };

  const renderField = (field: ProtocolField) => {
    const value = config[field.key] || '';

    if (field.type === 'textarea') {
      return (
        <GlassTextarea
          value={value}
          onChange={(v) => handleFieldChange(field.key, v)}
          placeholder={field.placeholder}
          rows={3}
        />
      );
    }

    return (
      <GlassInput
        type={field.type}
        value={value}
        onChange={(v) => handleFieldChange(field.key, v)}
        placeholder={field.placeholder}
        required={field.required}
      />
    );
  };

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
        Configuration
      </h4>
      
      <div className="grid gap-3">
        {protocolDef.fields.map((field) => (
          <div key={field.key}>
            <label className="block text-xs text-gray-300 mb-1">
              {field.label}
              {field.required && <span className="text-red-400 ml-1">*</span>}
            </label>
            {renderField(field)}
          </div>
        ))}
      </div>

      {/* Callback Warning */}
      {protocolDef.requiresCallback && (
        <div className="p-2 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
          <p className="text-xs text-yellow-300">
            ⚠️ This protocol requires a callback/redirect URI. Make sure your
            redirect URI is configured in the provider's developer console.
          </p>
        </div>
      )}
    </div>
  );
};
