# Zipspeed by AnakinYoo

Premium mobile-first internet speed and network-health app using measured HTTP data only.

## Source of truth
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Canonical version/versionCode source: `package.json`
- Preview displays the current version by loading `package.json` at runtime.
- Root web, AI Studio applet, and Android asset sources are mirror-checked in CI.

## Architecture
- `index.html`: semantic UI shell with runtime version badge.
- `src/styles.css`: premium instrument design system.
- `src/app.mjs`: UI/state/network-test orchestration + runtime version loader.
- `src/measurement.mjs`: deterministic measurement/history helpers.
- `server.mjs`: local/AI Studio static server with CSP and safe path handling.
- `app/src/main/.../MainActivity.java`: hardened Android WebView wrapper.

## Real-data scope
- HTTP latency samples and HTTP jitter indicator.
- Download/upload calculated from transferred bytes and monotonic elapsed time.
- Quick: 3 MiB down + 1 MiB up + 3 probes.
- Standard: 10 MiB down + 5 MiB up + 6 probes.
- Provider metadata: client IP, ASN/ISP, edge code and client area.
- Streaming suitability is an estimate from measured download speed, not playback.
- No fake coordinates, packet loss, ads, billing, revenue or server status.

## Version integrity
`package.json` is the only active version source. Gradle and Preview derive their version from it. CI verifies package mirrors and rejects hardcoded version text in the UI.

## Validation
```bash
npm ci
npm run check
```

See `RELEASE_STATUS.md` for release evidence and remaining verification.
