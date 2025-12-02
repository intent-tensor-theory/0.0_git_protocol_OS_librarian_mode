// ============================================
// OAUTH PKCE UTILITIES
// ============================================

const PKCE_VERIFIER_KEY = 'librarian_pkce_verifier';
const PKCE_STATE_KEY = 'librarian_pkce_state';

/**
 * Generates a cryptographically random string for PKCE
 */
export const generateRandomString = (length: number): string => {
  const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
  const cryptoObj = window.crypto || (window as unknown as { msCrypto: Crypto }).msCrypto;
  
  if (cryptoObj) {
    const values = new Uint32Array(length);
    cryptoObj.getRandomValues(values);
    return Array.from(values)
      .map((v) => charset[v % charset.length])
      .join('');
  }
  
  // Fallback (less secure)
  return Array.from({ length }, () => 
    charset[Math.floor(Math.random() * charset.length)]
  ).join('');
};

/**
 * Generates SHA-256 hash and returns base64url encoded string
 */
export const sha256 = async (plain: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hash = await crypto.subtle.digest('SHA-256', data);
  
  return btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

/**
 * Generates a PKCE code verifier and challenge pair
 */
export const generatePKCE = async (): Promise<{
  verifier: string;
  challenge: string;
}> => {
  const verifier = generateRandomString(128);
  const challenge = await sha256(verifier);
  return { verifier, challenge };
};

/**
 * Stores PKCE verifier in session storage
 */
export const storePKCEVerifier = (verifier: string): void => {
  sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
};

/**
 * Retrieves and clears PKCE verifier from session storage
 */
export const retrievePKCEVerifier = (): string | null => {
  const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
  sessionStorage.removeItem(PKCE_VERIFIER_KEY);
  return verifier;
};

/**
 * Generates and stores state parameter for CSRF protection
 */
export const generateState = (): string => {
  const state = generateRandomString(32);
  sessionStorage.setItem(PKCE_STATE_KEY, state);
  return state;
};

/**
 * Validates state parameter
 */
export const validateState = (state: string): boolean => {
  const storedState = sessionStorage.getItem(PKCE_STATE_KEY);
  sessionStorage.removeItem(PKCE_STATE_KEY);
  return storedState === state;
};

/**
 * Builds OAuth authorization URL with PKCE parameters
 */
export const buildAuthUrl = async (config: {
  authUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
  usePKCE?: boolean;
}): Promise<string> => {
  const params = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    response_type: 'code',
    scope: config.scope,
    state: generateState(),
  });

  if (config.usePKCE !== false) {
    const { verifier, challenge } = await generatePKCE();
    storePKCEVerifier(verifier);
    params.append('code_challenge', challenge);
    params.append('code_challenge_method', 'S256');
  }

  return `${config.authUrl}?${params.toString()}`;
};
