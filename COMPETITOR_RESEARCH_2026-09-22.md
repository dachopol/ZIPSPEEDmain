# Zipspeed Competitor Research — 2026-09-22

## Ranking method
This is a product-benchmark reference set, not a universal market-share claim.

Primary criterion: Google Play install band.
Tie-breaker: Google Play review volume.
Third criterion: direct relevance to speed-test / network-diagnostics use.

## Top references

| Rank | App | Google Play snapshot | Product signal useful to Zipspeed |
|---|---|---|---|
| 1 | Speedtest by Ookla | 100M+ installs; 4.6★; ~1.49M reviews | One-tap testing, download/upload/ping/jitter, realtime graph, global server depth, single/multi-connection modes |
| 2 | Opensignal Internet Speed Test | 10M+ installs; 4.2★; ~441K reviews | Mobile diagnostics, history, coverage context, video testing, Wi-Fi/cellular focus |
| 3 | FAST Speed Test | 10M+ installs; 4.2★; ~49.9K reviews | Extremely low-friction, streamlined, ad-free download-speed experience |

## Supplemental benchmark
Meteor Speed Test by Opensignal: 5M+ installs; 4.8★; ~134K reviews. Useful product idea: explain how measured connectivity relates to real app usage.

## Build implications for Zipspeed
- Keep one GO/STOP action and low-friction first screen.
- Keep realtime graph and measured download/upload/HTTP latency/jitter.
- Keep streaming suitability as an estimate derived from measured throughput.
- Do not fabricate global server selection; add it only when an authorized endpoint directory exists.
- Do not fabricate coverage maps or coordinates.
- Add user-controlled test profiles:
  - Quick: 3 MiB download + 1 MiB upload + 3 latency probes.
  - Standard: 10 MiB download + 5 MiB upload + 6 latency probes.
- Share only completed, history-eligible measured results.
- Differentiate on transparent methodology, privacy restraint, and explicit unknown/error states.

## Sources
Google Play listings observed 2026-09-22:
- Speedtest by Ookla — package org.zwanoo.android.speedtest
- Opensignal — package com.staircase3.opensignal
- FAST Speed Test — package com.netflix.Speedtest
- Meteor Speed Test — package meteor.test.and.grade.internet.connection.speed

Metrics change over time; re-verify before publishing market claims.
