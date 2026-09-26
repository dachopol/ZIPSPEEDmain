import fs from "node:fs/promises";
import path from "node:path";
import { execFileSync } from "node:child_process";

const pkg=JSON.parse(await fs.readFile("package.json","utf8"));
const manifest=await fs.readFile("app/src/main/AndroidManifest.xml","utf8");
const gradle=await fs.readFile("app/build.gradle.kts","utf8");
const app=await fs.readFile("web/src/app.mjs","utf8");
const gitignore=await fs.readFile(".gitignore","utf8");
const signingDoc=await fs.readFile("SIGNING_SETUP.md","utf8");
const fail=m=>{throw new Error(m)};

const permissions=[...manifest.matchAll(/<uses-permission\s+android:name="([^"]+)"/g)].map(x=>x[1]).sort();
const allowed=["android.permission.ACCESS_NETWORK_STATE","android.permission.INTERNET"].sort();
if(JSON.stringify(permissions)!==JSON.stringify(allowed))fail("Android permission set changed");
if(pkg.version!=="79.0.0"||pkg.zipspeed.versionCode!==79||pkg.zipspeed.packageId!=="com.aistudio.zipspeed.zskt")fail("Canonical identity/version drift");
if(!manifest.includes('android:icon="@mipmap/ic_launcher"')||!manifest.includes('android:roundIcon="@mipmap/ic_launcher"')||!manifest.includes('android:theme="@style/Theme.Zipspeed.Launcher"'))fail("Android launcher/splash branding missing");
if(/play-services-ads|com\.google\.android\.gms\.ads|billingclient|com\.android\.billingclient|admob/i.test(gradle))fail("Ads/Billing dependency detected");
if(/clientIp\s*:|isp\s*:|edge\s*:|clientArea\s*:/.test(app.match(/lastResult=\{[\s\S]*?\}/)?.[0]||""))fail("History unexpectedly stores provider metadata");
if(!app.includes("navigator.share")||!app.includes("localStorage.setItem(HISTORY_KEY"))fail("Share/history path missing");

const signingEnv=["ZIPSPEED_KEYSTORE_FILE","ZIPSPEED_KEYSTORE_PASSWORD","ZIPSPEED_KEY_ALIAS","ZIPSPEED_KEY_PASSWORD"];
if(!signingEnv.every(x=>gradle.includes(x))||!gradle.includes("releaseSigningReady")||!gradle.includes('signingConfig = signingConfigs.getByName("release")'))fail("Release signing contract missing");
for(const rule of["*.jks","*.keystore","*.p12","keystore.properties","signing.properties"])if(!gitignore.includes(rule))fail("Signing secret ignore rule missing: "+rule);
if(!signingEnv.every(x=>signingDoc.includes(x)))fail("Signing setup documentation incomplete");

const tracked=execFileSync("git",["ls-files"],{encoding:"utf8"}).split(/\r?\n/).filter(Boolean);
const sensitive=tracked.filter(x=>/(^|\/)(keystore|signing)\.properties$/i.test(x)||/\.(jks|keystore|p12)$/i.test(x));
if(sensitive.length)fail("Tracked signing material detected: "+sensitive.join(", "));

const evidence={
  generatedAt:new Date().toISOString(),
  packageId:pkg.zipspeed.packageId,
  version:pkg.version,
  versionCode:pkg.zipspeed.versionCode,
  permissions,
  adsSdkDetected:false,
  billingSdkDetected:false,
  historyStorage:"localStorage",
  providerMetadataSavedToHistory:false,
  signingContract:"PASS_ENV_BASED_NO_TRACKED_SECRETS",
  storeReview:{
    inAppPrivacyPolicy:"PASS",
    privacyPolicyPublicUrl:"https://dachopol.github.io/privacy-policy/",
    privacyPolicyPublicUrlDeployment:"PASS",
    dataSafety:"TO VERIFY",
    signedUploadableAab:"TO VERIFY_WITH_REAL_SIGNING_ENV_AND_CERTIFICATE",
    playUpload:"UNVERIFIED",
    physicalAndroidRuntime:"PASS_WIFI_4G_TWO_DEVICES"
  }
};
await fs.rm("release-evidence",{recursive:true,force:true});
await fs.mkdir("release-evidence",{recursive:true});
await fs.writeFile(path.join("release-evidence","release-source-check.json"),JSON.stringify(evidence,null,2));
console.log("RELEASE-SOURCE PASS — signing contract present, real signed AAB remains TO VERIFY");
