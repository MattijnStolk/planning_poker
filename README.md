# Scrum Poker

Minimal full-stack planning poker (Next.js + Apollo Client, Express + Apollo Server + GraphQL).

For **architecture, stack, and tradeoffs**, see [TECHNOLOGY.md](TECHNOLOGY.md).

## Prerequisites

- Node.js 20+ (LTS recommended)
- npm
- **Docker / Compose** — optional; needed only for [Docker Compose](#docker-compose) below.

## Setup

From the repository root:

```bash
npm run install:all
```

Or install each package separately:

```bash
cd backend && npm install
cd ../frontend && npm install
```

### Environment

**Frontend** — optional; defaults to local GraphQL:

- `NEXT_PUBLIC_GRAPHQL_URL` — GraphQL HTTP endpoint (default: `http://localhost:4000/graphql`)

Create `frontend/.env.local` if the API is not on the default URL:

```bash
echo 'NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql' > frontend/.env.local
```

**Backend** — optional:

- `PORT` — server port (default: `4000`)
- `FRONTEND_ORIGIN` — Allowed browser origins for `/graphql` (single URL, or comma-separated list). Default if unset: `http://localhost:3000`.

## Run (development)

From the **repo root** (after `npm install` at root so `concurrently` is available):

```bash
npm run dev
```

That starts the API and Next.js together (`tsx watch` + `next dev`).

Alternatively, **two terminals**:

```bash
npm run dev:backend    # GraphQL dev server
npm run dev:frontend   # Next.js dev server
```

Or install each package separately and run inside `backend/` / `frontend/` as usual.

- App: [http://localhost:3000](http://localhost:3000)
- GraphQL: [http://localhost:4000/graphql](http://localhost:4000/graphql)

## Using the app

1. **Create session** — enter your name; you are redirected to `/session/[id]?playerId=[hostId]` (host).
2. **Join session** — another browser/profile: enter name + session id from the host’s URL.
3. **Vote** — pick a card (`1`, `2`, `3`, `5`, `8`, `13`, `?`). Until everyone has voted, the UI shows only **Voted / Waiting**, not values.
4. **Auto reveal** — when **every** player has voted, results show automatically (backend sets `revealed = true`).
5. **Next guess** — the **host** can reset the round: votes clear, `revealed` goes false; players stay in the same session.

### Language

Use **EN / NL** in the top-right toggle. Choice is stored in localStorage.

## Scripts (repo root)

| Script | Purpose |
|--------|---------|
| `npm run install:all` | Install root, backend, and frontend dependencies |
| `npm run dev` | Dev: API + Next.js together (`concurrently`) |
| `npm run dev:backend` | Backend dev server only |
| `npm run dev:frontend` | Next.js dev server only |
| `npm run build` | Production build for **both** backend and frontend |
| `npm run build:backend` | Compile backend TypeScript (`backend/dist/`) |
| `npm run build:frontend` | Next.js production build (`frontend/.next/`) |
| `npm run start` | Production: compiled API + `next start` together (`concurrently`) |
| `npm run start:backend` | Compiled API only (`node backend/dist/index.js`) |
| `npm run start:frontend` | Next production server only (`next start` in `frontend/`) |

## Production

### Local Node

Build both apps from the repo root:

```bash
npm run build
```

Run in **two terminals**:

```bash
npm run start:backend   # GraphQL → http://localhost:4000/graphql
npm run start:frontend  # App → http://localhost:3000
```

Or **one terminal**:

```bash
npm run start
```

With `npm run start`, both processes share the same environment variables, so you cannot assign **different** `PORT` values to API vs Next in one shot—use **two terminals** with `start:backend` / `start:frontend` if you need custom ports for each.

**Ports:** backend uses `PORT` (default `4000`). Next uses `PORT` for its HTTP server (default `3000`). Example (two terminals):

```bash
PORT=4001 npm run start:backend
PORT=3001 npm run start:frontend
```

If you change the app origin or port, set `FRONTEND_ORIGIN` to **exactly** that origin string (scheme + host + port). Example for Next on port **3001**:

```bash
FRONTEND_ORIGIN=http://localhost:3001 npm run start:backend
```

**Frontend GraphQL URL:** `NEXT_PUBLIC_GRAPHQL_URL` is inlined at **next build** time. Set it before building if the API is not at `http://localhost:4000/graphql`:

```bash
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql npm run build:frontend
```

### Docker Compose

Requires [Docker](https://docs.docker.com/get-docker/) with Compose v2.

From the repository root:

```bash
docker compose up --build
```

- App: [http://localhost:3000](http://localhost:3000)
- GraphQL: [http://localhost:4000/graphql](http://localhost:4000/graphql)

Images use [`backend/Dockerfile`](backend/Dockerfile) and [`frontend/Dockerfile`](frontend/Dockerfile); [`docker-compose.yml`](docker-compose.yml) wires ports **4000** / **3000**, sets `FRONTEND_ORIGIN`, and passes **`NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql`** into the frontend **build** (the browser calls the API via your machine’s localhost, not the Compose service DNS name).

If you publish different host ports or deploy behind another URL, change **`NEXT_PUBLIC_GRAPHQL_URL`** and **`FRONTEND_ORIGIN`** (see [`docker-compose.yml`](docker-compose.yml)) and rebuild the frontend image.

Implementation notes for Docker live in [TECHNOLOGY.md](TECHNOLOGY.md) under **Docker**.
