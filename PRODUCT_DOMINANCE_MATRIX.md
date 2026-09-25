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


## Loop 2 — automated browser runtime proof

### Re-score after evidence
Browser runtime + Web/Android build evidence passed on 2026-09-23. Internal score moved from **68.6 → 73.6 / 100**. This does not count as Android real-device or Play release proof.



Goal: raise evidence quality in One-tap UX / Visual / Engineering without claiming real-device coverage.

Implemented:
- Chrome headless runtime execution against the actual local app server.
- Responsive checks at 320/360/412/768 px.
- Horizontal-overflow and key-overlap assertions.
- Version badge, navigation, theme/language and GO→STOP interaction assertions.
- Screenshot + JSON evidence artifacts.

Scoring rule:
- CI runtime PASS may raise browser-runtime evidence only.
- It does not count as real-device network measurement, native Android runtime or Play release evidence.


## Loop 3 — connection modes

### Re-score after evidence
v57 passed Web checks, Browser Runtime, Android lint/debug build and release compile. Internal score moved from **73.6 → 74.8 / 100**. Server/coverage remains the largest externally blocked GAP.



Selected after the server/coverage GAP was classified as externally blocked without additional authorized infrastructure.

Implementation target:
- Single mode = one real HTTP transfer stream.
- Multi mode = four concurrent real HTTP transfer streams.
- Total payload byte budget remains identical to the selected Quick/Standard profile.
- Result provenance records mode/stream count.
- Browser runtime must verify the Settings toggle.
- Score changes only after test/build/runtime evidence passes.


## Loop 4 — loaded latency and real-network proof

### Re-score after evidence
v58 passed Web checks, Browser Runtime, real-network Quick Single+Multi, Android lint/debug and release compile. Internal score moved from **74.8 → 79.0 / 100**. The score remains internal; it is not a public superiority claim.



Selected to raise Measurement / Diagnostics / Engineering evidence without inventing coverage infrastructure.

Implementation target:
- Start small HTTP latency probes while a real download transfer is active.
- Report loaded HTTP latency only when real samples exist.
- Run completed Quick Single and Multi tests against the actual measurement endpoint in CI on main pushes.
- Verify saved-result provenance and finite core metrics.
- Re-score only after the real-network job passes.


## Loop 5 — privacy and release evidence

Selected because Trust / Engineering can improve from source-backed evidence while Server/Coverage remains externally constrained.

Implementation target:
- Visible privacy facts must match current source behavior.
- CI must detect Android permission drift.
- CI must detect introduction of Ads/Billing dependencies before declarations are updated.
- Produce machine-readable release evidence.
- Keep external Privacy Policy, Play Data Safety, signing and Play upload explicitly TO VERIFY/UNVERIFIED until checked.
- Re-score only after v59 source/build/runtime/release evidence passes.


## Loop 6 — history intelligence + CSV

Baseline after Loop 5: **79.0 / 100** pending v59 re-score refinement; v59 CI evidence is PASS.

Selected because Server/Coverage remains externally blocked and History/Share/Export can improve with truthful local data.

Implementation target:
- Compare the latest result only with the previous completed result using the same profile and connection mode.
- Show download/upload percentage delta and latency delta without claiming causation.
- Export completed history as CSV in addition to JSON.
- Keep all analysis local and add no new tracking/data destination.
- Re-score only after v60 unit/build/browser-runtime evidence passes.


## Loop 7 — load impact + IP version

Baseline after Loop 6: **80.2 / 100** internal evidence-based score.

Selected because Server/Coverage remains externally blocked while Measurement/Diagnostics can still improve from existing real measurements.

Implementation target:
- Derive loaded-latency delta from measured loaded minus idle HTTP latency.
- Label Low/Moderate/High as Zipspeed product thresholds, not universal standards.
- Display IPv4/IPv6 only when provider-returned client IP supports the classification.
- Re-score only after v61 automated and real-network evidence passes.


## Loop 8 — measurement evidence

Baseline after Loop 7: **81.5 / 100** internal evidence-based score.

Implementation target:
- Persist validated payload bytes and monotonic timing evidence for completed tests.
- Persist endpoint ID/provider and mode provenance while keeping IP/ISP out of local history.
- Expose the evidence in History and exports.
- Raise Measurement Truth / Trust only after real-network and build evidence passes.


## Loop 9 — accessibility proof

### Re-score after Loop 9
v63 latest-source CI passed after correcting the 320px touch-target regression. Internal evidence score: **84.0 / 100**. Physical-device accessibility remains unverified.

Baseline after Loop 8: **82.6 / 100** internal evidence-based score.

Implementation target:
- Enforce 44px-class visible interactive targets.
- Verify accessible names and duplicate-ID absence at runtime.
- Verify keyboard focus visibility.
- Raise One-tap UX / Visual / Engineering evidence only after CI passes.


## Loop 10 — failure/offline proof

Baseline after Loop 9: **83.8 / 100** internal evidence-based score.

Implementation target:
- Prove offline measurement failure returns GO to a non-running state.
- Prove incomplete/failed tests never enter completed History.
- Preserve a visible error state and restore network for subsequent interaction tests.
- Raise Engineering / Trust evidence only after runtime CI passes.


## Loop 10 — verified provider discovery

Baseline: **84.0 / 100** internal evidence-based score.

Selected to improve Server / Coverage capability without inventing regions or silently enabling a privacy-sensitive measurement provider.

Implementation target:
- Use M-Lab Locate API v2 only after an explicit user action.
- Display only server data returned by Locate v2.
- Do not retain access-token URLs.
- Do not run NDT7 measurement in this build.
- Add privacy/CSP/release evidence for the new optional network destination.
- Real-network CI must prove Locate discovery returns at least one server.
- Re-score only after v64 gates pass.


## Loop 11 — region-aware provider discovery

### Re-score after Loop 10
v64 passed all automated gates including a real M-Lab Locate API discovery. Internal evidence score moved from **84.0 → 85.6 / 100**. This reflects discovery capability only, not M-Lab measurement capability.

Implementation target:
- Optional explicit ISO country code for M-Lab Locate v2.
- Use strict country targeting only from user input.
- Never infer region from app language or currency.
- Keep NDT7 measurement disabled.
- Re-score only after v65 automated gates pass.


## Loop 12 — browser network context

### Re-score after Loop 11
v65 passed all automated gates. Internal evidence score moved from **85.6 → 86.4 / 100**. Region-aware discovery improved verified discovery usability but still does not count as M-Lab measurement coverage.

Implementation target:
- Show browser connection hints only when provided by the runtime.
- Label downlink/RTT as browser estimates, not measured Zipspeed results.
- Store none of these fields in History.
- Add no permission and no new destination.
- Re-score only after v66 gates pass.


## Loop 13 — three-phase latency

### Re-score after Loop 12
v66 passed all automated gates. Internal evidence score: **87.0 / 100**. Current external benchmark remains **89.6 / 100** using the same 9-grid model; this is an internal product comparison, not a public accuracy claim.

Current benchmark evidence still includes idle/download/upload latency, global server coverage, video testing, coverage maps and service-status features. Zipspeed does not receive credit for unsupported capabilities.

Implementation target:
- Keep idle HTTP latency separate.
- Keep download-loaded HTTP latency separate.
- Add upload-loaded HTTP latency only from probes started while upload requests are active.
- Persist sample count and loaded-minus-idle delta when measurable.
- Add real-network evidence checks for both Single and Multi.
- Re-score only after v67 gates pass.


## Loop 13 — comparable history consistency

### Re-score after Loop 12
v66 passed all automated gates. Internal evidence score moved from **86.4 → 87.3 / 100**. Browser context is evidence-labeled and does not count as measured throughput.

Implementation target:
- Analyze only local completed tests matching the latest profile + connection mode.
- Show sample count and median download/upload/latency plus download spread.
- Use at most five recent comparable records.
- Make no continuous-monitoring or causal claim.
- Add no network destination or permission.
- Re-score only after v67 gates pass.


## Loop 14 — bidirectional throughput consistency

### Re-score after Loop 13
v67 passed all automated gates. Internal evidence score moved from **87.0 → 88.1 / 100**. The score remains internal and does not imply superiority in global coverage, video testing or outage data.

Implementation target:
- Add upload interval-throughput samples from actual uploaded bytes and elapsed time.
- Keep download and upload consistency separate.
- Persist upload variation/min/max/sample count only when enough samples exist.
- Add real-network evidence guards.
- Re-score only after v68 gates pass.


## Loop 15 — explainable measured concern

### Re-score after Loop 14
v68 passed all automated gates. Internal evidence score moved from **88.1 → 89.0 / 100**. Current benchmark remains **89.6 / 100**.

Implementation target:
- Identify the largest deviation only from documented Zipspeed diagnostic thresholds.
- Show measured value and threshold directly.
- Never label the result as proven root cause.
- Add unit/runtime evidence.
- Re-score only after v69 gates pass.


### Re-score after Loop 15
v69 passed Web/unit/build, Browser Runtime, real-network Single+Multi, M-Lab discovery, Android lint/debug/release compile and release-source checks.

**Internal evidence score: 89.8 / 100**  
**Current benchmark target: 89.6 / 100**  
**Delta: +0.2**

This satisfies the iterative competitive-loop score condition under the current 9-grid rubric. It is an internal product assessment only and must not be presented as a public claim that Zipspeed is more accurate, faster, safer or universally better than another product.

Remaining capability gaps are still real:
- global multi-provider measurement coverage,
- real playback-quality testing,
- verified coverage-map dataset,
- physical Android runtime/accessibility evidence,
- signed Play publication.

The competitive score loop can pause at this point. Release work remains governed by `/build → /runtime → /release-check → /final` and the external blockers above.


## Loop 16 — benchmark refresh 2026-09-25

Evidence date: **2026-09-25**

Current-source verification:
- Zipspeed v73.0.0 / versionCode 73.
- Main HEAD before this documentation update: `14954b99451059c2131913720b267ca5c969bf28`.
- CI #146: **PASS 10/10**, including browser interaction, real-network smoke, Android debug/lint, release bundle compile, and Android emulator runtime.
- v73 native branding is validated, but no new screenshot/user-test evidence justifies increasing the Visual score.

Competitor refresh from current official product listings:
- Speedtest by Ookla still documents one-tap testing, download/upload/ping/jitter, real-time consistency graph, single/multi connection tests, global server network, video test, coverage map, history and sharing.
- Opensignal now documents Connectivity Assistant in addition to speed/ping, a real 15-second video playback test and network coverage maps.
- FAST remains a streamlined ad-free benchmark; FAST.com exposes download/upload plus unloaded and loaded latency.
- Meteor continues to combine speed/latency with app-performance interpretation and network coverage.

Scoring decision:
- Zipspeed remains **89.8 / 100**. No planned or cosmetic-only credit is added.
- Highest fully scored competitor benchmark remains **89.6 / 100 (Speedtest by Ookla)** under the existing rubric.
- Delta remains **+0.2**.
- Opensignal is flagged as a stronger current Diagnostics / Use-case reference because of Connectivity Assistant, but its total score is **TO VERIFY** until the same full 9-grid evidence process is rerun; listing-only evidence is not converted into invented points.

Top-3 remaining product GAP:
1. Authorized multi-region/global measurement coverage.
2. Real playback-quality testing with licensed/owned media and defined methodology.
3. Verified coverage-map dataset.

Decision:
- Competitive score loop remains at the exit condition.
- Do not add fake regions, packet loss, coverage maps or video-test results to widen the score margin.
- Next score movement requires new evidence, not design intent.
