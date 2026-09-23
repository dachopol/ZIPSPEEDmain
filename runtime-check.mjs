import { spawn, spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";

const PORT=4173;
const BASE=`http://127.0.0.1:${PORT}`;
const ARTIFACT_DIR=path.resolve("runtime-artifacts");
const sleep=ms=>new Promise(resolve=>setTimeout(resolve,ms));

function findChrome(){
  const candidates=[
    process.env.CHROME_BIN,
    "google-chrome",
    "google-chrome-stable",
    "chromium",
    "chromium-browser"
  ].filter(Boolean);
  for(const candidate of candidates){
    const found=spawnSync("bash",["-lc",`command -v ${candidate}`],{encoding:"utf8"});
    if(found.status===0&&found.stdout.trim())return found.stdout.trim();
  }
  throw new Error("Chrome/Chromium executable not found");
}

async function waitFor(url,timeoutMs=15000){
  const started=Date.now();
  while(Date.now()-started<timeoutMs){
    try{
      const response=await fetch(url,{cache:"no-store"});
      if(response.ok)return response;
    }catch{}
    await sleep(150);
  }
  throw new Error(`Timed out waiting for ${url}`);
}

function startProcess(command,args,options={}){
  const child=spawn(command,args,{stdio:["ignore","pipe","pipe"],...options});
  let stdout="",stderr="";
  child.stdout?.on("data",chunk=>stdout+=String(chunk));
  child.stderr?.on("data",chunk=>stderr+=String(chunk));
  child.logs=()=>({stdout,stderr});
  return child;
}

async function connectCdp(wsUrl){
  const socket=new WebSocket(wsUrl);
  await new Promise((resolve,reject)=>{
    const timer=setTimeout(()=>reject(new Error("CDP websocket timeout")),10000);
    socket.addEventListener("open",()=>{clearTimeout(timer);resolve();},{once:true});
    socket.addEventListener("error",event=>{clearTimeout(timer);reject(new Error("CDP websocket error: "+String(event?.message||"unknown")));},{once:true});
  });
  let id=0;
  const pending=new Map();
  socket.addEventListener("message",event=>{
    let message;
    try{message=JSON.parse(String(event.data));}catch{return}
    if(message.id&&pending.has(message.id)){
      const {resolve,reject}=pending.get(message.id);
      pending.delete(message.id);
      if(message.error)reject(new Error(message.error.message||"CDP command failed"));
      else resolve(message.result||{});
    }
  });
  function send(method,params={}){
    const messageId=++id;
    return new Promise((resolve,reject)=>{
      pending.set(messageId,{resolve,reject});
      socket.send(JSON.stringify({id:messageId,method,params}));
    });
  }
  async function evaluate(expression){
    const result=await send("Runtime.evaluate",{expression,returnByValue:true,awaitPromise:true});
    if(result.exceptionDetails)throw new Error("Runtime evaluate failed");
    return result.result?.value;
  }
  return{socket,send,evaluate};
}

function assert(condition,message){
  if(!condition)throw new Error(message);
}

const server=startProcess(process.execPath,["server.mjs"],{
  env:{...process.env,PORT:String(PORT)}
});
let chrome;
try{
  await waitFor(`${BASE}/health`);
  const chromePath=findChrome();
  await fs.rm(ARTIFACT_DIR,{recursive:true,force:true});
  await fs.mkdir(ARTIFACT_DIR,{recursive:true});
  const userData=path.join(ARTIFACT_DIR,"chrome-profile");
  chrome=startProcess(chromePath,[
    "--headless=new",
    "--no-sandbox",
    "--disable-gpu",
    "--disable-dev-shm-usage",
    "--remote-debugging-address=127.0.0.1",
    "--remote-debugging-port=9222",
    `--user-data-dir=${userData}`,
    "about:blank"
  ]);
  await waitFor("http://127.0.0.1:9222/json/version");
  const targets=await (await fetch("http://127.0.0.1:9222/json/list")).json();
  const target=targets.find(item=>item.type==="page");
  if(!target?.webSocketDebuggerUrl)throw new Error("No Chrome page target");
  const cdp=await connectCdp(target.webSocketDebuggerUrl);
  const runtimeErrors=[];
  cdp.socket.addEventListener("message",event=>{
    try{
      const message=JSON.parse(String(event.data));
      if(message.method==="Runtime.exceptionThrown"){
        const detail=message.params?.exceptionDetails;
        runtimeErrors.push(detail?.exception?.description||detail?.text||"Runtime exception");
      }
      if(message.method==="Log.entryAdded"&&message.params?.entry?.level==="error"){
        runtimeErrors.push(message.params.entry.text||"Console error");
      }
    }catch{}
  });
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Log.enable");

  const pkg=JSON.parse(await fs.readFile("package.json","utf8"));
  const expectedVersion=`v${pkg.version}`;
  const widths=[320,360,412,768];
  const results=[];

  for(const width of widths){
    const height=width>=700?1100:900;
    await cdp.send("Emulation.setDeviceMetricsOverride",{
      width,height,deviceScaleFactor:1,mobile:width<700
    });
    runtimeErrors.length=0;
    await cdp.send("Page.navigate",{url:BASE+"/"});
    let ready=false;
    for(let attempt=0;attempt<60;attempt++){
      const state=await cdp.evaluate(`(()=>({
        readyState:document.readyState,
        version:document.querySelector("#appVersion")?.textContent?.trim()||null,
        appReady:typeof window.zipspeedStopForLifecycle==="function"
      }))()`);
      if(state?.readyState==="complete"&&state?.version===expectedVersion&&state?.appReady){ready=true;break}
      await sleep(100);
    }
    if(!ready){
      throw new Error(`App module did not become ready at ${width}px. Runtime errors: ${runtimeErrors.join(" | ")||"none captured"}`);
    }

    const snapshot=await cdp.evaluate(`(()=>{
      const rect=selector=>{
        const el=document.querySelector(selector);
        if(!el)return null;
        const r=el.getBoundingClientRect();
        return{left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height};
      };
      const overlap=(a,b)=>!!a&&!!b&&Math.max(a.left,b.left)<Math.min(a.right,b.right)&&Math.max(a.top,b.top)<Math.min(a.bottom,b.bottom);
      const brand=rect(".brand"),actions=rect(".header-actions"),go=rect("#goButton"),live=rect(".live-reading"),nav=rect(".bottom-nav");
      return{
        version:document.querySelector("#appVersion")?.textContent?.trim(),
        scrollWidth:document.documentElement.scrollWidth,
        innerWidth:window.innerWidth,
        goWidth:go?.width||0,
        goHeight:go?.height||0,
        headerOverlap:overlap(brand,actions),
        goLiveOverlap:overlap(go,live),
        navGoOverlap:overlap(nav,go),
        activeView:document.querySelector(".view.active")?.dataset?.view||null,
        goVisible:!!go&&go.width>0&&go.height>0,
        navVisible:!!nav&&nav.width>0&&nav.height>0
      };
    })()`);

    assert(snapshot.version===expectedVersion,`Version badge mismatch at ${width}px: ${snapshot.version}`);
    assert(snapshot.scrollWidth<=snapshot.innerWidth+1,`Horizontal overflow at ${width}px: ${snapshot.scrollWidth} > ${snapshot.innerWidth}`);
    assert(!snapshot.headerOverlap,`Header overlap at ${width}px`);
    assert(!snapshot.goLiveOverlap,`GO/live overlap at ${width}px`);
    assert(!snapshot.navGoOverlap,`Bottom nav overlaps GO at ${width}px`);
    assert(snapshot.goVisible&&snapshot.navVisible,`Critical control hidden at ${width}px`);
    assert(snapshot.goWidth>=44&&snapshot.goHeight>=44,`GO touch target too small at ${width}px`);

    const navState=await cdp.evaluate(`(()=>{
      document.querySelector('[data-target="status"]')?.click();
      return document.querySelector(".view.active")?.dataset?.view||null;
    })()`);
    assert(navState==="status",`Navigation failed at ${width}px`);

    const modeToggle=await cdp.evaluate(`(()=>{
      document.querySelector('[data-target="settings"]')?.click();
      const value=document.querySelector("#connectionModeValue");
      const button=document.querySelector("#connectionModeSetting");
      const before=value?.textContent?.trim()||null;
      button?.click();
      const after=value?.textContent?.trim()||null;
      button?.click();
      const restored=value?.textContent?.trim()||null;
      return{before,after,restored,scrollWidth:document.documentElement.scrollWidth,innerWidth:window.innerWidth};
    })()`);
    assert(modeToggle.before&&modeToggle.after&&modeToggle.before!==modeToggle.after&&modeToggle.restored===modeToggle.before,`Connection mode toggle failed at ${width}px`);
    assert(modeToggle.scrollWidth<=modeToggle.innerWidth+1,`Settings overflow at ${width}px`);
    const privacyVisible=await cdp.evaluate(`(()=>{const el=document.querySelector(".privacy-panel");if(!el)return false;const r=el.getBoundingClientRect();return r.width>0&&r.height>0&&document.querySelector("#privacyCommerceBody")?.textContent?.trim().length>0})()`);
    assert(privacyVisible,`Privacy panel missing at ${width}px`);

    if(width===360){
      const historyProof=await cdp.evaluate(`(()=>{
        const base={completed:true,aborted:false,uploadMbps:10,latencyMs:20,jitterMs:2,probeFailPct:0,profile:"quick",connectionMode:"single",streamCount:1,edge:"BKK"};
        localStorage.setItem("zipspeed_history",JSON.stringify([
          {...base,downloadMbps:50,timestamp:"2026-09-23T00:00:00.000Z"},
          {...base,downloadMbps:100,timestamp:"2026-09-23T01:00:00.000Z"}
        ]));
        return true;
      })()`);
      assert(historyProof,`History seed failed at ${width}px`);
      await cdp.send("Page.reload",{ignoreCache:true});
      await sleep(500);
      await cdp.evaluate(`document.querySelector('[data-target="history"]')?.click()`);
      const compareState=await cdp.evaluate(`(()=>({
        download:document.querySelector("#compareDownloadValue")?.textContent?.trim(),
        context:document.querySelector("#compareContext")?.textContent?.trim(),
        csvVisible:!!document.querySelector("#exportCsvButton")?.getBoundingClientRect().width
      }))()`);
      assert(compareState.download==="+100.0%",`History comparison runtime failed: ${compareState.download}`);
      assert(compareState.context&&compareState.context!=="--",`History comparison context missing`);
      assert(compareState.csvVisible,`CSV export control missing`);
    }

    const toggles=await cdp.evaluate(`(()=>{
      const beforeTheme=document.documentElement.dataset.theme;
      const beforeLang=document.documentElement.lang;
      document.querySelector("#themeButton")?.click();
      document.querySelector("#langButton")?.click();
      return{
        beforeTheme,
        afterTheme:document.documentElement.dataset.theme,
        beforeLang,
        afterLang:document.documentElement.lang
      };
    })()`);
    assert(toggles.beforeTheme!==toggles.afterTheme,`Theme toggle failed at ${width}px`);
    assert(toggles.beforeLang!==toggles.afterLang,`Language toggle failed at ${width}px`);

    await cdp.evaluate(`document.querySelector('[data-target="speed"]')?.click()`);
    const goStarted=await cdp.evaluate(`(()=>{
      const button=document.querySelector("#goButton");
      button?.click();
      return button?.getAttribute("aria-pressed");
    })()`);
    assert(goStarted==="true",`GO start event failed at ${width}px`);
    const goStopped=await cdp.evaluate(`(()=>{
      const button=document.querySelector("#goButton");
      button?.click();
      return button?.getAttribute("aria-pressed");
    })()`);
    await sleep(80);
    const stoppedState=await cdp.evaluate(`document.querySelector("#goButton")?.getAttribute("aria-pressed")`);
    assert(goStopped==="true"||goStopped==="false",`GO stop event did not execute at ${width}px`);
    assert(stoppedState==="false",`GO did not settle stopped at ${width}px`);

    const image=await cdp.send("Page.captureScreenshot",{format:"png",captureBeyondViewport:false});
    await fs.writeFile(path.join(ARTIFACT_DIR,`runtime-${width}.png`),Buffer.from(image.data,"base64"));
    results.push({width,height,...snapshot,navigation:"PASS",connectionMode:"PASS",privacy:"PASS",themeLanguage:"PASS",goStop:"PASS"});
  }

  async function setConnectionMode(mode){
    const desired=mode==="multi";
    const pressed=await cdp.evaluate(`document.querySelector("#connectionModeSetting")?.getAttribute("aria-pressed")`);
    if((pressed==="true")!==desired){
      await cdp.evaluate(`document.querySelector("#connectionModeSetting")?.click()`);
      await sleep(80);
    }
  }
  async function runRealNetworkTest(mode){
    await cdp.send("Emulation.setDeviceMetricsOverride",{width:360,height:900,deviceScaleFactor:1,mobile:true});
    await cdp.send("Page.navigate",{url:BASE+"/"});
    for(let attempt=0;attempt<60;attempt++){
      const ready=await cdp.evaluate(`typeof window.zipspeedStopForLifecycle==="function"&&document.querySelector("#appVersion")?.textContent?.trim()===${JSON.stringify(expectedVersion)}`);
      if(ready)break;
      await sleep(100);
    }
    await cdp.evaluate(`document.querySelector("#quickProfile")?.click()`);
    await setConnectionMode(mode);
    const before=await cdp.evaluate(`(()=>{try{return JSON.parse(localStorage.getItem("zipspeed_history")||"[]").length}catch{return 0}})()`);
    await cdp.evaluate(`document.querySelector("#goButton")?.click()`);
    let latest=null,phase=null,transfer=null;
    const deadline=Date.now()+120000;
    while(Date.now()<deadline){
      const state=await cdp.evaluate(`(()=>{
        let history=[];try{history=JSON.parse(localStorage.getItem("zipspeed_history")||"[]")}catch{}
        return{
          running:document.querySelector("#goButton")?.getAttribute("aria-pressed")==="true",
          phase:document.querySelector("#phaseLabel")?.textContent||"",
          transfer:document.querySelector("#transferLabel")?.textContent||"",
          count:history.length,
          latest:history.at(-1)||null
        };
      })()`);
      phase=state.phase;transfer=state.transfer;
      if(!state.running&&state.count>before){latest=state.latest;break}
      if(!state.running&&state.count<=before)break;
      await sleep(250);
    }
    if(!latest)throw new Error(`Real network ${mode} test did not complete. Phase=${phase} Transfer=${transfer}`);
    for(const key of["downloadMbps","uploadMbps","latencyMs","jitterMs","probeFailPct"]){
      if(!Number.isFinite(Number(latest[key])))throw new Error(`Real network ${mode} missing ${key}`);
    }
    if(latest.connectionMode!==mode)throw new Error(`Real network mode mismatch: expected ${mode}, got ${latest.connectionMode}`);
    if(Number(latest.streamCount)!==(mode==="multi"?4:1))throw new Error(`Real network stream count mismatch for ${mode}`);
    return latest;
  }

  let realNetwork=null;
  if(process.env.ZIPSPEED_REAL_NETWORK_SMOKE==="1"){
    const single=await runRealNetworkTest("single");
    const multi=await runRealNetworkTest("multi");
    realNetwork={single,multi};
    await fs.writeFile(path.join(ARTIFACT_DIR,"real-network-report.json"),JSON.stringify({version:pkg.version,checkedAt:new Date().toISOString(),single,multi},null,2));
    console.log("Real-network Quick smoke passed for Single and Multi modes.");
  }

  cdp.socket.close();
  await fs.rm(path.join(ARTIFACT_DIR,"chrome-profile"),{recursive:true,force:true});
  await fs.writeFile(
    path.join(ARTIFACT_DIR,"runtime-report.json"),
    JSON.stringify({version:pkg.version,checkedAt:new Date().toISOString(),results,realNetwork},null,2)
  );
  console.log(`Zipspeed ${pkg.version} browser runtime checks passed for ${widths.join(", ")}px.`);
} catch(error){
  const serverLogs=server.logs();
  const chromeLogs=chrome?.logs?.()||{};
  console.error(error);
  if(serverLogs.stderr)console.error("SERVER STDERR\n"+serverLogs.stderr);
  if(chromeLogs.stderr)console.error("CHROME STDERR\n"+chromeLogs.stderr);
  process.exitCode=1;
} finally{
  chrome?.kill("SIGTERM");
  server.kill("SIGTERM");
}
