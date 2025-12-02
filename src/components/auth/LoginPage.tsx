// ============================================
// LOGIN PAGE COMPONENT
// ============================================

import React, { useState } from 'react';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';
import { GlassInput } from '../ui/GlassInput';

type LoginPageProps = {
  onLogin: (email: string) => void;
};

export const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    
    // Simulate login delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    
    onLogin(email);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <GlassPane variant="modal" className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">✨</div>
          <h1 className="text-3xl font-bold text-cyan-300 mb-2">
            Librarian Protocol OS
          </h1>
          <p className="text-gray-400">
            Sign in to access your self-documenting AI assistant
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <GlassInput
              id="email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              required
            />
          </div>

          <GlassButton
            type="submit"
            variant="primary"
            size="lg"
            disabled={isLoading || !email.trim()}
            className="w-full"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              'Sign In'
            )}
          </GlassButton>
        </form>

        {/* Demo Note */}
        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-gray-500">
            Demo mode: Enter any email to continue.
            <br />
            In production, connect to Firebase/Supabase auth.
          </p>
        </div>
      </GlassPane>
    </div>
  );
};
