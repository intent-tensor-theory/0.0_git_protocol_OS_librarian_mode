// ============================================
// AUTHENTICATED APP COMPONENT
// ============================================

import React, { useState } from 'react';
import type { UseLibrarianReturn } from '@/hooks/useLibrarian';
import { Header } from './Header';
import { DocsPage } from './DocsPage';
import { EngineStatusIcon } from '../EngineStatusIcon';
import { LibrarianModal } from '../LibrarianModal';
import { GlassPane } from '../ui/GlassPane';

type AuthenticatedAppProps = UseLibrarianReturn;

export const AuthenticatedApp: React.FC<AuthenticatedAppProps> = (props) => {
  const [currentPage, setCurrentPage] = useState<'home' | 'docs'>('home');

  const {
    user,
    subscriptionStatus,
    accountHistory,
    logout,
    isLibrarianVisible,
    setIsLibrarianVisible,
    globalIsConnected,
  } = props;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <Header
        user={user}
        subscriptionStatus={subscriptionStatus}
        accountHistory={accountHistory}
        onLogout={logout}
        onNavigate={setCurrentPage}
        currentPage={currentPage}
      />

      {/* Main Content */}
      {currentPage === 'docs' ? (
        <DocsPage />
      ) : (
        <main className="pt-20 pb-8 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Welcome Section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">
                Welcome to{' '}
                <span className="text-cyan-300">Librarian Protocol OS</span>
              </h1>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                Your self-documenting AI assistant is ready. Click the{' '}
                <span className="text-cyan-300">✨</span> icon to open the
                Librarian.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <GlassPane>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">💬</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      AI Conversations
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Chat with a RAG-powered AI that understands this app and
                      any documentation you add.
                    </p>
                  </div>
                </div>
              </GlassPane>

              <GlassPane>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔗</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Protocol OS
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Connect to any API with 14 supported protocols including
                      OAuth, GraphQL, and WebSockets.
                    </p>
                  </div>
                </div>
              </GlassPane>

              <GlassPane>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🧠</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Custom Training
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Create personalized AI profiles with custom personas and
                      knowledge documents.
                    </p>
                  </div>
                </div>
              </GlassPane>

              <GlassPane>
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📊</div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">
                      Real-time Logs
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Monitor all application events with color-coded logging
                      and easy export.
                    </p>
                  </div>
                </div>
              </GlassPane>
            </div>

            {/* Quick Start */}
            <GlassPane variant="modal" className="text-center">
              <h2 className="text-xl font-bold text-cyan-300 mb-4">
                Quick Start
              </h2>
              <ol className="text-left max-w-md mx-auto space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-sm font-bold">
                    1
                  </span>
                  <span>
                    Click the <span className="text-cyan-300">✨</span> icon in
                    the bottom-right corner
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-sm font-bold">
                    2
                  </span>
                  <span>
                    Ask the Librarian anything about this app
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center text-sm font-bold">
                    3
                  </span>
                  <span>
                    Explore the Sync, Train, and Human tabs
                  </span>
                </li>
              </ol>
            </GlassPane>
          </div>
        </main>
      )}

      {/* Floating Icon */}
      <EngineStatusIcon
        globalIsConnected={globalIsConnected}
        isLibrarianVisible={isLibrarianVisible}
        toggleLibrarian={() => setIsLibrarianVisible(!isLibrarianVisible)}
      />

      {/* Librarian Modal */}
      <LibrarianModal isVisible={isLibrarianVisible} {...props} />
    </div>
  );
};
