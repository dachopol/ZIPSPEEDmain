# ZIPSPEED by AnakinYoo

Clean rebuild on the existing Android identity.

## Canonical identity
- Repository: `dachopol/ZIPSPEEDmain`
- Branch: `main`
- Package/Application ID: `com.aistudio.zipspeed.zskt`
- Version: `78.0.0`
- versionCode: `78`
- Canonical version source: `package.json`

## Single-source architecture
- `web/` is the only active web UI/runtime source.
- Android does **not** keep a hand-maintained mirror. Gradle copies `web/` into generated app assets at build time and generates `version.json` from `package.json`.
- `server.mjs` serves the same `web/` source for local/AI Studio preview.

## Branding
- Android launcher icon and native splash are wired through `app/src/main/res/` and the manifest.
- Web uses `web/assets/zipspeed-mark.svg` with deterministic `?v=78` cache revision.
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
Android CI runs lint/debug assembly and release bundle compilation separately. CI #167 verifies v78 web/runtime/real-network/Android gates, narrow-screen tab behavior, complete TH/EN tabs, and the idle-gauge placeholder regression. v77 physical Wi-Fi evidence remains valid prior evidence; physical v78 visual confirmation is TO VERIFY until the connected-device control channel is available again.

## Release signing
Release signing is environment-based and secret-free in Git. See `SIGNING_SETUP.md`. CI verifies the signing contract and unsigned release compilation; a real signed Play-uploadable AAB remains TO VERIFY until the intended keystore/certificate is supplied.
