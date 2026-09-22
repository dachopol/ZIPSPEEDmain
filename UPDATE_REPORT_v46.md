# Zipspeed v46 Update Report

Date: 2026-09-22

## PASS
- Real Data Only measurement logic preserved.
- One GO/STOP primary action preserved.
- Design tokens now exist in runtime CSS.
- Accent #3B82F6 locked.
- Main surface radius 28px locked.
- Glass blur 40px locked with unsupported-browser fallback.
- Tabular/lining numeric rendering added to measurement values.
- Compact-phone breakpoint added.
- Root / AI Studio applet / Android asset HTML remain mirrored in this commit.
- .gradle and build output paths are now ignored.

## FIX
- Runtime design tokens previously did not fully match DESIGN_SYSTEM.md.
- Measurement numbers previously used mono font but not explicit tabular numerals.
- Tracked .gradle cache/build artifacts are removed from repository source control.
- README version sections normalized.
- Version moved to 46.0.0 / versionCode 46.

## GAP
- Emulator visual screenshots are still missing.
- Physical Android device accuracy/usability test is still missing.
- Signed release AAB is still missing.
- AdMob / Billing are not implemented.

## ASSUMPTION
- Cloudflare speed endpoints remain the current test provider.
- Local history remains device-local storage.

## TO VERIFY
- GitHub Actions web audit/test/build.
- Android assembleDebug.
- AI Studio Pull/Preview.
- Small phone, large font, landscape, TH/EN.
- Real device Wi-Fi/cellular GO/STOP.

## UNVERIFIED
- Real-device network accuracy.
- Release signing/AAB.
- Play Console release.

## N/A
- Fake GPS/server map pins.
- ICMP packet loss.
