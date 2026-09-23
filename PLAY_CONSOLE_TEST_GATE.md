# Zipspeed Play Console Test Gate

Policy snapshot: **2026-09-23**  
Current project role: **TEST BUILD / testing-track candidate**

This document separates source-verifiable requirements from Play Console/account requirements. It is not evidence that Google Play approved the app.

## PASS — source/build aligned
- Package/Application ID remains `com.aistudio.zipspeed.zskt`.
- Mobile `targetSdk = 36`, matching the Google Play requirement in force from 2026-08-31 for new apps and updates.
- `compileSdk = 36`.
- Canonical version/versionCode come from `package.json`.
- Cleartext traffic is disabled.
- Android source requests only INTERNET + ACCESS_NETWORK_STATE.
- CI includes Android App Bundle compile with `:app:bundleRelease`.
- Current source contains no AdMob/Google Mobile Ads or Play Billing dependency.
- In-app Privacy & Data transparency exists.

## TEST-TRACK RULES
- Internal testing can be used for early trusted testing.
- Data Safety is not required while an app is **exclusively** active on internal testing, but becomes required for closed/open/production tracks.
- For qualifying newly created personal developer accounts, production access requires a closed test with **at least 12 testers opted in continuously for the preceding 14 days**, followed by an application for production access.
- This account-specific requirement is **TO VERIFY** because repository source cannot determine account type/creation date.

## TO VERIFY — Play Console
- Current live highest versionCode / drafts.
- Developer identity verification.
- Package-name registration before/under the 2026-09-30 requirement.
- Play App Signing and upload key.
- Correctly signed uploadable AAB.
- Privacy Policy URL and current policy text.
- Data Safety answers for the track being used.
- Ads declaration matching the uploaded build.
- App access declaration/reviewer instructions.
- Target audience and content.
- IARC content rating.
- Store listing icon/screenshots/descriptions from the current build.
- Physical Android testing and pre-launch report issues.

## Current build declaration guidance
Because the current source has **no ads SDK and no billing SDK**, declarations for this test build must not claim those integrations are active. If Ads/Billing are added later, update source, privacy, Data Safety and Play declarations together.

## Important evidence boundary
`bundleRelease` passing proves compilation only. It does **not** prove signing, upload authorization, Play review acceptance or production readiness.

## Official policy references
- Target API requirements: https://support.google.com/googleplay/android-developer/answer/11926878
- Testing requirements for new personal accounts: https://support.google.com/googleplay/android-developer/answer/14151465
- User Data / Data Safety / Privacy Policy: https://support.google.com/googleplay/android-developer/answer/10144311
- Content ratings: https://support.google.com/googleplay/android-developer/answer/9898843
- Play App Signing: https://support.google.com/googleplay/android-developer/answer/9842756
- Package registration: https://support.google.com/googleplay/android-developer/answer/16984799
