FROM oven/bun:1.1.22-alpine AS builder

COPY . . 
RUN \
  bun i && \
  rm -rf /app && \
  bun run bundle && \
  mv .next/standalone /app && \
  mv .next/static /app/.next

FROM oven/bun:1.1.22-alpine

COPY --from=builder --chown=1001:1001 /app /app

ENV PORT=8000
EXPOSE 8000

CMD ["/usr/local/bin/bun", "/app/server.js"]