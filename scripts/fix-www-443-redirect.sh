#!/usr/bin/env bash
# fix-www-443-redirect.sh
# Removes the :443 port from the www.kineticrecruiter.com -> kineticrecruiter.com redirect
# in the kineticrecruiter-urlmap URL map.
#
# Usage:
#   chmod +x scripts/fix-www-443-redirect.sh
#   ./scripts/fix-www-443-redirect.sh           # dry run — shows diff, no changes
#   ./scripts/fix-www-443-redirect.sh --apply   # writes the change to GCP and verifies
#
# Requires: gcloud authenticated to the correct project.

set -euo pipefail

URLMAP="kineticrecruiter-urlmap"
WORKDIR="${TMPDIR:-/tmp}/kr-urlmap-fix"
BEFORE="$WORKDIR/before.yaml"
AFTER="$WORKDIR/after.yaml"

mkdir -p "$WORKDIR"

echo "==> Exporting current URL map: $URLMAP (global)"
gcloud compute url-maps export "$URLMAP" \
  --global \
  --destination="$BEFORE"

echo "==> Looking for :443 occurrences..."
if ! grep -nE ':443' "$BEFORE"; then
  echo "No ':443' found in $URLMAP. Nothing to fix."
  exit 0
fi

echo
echo "==> Generating fixed version..."
# Strip :443 from hostRedirect values and any explicit host:443 strings.
# This is deliberately narrow: only removes :443 following a hostname, not inside URL paths.
sed -E 's/(hostRedirect:[[:space:]]*[A-Za-z0-9._-]+):443/\1/g; s/(kineticrecruiter\.com):443/\1/g' "$BEFORE" > "$AFTER"

echo "==> Diff (before -> after):"
diff -u "$BEFORE" "$AFTER" || true

if [[ "${1:-}" != "--apply" ]]; then
  echo
  echo "Dry run only. Re-run with --apply to push the change."
  echo "Inspect the files directly:"
  echo "  before: $BEFORE"
  echo "  after:  $AFTER"
  exit 0
fi

echo
echo "==> Importing fixed URL map to $URLMAP..."
gcloud compute url-maps import "$URLMAP" \
  --source="$AFTER" \
  --global

echo
echo "==> Invalidating CDN cache..."
gcloud compute url-maps invalidate-cdn-cache "$URLMAP" \
  --path="/*" --global

echo
echo "==> Waiting 30s for propagation..."
sleep 30

echo "==> Verifying: curl -sSI https://www.kineticrecruiter.com/ | grep -i location"
curl -sSI https://www.kineticrecruiter.com/ | grep -iE '^(HTTP|location)'

echo
echo "Expected:"
echo "  HTTP/2 301"
echo "  location: https://kineticrecruiter.com/    (NO :443)"
