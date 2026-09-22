# Zipspeed by AnakinYoo — v51 Premium Instrument UI

This version keeps the clean-rebuild engine but replaces the visual layer with a premium instrument-style interface.

## v51 visual quality
- Premium instrument-cluster gauge with restrained depth.
- Integrated metric deck instead of many floating clay cards.
- Glass used only on navigation/control surfaces.
- SVG-only icons; no emoji UI.
- Cleaner typography, tighter spacing, quieter shadows.
- Light mode is the primary visual target; dark mode remains supported.
- Real measurement logic is unchanged.

## Product
A mobile-first internet speed and network-health app that reports measured HTTP performance clearly without fabricated network facts.

## New architecture
- `index.html`: clean semantic shell.
- `src/styles.css`: minimal 3D white-clay design system.
- `src/app.mjs`: state/UI/measurement orchestration.
- `src/measurement.mjs`: pure deterministic measurement helpers.
- Root, AI Studio `app/applet`, and Android assets are mirrored by audit.

## Real-data scope
- HTTP latency samples + HTTP jitter indicator.
- Download/upload from actual transferred bytes and elapsed time.
- Quick: 3 MiB down + 1 MiB up + 3 probes.
- Standard: 10 MiB down + 5 MiB up + 6 probes.
- Cloudflare metadata for client IP, ASN/ISP, edge code, client area.
- No fake coordinates, packet loss, ads, billing, or server directory.

## Visual direction
Minimal 3D / white clay / soft shadows / #3B82F6 / radius 28px / blur 40px / tabular numbers / one GO-STOP action.

## Validate
```bash
npm run check
```

Android debug build is validated in GitHub Actions.
