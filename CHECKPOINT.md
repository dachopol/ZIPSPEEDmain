# CHECKPOINT

Project: ZIPSPEED by AnakinYoo
Repository: dachopol/ZIPSPEEDmain
Branch: main
Package: com.aistudio.zipspeed.zskt
Version: 75.0.0
versionCode: 75

## Latest validated runtime/source

Validated runtime/source commit: `2896b2a01229932b97cb80b141ded04e57c185a5`
GitHub Actions: **CI #157 — PASS 10/10**

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

## v75 secondary-page UI validation

- Source HEAD: `2896b2a01229932b97cb80b141ded04e57c185a5`
- CI #157: PASS 10/10.
- Video / Status / History / Settings / Ad-free use the same premium white/blue card language as Speed.
- Browser gate verifies all secondary pages at 320 px without horizontal overflow.
- Browser gate verifies active far-right tab auto-scroll and complete TH/EN tab labels.
- RMX3241 physically reports **v75.0.0 / versionCode 75 / targetSdk 36** and home UI renders at 1080×2400.
- **TO VERIFY:** physical DOM-level switching into secondary tabs on RMX3241; ADB tap injection did not activate WebView tab buttons in this inspection.

## v74 physical UI validation — RMX3241

- Clean-installed **v74.0.0 / versionCode 74 / targetSdk 36** after backing up the installed v73 APK and app data because CI debug signatures did not match.
- Physical display: **1080×2400**, observed system font scale **1.15**.
- Portrait home UI: PASS.
- Header is more compact while keeping the v74 badge readable.
- Main tab row shows Speed / Video / Status / Map without the previous half-cut Map label in the observed home state.
- Hero height/gauge footprint are reduced and the first metric card is visible in the first screen.
- Metric card presentation is title-left / value-right.
- Observed second cold launch: app shell visible by ~1.5 s; v74/fully initialized UI visible by ~3 s.
- **TO VERIFY:** new physical v74 GO/real-network completion. ADB coordinate injection triggered a system/app gesture instead of GO, so this inspection does not promote that item to PASS.
- CI #154 covers GO/STOP, real-network smoke, Android emulator interaction, narrow-screen active-tab visibility and full TH/EN tabs.

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
- Current physical font scale observed: **1.15**.
- WebView inner accessibility nodes are not exposed through uiautomator on this device; source/browser accessibility checks remain the verified evidence layer.

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

## Accessibility / input evidence

- Main tabs use `role="tablist"` / `role="tab"`, `aria-selected`, `aria-controls`, and roving `tabindex`.
- Browser runtime gate verifies keyboard ArrowRight navigation and selected/focus state.
- GO phase uses `role="status"` + `aria-live="polite"`.
- Latency graph uses `role="img"` + accessible label.
- Tabs and text controls use minimum 44 px touch height; selects are at least 46 px; primary secondary action is at least 54 px.
- `:focus-visible` and `prefers-reduced-motion: reduce` are implemented.
- **TO VERIFY:** TalkBack/manual screen-reader traversal and enlarged system font beyond the current physical 1.15 setting. Android shell cannot change WRITE_SETTINGS on the connected device, so no fake PASS is recorded.

## Privacy

- Canonical public policy repo: `dachopol/privacy-policy`.
- Public URL: https://dachopol.github.io/privacy-policy/
- Policy source aligned to **v75.0.0** on 2026-09-26.
- CI privacy-url-check now requires v75 content.
- Play Console field entry/submission remains TO VERIFY.

## Clear-old cleanup

- Historical v70 project/data-safety/privacy drafts and the 2026-09-23 competitor snapshots are archived under `docs/archive/`.
- Root release state is represented by current v75 documents only.
- CHANGELOG history remains intentionally retained.

## Remaining external / real-world blockers

- **GAP:** Real packet loss needs an authorized TURN service/configuration.
- **GAP:** Real video playback test needs licensed/owned test media plus a defined playback methodology.
- **GAP:** True multi-region manual selection needs additional authorized measurement endpoints.
- **TO VERIFY:** Physical Android **5G**, manual TalkBack/accessibility traversal, enlarged-font stress test, and broader OEM/WebView coverage.
- **TO VERIFY:** Release signing and actual Google Play upload require signing material and Play Console access.
- **TO VERIFY:** Final Play Data Safety selections for IP-derived country and Cloudflare processing.
- **TO VERIFY:** Exact Canva raster bytes for pixel-identical launcher/splash replacement.

Status: **HARD_BLOCKED_AFTER_SOURCE_GATES**
Next task: continue only with 5G/accessibility evidence, external measurement/media infrastructure, Play/signing access, exact Canva raster bytes, or a newly reproduced defect.
