#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if ! command -v brew >/dev/null 2>&1; then
  echo "Homebrew is required to manage the local Jekyll toolchain." >&2
  exit 1
fi

RUBY_PREFIX="$(brew --prefix ruby@3.2 2>/dev/null || true)"
if [[ -z "$RUBY_PREFIX" || ! -x "$RUBY_PREFIX/bin/ruby" ]]; then
  echo "ruby@3.2 is not installed. Run: brew install ruby@3.2" >&2
  exit 1
fi

export PATH="$RUBY_PREFIX/bin:$PATH"
export BUNDLE_PATH="${BUNDLE_PATH:-local/bundle}"
export BUNDLE_DISABLE_VERSION_CHECK=1
