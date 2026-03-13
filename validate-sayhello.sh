#!/bin/sh
set -eu

tracked_files="$(git ls-files)"

if [ -z "$tracked_files" ]; then
  cat <<'EOF'
sayhello validation: blocked
reason: this branch has no tracked repository files, so there is no sayhello implementation or test surface to re-run.
residual_risk: sayhello remains unverified on this branch and may still be missing, broken, or different from the base branch.
EOF
  exit 0
fi

if matches="$(git grep -n "sayhello")"; then
  cat <<EOF
sayhello validation: follow-up required
reason: sayhello references exist on this branch, but this follow-up does not add a product-specific test runner.
residual_risk: runtime behavior is still unverified until the matching implementation-specific command is executed.
matches:
$matches
EOF
else
  cat <<'EOF'
sayhello validation: blocked
reason: no sayhello references were found in tracked files on this branch.
residual_risk: sayhello remains unverified on this branch and may still exist only outside version control or on another branch.
EOF
fi
