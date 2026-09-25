# CHECKPOINT

Project: ZIPSPEED by AnakinYoo
Repository: dachopol/ZIPSPEEDmain
Branch: main
Package: com.aistudio.zipspeed.zskt
Version: 73.0.0
versionCode: 73

## Latest validated runtime/source

Validated runtime/source commit: `d9a68b11e00d38203ab055dcc0c0bd9e254b9be9`
GitHub Actions: **CI #148 — PASS 10/10**

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

## Physical-device validation — 2026-09-26

### Device A — RMX3241 / Wi-Fi
- Display: 1080×2400.
- Installed build: **v73.0.0 / versionCode 73 / targetSdk 36**.
- Portrait + landscape: PASS.
- Tab strip reaches History / Settings / Ad-free: PASS.
- Settings Quick / Standard, Single / Multi (4), Auto, TH / EN, Privacy: PASS.
- Quick + Single real-network flow: PASS.
- Quick + Multi (4) real-network flow: PASS.
- History persistence + WebView provenance: PASS.
- Controlled no-touch 20 s check: no automatic repeated test reproduced.

### Device B — Xiaomi 23078PND5G / Android 16 / 4G LTE
- Manufacturer/model reported by Android: **Xiaomi 23078PND5G**.
- Android: **16 / API 36**.
- Display: **1220×2712**.
- Existing v71 used a different signing certificate; v71 APK + app data were backed up before clean replacement.
- Clean-installed build: **v73.0.0 / versionCode 73 / targetSdk 36**.
- App launch + visible v73 badge: PASS.
- Android connectivity reported **MOBILE[LTE] / CELLULAR / INTERNET / VALIDATED** during the physical test.
- Quick + Single completed and persisted History: PASS.
- Latest completed 4G evidence: 2026-09-25T20:37:39.833Z, Down 20.43 Mbps, Up 12.97 Mbps, Idle 101.4 ms, Loaded↓ 334.3 ms, Loaded↑ 130.1 ms.
- HTTP probe failures: **0 / 3**.
- Provenance: `profile:"quick"`, `connection:"single"`, `serverId:"cloudflare-auto"`.
- HyperOS/Android 16 blocks ADB input injection on this device, so GO was user-tapped; screenshots/data verification remained tool-read.

The measured numbers above are evidence from individual real runs only. They are not benchmark, ISP-quality, accuracy, or marketing claims.

## Fixes validated in this inspection cycle

- Native branding is wired: launcher/round icon + pre-Android-12 splash fallback + Android 12+ splash resources.
- Web branding uses source-controlled `web/assets/zipspeed-mark.svg` with deterministic `?v=73` cache revision.
- Premium responsive UI remains active on the canonical source.
- Browser regression gate checks widths 320 / 390 / 768 px.
- ARIA tabs use roving tabindex and keyboard navigation.
- Profile / Connection / Server controls lock during an active speed test.
- STOP abort behavior remains covered by browser/emulator CI.

## Privacy

- Canonical public policy repo: `dachopol/privacy-policy`.
- Public URL: https://dachopol.github.io/privacy-policy/
- Public privacy URL content gate: PASS.
- Play Console field entry/submission remains TO VERIFY.

## Remaining external / real-world blockers

- **GAP:** Real packet loss needs an authorized TURN service/configuration.
- **GAP:** Real video playback test needs licensed/owned test media plus a defined playback methodology.
- **GAP:** True multi-region manual selection needs additional authorized measurement endpoints.
- **TO VERIFY:** Physical Android **5G** validation and broader accessibility/OEM WebView coverage. Wi-Fi and 4G physical runtime are now PASS on two devices.
- **TO VERIFY:** Release signing and actual Google Play upload require signing material and Play Console access.
- **TO VERIFY:** Final Play Data Safety selections for IP-derived country and Cloudflare processing.
- **TO VERIFY:** Exact Canva raster bytes for pixel-identical launcher/splash replacement.

Status: **HARD_BLOCKED_AFTER_SOURCE_GATES**
Next task: continue only with 5G/accessibility evidence, external measurement/media infrastructure, Play/signing access, exact Canva raster bytes, or a newly reproduced defect.
