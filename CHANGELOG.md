# Changelog

## v53 — 2026-09-23 — Runtime version sync
- Bumped canonical version to 53.0.0 / versionCode 53 in package.json.
- Added a visible Preview version badge loaded from package.json at runtime.
- Mirrored package.json into AI Studio and Android assets and audit-checks exact equality.
- Removed current-version numbers from active CI naming and active docs where duplication could drift.
- Added audit protection against hardcoded version text in UI.


## v52 — 2026-09-23 — Project-wide quality update
- Made package.json the single version source; Android Gradle reads versionName/versionCode from it.
- Added package-lock.json and reproducible npm ci.
- Added stable history storage and migration from v50/v51 keys.
- Fixed Android lifecycle STOP behavior.
- Improved dynamic TH/EN strings and share output.
- Removed redundant success subtext.
- Improved wrapping, touch targets and ARIA state.
- Hardened server CSP/path resolution.
- Added Android lint and release-bundle compile CI.
- Synchronized current documentation and Play release status.

## v51 — 2026-09-23 — Premium Instrument UI
- Premium instrument gauge, integrated metrics and SVG navigation.

## v50 — 2026-09-23 — Clean Rebuild
- Rebuilt UI/app orchestration and removed legacy simulated controls.
