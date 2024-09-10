FROM node:22.8.0-alpine3.20 AS deps

WORKDIR /app-ci
COPY package.json .
RUN npm i
COPY . .

RUN \
  npm run db:generate && \
  npm run db:migrate

FROM oven/bun:1.1.27-alpine AS builder
COPY --from=deps --chown=1001:1001 /app-ci /app-ci
COPY ./src/utils/entrypoint.sh /app-dist/
WORKDIR /app-ci

RUN apk add xz
RUN \
  bun --bun run bundle && \
  mv .next/standalone /app && \
  mv .next/static /app/.next && \
  mv data /app && chmod 777 /app-dist/entrypoint.sh && \
  tar cv /app | xz -f9 -T0 > /app-dist/app.tar.xz && \
  cd /usr/local/bin && tar cv bun | xz -f9 -T0 > /app-dist/bun.tar.xz && \
  mkdir /app-dist/apk && cd /app-dist/apk && \
  wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r1/glibc-2.35-r1.apk && \
  wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r1/glibc-bin-2.35-r1.apk

FROM alpine:3.20
WORKDIR /app-ci
COPY --from=builder /app-dist /app-ci

RUN apk --no-cache --force-overwrite --allow-untrusted add /app-ci/apk/*.apk
ENV PORT=8000
EXPOSE 8000

# CMD ["/usr/local/bin/bun", "--bun", "/app/server.js"]

CMD [ "sh" ]