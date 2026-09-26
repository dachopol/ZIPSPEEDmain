# Privacy Policy — ZIPSPEED by AnakinYoo

Applies to package `com.aistudio.zipspeed.zskt`, version `80.0.0`.

This policy mirrors the policy text bundled at `web/privacy.html`.

## Data used for measurement
- Download, upload, and HTTP latency probes are sent to enabled endpoints in `web/server-directory.json`; the current endpoint is Cloudflare Network Quality.
- Network requests inherently disclose the public IP to the destination service.
- Server-reported trace values (public IP, edge code, country) are displayed as network status. Country is approximate location inferred/reported from network information, not GPS. The app does not invent datacenter coordinates.
- Missing ISP/ASN or other unverified fields are shown as `--`.

## Data stored locally
- Settings are stored in app-local storage.
- Test history is capped at 20 entries.
- Foreground Monitor events are capped at 50 entries.
- History stores measured download/upload, idle/loaded latency, jitter, payload, profile/connection information, and server ID.
- Public IP, country, edge code, and ISP are not stored in history.

## Sharing
Result sharing occurs only after user action through the device share/clipboard flow.

## Current SDK/account state
- No user account system.
- No Ads SDK.
- No Billing SDK.
- No Firebase Analytics SDK.
- Android permissions: `INTERNET` and `ACCESS_NETWORK_STATE`.
- No Android camera, microphone, contacts, or location permissions.

## Security
Measurement traffic is HTTPS. Android cleartext traffic is disabled and WebView mixed content is disabled.

## Retention and deletion
History and Monitor logs can be cleared in-app. Clearing app storage or uninstalling removes app-local data. Entries exceeding the local limits are discarded automatically.

## Third-party measurement service
The current measurement endpoint is operated by Cloudflare; its handling of requests is governed by its own policies and terms.

## Privacy inquiries
Use the public GitHub Issues mechanism for the project: `dachopol/ZIPSPEEDmain`. Do not submit sensitive personal data in public issues.

## Publication status
- In-app policy text: PASS
- Repository policy: PASS
- Public hosted policy URL deployed: **PASS** — `https://dachopol.github.io/privacy-policy/`
- Public GitHub Pages source currently presents the v80 policy: **PASS** (`dachopol/privacy-policy` main)
- Public URL entered/saved in Play Console: **TO VERIFY**
- Play Console Data Safety submission: **TO VERIFY**
