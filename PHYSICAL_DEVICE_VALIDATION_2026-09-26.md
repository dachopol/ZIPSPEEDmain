# Physical Device Validation — 2026-09-26

Status: **PASS on two physical devices: Wi-Fi + 4G/LTE / NOT universal coverage**

No device serial is stored in this report.

## Device A — RMX3241 / Wi-Fi

- Android-reported display size: 1080×2400
- Package: `com.aistudio.zipspeed.zskt`
- versionName: `73.0.0`
- versionCode: `73`
- targetSdk: `36`

| Check | Result |
|---|---|
| App launch | PASS |
| Visible v73.0.0 badge | PASS |
| Portrait layout | PASS |
| Landscape layout | PASS |
| Tab strip / History / Settings / Ad-free | PASS |
| Quick / Standard options | PASS |
| Single / Multi (4) options | PASS |
| Auto server | PASS |
| TH / EN selector | PASS |
| GO → STOP state | PASS |
| Live gauge movement | PASS |
| Quick Single completion | PASS |
| Quick Multi completion | PASS |
| History persistence | PASS |
| Real-data provenance | PASS |
| No-touch auto-run reproduction | NOT REPRODUCED |

Example completed Multi provenance:
- timestamp: `2026-09-25T19:21:31.653Z`
- profile: `quick`
- connection: `multi`
- serverId: `cloudflare-auto`
- download: 17.67 Mbps
- upload: 6.94 Mbps
- idle latency: 200.4 ms
- download-loaded latency: 135.9 ms
- HTTP probe failures: 0 / 3

## Device B — Xiaomi 23078PND5G / 4G LTE

- Manufacturer/model reported by Android: Xiaomi 23078PND5G
- Android: 16 / API 36
- Android-reported display size: 1220×2712
- Package: `com.aistudio.zipspeed.zskt`
- versionName: `73.0.0`
- versionCode: `73`
- targetSdk: `36`

Upgrade evidence:
- Device initially contained v71.0.0 / versionCode 71.
- v71 certificate did not match the v73 CI debug certificate, so in-place update was not possible.
- v71 APK and app data were backed up on the development PC before clean replacement.
- v73 clean installation was verified after replacement.

4G evidence:
- Status bar showed 4G+.
- Android connectivity reported `MOBILE[LTE] CONNECTED extra: internet`.
- Network capabilities reported `CELLULAR`, `INTERNET`, and `VALIDATED`.
- Quick + Single test completed and persisted History.

Latest completed 4G record:
- timestamp: `2026-09-25T20:37:39.833Z`
- profile: `quick`
- connection: `single`
- serverId: `cloudflare-auto`
- download: 20.43 Mbps
- upload: 12.97 Mbps
- idle latency: 101.4 ms
- idle jitter: 1.15 ms
- download-loaded latency: 334.3 ms
- download-loaded jitter: 47.6 ms
- upload-loaded latency: 130.1 ms
- requested payload: 4 MiB
- HTTP probe failures: 0 / 3

HyperOS/Android 16 blocked ADB input injection with `INJECT_EVENTS`; the user physically tapped GO. ADB remained available for package/version, screenshot, connectivity, and debug-app localStorage verification.

The measured numbers are evidence from individual real runs only. They are not benchmark, ISP-quality, accuracy, or marketing claims.

## Remaining physical-device gaps

- 5G validation
- physical accessibility checks
- additional OEM/WebView devices
- long-session/battery behavior

This report does not replace signed Play release testing.
