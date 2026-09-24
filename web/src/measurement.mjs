export const TEST_PROFILES=Object.freeze({
  quick:Object.freeze({downloadBytes:3*1024*1024,uploadBytes:1*1024*1024,probes:3}),
  standard:Object.freeze({downloadBytes:10*1024*1024,uploadBytes:5*1024*1024,probes:6})
});
export const CONNECTION_MODES=Object.freeze({single:Object.freeze({streams:1}),multi:Object.freeze({streams:4})});
export function calculateMbps(bytes,elapsedMs){return Number.isFinite(bytes)&&bytes>0&&Number.isFinite(elapsedMs)&&elapsedMs>0?(bytes*8/elapsedMs/1000):null}
export function median(values){const a=values.filter(Number.isFinite).sort((x,y)=>x-y);if(!a.length)return null;const m=Math.floor(a.length/2);return a.length%2?a[m]:(a[m-1]+a[m])/2}
export function latencyJitter(values){const a=values.filter(Number.isFinite);if(a.length<2)return 0;const d=[];for(let i=1;i<a.length;i++)d.push(Math.abs(a[i]-a[i-1]));return median(d)}
export function splitTransferBytes(total,streams){const n=Math.max(1,Number(streams)||1);const base=Math.floor(total/n),rem=total%n;return Array.from({length:n},(_,i)=>base+(i<rem?1:0))}
export function speedFraction(mbps){if(!Number.isFinite(mbps)||mbps<=0)return 0;return Math.min(1,Math.log10(1+mbps)/Math.log10(1001))}
export function parseProviderMeta(meta={}){const ip=String(meta.clientIp??"").trim()||null;const asn=Number(meta.asn);const org=String(meta.asOrganization??"").trim();const city=String(meta.city??"").trim();const country=String(meta.country??"").trim();return{clientIp:ip,ipVersion:ip?(ip.includes(":")?"IPv6":"IPv4"):null,isp:Number.isFinite(asn)?`AS${asn}${org?` • ${org}`:""}`:(org||null),edge:String(meta.colo??"").trim()||null,clientArea:[city,country].filter(Boolean).join(" • ")||null}}
export function videoSuitability(downloadMbps){const d=Number(downloadMbps);return[{label:"720p",threshold:3},{label:"1080p",threshold:5},{label:"4K",threshold:25}].map(x=>({...x,suitable:Number.isFinite(d)&&d>=x.threshold}))}
