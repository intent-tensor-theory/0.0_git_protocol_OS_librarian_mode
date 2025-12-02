// ============================================
// GLASS INPUT COMPONENT
// ============================================

import React, { forwardRef } from 'react';

type GlassInputProps = {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'url';
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
  required?: boolean;
};

export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  (
    {
      value,
      onChange,
      onKeyDown,
      placeholder = '',
      type = 'text',
      disabled = false,
      className = '',
      id,
      name,
      required = false,
    },
    ref
  ) => {
    return (
      <input
        ref={ref}
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={`
          w-full px-3 py-2 text-sm
          bg-black/30 border border-white/20 rounded-lg
          text-white placeholder-gray-500
          focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200
          ${className}
        `}
      />
    );
  }
);

GlassInput.displayName = 'GlassInput';
