# Zipspeed Project Rules

Status: PROJECT-SPECIFIC OVERLAY / ACTIVE

Global owner master rule: `UNIVERSAL_APP_PROJECT_RULE.md`

This file intentionally contains only Zipspeed-specific requirements. Generic workflow, GitHub safety, responsive layout, security/privacy, build/release, stale-artifact cleanup, and competitor-scoring rules are defined once in `UNIVERSAL_APP_PROJECT_RULE.md` and are mandatory in full.

## Rule precedence

1. Latest explicit owner instruction.
2. `UNIVERSAL_APP_PROJECT_RULE.md` for universal/locked rules.
3. This file for Zipspeed-specific product and measurement requirements.
4. Supporting specifications such as `PRODUCT_DOMINANCE_MATRIX.md`, `DESIGN_SYSTEM.md`, and release/test documents.

When requirements overlap, apply the stricter requirement while preserving Real Data / Anti-Random behavior. Do not copy universal sections back into this file; reference the master rule instead.

## Project identity

- Product: **Zipspeed by AnakinYoo**
- Repository: **dachopol/ZIPSPEEDmain**
- Branch: **main**
- Package/Application ID: **com.aistudio.zipspeed.zskt**
- Product definition: **A mobile-first internet speed and network-health app that reports measured HTTP performance clearly without fabricated network facts.**
- Version/versionCode source: **`package.json`**. Do not hardcode a competing active version source.

## Zipspeed measurement truth — non-negotiable

- No fake, random, demo, or hardcoded values may be presented as measured network facts.
- If a value cannot be measured, display `--`, Unknown, ไม่ทราบ, unavailable, or an explicit error.
- Throughput must derive from actual transferred bytes and elapsed time after a successful HTTP response.
- Health/probe logic must still require a real successful response; retries may improve reliability but must not turn failure into fake success.
- Do not label HTTP probe failure as packet loss.
- Packet loss requires a real supported measurement path such as an authorized TURN/WebRTC method; otherwise show unavailable/GAP.
- Do not label client city/country metadata or CDN edge metadata as precise server location.
- Server/map coordinates must not be invented.
- Measurement servers/endpoints must be authorized for the intended traffic and capability.
- Ads, billing, subscription entitlement, outage detection, packet loss, maps, or server health must not be simulated as production capability.
- Prototype or derived behavior must be labeled according to its actual methodology.

## Current product scope

Primary navigation:
- Speed
- Video
- Status
- Map
- History
- Settings
- Ad-free

Speed flow:
- One primary GO / STOP / retest action.
- Real download and upload throughput.
- Idle HTTP latency.
- Loaded latency where supported by the measurement method.
- Jitter derived only from actual latency samples with truthful methodology.
- Progress/state feedback.
- History/provenance for completed tests.
- Retry/share only when the underlying implementation exists.

Server behavior:
- Current/available endpoint data must come from the source-controlled/authorized server directory.
- Auto/manual selection must not imply regional coverage that the directory does not actually provide.
- True multi-region selection remains a GAP until additional authorized endpoints exist.

Status/network context:
- IPv4/IPv6, network/ISP metadata, endpoint checks, and related values only when the platform/source exposes them.
- Unknown/unavailable values stay unknown.

Video:
- Throughput-derived suitability estimates must be described as estimates/reference guidance.
- Do not claim a real playback test until licensed/owned media and a defined playback methodology are integrated.

Map:
- No fabricated GPS, city, edge, or server coordinates.
- If precise location evidence is unavailable, use an honest unavailable/metadata-only state.

Ad-free:
- Do not simulate VIP, purchase, entitlement, Ads, or Billing state.
- UI copy must reflect the integrations actually present in the build.

## UI / visual lock

Current Zipspeed visual direction:
- Minimal premium.
- Clean iOS-style hierarchy.
- White/blue 3D clay material.
- Soft layered shadows.
- Primary accent: **#3B82F6**.
- Glassmorphism only as a light accent, approximately **5%** where useful.
- Backdrop blur target around **40px** where supported, with graceful fallback.
- Large surface radius target: **28px**.
- Primary GO/STOP control must remain obvious and thumb-friendly.
- Measurement numbers use mono/tabular numeric treatment where practical.
- Gauge readability and interaction reliability take priority over decoration.
- Reduced-motion behavior is required.

Main information hierarchy remains consistent with the universal UI rules. Do not add duplicate primary actions or duplicate technical text merely to make a page look fuller.

## Language requirements

- Thai and English are required for important Zipspeed labels, actions, measurement states, loading, success, empty, offline, and error states.
- A screen must not accidentally mix TH/EN because of missing keys.
- Translation must not convert Unknown/GAP into a factual claim.
- Region, language, and currency are separate concepts even if future features introduce them.

## Brand assets

- Approved Canva references are documented in `BRAND_ASSETS.md`.
- Current source-controlled Android/Web fallback artwork is allowed only when exact approved Canva raster bytes are unavailable.
- Do not substitute Canva thumbnails/previews and claim they are the exact export.
- Exact-raster replacement is PASS only after real exported bytes are integrated, rebuilt, and verified.

## Competitive product gate

The locked 9-grid and X+Y+Z rules live in `UNIVERSAL_APP_PROJECT_RULE.md`; the active weights/evidence model lives in `PRODUCT_DOMINANCE_MATRIX.md`.

Zipspeed-specific application:
- Reference products include Speedtest by Ookla, Opensignal Internet Speed Test, FAST Speed Test, and Meteor by Opensignal.
- Market facts and competitor capabilities that can change must be re-verified before scoring or claims.
- Missing runtime/release evidence earns no inferred credit.
- External blockers remain GAP; they are never replaced with a fake implementation.
- Internal comparison scores are product-planning metrics, not public claims that Zipspeed is universally faster, more accurate, safer, or better.

## Research / thesis integrity

- Never fabricate papers, DOI, participants, survey/interview results, IOC, reliability, statistics, or findings.
- Missing evidence remains GAP / ASSUMPTION / TO VERIFY.
- Thesis traceability must remain consistent:
  title → RQ → objectives → method → instrument → data → analysis → result → conclusion → app feature.

## Project-state language

Use these meanings consistently:
- **PASS** = verified passed.
- **FIX** = a verified issue was corrected.
- **GAP** = missing implementation/evidence/process.
- **ASSUMPTION** = explicit assumption not yet evidenced.
- **TO VERIFY** = a defined verification step remains.
- **UNVERIFIED** = not tested or evidence unavailable.
- **N/A** = not applicable to the current scope.

## Canonical document roles

To avoid duplicate active instructions:
- `UNIVERSAL_APP_PROJECT_RULE.md` — owner master rules and locked universal process.
- `PROJECT_RULES.md` — this Zipspeed-specific overlay only.
- `PRODUCT_BRIEF.md` — problem/product scope.
- `DESIGN_SYSTEM.md` — detailed visual/design-system specification.
- `PRODUCT_DOMINANCE_MATRIX.md` — competitive scoring rubric and evidence.
- `CHECKPOINT.md` — current human-readable validation/status checkpoint.
- `task_state.json` — machine-readable continuation state.
- `PHYSICAL_DEVICE_VALIDATION_2026-09-26.md` — detailed physical-device evidence.
- `CHANGELOG.md` — retained product history.
- `docs/archive/` — historical evidence only; not active build/runtime/project rules.

If a historical/archive document disagrees with current active source or rules, the active main-branch source and canonical documents above take precedence.

## Delivery requirements specific to Zipspeed

For substantial Zipspeed changes, the report must include:
- commit SHA and branch;
- files changed;
- tests/checks executed;
- build/runtime result;
- real-device evidence when relevant;
- PASS / FIX / GAP / ASSUMPTION / TO VERIFY / UNVERIFIED / N/A;
- what was not verified;
- stale/old-artifact cleanup result.

All universal build → runtime → release-check → final requirements remain mandatory through `UNIVERSAL_APP_PROJECT_RULE.md`.
