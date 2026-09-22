# Zipspeed v43 Fix Report

## Source reviewed
Uploaded `zipspeed(5).zip`.

## Defects found in the uploaded version

1. Production test flow displayed fixed/demo metrics while UI claimed there were no fabricated measurements.
2. `let isTestRunning` was declared twice in the same ES module, causing a JavaScript syntax error.
3. GO/START controls had both inline touch/click handlers and additional listeners, creating duplicate activation risk.
4. Root `index.html` imported `./src/measurement.mjs`, but the root `src/` file did not exist.
5. `package.json` referenced `build.mjs`, but that file did not exist.
6. README described an Android project and Gemini API key setup although the uploaded package is a browser/Node static app.
7. `metadata.json` requested geolocation and server-side Gemini capability even though the current app does not use them.
8. Metadata helper treated city/country values as server-location data; v43 keeps edge colo and client-area concepts separate.
9. Jitter text claimed RFC 1889/3550 semantics while the implementation was a simpler mean absolute difference of HTTP-latency samples.
10. `.gradle` cache and Gradle bootstrap files were unrelated to the actual web runtime.

## v43 validation performed

- `npm run audit`: PASS
- Node unit tests: 5/5 PASS
- `npm run build`: PASS
- Extracted browser ES-module syntax: PASS (`node --check`)
- Local server `/health`: PASS
- Local server `/index.html`: HTTP 200
- Local server `/src/measurement.mjs`: HTTP 200

## Still requires real-browser/device verification

- Cloudflare CORS/network behavior in the actual AI Studio-hosted browser environment.
- Accuracy comparison across Wi-Fi and mobile networks.
- STOP behavior during active upload/download on Android/iOS browsers.
- Small-screen, large-font and orientation testing.
- Production provider/terms/privacy review before public release.

No production-ready claim is made until those checks are completed.

## External endpoint verification note
The generation container could not resolve `speed.cloudflare.com`, so a direct curl smoke test from this container was not possible. Endpoint names were instead cross-checked against Cloudflare's current public `cloudflare/speedtest` repository. This does **not** replace testing from the actual browser/device environment.
