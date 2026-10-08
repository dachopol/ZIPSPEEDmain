# ZIPSPEED Release Signing

This project never stores a release keystore or signing password in Git.

## Required GitHub Actions secrets

Configure these repository secrets before running the manual **ZIPSPEED signed release** workflow:

- `ZIPSPEED_KEYSTORE_BASE64` — base64 of the real ZIPSPEED upload keystore bytes.
- `ZIPSPEED_KEYSTORE_PASSWORD` — keystore password.
- `ZIPSPEED_KEY_ALIAS` — upload-key alias.
- `ZIPSPEED_KEY_PASSWORD` — key password.

The current Gradle signing contract still consumes only:

- `ZIPSPEED_KEYSTORE_FILE`
- `ZIPSPEED_KEYSTORE_PASSWORD`
- `ZIPSPEED_KEY_ALIAS`
- `ZIPSPEED_KEY_PASSWORD`

The manual workflow materializes the base64 secret into a temporary runner-only keystore file and sets `ZIPSPEED_KEYSTORE_FILE` for that run.

## Safety rules

- Use only the actual ZIPSPEED upload key associated with the Play Console app for `com.aistudio.zipspeed.zskt`.
- Do not reuse QR, YooClip, LandMeasure, debug, test, or unrelated app keystores.
- Never commit `.jks`, `.keystore`, passwords, base64 key material, or service-account JSON.
- Missing or partial signing configuration must fail; it must never silently fall back to a different key.
- The workflow is manual (`workflow_dispatch`) and does not run on ordinary pushes.

## Output when secrets are correct

The workflow creates a `zipspeed-signed-release` artifact containing:

- `app-release.aab`
- `app-release.aab.sha256`
- `signing-status.txt`
- `upload-certificate-sha256.txt`
- `aab-signer-certificate-sha256.txt`

The workflow verifies the AAB signature before upload.

A signed artifact is still **TO VERIFY for Play** until the certificate matches the expected Play upload certificate and the live Play Console accepts the AAB.
