# Zipspeed Release Status

Updated: 2026-09-23

## TEST BUILD
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Candidate version/versionCode: canonical `package.json`.
- Current release posture: **testing-track candidate**, not production-ready by claim.

## PASS — source/build evidence
- Web/unit/static build gates.
- Browser runtime/responsive/accessibility gates.
- Real-network Single + Multi smoke.
- Android lint/debug build.
- Android release bundle compile.
- Release-source evidence gate.
- Play Console test-source gate.
- targetSdk 36 / compileSdk 36.
- Android permissions limited to INTERNET + ACCESS_NETWORK_STATE.
- No current AdMob/Google Mobile Ads/Play Billing dependency.

## FIX — external Privacy Policy
The inspected external policy is stale relative to the current build. Exact replacement guidance remains in `PRIVACY_POLICY_UPDATE_v70.md`. The separate privacy-policy repository is not changed by this commit.

## TO VERIFY — Play Console
- Live highest versionCode/drafts.
- Account type and whether the 12-testers/14-days production-access rule applies.
- Developer identity + package registration.
- Closed-test tester continuity if applicable.
- Privacy Policy field + final policy content.
- Data Safety for the active track.
- Ads declaration, App access, Target audience and IARC content rating.
- Play App Signing/upload key and signed AAB.
- Current-build store listing assets and pre-launch report.

## UNVERIFIED
- Signed Play-uploadable AAB.
- Successful Play upload/review/publication.
- Physical Android Wi-Fi/cellular/TalkBack runtime.
