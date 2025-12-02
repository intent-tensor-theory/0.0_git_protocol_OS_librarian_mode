// ============================================
// COLLAPSIBLE CARD COMPONENT
// ============================================

import React, { useState } from 'react';
import { GlassPane } from './GlassPane';

type CollapsibleCardProps = {
  title: string;
  children: React.ReactNode;
  defaultExpanded?: boolean;
  headerActions?: React.ReactNode;
  className?: string;
};

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  children,
  defaultExpanded = false,
  headerActions,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  return (
    <GlassPane className={className} noPadding>
      <div
        className="flex items-center justify-between p-3 cursor-pointer hover:bg-white/5 transition-colors rounded-t-xl"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-semibold text-white">{title}</h3>
        <div className="flex items-center space-x-2">
          {headerActions && (
            <div onClick={(e) => e.stopPropagation()}>{headerActions}</div>
          )}
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : ''
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
        </div>
      </div>
      
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-3 pt-0 border-t border-white/10">{children}</div>
      </div>
    </GlassPane>
  );
};
