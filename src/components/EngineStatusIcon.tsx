// ============================================
// ENGINE STATUS ICON (Floating Button)
// ============================================

import React from 'react';
import { uiConfig } from '@/config';

type EngineStatusIconProps = {
  globalIsConnected: boolean;
  isLibrarianVisible: boolean;
  toggleLibrarian: () => void;
};

export const EngineStatusIcon: React.FC<EngineStatusIconProps> = ({
  globalIsConnected,
  isLibrarianVisible,
  toggleLibrarian,
}) => {
  const { floatingIcon } = uiConfig;
  
  const borderColor = globalIsConnected
    ? 'border-cyan-400'
    : 'border-red-500';
  
  const glowClass = globalIsConnected
    ? 'shadow-[0_0_15px_rgba(34,211,238,0.5)]'
    : 'shadow-[0_0_15px_rgba(239,68,68,0.5)]';
  
  const pulseClass = globalIsConnected
    ? 'animate-pulse'
    : '';

  return (
    <button
      onClick={toggleLibrarian}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-black/80 backdrop-blur-md
        border-4 ${borderColor}
        ${glowClass}
        flex items-center justify-center
        cursor-pointer
        transition-all duration-300
        hover:scale-110
        focus:outline-none focus:ring-2 focus:ring-cyan-400/50
      `}
      title={isLibrarianVisible ? 'Close Librarian' : 'Open Librarian'}
      aria-label={isLibrarianVisible ? 'Close Librarian' : 'Open Librarian'}
    >
      <span className={`text-3xl ${pulseClass}`}>
        {globalIsConnected ? floatingIcon.connectedEmoji : floatingIcon.disconnectedEmoji}
      </span>
    </button>
  );
};
