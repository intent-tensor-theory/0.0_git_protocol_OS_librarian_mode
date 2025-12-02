// ============================================
// ENGINE & LOG TYPES
// ============================================

export type EngineStatus = 'active' | 'syncing' | 'disconnected';

export type Engine = {
  id: string;
  name: string;
  schema: string;
  status: EngineStatus;
  lastEdited: string;
  serialNumber: string;
};

export type LogType = 'RENDER' | 'ACTION' | 'INFO' | 'SUCCESS' | 'WARNING' | 'ERROR' | 'SYSTEM';

export type LogEntry = {
  id: string;
  timestamp: number;
  type: LogType;
  message: string;
};

export type Contact = {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
};

export type LibrarianMode = 'Sentient' | 'Wizard';
