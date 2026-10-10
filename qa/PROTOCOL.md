# Zipspeed QA acceptance protocol — evidence only

## Source of truth and hard rule

Project: `dachopol/ZIPSPEEDmain`, main after #5, package `com.aistudio.zipspeed.zskt`.
**A merged pull request, a 10/10 source CI run, an emulator PASS, and a Browser screenshot do not mean an Android application is closed or ready for Play.**
Old `task_state.json` physical PASS fields refer to **older versions** until current artifact identity has been revalidated. The authoritative active-acceptance template is `qa/acceptance-report.json`, owned by [Issue #4](https://github.com/dachopol/ZIPSPEEDmain/issues/4); existing owner issues must be updated, never duplicated.

**Retracted:** previous `20/25` from a browser Speed screenshot is **not** a validated or publishable visual grade. For current app release the score is `--/25`. `--` means **not assessed**, not a zero, and not PASS.

## Mandatory order; never skip

1. **Preflight & identify** exact GitHub head SHA, working-tree status, application ID, versionCode, signed/debug APK SHA-256, authorized device serial and Android version, track, test network conditions.
2. **Existing evidence**: classify scope, run URL, timestamp, SHA, artifact and device. Evidence from other commits or old installed APK is **HISTORICAL**, not current PASS. A skipped test is **NOT RUN**.
3. **Read-only QA baseline**: check source, privacy, permissions and security, then existing unit/build/CI before creating duplicate CI runs.
4. **Runtime QA**: install the exact built APK on authorized phone; verify installed package/certificate/version, live app process, logcat, initial state, GO→STOP→GO, successful real measurements, offline/timeouts, interrupted upload/download, genuine zero vs unknown, history and sharing. Emulator and Browser remain separate evidence columns.
5. **Page-by-page visual QA**: collect actual TH and EN physical Android screenshots for every applicable page/state, including Speed ready/loading/downloading/uploading/stopped/error/result and Settings guide-open. Store image SHA-256, device/viewport/locale, run timestamp, source/artifact hash and before/after repair evidence.
6. **Human review only**: evaluate five visual categories (cleanliness, hierarchy, color harmony, typography, consistency), 0–5 each; record per-category reasons and screenshot references. Benefit score uses user problem, data integrity, ease, trust and resource efficiency, with real user-task evidence. **Never type a total score** — it is calculated from reviewed categories by the gate.
7. **Autofix loop**: record Problem → severity → evidence → root cause → owner → smallest reversible change → exact-head Build/Test/Runtime → recapture. Stop release on HIGH/CRITICAL defects.
8. **Release gate**: verify Play Data Safety/privacy, signing certificate matches intended upload key, user permissions, image/logo/splash, support matrix, real device, version and reviewer approvals. No automated Play publish/installation/merge of unrelated work.
9. **Closure**: every applicable gate PASS on the actual candidate + no release-critical issues + human acceptance evidence. Otherwise `TO_VERIFY` / `BLOCKED` and keep issue open.

## Gate values

Each gate reports `PASS`, `FAIL`, `BLOCKED`, `TO_VERIFY` or documented `N_A`. Zipspeed physical QA and physical visual QA cannot be marked `N_A` to bypass required release testing. PASS requires exact source SHA, proof reference and observation; phone gates also require artifact identity. **Code checks cannot attest evidence authenticity on their own**; reviewers still verify referenced actual artifacts.

Numeric ratings require `ASSESSED`, a named human reviewer, timestamp, exact SHA, artifact SHA-256, per-category rating/reason/evidence, and physical Android screenshots covering all mandatory TH/EN page/state combinations. Browser-only screenshots cannot satisfy this release-visual gate. The benefit review likewise needs evidence, reviewer identity and individual explanations; its total is never hand-set. If the evidence is missing, both scores remain `--/25`.

## Full report — no summary-only claims

The active report contains: project/owner, current source and artifact identity, each test gate plus pass/fail/skipped/not-run, detailed test matrix with dates and URLs, each issue severity/root cause/owner/fix/verification, all required screenshot matrix entries and locale/device, five visual and five benefit review fields, outstanding risks, next action, release decision. **Do not show green “complete” or a made-up percent without complete source evidence.**

The checked-in JSON is a **current acceptance checklist** with no numeric scores, not a live device signal. To assess an externally produced exact-build evidence file, run `node qa/evidence-gate.mjs --file=/path/to/verified-acceptance-report.json --require-ready`. Keep the evidence report as a reviewed CI/runtime artifact tied to that build: committing a SHA inside the source tree changes HEAD and invalidates that assertion. `npm run qa:guard` validates the checklist without declaring DONE; `npm run qa:report` prints the complete current report with gaps. `npm run check` invokes the guard and unit tests. `--require-ready` fails unless all required gates have evidence and both reviews are assessed.

This protocol intentionally prefers an accurate **NOT READY** over a fabricated PASS.
