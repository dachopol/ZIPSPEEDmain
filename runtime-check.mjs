import fs from"node:fs/promises";import path from"node:path";import{spawn}from"node:child_process";
const port=4173,base=`http://127.0.0.1:${port}`,artifacts="runtime-artifacts";const sleep=ms=>new Promise(r=>setTimeout(r,ms));
await fs.rm(artifacts,{recursive:true,force:true});await fs.mkdir(artifacts,{recursive:true});
const server=spawn(process.execPath,["server.mjs"],{env:{...process.env,PORT:String(port)},stdio:["ignore","pipe","pipe"]});
try{
 let ready=false;for(let i=0;i<40;i++){try{const r=await fetch(base+"/health");if(r.ok){ready=true;break}}catch{}await sleep(100)}if(!ready)throw new Error("Local runtime server did not become ready");
 const [page,version,app,directory]=await Promise.all([fetch(base+"/").then(r=>r.text()),fetch(base+"/version.json").then(r=>r.json()),fetch(base+"/src/app.mjs").then(r=>r.text()),fetch(base+"/server-directory.json").then(r=>r.json())]);
 if(!page.includes('id="goButton"')||!page.includes('id="downLoadedLatencyValue"')||!page.includes('id="serverSetting"'))throw new Error("Runtime page shell missing critical controls");
 if(version.version!=="72.0.0"||version.versionCode!==72)throw new Error("Runtime version drift");
 if(!app.includes("runTest")||!app.includes("measureUnderLoad")||!app.includes("window.zipspeedStopForLifecycle"))throw new Error("Runtime interaction/lifecycle code missing");
 const enabled=(directory.servers||[]).filter(s=>s.enabled&&typeof s.baseUrl==="string"&&s.baseUrl.startsWith("https://"));if(!enabled.length)throw new Error("No enabled runtime server");
 const evidence={generatedAt:new Date().toISOString(),localServer:true,criticalShell:true,loadedLatencyFlow:true,serverDirectoryCount:enabled.length,version,realNetworkSmoke:false};
 if(process.env.ZIPSPEED_REAL_NETWORK_SMOKE==="1"){const target=enabled[0].baseUrl.replace(/\/$/,"");const [down,meta]=await Promise.all([fetch(target+"/__down?bytes=1024",{cache:"no-store"}),fetch(target+"/meta",{cache:"no-store"})]);if(!down.ok)throw new Error("Real-network download endpoint HTTP "+down.status);if(!meta.ok)throw new Error("Real-network metadata endpoint HTTP "+meta.status);const b=await down.arrayBuffer(),m=await meta.json();if(b.byteLength<1024)throw new Error("Real-network endpoint returned insufficient bytes");evidence.realNetworkSmoke=true;evidence.realNetworkBytes=b.byteLength;evidence.reportedEdge=typeof m.colo==="string"?m.colo:null}
 await fs.writeFile(path.join(artifacts,"runtime-smoke.json"),JSON.stringify(evidence,null,2));console.log("RUNTIME PASS — local app shell + server directory"+(evidence.realNetworkSmoke?" + real network smoke":""));
}finally{server.kill("SIGTERM")}
