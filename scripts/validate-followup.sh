#!/bin/sh
set -eu

README_FILE="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)/README.md"

grep -q 'Resolved follow-up for `CEO continuous improvement cycle #1 for test`.' "$README_FILE"
grep -q 'Reviewed completed implementation work for this scoped branch.' "$README_FILE"
grep -q 'Added a targeted validation script for the branch outcome.' "$README_FILE"

printf '%s\n' 'follow-up validation passed'
