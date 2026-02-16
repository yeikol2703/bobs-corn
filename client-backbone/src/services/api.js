const API_BASE = '/api';
const CLIENT_ID_KEY = 'bobs-corn-client-id'; //Need to move to a config file

/**
 * Get or create a persistent client ID for rate limiting.
 * @returns {string}
 */
export function getClientId() {
  let clientId = localStorage.getItem(CLIENT_ID_KEY);
  if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem(CLIENT_ID_KEY, clientId);
  }
  return clientId;
}

/**
 * Attempt to buy corn from Bob's API.
 * @returns {Promise<import('../types').BuyCornResult>}
 */
export async function buyCorn() {
  const clientId = getClientId();

  const response = await fetch(`${API_BASE}/buy-corn`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Client-Id': clientId,
    },
    body: JSON.stringify({}),
  });

  const data = await response.json().catch(() => ({}));

  if (response.ok) {
    return { success: true, data, statusCode: response.status };
  }

  if (response.status === 429) {
    return {
      success: false,
      error: data.message || 'Too many requests',
      retryAfterSeconds: data.retryAfterSeconds ?? 60,
      statusCode: response.status,
    };
  }

  return {
    success: false,
    error: data.message || `Request failed (${response.status})`,
    statusCode: response.status,
  };
}
