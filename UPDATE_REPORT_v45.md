# Zipspeed v45 Update Report

Date: 2026-09-22

## PASS
- Real-data measurement flow preserved.
- Single GO/STOP primary action enforced.
- Root / AI Studio applet / Android asset HTML synchronized.
- TH/EN copy added for Status / Map-safe / Settings.
- Minimal 3D white-clay UI with blue accent #3B82F6 applied.
- Version synchronized to 45.0.0 / versionCode 45.
- GitHub Actions web quality gate passed: audit + unit tests + static build.
- Android debug build passed with AGP 9.1.1, Gradle 9.3.1, JDK 17.
- Android WebView source hardened.
- Android backup disabled.

## FIX
- Removed duplicate START TEST control.
- Fixed initial CI failure caused by npm cache requiring a missing lockfile.
- Switched CI to Node 24 without npm cache dependency.
- Added Android assembleDebug verification.
- Added truthful Status / Map-safe / Settings panels.
- Map-safe never fabricates coordinates or a map pin.

## GAP
- No emulator screenshot evidence yet.
- No physical-device network accuracy evidence yet.
- No signed release AAB yet.
- AdMob / Play Billing are not implemented and are not simulated.

## ASSUMPTION
- Cloudflare public speed endpoints remain the intended test provider.
- History remains device-local WebView storage.

## TO VERIFY
- Download and install debug APK on a real Android device.
- Small-screen, large-font and orientation behavior.
- GO/STOP on Wi-Fi and cellular.
- AI Studio pull/sync rendering.
- Final Privacy Policy / Data Safety before release.

## UNVERIFIED
- Real-device accuracy.
- Release signing.
- Release AAB.
- Play Console upload/review.

## N/A
- ICMP packet loss.
- GPS/server-coordinate map.
- AdMob/Billing in this commit.
