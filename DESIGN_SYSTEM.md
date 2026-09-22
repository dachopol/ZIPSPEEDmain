# Zipspeed Design System — v51

## Direction
Premium minimal instrument interface: precise, quiet, spacious, and trustworthy.

## Core tokens
| Token | Value |
|---|---|
| Accent | `#3B82F6` |
| Background | `#F7F9FC` |
| Surface | `#FFFFFF` |
| Text | `#0F172A` |
| Muted | `#718096` |
| Large radius | `28px` |
| Glass blur | `40px` |
| Glass usage | navigation + small controls only |
| Number style | mono + tabular/lining |
| Primary action | one GO/STOP pill |

## Visual rules
- Instrument first, decoration second.
- No dashboard clutter.
- No emoji UI.
- No heavy neumorphism.
- One dominant focal point: the gauge.
- One primary action: GO/STOP.
- Metrics appear as a single integrated deck.
- Shadows stay subtle and broad.
- Blue is reserved for action/progress/state emphasis.
- Unknown/unavailable values remain `--`.

## Responsive rules
- Mobile first.
- 2×2 metrics on small phones; 4-across on larger screens.
- Navigation remains reachable above safe-area inset.
- Long Thai labels may wrap only where it does not break controls.
- No horizontal scrolling.

## Accessibility
- 42–54px interactive controls.
- Visible keyboard focus.
- Reduced-motion support.
- Light/dark contrast checked in design tokens.
