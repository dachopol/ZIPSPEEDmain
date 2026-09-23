import fs from "node:fs/promises";

const mirrors = [
  ["index.html", "app/applet/index.html", "app/src/main/assets/index.html"],
  ["src/styles.css", "app/applet/src/styles.css", "app/src/main/assets/src/styles.css"],
  ["src/app.mjs", "app/applet/src/app.mjs", "app/src/main/assets/src/app.mjs"],
  ["src/measurement.mjs", "app/applet/src/measurement.mjs", "app/src/main/assets/src/measurement.mjs"],
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
const server = await fs.readFile("server.mjs", "utf8");
const pkg = JSON.parse(await fs.readFile("package.json", "utf8"));
const metadata = JSON.parse(await fs.readFile("metadata.json", "utf8"));
const gradle = await fs.readFile("app/build.gradle.kts", "utf8");
const manifest = await fs.readFile("app/src/main/AndroidManifest.xml", "utf8");
const activity = await fs.readFile("app/src/main/java/com/aistudio/zipspeed/zskt/MainActivity.java", "utf8");

for (const token of ["Precision Mode", "Ad-Free", "Cloudflare Anycast", "Speed & Network", "Math.random()", "Mock speed"]) {
  for (const [name, text] of [["html", html], ["css", css], ["app", app], ["measurement", measurement]]) {
    if (text.includes(token)) throw new Error(name + ": legacy/synthetic token: " + token);
  }
}

if ((html.match(/id="goButton"/g) || []).length !== 1) throw new Error("Expected exactly one GO/STOP control");
if (!css.includes("--blue:#3B82F6") || !css.includes("--radius:28px") || !css.includes("--blur:40px")) throw new Error("Design tokens missing");
if (!css.includes("font-variant-numeric:tabular-nums")) throw new Error("Tabular numerals missing");
if (!html.includes('class="instrument-shell"') || !html.includes('class="metric-deck"')) throw new Error("Premium instrument hierarchy missing");
if (html.includes("clay-panel") || html.includes("clay-card")) throw new Error("Legacy heavy clay layout returned");

if (!app.includes('ENDPOINT="https://speed.cloudflare.com"')) throw new Error("Measurement endpoint missing");
if (!app.includes("navigator.share")) throw new Error("Share flow missing");
if (!app.includes('const HISTORY_KEY="zipspeed_history"')) throw new Error("Stable history key missing");
if (!app.includes("mergeHistoryRecords")) throw new Error("History migration missing");
if (!app.includes("zipspeedStopForLifecycle")) throw new Error("Lifecycle STOP hook missing");
if (!app.includes('setAttribute("aria-pressed"')) throw new Error("ARIA pressed state missing");
if (!app.includes('setAttribute("aria-current"')) throw new Error("ARIA navigation state missing");
if (!app.includes('t("overhead")') || !app.includes('t("probeFail")')) throw new Error("Localized dynamic labels missing");

if (!measurement.includes("downloadBytes:3*1024*1024") || !measurement.includes("downloadBytes:10*1024*1024")) throw new Error("Test profiles missing");
if (!measurement.includes("mergeHistoryRecords")) throw new Error("History merge helper missing");

if (pkg.version !== "52.0.0" || pkg.zipspeed?.versionCode !== 52) throw new Error("package.json canonical version mismatch");
if (metadata.versionSource !== "package.json" || Object.hasOwn(metadata, "version")) throw new Error("metadata must reference canonical version only");
if (!gradle.includes('packageInt("versionCode")') || !gradle.includes('packageString("version")')) throw new Error("Gradle must read version from package.json");
try {
  await fs.access("version.json");
  throw new Error("version.json must not exist; package.json is the single version source");
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

if (!manifest.includes("android.permission.INTERNET")) throw new Error("INTERNET permission missing");
if (!manifest.includes("android.permission.ACCESS_NETWORK_STATE")) throw new Error("ACCESS_NETWORK_STATE required for connectivity status UI");
if (!manifest.includes('android:usesCleartextTraffic="false"')) throw new Error("Cleartext traffic must remain disabled");
if (!activity.includes("zipspeedStopForLifecycle")) throw new Error("Android lifecycle STOP hook missing");
if (!activity.includes("MIXED_CONTENT_NEVER_ALLOW")) throw new Error("WebView mixed-content hardening missing");

if (!server.includes("path.relative(root, candidate)")) throw new Error("Server path traversal hardening missing");
if (!server.includes("Content-Security-Policy")) throw new Error("Server CSP missing");
if (/v50|v51/.test(server)) throw new Error("Server contains stale version label");

console.log("Zipspeed v52 project-wide audit passed.");
