#!/usr/bin/env bash
set -euo pipefail

root="${1:-.}"

entries=(
  "index.html"
  "package.json"
  "src/main.tsx"
  "src/main.jsx"
  "src/main.ts"
  "src/main.js"
  "app/page.tsx"
  "app/page.jsx"
  "pages/index.tsx"
  "pages/index.jsx"
)

found=()
for entry in "${entries[@]}"; do
  if [ -e "${root}/${entry}" ]; then
    found+=("${entry}")
  fi
done

if [ "${#found[@]}" -eq 0 ]; then
  echo "FAIL: no obvious web entry point found in ${root}"
  exit 1
fi

echo "PASS: found possible web entry points in ${root}"
printf ' - %s\n' "${found[@]}"
