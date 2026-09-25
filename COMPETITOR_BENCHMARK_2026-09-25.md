# Competitive Benchmark Refresh — 2026-09-25

Status: EVIDENCE REFRESH / INTERNAL PRODUCT ASSESSMENT  
Project: ZIPSPEED by AnakinYoo  
Rubric: `PRODUCT_DOMINANCE_MATRIX.md`

## Evidence rule

This refresh uses the same locked 9-grid weights. Public store stars/download counts are market context only and are not converted into quality points. Missing runtime evidence remains GAP / TO VERIFY / UNVERIFIED.

## Current Zipspeed evidence

- Version: **73.0.0**
- versionCode: **73**
- Package: `com.aistudio.zipspeed.zskt`
- Main source before this documentation-only commit: `14954b99451059c2131913720b267ca5c969bf28`
- CI #146: **10/10 PASS**
- Browser runtime: PASS
- Real-network smoke: PASS
- Android debug/lint: PASS
- Android release bundle compile: PASS
- Android emulator runtime: PASS
- Native launcher/splash branding: PASS
- Physical Android Wi-Fi/4G/5G: TO VERIFY
- Signed Play upload/publication: TO VERIFY

## Current official competitor evidence

### Speedtest by Ookla
Official Google Play listing:
https://play.google.com/store/apps/details?id=org.zwanoo.android.speedtest

Current listing evidence includes:
- one-tap internet speed test;
- download, upload, ping and jitter;
- real-time connection-consistency graph;
- single-connection and multi-connection modes;
- global server network;
- video test;
- mobile coverage maps;
- detailed result history and sharing.

### Opensignal
Official Google Play listing:
https://play.google.com/store/apps/details?id=com.staircase3.opensignal

Current listing evidence includes:
- download/upload/ping testing;
- Connectivity Test + Connectivity Assistant;
- real 15-second video playback test measuring load/buffering/playback behavior;
- network coverage maps using user-contributed signal/speed data;
- operator/network context and history.

### FAST
Official sources:
https://play.google.com/store/apps/details?id=com.netflix.Speedtest
https://fast.com/

Current evidence includes:
- streamlined ad-free test;
- global testing through Netflix infrastructure;
- download speed focus;
- upload speed and unloaded/loaded latency in expanded FAST.com information;
- configurable parallel connections/test duration on FAST.com.

### Meteor
Official Google Play listing:
https://play.google.com/store/apps/details?id=meteor.test.and.grade.internet.connection.speed

Current listing evidence includes:
- download/upload/latency;
- app-performance interpretation for popular apps/games;
- mobile/Wi-Fi testing;
- network coverage information;
- ad-free positioning.

## 9-grid scoring decision

| Item | Result |
|---|---:|
| Zipspeed internal evidence score | **89.8 / 100** |
| Highest fully scored competitor benchmark retained | **89.6 / 100 — Speedtest by Ookla** |
| Delta | **+0.2** |
| Evidence date | **2026-09-25** |

The Zipspeed score is intentionally unchanged from the last validated re-score. v73 improved native branding and startup integration, but this refresh has no new screenshot/user-study evidence sufficient to award extra Visual points.

Opensignal's Connectivity Assistant strengthens it as a current Diagnostics / Use-case reference. A new exact total for Opensignal is **TO VERIFY** because a store listing alone is not enough to assign new numeric points across all nine grids.

## Top-3 remaining GAP

1. **Server / coverage capability** — Zipspeed still lacks authorized worldwide/multi-region measurement infrastructure.
2. **Real playback testing** — current Video surface is an explicitly labeled throughput-derived suitability estimate, not a licensed playback test.
3. **Coverage map dataset** — no verified crowd-sourced/operator coverage dataset is implemented.

## Result

The competitive-loop exit condition remains satisfied under the current fully scored benchmark: **89.8 ≥ 89.6**.

This does **not** mean Zipspeed is universally more accurate, faster, safer or better than any competitor. The numbers are internal rubric scores based on available evidence.

Do not increase the score again until new capability and matching test/runtime evidence exist.
