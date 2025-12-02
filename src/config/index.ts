// ============================================
// CONFIG EXPORTS
// ============================================
// Re-exports configuration for use throughout the app

export { LIBRARIAN_CONFIG } from '../../librarian.config';
export type { LibrarianConfig } from '../../librarian.config';

// Convenience accessors
import { LIBRARIAN_CONFIG } from '../../librarian.config';

export const config = LIBRARIAN_CONFIG;
export const features = LIBRARIAN_CONFIG.features;
export const storageKeys = LIBRARIAN_CONFIG.storageKeys;
export const uiConfig = LIBRARIAN_CONFIG.ui;
