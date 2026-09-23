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


## Mandatory improvement loop

After every substantial development round:

`Measure → 9-Grid Score → Top-3 GAP → X/Y/Z Prioritize → Implement → Test/Build/Runtime → Re-score → Repeat`

### Target
Use the highest evidence-supported competitor weighted score measured with the same rubric and evidence window as the target benchmark.

### Exit gate
The iteration may stop only when:
- Zipspeed weighted score is greater than or equal to the target;
- Truth/reliability/trust floors have not regressed;
- latest-source build is PASS;
- runtime-sensitive score claims have runtime evidence;
- remaining unsupported capabilities remain explicitly GAP rather than simulated.

### Evidence ledger template
| Loop | Evidence date | Zipspeed score | Target score | Delta | Top GAP | Proof |
|---|---|---:|---:|---:|---|---|
| current | TO VERIFY | TO VERIFY | TO VERIFY | TO VERIFY | TO VERIFY | build/runtime evidence required |

Scores in this ledger must be updated from evidence, never from planned work.


## Loop 1 — measured diagnostics

Evidence date: 2026-09-23

### Baseline before implementation
Internal evidence-based Zipspeed score: **65.8 / 100**.
This score is a product-assessment baseline, not a lab accuracy claim. Runtime-sensitive categories are capped because real-device runtime evidence is still incomplete.

Current target benchmark is Speedtest by Ookla based on its current Google Play feature evidence. Provisional 9-grid target: **89.6 / 100**. This target remains an internal benchmark and must not be used as a public superiority claim.

### Top GAP selected
1. Measurement/diagnostic explainability.
2. Runtime-sensitive UX proof.
3. Server/coverage capability.

Loop 1 implements GAP #1 because it is fully controllable under X + Y + Z without inventing infrastructure.

### Implemented
- Interval-throughput samples for the live trace.
- Throughput variation, min/max and sample count.
- Deterministic measured diagnostic flags.
- Actual-value threshold reasons for use-case results.
- Stale-result clearing at the beginning of a new test.

### Expected score impact
Only re-score after CI/runtime evidence. Planned work does not increase the score.
