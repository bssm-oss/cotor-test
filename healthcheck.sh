#!/usr/bin/env sh
set -eu

if [ ! -e .git ]; then
  echo "healthcheck: not in repository root" >&2
  exit 1
fi

echo "healthcheck: repository bootstrap is present"
echo "healthcheck: no application files are tracked on this branch yet"
