// ============================================
// TAB BUTTON COMPONENT
// ============================================

import React from 'react';

type TabButtonProps = {
  label: string;
  isActive: boolean;
  onClick: () => void;
  hasDropdown?: boolean;
  isDropdownOpen?: boolean;
};

export const TabButton: React.FC<TabButtonProps> = ({
  label,
  isActive,
  onClick,
  hasDropdown = false,
  isDropdownOpen = false,
}) => {
  const baseClasses = `
    flex-1 px-4 py-2 text-sm font-bold
    transition-all duration-200 ease-in-out
    rounded-t-lg border-b-2
    focus:outline-none
  `;

  const activeClasses = isActive
    ? 'bg-white/10 border-cyan-400 text-cyan-300'
    : 'bg-black/20 border-transparent text-gray-400 hover:bg-black/30 hover:text-gray-300 opacity-70 hover:opacity-100';

  return (
    <button onClick={onClick} className={`${baseClasses} ${activeClasses}`}>
      <div className="flex items-center justify-center">
        <span>{label}</span>
        {hasDropdown && (
          <svg
            className={`ml-1 w-4 h-4 transition-transform duration-300 ${
              isDropdownOpen ? 'rotate-180' : ''
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>
    </button>
  );
};
