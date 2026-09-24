const url="https://dachopol.github.io/privacy-policy/";
const response=await fetch(url,{redirect:"follow",headers:{"User-Agent":"ZIPSPEED-CI/72"}});
if(!response.ok)throw new Error(`Privacy URL HTTP ${response.status}`);
const html=await response.text();
for(const required of["ZIPSPEED by AnakinYoo","com.aistudio.zipspeed.zskt","72.0.0","Cloudflare"]){
  if(!html.includes(required))throw new Error("Privacy URL content mismatch: "+required);
}
if(/Advertising ID.*โฆษณา|ACCESS_FINE_LOCATION|Firebase Analytics SDK เพื่อ/i.test(html))throw new Error("Stale privacy claims detected");
console.log("PRIVACY URL PASS — "+url);
