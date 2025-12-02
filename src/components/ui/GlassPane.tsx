// ============================================
// GLASS PANE COMPONENT
// ============================================

import React from 'react';

type GlassPaneProps = {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'modal' | 'dark';
  noPadding?: boolean;
};

export const GlassPane: React.FC<GlassPaneProps> = ({
  children,
  className = '',
  variant = 'default',
  noPadding = false,
}) => {
  const baseClasses = 'rounded-xl backdrop-blur-md border';
  
  const variantClasses = {
    default: 'bg-white/5 border-white/10',
    modal: 'bg-black/40 border-white/20 shadow-2xl',
    dark: 'bg-black/60 border-white/10',
  };

  const paddingClass = noPadding ? '' : 'p-4';

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${paddingClass} ${className}`}>
      {children}
    </div>
  );
};
