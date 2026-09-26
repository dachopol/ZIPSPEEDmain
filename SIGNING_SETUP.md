# ZIPSPEED Release Signing Setup

Status: source support is configured; actual signing material is **not** stored in this repository.

Required environment variables:

- `ZIPSPEED_KEYSTORE_FILE` — path to the release keystore
- `ZIPSPEED_KEYSTORE_PASSWORD`
- `ZIPSPEED_KEY_ALIAS`
- `ZIPSPEED_KEY_PASSWORD`

Behavior:

- none configured → release source can compile unsigned for CI verification;
- some but not all configured → Gradle fails immediately;
- all configured → release build uses the supplied keystore;
- keystore/password values are never printed by the signing-status task.

Verification commands:

```text
gradle :app:zipspeedSigningStatus :app:bundleRelease
```

Expected status with real signing material: `ZIPSPEED_RELEASE_SIGNING=READY`.

Before Play upload, independently verify the produced AAB certificate and compare it with the intended Play App Signing/upload-key configuration. Do not create, rotate, replace, or upload signing keys by guess.
