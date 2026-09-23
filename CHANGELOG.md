# Changelog

## v61 — 2026-09-23 — Load impact + IP version
- Added measured load-latency delta: loaded HTTP latency minus idle HTTP latency.
- Added Low/Moderate/High Zipspeed load-impact bands with explicit product thresholds; not a universal standard.
- Added load-impact diagnostic flag when measured delta exceeds 50 ms.
- Added IPv4/IPv6 display derived only from provider-returned client IP metadata.
- Added share/CSV provenance for loaded-latency delta.
- Added unit, browser-runtime and real-network evidence checks.


## v60 — 2026-09-23 — History intelligence + CSV export
- Added latest-vs-previous comparison restricted to the same test profile and connection mode.
- Added deterministic download/upload percentage change and latency delta.
- Added CSV export for completed local history with correct CSV escaping.
- Added TH/EN comparison UI and responsive layout.
- Added unit tests plus browser runtime proof with seeded local-only history.


## v59 — 2026-09-23 — Privacy transparency + release evidence
- Added visible TH/EN Privacy & Data facts derived from current source behavior.
- Clarified that measurement traffic reaches the listed provider and that client IP/ISP metadata are not written into Zipspeed local history.
- Clarified current Android permission scope and the absence of Ads/Billing SDKs in this build.
- Added `release-check.mjs` to fail CI when permissions or commerce SDKs drift from the current declarations.
- Added a release-evidence JSON artifact with package/version, permissions, endpoint and current verification gaps.
- Browser runtime now verifies the Privacy panel on responsive widths.


## v58 — 2026-09-23 — Loaded latency + real-network proof
- Added optional HTTP latency probes that begin while download transfer is active; unavailable samples remain unknown rather than fabricated.
- Results now record loaded HTTP latency and sample count when measurable.
- Added a fourth measured-diagnostics field for loaded HTTP latency with TH/EN labels.
- Added a real-network CI smoke run for Quick Single and Multi modes using the actual measurement endpoint.
- Real-network smoke requires completed saved results with finite download/upload/latency/jitter/probe-fail values and correct connection-mode provenance.


## v57 — 2026-09-23 — Single/Multi connection measurement
- Added explicit Single (1 stream) and Multi (4 streams) throughput modes.
- Multi mode divides the existing profile byte budget across streams; total planned payload bytes remain unchanged.
- Download aggregates real bytes across concurrent fetch streams using one monotonic elapsed interval.
- Upload aggregates real bytes across concurrent XHR streams and STOP aborts all active streams.
- Saved results/history/share output now records connection mode and stream count.
- Added TH/EN Settings control, transfer-plan unit tests, audit checks and browser-runtime toggle proof.


## v56 — 2026-09-23 — Measured diagnostics loop
- Added an automated real-browser runtime gate using Chrome DevTools Protocol with no extra runtime dependency.
- Hardened the runtime gate with module-readiness polling, captured Chrome runtime/console errors and explicit Node syntax checks.
- Fixed CSP to allow same-origin package/version metadata while retaining the explicit external measurement endpoint.
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
