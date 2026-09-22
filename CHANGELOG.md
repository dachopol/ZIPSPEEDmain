# Changelog

## v45 — 2026-09-22
- Minimal 3D white-clay UI with soft shadows and #3B82F6 accent.
- One GO/STOP primary control; duplicate START TEST removed.
- Added truthful Status, Map-safe, and Settings panels with TH/EN copy.
- No fake coordinates or random network metrics.
- Hardened Android WebView and disabled app backup.
- Synchronized app/web version to 45.0.0 / versionCode 45.


## v43 — 2026-09-22

### Version update
- Public app version changed to **Zipspeed v43**.
- Package/metadata semantic version changed to **43.0.0** so npm tooling remains valid.
- Measurement logic and v3.1.0 fixes are retained unchanged.

## 3.1.0 — 2026-09-22

### Critical fixes
- Removed deterministic demo results (1000/500 Mbps, 12.4 ms, 1.2 ms and sample metadata) from the production flow.
- Replaced animation-only speed sweep with measured HTTP latency/download/upload.
- Fixed duplicate `let isTestRunning` declaration that caused module parse failure.
- Removed duplicate inline + JavaScript touch/click start handlers that could trigger the control twice.
- Added missing root `src/measurement.mjs`, fixing the broken root import.
- Replaced header-based metadata assumptions with parsing of Cloudflare `/meta` JSON.
- Stopped treating client city/country as server location; only edge `colo` is shown in the server/edge field.
- Removed incorrect RFC 1889/3550 jitter claim; UI now calls it an HTTP-latency jitter indicator.

### Project/build fixes
- Updated package version from 3.0.1 to 3.1.0.
- Added `build.mjs`, unit tests and `audit.mjs`.
- Removed unused/misleading Android Gradle files and `.gradle` cache from the web package.
- Removed unused Gemini/geolocation capability declarations.
- Added static-server security headers and limited local server methods to GET/HEAD/OPTIONS.
- Kept root and `app/applet` app copies synchronized.
