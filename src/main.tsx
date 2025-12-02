// ============================================
// MAIN ENTRY POINT
// ============================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { logger } from '@/services/logger';

// Log application start
logger.log('SYSTEM', 'Librarian Protocol OS initializing...');

// Create root and render
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html has <div id="root"></div>');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Log successful mount
logger.log('SYSTEM', 'Librarian Protocol OS mounted successfully');

// Development mode indicator
if (import.meta.env.DEV) {
  logger.log('INFO', 'Running in development mode');
  console.log(
    '%c✨ Librarian Protocol OS %cv1.0.0',
    'color: #22d3ee; font-weight: bold; font-size: 16px;',
    'color: #9ca3af; font-size: 12px;'
  );
  console.log(
    '%cSelf-documenting AI assistant ready.',
    'color: #6b7280; font-size: 11px;'
  );
}
