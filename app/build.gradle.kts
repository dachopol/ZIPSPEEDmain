plugins { id("com.android.application") }

val packageJsonFile = rootProject.layout.projectDirectory.file("package.json")
val packageJsonText = providers.fileContents(packageJsonFile).asText
fun packageValue(key: String): String {
    val json = packageJsonText.get()
    val match = Regex("\\\"" + Regex.escape(key) + "\\\"\\s*:\\s*(?:\\\"([^\\\"]+)\\\"|(\\d+))").find(json)
        ?: error("Missing " + key + " in package.json")
    return match.groups[1]?.value ?: match.groups[2]?.value
        ?: error("Invalid " + key + " in package.json")
}
val versionNameFromPackage = packageValue("version")
val versionCodeFromPackage = packageValue("versionCode").toInt()

val releaseSigningEnv = mapOf(
    "storeFile" to System.getenv("ZIPSPEED_KEYSTORE_FILE"),
    "storePassword" to System.getenv("ZIPSPEED_KEYSTORE_PASSWORD"),
    "keyAlias" to System.getenv("ZIPSPEED_KEY_ALIAS"),
    "keyPassword" to System.getenv("ZIPSPEED_KEY_PASSWORD")
)
val configuredSigningValues = releaseSigningEnv.filterValues { !it.isNullOrBlank() }
val releaseSigningReady = configuredSigningValues.size == releaseSigningEnv.size
if (configuredSigningValues.isNotEmpty() && !releaseSigningReady) {
    error("Incomplete ZIPSPEED release signing environment. Configure all four required variables or none.")
}
if (releaseSigningReady && !rootProject.file(releaseSigningEnv.getValue("storeFile")!!).isFile) {
    error("ZIPSPEED release keystore file does not exist.")
}

val generatedAssetsDir = layout.buildDirectory.dir("generated/zipspeedAssets")
val prepareZipspeedAssets = tasks.register("prepareZipspeedAssets") {
    inputs.dir(rootProject.file("web"))
    inputs.file(rootProject.file("package.json"))
    outputs.dir(generatedAssetsDir)
    doLast {
        val out = generatedAssetsDir.get().asFile
        delete(out)
        copy { from(rootProject.file("web")); into(out) }
        val indexFile = out.resolve("index.html")
        indexFile.writeText(indexFile.readText().replace("__ZIPSPEED_VERSION__", versionNameFromPackage))
        file(out.resolve("version.json")).writeText("{\"version\":\"$versionNameFromPackage\",\"versionCode\":$versionCodeFromPackage}")
    }
}

android {
    namespace = "com.aistudio.zipspeed.zskt"
    compileSdk = 36

    defaultConfig {
        applicationId = "com.aistudio.zipspeed.zskt"
        minSdk = 24
        targetSdk = 36
        versionCode = versionCodeFromPackage
        versionName = versionNameFromPackage
        testInstrumentationRunner = "androidx.test.runner.AndroidJUnitRunner"
    }

    signingConfigs {
        if (releaseSigningReady) {
            create("release") {
                storeFile = rootProject.file(releaseSigningEnv.getValue("storeFile")!!)
                storePassword = releaseSigningEnv.getValue("storePassword")!!
                keyAlias = releaseSigningEnv.getValue("keyAlias")!!
                keyPassword = releaseSigningEnv.getValue("keyPassword")!!
            }
        }
    }

    buildTypes {
        release {
            isMinifyEnabled = false
            if (releaseSigningReady) {
                signingConfig = signingConfigs.getByName("release")
            }
        }
    }

    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
    sourceSets.getByName("main").assets.srcDir(generatedAssetsDir.get().asFile)
}

tasks.named("preBuild").configure { dependsOn(prepareZipspeedAssets) }
tasks.register("zipspeedSigningStatus") {
    doLast {
        println("ZIPSPEED_RELEASE_SIGNING=" + if (releaseSigningReady) "READY" else "UNCONFIGURED")
    }
}

dependencies {
    androidTestImplementation("androidx.test:runner:1.7.0")
    androidTestImplementation("androidx.test:core:1.7.0")
    androidTestImplementation("androidx.test.ext:junit:1.3.0")
    androidTestImplementation("junit:junit:4.13.2")
}
