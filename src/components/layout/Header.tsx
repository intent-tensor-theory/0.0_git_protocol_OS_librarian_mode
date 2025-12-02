// ============================================
// HEADER COMPONENT
// ============================================

import React, { useState } from 'react';
import type { User, SubscriptionStatus, AccountHistoryEntry } from '@/types';
import { ProfileModal } from '../auth/ProfileModal';

type HeaderProps = {
  user: User | null;
  subscriptionStatus: SubscriptionStatus;
  accountHistory: AccountHistoryEntry[];
  onLogout: () => void;
  onNavigate: (page: 'home' | 'docs') => void;
  currentPage: 'home' | 'docs';
};

export const Header: React.FC<HeaderProps> = ({
  user,
  subscriptionStatus,
  accountHistory,
  onLogout,
  onNavigate,
  currentPage,
}) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-30 bg-black/50 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <span className="text-2xl">✨</span>
            <span className="text-xl font-bold text-cyan-300">
              Librarian Protocol OS
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('home')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'home'
                  ? 'text-cyan-300'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onNavigate('docs')}
              className={`text-sm font-medium transition-colors ${
                currentPage === 'docs'
                  ? 'text-cyan-300'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Docs
            </button>

            {/* User Menu */}
            {user && (
              <button
                onClick={() => setIsProfileOpen(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm text-gray-300 hidden sm:block">
                  {user.name}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400"
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
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Profile Modal */}
      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={user}
        subscriptionStatus={subscriptionStatus}
        accountHistory={accountHistory}
        onLogout={onLogout}
      />
    </>
  );
};
