# ZIPSPEED by AnakinYoo

Clean rebuild on the existing Android identity.

## Canonical identity
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Version: `85.0.0`
- versionCode: `85`
- Canonical version source: `package.json`

## Single-source architecture
- `web/` is the only active web UI/runtime source.
- Android does **not** keep a hand-maintained mirror. Gradle copies `web/` into generated app assets at build time and generates `version.json` from `package.json`.
- `server.mjs` serves the same `web/` source for local/AI Studio preview.

## Branding
- Android launcher icon and native splash are wired through `app/src/main/res/` and the manifest.
- Web uses `web/assets/zipspeed-mark.svg` with deterministic `?v=85` cache revision.
- Approved Canva references and exact-export status are tracked in `BRAND_ASSETS.md`.

## Product surface
Speed / Video / Status / Map / History / Settings / Ad-free are present. Measurements use HTTP transfer/probe data only. Missing verified location data remains `--`; no synthetic coordinates, speed values, packet-loss values, ads, billing, or VIP entitlement are generated.

## Validation
```bash
npm ci
npm run check
npm run runtime:check
npm run release:check
npm run play:check
```
Android CI runs web/unit checks, browser interaction, HTTPS network smoke, Android emulator, APK/debug build, release bundle compilation and release/Play-source checks. The v85 source version and Android versionCode are derived from `package.json` (verified on main CI run [#38016840264](https://github.com/dachopol/ZIPSPEEDmain/actions/runs/38016840264), 10/10 jobs successful). That CI does **not** establish physical-device usability or Play Store release readiness. Older device test records in `task_state.json` are historical and must not be applied to a newly built APK without verifying its source SHA, artifact hash, device and test logs. Current acceptance gates and unknown scores are in `qa/acceptance-report.json`, with active owner [Issue #4](https://github.com/dachopol/ZIPSPEEDmain/issues/4).

## Release signing
Release signing is environment-based and secret-free in Git. See `SIGNING_SETUP.md`. CI verifies the signing contract and unsigned release compilation; a real signed Play-uploadable AAB remains TO VERIFY until the intended keystore/certificate is supplied.


## UCISE Local — คู่มือเริ่มต้นและ Documentation Gate / Getting started

<!-- UCISE_DOCUMENTATION_GATE_V1 -->

**ขั้นตอนเริ่มต้น (TH):** อ่าน Canonical identity และ Single-source architecture → ใช้ web/ เป็นแหล่ง UI/runtime เดียวตามเอกสาร → ตรวจ prerequisites และ Validation → ทดสอบการทำงานจริงและบันทึกผลตามแพลตฟอร์ม → ตรวจ Release signing แยกต่างหาก ห้ามแก้สำเนา UI ที่สร้างอัตโนมัติหรือเผยแพร่โดยไม่มีสิทธิ์.

**Getting started (EN):** Read the project-specific sections above. Confirm exact version, authorized workspace, platform and prerequisites before following any command. Run only documented, authorized steps; record actual output and errors. Do not infer runtime or release readiness from this documentation.

### Required documentation before closing work

- [ ] Purpose, exact version/source identity, prerequisites and installation/configuration.
- [ ] Step-by-step user workflow, examples, expected outputs, and TH/EN guidance appropriate to the audience.
- [ ] Build/run/test commands from actual source where applicable; record host, exact command, exit status and evidence. Untested commands are NOT_VERIFIED, not PASS.
- [ ] Architecture, permissions, safety constraints, troubleshooting, recovery/rollback and limitations.
- [ ] AI handoff: checkpoint, changed files, remaining tasks, dependency and next authorized action; research assumptions and evidence scope when applicable.
- [ ] Review existing documentation first; update it without duplication; never copy secrets or local-only data to the cloud.

Use README sections or existing linked guides; split into QUICKSTART, USER_GUIDE, AGENTS, TESTING, SECURITY, RESEARCH or RECOVERY files only when useful. Missing required documentation or evidence keeps the relevant DoD item INCOMPLETE/BLOCKED. This checklist is not a test receipt, native approval, release authorization or permission to bypass Owner/Watchdog Hold. Production and existing security gates remain unchanged. Documentation-only candidate; command execution and independent QA are NOT_RUN in this edit.
