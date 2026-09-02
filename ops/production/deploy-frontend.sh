#!/usr/bin/env bash

set -euo pipefail

bundle_directory="${1:?The verified static bundle directory is required.}"
revision="${2:?The immutable Git revision is required.}"
compose_file="${PULLIT_FRONTEND_COMPOSE_FILE:-/opt/pullit/frontend/docker-compose.frontend.yml}"
verify_script="${PULLIT_FRONTEND_VERIFY_SCRIPT:-/opt/pullit/frontend/verify-frontend-bundle.sh}"

if ! [[ "$revision" =~ ^[0-9a-f]{40}$ ]]; then
  echo 'Pull-it frontend revision must be a full lowercase Git SHA.' >&2
  exit 1
fi

if [ ! -f "$bundle_directory/index.html" ]; then
  echo 'Pull-it frontend bundle does not contain index.html.' >&2
  exit 1
fi

if [ -x "$verify_script" ]; then
  "$verify_script" "$bundle_directory"
else
  # Older, deliberately restricted dispatchers do not install the helper.
  # Keep the deployment safe without requiring broader root permissions.
  grep --fixed-strings --quiet '/pull-it/assets/' "$bundle_directory/index.html"
  if grep -R -E --include='*.html' --include='*.js' --include='*.css' \
    "https?://(qa\\.)?api\\.pull\\.it\\.kr|https?://pull\\.it\\.kr|[\"']/(assets|src)/" \
    "$bundle_directory" >/dev/null; then
    echo 'Pull-it frontend bundle contains a retired origin or root asset path.' >&2
    exit 1
  fi
fi

frontend_root='/opt/pullit/frontend'
releases_directory="$frontend_root/releases"
release_directory="$releases_directory/$revision"
staging_directory=''

cleanup() {
  if [ -n "$staging_directory" ] && [ -d "$staging_directory" ]; then
    rm -rf "$staging_directory"
  fi
}
trap cleanup EXIT

install -d -m 750 "$releases_directory"

if [ ! -d "$release_directory" ]; then
  staging_directory="$(mktemp -d "$releases_directory/.staging.XXXXXXXX")"
  cp -a "$bundle_directory/." "$staging_directory/"
  test -f "$staging_directory/index.html"
  find "$staging_directory" -type d -exec chmod 755 {} +
  find "$staging_directory" -type f -exec chmod 644 {} +
  mv "$staging_directory" "$release_directory"
  staging_directory=''
fi

previous_release=''
if [ -L "$frontend_root/current" ]; then
  previous_release="$(readlink -f "$frontend_root/current")"
fi

restore_previous_release() {
  if [ -n "$previous_release" ]; then
    ln -sfn "$previous_release" "$frontend_root/.current-rollback"
    mv -Tf "$frontend_root/.current-rollback" "$frontend_root/current"
    docker compose -p pullit-frontend -f "$compose_file" up -d --force-recreate pullit-frontend
  else
    rm -f "$frontend_root/current"
  fi
}

docker network inspect yeon-edge >/dev/null
docker network inspect pullit-portfolio-internal >/dev/null
docker compose -p pullit-frontend -f "$compose_file" config --quiet

ln -sfn "$release_directory" "$frontend_root/.current-next"
mv -Tf "$frontend_root/.current-next" "$frontend_root/current"

if ! docker compose -p pullit-frontend -f "$compose_file" up -d --force-recreate pullit-frontend \
  || ! docker compose -p pullit-frontend -f "$compose_file" exec -T pullit-frontend \
    wget --quiet --spider http://localhost:18081/pull-it/; then
  echo 'Pull-it frontend health check failed; restoring the previous release.' >&2
  restore_previous_release
  exit 1
fi

asset_path="$(grep -oE '/pull-it/assets/[^\"'\'' ]+\.(js|css)' "$release_directory/index.html" | head -n 1 || true)"
if [ -z "$asset_path" ] \
  || ! docker compose -p pullit-frontend -f "$compose_file" exec -T pullit-frontend \
    wget --quiet --spider "http://localhost:18081$asset_path"; then
  echo 'Pull-it frontend asset probe failed; restoring the previous release.' >&2
  restore_previous_release
  exit 1
fi

# 현재 릴리스와 즉시 이전 릴리스를 포함해 최근 3개만 남긴다. 이름은 검증된
# 전체 Git SHA라서 날짜 문자열이나 경로를 지우지 않는다.
mapfile -t stale_releases < <(
  find "$releases_directory" -mindepth 1 -maxdepth 1 -type d -printf '%T@ %f\n' \
    | sort -rn \
    | tail -n +4 \
    | awk '{print $2}'
)
for stale_release in "${stale_releases[@]}"; do
  if [[ "$stale_release" =~ ^[0-9a-f]{40}$ ]]; then
    rm -rf -- "$releases_directory/$stale_release"
  fi
done
