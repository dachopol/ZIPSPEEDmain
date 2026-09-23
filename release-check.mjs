import fs from "node:fs/promises";
import path from "node:path";

const pkg=JSON.parse(await fs.readFile("package.json","utf8"));
const metadata=JSON.parse(await fs.readFile("metadata.json","utf8"));
const manifest=await fs.readFile("app/src/main/AndroidManifest.xml","utf8");
const gradle=await fs.readFile("app/build.gradle.kts","utf8");
const app=await fs.readFile("src/app.mjs","utf8");
const html=await fs.readFile("index.html","utf8");
const servers=await fs.readFile("src/servers.mjs","utf8");

const fail=message=>{throw new Error(message)};
const permissionMatches=[...manifest.matchAll(/<uses-permission\s+android:name="([^"]+)"/g)].map(m=>m[1]).sort();
const allowedPermissions=["android.permission.ACCESS_NETWORK_STATE","android.permission.INTERNET"].sort();
if(JSON.stringify(permissionMatches)!==JSON.stringify(allowedPermissions))fail("Android permission set changed; privacy/Data Safety evidence must be reviewed");

const prohibitedPermissionTokens=[
  "android.permission.CAMERA",
  "android.permission.RECORD_AUDIO",
  "android.permission.ACCESS_FINE_LOCATION",
  "android.permission.ACCESS_COARSE_LOCATION"
];
for(const token of prohibitedPermissionTokens)if(manifest.includes(token))fail("Unexpected privacy-sensitive permission: "+token);

const commerceTokens=[
  "play-services-ads",
  "com.google.android.gms.ads",
  "billingclient",
  "com.android.billingclient",
  "admob"
];
const gradleLower=gradle.toLowerCase();
for(const token of commerceTokens)if(gradleLower.includes(token))fail("Ads/Billing dependency detected; update privacy/store declarations: "+token);

if(!app.includes('const HISTORY_KEY="zipspeed_history"')||!app.includes("localStorage.setItem(HISTORY_KEY"))fail("Local-history implementation changed");
if(/clientIp\s*:|isp\s*:|effectiveType\s*:|downlinkMbps\s*:|saveData\s*:/.test(app.match(/const result=\{[\s\S]*?timestamp:new Date\(\)\.toISOString\(\)\}/)?.[0]||""))fail("Privacy-sensitive/browser hint fields unexpectedly added to saved result");
if(!app.includes("navigator.share"))fail("User-initiated share path missing");
if(!html.includes('class="privacy-panel"'))fail("Visible privacy transparency panel missing");
if(!metadata.requestFramePermissions||metadata.requestFramePermissions.length!==0)fail("Frame permission declaration changed");

const endpointMatches=[...servers.matchAll(/baseUrl:"(https:\/\/[^"]+)"/g)].map(m=>m[1]);
const discoveryMatches=[...servers.matchAll(/discoveryUrl:(?:MLAB_LOCATE_URL|"([^"]+)")/g)].map(m=>m[1]||"https://locate.measurementlab.net/v2/nearest/ndt/ndt7");
if(endpointMatches.length<1)fail("No measurement endpoint found");
if(!servers.includes("measurementEnabled:false")||!app.includes("discoverMlabServers")||!html.includes('id="privacyDiscoveryBody"'))fail("M-Lab discovery/privacy declaration drift");

const evidence={
  generatedAt:new Date().toISOString(),
  packageId:pkg.zipspeed.packageId,
  version:pkg.version,
  versionCode:pkg.zipspeed.versionCode,
  android:{
    permissions:permissionMatches,
    cleartextAllowed:!manifest.includes('android:usesCleartextTraffic="false"'),
    cameraPermission:false,
    microphonePermission:false,
    locationPermission:false
  },
  implementation:{
    completedHistoryStorage:"localStorage",
    savedHistoryIncludesClientIp:false,
    savedHistoryIncludesIsp:false,
    userInitiatedShare:true,
    adsSdkDetected:false,
    billingSdkDetected:false,
    measurementEndpoints:endpointMatches,
    optionalDiscoveryEndpoints:discoveryMatches,
    mlabNdt7MeasurementEnabled:false,
    manualCountryDiscovery:true,
    regionLanguageCoupled:false,
    browserNetworkHintsStored:false,
    browserNetworkHintsNewDestination:false
  },
  storeReview:{
    privacyPolicy:"TO VERIFY against current external policy",
    dataSafety:"TO VERIFY against current Play definitions and provider behavior",
    signing:"UNVERIFIED",
    playUpload:"UNVERIFIED"
  }
};

await fs.rm("release-evidence",{recursive:true,force:true});
await fs.mkdir("release-evidence",{recursive:true});
await fs.writeFile(path.join("release-evidence","release-source-check.json"),JSON.stringify(evidence,null,2));
console.log(`Zipspeed ${pkg.version} release-source evidence checks passed.`);
