// ============================================
// CURL COMMAND PARSER
// ============================================

export type ParsedCurl = {
  url: string;
  options: RequestInit;
};

/**
 * Parses a cURL command string into a URL and fetch options
 * Supports: -X, -H, -d, --data, -u, -L flags
 */
export const parseCurl = (curlCommand: string): ParsedCurl => {
  // Remove 'curl' prefix and normalize line continuations
  let command = curlCommand.trim().replace(/^curl\s+/, '');
  command = command.replace(/\\\s*\n/g, ' ');

  // Parse arguments respecting quotes
  const args: string[] = [];
  let current = '';
  let inQuote = false;
  let quoteChar = '';

  for (const char of command) {
    if ((char === '"' || char === "'") && !inQuote) {
      inQuote = true;
      quoteChar = char;
    } else if (char === quoteChar && inQuote) {
      inQuote = false;
      quoteChar = '';
    } else if (char === ' ' && !inQuote) {
      if (current) {
        args.push(current);
        current = '';
      }
    } else {
      current += char;
    }
  }
  if (current) args.push(current);

  // Extract components
  let url = '';
  const headers: Record<string, string> = {};
  let method = 'GET';
  let body: string | null = null;
  let followRedirect = false;

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg.startsWith('http://') || arg.startsWith('https://')) {
      url = arg;
    } else if (arg === '-X' || arg === '--request') {
      method = args[++i]?.toUpperCase() || 'GET';
    } else if (arg === '-H' || arg === '--header') {
      const header = args[++i];
      if (header) {
        const colonIndex = header.indexOf(':');
        if (colonIndex > 0) {
          const key = header.substring(0, colonIndex).trim();
          const value = header.substring(colonIndex + 1).trim();
          headers[key] = value;
        }
      }
    } else if (arg === '-d' || arg === '--data' || arg === '--data-raw') {
      body = args[++i] || null;
      if (method === 'GET') method = 'POST';
    } else if (arg === '-u' || arg === '--user') {
      const credentials = args[++i];
      if (credentials) {
        headers['Authorization'] = 'Basic ' + btoa(credentials);
      }
    } else if (arg === '-L' || arg === '--location') {
      followRedirect = true;
    }
  }

  const options: RequestInit = {
    method,
    headers,
    redirect: followRedirect ? 'follow' : 'manual',
  };

  if (body) {
    options.body = body;
  }

  return { url, options };
};

/**
 * Validates if a string looks like a cURL command
 */
export const isCurlCommand = (text: string): boolean => {
  const trimmed = text.trim().toLowerCase();
  return trimmed.startsWith('curl ') || trimmed.startsWith('curl\n');
};

/**
 * Generates a cURL command from fetch options
 */
export const toCurl = (url: string, options: RequestInit): string => {
  const parts = ['curl'];

  if (options.method && options.method !== 'GET') {
    parts.push(`-X ${options.method}`);
  }

  if (options.headers) {
    const headers = options.headers as Record<string, string>;
    for (const [key, value] of Object.entries(headers)) {
      parts.push(`-H "${key}: ${value}"`);
    }
  }

  if (options.body) {
    parts.push(`-d '${options.body}'`);
  }

  parts.push(`"${url}"`);

  return parts.join(' \\\n  ');
};
