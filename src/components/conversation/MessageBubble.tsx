// ============================================
// MESSAGE BUBBLE COMPONENT
// ============================================

import React from 'react';
import type { Message } from '@/types';

type MessageBubbleProps = {
  message: Message;
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isAI = message.sender === 'ai';

  return (
    <div
      className={`flex ${isAI ? 'justify-start' : 'justify-end'} mb-3`}
    >
      <div
        className={`
          max-w-[85%] px-4 py-3 rounded-2xl
          ${isAI
            ? 'bg-white/10 text-gray-200 rounded-bl-md'
            : 'bg-cyan-500/20 text-cyan-100 rounded-br-md'
          }
        `}
      >
        {/* Sender Label */}
        <div
          className={`text-xs font-bold mb-1 ${
            isAI ? 'text-cyan-400' : 'text-cyan-300'
          }`}
        >
          {isAI ? '🤖 Librarian' : '👤 You'}
        </div>

        {/* Message Text */}
        <div className="text-sm whitespace-pre-wrap leading-relaxed">
          {message.text}
        </div>

        {/* Timestamp (if available) */}
        {message.timestamp && (
          <div className="text-[10px] text-gray-500 mt-2 text-right">
            {new Date(message.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </div>
        )}
      </div>
    </div>
  );
};
