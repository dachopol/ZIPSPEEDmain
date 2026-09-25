# CHECKPOINT

Project: ZIPSPEED by AnakinYoo
Repository: dachopol/ZIPSPEEDmain
Branch: main
Package: com.aistudio.zipspeed.zskt
Version: 73.0.0
versionCode: 73

## Latest validated source

Validated runtime/source commit: `a346f99ccd07b9e9006bcfe156b8652c227da309`
GitHub Actions: **CI #144 — PASS 10/10**

Passed gates:
- web-check
- web-runtime
- real-network-smoke
- release-source-check
- play-console-test-check
- privacy-url-check
- browser-interaction
- android-debug-build + lint + instrumentation APK compile
- android-release-compile (`bundleRelease` compile)
- android-emulator-runtime (API 34 WebView interaction)

## Fixes validated in this inspection cycle

- Native branding is now wired: launcher/round icon + pre-Android-12 splash fallback + Android 12+ splash resources.
- Web branding now uses source-controlled `web/assets/zipspeed-mark.svg` with deterministic `?v=73` cache revision.
- Stale v72 assertions in runtime smoke and Android instrumentation tests were corrected to v73.
- Exact Canva raster export remains **TO VERIFY**; source currently uses a deterministic vector fallback rather than claiming preview bytes are embedded.

- Premium responsive UI remains active on the canonical source.
- Browser regression gate now checks widths 320 / 390 / 768 px for page/hero/GO overflow.
- ARIA tabs now use roving tabindex and keyboard navigation: Left / Right / Home / End.
- Profile / Connection / Server controls are locked during an active speed test so one result cannot mix measurement settings or endpoints.
- Language may still be changed while running, but no longer falsely changes the phase to “Ready”.
- STOP now aborts the server-health preflight through the active test signal instead of waiting for the independent 2.5 s health timeout.
- A user-triggered STOP is not rendered as a server-health failure.
- Browser tests verify settings lock/unlock and bounded STOP preflight latency.
- Android Emulator verifies bundled WebView v73, controls, language flow, GO/STOP and measurement-settings lock.

## Privacy

- Canonical public policy repo: `dachopol/privacy-policy`.
- Public URL: https://dachopol.github.io/privacy-policy/
- Public privacy URL content gate: PASS.
- Play Console field entry/submission remains TO VERIFY.

## Remaining external / real-world blockers

- **GAP:** Real packet loss needs an authorized TURN service/configuration. HTTP failures must not be substituted.
- **GAP:** Real video playback test needs licensed/owned test media plus a defined playback methodology. Current Video tab is an explicitly labelled suitability estimate.
- **GAP:** True multi-region manual selection needs additional authorized measurement endpoints. No fake region/city nodes.
- **TO VERIFY:** Physical Android phone validation on Wi-Fi / 4G / 5G, including accessibility and OEM WebView behavior. Emulator runtime is PASS but is not a substitute for physical networks/devices.
- **TO VERIFY:** Release signing and actual Google Play upload require signing material and Play Console access.
- **TO VERIFY:** Final Play Data Safety selections for IP-derived country and Cloudflare processing must match the exact final release and Console form.

Status: **HARD_BLOCKED_AFTER_SOURCE_GATES**
Next task: continue only when one of the external dependencies above is available, or when new runtime/device evidence exposes a source defect.
