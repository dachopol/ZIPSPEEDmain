export const TEST_PROFILES=Object.freeze({
  quick:Object.freeze({downloadBytes:3*1024*1024,uploadBytes:1*1024*1024,probes:3,loadedProbeIntervalMs:400,requestTimeoutMs:30000,totalTimeoutMs:90000,adaptive:false}),
  standard:Object.freeze({
    downloadPlanBytes:Object.freeze([1*1024*1024,10*1024*1024,25*1024*1024,50*1024*1024]),
    uploadPlanBytes:Object.freeze([1*1024*1024,10*1024*1024,25*1024*1024]),
    probes:10,loadedProbeIntervalMs:400,requestTimeoutMs:60000,totalTimeoutMs:240000,finishDurationMs:1000,loadedMinDurationMs:250,bandwidthMinDurationMs:10,adaptive:true
  })
});
export const CONNECTION_MODES=Object.freeze({single:Object.freeze({streams:1}),multi:Object.freeze({streams:4})});
export function calculateMbps(bytes,elapsedMs){return Number.isFinite(bytes)&&bytes>0&&Number.isFinite(elapsedMs)&&elapsedMs>0?(bytes*8/elapsedMs/1000):null}
export function median(values){const a=values.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2}
export function percentile(values,p=0.9){const a=values.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;if(a.length===1)return a[0];const q=Math.min(1,Math.max(0,Number(p)||0)),pos=(a.length-1)*q,lo=Math.floor(pos),hi=Math.ceil(pos);return lo===hi?a[lo]:a[lo]+(a[hi]-a[lo])*(pos-lo)}
export function shouldStopRamp(durationMs,finishDurationMs=1000){return Number.isFinite(durationMs)&&durationMs>=finishDurationMs}
export function summarizeBandwidthStages(stages=[],p=0.9,minDurationMs=10){const valid=stages.filter(s=>s&&Number.isFinite(s.speed)&&Number.isFinite(s.durationMs)&&s.durationMs>=minDurationMs);return{speed:percentile(valid.map(s=>s.speed),p),bytes:valid.reduce((sum,s)=>sum+(Number.isFinite(s.bytes)?s.bytes:0),0),stages:valid.length}}
export function latencyJitter(values){const a=values.filter(Number.isFinite);if(a.length<2)return 0;const d=[];for(let i=1;i<a.length;i++)d.push(Math.abs(a[i]-a[i-1]));return median(d)}
export function summarizeLatency(values){const clean=values.filter(v=>Number.isFinite(v)&&v>=0);return{latency:median(clean),jitter:clean.length?latencyJitter(clean):null,samples:clean.length}}
export function splitTransferBytes(total,streams){const n=Math.max(1,Number(streams)||1);const base=Math.floor(total/n),rem=total%n;return Array.from({length:n},(_,i)=>base+(i<rem?1:0))}
export function speedFraction(mbps){if(!Number.isFinite(mbps)||mbps<=0)return 0;return Math.min(1,Math.log10(1+mbps)/Math.log10(1001))}
export function parseTraceText(text=""){const values={};for(const line of String(text).split(/\r?\n/)){const i=line.indexOf("=");if(i>0)values[line.slice(0,i).trim()]=line.slice(i+1).trim()}return{clientIp:values.ip||null,colo:values.colo||null,country:values.loc||null}}
export function parseProviderMeta(meta={}){const ip=String(meta.clientIp??"").trim()||null;const asn=Number(meta.asn);const org=String(meta.asOrganization??"").trim();const city=String(meta.city??"").trim();const country=String(meta.country??"").trim();return{clientIp:ip,ipVersion:ip?(ip.includes(":")?"IPv6":"IPv4"):null,isp:Number.isFinite(asn)?`AS${asn}${org?` • ${org}`:""}`:(org||null),edge:String(meta.colo??"").trim()||null,clientArea:[city,country].filter(Boolean).join(" • ")||null}}
export function monitorTransition(state={failures:0,down:false},success,threshold=2){const failures=Math.max(0,Number(state.failures)||0),down=state.down===true,limit=Math.max(1,Number(threshold)||2);if(success)return{failures:0,down:false,event:down?"recovery":null};const nextFailures=failures+1,becomesDown=!down&&nextFailures>=limit;return{failures:nextFailures,down:down||nextFailures>=limit,event:becomesDown?"incident":null}}
export function normalizeHistoryEntry(input={}){const n=v=>Number.isFinite(Number(v))?Number(v):null;return{...input,downloadMbps:n(input.downloadMbps),uploadMbps:n(input.uploadMbps),idleLatencyMs:n(input.idleLatencyMs)??n(input.latencyMs),idleJitterMs:n(input.idleJitterMs)??n(input.jitterMs),downloadLoadedLatencyMs:n(input.downloadLoadedLatencyMs),downloadLoadedJitterMs:n(input.downloadLoadedJitterMs),uploadLoadedLatencyMs:n(input.uploadLoadedLatencyMs),uploadLoadedJitterMs:n(input.uploadLoadedJitterMs),payloadBytes:n(input.payloadBytes)}}
export function selectBestServerHealth(results=[]){const healthy=results.filter(x=>x&&x.ok===true&&Number.isFinite(x.latencyMs)).sort((a,b)=>a.latencyMs-b.latencyMs);return healthy[0]||null}
export function validateServerDirectory(input){const servers=Array.isArray(input?.servers)?input.servers:[];return servers.filter(s=>s&&s.enabled===true&&typeof s.id==="string"&&typeof s.name==="string"&&typeof s.baseUrl==="string"&&/^https:\/\//.test(s.baseUrl)).map(s=>({...s,baseUrl:s.baseUrl.replace(/\/$/,"")}))}
export function videoSuitability(downloadMbps){const d=Number(downloadMbps);return[{label:"720p",threshold:3},{label:"1080p",threshold:5},{label:"4K",threshold:25}].map(x=>({...x,suitable:Number.isFinite(d)&&d>=x.threshold}))}
