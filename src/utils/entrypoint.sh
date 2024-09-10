#!/bin/sh

if [ -f /app-ci/app.tar.xz ]; then 
  tar xf /app-ci/app.tar.xz -C /
  tar xf /app-ci/bun.tar.xz -C /app-ci
  rm -rf /app-ci/*.tar.xz
fi

exec $@