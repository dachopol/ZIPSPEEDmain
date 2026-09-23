# Zipspeed Project-Wide Quality Report

Updated: 2026-09-23

## PASS
- v63 latest-source Web/unit/build, Browser Runtime, real-network Single+Multi, Android lint/debug/release compile and release-source checks passed.
- M-Lab integration in v64 is discovery-only: no NDT7 measurement is run and no M-Lab access-token URL is retained.
- Discovery is user-triggered and the standard browser runtime asserts zero automatic Locate API requests.

## FIX
- Added a second verified provider capability without pretending it is an active speed-test provider.
- Added truthful server machine/city/country display from M-Lab Locate v2 response only.
- Privacy/release evidence now accounts for the optional M-Lab discovery destination.

## GAP
- M-Lab NDT7 measurement remains disabled until explicit data-policy consent plus Privacy Policy/Data Safety review are implemented.
- Manual worldwide region selection is not implemented.
- No real playback-quality test.
- No verified coverage dataset.
- Physical Android runtime and Play signing/upload remain unproven.

## TO VERIFY
- v64 Web/unit/build.
- v64 Browser Runtime and real-network M-Lab discovery smoke.
- v64 Android lint/debug/release compile and release-source check.
- External Privacy Policy / Play Data Safety for the new optional discovery destination.

## UNVERIFIED
- Signed Play publication.
