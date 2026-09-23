import fs from "node:fs/promises";
import path from "node:path";

const POLICY_SNAPSHOT_DATE="2026-09-23";
const MOBILE_TARGET_API_MIN=36;
const PLAY_VERSION_CODE_MAX=2100000000;

const pkg=JSON.parse(await fs.readFile("package.json","utf8"));
const gradle=await fs.readFile("app/build.gradle.kts","utf8");
const manifest=await fs.readFile("app/src/main/AndroidManifest.xml","utf8");
const ci=await fs.readFile(".github/workflows/ci.yml","utf8");
const html=await fs.readFile("index.html","utf8");

const fail=message=>{throw new Error(message)};
const intValue=(source,key)=>{
  const match=source.match(new RegExp(key+"\\s*=\\s*(\\d+)"));
  return match?Number(match[1]):null;
};
const stringValue=(source,key)=>{
  const match=source.match(new RegExp(key+'\\s*=\\s*"([^"]+)"'));
  return match?match[1]:null;
};

const targetSdk=intValue(gradle,"targetSdk");
const compileSdk=intValue(gradle,"compileSdk");
const applicationId=stringValue(gradle,"applicationId");
const sourceChecks={
  packageMatchesCanonical:applicationId===pkg.zipspeed.packageId,
  targetApi36OrHigher:Number.isInteger(targetSdk)&&targetSdk>=MOBILE_TARGET_API_MIN,
  compileSdkCoversTarget:Number.isInteger(compileSdk)&&Number.isInteger(targetSdk)&&compileSdk>=targetSdk,
  versionCodeValid:Number.isInteger(pkg.zipspeed.versionCode)&&pkg.zipspeed.versionCode>0&&pkg.zipspeed.versionCode<=PLAY_VERSION_CODE_MAX,
  cleartextDisabled:manifest.includes('android:usesCleartextTraffic="false"'),
  aabCompileGatePresent:ci.includes("gradle :app:bundleRelease"),
  privacyTransparencyPresent:html.includes('class="privacy-panel"')
};

for(const [name,pass] of Object.entries(sourceChecks))if(!pass)fail("Play source gate failed: "+name);

const hasAdsSdk=/play-services-ads|com\.google\.android\.gms\.ads|admob/i.test(gradle);
const hasBillingSdk=/billingclient|com\.android\.billingclient/i.test(gradle);

const evidence={
  generatedAt:new Date().toISOString(),
  policySnapshotDate:POLICY_SNAPSHOT_DATE,
  app:{
    packageId:pkg.zipspeed.packageId,
    version:pkg.version,
    versionCode:pkg.zipspeed.versionCode,
    targetSdk,
    compileSdk,
    testBuild:true
  },
  sourceChecks,
  expectedConsoleDeclarations:{
    ads:hasAdsSdk?"REVIEW REQUIRED":"Current source indicates no ads SDK; Play Ads declaration should match the actual uploaded build.",
    billing:hasBillingSdk?"REVIEW REQUIRED":"Current source indicates no Play Billing SDK.",
    privacyPolicy:"TO VERIFY — Play requires a comprehensive policy in Play Console and accessible in-app; current external policy must match this build.",
    dataSafety:"TO VERIFY — required for closed/open/production tracks; internal-testing-only apps are exempt from the Data Safety form.",
    contentRating:"TO VERIFY — all Play apps require an IARC content rating.",
    targetAudience:"TO VERIFY — declare the actual target age groups; children selections trigger Families requirements.",
    appAccess:"TO VERIFY — provide reviewer access instructions if any content is restricted.",
    playAppSigning:"UNVERIFIED — source compile does not prove upload-key/App Signing configuration.",
    signedUploadableAab:"UNVERIFIED — bundleRelease compile is not proof of a correctly upload-signed AAB.",
    packageRegistration:"TO VERIFY — Play package registration requirement becomes effective 2026-09-30.",
    developerIdentity:"TO VERIFY in Play Console.",
    closedTesting:"CONDITIONAL — for qualifying new personal developer accounts, production access requires at least 12 opted-in closed testers continuously for the preceding 14 days.",
    productionAccess:"UNVERIFIED"
  },
  policyReferences:[
    "https://support.google.com/googleplay/android-developer/answer/11926878",
    "https://support.google.com/googleplay/android-developer/answer/14151465",
    "https://support.google.com/googleplay/android-developer/answer/10144311",
    "https://support.google.com/googleplay/android-developer/answer/9898843",
    "https://support.google.com/googleplay/android-developer/answer/9842756",
    "https://support.google.com/googleplay/android-developer/answer/16984799"
  ]
};

await fs.rm("play-console-evidence",{recursive:true,force:true});
await fs.mkdir("play-console-evidence",{recursive:true});
await fs.writeFile(path.join("play-console-evidence","play-console-test-gate.json"),JSON.stringify(evidence,null,2));
console.log(`Zipspeed ${pkg.version} Play Console test-source gate passed (policy snapshot ${POLICY_SNAPSHOT_DATE}).`);
