# Zipspeed Project-Wide Quality Report

Updated: 2026-09-23

## PASS
- v66 latest-source Web/unit/build, Browser Runtime, real-network Cloudflare Single+Multi, real M-Lab discovery, Android lint/debug/release compile and release-source checks passed.
- Browser network hints remain optional/local and are not saved into completed test History.
- v67 comparable-history calculations use completed local results only and never mix profile or connection mode.

## FIX
- Added median-based recent comparable statistics so users can interpret repeated tests without manually scanning rows.
- Added explicit matching sample count and download spread.
- No new permission, network destination or background monitoring was added.

## GAP
- Comparable-history statistics require at least two matching completed tests; otherwise values stay "--".
- M-Lab NDT7 measurement remains disabled pending explicit data-policy consent + external privacy/Data Safety review.
- No real playback-quality test or verified coverage dataset.
- Physical Android runtime and Play signing/upload remain unproven.

## TO VERIFY
- v67 Web/unit/build/runtime/real-network/Android/release-source CI.
- Physical Android runtime.
- External Privacy Policy / Play Data Safety.

## UNVERIFIED
- Signed Play publication.
