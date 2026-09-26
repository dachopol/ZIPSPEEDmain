const url="https://dachopol.github.io/privacy-policy/";
const response=await fetch(url,{redirect:"follow",headers:{"User-Agent":"ZIPSPEED-CI/79"}});
if(!response.ok)throw new Error(`Privacy URL HTTP ${response.status}`);
const html=await response.text();
for(const required of["ZIPSPEED by AnakinYoo","com.aistudio.zipspeed.zskt","79.0.0","Cloudflare"]){
  if(!html.includes(required))throw new Error("Privacy URL content mismatch: "+required);
}
for(const stale of[
  "รหัสโฆษณา (Advertising ID) สำหรับการวิเคราะห์และแสดงโฆษณา",
  "ACCESS_FINE_LOCATION (Optional)",
  "Google AdMob / Firebase Analytics เพื่อวิเคราะห์การใช้งานและโฆษณา"
]){
  if(html.includes(stale))throw new Error("Stale privacy claim detected: "+stale);
}
for(const current of[
  "ไม่มี Ads SDK",
  "ไม่มี Firebase Analytics SDK",
  "ไม่มี Billing SDK",
  "ไม่มีสิทธิ์กล้อง ไมโครโฟน รายชื่อ หรือ Location permission"
]){
  if(!html.includes(current))throw new Error("Current privacy assertion missing: "+current);
}
console.log("PRIVACY URL PASS — "+url);
