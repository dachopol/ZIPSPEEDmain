# CHECKPOINT

Project: ZIPSPEED by AnakinYoo
Repository: dachopol/ZIPSPEEDmain
Branch: main
Package: com.aistudio.zipspeed.zskt
Version: 73.0.0
versionCode: 73

## Latest validated runtime/source

Validated runtime/source commit: `8a6c1c18abcdc34db906ff58104cb22d24267050`
GitHub Actions: **CI #147 — PASS 10/10**

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

Device evidence:
- Physical Android device: **RMX3241**.
- Display reported by Android: **1080×2400**.
- Installed package: `com.aistudio.zipspeed.zskt`.
- Installed build: **versionName 73.0.0 / versionCode 73 / targetSdk 36**.
- Wi-Fi indicator was visible and real HTTP measurement completed successfully.

Observed PASS:
- v73 launches on the physical device.
- Portrait and landscape layouts render without a reproduced critical overlap/blocking defect.
- Horizontally scrollable tab strip reaches History / Settings / Ad-free on the physical device.
- Settings render Quick / Standard, Single / Multi (4), Auto server, TH / EN, and Privacy.
- Quick + Single real-network flow reached STOP state, completed, and persisted History.
- Quick + Multi (4) real-network flow reached STOP state, moved the live gauge, completed, and persisted History.
- Debug WebView localStorage provenance contains `profile:"quick"`, `connection:"multi"`, and `serverId:"cloudflare-auto"` for physical-device completed results.
- Example persisted Multi result (evidence only, not a performance claim): 2026-09-25T19:21:31.653Z, Down 17.67 Mbps, Up 6.94 Mbps, Idle 200.4 ms, Loaded↓ 135.9 ms.
- Controlled no-touch observation for 20 seconds did not add History entries. Source inspection confirms `runTest()` is bound to the GO button click; no automatic speed-test loop was reproduced.

## Fixes validated in this inspection cycle

- Native branding is wired: launcher/round icon + pre-Android-12 splash fallback + Android 12+ splash resources.
- Web branding uses source-controlled `web/assets/zipspeed-mark.svg` with deterministic `?v=73` cache revision.
- Stale v72 assertions in runtime smoke and Android instrumentation tests were corrected to v73.
- Exact Canva raster export remains **TO VERIFY**; source currently uses a deterministic vector fallback rather than claiming preview bytes are embedded.
- Premium responsive UI remains active on the canonical source.
- Browser regression gate checks widths 320 / 390 / 768 px for page/hero/GO overflow.
- ARIA tabs use roving tabindex and keyboard navigation: Left / Right / Home / End.
- Profile / Connection / Server controls are locked during an active speed test.
- STOP abort behavior remains covered by browser/emulator CI.

## Privacy

- Canonical public policy repo: `dachopol/privacy-policy`.
- Public URL: https://dachopol.github.io/privacy-policy/
- Public privacy URL content gate: PASS.
- Play Console field entry/submission remains TO VERIFY.

## Remaining external / real-world blockers

- **GAP:** Real packet loss needs an authorized TURN service/configuration. HTTP failures must not be substituted.
- **GAP:** Real video playback test needs licensed/owned test media plus a defined playback methodology.
- **GAP:** True multi-region manual selection needs additional authorized measurement endpoints.
- **TO VERIFY:** Physical Android 4G/5G validation and broader accessibility/OEM WebView coverage. RMX3241 Wi-Fi physical runtime is PASS but is not universal device/network coverage.
- **TO VERIFY:** Release signing and actual Google Play upload require signing material and Play Console access.
- **TO VERIFY:** Final Play Data Safety selections for IP-derived country and Cloudflare processing must match the exact final release and Console form.
- **TO VERIFY:** Exact Canva raster bytes for pixel-identical launcher/splash replacement.

Status: **HARD_BLOCKED_AFTER_SOURCE_GATES**
Next task: continue only with cellular/accessibility evidence, external measurement/media infrastructure, Play/signing access, exact Canva raster bytes, or a newly reproduced defect.
