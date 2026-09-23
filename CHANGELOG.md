# Changelog

## v56 — 2026-09-23 — Measured diagnostics loop
- Added an automated real-browser runtime gate using Chrome DevTools Protocol with no extra runtime dependency.
- Runtime gate checks 320/360/412/768 px for overflow, header/GO/nav overlap, touch target, version badge, navigation, language/theme toggles and GO→STOP events.
- Runtime gate captures current-build screenshots and a JSON evidence report as a GitHub artifact.
- Changed the live download trace to interval-throughput samples instead of cumulative-average samples.
- Added deterministic throughput statistics: sample count, min/max and coefficient-of-variation percentage.
- Added measured diagnostic flags with explicit Zipspeed thresholds.
- Added per-use-case failure reasons using the actual measured value and threshold.
- Reset health/diagnostic output while a new test is running to avoid showing stale current-test results.
- Added unit tests and audit guards for the diagnostics model.


## v55 — 2026-09-23 — Maximum product upgrade
- Added Zipspeed Health Index based only on measured HTTP metrics with a documented deterministic formula.
- Added browsing/video-call/gaming/4K suitability with explicit thresholds.
- Added verified endpoint registry architecture without invented region/city/coordinates.
- Added Health/Use-case UI and TH/EN text.
- Added unit tests for health formula, suitability and server-location truthfulness.
- Locked X = Truth, Y = Experience, Z = Proof competitive rules into project source of truth.


## v54 — 2026-09-23 — Visual depth + anti-overlap
- Reworked the speed instrument overlay into explicit grid rows so live value and GO/STOP cannot occupy the same layout slot.
- Added layered instrument depth surfaces, restrained shadows and material highlights without changing measurement logic.
- Added narrow-phone fallbacks for header, metrics, status/settings rows and history items.
- Added bottom-navigation/toast safe spacing and page scroll padding.
- Removed the stale runtime clay-card class.
- Added static audit guards for anti-overlap structure.
- Benchmarked current product principles against Speedtest, Opensignal, FAST and Meteor without copying UI/assets.


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
