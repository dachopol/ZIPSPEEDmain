import fs from "node:fs/promises";

const mirrors = [
  ["index.html", "app/applet/index.html", "app/src/main/assets/index.html"],
  ["src/styles.css", "app/applet/src/styles.css", "app/src/main/assets/src/styles.css"],
  ["src/app.mjs", "app/applet/src/app.mjs", "app/src/main/assets/src/app.mjs"],
  ["src/measurement.mjs", "app/applet/src/measurement.mjs", "app/src/main/assets/src/measurement.mjs"],
  ["src/quality.mjs", "app/applet/src/quality.mjs", "app/src/main/assets/src/quality.mjs"],
  ["src/servers.mjs", "app/applet/src/servers.mjs", "app/src/main/assets/src/servers.mjs"],
  ["package.json", "app/applet/package.json", "app/src/main/assets/package.json"],
  ["server.mjs", "app/applet/server.mjs"]
];

for (const group of mirrors) {
  const contents = await Promise.all(group.map(file => fs.readFile(file, "utf8")));
  if (!contents.every(text => text === contents[0])) throw new Error("Mirror mismatch: " + group.join(", "));
}

const html = await fs.readFile("index.html", "utf8");
const css = await fs.readFile("src/styles.css", "utf8");
const app = await fs.readFile("src/app.mjs", "utf8");
const measurement = await fs.readFile("src/measurement.mjs", "utf8");
const quality = await fs.readFile("src/quality.mjs", "utf8");
const servers = await fs.readFile("src/servers.mjs", "utf8");
const server = await fs.readFile("server.mjs", "utf8");
const pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
const lock = JSON.parse(await fs.readFile("package-lock.json", "utf8"));
const metadata = JSON.parse(await fs.readFile("metadata.json", "utf8"));
const gradle = await fs.readFile("app/build.gradle.kts", "utf8");
const manifest = await fs.readFile("app/src/main/AndroidManifest.xml", "utf8");
const activity = await fs.readFile("app/src/main/java/com/aistudio/zipspeed/zskt/MainActivity.java", "utf8");
const buildScript = await fs.readFile("build.mjs", "utf8");
const runtimeCheck = await fs.readFile("runtime-check.mjs", "utf8");
const ci = await fs.readFile(".github/workflows/ci.yml", "utf8");
if (!buildScript.includes('"quality.mjs", "servers.mjs"')) throw new Error("Static build must include runtime modules");
if (!runtimeCheck.includes("Emulation.setDeviceMetricsOverride") || !runtimeCheck.includes("Page.captureScreenshot")) throw new Error("Browser runtime gate missing responsive/screenshot checks");
if (!ci.includes("web-runtime:") || !ci.includes("npm run runtime:check")) throw new Error("CI browser runtime job missing");

for (const token of ["Precision Mode", "Ad-Free", "Cloudflare Anycast", "Speed & Network", "Math.random()", "Mock speed"]) {
  for (const [name, text] of [["html", html], ["css", css], ["app", app], ["measurement", measurement]]) {
    if (text.includes(token)) throw new Error(name + ": legacy/synthetic token: " + token);
  }
}

if ((html.match(/id="goButton"/g) || []).length !== 1) throw new Error("Expected exactly one GO/STOP control");
if (!html.includes('id="appVersion"') || !css.includes(".version-badge")) throw new Error("Visible preview version badge missing");
if (!html.includes('id="healthPanel"') || !html.includes('id="useCaseGrid"')) throw new Error("Visible measured health UI missing");
if (!app.includes('fetch("./package.json"') || !app.includes("loadAppVersion")) throw new Error("Preview must load version from package.json");
const versionBadgeMarkup = html.match(/<span id="appVersion"[^>]*>([^<]*)<\/span>/);
if (!versionBadgeMarkup || versionBadgeMarkup[1].trim() !== "v--") throw new Error("Preview version badge must start unresolved and load package.json at runtime");
if (!css.includes("--blue:#3B82F6") || !css.includes("--radius:28px") || !css.includes("--blur:40px")) throw new Error("Design tokens missing");
if (!css.includes("font-variant-numeric:tabular-nums")) throw new Error("Tabular numerals missing");
if (!html.includes('class="instrument-shell"') || !html.includes('class="metric-deck"')) throw new Error("Premium instrument hierarchy missing");
if (!html.includes("instrument-depth-back") || !html.includes("instrument-depth-front")) throw new Error("Premium instrument depth layers missing");
if (!css.includes("grid-template-rows:35% auto minmax(10px,3%) auto 1fr")) throw new Error("Anti-overlap instrument grid missing");
if (!css.includes("@media(max-width:350px)") || !css.includes(".metric-deck{grid-template-columns:1fr}")) throw new Error("Small-phone anti-overlap fallback missing");
if (!css.includes("scroll-padding-bottom:var(--page-bottom-space)") || !css.includes(".toast{bottom:calc(var(--nav-height) + var(--nav-edge) + 18px)}")) throw new Error("Bottom navigation overlap protection missing");
if (app.includes("clay-card")) throw new Error("Legacy clay-card runtime class returned");

if (!app.includes("defaultServer()") || !app.includes("networkHealthIndex") || !app.includes("useCaseSuitability")) throw new Error("Measured health/server integration missing");
if (!servers.includes('baseUrl:"https://speed.cloudflare.com"')) throw new Error("Verified endpoint registry missing");
if (!servers.includes("region:null") || !servers.includes("coordinates:null")) throw new Error("Server registry must not invent location");
if (!quality.includes("down*0.30") || !quality.includes("latency*0.25")) throw new Error("Documented deterministic health model missing");
if (!quality.includes("throughputStats") || !quality.includes("diagnosticFlags")) throw new Error("Measured diagnostics helpers missing");
if (!html.includes('id="variationValue"') || !html.includes('id="flagsValue"')) throw new Error("Measured diagnostics UI missing");
if (!app.includes("throughputVariationPct") || !app.includes("sampleMbps=calculateMbps")) throw new Error("Interval throughput diagnostics integration missing");
if (!app.includes("navigator.share")) throw new Error("Share flow missing");
if (!app.includes('const HISTORY_KEY="zipspeed_history"')) throw new Error("Stable history key missing");
if (!app.includes("mergeHistoryRecords")) throw new Error("History migration missing");
if (!app.includes("zipspeedStopForLifecycle")) throw new Error("Lifecycle STOP hook missing");

if (!measurement.includes("downloadBytes:3*1024*1024") || !measurement.includes("downloadBytes:10*1024*1024")) throw new Error("Test profiles missing");
if (!measurement.includes("CONNECTION_MODES") || !measurement.includes("splitTransferBytes")) throw new Error("Connection mode transfer plan missing");
if (!html.includes('id="connectionModeSetting"') || !app.includes("connectionModeId") || !app.includes("currentXhrs")) throw new Error("Connection mode implementation missing");
if (!runtimeCheck.includes("Connection mode toggle failed")) throw new Error("Runtime connection-mode proof missing");

if (!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(pkg.version)) throw new Error("Invalid canonical semver");
if (!Number.isInteger(pkg.zipspeed?.versionCode) || pkg.zipspeed.versionCode < 1) throw new Error("Invalid canonical versionCode");
if (lock.version !== pkg.version || lock.packages?.[""]?.version !== pkg.version) throw new Error("package-lock version drift");
if (metadata.versionSource !== "package.json" || Object.hasOwn(metadata, "version")) throw new Error("metadata must reference canonical version only");
if (!gradle.includes("versionCodeFromPackage") || !gradle.includes("versionNameFromPackage")) throw new Error("Gradle must read version from package.json");

if (!manifest.includes("android.permission.INTERNET")) throw new Error("INTERNET permission missing");
if (!manifest.includes('android:usesCleartextTraffic="false"')) throw new Error("Cleartext traffic must remain disabled");
if (!activity.includes("zipspeedStopForLifecycle")) throw new Error("Android lifecycle STOP hook missing");
if (!activity.includes("MIXED_CONTENT_NEVER_ALLOW")) throw new Error("WebView mixed-content hardening missing");

if (!server.includes("path.relative(root, candidate)")) throw new Error("Server path traversal hardening missing");
if (!server.includes("Content-Security-Policy")) throw new Error("Server CSP missing");
if (!server.includes("connect-src \'self\' https://speed.cloudflare.com;")) throw new Error("CSP must allow same-origin runtime metadata plus measurement endpoint");

console.log(`Zipspeed ${pkg.version} project audit passed.`);
