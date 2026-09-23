import test from"node:test";
import{networkHealthIndex,healthBand,useCaseSuitability,throughputStats,diagnosticFlags,compareResults,loadImpact}from"../src/quality.mjs";
import{defaultServer,serverLocationLabel,MLAB_LOCATE_URL,parseMlabLocateResponse}from"../src/servers.mjs";import assert from"node:assert/strict";import{TEST_PROFILES,CONNECTION_MODES,splitTransferBytes,calculateMbps,median,latencyJitter,probeFailPercent,parseProviderMeta,videoSuitability,isCompleteResult,speedFraction,formatMiB,mergeHistoryRecords,latestComparablePair,historyToCsv}from"../src/measurement.mjs";
test("profiles are explicit real transfer plans",()=>{assert.equal(TEST_PROFILES.quick.downloadBytes,3*1024*1024);assert.equal(TEST_PROFILES.quick.uploadBytes,1*1024*1024);assert.equal(TEST_PROFILES.standard.downloadBytes,10*1024*1024);assert.equal(TEST_PROFILES.standard.uploadBytes,5*1024*1024)});
test("Mbps uses bytes and elapsed time",()=>{assert.equal(calculateMbps(10_000_000,1000),80);assert.equal(calculateMbps(100,0),null)});
test("latency stats use measured samples",()=>{assert.equal(median([30,10,20]),20);assert.equal(latencyJitter([10,12,15]),2.5);assert.equal(probeFailPercent(1,4),25)});
test("metadata separates edge and client area",()=>{const m=parseProviderMeta({clientIp:"198.51.100.2",asn:64500,asOrganization:"Example ISP",colo:"BKK",city:"Ayutthaya",country:"TH"});assert.equal(m.clientIp,"198.51.100.2");assert.equal(m.ipVersion,"IPv4");assert.equal(m.isp,"AS64500 • Example ISP");assert.equal(m.edge,"BKK");assert.equal(m.clientArea,"Ayutthaya • TH")});
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


test("throughput stats use interval samples deterministically",()=>{
  const steady=throughputStats([10,10,10,10]);
  assert.equal(steady.sampleCount,4);
  assert.equal(steady.variationPct,0);
  assert.equal(steady.minMbps,10);
  assert.equal(steady.maxMbps,10);
  const mixed=throughputStats([10,20]);
  assert.equal(mixed.meanMbps,15);
  assert.ok(Math.abs(mixed.variationPct-33.3333333333)<0.001);
});

test("diagnostic flags only fire from measured threshold crossings",()=>{
  const strong={downloadMbps:100,uploadMbps:20,latencyMs:20,jitterMs:3,probeFailPct:0,throughputVariationPct:5};
  assert.equal(diagnosticFlags(strong).length,0);
  const weak={downloadMbps:2,uploadMbps:1,latencyMs:220,jitterMs:60,probeFailPct:50,throughputVariationPct:60};
  assert.deepEqual(diagnosticFlags(weak).map(x=>x.id),["download","upload","latency","jitter","probeFail","variation"]);
});


test("connection modes preserve total transfer bytes",()=>{
  assert.equal(CONNECTION_MODES.single.streams,1);
  assert.equal(CONNECTION_MODES.multi.streams,4);
  for(const total of[1024,3*1024*1024,5*1024*1024]){
    for(const streams of[1,4]){
      const parts=splitTransferBytes(total,streams);
      assert.equal(parts.length,streams);
      assert.equal(parts.reduce((a,b)=>a+b,0),total);
      assert.ok(parts.every(x=>Number.isInteger(x)&&x>0));
      assert.ok(Math.max(...parts)-Math.min(...parts)<=1);
    }
  }
  assert.equal(splitTransferBytes(0,4),null);
});


test("history comparison uses matching profile and mode",()=>{
  const base=(timestamp,downloadMbps,profile="quick",connectionMode="single")=>({completed:true,aborted:false,downloadMbps,uploadMbps:10,latencyMs:20,jitterMs:2,probeFailPct:0,profile,connectionMode,timestamp});
  const records=[
    base("2026-09-23T00:00:00.000Z",50),
    base("2026-09-23T00:30:00.000Z",70,"standard","single"),
    base("2026-09-23T01:00:00.000Z",75,"quick","multi"),
    base("2026-09-23T02:00:00.000Z",100)
  ];
  const pair=latestComparablePair(records);
  assert.equal(pair.current.downloadMbps,100);
  assert.equal(pair.previous.downloadMbps,50);
  const comparison=compareResults(pair.current,pair.previous);
  assert.equal(comparison.downloadPct,100);
  assert.equal(comparison.profile,"quick");
  assert.equal(comparison.connectionMode,"single");
});

test("history CSV exports completed records and escapes cells",()=>{
  const record={completed:true,aborted:false,downloadMbps:100,uploadMbps:20,latencyMs:15,jitterMs:2,probeFailPct:0,profile:"quick",connectionMode:"single",streamCount:1,edge:'BKK,"edge"',timestamp:"2026-09-23T00:00:00.000Z"};
  const csv=historyToCsv([record]);
  assert.ok(csv.startsWith("timestamp,profile,connectionMode"));
  assert.ok(csv.includes('"BKK,""edge"""'));
  assert.equal(historyToCsv([]),null);
});


test("provider metadata detects IPv6 without guessing location",()=>{
  const meta=parseProviderMeta({clientIp:"2001:db8::1"});
  assert.equal(meta.ipVersion,"IPv6");
  assert.equal(meta.clientArea,"--");
});

test("load impact is deterministic from measured idle and loaded latency",()=>{
  assert.deepEqual(loadImpact(20,35),{deltaMs:15,band:"low",idleLatencyMs:20,loadedLatencyMs:35});
  assert.equal(loadImpact(20,55).band,"moderate");
  assert.equal(loadImpact(20,90).band,"high");
  assert.equal(loadImpact(null,50),null);
});


test("measurement evidence fields survive CSV export",()=>{
  const record={completed:true,aborted:false,downloadMbps:100,uploadMbps:20,downloadBytes:3145728,uploadBytes:1048576,downloadDurationMs:500,uploadDurationMs:400,testDurationMs:1600,endpointId:"cloudflare-speed",measurementProvider:"Cloudflare",latencyMs:15,jitterMs:2,probeFailPct:0,profile:"quick",connectionMode:"single",streamCount:1,timestamp:"2026-09-23T00:00:00.000Z"};
  const csv=historyToCsv([record]);
  assert.ok(csv.includes("endpointId,measurementProvider"));
  assert.ok(csv.includes("3145728,1048576,500,400,1600"));
  assert.ok(csv.includes("cloudflare-speed,Cloudflare"));
});


test("M-Lab locate parser keeps verified discovery metadata only",()=>{
  assert.equal(MLAB_LOCATE_URL,"https://locate.measurementlab.net/v2/nearest/ndt/ndt7");
  const parsed=parseMlabLocateResponse({results:[{
    machine:"mlab1.example",
    location:{city:"Bangkok",country:"TH"},
    urls:{
      "wss:///ndt/v7/download":"wss://secret.example/download?access_token=secret",
      "wss:///ndt/v7/upload":"wss://secret.example/upload?access_token=secret"
    }
  }]});
  assert.deepEqual(parsed,[{machine:"mlab1.example",city:"Bangkok",country:"TH",downloadAvailable:true,uploadAvailable:true}]);
  assert.equal(JSON.stringify(parsed).includes("access_token"),false);
  assert.deepEqual(parseMlabLocateResponse({results:[]}),[]);
});
