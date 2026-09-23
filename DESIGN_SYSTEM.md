# Zipspeed Design System — Current

## Direction
Premium minimal instrument interface: precise, dimensional, quiet, readable and trustworthy.

## Depth hierarchy
- Layer 0: page background / ambient light.
- Layer 1: cards and content groups.
- Layer 2: instrument outer surface.
- Layer 3: instrument inner surface and gauge.
- Layer 4: live reading.
- Layer 5: primary GO/STOP action.
- Glass remains limited to navigation and compact controls.

Depth must come from material separation, layered shadows and highlights—not from overlapping text or controls.

## Anti-overlap rules
- Instrument reading and GO/STOP occupy separate CSS Grid rows.
- Bottom navigation reserves page-bottom space and toast clearance.
- Header uses `minmax(0,1fr) auto` so brand and actions negotiate width safely.
- Status/settings/history stack vertically on narrow screens.
- Metrics fall back 4 → 2 → 1 columns as width decreases.
- Long text wraps before truncation.
- Every flex/grid child that can contain text must permit `min-width:0`.
- Decorative depth layers are pointer-events:none and never intercept taps.

## Core tokens
| Token | Value |
|---|---|
| Accent | `#3B82F6` |
| Background | `#F7F9FC` |
| Surface | `#FFFFFF` |
| Text | `#0F172A` |
| Muted | `#718096` |
| Main radius | `28px` |
| Glass blur target | `40px` |
| Glass usage | navigation and compact controls only |
| Number style | mono + tabular/lining |
| Primary action | one GO/STOP pill |

## Responsive checkpoints
- ≤350: 1-column metrics.
- ≤440: stacked status/settings/history and compact header.
- ≤520: stacked stage status/profile metadata.
- ≤620: 2-column metrics.
- ≥900: expanded instrument/content spacing.

## Accessibility
- Visible focus state.
- 44px-class controls where feasible.
- ARIA current/pressed state.
- Reduced-motion support.
- Dynamic states translated with selected screen language.
- Unknown/unavailable remains `--`.
