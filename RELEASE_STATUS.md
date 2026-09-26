# ZIPSPEED Release Status

## Current rebuild
- App: ZIPSPEED by AnakinYoo
- Package: `com.aistudio.zipspeed.zskt`
- Version: `75.0.0`
- versionCode: `75`
- Active UI/runtime source: `web/` only
- Native branding: launcher icon + splash resources wired; exact Canva raster export remains TO VERIFY
- v75 UI polish: v74 compact Speed hierarchy plus harmonized Video / Status / History / Settings / Ad-free cards
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
- Release-source evidence: PASS in CI
- Play-source evidence: PASS in CI
- Android emulator runtime: PASS
- v75 browser interaction: **PASS including 320 px active-tab visibility + secondary-page layout + complete TH/EN tab translations**
- v75 physical home UI: **PASS on RMX3241 / 1080×2400**
- Physical Android Wi-Fi runtime: **PASS on RMX3241**
- Physical Quick Single + Multi (4) on Wi-Fi: **PASS on RMX3241**
- Physical Android 4G/LTE runtime: **PASS on Xiaomi 23078PND5G / Android 16**
- Physical Quick Single on 4G/LTE: **PASS with persisted real-data History/provenance**

## TO VERIFY
- Physical v75 secondary-tab switching on RMX3241 (ADB tap injection did not activate WebView tabs; browser gate is PASS, no fake physical PASS recorded)
- New physical v75 GO/real-network completion on RMX3241
- Signed Play-uploadable AAB
- Live Play Console state/declarations
- Successful upload/review/publication
- Physical Android 5G runtime
- Broader physical-device/OEM WebView coverage
- Accessibility on physical device
- Final Data Safety classification
- Exact Canva raster parity
