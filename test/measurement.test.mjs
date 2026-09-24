import test from"node:test";import assert from"node:assert/strict";import{TEST_PROFILES,CONNECTION_MODES,calculateMbps,median,latencyJitter,splitTransferBytes,speedFraction,parseProviderMeta,videoSuitability}from"../web/src/measurement.mjs";
test("profiles use explicit transfer sizes",()=>{assert.equal(TEST_PROFILES.quick.downloadBytes,3*1024*1024);assert.equal(TEST_PROFILES.standard.uploadBytes,5*1024*1024)});
test("Mbps is deterministic from bytes/time",()=>{assert.equal(calculateMbps(10_000_000,1000),80);assert.equal(calculateMbps(1,0),null)});
test("latency stats are measured-value helpers",()=>{assert.equal(median([30,10,20]),20);assert.equal(latencyJitter([10,12,15]),2.5)});
test("connection split preserves bytes",()=>{for(const mode of Object.values(CONNECTION_MODES)){const p=splitTransferBytes(1001,mode.streams);assert.equal(p.reduce((a,b)=>a+b,0),1001)}});
test("gauge transform input is bounded",()=>{assert.equal(speedFraction(0),0);assert.equal(speedFraction(1000),1)});
test("provider metadata does not invent location",()=>{const m=parseProviderMeta({clientIp:"198.51.100.2",asn:64500,asOrganization:"Example",colo:"BKK"});assert.equal(m.ipVersion,"IPv4");assert.equal(m.clientArea,null);assert.equal(m.edge,"BKK")});
test("video suitability is derived only from measured download",()=>{const v=videoSuitability(6);assert.equal(v.find(x=>x.label==="1080p").suitable,true);assert.equal(v.find(x=>x.label==="4K").suitable,false)});
