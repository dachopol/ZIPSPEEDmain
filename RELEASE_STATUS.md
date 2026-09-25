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
- Source audit: run in CI
- Unit tests: run in CI
- Static build: run in CI
- Runtime HTTP smoke: run in CI
- Real-network endpoint smoke: run on main push
- Android lint/debug build: run in CI
- Android release bundle compile: run in CI
- Release-source evidence: run in CI
- Play-source evidence: run in CI

## TO VERIFY
- Signed Play-uploadable AAB
- Live Play Console state/declarations
- Successful upload/review/publication
- Physical Android Wi-Fi/cellular runtime
- Accessibility on physical device
