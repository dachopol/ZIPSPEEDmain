# Zipspeed Data Safety Evidence Draft — v70 candidate

Status: **DRAFT / TO VERIFY in Play Console**

This file is an implementation-evidence matrix, not a legal determination.

| Area | Current source evidence | Draft handling |
|---|---|---|
| Android permissions | INTERNET + ACCESS_NETWORK_STATE only | PASS source evidence |
| Camera | not requested | No |
| Microphone | not requested | No |
| Precise/coarse device location | not requested | No |
| Ads SDK | not present | No ads SDK in current build |
| Billing SDK | not present | No billing SDK in current build |
| Local test history | localStorage | Stored locally on device |
| Client IP in Zipspeed history | not stored | No |
| ISP in Zipspeed history | not stored | No |
| Browser network hints in history | not stored | No |
| Cloudflare measurement endpoint | network request destination | Provider may observe normal network/request metadata |
| M-Lab Locate API | optional user-triggered discovery | Provider may observe normal network/request metadata |
| M-Lab NDT7 measurement | disabled in current build | N/A current build |
| User share | user initiated | Destination chosen by user |
| Manual country input | used only for optional M-Lab strict discovery | TO VERIFY classification under current Play definitions |

## TO VERIFY before Play submission
- Current Google Play Data Safety definitions for network request metadata / IP address.
- Whether any provider behavior requires declaring collection or sharing under Play's current definitions.
- Exact external Privacy Policy URL after the v70-aligned text is published.
- Whether future Ads/Billing/Analytics dependencies are introduced before submission.

Do not copy this draft mechanically into Play Console without reviewing the then-current Play definitions and the final build.
