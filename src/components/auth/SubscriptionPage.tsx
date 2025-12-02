// ============================================
// SUBSCRIPTION PAGE COMPONENT
// ============================================

import React, { useState } from 'react';
import { GlassPane } from '../ui/GlassPane';
import { GlassButton } from '../ui/GlassButton';

type SubscriptionPageProps = {
  userEmail: string;
  onSubscribe: () => void;
  onLogout: () => void;
};

export const SubscriptionPage: React.FC<SubscriptionPageProps> = ({
  userEmail,
  onSubscribe,
  onLogout,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 1200));
    
    onSubscribe();
    setIsProcessing(false);
  };

  const plans = [
    {
      name: 'Starter',
      price: '$9',
      period: '/month',
      features: [
        '1 AI Engine',
        '100 conversations/month',
        '5 Training profiles',
        'Basic RAG search',
      ],
      recommended: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: '/month',
      features: [
        'All AI Engines',
        'Unlimited conversations',
        'Unlimited Training profiles',
        'Advanced vector RAG',
        'Priority support',
        'API access',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      features: [
        'Everything in Pro',
        'Custom AI models',
        'SSO / SAML',
        'Dedicated support',
        'SLA guarantee',
      ],
      recommended: false,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-4">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-cyan-300 mb-2">
            Choose Your Plan
          </h1>
          <p className="text-gray-400">
            Welcome, <span className="text-cyan-400">{userEmail}</span>
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <GlassPane
              key={plan.name}
              variant={plan.recommended ? 'modal' : 'default'}
              className={`relative ${plan.recommended ? 'ring-2 ring-cyan-400' : ''}`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cyan-500 text-black text-xs font-bold px-3 py-1 rounded-full">
                  RECOMMENDED
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-cyan-300">{plan.price}</span>
                  <span className="text-gray-400 ml-1">{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-300">
                    <svg className="w-5 h-5 text-cyan-400 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <GlassButton
                variant={plan.recommended ? 'primary' : 'default'}
                className="w-full"
                onClick={handleSubscribe}
                disabled={isProcessing}
              >
                {isProcessing ? 'Processing...' : plan.name === 'Enterprise' ? 'Contact Sales' : 'Get Started'}
              </GlassButton>
            </GlassPane>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center">
          <button
            onClick={onLogout}
            className="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            Sign out and use a different account
          </button>
          <p className="text-xs text-gray-600 mt-4">
            Demo mode: Click any plan to continue.
          </p>
        </div>
      </div>
    </div>
  );
};
