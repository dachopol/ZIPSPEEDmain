# CHECKPOINT

Project: ZIPSPEED by AnakinYoo
Repository: dachopol/ZIPSPEEDmain
Branch: main
Package: com.aistudio.zipspeed.zskt
Version: 85.0.0
versionCode: 85

## v85 release bundle evidence — CI artifact PASS

- CI #220 produces a release bundle artifact named `zipspeed-release-bundle`.
- Artifact contents verified from the run: `app-release.aab`, `app-release.aab.sha256`, and `signing-status.txt`.
- Exact AAB size: **677,082 bytes**.
- Exact AAB SHA-256: `7E16F11C8768E309F11D258CFB943102A7DB211C8BB5CB8B387A9D479805293A`.
- SHA-256 recorded by CI matches the downloaded AAB bytes.
- Signing evidence: `ZIPSPEED_RELEASE_SIGNING=UNCONFIGURED`.
- This proves the release bundle compiles and is preserved as an artifact, but it is **not Play-uploadable yet** because no real release signing material is configured.
- No signing key/password was generated, guessed, or committed.

## v85 deterministic Android startup/version — CI + exact emulator PASS

- Startup commit: `08f918a93e925a542723f2694f43ef35db18f746` hides the native splash on the first visible WebView commit, with page-finished fallback.
- Version embedding commit: `e2011ca1c5420a7a42dd764b6a9c32017198add5`.
- CI #217 exposed a real readiness regression: 9/10 jobs passed, but Android instrumentation timed out waiting for the v85 badge because the local `version.json` fetch could lag even after `document.readyState==='complete'`.
- Current Android packaging replaces `__ZIPSPEED_VERSION__` in bundled `index.html` with the version read from canonical `package.json`; web/dev keeps the bounded real `version.json` fallback. No competing hardcoded version source was introduced.
- GitHub Actions CI #218: **PASS 10/10**, including Android emulator runtime, browser, real-network smoke, privacy, Play-source, debug APK identity, and release compile.
- Exact CI #218 debug APK SHA-256: `C68777F24AEEA3BF0732443F22D1029CC72240E1B8123AEF5D51CA9B90C80956`.
- Exact APK badging: **com.aistudio.zipspeed.zskt / versionCode 85 / versionName 85.0.0 / targetSdk 36**.
- Exact APK bundled `assets/index.html`: embedded v85 meta **present**; `__ZIPSPEED_VERSION__` placeholder **absent**.
- Local emulator clean-install of the exact CI #218 APK: **PASS**.
- Cold-start observation on that emulator: t≈0.5 s = native Zipspeed splash, t≈3 s = splash, t≈8 s = fully rendered v85 UI with version badge. This is local-emulator evidence only, not a universal startup-time guarantee.
- Earlier CI #216 artifact on the same emulator took roughly 15 s to expose the UI; the first-visible-commit path reduced the observed wait while preserving a branded splash instead of a blank screen.
- Measurement engine, endpoints, permissions, history schema, Ads/Billing state, and real-data semantics were unchanged.

## v85 privacy alignment cleanup

- Bundled `web/privacy.html`, root `PRIVACY_POLICY.md`, and public policy source are aligned to **v85.0.0**.
- Bundled/root policy contact path includes the same privacy email already published by the public policy, plus GitHub Issues.
- IP-derived/reported country remains described as **approximate location**, not GPS.
- No SDK, permission, endpoint, measurement, retention, or Data Safety behavior changed; this is policy/source consistency cleanup only.

## v85 multilingual in-app guide + startup readiness — CI PASS

- Guide implementation commit: `e4c41dc28d08804152d16c79780e524aa5a464c5`.
- Splash/guide Android gate commit: `89ab4abdc69404c4ac8ca5157e4018ccad87760b`.
- Version-readiness hardening commit: `1e04dabef25a6e334470d503ddeb1d6cf6431494`.
- GitHub Actions CI #214: **PASS 10/10**.
- Settings now contains an in-app expandable User Guide instead of relying only on external documentation.
- Guide text is stored in locale resources: `web/i18n/guide.th.json` and `web/i18n/guide.en.json`; rendering logic is locale-neutral and has English fallback.
- Required guide coverage is present for Getting started, Main features, Permissions, Errors/fixes, Privacy/security, Support, and Accessibility.
- Guide claims are source-grounded: Video remains a throughput-derived estimate, no fake packet-loss/playback/Ads/Billing/location capability is introduced, and unknown values remain truthful.
- Browser CI verifies TH/EN guide switching, required section IDs, responsive page behavior, and guide resource loading.
- Android instrumentation CI verifies the bundled guide loads in Thai, switches to English, contains all seven required sections, and the startup splash becomes `GONE` only after bundled WebView content is ready.
- CI #213 exposed a pre-existing flaky single-attempt `version.json` readiness path before the new guide assertions were reached. Current source retries the **local bundled** version metadata up to three bounded attempts and still falls back to `v--` if all real reads fail; no version is fabricated or hardcoded into UI.
- `UNIVERSAL_APP_PROJECT_RULE.md` now contains the locked **UNIVERSAL MULTILINGUAL USER GUIDE RULE** for future app releases.
- Exact duplicate scan after guide assets: **PASS — 64 tracked files, zero exact duplicate Git blob groups**.
- Current-v85 physical tablet guide/readability remains **TO VERIFY** until a physical tablet reconnects; prior v80 tablet portrait/landscape/font-1.30 evidence remains historical only.

## v85 startup splash + emulator identity cleanup — PASS

- Source commit: `2c6216a9b15ef992b0358e4f9b3afc47e0eae566`.
- GitHub Actions CI #210: **PASS 10/10**.
- Exact CI #210 debug APK SHA-256: `547B98A9C0BB5F92815EC1EBD432E2DC0AED1A9D38788B4CB61A53A31B5112F4`.
- Defect reproduced on a clean local emulator: Activity became ready in about 1.5 s, but the WebView replaced the native window background before bundled HTML/CSS rendered, exposing a blank app surface for several seconds.
- Root-cause fix: `MainActivity` now keeps the native Zipspeed splash overlay above the WebView until the local `/assets/index.html` page finishes loading; the WebView/root background also uses the splash background color.
- Android instrumentation now asserts that the startup splash exists and becomes `GONE` after the bundled web app reports `document.readyState==='complete'`.
- Exact CI #210 emulator validation: immediate/t+3 s screenshots show the Zipspeed splash instead of a blank surface; the fully rendered v85 UI appears afterward. **Startup blank-screen defect: FIXED**.
- Measurement engine, endpoint, permissions, Ads/Billing behavior, history schema and real-data semantics were unchanged.
- Cross-project package audit: `QR-Scanners`, `-QRCODE-`, and `CAPCUTauto` contain no `com.aistudio.zipspeed.zskt` match. The same package ID exists in superseded `dachopol/Zipspeed` v71, which is the same Zipspeed product lineage.
- Local emulator old packages `com.aistudio.zipspeed.myapplication` (My Application v1.0) and `com.example.zipspeed` (Zipspeed v1.0) were backed up and removed; both use different package IDs.
- Local emulator now retains only `com.aistudio.zipspeed.zskt` for the Zipspeed test line and was clean-installed to exact v85.
- Historical emulator evidence that an unknown v1.0 once used the current package is not reproduced by current source/repository audit; **cross-project package collision: RESOLVED for current tracked projects**.

## v85 premium depth/density + physical runtime PASS

- Source/UI commit: `bb31f93160899e7fc38b7a0b37a7c7b95c2e9f83`.
- Browser-gate fix commit: `76c8558e66a98f447e4ee909f34f7851be3e261c`.
- GitHub Actions CI #208: **PASS 10/10**.
- v85 keeps the v84 APK identity hardening and real-data measurement semantics unchanged.
- Visual change is Smallest Safe Change only: hero min-height 520→500 px, gauge max footprint 285→276 px, GO 88→84 px, and blue outer glow/shadows reduced.
- Browser regression locks compact GO/hero/gauge geometry alongside existing 320/390/768 responsive, TH/EN, GO/STOP, tab, privacy and measurement-setting gates.
- Exact CI v85 debug APK clean-installed on RMX3241 after backing up the installed v84 APK + app data because debug signatures differed.
- Physical v85 portrait idle UI: **PASS** — premium white/blue hierarchy, truthful `--`, gauge phase, GO and 2×2 primary metrics remain readable without observed overlap.
- Physical v85 Quick + Single: **PASS** for GO → STOP → GO.
- Persisted result: `2026-09-27T08:34:53.272Z`.
- Download **16.55 Mbps**; Upload **3.89 Mbps**; Ping **125.2 ms**; Jitter **44.85 ms**.
- Download-loaded latency **105.1 ms**; Upload-loaded latency **92.45 ms**; HTTP probe failures **0 / 3**.
- Provenance: `quick / single / cloudflare-auto`.
- Values above are one-run validation evidence only, not a benchmark, ISP-quality or marketing claim.
- Bundled `web/privacy.html` is aligned to **85.0.0** and audit now fails on stale v84 marker.

## v84 APK identity hardening + RMX3241 physical PASS

- Source/runtime commit: `c9af4da4ec26641facf4bced383981e770fb522d`.
- GitHub Actions CI #205: **PASS 10/10**.
- CI debug artifact digest: `sha256:3ca13468a1acc66a5f2b1aab1f80851e5563543d7daa8b4755ccdc279e9e45c7`.
- Defect reproduced from the exact CI #202 v83 artifact: Android reported `versionCode 77`, proving the built APK manifest could lag the canonical package metadata even while source/web gates passed.
- Fix: Gradle now reads `package.json` through tracked `providers.fileContents(packageJsonFile).asText`; CI additionally runs **Verify debug APK identity** against the built APK using `aapt`.
- Local clean Gradle 9.3.1 proof: package `com.aistudio.zipspeed.zskt`, versionCode `84`, versionName `84.0.0`, bundled `assets/version.json` = 84/84.0.0.
- Exact CI v84 APK independently reported package/version **84 / 84.0.0** before installation.
- RMX3241 pre-upgrade v82 APK + app data were backed up because CI debug signatures differed; clean install of exact CI v84 succeeded.
- Physical v84 idle UI: **PASS** — premium white/blue hierarchy, truthful `--`, gauge phase, GO and 2×2 primary metrics show no observed overlap at 1080×2400.
- Physical v84 Quick + Single: **PASS for GO → STOP → GO and visible completed metrics**.
- Observed one-run values: Download **13.9 Mbps**, Upload **7.6 Mbps**, Ping **109.4 ms**, Jitter **89.6 ms**. Validation evidence only; not a benchmark/ISP-quality claim.
- No measurement semantics, endpoint, permissions, history schema, Ads/Billing dependency, packet-loss claim or fake-data behavior changed.

## v83 gauge-label spacing + calmer GO depth — emulator PASS

- Source/runtime commit: `7824f0c9a06e5f42a603828b50b060c03507cf8e`.
- GitHub Actions CI #202: **PASS 10/10**.
- Exact CI #202 debug artifact digest: `sha256:fa1dab53351852b65a0908e14fd2d928cbda9b44bb3f6bb779b09b334faee0cf`.
- Visual root cause came from the exact v82 CI build on the local Android emulator: the Speed/Download/Upload phase label sat visually tight against the lower gauge ring and the GO button still carried more blue bloom than the target premium white-clay hierarchy.
- v83 keeps the same real-data gauge values, needle, GO/STOP behavior and metric layout but reduces the phase-label weight/spacing and tightens the GO shadow.
- Browser regression now requires the phase label to remain compact in addition to the existing gauge value/unit/phase no-overlap checks.
- Local Android emulator clean-installed **v83.0.0 / versionCode 83 / targetSdk 36** and visually renders the refined idle gauge/GO hierarchy.
- Physical RMX3241 v83 visual/runtime validation is **TO VERIFY** because the device was locked during this pass; no lock bypass was attempted.
- During emulator QA, an unrelated old app UI was found installed under `com.aistudio.zipspeed.zskt` at version 1.0. It was removed only from the emulator to install the exact v82/v83 CI APK. This is logged as a **cross-project package-identity TO VERIFY**, not as evidence that the current QuickQR source still uses the Zipspeed package.
- No measurement engine, endpoint, permission, history schema, Ads/Billing dependency, packet-loss claim or fake-data behavior changed.

## v82 full TH/EN measurement phases — physical PASS

- Source/runtime commit: `5c20de07458a00007262c1c3998ff63b7c6bfbcf`.
- GitHub Actions CI #200: **PASS 10/10**.
- Exact CI #200 debug APK SHA-256: `FA52AF171C5D952296FA7225558E73FB0D03E799F03C70BF4ACBDB7F4152F805`.
- RMX3241 v81 APK + app data were backed up before clean replacement because CI debug signatures differed.
- Clean-installed build: **v82.0.0 / versionCode 82 / targetSdk 36**.
- Physical Thai running phase: **PASS**. The observed Download phase renders `กำลังวัด • ดาวน์โหลด + ค่าหน่วงขณะโหลด`; raw `download + loaded latency` is no longer shown.
- GO → STOP during measurement: **PASS**.
- Completion verified from persisted WebView History/provenance because a different foreground app appeared later; no completion claim is based on the unrelated screenshot.
- Completed result timestamp: `2026-09-27T03:23:45.549Z`.
- Download: **17.86 Mbps**; Upload: **11.95 Mbps**; Ping: **69.5 ms**; Jitter: **3.55 ms**.
- Download-loaded latency: **178.7 ms**; Upload-loaded latency: **137.1 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `quick / single / cloudflare-auto`.
- Measured values are one-run validation evidence only, not ISP-quality, benchmark-accuracy or marketing claims.

## v81 gauge hierarchy + physical runtime — PASS

- Source/runtime commit: `af979c11c69c15c95508309a89079f715d0c1e99`.
- GitHub Actions CI #198: **PASS 10/10**.
- Exact CI #198 debug APK SHA-256: `62BE5AB0C8B4D35ABE5476ACD33EDA2B569FE978DAF9B0716DF2C613CFD02F68`.
- RMX3241 pre-upgrade v80 APK + app data were backed up before clean replacement because CI debug signatures differed.
- Clean-installed build: **v81.0.0 / versionCode 81 / targetSdk 36**.
- Physical idle gauge: **PASS**. Unknown `--`, `Mbps` unit and `ความเร็ว` phase are visually separated and do not overlap the needle, hub or GO.
- Physical Quick + Single GO → STOP → GO: **PASS**.
- Completed result timestamp: `2026-09-27T03:10:57.085Z`.
- Download: **22.39 Mbps**; Upload: **9.93 Mbps**; Ping: **157.1 ms**; Jitter: **68.25 ms**.
- Download-loaded latency: **137.15 ms**; Upload-loaded latency: **89.75 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `quick / single / cloudflare-auto`.
- Final physical screenshot shows measured Upload **9.9 Mbps** in the gauge with four main metrics readable and no observed overlap.
- Measured values are one-run validation evidence only, not ISP-quality, benchmark-accuracy or marketing claims.

## v80 current-build QA refresh — Xiaomi 2410CRP4CG

- Exact current runtime APK: CI #195 debug artifact, SHA-256 `EFA656423DB76C62A4A780960ED30E4A927188C40E13248300DBC2A1F5D5164A`.
- Pre-upgrade Xiaomi v79 APK + app data were backed up before replacement.
- Backup v79 APK SHA-256: `5D438C97F338BD88DD31F4493CFD37D6C84C2DA95992C16C725CD7B4B2BA0045`.
- Backup v79 app-data tar SHA-256: `AA0A3D89181C668C7F68BA3CD517EB241D8F136CF6095AC3955C17FAA8FD0147`.
- In-place update v79 → v80 was rejected by Android with `INSTALL_FAILED_UPDATE_INCOMPATIBLE` because the CI debug signatures differed. No data-destructive retry was attempted until a rollback backup existed and the device was unlocked.
- Clean-installed exact v80 build: **v80.0.0 / versionCode 80 / targetSdk 36**.
- Installed tablet APK hash after install: **exact match** to CI #195.
- Portrait fullscreen 2136×3200: **PASS**. Seven tabs, gauge/GO, and Download / Upload / Ping / Jitter 2×2 main metrics are readable with no observed overlap/horizontal overflow.
- Quick + Single Wi-Fi GO → STOP → GO: **PASS**.
- Persisted result timestamp: `2026-09-26T22:22:26.268Z`.
- Download: **63.01 Mbps**; Upload: **22.37 Mbps**; Ping: **113.5 ms**; Jitter: **33.85 ms**.
- Download-loaded latency: **65.9 ms**; Upload-loaded latency: **90.8 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `quick / single / cloudflare-auto`.
- Running screenshot physically shows measured Download and Ping/Jitter on the main screen with STOP state; completion screenshot returns to GO and shows measured Upload without overlap.
- Landscape fullscreen 3200×2136: **PASS**. Seven tabs, gauge/GO and 2×2 main metrics remain readable with no observed overflow.
- Enlarged system font **1.30** portrait stress test: **PASS**. Main tabs, gauge/GO, 2×2 metrics and detail cards remain readable without observed overflow.
- Device settings were restored after QA: **font scale 1.00 + rotation auto/free**.
- Manual TalkBack traversal remains **TO VERIFY**.
- Measured values above are one-run evidence only and are not an ISP-quality, benchmark-accuracy, or marketing claim.

## v80 gauge realism + main metrics — physical PASS

- Runtime/source commit: `b793bfa4e3be5e1cc411a05d24b775471b5439ca`.
- GitHub Actions CI #195: **PASS 10/10**.
- Gauge spring/overshoot motion was replaced with monotonic eased tracking; regression test verifies convergence without overshoot or random input.
- Download phase feeds the gauge from rolling Mbps calculated from **actual response byte chunks + elapsed time**. No synthetic/random progress values are generated.
- Gauge phase label identifies **Download / Upload** and the final gauge retains the measured Upload result; physical overlap found in CI #194 was fixed by scoping large gauge typography to `#liveValue` only.
- Browser regression enforces that the gauge phase label stays below the live value, above GO, and does not become oversized.
- Main Speed hero contains **Download / Upload / Ping (HTTP) / Jitter** in a responsive 2×2 grid; audit fails if any of these four leave the main Speed panel.
- Exact CI #195 debug APK SHA-256: `EFA656423DB76C62A4A780960ED30E4A927188C40E13248300DBC2A1F5D5164A`.
- RMX3241 exact CI #195 clean-install + Quick/Single real-network flow: **PASS**.
- Persisted result timestamp: `2026-09-26T15:39:32.680Z`; Download **26.15 Mbps**, Upload **14.36 Mbps**, Ping **182.3 ms**, Jitter **251.25 ms**, HTTP probe failures **0/3**.
- Physical screenshots confirm running Download label and completed Upload label do not overlap the gauge value or GO, while all four primary metrics remain visible on the main screen.
- These measured values are one-run validation evidence only, not an ISP-quality or benchmark-accuracy claim.

## Latest validated runtime/source

Validated runtime/source commit: `e2011ca1c5420a7a42dd764b6a9c32017198add5`
Runtime CI: **#218 — PASS 10/10**

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

## Rules / duplicate-file cleanup

- Exact tracked-file duplicate scan: **PASS** — 61 tracked files, zero duplicate Git blob SHA groups before this cleanup.
- Same-name Android/Gradle resource pairs were reviewed and retained because they serve different platform/configuration roles.
- `PROJECT_RULES.md` was reduced from a duplicated universal-rule copy to a Zipspeed-specific overlay.
- `UNIVERSAL_APP_PROJECT_RULE.md` remains the single owner master for locked universal workflow, GitHub safety, layout, security, build/release, stale cleanup, and competitor-scoring process.
- No runtime/source-code behavior, package ID, version, signing, endpoint, or measurement engine was changed by this documentation cleanup.

## v80 tab discoverability polish — physical PASS on RMX3241

- Source commit: `c05c9c51df801492f8858fc4ccf2c7aa118a0e83`.
- GitHub Actions CI #185: **PASS 10/10**; CI #184 produced the exact physical-test debug APK.
- Exact v80 CI #184 debug APK SHA-256: `97E8D20F36006AC55F6A6BE962FFE834EF51A773468E097F3B28DE610D0C626A`.
- RMX3241 clean-installed build: **v80.0.0 / versionCode 80 / targetSdk 36** after backing up the installed v79 APK + app data because CI debug signatures differed.
- Narrow-screen initial state physically shows the right-edge tab cue without obscuring the visible Map label.
- Physical horizontal tab scroll to History / Settings / Ad-free: **PASS**.
- Ad-free selection physically auto-centers the active far-right tab and leaves a left-return cue: **PASS**.
- No observed tab-row horizontal clipping of the active tab, duplicate menu, or overlap with the header.
- Quick + Single real-network flow on the same v80 APK: **PASS** (GO → STOP → GO + persisted History/provenance).
- Completed result timestamp: `2026-09-26T08:42:56.636Z`.
- Download: **18.14 Mbps**; Upload: **9.48 Mbps**; Idle latency: **66.1 ms**.
- Download-loaded latency: **184.35 ms**; Upload-loaded latency: **72.0 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `profile:"quick"`, `connection:"single"`, `serverId:"cloudflare-auto"`.
- These values are evidence from one real run only, not a performance, ISP-quality, or benchmark-accuracy claim.
- No speed-test engine, endpoint, Ads/Billing dependency, permission, or fake-data path was changed in v80.

## v79 premium clay depth + real-network validation — PASS on RMX3241

- Validated runtime/source commit: `1e2517266121d498b4556969ec00be8617812175`.
- GitHub Actions CI #178: **PASS 10/10**, including web, browser interaction, real-network smoke, Android debug/release compile, emulator runtime, Privacy and Play-source gates.
- Exact CI debug APK SHA-256: `5D438C97F338BD88DD31F4493CFD37D6C84C2DA95992C16C725CD7B4B2BA0045`.
- Clean-installed on RMX3241: **v79.0.0 / versionCode 79 / targetSdk 36**.
- Premium white/blue clay UI remains physically readable at 1080×2400; truthful idle `--`, live value, needle and GO/STOP do not overlap.
- A pre-hardening physical run reproduced `No healthy measurement server`; the same endpoint was HTTP 200 from the development PC and a subsequent device retry succeeded.
- Root-cause hardening in current source replaces the single 2.5 s health probe with at most **2 attempts × 5 s**, while still requiring a real HTTP-success response; no fake/fallback measurement server is introduced.
- Exact-HEAD Quick + Single real-network flow: **PASS** (GO → STOP → GO + persisted History/provenance).
- Completed result timestamp: `2026-09-26T05:56:42.969Z`.
- Download: **14.91 Mbps**; Upload: **3.15 Mbps**; Idle latency: **101.5 ms**.
- Download-loaded latency: **106.8 ms**; Upload-loaded latency: **170.2 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `profile:"quick"`, `connection:"single"`, `serverId:"cloudflare-auto"`.
- These values are evidence from one real run only, not a performance, ISP-quality, or benchmark-accuracy claim.
- Xiaomi `2410CRP4CG` exact v79 installation: **PASS** after the user approved Xiaomi/MIUI USB installation; no security setting was bypassed.
- Xiaomi physical display: **2136×3200**, Android 16 / API 36, validated Wi-Fi.
- Initial post-install task inherited HyperOS freeform state from the Settings/install flow. A fresh fullscreen task was created only for diagnosis; after Home → Launcher reopen, HyperOS resumed the same app task in **fullscreen** normally, so no manifest/source change was made.
- Fullscreen tablet UI: **PASS**. All seven tabs are readable; gauge, GO/STOP, version badge and vertical metric cards have no observed overlap or horizontal overflow.
- Fullscreen Quick + Single real-network flow: **PASS** (GO → STOP → GO + persisted History/provenance).
- Xiaomi completed result timestamp: `2026-09-26T06:27:37.030Z`.
- Xiaomi Download: **48.05 Mbps**; Upload: **19.50 Mbps**; Idle latency: **94.1 ms**.
- Xiaomi Download-loaded latency: **113.6 ms**; Upload-loaded latency: **131.9 ms**; HTTP probe failures: **0 / 3**.
- Xiaomi provenance: `profile:"quick"`, `connection:"single"`, `serverId:"cloudflare-auto"`.
- These Xiaomi values are evidence from one real run only, not a performance, ISP-quality, or benchmark-accuracy claim.
- Xiaomi landscape physical UI: **PASS** at **3200×2136 / fullscreen** after unlocked capture. Seven tabs remain readable; gauge/GO and the visible metric card do not overlap or horizontally overflow. Rotation was returned to automatic after validation.

## v78 gauge UI / motion refinement — physical PASS

- Root cause came from physical v77 evidence: the no-result `--` inherited the large live-speed typography and rendered as two heavy black bars over the gauge hub.
- v78 keeps `--` as the truthful unknown value but renders it smaller/muted below the hub, so unknown data remains explicit without obscuring the needle.
- The current HEAD also adds eased live-value motion and gauge/hub running animation, with `prefers-reduced-motion` respected.
- Physical RMX3241 screenshot confirms the idle `--` no longer overlaps the hub/needle.
- Physical live-value screenshot confirms a finite real value renders below the hub without overlap while the needle remains visible.
- Clean-installed build: **v78.0.0 / versionCode 78 / targetSdk 36**.
- Quick + Single real-network completion persisted History/provenance: **PASS**.
- Completed result timestamp: `2026-09-26T05:08:47.818Z`.
- Download: **11.19 Mbps**; Upload: **4.33 Mbps**; Idle latency: **278.8 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `profile:"quick"`, `connection:"single"`, `serverId:"cloudflare-auto"`.
- Values are evidence from one real run only, not a performance/ISP-quality claim.
- Browser regression + CI #170: **PASS 10/10**.

## v77 physical Wi-Fi runtime — RMX3241

- Installed build: **v77.0.0 / versionCode 77 / targetSdk 36**.
- Android network: **Wi-Fi / INTERNET / VALIDATED**.
- Quick + Single entered STOP state during measurement.
- A different foreground app appeared after the run, so completion was verified from Zipspeed debug WebView localStorage rather than inferred from the screenshot.
- Persisted result timestamp: `2026-09-26T02:25:18.668Z`.
- Download: **17.15 Mbps**.
- Upload: **11.26 Mbps**.
- Idle latency: **89.2 ms**.
- Download-loaded latency: **100.8 ms**.
- Upload-loaded latency: **138.5 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `profile:"quick"`, `connection:"single"`, `serverId:"cloudflare-auto"`.
- Status: **PASS**. Values are evidence from one real run only, not a performance/ISP-quality claim.

## v77 release signing readiness

- Source commit: `a769b7ac5b5d8101b1a0a3cb17fbc0aafbb72fc0`.
- CI #162: PASS 10/10.
- Gradle release signing supports four environment variables only; no signing material is stored in the repository.
- Partial signing configuration fails at Gradle configuration time.
- CI without real signing material reports `ZIPSPEED_RELEASE_SIGNING=UNCONFIGURED`.
- `:app:bundleRelease` still compiles successfully for source verification.
- Release/source gate checks tracked Git files and rejects JKS/keystore/P12/signing-property material.
- **TO VERIFY:** actual keystore, upload certificate / Play App Signing match, signed AAB, and Play upload.
- Development-PC recheck: all four required signing environment variables are **unconfigured** and the configured keystore-file check is **false**. No key/password was guessed or created.

## v77 5G / OEM coverage evidence

- RMX3241 telephony reports `isNrAvailable=true` and `isEnDcAvailable=true`, so the connected network/device exposes 5G NSA capability.
- When Wi-Fi was disabled for runtime verification, the active data radio remained **LTE**, not NR/5G. Wi-Fi was restored afterward.
- Result: **5G capability observed / 5G runtime TO VERIFY**.
- Latest physical recheck with Wi-Fi temporarily disabled again reported active **LTE** data radio while `isNrAvailable=true` / `isEnDcAvailable=true`; Wi-Fi was restored afterward. No 5G runtime PASS is claimed.
- Xiaomi `2410CRP4CG`: Android 16 / API 36 / 2136×3200 / validated Wi-Fi detected.
- Zipspeed v76 clean install attempt on that device returned `INSTALL_FAILED_USER_RESTRICTED`; no bypass was attempted and no physical tablet PASS is claimed.

## v76 physical Wi-Fi measurement — RMX3241

- Build: **v76.0.0 / versionCode 76 / targetSdk 36**.
- Android connectivity: **Wi-Fi / INTERNET / VALIDATED**.
- Quick + Single GO flow: PASS.
- GO → STOP during measurement → GO after completion: PASS.
- Persisted History/provenance: PASS.
- Completed result timestamp: `2026-09-26T02:00:33.483Z`.
- Download: **15.63 Mbps**.
- Upload: **15.13 Mbps**.
- Idle latency: **278.5 ms**.
- Download-loaded latency: **178.6 ms**.
- Upload-loaded latency: **185.4 ms**.
- HTTP probe failures: **0 / 3**.
- Provenance: `profile:"quick"`, `connection:"single"`, `serverId:"cloudflare-auto"`.
- These values are evidence from one real run only, not an ISP-quality or performance claim.

## v76 Video readability validation

- Source commit: `099e6d7e9dbfb9fa2b8dbe72de4b9b8c38b41731`.
- CI #159: PASS 10/10.
- Browser regression verifies TH `เกณฑ์อ้างอิง`, EN `Reference`, and block-level Video threshold hierarchy.
- RMX3241 clean-installed **v76.0.0 / versionCode 76 / targetSdk 36**.
- Physical Video UI: PASS. 720p / 1080p / 4K labels are separated from their reference thresholds and no longer concatenate.
- Measurement semantics remain throughput-derived estimates; no playback test claim was introduced.

## v75 secondary-page UI validation

- Source HEAD: `2896b2a01229932b97cb80b141ded04e57c185a5`
- CI #157: PASS 10/10.
- Video / Status / History / Settings / Ad-free use the same premium white/blue card language as Speed.
- Browser gate verifies all secondary pages at 320 px without horizontal overflow.
- Browser gate verifies active far-right tab auto-scroll and complete TH/EN tab labels.
- RMX3241 physically reports **v75.0.0 / versionCode 75 / targetSdk 36** and home UI renders at 1080×2400.
- Physical secondary-tab switching on RMX3241: PASS after correcting ADB coordinates to the 1080×2400 physical screenshot scale. Video / Status / History / Settings / Ad-free were opened and visually checked.

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
- **TO VERIFY:** TalkBack/manual screen-reader traversal and enlarged-font visual stress test.
- RMX3241 current font scale is **1.15**; shell attempt to set 1.30 was rejected by `android.permission.WRITE_SETTINGS`, and the value remained 1.15.
- Xiaomi 2410CRP4CG shell accepted temporary font scale **1.30**, but the capture occurred after the device slept/locked, so no visual PASS is claimed; font scale was restored to **1.00** immediately.

## Privacy

- **FIX:** bundled `web/privacy.html` and root `PRIVACY_POLICY.md` stale v72 markers were aligned to **v80.0.0**.
- **PASS (source classification):** current Data Safety preparation maps IP-derived/reported country to Google Play **Approximate location**, purpose **App functionality**.
- **PASS (conservative sharing classification):** prepared as collected + shared with Cloudflare because current source proves direct transfer to an external provider and does not prove a service-provider exception.
- **TO VERIFY:** actual Play Console entry, preview, save/submission, and any older active Play artifacts that could broaden the global Data Safety declaration.
- Exact CI #188 debug APK SHA-256: `8B061315CA07CEBED4C8B6B14B0BDB1CD5FD915C3B453A0080CAF0192C57C7BE`.
- Exact APK inspection: `assets/privacy.html` contains **version 80.0.0**, contains no `version 72.0.0`, and includes approximate-location wording.
- RMX3241 exact CI #188 APK clean install + cold foreground launch: **PASS**; prior installed v80 APK/app-data were backed up first because debug signatures differed.
- Fresh-clone stale active marker scan after the privacy alignment: **PASS — 0 matching stale markers**.
- Local fresh-clone `npm run check`: **PASS** (13/13 tests + static build); `npm run runtime:check`: **PASS**.

- Canonical public policy repo: `dachopol/privacy-policy`.
- Public URL: https://dachopol.github.io/privacy-policy/
- Policy source aligned to **v80.0.0** on 2026-09-26.
- CI privacy-url-check requires current v80 content.
- Play Console field entry/submission remains TO VERIFY.

## Clear-old cleanup

- Historical v70 project/data-safety/privacy drafts and the 2026-09-23 competitor snapshots are archived under `docs/archive/`.
- Root release state is represented by current v80 documents only.
- CHANGELOG history remains intentionally retained.

## Remaining external / real-world blockers

- **GAP:** Real packet loss needs an authorized TURN service/configuration.
- **GAP:** Real video playback test needs licensed/owned test media plus a defined playback methodology.
- **GAP:** True multi-region manual selection needs additional authorized measurement endpoints.
- **TO VERIFY:** Physical Android **5G**, manual TalkBack/accessibility traversal, enlarged-font stress test, and broader OEM/WebView coverage.
- **TO VERIFY:** Release signing and actual Google Play upload require signing material and Play Console access.
- **TO VERIFY:** Actual Play Console Data Safety entry/review/submission using the v80 source-grounded preparation.
- **GAP:** Exact Canva raster bytes for pixel-identical launcher/splash replacement. Canva contains the approved icon/splash designs and reports square icon pages plus a **1080×1920** splash, but the connected Canva workflow exposes previews/metadata only and no export bytes. Current Android launcher/splash remain the source-controlled vector fallback; no thumbnail was substituted.

Status: **HARD_BLOCKED_AFTER_SOURCE_GATES**
Next task: continue only with 5G/accessibility evidence, external measurement/media infrastructure, Play/signing access, exact Canva raster bytes, or a newly reproduced defect.
