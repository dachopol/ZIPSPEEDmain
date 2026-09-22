import fs from"node:fs/promises";
const groups=[["index.html","app/applet/index.html","app/src/main/assets/index.html"],["src/styles.css","app/applet/src/styles.css","app/src/main/assets/src/styles.css"],["src/app.mjs","app/applet/src/app.mjs","app/src/main/assets/src/app.mjs"],["src/measurement.mjs","app/applet/src/measurement.mjs","app/src/main/assets/src/measurement.mjs"]];
for(const g of groups){const t=await Promise.all(g.map(f=>fs.readFile(f,"utf8")));if(!t.every(x=>x===t[0]))throw new Error("Mirror mismatch: "+g.join(", "))}
const html=await fs.readFile("index.html","utf8"),css=await fs.readFile("src/styles.css","utf8"),app=await fs.readFile("src/app.mjs","utf8"),m=await fs.readFile("src/measurement.mjs","utf8");
for(const token of["Precision Mode","Ad-Free","Cloudflare Anycast","Speed & Network","Math.random()","Mock speed"]){for(const[name,text]of[["html",html],["css",css],["app",app],["measurement",m]])if(text.includes(token))throw new Error(name+": legacy token "+token)}
if((html.match(/id="goButton"/g)||[]).length!==1)throw new Error("Expected exactly one GO/STOP control");
if(!css.includes("--blue:#3B82F6")||!css.includes("--radius:28px")||!css.includes("--blur:40px"))throw new Error("Design tokens missing");
if(!css.includes("font-variant-numeric:tabular-nums"))throw new Error("Tabular numerals missing");
if(!app.includes('ENDPOINT="https://speed.cloudflare.com"'))throw new Error("Measurement endpoint missing");
if(!app.includes("navigator.share"))throw new Error("Share flow missing");
if(!app.includes("document.hidden&&running"))throw new Error("Background cancellation missing");
if(!m.includes("downloadBytes:3*1024*1024")||!m.includes("downloadBytes:10*1024*1024"))throw new Error("Profiles missing");
const pkg=JSON.parse(await fs.readFile("package.json","utf8")),meta=JSON.parse(await fs.readFile("metadata.json","utf8")),ver=JSON.parse(await fs.readFile("version.json","utf8")),gradle=await fs.readFile("app/build.gradle.kts","utf8");
for(const[name,value]of[["package",pkg.version],["metadata",meta.version],["version",ver.version]])if(value!=="50.0.0")throw new Error(name+" version mismatch");
if(!gradle.includes("versionCode = 50")||!gradle.includes('versionName = "50.0.0"'))throw new Error("Android version mismatch");
console.log("Zipspeed v50 clean rebuild audit passed.");
