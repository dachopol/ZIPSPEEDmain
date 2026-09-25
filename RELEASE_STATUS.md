# ZIPSPEED Release Status

## Current rebuild
- App: ZIPSPEED by AnakinYoo
- Package: `com.aistudio.zipspeed.zskt`
- Version: `73.0.0`
- versionCode: `73`
- Active UI/runtime source: `web/` only
- Native branding: launcher icon + splash resources wired; exact Canva raster export remains TO VERIFY
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
- Physical Android Wi-Fi runtime: **PASS on RMX3241**
- Physical Quick Single + Multi (4) on Wi-Fi: **PASS on RMX3241**
- Physical Android 4G/LTE runtime: **PASS on Xiaomi 23078PND5G / Android 16**
- Physical Quick Single on 4G/LTE: **PASS with persisted real-data History/provenance**

## TO VERIFY
- Signed Play-uploadable AAB
- Live Play Console state/declarations
- Successful upload/review/publication
- Physical Android 5G runtime
- Broader physical-device/OEM WebView coverage
- Accessibility on physical device
- Final Data Safety classification
- Exact Canva raster parity
