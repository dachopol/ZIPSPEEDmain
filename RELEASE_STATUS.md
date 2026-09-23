# Zipspeed Release Status

Updated: 2026-09-23

## Source candidate
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Candidate versionName/versionCode: read from the canonical `package.json`.
- Android Gradle derives both values from that file.
- Preview displays the same version at runtime from the mirrored `package.json`.

## Google Play Console evidence currently available
- Track observed: Internal testing.
- Latest observed Play versionCode: **42**.
- Observed release label: **0.0.0.42 / bundle 42**.
- Target SDK shown by Play Console: **36**.
- Package ID matches current source.

The current candidate versionCode in `package.json` must remain higher than the observed Play versionCode before upload; CI validates the source/build linkage but does not prove Play upload.

## Not yet verified
- Runtime Preview of the latest source after this update.
- Release signing for the current candidate.
- Android Publisher authorization from AI Studio.
- Successful AAB upload/commit to Play Console.
- Data Safety against current behavior.
- Privacy Policy against current behavior.
- Store screenshots from the current runtime.

A debug APK or release compile is not a Play publication result.
