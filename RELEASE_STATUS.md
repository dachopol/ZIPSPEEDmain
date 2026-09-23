# Zipspeed Release Status

Updated: 2026-09-23

## Source candidate
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Candidate versionName/versionCode: canonical `package.json`.
- Gradle and Preview derive version from that source.

## Source-backed release evidence
The automated `release-source-check` verifies:
- Android permission set remains INTERNET + ACCESS_NETWORK_STATE.
- No camera, microphone or device-location Android permission is present.
- Current Gradle source contains no AdMob/Google Mobile Ads or Play Billing dependency.
- Completed history is localStorage-based.
- Client IP and ISP fields are not written into the saved-result object.
- Measurement endpoint list is extracted from current server registry.
- Privacy facts are visible in the current UI.

These checks describe current source only. They are not a Play Console approval or legal determination.

## Google Play Console evidence currently available
- Track observed: Internal testing.
- Latest observed Play versionCode: **42**.
- Observed release label: **0.0.0.42 / bundle 42**.
- Target SDK shown by Play Console: **36**.
- Package ID matches current source.

## TO VERIFY / UNVERIFIED
- **TO VERIFY:** External Privacy Policy matches current v59 behavior.
- **TO VERIFY:** Play Data Safety answers under current Play definitions and measurement-provider behavior.
- **UNVERIFIED:** release signing for current candidate.
- **UNVERIFIED:** Android Publisher authorization / successful AAB upload.
- **UNVERIFIED:** physical Android Wi-Fi/cellular runtime.
- **TO VERIFY:** Store screenshots from the current runtime.

A passing source/build/runtime gate is not a Play publication result.
