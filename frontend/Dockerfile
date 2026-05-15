# Build context is the repository root (see docker-compose.yml).
# Patterns align with Next.js Docker docs: https://nextjs.org/docs/app/building-your-application/deploying#docker-image
# Adapted because we cannot use `COPY . .` from ./frontend only — shared tsconfig.base.json lives at repo root.

ARG NODE_VERSION=22-bookworm-slim

# ============================================
# Stage 1: dependencies (reproducible lockfile install)
# ============================================
FROM node:${NODE_VERSION} AS dependencies

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./

RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund

# ============================================
# Stage 2: build (standalone output)
# ============================================
FROM node:${NODE_VERSION} AS builder

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
COPY tsconfig.base.json /tsconfig.base.json
COPY frontend/tsconfig.json ./
COPY frontend/next.config.ts ./
COPY frontend/postcss.config.js ./
COPY frontend/tailwind.config.js ./
COPY frontend/next-env.d.ts ./
COPY frontend/src ./src
COPY frontend/public ./public

COPY --from=dependencies /app/node_modules ./node_modules

ARG NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
ENV NEXT_PUBLIC_GRAPHQL_URL=$NEXT_PUBLIC_GRAPHQL_URL
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN --mount=type=cache,target=/app/.next/cache \
  npm run build

# ============================================
# Stage 3: run (minimal standalone runtime)
# ============================================
FROM node:${NODE_VERSION} AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

COPY --from=builder --chown=node:node /app/public ./public

RUN mkdir .next && chown node:node .next

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static

USER node

EXPOSE 3000

CMD ["node", "server.js"]
