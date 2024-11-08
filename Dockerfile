# deps & database setup
FROM node:21.7.3-alpine3.20 AS builder
WORKDIR /app-ci
COPY package.json .
RUN npx pnpm -- i
COPY . .
RUN apk add xz && npm run db:prepare
RUN \
  npm run bundle && \
  mv .next/standalone /app && \
  mv .next/static /app/.next && \
  mv data /app && \
  mv ./docker /app-dist && \
  chmod 777 /app-dist/*.sh && \
  tar cv /app | xz -f9 -T0 > /app-dist/app.tar.xz

# production image
FROM cto4/aio:21.7.3-node
WORKDIR /app
COPY --from=builder /app-dist /app-dist
RUN apk add --no-cache openrc dnsmasq nginx
RUN rc-status -s && touch /run/openrc/softlevel
ENV DATA_DIR="/app/data"
ENV HOSTNAME="0.0.0.0"
ENV NODE_ENV="production"
ENV PORT=8000

EXPOSE 80 443 8000 53 53/udp
# VOLUME ["/sys/fs/cgroup"]
CMD [ "sh", "/app-dist/entrypoint.sh" ]