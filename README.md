# Zipspeed by AnakinYoo — v52

Premium mobile-first internet speed and network-health app using measured HTTP data only.

## Source of truth
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Canonical version source: `package.json`
- Root web, AI Studio applet, and Android asset sources are mirror-checked in CI.

## Architecture
- `index.html`: semantic UI shell.
- `src/styles.css`: premium instrument design system.
- `src/app.mjs`: UI/state/network-test orchestration.
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

## v52 quality update
- Single version source in `package.json`; Gradle reads it directly.
- Stable history storage with migration from v50/v51 keys.
- Android lifecycle stops active measurements before WebView pause.
- Dynamic TH/EN labels improved for profile data, probe state, share text and settings.
- Improved wrapping, touch targets and ARIA states.
- Server version drift removed; CSP and path traversal checks added.
- CI runs web audit/tests/build, Android lint + debug APK build, and release AAB compile check.

## Local validation
```bash
npm ci
npm run check
```

## Release status
See `RELEASE_STATUS.md`. Debug APK and unsigned release compile are not proof of Play publication.
