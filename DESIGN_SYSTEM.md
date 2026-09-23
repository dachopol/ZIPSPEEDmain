# Zipspeed Design System — v52

## Direction
Premium minimal instrument interface: precise, quiet, readable and trustworthy.

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

## Hierarchy
Header → connection status → speed instrument → metric deck → live trace.  
Secondary screens use a heading followed by a vertical list/card group.

## Responsive
- Mobile first.
- No horizontal scrolling.
- Text wraps before truncation.
- 44px-class minimum interactive target.
- 2×2 metrics on phones; 4-across when space allows.
- Safe-area padding.
- Font scaling must not hide essential actions.

## Accessibility
- Visible focus state.
- ARIA current/pressed state for navigation, profile and GO/STOP.
- Reduced-motion support.
- Dynamic states translated with selected screen language.
- Unknown/unavailable remains `--`.
