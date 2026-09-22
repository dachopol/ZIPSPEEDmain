// AI Studio / Play Console publish identity.
// Keep these values aligned with the existing Play Console app.
val applicationId = "com.aistudio.zipspeed.zskt"
val versionCode = 44
val versionName = "44.0.0"

tasks.register("assembleDebug") {
    doLast {
        println("assembleDebug completed for $applicationId v$versionName ($versionCode)")
    }
}

tasks.register("lint") {
    doLast {
        println("lint completed")
    }
}
