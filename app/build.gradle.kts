plugins { id("com.android.application") }

val packageJson = rootProject.file("package.json").readText()
fun packageValue(key: String): String {
    val prefix = "\"" + key + "\""
    val line = packageJson.lineSequence().map { it.trim() }.firstOrNull { it.startsWith(prefix) }
        ?: error("Missing " + key + " in package.json")
    return line.substringAfter(":").trim().removeSuffix(",").trim().trim('"')
}
val versionNameFromPackage = packageValue("version")
val versionCodeFromPackage = packageValue("versionCode").toInt()
val generatedAssetsDir = layout.buildDirectory.dir("generated/zipspeedAssets")
val prepareZipspeedAssets = tasks.register("prepareZipspeedAssets") {
    inputs.dir(rootProject.file("web"))
    inputs.file(rootProject.file("package.json"))
    outputs.dir(generatedAssetsDir)
    doLast {
        val out = generatedAssetsDir.get().asFile
        delete(out)
        copy { from(rootProject.file("web")); into(out) }
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
    buildTypes { release { isMinifyEnabled = false } }
    compileOptions { sourceCompatibility = JavaVersion.VERSION_17; targetCompatibility = JavaVersion.VERSION_17 }
    sourceSets.getByName("main").assets.srcDir(generatedAssetsDir.get().asFile)
}
tasks.named("preBuild").configure { dependsOn(prepareZipspeedAssets) }

dependencies {
    androidTestImplementation("androidx.test:runner:1.7.0")
    androidTestImplementation("androidx.test:core:1.7.0")
    androidTestImplementation("androidx.test.ext:junit:1.3.0")
    androidTestImplementation("junit:junit:4.13.2")
}
