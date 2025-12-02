// ============================================
// ENGINE CONSTANTS
// ============================================

import type { Engine, EngineStatus } from '@/types';

export const AVAILABLE_ENGINES: Engine[] = [
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini Pro Endpoint',
    schema: 'TEXT: Text Generation',
    status: 'active',
    lastEdited: '2025-10-25 10:30',
    serialNumber: 'PLAT-QUICKADD-001-A.RES-001-A.HS-001-A',
  },
  {
    id: 'claude',
    name: 'Claude 3 Opus',
    schema: 'TEXT: Text Generation',
    status: 'active',
    lastEdited: '2025-09-15 14:12',
    serialNumber: 'PLAT-QUICKADD-001-B.RES-001-B.HS-001-B',
  },
  {
    id: 'gpt4',
    name: 'GPT-4 Turbo',
    schema: 'TEXT: Text Generation',
    status: 'active',
    lastEdited: '2025-10-28 09:00',
    serialNumber: 'PLAT-QUICKADD-001-C.RES-001-C.HS-001-C',
  },
  {
    id: 'mistral',
    name: 'Mistral Large',
    schema: 'CODE: Code Generation',
    status: 'syncing',
    lastEdited: '2025-10-29 17:45',
    serialNumber: 'PLAT-QUICKADD-001-D.RES-001-D.HS-001-D',
  },
  {
    id: 'legacy',
    name: 'OpenAI Legacy',
    schema: 'TEXT: Text Generation',
    status: 'disconnected',
    lastEdited: '2025-08-01 08:00',
    serialNumber: 'PLAT-QUICKADD-001-E.RES-001-E.HS-001-E',
  },
];

export const STATUS_MAP: Record<
  EngineStatus,
  { icon: string; text: string; colorClass: string }
> = {
  active: {
    icon: '✅',
    text: 'Active',
    colorClass: 'bg-green-500/20 text-green-300',
  },
  syncing: {
    icon: '🔄',
    text: 'Syncing',
    colorClass: 'bg-yellow-500/20 text-yellow-300',
  },
  disconnected: {
    icon: '🔴',
    text: 'Disconnected',
    colorClass: 'bg-red-500/20 text-red-300',
  },
};

export const getDefaultEngine = (): Engine | undefined => {
  return AVAILABLE_ENGINES.find((e) => e.status === 'active');
};
