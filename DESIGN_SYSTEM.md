# Zipspeed Design System — v46

## Direction
Minimal 3D speed-test interface with white clay material, soft shadows, restrained glass, and a clean iOS-style information hierarchy.

## Core Tokens

| Token | Value |
|---|---|
| Primary accent | `#3B82F6` |
| Background | `#F5F7FB` |
| Surface | `#FFFFFF` |
| Main text | `#14213D` |
| Muted text | `#64748B` |
| Large radius | `28px` runtime token (`--surface-radius`) |
| Blur target | `40px` runtime token (`--glass-blur`) with fallback |
| Glass presence | about 5% |
| Spacing base | 4 / 8 px |
| Number style | mono + tabular/lining numerals |
| Primary action | single GO/STOP circular or pill control |

## Visual Rules
- Prefer white/near-white surfaces over dark solid blocks in the default light theme.
- Use blue for primary progress/action, not for every label.
- Use clay depth with layered soft shadows, not heavy neumorphism that reduces contrast.
- Glass is a subtle enhancement only.
- Gauge must remain readable at small widths.
- Decorative depth cannot intercept taps or overlap controls.
- Respect `prefers-reduced-motion`.

## Responsive Rules
- Start with the smallest supported phone.
- Use fluid widths and auto-fit grids.
- Essential controls remain visible and tappable.
- History/export controls may wrap but not disappear.
- Thai copy must be tested for longer labels.
- Large font scaling is a required verification step.

## Component Rules

### Gauge
- Real measured value only.
- Unknown = `--`.
- Deterministic needle mapping.
- Blue progress accent.
- No random sweep presented as measurement.

### GO / STOP
- Exactly one primary test action in the main flow.
- GO starts one run.
- STOP cancels the current run.
- Prevent overlapping runs.

### Metric Cards
- Download, Upload, HTTP Latency, Jitter.
- Units always visible.
- Pending/Testing/OK/Error must be distinguishable.

### Status
- Browser online/offline is only a browser connectivity hint.
- Endpoint status comes from an actual request.
- Do not translate HTTP probe failure into packet loss.

### Map-safe
- Provider edge code and client-area metadata are allowed when returned by the provider.
- No map pin without verified coordinates.
- No invented server city.

### Video
- Suitability is an estimate from measured HTTP download throughput.
- Do not claim licensed video playback testing unless implemented.

## Accessibility
- 44px-class minimum touch target where practical.
- Visible focus state.
- Sufficient contrast.
- TH/EN important states complete.
- Reduced motion supported.

## Quality Gate
Design is not PASS until checked in:
1. mobile browser/AI Studio preview;
2. small and large viewport;
3. TH and EN;
4. light and dark;
5. large font;
6. Android real device.
