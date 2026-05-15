# Build context is the repository root (see docker-compose.yml).

ARG NODE_VERSION=22-bookworm-slim
FROM node:${NODE_VERSION}

WORKDIR /app

COPY tsconfig.base.json /tsconfig.base.json
COPY backend/package.json backend/package-lock.json ./
COPY backend/tsconfig.json ./tsconfig.json
COPY backend/src ./src

RUN --mount=type=cache,target=/root/.npm \
  npm ci --no-audit --no-fund \
  && npm run build \
  && npm prune --omit=dev

ENV NODE_ENV=production
EXPOSE 4000

CMD ["node", "dist/index.js"]
