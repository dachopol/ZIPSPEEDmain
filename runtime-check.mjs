import fs from"node:fs/promises";import path from"node:path";import{spawn}from"node:child_process";
const port=4173,base=`http://127.0.0.1:${port}`,artifacts="runtime-artifacts";const sleep=ms=>new Promise(r=>setTimeout(r,ms));
await fs.rm(artifacts,{recursive:true,force:true});await fs.mkdir(artifacts,{recursive:true});
const server=spawn(process.execPath,["server.mjs"],{env:{...process.env,PORT:String(port)},stdio:["ignore","pipe","pipe"]});
try{
 let ready=false;for(let i=0;i<40;i++){try{const r=await fetch(base+"/health");if(r.ok){ready=true;break}}catch{}await sleep(100)}if(!ready)throw new Error("Local runtime server did not become ready");
 const [page,version,app]=await Promise.all([fetch(base+"/").then(r=>r.text()),fetch(base+"/version.json").then(r=>r.json()),fetch(base+"/src/app.mjs").then(r=>r.text())]);
 if(!page.includes('id="goButton"')||!page.includes('id="speed"')||!page.includes('id="settings"'))throw new Error("Runtime page shell missing critical controls");
 if(version.version!=="72.0.0"||version.versionCode!==72)throw new Error("Runtime version drift");
 if(!app.includes("runTest")||!app.includes("window.zipspeedStopForLifecycle"))throw new Error("Runtime interaction/lifecycle code missing");
 const evidence={generatedAt:new Date().toISOString(),localServer:true,criticalShell:true,version,realNetworkSmoke:false};
 if(process.env.ZIPSPEED_REAL_NETWORK_SMOKE==="1"){const r=await fetch("https://speed.cloudflare.com/__down?bytes=1024",{cache:"no-store"});if(!r.ok)throw new Error("Real-network endpoint HTTP "+r.status);const b=await r.arrayBuffer();if(b.byteLength<1024)throw new Error("Real-network endpoint returned insufficient bytes");evidence.realNetworkSmoke=true;evidence.realNetworkBytes=b.byteLength}
 await fs.writeFile(path.join(artifacts,"runtime-smoke.json"),JSON.stringify(evidence,null,2));console.log("RUNTIME PASS — local app shell"+(evidence.realNetworkSmoke?" + real network smoke":""));
}finally{server.kill("SIGTERM")}
