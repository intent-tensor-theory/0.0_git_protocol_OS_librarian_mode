// ============================================
// PROFILE MODAL COMPONENT
// ============================================

import React, { useState } from 'react';
import type { User, AccountHistoryEntry, SubscriptionStatus } from '@/types';
import { Modal } from '../ui/Modal';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  subscriptionStatus: SubscriptionStatus;
  accountHistory: AccountHistoryEntry[];
  onLogout: () => void;
};

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  subscriptionStatus,
  accountHistory,
  onLogout,
}) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'history'>('profile');
  const [name, setName] = useState(user?.name || '');

  if (!user) return null;

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getSubscriptionBadge = () => {
    switch (subscriptionStatus) {
      case 'active':
        return <span className="px-2 py-1 text-xs bg-green-500/20 text-green-300 rounded-full">Active</span>;
      case 'expired':
        return <span className="px-2 py-1 text-xs bg-red-500/20 text-red-300 rounded-full">Expired</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">Cancelled</span>;
      default:
        return <span className="px-2 py-1 text-xs bg-gray-500/20 text-gray-300 rounded-full">None</span>;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Account" size="lg">
      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'profile'
              ? 'bg-cyan-500/20 text-cyan-300'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            activeTab === 'history'
              ? 'bg-cyan-500/20 text-cyan-300'
              : 'text-gray-400 hover:text-white hover:bg-white/5'
          }`}
        >
          Activity History
        </button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          {/* Avatar & Basic Info */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-sm text-gray-400">{user.email}</p>
            </div>
          </div>

          {/* Subscription Status */}
          <GlassPane>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Subscription</p>
                <p className="text-white font-medium">Pro Plan</p>
              </div>
              {getSubscriptionBadge()}
            </div>
          </GlassPane>

          {/* Edit Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Display Name
            </label>
            <GlassInput
              value={name}
              onChange={setName}
              placeholder="Your name"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-white/10">
            <GlassButton variant="default" onClick={onClose}>
              Save Changes
            </GlassButton>
            <GlassButton variant="danger" onClick={onLogout}>
              Sign Out
            </GlassButton>
          </div>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {accountHistory.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No activity yet</p>
          ) : (
            accountHistory.map((entry) => (
              <GlassPane key={entry.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      entry.status === 'Success' ? 'bg-green-400' : 'bg-red-400'
                    }`}
                  />
                  <div>
                    <p className="text-sm text-white">{entry.details}</p>
                    <p className="text-xs text-gray-500">{formatDate(entry.timestamp)}</p>
                  </div>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    entry.status === 'Success'
                      ? 'bg-green-500/20 text-green-300'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {entry.status}
                </span>
              </GlassPane>
            ))
          )}
        </div>
      )}
    </Modal>
  );
};
