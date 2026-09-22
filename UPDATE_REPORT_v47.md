# Zipspeed v47 Update Report

Date: 2026-09-22

## PASS
- Competitive benchmark research completed from current Google Play listings.
- Top reference set locked: Ookla, Opensignal, FAST; Meteor supplemental.
- Real Data Only measurement rules preserved.
- Quick/Standard profiles use real configured byte transfers and probe counts.
- Share/Copy use only completed history-eligible results.
- TH/EN labels added for new controls.
- Root / AI Studio applet / Android asset HTML mirrored.

## FIX
- Fixed null btnActionLabel access left after duplicate START TEST removal.
- Copy previously read current UI values and could include incomplete values; it now reads the latest completed eligible history record.
- Added user-visible test profile and estimated payload.

## GAP
- Authorized multi-server directory remains unavailable.
- Real coverage map remains unavailable.
- Real licensed video playback test remains unavailable.
- Real-device verification remains required.

## ASSUMPTION
- Google Play install band + review volume is accepted as the benchmark ranking method for this dated research snapshot.
- Cloudflare remains the current measurement endpoint provider.

## TO VERIFY
- GitHub Actions web check.
- Android assembleDebug.
- AI Studio Preview.
- Quick vs Standard behavior on real device/mobile data.
- Native share sheet behavior inside Android WebView.

## UNVERIFIED
- Real-device share.
- Real-device network accuracy.
- Release AAB / Play Console.

## N/A
- Fake server selection.
- Fake map pins.
- ICMP packet loss.
