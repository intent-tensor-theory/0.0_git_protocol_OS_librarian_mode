// ============================================
// AUTH TYPES
// ============================================

export type AuthStatus = 'loggedOut' | 'needsSubscription' | 'loggedIn';

export type SubscriptionStatus = 'none' | 'active' | 'expired' | 'cancelled';

export type User = {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  createdAt: Date;
};

export type AccountHistoryEntry = {
  id: string;
  timestamp: number;
  status: 'Success' | 'Failure';
  details: string;
};

export type AuthState = {
  status: AuthStatus;
  user: User | null;
  subscriptionStatus: SubscriptionStatus;
  accountHistory: AccountHistoryEntry[];
};
