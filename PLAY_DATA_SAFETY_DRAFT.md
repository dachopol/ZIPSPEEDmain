# Google Play Data Safety — Source-grounded draft

App: ZIPSPEED by AnakinYoo  
Package: `com.aistudio.zipspeed.zskt`  
Version: `80.0.0`

This is a preparation document, not a claim that the Play Console form has been submitted.

## Observed source behavior

| Area | Source-grounded state |
| --- | --- |
| Accounts | No account/login system |
| Ads | No Ads SDK detected |
| Billing | No Billing SDK detected |
| Android permissions | INTERNET, ACCESS_NETWORK_STATE |
| Location permission | None |
| Camera / microphone / contacts | None |
| Measurement provider | Cloudflare endpoint in server directory |
| Network metadata displayed | Public IP, reported edge code, country |
| Local history | Up to 20 test results |
| Local monitor events | Up to 50 incident/recovery events |
| Provider metadata stored in history | No |
| User-triggered sharing | Yes |
| Encryption in transit | HTTPS measurement URLs; Android cleartext disabled |

## Data Safety items requiring console review

1. **Network/public IP handling — TO VERIFY.** Measurement requests necessarily expose the user's public IP to the measurement provider. Confirm the correct Google Play data-type/collection classification for this endpoint behavior.
2. **Country derived/reported from network trace — TO VERIFY.** The app displays the server-reported country but requests no Android location permission. Confirm whether and how this must be declared under the current Data Safety taxonomy.
3. **Third-party processing — TO VERIFY.** Review Cloudflare's current privacy/terms and determine the exact Play declaration for endpoint-side processing.
4. **User-initiated Share — SOURCE GUIDANCE.** Google Play states that a transfer initiated by a specific user action, where the user reasonably expects sharing, does not need to be declared as data “sharing.” ZIPSPEED invokes the share/clipboard flow only after the user taps Share. Re-check this behavior in the final build before submission.
5. **Approximate location — TO VERIFY.** Google Play explicitly includes location inferred from IP address in the approximate-location data type. ZIPSPEED displays a server-reported country derived from the network request, keeps it only in memory, and does not request Android location permission. Google Play also documents an ephemeral-processing exception, so the final Console collection answer must be confirmed against the exact final behavior rather than guessed.
6. **Public privacy-policy URL — PASS for hosting/source alignment.** The canonical policy source is aligned to v80 at `https://dachopol.github.io/privacy-policy/`. Entering/saving that URL in Play Console remains TO VERIFY.

Do not answer the Play Console form by inference alone. Re-check the final release build, permissions, endpoints, Ads/Billing state, and third-party behavior immediately before submission.
