plugins { id("com.android.application") }

val packageJson = rootProject.file("package.json").readText()
fun packageString(name: String): String =
    Regex("\\\"\${name}\\\"\\s*:\\s*\\\"([^\\\"]+)\\\"")
        .find(packageJson)?.groupValues?.get(1)
        ?: error("Missing \${name} in package.json")
fun packageInt(name: String): Int =
    Regex("\\\"\${name}\\\"\\s*:\\s*(\\d+)")
        .find(packageJson)?.groupValues?.get(1)?.toInt()
        ?: error("Missing \${name} in package.json")

android {
    namespace = "com.aistudio.zipspeed.zskt"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.aistudio.zipspeed.zskt"
        minSdk = 24
        targetSdk = 36
        versionCode = packageInt("versionCode")
        versionName = packageString("version")
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
