// ============================================
// GLASS BUTTON COMPONENT
// ============================================

import React from 'react';

type GlassButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'primary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  pulsate?: boolean;
};

export const GlassButton: React.FC<GlassButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'default',
  size = 'md',
  disabled = false,
  className = '',
  pulsate = false,
}) => {
  const baseClasses = `
    font-semibold rounded-lg transition-all duration-200
    backdrop-blur-sm border
    disabled:opacity-50 disabled:cursor-not-allowed
    focus:outline-none focus:ring-2 focus:ring-cyan-400/50
  `;

  const variantClasses = {
    default: 'bg-white/10 border-white/20 text-white hover:bg-white/20',
    primary: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30',
    danger: 'bg-red-500/20 border-red-400/40 text-red-300 hover:bg-red-500/30',
    ghost: 'bg-transparent border-transparent text-gray-300 hover:bg-white/10',
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const pulsateClass = pulsate ? 'animate-pulse' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${pulsateClass}
        ${className}
      `}
    >
      {children}
    </button>
  );
};
