# Zipspeed Release Status

Updated: 2026-09-23

## Source candidate
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Candidate versionName/versionCode: canonical `package.json`.
- Gradle and Preview derive version from that source.

## PASS — source/build evidence
- Web/unit/static build gates.
- Browser runtime/responsive/accessibility gates.
- Real-network Single + Multi smoke.
- Optional M-Lab Locate discovery smoke.
- Android lint/debug build.
- Android release bundle compile.
- Release-source evidence gate.
- Android permission source = INTERNET + ACCESS_NETWORK_STATE.
- No current AdMob/Google Mobile Ads/Play Billing dependency.

## FIX — external Privacy Policy
The inspected external policy is stale relative to the current build. It still claims Advertising ID, AdMob/Firebase Analytics and optional ACCESS_FINE_LOCATION. Those claims do not match current source.

Exact replacement guidance is in `PRIVACY_POLICY_UPDATE_v70.md`.

Per Remote Safety rules, the separate `dachopol/privacy-policy` repository has **not** been modified by this release-check pass.

## TO VERIFY — Play Data Safety
Implementation-backed draft evidence is in `DATA_SAFETY_DRAFT_v70.md`.
Final answers still require review against current Google Play definitions and the final published Privacy Policy.

## UNVERIFIED — signing / Play publication
- Current Gradle has no explicit release signing configuration.
- A successful `bundleRelease` compile is not evidence of a signed Play-uploadable AAB.
- Android Publisher authorization and successful Play upload are unverified.
- Physical Android Wi-Fi/cellular runtime and TalkBack remain unverified.
- Store screenshots from the current build remain TO VERIFY.

## Last observed Play evidence
- Track observed: Internal testing.
- Last observed Play versionCode: 42.
- Observed release label: 0.0.0.42 / bundle 42.
- Target SDK observed: 36.
- Package ID matched current source.

Live Play Console state remains TO VERIFY until fresh evidence is available.
