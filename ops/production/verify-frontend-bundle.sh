#!/usr/bin/env bash

# Pull-it production static bundle is served only below /pull-it/.
# Fail before an artifact can reach the dedicated production host if the
# build unexpectedly reintroduces the retired public origins or root assets.

set -euo pipefail

readonly BUNDLE_DIRECTORY="${1:?The static bundle directory is required.}"
readonly INDEX_FILE="${BUNDLE_DIRECTORY}/index.html"

if [ ! -f "${INDEX_FILE}" ]; then
  echo 'Pull-it frontend bundle does not contain index.html.' >&2
  exit 1
fi

if ! grep --fixed-strings --quiet '/pull-it/assets/' "${INDEX_FILE}"; then
  echo 'Pull-it frontend index does not reference assets below /pull-it/.' >&2
  exit 1
fi

if rg --files-with-matches \
  --glob '*.html' \
  --glob '*.js' \
  --glob '*.css' \
  "https?://(qa\\.)?api\\.pull\\.it\\.kr|https?://pull\\.it\\.kr|[\\\"']/(?:assets|src)/" \
  "${BUNDLE_DIRECTORY}" >/dev/null; then
  echo 'Pull-it frontend bundle contains a retired origin or root asset path.' >&2
  exit 1
fi
