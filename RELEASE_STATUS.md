# ZIPSPEED Release Status

## Current rebuild
- App: ZIPSPEED by AnakinYoo
- Package: `com.aistudio.zipspeed.zskt`
- Version: `77.0.0`
- versionCode: `77`
- Active UI/runtime source: `web/` only
- Native branding: launcher icon + splash resources wired; exact Canva raster export remains TO VERIFY
- v77 release hardening: environment-based signing contract with no signing secrets stored in Git
- v76 UI polish remains active: secondary-page system plus corrected two-line Video reference-threshold hierarchy
- Secondary-page responsive gate: 320 px browser proof
- Old root UI, `app/applet`, and committed Android web-asset mirrors: removed

## Gates
- Source audit: PASS in CI
- Unit tests: PASS in CI
- Static build: PASS in CI
- Runtime HTTP smoke: PASS in CI
- Real-network endpoint smoke: PASS on main
- Android lint/debug build: PASS in CI
- Android release bundle compile: PASS in CI
- Release signing source contract: **PASS — env-based, partial config fails, secrets ignored/not tracked**
- CI signing status without real key: **UNCONFIGURED**
- Release-source evidence: PASS in CI
- Play-source evidence: PASS in CI
- Android emulator runtime: PASS
- v76 browser interaction: **PASS including 320 px secondary-page layout, active-tab visibility, complete TH/EN tabs, and Video threshold hierarchy**
- v76 physical Video UI: **PASS on RMX3241 / 1080×2400**
- v76 physical Quick + Single Wi-Fi runtime: **PASS on RMX3241 with persisted real-data History/provenance**
- v75 physical secondary pages: **PASS for Video / Status / History / Settings / Ad-free on RMX3241**
- Physical Android Wi-Fi runtime: **PASS on RMX3241**
- Physical Quick Single + Multi (4) on Wi-Fi: **PASS on RMX3241**
- Physical Android 4G/LTE runtime: **PASS on Xiaomi 23078PND5G / Android 16**
- Physical Quick Single on 4G/LTE: **PASS with persisted real-data History/provenance**

## TO VERIFY
- Real signed Play-uploadable AAB + certificate match
- Live Play Console state/declarations
- Successful upload/review/publication
- Physical Android 5G runtime
- Xiaomi 2410CRP4CG tablet install/runtime after user restriction is cleared; broader OEM/WebView coverage
- Accessibility on physical device
- Final Data Safety classification
- Exact Canva raster parity
