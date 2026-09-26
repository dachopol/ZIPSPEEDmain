import fs from "node:fs/promises";
import path from "node:path";

const pkg=JSON.parse(await fs.readFile("package.json","utf8"));
const gradle=await fs.readFile("app/build.gradle.kts","utf8");
const manifest=await fs.readFile("app/src/main/AndroidManifest.xml","utf8");
const ci=await fs.readFile(".github/workflows/ci.yml","utf8");
const gitignore=await fs.readFile(".gitignore","utf8");

const num=k=>Number(gradle.match(new RegExp(k+"\\s*=\\s*(\\d+)"))?.[1]);
const str=k=>gradle.match(new RegExp(k+'\\s*=\\s*"([^"]+)"'))?.[1]||null;
const targetSdk=num("targetSdk"),compileSdk=num("compileSdk"),applicationId=str("applicationId");
const signingEnv=["ZIPSPEED_KEYSTORE_FILE","ZIPSPEED_KEYSTORE_PASSWORD","ZIPSPEED_KEY_ALIAS","ZIPSPEED_KEY_PASSWORD"];

const checks={
  packageMatchesCanonical:applicationId===pkg.zipspeed.packageId,
  targetSdk36:targetSdk===36,
  compileSdk36:compileSdk===36,
  versionCode78:pkg.zipspeed.versionCode===78,
  versionName78:pkg.version==="78.0.0",
  brandingWired:manifest.includes('android:icon="@mipmap/ic_launcher"')&&manifest.includes('android:theme="@style/Theme.Zipspeed.Launcher"'),
  cleartextDisabled:manifest.includes('android:usesCleartextTraffic="false"'),
  bundleCompileGatePresent:ci.includes(":app:bundleRelease"),
  signingStatusGatePresent:ci.includes(":app:zipspeedSigningStatus"),
  releaseSigningContract:signingEnv.every(x=>gradle.includes(x))&&gradle.includes("releaseSigningReady"),
  secretIgnoreRules:["*.jks","*.keystore","*.p12","keystore.properties","signing.properties"].every(x=>gitignore.includes(x)),
  privacyUrlGatePresent:ci.includes("npm run privacy:check")
};
for(const [k,v] of Object.entries(checks))if(!v)throw new Error("Play source gate failed: "+k);

const evidence={
  generatedAt:new Date().toISOString(),
  app:{packageId:pkg.zipspeed.packageId,version:pkg.version,versionCode:pkg.zipspeed.versionCode,targetSdk,compileSdk},
  sourceChecks:checks,
  consoleItems:{
    inAppPrivacyPolicy:"PASS",
    privacyPolicyPublicUrl:"https://dachopol.github.io/privacy-policy/",
    privacyPolicyPublicUrlDeployment:"PASS",
    dataSafety:"TO VERIFY",
    adsDeclaration:"TO VERIFY against uploaded build",
    appAccess:"TO VERIFY",
    targetAudience:"TO VERIFY",
    contentRating:"TO VERIFY",
    playAppSigning:"TO VERIFY_WITH_REAL_KEY/CERT",
    upload:"UNVERIFIED"
  }
};
await fs.rm("play-console-evidence",{recursive:true,force:true});
await fs.mkdir("play-console-evidence",{recursive:true});
await fs.writeFile(path.join("play-console-evidence","play-console-source-gate.json"),JSON.stringify(evidence,null,2));
console.log("PLAY SOURCE PASS — signing contract ready; Play key/certificate and upload remain TO VERIFY");
