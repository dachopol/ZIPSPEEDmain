# Zipspeed Project-Wide Quality Report

Updated: 2026-09-23

## PASS
- v64 latest-source Web/unit/build, Browser Runtime, real-network Cloudflare Single+Multi, real M-Lab Locate discovery, Android lint/debug/release compile and release-source checks passed.
- M-Lab discovery remains explicit user action and NDT7 measurement remains disabled.
- v65 country targeting derives only from user-entered ISO code; it is not inferred from language.

## FIX
- Added explicit country targeting to verified provider discovery.
- Region and language are runtime-tested as independent state.
- Privacy text now states that an entered country code is sent to M-Lab Locate.

## GAP
- M-Lab NDT7 measurement remains disabled until explicit data-policy consent + external privacy/Data Safety review.
- Discovered M-Lab servers are not selectable as Zipspeed measurement endpoints yet.
- No real playback-quality test.
- No verified coverage dataset.
- Physical Android runtime and Play signing/upload remain unproven.

## TO VERIFY
- v65 Web/unit/build/runtime/real-network/Android/release-source CI.
- External Privacy Policy / Play Data Safety.
- Physical Android behavior.

## UNVERIFIED
- Signed Play publication.
