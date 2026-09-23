# Zipspeed 9-Grid Product Dominance Matrix

Status: evaluation framework / not a marketing claim  
Updated: 2026-09-23

## Purpose
Use one repeatable model to compare Zipspeed with relevant speed-test/network-diagnostics products without fabricating superiority.

| Grid | Weight | Zipspeed evidence source |
|---|---:|---|
| Measurement truth / reliability | 18% | `src/measurement.mjs`, unit tests, runtime measurement |
| Server / coverage capability | 15% | `src/servers.mjs`, authorized endpoint evidence |
| One-tap UX / readability | 14% | GO/STOP flow, responsive runtime |
| Visual hierarchy / premium depth | 10% | current UI/CSS/runtime screenshots |
| Diagnostics / network context | 10% | provider metadata + measured HTTP state |
| History / share / export | 8% | local history/share/export implementation |
| Use-case interpretation | 8% | `src/quality.mjs` + documented thresholds |
| Engineering / runtime / release | 10% | CI, real-device runtime, release checks |
| Trust / privacy / transparency | 7% | code behavior, permissions, Privacy/Data Safety evidence |

## Current evidence boundaries
- Zipspeed uses a verified real measurement endpoint registry, but only one endpoint is currently registered.
- Health Index and use-case suitability are deterministic product derivations; they are not universal standards or real playback/game tests.
- No verified coverage dataset is currently implemented.
- No real video playback-quality test is currently implemented.
- Build evidence does not substitute for real-device runtime evidence.
- Play publication/signing remains a separate release gate.

## GAP selection rule
Prioritize high-weight missing capability only when a truthful data source is available. Never add fake regions, coordinates, packet loss, coverage, ads, billing, playback results or server status merely to improve a score.

## Product formula
**X = Truth + Y = Experience + Z = Proof**

The intended advantage is not “more features at any cost.” It is useful measured information, lower friction and evidence-backed behavior.
