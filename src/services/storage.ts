// ============================================
// STORAGE SERVICE (localStorage abstraction)
// ============================================
// This can be swapped to Firebase/Supabase later

import { storageKeys } from '@/config';
import { logger } from './logger';

/**
 * Generic storage interface
 * Allows easy swapping between localStorage, Firebase, Supabase
 */
interface StorageService {
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
}

/**
 * localStorage implementation
 */
class LocalStorageService implements StorageService {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      logger.log('ERROR', `Failed to read from storage: ${key}`);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      logger.log('ERROR', `Failed to write to storage: ${key}`);
    }
  }

  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      logger.log('ERROR', `Failed to remove from storage: ${key}`);
    }
  }

  clear(): void {
    try {
      // Only clear our keys, not all localStorage
      Object.values(storageKeys).forEach((key) => {
        localStorage.removeItem(key);
      });
    } catch (error) {
      logger.log('ERROR', 'Failed to clear storage');
    }
  }
}

// Export singleton instance
export const storage = new LocalStorageService();

// ============================================
// TYPED STORAGE HELPERS
// ============================================

import type { Platform, Conversation, Folder, Training, Contact } from '@/types';

export const platformStorage = {
  get: (): Platform[] => storage.get<Platform[]>(storageKeys.platforms) || [],
  set: (platforms: Platform[]) => storage.set(storageKeys.platforms, platforms),
  clear: () => storage.remove(storageKeys.platforms),
};

export const conversationStorage = {
  get: (): Conversation[] => storage.get<Conversation[]>(storageKeys.conversations) || [],
  set: (conversations: Conversation[]) => storage.set(storageKeys.conversations, conversations),
  clear: () => storage.remove(storageKeys.conversations),
};

export const folderStorage = {
  get: (): Folder[] => storage.get<Folder[]>(storageKeys.folders) || [],
  set: (folders: Folder[]) => storage.set(storageKeys.folders, folders),
  clear: () => storage.remove(storageKeys.folders),
};

export const trainingStorage = {
  get: (): Training[] => storage.get<Training[]>(storageKeys.trainings) || [],
  set: (trainings: Training[]) => storage.set(storageKeys.trainings, trainings),
  clear: () => storage.remove(storageKeys.trainings),
};

export const contactStorage = {
  get: (): Contact[] => storage.get<Contact[]>(storageKeys.contacts) || [],
  set: (contacts: Contact[]) => storage.set(storageKeys.contacts, contacts),
  clear: () => storage.remove(storageKeys.contacts),
};
