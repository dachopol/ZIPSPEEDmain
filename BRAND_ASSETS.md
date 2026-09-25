# Zipspeed Brand Assets

Status: SOURCE TRACEABILITY / BUILD INTEGRATION

## Approved Canva references

### Android app icon
- Canva asset ID: `MAHWKsBjyPs`
- Source dimensions reported by Canva: **1264×1264**
- Reference: https://www.canva.com/M/MAHWKsBjyPs
- Visual direction: 3D white/blue, speed gauge + network signal, no fake test numbers.

### Mobile start screen
- Canva design ID: `DAHWKq6aukE`
- Page: 1
- Source dimensions reported by Canva: **1080×1920**
- Reference: https://www.canva.com/design/DAHWKq6aukE
- Visual direction: same approved Zipspeed brand language.

## Current build implementation

**PASS**
- Android manifest uses a real launcher icon resource and a native splash theme.
- Android 12+ uses platform splash attributes.
- Android 7–11 uses a deterministic window-background fallback.
- Web has a source-controlled SVG brand mark and deterministic cache revision.
- No brand asset contains fabricated speed/latency results.

**TO VERIFY**
- The Canva connector exposes metadata and previews but not the original export bytes in this workflow.
- Therefore the exact Canva raster artwork is **not claimed as embedded** in the build.
- Current source-controlled vector mark is a deterministic fallback based on the approved white/blue gauge-network direction.

## Exact-raster replacement gate

When the approved PNG/WebP exports are available as build files:
1. add the source file(s) to the repository;
2. generate Android density/adaptive resources without stretching;
3. replace the fallback Web SVG only if exact visual parity is required;
4. increment deterministic asset revision;
5. clean/rebuild Android + Web;
6. run audit, browser, Android debug, emulator, release-source and Play-source gates;
7. update this file from **TO VERIFY** to **PASS** only after those checks.
