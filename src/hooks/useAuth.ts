// ============================================
// AUTH STATE HOOK
// ============================================

import { useState, useCallback } from 'react';
import type { AuthStatus, SubscriptionStatus, User, AccountHistoryEntry } from '@/types';
import { logger } from '@/services/logger';

// Mock account history for demo
const MOCK_ACCOUNT_HISTORY: AccountHistoryEntry[] = [
  { id: 'run-1', timestamp: Date.now() - 86400000 * 1, status: 'Success', details: 'Synced Gemini Pro Endpoint' },
  { id: 'run-2', timestamp: Date.now() - 86400000 * 2, status: 'Success', details: "Generated response for 'Codebase Analysis'" },
  { id: 'run-3', timestamp: Date.now() - 86400000 * 3, status: 'Failure', details: 'Failed to connect to Claude 3 Opus' },
  { id: 'run-4', timestamp: Date.now() - 86400000 * 4, status: 'Success', details: "Created 'UI Enhancements' training profile" },
  { id: 'run-5', timestamp: Date.now() - 86400000 * 5, status: 'Success', details: 'Deleted 3 conversations' },
];

export const useAuth = () => {
  const [authStatus, setAuthStatus] = useState<AuthStatus>('loggedOut');
  const [user, setUser] = useState<User | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState<SubscriptionStatus>('none');
  const [accountHistory, setAccountHistory] = useState<AccountHistoryEntry[]>([]);

  const login = useCallback((email: string) => {
    logger.log('ACTION', `User login attempt: ${email}`);
    
    // Simulated login - replace with real auth
    const newUser: User = {
      id: crypto.randomUUID(),
      email,
      name: email.split('@')[0],
      createdAt: new Date(),
    };
    
    setUser(newUser);
    setAuthStatus('needsSubscription');
    logger.log('SUCCESS', `User logged in: ${email}`);
  }, []);

  const subscribe = useCallback(() => {
    logger.log('ACTION', 'User subscription successful.');
    setSubscriptionStatus('active');
    setAuthStatus('loggedIn');
    setAccountHistory(MOCK_ACCOUNT_HISTORY);
  }, []);

  const logout = useCallback(() => {
    logger.log('ACTION', 'User logged out.');
    setUser(null);
    setSubscriptionStatus('none');
    setAuthStatus('loggedOut');
    setAccountHistory([]);
  }, []);

  const updateUser = useCallback((updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  }, []);

  return {
    // State
    authStatus,
    user,
    subscriptionStatus,
    accountHistory,
    
    // Actions
    login,
    subscribe,
    logout,
    updateUser,
    
    // Computed
    isLoggedIn: authStatus === 'loggedIn',
    isSubscribed: subscriptionStatus === 'active',
  };
};

export type UseAuthReturn = ReturnType<typeof useAuth>;
