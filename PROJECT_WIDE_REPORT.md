# Zipspeed Project-Wide Quality Report

Updated: 2026-09-23

## PASS
- GitHub Remote / main / package ID verified before update.
- Browser runtime gate passed on the prior source at 320/360/412/768 px and exposed/fixed the same-origin CSP bug.
- Real-data measurement engine retains exact transferred-byte + monotonic-time rules.
- Single/Multi connection plans keep the same profile payload budget and split bytes deterministically.
- Multi download/upload aggregates actual bytes across concurrent streams.
- STOP/lifecycle cancellation covers all active upload streams.
- Health/use-case/diagnostic derivations remain deterministic.

## FIX
- Same-origin runtime metadata is allowed by CSP while external connect remains limited to the measurement endpoint.
- Added explicit connection-mode control rather than silently changing measurement behavior.
- Added result/history/share provenance for Single vs Multi mode.

## GAP
- Multi-region server directory still requires additional authorized endpoints.
- No real video playback test.
- No verified coverage dataset.
- No loaded-latency-under-transfer metric yet.
- Real Android device runtime and Play signing/upload remain unverified.

## TO VERIFY
- Web syntax/audit/tests/build for v57.
- Browser runtime including connection-mode toggle.
- Android lint/debug build.
- Android release bundle compile.
- Real network completion in both Single and Multi modes.
- Real-device Wi-Fi/cellular runtime.
- Play signing/API/Data Safety/Privacy Policy/screenshots.

## UNVERIFIED
- Real-device Single/Multi measurement accuracy.
- Signed Play publication.
