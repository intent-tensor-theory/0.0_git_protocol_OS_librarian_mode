// ============================================
// SERIAL NUMBER GENERATOR
// ============================================

type SerialType = 'PLAT' | 'RES' | 'HS';

// Track counters for each type (in-memory, resets on reload)
const counters: Record<SerialType, number> = {
  PLAT: 0,
  RES: 0,
  HS: 0,
};

/**
 * Generates a unique serial number for Protocol OS entities
 * Format: {TYPE}-{NUMBER}-{SUFFIX}
 * Example: PLAT-001-A, RES-042-B, HS-007-C
 */
export const generateSerial = (type: SerialType): string => {
  counters[type]++;
  const num = counters[type].toString().padStart(3, '0');
  const suffix = String.fromCharCode(65 + (counters[type] % 26)); // A-Z
  return `${type}-${num}-${suffix}`;
};

/**
 * Generates a full hierarchical serial
 * Format: PLAT-001-A.RES-001-A.HS-001-A
 */
export const generateHierarchicalSerial = (
  platformSerial: string,
  resourceSerial?: string,
  handshakeSerial?: string
): string => {
  const parts = [platformSerial];
  if (resourceSerial) parts.push(resourceSerial);
  if (handshakeSerial) parts.push(handshakeSerial);
  return parts.join('.');
};

/**
 * Generates a unique ID using crypto
 */
export const generateId = (): string => {
  return crypto.randomUUID();
};

/**
 * Generates a timestamp-based ID (fallback)
 */
export const generateTimestampId = (prefix = ''): string => {
  return `${prefix}${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Generates current version string
 */
export const generateVersion = (): string => {
  return '1.0.0';
};
