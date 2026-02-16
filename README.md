# Bob's Corn 🌽

A rate-limited corn purchasing API with optional client UIs. Built for the Bob's Corn challenge.

## Overview

- **Backend:** Express API with a custom rate limiter — at most 1 corn per client per minute.
- **Frontend (optional):** Two client apps with the same behavior:
  - **React** (`client/`) — React 18, Vite, Tailwind; components + hooks + services.
  - **Backbone** (`client-backbone/`) — Backbone.js, jQuery, Tailwind; views + models + services.

**Business rule:** At most 1 corn per client per minute (sliding 60-second window).

**Documentation:** [HLD.md](HLD.md) — High Level Design (architecture, data flow, design decisions).

## Project structure

```
bobs-corn/
├── server/           # Express API (rate limiter, buy-corn, health)
├── client/           # React + Vite + Tailwind (port 5173)
├── client-backbone/ # Backbone + Vite + Tailwind (port 5174)
├── package.json     # Root scripts: dev:server, dev:client, start:server
├── README.md
└── HLD.md           # High Level Design
```

## Prerequisites

- **Node.js 18+**

## Quick start

### 1. Install dependencies

From the project root:

```bash
cd server && npm install
cd ../client && npm install
cd ../client-backbone && npm install
cd ..
```

Or install each package in its own terminal.

### 2. Run the API

**Option A — from root:**

```bash
npm run dev:server
```

**Option B — from server folder:**

```bash
cd server && npm run dev
```

The API runs at **http://localhost:3001** (or `PORT` if set).

### 3. Run a client (optional)

**React (port 5173):**

```bash
npm run dev:client
# or: cd client && npm run dev
```

**Backbone (port 5174):**

```bash
cd client-backbone && npm run dev
```

Then open:

- React: [http://localhost:5173](http://localhost:5173)
- Backbone: [http://localhost:5174](http://localhost:5174)

### 4. Production server

```bash
npm run start:server
# or: cd server && npm start
```

**Optional assets:** Place `banner.png` in `client/public/` and `client-backbone/public/` for the sidebar banner.

---

## API

Base URL: `http://localhost:3001` (or your `PORT`).

### POST /api/buy-corn

Purchase one corn. Returns **200** on success, **429** when rate limited.

| Header        | Required | Description                                              |
|---------------|----------|----------------------------------------------------------|
| `X-Client-Id` | No       | Client identifier for rate limiting. If omitted, uses IP. |

**Success (200):**

```json
{ "corn": "🌽", "message": "Corn purchased successfully!" }
```

**Rate limited (429):**

Response includes header: `Retry-After: <seconds>`.

```json
{
  "error": "Too Many Requests",
  "message": "Bob's fair policy: at most 1 corn per client per minute. Please wait before buying again.",
  "retryAfterSeconds": 45
}
```

### GET /api/health

Health check.

**Response (200):**

```json
{ "status": "ok", "farm": "Bob's Corn" }
```

---

## Architecture

- **Rate limiting:** In-memory `Map`: client ID → last successful purchase timestamp. Sliding 60s window.
- **Client ID:** Frontends generate a UUID, store it in `localStorage`, and send it in `X-Client-Id`. Server falls back to IP if missing.
- **Corn count:** Stored in the browser (`localStorage`) for persistence across sessions; not stored on the server.

---

## Frontend structure

### React (`client/`)

```
src/
├── components/   # UI only (Header, CornCounter, BuyCornButton, ClientIdBadge, etc.)
├── hooks/        # State and side effects (useCornCount, useBuyCorn)
├── services/     # HTTP (api.ts)
├── types/        # TypeScript types (BuyCornResult, BuyStatus, etc.)
└── App.jsx       # Composition
```

### Backbone (`client-backbone/`)

```
src/
├── views/        # UI (HeaderView, CornCounterView, BuyCornButtonView, ClientIdBadgeView, etc.)
├── models/       # State (CornBasketModel, BuyStateModel)
├── services/     # HTTP (api.js)
├── types/        # JSDoc types (BuyCornResult, BuyStatus, etc.)
└── main.js       # Bootstrap
```

## Screen shots

### Desktop

<img width="1880" height="905" alt="image" src="https://github.com/user-attachments/assets/a4dbe701-60d1-4154-b1de-6653ae75e829" />


### Mobile

<img width="372" height="808" alt="image" src="https://github.com/user-attachments/assets/2a9a3fef-2396-42e9-8f43-4ba9a59e26ad" />

