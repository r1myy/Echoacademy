#!/usr/bin/env bash
# Builds the site and publishes dist/public to the `deploy` branch,
# which Hostinger's Git deployment pulls from.
set -euo pipefail

cd "$(dirname "$0")/.."
REPO_ROOT="$(pwd)"
WORKTREE_DIR="/tmp/echo-academy-deploy-wt"

npm run build

rm -rf "$WORKTREE_DIR"
git worktree add --detach "$WORKTREE_DIR" >/dev/null

cd "$WORKTREE_DIR"
if git show-ref --verify --quiet refs/remotes/origin/deploy; then
  git checkout -B deploy origin/deploy
else
  git checkout --orphan deploy
fi
git rm -rf . >/dev/null 2>&1 || true

cp -R "$REPO_ROOT/dist/public/." .
rm -f .gitkeep

git add -A
if git diff --cached --quiet; then
  echo "Nothing changed, skipping deploy commit."
else
  git commit -q -m "deploy: static build from main@$(git -C "$REPO_ROOT" rev-parse --short HEAD)"
  git push origin deploy
  echo "Pushed to origin/deploy."
fi

cd "$REPO_ROOT"
git worktree remove "$WORKTREE_DIR" --force
