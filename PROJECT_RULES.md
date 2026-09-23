# Zipspeed Project Rules

Status: MASTER / SOURCE OF TRUTH

Owner universal rule: `UNIVERSAL_APP_PROJECT_RULE.md`

## LOCKED CRITICAL RULES
The X + Y + Z PRODUCT DOMINANCE RULE in `UNIVERSAL_APP_PROJECT_RULE.md` is mandatory for competitive feature decisions.
The `LOCKED CRITICAL RULES — OWNER OVERRIDE` section in `UNIVERSAL_APP_PROJECT_RULE.md` is mandatory. It governs GitHub remote safety, real UI implementation, no feature deletion to escape errors, single version source, Region/Language/Currency separation, ZIP safety, release evidence integrity, and the mandatory `/build → /runtime → /release-check → /final` gates.

When rules overlap, apply the stricter requirement and preserve Real Data / Anti-Random behavior.

## 9-GRID COMPETITIVE GATE
The locked 9-grid gate in `UNIVERSAL_APP_PROJECT_RULE.md` is mandatory for competitor scoring, GAP prioritization and X+Y+Z feature decisions. Scores require evidence; missing evidence is never filled by assumption.

## MASTER APP BUILD RULES
- No fake, random, demo, or hardcoded values may be presented as measured network facts.
- If a value cannot be measured, display `--`, unknown, unavailable, or an explicit error.
- Throughput must derive from actual transferred bytes and elapsed time after a successful HTTP response.
- Do not label HTTP probe failure as packet loss.
- Do not label client city/country metadata as server location.
- Ads, billing, subscription, outage, packet loss, server maps, or other capabilities must not be simulated as production features.
- Prototype behavior and production capability must stay clearly separated.

## ANTI-RANDOM BUILD
Every new feature needs:
1. requirement source;
2. acceptance criteria;
3. real data source or explicit assumption;
4. privacy/data-use impact;
5. test evidence before a production-ready claim.

## FULL WORKFLOW
Requirement → Evidence/Source of Truth → Design → Implement → Static Check → Unit Test → Build → Preview/Emulator → Real Device → Release → Verify.

Never skip a stage and report a later stage as passed.

## UNIVERSAL AUTO LAYOUT
- Mobile first.
- Responsive/adaptive on small phone, normal phone, large phone, tablet and web.
- No overflow, clipped critical text, hidden controls or unreachable actions.
- Support font scaling and orientation where the platform supports it.
- Avoid fixed structural dimensions when fluid sizing is appropriate.

## UI / LANGUAGE COMPLETENESS
- Thai and English must cover important labels, actions, status, loading, success, empty, offline and error states.
- Missing translation is a defect.
- Unknown data remains unknown; translation must not turn unknown data into a claim.

## PREVIEW / EMULATOR RULE
- Preview/Emulator is required for UI validation where available.
- Preview/Emulator does not replace real-device testing.
- GPU/emulator warnings must be separated from application errors using actual logs.

## BUILD / KOTLIN / WEB RULE
- A source edit is not a build pass.
- Web: audit + unit tests + static build must pass.
- Android: Gradle/Java/Kotlin compile and assemble must pass.
- Build failure must be fixed from the actual error/log, not guessed.

## UI / UX QUALITY GATE
Before UI is considered passed, check:
- hierarchy;
- typography;
- spacing/alignment;
- contrast;
- touch targets;
- loading/empty/offline/error/success/disabled states;
- accessibility;
- responsive behavior;
- TH/EN completeness;
- single clear primary action where appropriate.

## SECURITY / PRIVACY / PLAY STORE
- Minimum permissions only.
- HTTPS where supported by the data source.
- No hidden tracking.
- WebView must use hardened settings and should not allow unsafe file/universal file access.
- Privacy Policy and Data Safety must match actual code/data behavior.
- Ads/Billing/Subscriptions must use real integrations before being claimed as functional.
- Production readiness requires release signing, AAB, testing and Play verification.

## MASTER PRODUCT DESIGN + ENGINEERING RULE

### ROLE
Act as a world-class Senior Product Designer + Senior Engineer.
Own Product Strategy, UX/UI, Design System, Engineering Quality, Security, Build Quality and Release Verification.

### PROJECT
Name: **Zipspeed by AnakinYoo**

One-sentence product definition:
**A mobile-first internet speed and network-health app that reports measured HTTP performance clearly without fabricated network facts.**

### COMPETITIVE GOAL
Goal: compete on measurable product quality in the internet speed-test / network-diagnostics category.

Comparison dimensions:
- simplicity;
- visual quality;
- reliability;
- measurement integrity;
- responsiveness;
- accessibility;
- privacy;
- user friction;
- useful diagnostics.

Competitor reference set (Google Play snapshot researched 2026-09-22; install band primary, review volume tie-breaker):
1. **Speedtest by Ookla** — 100M+ installs, 4.6★, ~1.49M reviews.
2. **Opensignal Internet Speed Test** — 10M+ installs, 4.2★, ~441K reviews.
3. **FAST Speed Test** — 10M+ installs, 4.2★, ~49.9K reviews.

Supplemental benchmark: **Meteor by Opensignal** — 5M+ installs, 4.8★, ~134K reviews; useful reference for app-use suitability.

This is a dated research ranking method for product benchmarking, not a claim of universal superiority. Re-verify before future market claims.

### NON-NEGOTIABLE
- No Fake.
- No Random.
- No hardcoded values presented as measured facts.
- Cannot measure = `-- / Unknown / ไม่ทราบ / Error`.
- Do not silently add, remove or change product scope.
- Do not copy competitor assets or UI directly.
- Do not trade interaction reliability for visual effects.
- Avoid duplicate controls that execute the same core action without a clear UX reason.

### VISUAL DIRECTION — CURRENT LOCK
- Minimal premium.
- Clean iOS-style hierarchy.
- 3D white-clay material.
- Soft layered shadows.
- Blue accent: **#3B82F6**.
- Glassmorphism: approximately **5%** and only where it improves hierarchy.
- Backdrop blur target: approximately **40px** where supported; graceful fallback required.
- Large surface radius target: **28px**.
- Primary GO/STOP control: circular or pill-like, clear and thumb-friendly.
- Measurement numbers: mono/tabular numeric treatment.
- Whitespace over visual noise.
- Gauge readability before decoration.
- Reduced-motion support.

### MANDATORY SPEED-TEST COMPONENTS
- 3D/Clay or subtle Glass Gauge.
- Mono/tabular live speed number.
- One primary GO / STOP action.
- Download.
- Upload.
- HTTP latency.
- Jitter indicator with truthful methodology label.
- Progress.
- Network metadata.
- Status.
- Video suitability derived only from measured throughput.
- Map-safe state: no fabricated GPS/server coordinates.
- History.
- Settings.
- TH / EN.
- Error / Offline / Unknown states.

### DESIGN TOKENS
Current source-of-truth tokens:
- Primary accent: `#3B82F6`
- Large radius: `28px`
- Blur target: `40px`
- Glass presence: `~5%`
- Shadow: soft / layered / clay-like
- Number style: mono/tabular
- Spacing base: 4/8px system
- Primary action: single GO/STOP circular/pill control

Tokens should be centralized instead of scattered without need.

### DELIVERABLES
For substantial app changes, deliver:
- source code;
- changed-files list;
- version/build config;
- automated tests;
- build evidence;
- README / CHANGELOG;
- requirement/PRD traceability where applicable;
- security/privacy notes;
- quality report;
- APK/AAB only when actually built;
- AI Studio / GitHub compatible source when relevant.

### REPORT FORMAT
Every substantial work report must use:
- PASS
- FIX
- GAP
- ASSUMPTION
- TO VERIFY
- UNVERIFIED
- N/A

Also report:
- commit SHA;
- files changed;
- tests executed;
- build result;
- what was not tested.

## RESEARCH / THESIS INTEGRITY
- Never fabricate papers, DOI, participants, survey/interview results, IOC, reliability, statistics, or findings.
- Missing evidence remains GAP / ASSUMPTION / TO VERIFY.
- Thesis traceability must remain consistent:
  title → RQ → objectives → method → instrument → data → analysis → result → conclusion → app feature.

## STATUS LANGUAGE
Use these exact project-state meanings:
- **PASS** = verified passed.
- **FIX** = a verified issue was corrected.
- **GAP** = missing implementation/evidence/process.
- **ASSUMPTION** = explicit assumption not yet evidenced.
- **TO VERIFY** = a defined verification step remains.
- **UNVERIFIED** = not tested or evidence unavailable.
- **N/A** = not applicable to the current scope.
