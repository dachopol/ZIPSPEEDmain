export const TEST_PROFILES=Object.freeze({
quick:Object.freeze({id:"quick",latencyProbes:3,minLatencySuccess:2,downloadBytes:3*1024*1024,uploadBytes:1*1024*1024}),
standard:Object.freeze({id:"standard",latencyProbes:6,minLatencySuccess:3,downloadBytes:10*1024*1024,uploadBytes:5*1024*1024})
});
export const CONNECTION_MODES=Object.freeze({
single:Object.freeze({id:"single",streams:1}),
multi:Object.freeze({id:"multi",streams:4})
});
export function splitTransferBytes(totalBytes,streamCount){
  const total=Math.floor(Number(totalBytes)),count=Math.floor(Number(streamCount));
  if(!Number.isFinite(total)||!Number.isFinite(count)||total<=0||count<=0||count>total)return null;
  const base=Math.floor(total/count),remainder=total%count;
  return Array.from({length:count},(_,index)=>base+(index<remainder?1:0));
}
export function calculateMbps(bytes,elapsedMs){if(!Number.isFinite(bytes)||!Number.isFinite(elapsedMs)||bytes<0||elapsedMs<=0)return null;return(bytes*8)/(elapsedMs*1000)}
export function median(values){if(!Array.isArray(values))return null;const a=values.filter(v=>Number.isFinite(v)&&v>=0).sort((x,y)=>x-y);if(!a.length)return null;const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2}
export function latencyJitter(values){if(!Array.isArray(values))return null;const a=values.filter(v=>Number.isFinite(v)&&v>=0);if(a.length<2)return null;let total=0;for(let i=1;i<a.length;i++)total+=Math.abs(a[i]-a[i-1]);return total/(a.length-1)}
export function probeFailPercent(failed,total){if(!Number.isFinite(failed)||!Number.isFinite(total)||total<=0||failed<0||failed>total)return null;return failed/total*100}
export function parseProviderMeta(input){const m=input&&typeof input==="object"?input:{};const clean=v=>v===null||v===undefined?null:(String(v).trim()||null);const ip=clean(m.clientIp),raw=clean(m.asn),asn=raw?(raw.toUpperCase().startsWith("AS")?raw.toUpperCase():`AS${raw}`):null,org=clean(m.asOrganization),edge=clean(m.colo),city=clean(m.city),country=clean(m.country);return{clientIp:ip||"--",isp:[asn,org].filter(Boolean).join(" • ")||"--",edge:edge||"--",clientArea:[city,country].filter(Boolean).join(" • ")||"--"}}
export function videoSuitability(downloadMbps){const defs=[["4k","4K UHD",25],["1080","1080p",5],["720","720p",2.5],["480","480p",1]];return defs.map(([key,label,required])=>({key,label,required,suitable:Number.isFinite(downloadMbps)&&downloadMbps>=0?downloadMbps>=required:null}))}
export function isCompleteResult(r){if(!r||typeof r!=="object"||r.completed!==true||r.aborted===true)return false;for(const k of["downloadMbps","uploadMbps"])if(!Number.isFinite(r[k])||r[k]<=0)return false;for(const k of["latencyMs","jitterMs","probeFailPct"])if(!Number.isFinite(r[k])||r[k]<0)return false;return!!r.timestamp&&!Number.isNaN(Date.parse(r.timestamp))}
export function speedFraction(mbps){const v=Number.isFinite(mbps)&&mbps>0?mbps:0;return Math.min(1,Math.log1p(v)/Math.log(1001))}
export function formatMiB(bytes){if(!Number.isFinite(bytes)||bytes<0)return"--";return(bytes/1048576).toFixed(bytes>=10485760?0:1)}

export function mergeHistoryRecords(...lists){
  const byKey=new Map();
  for(const list of lists){
    if(!Array.isArray(list))continue;
    for(const item of list){
      if(!isCompleteResult(item))continue;
      const key=[item.timestamp,item.downloadMbps,item.uploadMbps,item.latencyMs,item.jitterMs,item.probeFailPct].join("|");
      byKey.set(key,item);
    }
  }
  return [...byKey.values()].sort((a,b)=>Date.parse(a.timestamp)-Date.parse(b.timestamp)).slice(-100);
}
