# Zipspeed by AnakinYoo — v44

AI Studio / browser speed-test app rebuilt to follow the project MASTER APP BUILD RULES.

## What changed in v43

- Removed fixed/demo speed results from the production test flow.
- GO / STOP now controls real HTTP measurements.
- HTTP latency uses repeated successful 1-byte probes and reports the median.
- Jitter is labelled truthfully as an HTTP-latency jitter indicator (mean absolute difference between adjacent successful samples); it is not claimed as ICMP jitter.
- Download uses actual bytes received from `https://speed.cloudflare.com/__down` and measured elapsed time.
- Upload uses actual bytes sent to `https://speed.cloudflare.com/__up` and measured upload time.
- Incomplete or failed test runs are not saved to history.
- Metadata comes from `https://speed.cloudflare.com/meta`; edge `colo` is kept separate from client metadata.
- Removed unused Gemini API/geolocation capability declarations.
- Removed misleading Android/Gradle bootstrap files from this web-only package.
- Added build, test, and anti-fake audit scripts.
- Fixed duplicate `isTestRunning` declaration and duplicate touch/click execution paths.
- Added the missing root `src/measurement.mjs` so the root app can actually load its measurement module.

## Run locally

Requirements: Node.js 18+.

```bash
npm start
```

Open the printed local address (default `http://localhost:3000`).

## Validate

```bash
npm run check
```

This runs:
1. anti-fake/source-integrity audit;
2. unit tests for measurement helpers;
3. static build into `dist/`.

## Measurement model

- HTTP latency: repeated GET requests to Cloudflare `__down?bytes=1`.
- HTTP jitter indicator: mean absolute difference between adjacent successful HTTP-latency samples.
- Download: 10 MiB requested and counted from the response body.
- Upload: 5 MiB POST body; browser upload progress is used for live feedback and actual body size/time for final Mbps.
- HTTP probe failure rate is **not packet loss**.
- Streaming suitability is only an estimate derived from the measured HTTP download result.

## Data use

A complete default run transfers approximately 10 MiB down + 5 MiB up, plus small latency/metadata requests and protocol overhead. Mobile data users should be aware of this before running repeated tests.

## Not claimed

- No ICMP ping or packet-loss measurement.
- No multi-server selection in this package.
- No fake outage/server-location/ISP values.
- No AdMob, billing, or paid entitlement simulation.
- Browser/AI Studio execution still requires real-device/network validation before production claims.

## AI Studio structure

The same app is mirrored at `app/applet/` for AI Studio compatibility. Root and applet copies are kept synchronized by the build/audit workflow.
