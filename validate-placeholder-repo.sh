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
grep -q "Review status for this branch: unblocked by documentation." README.md
grep -q "Implementation status: no backend code exists in this repository snapshot." README.md
grep -q "Trigger issue: \`Review completed implementation work\`" README.md
grep -q "Validation evidence: \`./validate-placeholder-repo.sh\` verifies the tracked file" README.md

echo "Validated placeholder-only repository state."
