# ZIPSPEED Release Status

## Current rebuild
- App: ZIPSPEED by AnakinYoo
- Package: `com.aistudio.zipspeed.zskt`
- Version: `74.0.0`
- versionCode: `74`
- Active UI/runtime source: `web/` only
- Native branding: launcher icon + splash resources wired; exact Canva raster export remains TO VERIFY
- v74 UI polish: compact header/hero, title-left/value-right metric cards, tab scroll snap + active-tab centering
- Old root UI, `app/applet`, and committed Android web-asset mirrors: removed

## Gates
- Source audit: PASS in CI
- Unit tests: PASS in CI
- Static build: PASS in CI
- Runtime HTTP smoke: PASS in CI
- Real-network endpoint smoke: PASS on main
- Android lint/debug build: PASS in CI
- Android release bundle compile: PASS in CI
- Release-source evidence: PASS in CI
- Play-source evidence: PASS in CI
- Android emulator runtime: PASS
- v74 browser interaction: **PASS including 320 px active-tab visibility + complete TH/EN tab translations**
- v74 physical portrait UI: **PASS on RMX3241 / 1080×2400 / font scale 1.15**
- v74 cold-start shell visible by 1.5 s and fully initialized by 3 s in the observed RMX3241 run
- Physical Android Wi-Fi runtime: **PASS on RMX3241**
- Physical Quick Single + Multi (4) on Wi-Fi: **PASS on RMX3241**
- Physical Android 4G/LTE runtime: **PASS on Xiaomi 23078PND5G / Android 16**
- Physical Quick Single on 4G/LTE: **PASS with persisted real-data History/provenance**

## TO VERIFY
- New physical v74 GO/real-network completion on RMX3241 (ADB touch mapped to a system gesture during this inspection; no fake PASS recorded)
- Signed Play-uploadable AAB
- Live Play Console state/declarations
- Successful upload/review/publication
- Physical Android 5G runtime
- Broader physical-device/OEM WebView coverage
- Accessibility on physical device
- Final Data Safety classification
- Exact Canva raster parity
