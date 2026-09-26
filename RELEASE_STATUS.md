# ZIPSPEED Release Status

## Current rebuild
- App: ZIPSPEED by AnakinYoo
- Package: `com.aistudio.zipspeed.zskt`
- Version: `80.0.0`
- versionCode: `80`
- Active UI/runtime source: `web/` only
- Native branding: launcher icon + splash resources wired; exact Canva raster export remains TO VERIFY
- v80 usability refinement: narrow-screen tab strip now gives subtle left/right scroll discoverability cues without adding duplicate navigation
- v79 visual refinement: reduced excessive blue bloom around gauge/GO for sharper premium white-clay depth
- v78 UI refinement remains active: truthful idle `--` placeholder is smaller/muted instead of rendering as heavy bars over the gauge hub
- v77 release hardening remains active: environment-based signing contract with no signing secrets stored in Git
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
- Exact bundled privacy v80 alignment: **PASS — CI #188 APK contains v80 policy, no v72 marker; RMX3241 cold launch PASS**
- v78 browser idle-gauge placeholder + live-value overlap regression: **PASS**
- v78 physical idle/live gauge readability: **PASS on RMX3241 / 1080×2400**
- v78 physical Quick + Single Wi-Fi runtime: **PASS with persisted real-data History/provenance**
- v80 current source CI #188: **PASS 10/10**, including privacy/Data Safety alignment and tab discoverability regression
- v80 physical UI: **PASS on RMX3241 / 1080×2400 — right/left tab cues and Ad-free active-tab auto-centering verified**
- v79 physical home UI: **PASS on RMX3241 / 1080×2400 — sharper gauge/GO depth**
- v80 physical Quick + Single Wi-Fi runtime: **PASS on RMX3241 with persisted real-data History/provenance**
- v78 physical Quick + Single Wi-Fi runtime: **PASS retained as prior evidence**
- v76 browser interaction: **PASS including 320 px secondary-page layout, active-tab visibility, complete TH/EN tabs, and Video threshold hierarchy**
- v76 physical Video UI: **PASS on RMX3241 / 1080×2400**
- v77 physical Quick + Single Wi-Fi runtime: **PASS on RMX3241 with persisted real-data History/provenance**
- v76 physical Quick + Single Wi-Fi runtime: PASS retained as prior evidence
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
- Broader OEM/WebView coverage beyond the already verified Xiaomi 2410CRP4CG v79 tablet
- Accessibility on physical device
- Actual Play Console Data Safety entry/review/submission using the source-grounded v80 preparation
- Exact Canva raster parity
