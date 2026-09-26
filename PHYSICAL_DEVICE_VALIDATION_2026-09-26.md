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

## v74 UI validation — RMX3241

- Build: **v74.0.0 / versionCode 74 / targetSdk 36**
- Physical display: **1080×2400**
- Observed system font scale: **1.15**
- Installation: clean install was required because the installed v73 CI debug certificate did not match the v74 CI debug certificate.
- Safety backup retained on the development PC: installed v73 APK + app data tar.
- Portrait visual load: PASS.
- Header/brand/version badge: PASS.
- Main tabs in initial home state: Speed / Video / Status / Map are fully readable; the previously observed half-cut Map label was not reproduced.
- Compact hero exposes the first result card within the initial phone viewport.
- Metric cards use title-left / value-right layout.
- Second cold-launch observation: shell visible at ~1.5 seconds, fully initialized v74 UI at ~3 seconds.
- Browser CI #154 separately proves active far-right tab auto-scroll at 320 px and complete TH/EN tab translation hooks.
- **TO VERIFY:** new physical v74 GO/real-network completion. ADB touch coordinates triggered a system/app gesture instead of the GO control, so no physical v74 network PASS is claimed.



## v75 home UI validation — RMX3241

- Build reported by Android: **v75.0.0 / versionCode 75 / targetSdk 36**
- Display: **1080×2400**
- Home portrait render: PASS.
- Header/version badge/Speed hero/first metric card: PASS.
- CI #157 separately proves Video / Status / History / Settings / Ad-free responsive layout at 320 px, active-tab auto-scroll, and TH/EN tab completeness.
- Physical secondary-tab switching: **TO VERIFY**. ADB tap injection did not activate the WebView tab controls during this inspection, so no physical PASS is claimed.


## v75 secondary-page visual validation — RMX3241

- Video: PASS
- Status: PASS
- History: PASS
- Settings: PASS
- Ad-free: PASS
- Physical tab strip scroll and activation: PASS after mapping ADB coordinates to the actual 1080×2400 screenshot scale.
- No horizontal card overflow was observed in the captured portrait pages.

## v76 Video readability — RMX3241

- Build: **v76.0.0 / versionCode 76 / targetSdk 36**
- Display: **1080×2400**
- Video page: PASS.
- 720p / 1080p / 4K are visually separated from `เกณฑ์อ้างอิง 3 / 5 / 25 Mbps`.
- The previous concatenated appearance such as `720pthreshold 3 Mbps` is not reproduced.
- This remains a throughput-derived suitability estimate, not a real playback measurement.


## v76 Quick + Single Wi-Fi — RMX3241

- Build: **v76.0.0 / versionCode 76 / targetSdk 36**
- Network: Android reported **Wi-Fi / INTERNET / VALIDATED**
- GO → STOP state: PASS
- Completed result returned to GO: PASS
- History persistence: PASS
- Provenance: `quick / single / cloudflare-auto`
- timestamp: `2026-09-26T02:00:33.483Z`
- download: 15.63 Mbps
- upload: 15.13 Mbps
- idle latency: 278.5 ms
- download-loaded latency: 178.6 ms
- upload-loaded latency: 185.4 ms
- HTTP probe failures: 0 / 3

The measured values are evidence from one real run only and are not an ISP-quality, benchmark-accuracy, or marketing claim.


## 5G capability check — RMX3241

- Telephony feature set present.
- Active SIM/operator state was in service.
- Telephony registration reported `isNrAvailable=true` and `isEnDcAvailable=true`.
- Wi-Fi was disabled temporarily to force normal cellular selection.
- Active radio/data technology remained **LTE** during the check.
- Wi-Fi was restored after verification.
- Status: **5G CAPABILITY OBSERVED / 5G RUNTIME TO VERIFY**.

## OEM / tablet candidate — Xiaomi 2410CRP4CG

- Android: **16 / API 36**
- Physical size reported by Android: **2136×3200**
- Network: validated Wi-Fi
- Cellular service: out of service / network type unknown during inspection
- Zipspeed package was not present before testing.
- Clean v76 installation attempt returned `INSTALL_FAILED_USER_RESTRICTED: Install canceled by user`.
- No attempt was made to bypass the device restriction.
- Status: **TO VERIFY after user-approved installation**.


## v77 Quick + Single Wi-Fi — RMX3241

- Build: **v77.0.0 / versionCode 77 / targetSdk 36**
- Network: **Wi-Fi / INTERNET / VALIDATED**
- GO → STOP: PASS
- Completion verification: persisted Zipspeed WebView History/provenance
- timestamp: `2026-09-26T02:25:18.668Z`
- download: 17.15 Mbps
- upload: 11.26 Mbps
- idle latency: 89.2 ms
- download-loaded latency: 100.8 ms
- upload-loaded latency: 138.5 ms
- HTTP probe failures: 0 / 3
- provenance: `quick / single / cloudflare-auto`

The foreground switched to another app after the run; no completion claim is based on that screenshot. The PASS is based on Zipspeed's persisted completed-result record.

The measured values are one-run evidence only and are not an ISP-quality, benchmark-accuracy, or marketing claim.
