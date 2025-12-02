// ============================================
// CENTRALIZED LOGGING SERVICE
// ============================================

import type { LogEntry, LogType } from '@/types';
import { generateId } from '@/utils/serialGenerator';

type LogSubscriber = (logs: LogEntry[]) => void;

class LoggerService {
  private logs: LogEntry[] = [];
  private subscribers: Set<LogSubscriber> = new Set();
  private maxLogs = 500;

  /**
   * Logs a message with the specified type
   */
  log(type: LogType, message: string): void {
    const entry: LogEntry = {
      id: generateId(),
      timestamp: Date.now(),
      type,
      message,
    };

    this.logs.push(entry);

    // Trim old logs if exceeding max
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // Notify subscribers
    this.notifySubscribers();

    // Also log to console in development
    if (import.meta.env.DEV) {
      const colors: Record<LogType, string> = {
        RENDER: '#9ca3af',
        ACTION: '#3b82f6',
        INFO: '#3b82f6',
        SUCCESS: '#10b981',
        WARNING: '#f59e0b',
        ERROR: '#ef4444',
        SYSTEM: '#a78bfa',
      };
      console.log(
        `%c[${type}] ${message}`,
        `color: ${colors[type]}`
      );
    }
  }

  /**
   * Clears all logs
   */
  clear(): void {
    this.logs = [];
    this.notifySubscribers();
  }

  /**
   * Returns all current logs
   */
  getLogs(): LogEntry[] {
    return [...this.logs];
  }

  /**
   * Subscribe to log updates
   * Returns unsubscribe function
   */
  subscribe(callback: LogSubscriber): () => void {
    this.subscribers.add(callback);
    // Immediately call with current logs
    callback(this.getLogs());
    
    return () => {
      this.subscribers.delete(callback);
    };
  }

  private notifySubscribers(): void {
    const currentLogs = this.getLogs();
    this.subscribers.forEach((callback) => callback(currentLogs));
  }

  /**
   * Formats logs for export/copy
   */
  formatForExport(): string {
    return this.logs
      .map((log) => {
        const time = new Date(log.timestamp).toLocaleTimeString('en-US', {
          hour12: false,
        });
        return `${time} [${log.type}] ${log.message}`;
      })
      .join('\n');
  }
}

// Singleton instance
export const logger = new LoggerService();

// Convenience methods
export const logRender = (message: string) => logger.log('RENDER', message);
export const logAction = (message: string) => logger.log('ACTION', message);
export const logInfo = (message: string) => logger.log('INFO', message);
export const logSuccess = (message: string) => logger.log('SUCCESS', message);
export const logWarning = (message: string) => logger.log('WARNING', message);
export const logError = (message: string) => logger.log('ERROR', message);
export const logSystem = (message: string) => logger.log('SYSTEM', message);
