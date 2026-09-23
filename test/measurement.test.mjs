import test from"node:test";
import{networkHealthIndex,healthBand,useCaseSuitability}from"../src/quality.mjs";
import{defaultServer,serverLocationLabel}from"../src/servers.mjs";import assert from"node:assert/strict";import{TEST_PROFILES,calculateMbps,median,latencyJitter,probeFailPercent,parseProviderMeta,videoSuitability,isCompleteResult,speedFraction,formatMiB,mergeHistoryRecords}from"../src/measurement.mjs";
test("profiles are explicit real transfer plans",()=>{assert.equal(TEST_PROFILES.quick.downloadBytes,3*1024*1024);assert.equal(TEST_PROFILES.quick.uploadBytes,1*1024*1024);assert.equal(TEST_PROFILES.standard.downloadBytes,10*1024*1024);assert.equal(TEST_PROFILES.standard.uploadBytes,5*1024*1024)});
test("Mbps uses bytes and elapsed time",()=>{assert.equal(calculateMbps(10_000_000,1000),80);assert.equal(calculateMbps(100,0),null)});
test("latency stats use measured samples",()=>{assert.equal(median([30,10,20]),20);assert.equal(latencyJitter([10,12,15]),2.5);assert.equal(probeFailPercent(1,4),25)});
test("metadata separates edge and client area",()=>{const m=parseProviderMeta({clientIp:"198.51.100.2",asn:64500,asOrganization:"Example ISP",colo:"BKK",city:"Ayutthaya",country:"TH"});assert.equal(m.clientIp,"198.51.100.2");assert.equal(m.isp,"AS64500 • Example ISP");assert.equal(m.edge,"BKK");assert.equal(m.clientArea,"Ayutthaya • TH")});
test("video suitability derives from measured download only",()=>{const r=videoSuitability(6);assert.equal(r.find(x=>x.key==="1080").suitable,true);assert.equal(r.find(x=>x.key==="4k").suitable,false)});
test("history requires complete result",()=>{const r={completed:true,aborted:false,downloadMbps:100,uploadMbps:20,latencyMs:15,jitterMs:2,probeFailPct:0,timestamp:new Date().toISOString()};assert.equal(isCompleteResult(r),true);assert.equal(isCompleteResult({...r,downloadMbps:0}),false)});
test("gauge is deterministic",()=>{assert.equal(speedFraction(0),0);assert.equal(speedFraction(1000),1)});
test("MiB formatter deterministic",()=>{assert.equal(formatMiB(3*1024*1024),"3.0");assert.equal(formatMiB(15*1024*1024),"15")});

test("history migration merges valid records and removes duplicates",()=>{
  const base={completed:true,aborted:false,downloadMbps:100,uploadMbps:20,latencyMs:15,jitterMs:2,probeFailPct:0,timestamp:"2026-09-23T00:00:00.000Z"};
  const newer={...base,timestamp:"2026-09-23T01:00:00.000Z",downloadMbps:120};
  const merged=mergeHistoryRecords([base],[base,newer],[{...base,completed:false}]);
  assert.equal(merged.length,2);
  assert.equal(merged[0].downloadMbps,100);
  assert.equal(merged[1].downloadMbps,120);
});

test("health index is deterministic and bounded",()=>{
  const result={downloadMbps:100,uploadMbps:20,latencyMs:25,jitterMs:5,probeFailPct:0};
  assert.equal(networkHealthIndex(result),100);
  assert.equal(healthBand(100),"excellent");
  assert.equal(healthBand(75),"good");
  assert.equal(healthBand(60),"fair");
  assert.equal(healthBand(20),"limited");
});

test("use-case suitability evaluates measured thresholds",()=>{
  const strong={downloadMbps:100,uploadMbps:20,latencyMs:20,jitterMs:3,probeFailPct:0};
  const all=useCaseSuitability(strong);
  assert.equal(all.length,4);
  assert.ok(all.every(x=>x.supported===true));
  const weak={downloadMbps:2,uploadMbps:0.5,latencyMs:220,jitterMs:60,probeFailPct:50};
  assert.ok(useCaseSuitability(weak).every(x=>x.supported===false));
});

test("server directory does not invent location",()=>{
  const server=defaultServer();
  assert.equal(server.baseUrl,"https://speed.cloudflare.com");
  assert.equal(serverLocationLabel(server),null);
  assert.equal(server.coordinates,null);
});
