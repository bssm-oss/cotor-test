#!/bin/sh

set -eu

root_files="$(find . -maxdepth 1 -type f ! -name '.DS_Store' ! -name '.git' -print | sed 's#^\./##' | sort)"

if [ "$root_files" != "README.md
validate-placeholder-repo.sh" ]; then
  echo "Unexpected repository root files:"
  printf '%s\n' "$root_files"
  exit 1
fi

grep -q "placeholder-only repository" README.md

echo "Validated placeholder-only repository state."
