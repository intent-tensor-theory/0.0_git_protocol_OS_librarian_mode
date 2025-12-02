// ============================================
// GLASS TEXTAREA COMPONENT
// ============================================

import React from 'react';

type GlassTextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  disabled?: boolean;
  className?: string;
  id?: string;
  name?: string;
};

export const GlassTextarea: React.FC<GlassTextareaProps> = ({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  disabled = false,
  className = '',
  id,
  name,
}) => {
  return (
    <textarea
      id={id}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      disabled={disabled}
      className={`
        w-full px-3 py-2 text-sm
        bg-black/30 border border-white/20 rounded-lg
        text-white placeholder-gray-500
        focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        resize-y min-h-[80px]
        ${className}
      `}
    />
  );
};
