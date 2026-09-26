import{spawn,spawnSync}from"node:child_process";import fs from"node:fs/promises";import path from"node:path";
const appPort=4180,debugPort=9223,base=`http://127.0.0.1:${appPort}`,sleep=ms=>new Promise(r=>setTimeout(r,ms));
function chromePath(){for(const name of["google-chrome","google-chrome-stable","chromium","chromium-browser"]){const r=spawnSync("which",[name],{encoding:"utf8"});if(r.status===0&&r.stdout.trim())return r.stdout.trim()}throw new Error("Chrome/Chromium not found")}
async function waitHttp(url,timeout=30000){const end=Date.now()+timeout;while(Date.now()<end){try{const r=await fetch(url);if(r.ok)return r}catch{}await sleep(150)}throw new Error("Timeout waiting for "+url)}
let server=null,chrome=null,ws=null;
try{
 await fs.rm("browser-artifacts",{recursive:true,force:true});await fs.mkdir("browser-artifacts",{recursive:true});
 server=spawn(process.execPath,["server.mjs"],{env:{...process.env,PORT:String(appPort)},stdio:["ignore","pipe","pipe"]});
 await waitHttp(base+"/health");
 const chromeBin=chromePath(),profile=path.join("/tmp","zipspeed-browser-"+process.pid);
 chrome=spawn(chromeBin,["--headless=new","--no-sandbox","--disable-gpu","--disable-dev-shm-usage","--remote-debugging-address=127.0.0.1",`--remote-debugging-port=${debugPort}`,`--user-data-dir=${profile}`,"about:blank"],{stdio:"ignore"});
 await waitHttp(`http://127.0.0.1:${debugPort}/json/version`);
 const targets=await fetch(`http://127.0.0.1:${debugPort}/json/list`).then(r=>r.json()),target=targets.find(x=>x.type==="page")||targets[0];
 if(!target?.webSocketDebuggerUrl)throw new Error("No Chrome debug target");
 ws=new WebSocket(target.webSocketDebuggerUrl);
 await new Promise((resolve,reject)=>{ws.addEventListener("open",resolve,{once:true});ws.addEventListener("error",reject,{once:true})});
 let seq=0;const pending=new Map();
 ws.addEventListener("message",event=>{const msg=JSON.parse(typeof event.data==="string"?event.data:Buffer.from(event.data).toString());if(msg.id&&pending.has(msg.id)){const{resolve,reject}=pending.get(msg.id);pending.delete(msg.id);msg.error?reject(new Error(msg.error.message)):resolve(msg.result)}});
 const send=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
 const evaluate=async expression=>{const out=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});if(out.exceptionDetails)throw new Error(out.exceptionDetails.text||"Browser evaluation failed");return out.result?.value};
 const waitEval=async(expr,timeout=10000)=>{const end=Date.now()+timeout;while(Date.now()<end){if(await evaluate(expr))return true;await sleep(120)}throw new Error("Browser condition timeout: "+expr)};
 await send("Page.enable");await send("Runtime.enable");await send("Page.navigate",{url:base+"/"});
 await waitEval('document.readyState==="complete"');
 await waitEval('document.getElementById("appVersion")?.textContent==="v77.0.0"');
 for(const width of[320,390,768]){
   await send("Emulation.setDeviceMetricsOverride",{width,height:844,deviceScaleFactor:1,mobile:width<600});
   await sleep(120);
   const viewportOk=await evaluate(`(()=>{const go=document.getElementById("goButton")?.getBoundingClientRect(),hero=document.querySelector(".hero-card")?.getBoundingClientRect();return document.documentElement.scrollWidth<=window.innerWidth+1&&!!go&&go.left>=-1&&go.right<=window.innerWidth+1&&!!hero&&hero.left>=-1&&hero.right<=window.innerWidth+1})()`);
   if(!viewportOk)throw new Error("Responsive overflow at "+width+"px");
 }
 await send("Emulation.clearDeviceMetricsOverride");
 await sleep(120);
 const version=await evaluate('document.getElementById("appVersion").textContent');
 const goInitial=await evaluate('document.getElementById("goButton").textContent');
 if(goInitial!=="GO")throw new Error("GO initial state invalid");
 const shareDisabled=await evaluate('document.getElementById("shareButton").disabled');
 if(shareDisabled!==true)throw new Error("Share must be disabled before result");
 const settingsActive=await evaluate('(()=>{document.querySelector("[data-tab=settings]").click();return document.getElementById("settings").classList.contains("active")&&document.querySelector("[data-tab=settings]").getAttribute("aria-selected")==="true"})()');
 if(!settingsActive)throw new Error("Settings tab interaction failed");
 const keyboardTabs=await evaluate('(()=>{const start=document.querySelector("[data-tab=settings]");start.focus();start.dispatchEvent(new KeyboardEvent("keydown",{key:"ArrowRight",bubbles:true}));const next=document.activeElement;return next?.dataset?.tab==="adfree"&&next.getAttribute("aria-selected")==="true"&&next.tabIndex===0&&start.tabIndex===-1})()');
 if(!keyboardTabs)throw new Error("Keyboard tab navigation failed");
 await send("Emulation.setDeviceMetricsOverride",{width:320,height:844,deviceScaleFactor:1,mobile:true});
 await evaluate('document.querySelector("[data-tab=adfree]").click()');
 await sleep(180);
 const activeTabVisible=await evaluate('(()=>{const strip=document.querySelector(".tabs")?.getBoundingClientRect(),tab=document.querySelector("[data-tab=adfree]")?.getBoundingClientRect();return !!strip&&!!tab&&tab.left>=strip.left-1&&tab.right<=strip.right+1})()');
 if(!activeTabVisible)throw new Error("Active tab did not scroll into view on narrow viewport");

 const secondaryPagesOk=await evaluate('(()=>{for(const id of["video","status","history","settings","adfree"]){const tab=document.querySelector("[data-tab="+id+"]");tab.click();const page=document.getElementById(id),r=page.getBoundingClientRect();if(document.documentElement.scrollWidth>window.innerWidth+1||r.left<-1||r.right>window.innerWidth+1)return false}const select=document.getElementById("profileSetting").getBoundingClientRect();return select.left>=-1&&select.right<=window.innerWidth+1&&document.querySelectorAll("#videoList .video-card").length>0})()');
 if(!secondaryPagesOk)throw new Error("Secondary page responsive polish failed at 320px");
 const thaiVideoHierarchy=await evaluate('(()=>{document.querySelector("[data-tab=video]").click();const s=document.querySelector("#videoList .video-card span small");return !!s&&s.textContent.startsWith("เกณฑ์อ้างอิง ")&&getComputedStyle(s).display==="block"})()');
 if(!thaiVideoHierarchy)throw new Error("Thai video threshold hierarchy invalid");

 await send("Emulation.clearDeviceMetricsOverride");

 const english=await evaluate('(()=>{const e=document.getElementById("languageSetting");e.value="en";e.dispatchEvent(new Event("change",{bubbles:true}));return document.querySelector("[data-i18n=testProfile]").textContent==="Test profile"})()');
 if(!english)throw new Error("English switch failed");
 const englishTabs=await evaluate('JSON.stringify([...document.querySelectorAll(".tab")].map(x=>x.textContent.trim()))===JSON.stringify(["Speed","Video","Status","Map","History","Settings","Ad-free"])');
 if(!englishTabs)throw new Error("English tab translations incomplete");
 const englishVideoThreshold=await evaluate('(()=>{document.querySelector("[data-tab=video]").click();const s=document.querySelector("#videoList .video-card span small");return !!s&&s.textContent.startsWith("Reference ")})()');
 if(!englishVideoThreshold)throw new Error("English video threshold translation incomplete");
 const thai=await evaluate('(()=>{const e=document.getElementById("languageSetting");e.value="th";e.dispatchEvent(new Event("change",{bubbles:true}));return document.querySelector("[data-i18n=testProfile]").textContent==="รูปแบบการทดสอบ"})()');
 if(!thai)throw new Error("Thai switch failed");
 const thaiTabs=await evaluate('JSON.stringify([...document.querySelectorAll(".tab")].map(x=>x.textContent.trim()))===JSON.stringify(["ความเร็ว","วิดีโอ","สถานะ","แผนที่","ประวัติ","ตั้งค่า","ไม่มีโฆษณา"])');
 if(!thaiTabs)throw new Error("Thai tab translations incomplete");
 const privacyHref=await evaluate('document.querySelector(".privacy-link")?.getAttribute("href")');
 if(privacyHref!=="./privacy.html")throw new Error("Privacy link missing");
 await evaluate('document.querySelector("[data-tab=speed]").click();document.getElementById("goButton").click()');
 const stopVisible=await evaluate('document.getElementById("goButton").textContent==="STOP"');
 if(!stopVisible)throw new Error("GO did not enter STOP state");
 const measurementLocked=await evaluate('["profileSetting","connectionSetting","serverSetting"].every(id=>document.getElementById(id).disabled) && !document.getElementById("languageSetting").disabled');
 if(!measurementLocked)throw new Error("Measurement settings were not locked during test");
 const stopStarted=Date.now();
 await evaluate('document.getElementById("goButton").click()');
 await waitEval('document.getElementById("goButton").textContent==="GO"',3000);
 const stopLatencyMs=Date.now()-stopStarted;
 if(stopLatencyMs>1500)throw new Error("STOP preflight abort too slow: "+stopLatencyMs+" ms");
 const measurementUnlocked=await evaluate('["profileSetting","connectionSetting","serverSetting"].every(id=>!document.getElementById(id).disabled)');
 if(!measurementUnlocked)throw new Error("Measurement settings did not unlock after stop");
 const abortedHealthNotFailure=await evaluate('!document.getElementById("serverHealthValue").textContent.includes("ใช้ไม่ได้") && !document.getElementById("serverHealthValue").textContent.includes("Unavailable")');
 if(!abortedHealthNotFailure)throw new Error("User STOP was incorrectly rendered as server-health failure");
 await evaluate('document.getElementById("goButton").click()');
 await waitEval('document.getElementById("goButton").textContent==="STOP"',1500);
 await evaluate('document.dispatchEvent(new KeyboardEvent("keydown",{key:"Escape",bubbles:true}))');
 await waitEval('document.getElementById("goButton").textContent==="GO"',7000);
 const evidence={generatedAt:new Date().toISOString(),chrome:chromeBin,version,tabSwitch:true,keyboardTabNavigation:true,activeTabAutoScroll:true,secondaryPagesResponsive:true,videoThresholdHierarchy:true,responsiveViewportWidths:[320,390,768],languageSwitch:true,fullTabTranslations:true,measurementSettingsLock:true,stopPreflightLatencyMs:stopLatencyMs,privacyLink:true,goStopPreflight:true,escapeAbort:true,shareDisabledBeforeResult:true};
 await fs.writeFile("browser-artifacts/browser-interaction.json",JSON.stringify(evidence,null,2));
 console.log("BROWSER INTERACTION PASS — tabs/language/GO-STOP/Escape/privacy");
}finally{try{ws?.close()}catch{};try{chrome?.kill("SIGTERM")}catch{};try{server?.kill("SIGTERM")}catch{}}
