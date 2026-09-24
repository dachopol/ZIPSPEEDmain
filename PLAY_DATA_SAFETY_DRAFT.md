# Google Play Data Safety — Source-grounded draft

App: ZIPSPEED by AnakinYoo  
Package: `com.aistudio.zipspeed.zskt`  
Version: `72.0.0`

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
4. **Sharing — TO VERIFY wording.** The app only invokes sharing after user action; verify the Play form treatment for user-initiated transfers.
5. **Public privacy-policy URL — TO VERIFY.** The policy is bundled in-app and stored in the repo, but a Play-acceptable public URL must be entered in Play Console.

Do not answer the Play Console form by inference alone. Re-check the final release build, permissions, endpoints, Ads/Billing state, and third-party behavior immediately before submission.
