# Google Play Data Safety — Source-grounded preparation

App: ZIPSPEED by AnakinYoo  
Package: `com.aistudio.zipspeed.zskt`  
Version: `80.0.0`

This document records source-grounded form preparation. It does **not** claim that the Play Console Data safety form has been entered, saved, reviewed, or submitted.

## Observed final-source behavior

| Area | Source-grounded state |
| --- | --- |
| Accounts | No account/login system |
| Ads | No Ads SDK detected |
| Analytics | No Firebase Analytics SDK detected |
| Billing | No Billing SDK detected |
| Android permissions | `INTERNET`, `ACCESS_NETWORK_STATE` |
| Android location permission | None |
| Camera / microphone / contacts | None |
| Measurement provider | Cloudflare Network Quality endpoint in `web/server-directory.json` |
| Off-device requests | HTTPS health, trace metadata, latency, download and upload requests |
| Network metadata displayed | Public IP, reported edge code, country |
| Approximate location source | Country inferred/reported from IP-related network trace; not GPS |
| Local history | Up to 20 test results |
| Local monitor events | Up to 50 incident/recovery events |
| IP / country / edge / ISP stored in history | No |
| User-triggered result sharing | Yes |
| Encryption in transit | HTTPS measurement URLs; Android cleartext disabled |

## Google Play definitions applied

Google Play defines collection as transmitting user data off the device, including data transmitted by app-controlled WebView code. It explicitly says approximate location inferred from an IP address must be disclosed as Approximate location. Google also states that user-initiated transfers can qualify for a sharing exception, and that ephemeral processing has specific conditions.

## Prepared Data safety answers for current v80 source

### Does the app collect or share user data?

**Yes.**

Reason: app-controlled measurement code sends requests off-device to Cloudflare. The public IP is inherently exposed to the destination, and the trace response is used to derive/display country-level network location.

### Data type: Location → Approximate location

**Declare: Yes.**

Reason: Google Play explicitly places location inferred from IP address under Approximate location. ZIPSPEED displays country from the server-reported network trace and does not request Android location permission.

Prepared handling:
- **Collected:** Yes.
- **Shared:** Yes, conservatively for the current architecture because the app sends the request directly to Cloudflare, an external third party, and the repository contains no evidence of a developer-controlled service-provider agreement that would establish a sharing exception.
- **Required or optional:** Required for the current network measurement/metadata flow; there is no in-app opt-out that preserves the same measurement flow.
- **Purpose:** App functionality.
- **Processed ephemerally:** Do **not** claim this exception for the Play form from source evidence alone. The app does not persist IP/country in History, but the repository does not establish Cloudflare's server-side retention behavior.

### Public IP

The app does not use the public IP as an account identifier, advertising identifier, analytics identifier, or persistent device identifier. Current source uses it as network metadata and as the basis for reported country/approximate location. Therefore this preparation maps the relevant use to **Approximate location** and does not add Device or other IDs without evidence of identifier use.

### Local settings/history/monitor data

Current history/settings/monitor records are processed on-device only and are not transmitted by the app as stored records. Google Play states on-device-only processing is outside collection disclosure.

### User-triggered Share

The Share/Clipboard path runs only after the user presses Share, and the shared text contains measured speed/latency summary rather than IP/country. Google Play documents an exception for third-party transfers caused by a specific user-initiated action where sharing is reasonably expected.

### Security

- Measurement traffic: HTTPS.
- Android cleartext traffic: disabled.
- WebView mixed content: disabled.
- No account password/payment data is handled by the current build.

## Console actions still TO VERIFY

- Enter/save the public privacy policy URL: `https://dachopol.github.io/privacy-policy/`.
- Enter the prepared Data safety answers in the actual Play Console form.
- Review the generated Play preview before submission.
- Confirm there are no older active Play artifacts with additional SDKs/data practices, because Google's form covers data practices across versions currently distributed on Play.
- Submit and confirm the final Play Console status.

## Change rule

Re-run this review before release if Ads, Billing, Analytics, accounts, permissions, providers, endpoints, data retention, sharing, or measurement methodology changes.
