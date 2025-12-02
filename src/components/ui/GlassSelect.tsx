// ============================================
// GLASS SELECT COMPONENT
// ============================================

import React from 'react';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type GlassSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: Option[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
};

export const GlassSelect: React.FC<GlassSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = 'Select...',
  disabled = false,
  className = '',
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className={`
        w-full px-3 py-2 text-sm
        bg-black/30 border border-white/20 rounded-lg
        text-white
        focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/30
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200
        appearance-none cursor-pointer
        ${className}
      `}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.5rem center',
        backgroundSize: '1.5em 1.5em',
        paddingRight: '2.5rem',
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((option) => (
        <option
          key={option.value}
          value={option.value}
          disabled={option.disabled}
          className="bg-gray-900 text-white"
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};
