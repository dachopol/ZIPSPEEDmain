import test from"node:test";import assert from"node:assert/strict";import{TEST_PROFILES,CONNECTION_MODES,calculateMbps,median,percentile,latencyJitter,summarizeLatency,summarizeBandwidthStages,shouldStopRamp,splitTransferBytes,speedFraction,parseTraceText,parseProviderMeta,monitorTransition,normalizeHistoryEntry,selectBestServerHealth,validateServerDirectory,videoSuitability,smoothGaugeStep}from"../web/src/measurement.mjs";
test("profiles disclose fixed quick and capped adaptive standard",()=>{assert.equal(TEST_PROFILES.quick.downloadBytes,3*1024*1024);assert.equal(TEST_PROFILES.standard.downloadPlanBytes.at(-1),50*1024*1024);assert.equal(TEST_PROFILES.standard.uploadPlanBytes.at(-1),25*1024*1024);assert.equal(TEST_PROFILES.standard.finishDurationMs,1000);assert.equal(TEST_PROFILES.standard.loadedProbeIntervalMs,400);assert.equal(TEST_PROFILES.quick.requestTimeoutMs,30000);assert.equal(TEST_PROFILES.standard.requestTimeoutMs,60000);assert.ok(TEST_PROFILES.standard.totalTimeoutMs>TEST_PROFILES.quick.totalTimeoutMs)});
test("Mbps is deterministic from bytes/time",()=>{assert.equal(calculateMbps(10_000_000,1000),80);assert.equal(calculateMbps(1,0),null)});
test("bandwidth ramp uses measured stages and documented duration gates",()=>{assert.equal(percentile([10,20,30],0.9),28);assert.equal(shouldStopRamp(999,1000),false);assert.equal(shouldStopRamp(1000,1000),true);const s=summarizeBandwidthStages([{speed:10,durationMs:5,bytes:1},{speed:50,durationMs:20,bytes:100},{speed:100,durationMs:40,bytes:200}],0.9,10);assert.equal(s.stages,2);assert.equal(s.bytes,300);assert.equal(s.speed,95)});
test("latency stats are measured-value helpers",()=>{assert.equal(median([30,10,20]),20);assert.equal(latencyJitter([10,12,15]),2.5);assert.deepEqual(summarizeLatency([10,20,30]),{latency:20,jitter:10,samples:3})});
test("connection split preserves bytes",()=>{for(const mode of Object.values(CONNECTION_MODES)){const p=splitTransferBytes(1001,mode.streams);assert.equal(p.reduce((a,b)=>a+b,0),1001)}});
test("gauge transform input is bounded",()=>{assert.equal(speedFraction(0),0);assert.equal(speedFraction(1000),1)});
test("gauge smoothing converges monotonically without overshoot or random input",()=>{let value=0;for(let i=0;i<120;i++){const next=smoothGaugeStep(value,100,.016);assert.ok(next>=value&&next<=100);value=next}assert.ok(Math.abs(value-100)<.2);for(let i=0;i<120;i++){const next=smoothGaugeStep(value,20,.016);assert.ok(next<=value&&next>=20);value=next}assert.ok(Math.abs(value-20)<.2)});
test("trace parser reads only reported network fields",()=>{assert.deepEqual(parseTraceText("ip=203.0.113.1\ncolo=BKK\nloc=TH\nwarp=off\n"),{clientIp:"203.0.113.1",colo:"BKK",country:"TH"})});
test("provider metadata does not invent location",()=>{const m=parseProviderMeta({clientIp:"198.51.100.2",colo:"BKK",country:"TH"});assert.equal(m.ipVersion,"IPv4");assert.equal(m.clientArea,"TH");assert.equal(m.edge,"BKK");assert.equal(m.isp,null)});
test("monitor state waits for two failures and records recovery",()=>{let s=monitorTransition({failures:0,down:false},false,2);assert.equal(s.event,null);assert.equal(s.down,false);s=monitorTransition(s,false,2);assert.equal(s.event,"incident");assert.equal(s.down,true);s=monitorTransition(s,true,2);assert.equal(s.event,"recovery");assert.equal(s.down,false)});
test("history migration preserves old v72 latency fields",()=>{const h=normalizeHistoryEntry({downloadMbps:10,uploadMbps:5,latencyMs:22,jitterMs:3});assert.equal(h.idleLatencyMs,22);assert.equal(h.idleJitterMs,3);assert.equal(h.downloadLoadedLatencyMs,null)});
test("server health selects only the fastest healthy server",()=>{const best=selectBestServerHealth([{id:"bad",ok:false,latencyMs:1},{id:"slow",ok:true,latencyMs:40},{id:"fast",ok:true,latencyMs:12}]);assert.equal(best.id,"fast");assert.equal(selectBestServerHealth([{id:"bad",ok:false,latencyMs:null}]),null)});
test("server directory only accepts enabled HTTPS endpoints",()=>{const v=validateServerDirectory({servers:[{id:"a",name:"A",baseUrl:"https://example.com/",enabled:true},{id:"b",name:"B",baseUrl:"http://example.com",enabled:true},{id:"c",name:"C",baseUrl:"https://x.test",enabled:false}]});assert.equal(v.length,1);assert.equal(v[0].baseUrl,"https://example.com")});
test("server directory lists each country primary before backup stations",()=>{const v=validateServerDirectory({servers:[{id:"th-backup",name:"TH Backup",baseUrl:"https://th-backup.test",enabled:true,countryCode:"TH",isPrimary:false,priority:2},{id:"jp-main",name:"JP Main",baseUrl:"https://jp-main.test",enabled:true,countryCode:"jp",isPrimary:true,priority:1},{id:"global",name:"Global Anycast",baseUrl:"https://global.test",enabled:true},{id:"th-main",name:"TH Main",baseUrl:"https://th-main.test",enabled:true,countryCode:"TH",isPrimary:true,priority:1},{id:"jp-backup",name:"JP Backup",baseUrl:"https://jp-backup.test",enabled:true,countryCode:"JP",isPrimary:false,priority:2}]});assert.deepEqual(v.map(x=>x.id),["jp-main","th-main","jp-backup","th-backup","global"])});
test("video suitability is derived only from measured download",()=>{const v=videoSuitability(6);assert.equal(v.find(x=>x.label==="1080p").suitable,true);assert.equal(v.find(x=>x.label==="4K").suitable,false)});


test("real data unknowns must never normalize to zero",()=>{
  const h=normalizeHistoryEntry({downloadMbps:null,uploadMbps:"",idleLatencyMs:null,idleJitterMs:undefined,downloadLoadedLatencyMs:" ",downloadLoadedJitterMs:false,uploadLoadedLatencyMs:"invalid",uploadLoadedJitterMs:-1,payloadBytes:null});
  for(const field of["downloadMbps","uploadMbps","idleLatencyMs","idleJitterMs","downloadLoadedLatencyMs","downloadLoadedJitterMs","uploadLoadedLatencyMs","uploadLoadedJitterMs","payloadBytes"])assert.equal(h[field],null,field);
});
test("genuine measured zero and numeric legacy values remain distinguishable",()=>{
  const h=normalizeHistoryEntry({downloadMbps:0,uploadMbps:"0",idleLatencyMs:0,idleJitterMs:0,downloadLoadedLatencyMs:0,payloadBytes:0});
  for(const field of["downloadMbps","uploadMbps","idleLatencyMs","idleJitterMs","downloadLoadedLatencyMs","payloadBytes"])assert.equal(h[field],0,field);
  const old=normalizeHistoryEntry({latencyMs:"12.5",jitterMs:"2.1",idleLatencyMs:null,idleJitterMs:""});
  assert.equal(old.idleLatencyMs,12.5);assert.equal(old.idleJitterMs,2.1);
});
test("jitter requires at least two valid latency samples, not an invented zero",()=>{
  assert.equal(latencyJitter([]),null);
  assert.equal(latencyJitter([42]),null);
  assert.equal(latencyJitter([-1,42]),null);
  assert.deepEqual(summarizeLatency([]),{latency:null,jitter:null,samples:0});
  assert.deepEqual(summarizeLatency([42]),{latency:42,jitter:null,samples:1});
  assert.deepEqual(summarizeLatency([42,42]),{latency:42,jitter:0,samples:2});
});
test("Speed measurement never substitutes planned payload or fabricated idle zero",async()=>{
  const {readFile}=await import("node:fs/promises");
  const app=await readFile(new URL("../web/src/app.mjs",import.meta.url),"utf8");
  assert.ok(app.includes("idleLatencyMs:idle.latency,idleJitterMs:idle.jitter"));
  assert.ok(app.includes("const payloadBytes=down.bytes+up.bytes;"));
  assert.ok(app.includes('throw new Error(t("phaseIncomplete"))'));
  assert.ok(app.includes("formatNumber(lastResult.idleLatencyMs)"));
  assert.ok(!app.includes("idle.latency??0"));
  assert.ok(!app.includes("down.bytes||profile.downloadBytes"));
  assert.ok(!app.includes("lastResult.idleLatencyMs.toFixed(1)"));
});
