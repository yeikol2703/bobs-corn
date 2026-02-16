import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: true }));
app.use(express.json());

/**
 * Rate limiter: 1 corn per client per minute
 * Tracks last successful purchase timestamp per client.
 * Client identified by X-Client-Id header.
 */
const clientLastPurchase = new Map();
const RATE_LIMIT_MS = 60 * 1000; // 1 minute

function getClientId(req) {
  return req.headers['x-client-id'] || req.ip || 'anonymous';
}

function isWithinRateLimit(clientId) {
  const lastPurchase = clientLastPurchase.get(clientId);
  if (!lastPurchase) return true;
  return Date.now() - lastPurchase >= RATE_LIMIT_MS;
}

function recordPurchase(clientId) {
  clientLastPurchase.set(clientId, Date.now());
}

// POST /api/buy-corn - Purchase corn 
app.post('/api/buy-corn', (req, res) => {
  const clientId = getClientId(req);

  if (!isWithinRateLimit(clientId)) {
    const lastPurchase = clientLastPurchase.get(clientId);
    const retryAfter = Math.ceil((lastPurchase + RATE_LIMIT_MS - Date.now()) / 1000);

    res.set('Retry-After', String(retryAfter));
    return res.status(429).json({
      error: 'Too Many Requests',
      message: "Bob's fair policy: at most 1 corn per client per minute. Please wait before buying again.",
      retryAfterSeconds: retryAfter,
    });
  }

  recordPurchase(clientId);
  res.status(200).json({ corn: '🌽', message: 'Corn purchased successfully!' });
});

// GET /api/health - Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', farm: "Bob's Corn" });
});

app.listen(PORT, () => {
  console.log(`🌽 Bob's Corn API running on http://localhost:${PORT}`);
});
