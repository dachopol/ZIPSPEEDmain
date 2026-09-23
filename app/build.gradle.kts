plugins { id("com.android.application") }

val packageJson = rootProject.file("package.json").readText()
val versionNameFromPackage =
    Regex(""version"\\s*:\\s*"([^"]+)"")
        .find(packageJson)?.groupValues?.get(1)
        ?: error("Missing version in package.json")
val versionCodeFromPackage =
    Regex(""versionCode"\\s*:\\s*(\\d+)")
        .find(packageJson)?.groupValues?.get(1)?.toInt()
        ?: error("Missing versionCode in package.json")

android {
    namespace = "com.aistudio.zipspeed.zskt"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.aistudio.zipspeed.zskt"
        minSdk = 24
        targetSdk = 36
        versionCode = versionCodeFromPackage
        versionName = versionNameFromPackage
    }

    buildTypes {
        release {
            isMinifyEnabled = false
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
