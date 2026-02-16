import type { BuyCornResult, BuyCornSuccessData, BuyCornErrorData } from '../types';

const API_BASE = import.meta.env.VITE_API_URL ?? 'https://bobs-corn-nzu8.onrender.com/api';
const CLIENT_ID_KEY = 'bobs-corn-client-id';

/**
 * Get or create a persistent client ID for rate limiting.
 * Stored in localStorage so the same browser = same client.
 */
export function getClientId(): string {
  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  return clientId;
}

/**
 * Attempt to buy corn from Bob API.
 */
export async function buyCorn(): Promise<BuyCornResult> {
  const clientId = getClientId();

  const response = await fetch(`${API_BASE}/buy-corn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Id': clientId,
    },
    body: JSON.stringify({}),
  });

  const data = (await response.json().catch(() => ({}))) as BuyCornSuccessData | BuyCornErrorData;

  if (response.ok) {
    return { success: true, data: data as BuyCornSuccessData, statusCode: response.status };
  }

  if (response.status === 429) {
    const errData = data as BuyCornErrorData;
    return {
      success: false,
      error: errData.message ?? 'Too many requests',
      retryAfterSeconds: errData.retryAfterSeconds ?? 60,
      statusCode: response.status,
    };
  }

  const errData = data as BuyCornErrorData;
  return {
    success: false,
    error: errData.message ?? `Request failed (${response.status})`,
    statusCode: response.status,
  };
}
