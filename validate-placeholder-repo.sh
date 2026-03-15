#!/bin/sh

set -eu

tracked_files="$(git ls-files | sort)"

if [ "$tracked_files" != "README.md
validate-placeholder-repo.sh" ]; then
  echo "Unexpected tracked repository files:"
  printf '%s\n' "$tracked_files"
  exit 1
fi

grep -q "placeholder-only repository" README.md

echo "Validated placeholder-only repository state."
