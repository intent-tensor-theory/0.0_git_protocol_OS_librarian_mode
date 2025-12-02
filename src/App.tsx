// ============================================
// APP COMPONENT - MAIN APPLICATION ENTRY
// ============================================

import React from 'react';
import { useLibrarian } from '@/hooks/useLibrarian';
import { librarianConfig } from '@/config';
import { LoginPage } from '@/components/auth/LoginPage';
import { SubscriptionPage } from '@/components/auth/SubscriptionPage';
import { AuthenticatedApp } from '@/components/layout/AuthenticatedApp';

const App: React.FC = () => {
  const librarian = useLibrarian();

  const {
    authStatus,
    user,
    login,
    logout,
    subscribe,
  } = librarian;

  // If auth is disabled, skip login flow
  const authEnabled = librarianConfig.features.auth;
  const subscriptionEnabled = librarianConfig.features.subscription;

  // Determine what to render based on auth state
  const renderApp = () => {
    // Auth disabled - go straight to app
    if (!authEnabled) {
      return <AuthenticatedApp {...librarian} />;
    }

    // Not logged in - show login page
    if (authStatus === 'unauthenticated') {
      return (
        <LoginPage
          onLogin={(email) => {
            // Create a mock user from email
            const name = email.split('@')[0];
            login(email);
          }}
        />
      );
    }

    // Logged in but subscription required and not subscribed
    if (
      subscriptionEnabled &&
      authStatus === 'authenticated' &&
      !user?.subscriptionId
    ) {
      return (
        <SubscriptionPage
          userEmail={user?.email || ''}
          onSubscribe={subscribe}
          onLogout={logout}
        />
      );
    }

    // Fully authenticated - show main app
    return <AuthenticatedApp {...librarian} />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {renderApp()}
    </div>
  );
};

export default App;
