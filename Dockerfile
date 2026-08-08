# syntax=docker/dockerfile:1

# Build stage: install workspace deps with pnpm (directly, no corepack) and
# bundle the API server. Only the api-server artifact is needed at runtime;
# workspace libs (@workspace/db, @workspace/api-zod) are bundled by esbuild.
FROM node:22-slim AS build
ENV PUPPETEER_SKIP_DOWNLOAD=true \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
WORKDIR /app
RUN npm install -g pnpm@11.10.0
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @workspace/api-server run build

# Runtime stage: reuse the built tree (dist/ + node_modules).
FROM node:22-slim AS runtime
ENV NODE_ENV=production
WORKDIR /app
COPY --from=build /app /app
EXPOSE 3000
CMD ["node", "--enable-source-maps", "artifacts/api-server/dist/index.mjs"]
