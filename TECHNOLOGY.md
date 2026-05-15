# Technology choices

This document explains **architecture**, **stack**, and **tradeoffs** for this assessment-sized Scrum Poker app.

For **how to install and run** the project, see [README.md](README.md).

## Stack overview

- **Frontend:** Next.js (App Router), React, TypeScript, Apollo Client, Tailwind CSS  
- **Backend:** Node.js, Express, Apollo Server, GraphQL, TypeScript  
- **Data:** in-memory only (no database)  
- **Live updates:** GraphQL queries + polling

## Architecture

```mermaid
flowchart LR
  subgraph client [Next Frontend]
    Apollo[ApolloClient]
    Pages[AppRouterPages]
  end
  subgraph server [Express Backend]
    GW["/graphql"]
    Resolvers[sessionResolvers]
    Service[sessionService]
    Store[inMemorySessions]
  end
  Pages --> Apollo
  Apollo -->|"HTTP POST"| GW
  GW --> Resolvers
  Resolvers --> Service
  Service --> Store
```



### Domain and layout

- **Domain:** `Session` has `id`, `hostId`, `revealed`, `players[]`; each `Player` has `id`, `name`, optional `vote`.
- **Backend:** `[backend/src/index.ts](backend/src/index.ts)` wires Express + Apollo; schema SDL lives inline in `[backend/src/schema/typeDefs.ts](backend/src/schema/typeDefs.ts)`; thin resolvers in `[backend/src/schema/sessionResolvers.ts](backend/src/schema/sessionResolvers.ts)`; application logic in `[backend/src/services/sessionService.ts](backend/src/services/sessionService.ts)`; guards in `[backend/src/store/sessionGuards.ts](backend/src/store/sessionGuards.ts)`; store in `[backend/src/store/sessions.ts](backend/src/store/sessions.ts)`.
- **Frontend:** `[frontend/src/providers/AppProviders.tsx](frontend/src/providers/AppProviders.tsx)` composes locale + Apollo Client for the tree; operations in `[frontend/src/graphql/](frontend/src/graphql/)`; session UI under `[frontend/src/components/session/](frontend/src/components/session/)` with `pollInterval: 2000` on the session query; content in `[frontend/src/i18n/locales/](frontend/src/i18n/locales/)`.

### Apollo Provider

`ApolloProvider` comes from `@apollo/client`. It puts a single **Apollo Client** instance into React context so any nested component can call `useQuery`, `useMutation`, etc. That client owns the GraphQL **cache**, **network layer**, **polling**, and **loading/error** state—without prop-drilling a client instance through the tree. It is composed together with `**I18nProvider`** in `[AppProviders.tsx](frontend/src/providers/AppProviders.tsx)`.

### GraphQL schema location

The schema is a `**#graphql` string** in `[typeDefs.ts](backend/src/schema/typeDefs.ts)` next to Apollo bootstrap—no separate `.graphql` file or copy step in `npm run build`, to keep deployment simple for a small repo.

### CORS (`FRONTEND_ORIGIN`)

Environment variables are a single string; the `[cors](https://github.com/expressjs/cors)` package expects `origin` as a string or **array** of allowed origins. We `**split` on commas** so one value works (`http://localhost:3000` → one-element array), and you can allow multiple origins (e.g. localhost + LAN URL).

### IDs

- **Session (room) codes:** short 6-character alphanumeric strings (easy to share).  
- **Player IDs:** UUIDs, distinct from room codes.

### Docker

[`docker-compose.yml`](docker-compose.yml) builds both images with repository root as [`docker build context`](https://docs.docker.com/build/building/context) so [`tsconfig.base.json`](tsconfig.base.json) is available to [`backend/tsconfig.json`](backend/tsconfig.json) and [`frontend/tsconfig.json`](frontend/tsconfig.json)

- **Backend:** [`backend/Dockerfile`](backend/Dockerfile) — `npm ci`, TypeScript compile to `dist/`, then `npm prune --omit=dev`; listens on **4000**.
- **Frontend:** [`frontend/Dockerfile`](frontend/Dockerfile) — follows the **multi-stage layout from the Next.js Docker docs** (deps → build with standalone → non-root `node` runner).

**Why `NEXT_PUBLIC_GRAPHQL_URL` uses `http://localhost:4000/graphql`:** GraphQL runs in the **browser**. It must use an URL reachable from the client machine—typically the host-published API port—not the internal Compose hostname (`backend`).

## Design decisions and tradeoffs

| Decision                               | Why                                                                                                                          |
| -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| **In-memory store**                    | Faster to build. Data is lost on restart, no migrations or DB.                                                               |
| **Polling instead of websocket**       | Simpler operations and debugging. No time to implement websocket + subscriptions.                                            |
| **No auth**                            | Out of scope. Not required for small planning poker application.                                                             |
| **Short session codes + UUID players** | Room id stays easy to share; each player gets a UUID so they are not confused with game codes and collisions are negligible. |
| **Vote secrecy**                       | The UI hides values until reveal, the wire payload still includes votes (no field-level redaction).                          |

## What would improve with more time

- Subscriptions or server sent events for instant updates instead of 2s polling  
- Server-side masking of `vote` until reveal + explicit `hasVoted` in schema  
- Persistence (Redis/Postgres) and basic reconnect/session recovery  
- Rate limits, richer validation, structured GraphQL errors  
- Production-hardened Docker (healthchecks, non-root users, image scanning)  
- Better error handling  
- Authentication  
