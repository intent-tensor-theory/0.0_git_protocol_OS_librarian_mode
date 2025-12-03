// ============================================
// STORAGE SERVICE - PERSISTENCE ABSTRACTION
// ============================================

import { logger } from './logger';

// Storage keys
const STORAGE_KEYS = {
  conversations: 'librarian_conversations',
  folders: 'librarian_folders',
  platforms: 'librarian_platforms',
  trainings: 'librarian_trainings',
  contacts: 'librarian_contacts',
  user: 'librarian_user',
};

/**
 * Generic storage class that can be swapped between providers
 */
class StorageService<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  get(): T[] {
    return this.getAll();
  }

  getAll(): T[] {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      logger.log('ERROR', `Failed to read from storage: ${this.key}`);
      return [];
    }
  }

  save(items: T[]): void {
    try {
      localStorage.setItem(this.key, JSON.stringify(items));
      logger.log('INFO', `Saved ${items.length} items to ${this.key}`);
    } catch (error) {
      logger.log('ERROR', `Failed to save to storage: ${this.key}`);
    }
  }

  getById(id: string): T | undefined {
    const items = this.getAll();
    return items.find((item: any) => item.id === id);
  }

  add(item: T): void {
    const items = this.getAll();
    items.push(item);
    this.save(items);
  }

  update(id: string, updates: Partial<T>): void {
    const items = this.getAll();
    const index = items.findIndex((item: any) => item.id === id);
    if (index !== -1) {
      items[index] = { ...items[index], ...updates };
      this.save(items);
    }
  }

  delete(id: string): void {
    const items = this.getAll();
    const filtered = items.filter((item: any) => item.id !== id);
    this.save(filtered);
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }
}

// Export storage instances
export const conversationStorage = new StorageService(STORAGE_KEYS.conversations);
export const folderStorage = new StorageService(STORAGE_KEYS.folders);
export const platformStorage = new StorageService(STORAGE_KEYS.platforms);
export const trainingStorage = new StorageService(STORAGE_KEYS.trainings);
export const contactStorage = new StorageService(STORAGE_KEYS.contacts);
export const userStorage = new StorageService(STORAGE_KEYS.user);
