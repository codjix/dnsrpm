#!/bin/sh
set -e

if [ -f /app-dist/app.tar.xz ]; then 
  tar xf /app-dist/app.tar.xz -C /
  rm -rf /app-dist/app.tar.xz
fi

exec "$@"