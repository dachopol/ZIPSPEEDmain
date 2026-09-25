# Physical Device Validation — 2026-09-26

Status: **PASS for one physical Wi-Fi device / NOT universal coverage**

## Device / build

- Model: RMX3241
- Android-reported display size: 1080×2400
- Package: `com.aistudio.zipspeed.zskt`
- versionName: `73.0.0`
- versionCode: `73`
- targetSdk: `36`
- Source baseline: `8a6c1c18abcdc34db906ff58104cb22d24267050`
- CI baseline: #147 — 10/10 PASS

No device serial is stored in this report.

## Physical runtime checks

| Check | Result |
|---|---|
| App launch | PASS |
| Visible v73.0.0 badge | PASS |
| Portrait layout | PASS |
| Landscape layout | PASS |
| Tab strip scroll / History / Settings / Ad-free reachability | PASS |
| Quick profile visible | PASS |
| Standard adaptive option visible | PASS |
| Single option visible | PASS |
| Multi (4) option visible and selectable | PASS |
| Auto server option | PASS |
| TH / EN language selector visible | PASS |
| GO → STOP state | PASS |
| Live gauge movement | PASS |
| Quick Single completion | PASS |
| Quick Multi completion | PASS |
| History persistence | PASS |
| Real-data provenance in WebView localStorage | PASS |
| No-touch auto-run reproduction | NOT REPRODUCED |

## Evidence notes

A completed physical Multi record was read from the debug WebView localStorage:
- timestamp: `2026-09-25T19:21:31.653Z`
- profile: `quick`
- connection: `multi`
- serverId: `cloudflare-auto`
- download: 17.67 Mbps
- upload: 6.94 Mbps
- idle latency: 200.4 ms
- download-loaded latency: 135.9 ms
- requested payload: 4 MiB
- HTTP probe failures: 0 / 3

These numbers are evidence from one real run only. They are not benchmark, ISP-quality, accuracy, or marketing claims.

Multiple nearby History rows were observed during interactive device testing. Source inspection found only one `runTest` trigger: the GO button click. A controlled 20-second period with no ADB touch input did not create a new History record, so automatic repeated testing was **not reproduced**.

## Remaining physical-device gaps

- 4G validation
- 5G validation
- physical accessibility checks
- additional OEM/WebView devices
- long-session/battery behavior

This report does not replace signed Play release testing.
