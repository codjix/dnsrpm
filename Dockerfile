# database stage
FROM node:22.8.0-alpine3.20 AS deps

WORKDIR /app-ci
COPY package.json .
RUN npm i
COPY . .

RUN \
  npm run db:generate && \
  npm run db:migrate 

# build stage
FROM oven/bun:1.1.27-alpine AS builder
COPY --from=deps --chown=1001:1001 /app-ci /app-ci
COPY ./src/utils/unpack.sh /app-dist/
WORKDIR /app-ci

RUN apk add xz
RUN \
  bun --bun run bundle && \
  mv .next/standalone /app && \
  mv .next/static /app/.next && \
  mv data /app && chmod 777 /app-dist/unpack.sh && \
  tar cv /app | xz -f9 -T0 > /app-dist/app.tar.xz

# production stage
FROM cto4/aio:1.1.27-bun
WORKDIR /app-ci
COPY --from=builder /app-dist /app-dist

ENV PORT=8000
EXPOSE 8000

CMD [ "sh", "/app-dist/unpack.sh", "bun", "--bun", "/app/server.js" ]