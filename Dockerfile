# deps & database setup
FROM node:22.8.0-alpine3.20 AS deps
WORKDIR /app-ci
COPY package.json .
RUN npx pnpm -- i 
COPY . .
RUN npm run db:prepare

# pepare project dist
FROM oven/bun:1.1.27-alpine AS builder
COPY --from=deps /app-ci /app-ci
WORKDIR /app-ci
RUN apk add xz
RUN \
  bun --bun run bundle && \
  mv .next/standalone /app && \
  mv .next/static /app/.next && \
  cp -r ./docker /app-dist && \
  mv data /app && chmod 777 /app-dist/*.sh && \
  tar cv /app | xz -f9 -T0 > /app-dist/app.tar.xz

# production image
FROM cto4/aio:1.1.27-bun
WORKDIR /app
COPY --from=builder /app-dist /app-dist
RUN apk add --no-cache openrc dnsmasq nginx
RUN rc-status -s && touch /run/openrc/softlevel
ENV DATA_DIR="/app/data"
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV="production"
ENV PORT=8000

EXPOSE 80 8000 53 53/udp
VOLUME ["/sys/fs/cgroup"]
CMD [ "sh", "/app-dist/entrypoint.sh" ]