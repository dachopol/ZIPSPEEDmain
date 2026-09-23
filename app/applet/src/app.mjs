import{TEST_PROFILES,CONNECTION_MODES,splitTransferBytes,calculateMbps,median,latencyJitter,probeFailPercent,parseProviderMeta,videoSuitability,isCompleteResult,speedFraction,formatMiB,mergeHistoryRecords,latestComparablePair,historyToCsv}from"./measurement.mjs";
import{networkHealthIndex,healthBand,useCaseSuitability,throughputStats,diagnosticFlags,compareResults,loadImpact}from"./quality.mjs";
import{defaultServer,serverLocationLabel}from"./servers.mjs";
const ACTIVE_SERVER=defaultServer(),ENDPOINT=ACTIVE_SERVER?.baseUrl||"",$=id=>document.getElementById(id),ui={go:$("goButton"),phase:$("phaseLabel"),live:$("liveValue"),arc:$("gaugeArc"),needle:$("needle"),progress:$("progressBar"),down:$("downloadValue"),up:$("uploadValue"),latency:$("latencyValue"),jitter:$("jitterValue"),downState:$("downloadState"),upState:$("uploadState"),latencyState:$("latencyState"),probeState:$("probeState"),transfer:$("transferLabel"),online:$("onlineBadge"),chart:$("chart"),toast:$("toast")};
const I18N={en:{brandSubtitle:"Real network measurement",speedEyebrow:"Speed Test",speedTitle:"Measure your connection",ready:"READY",go:"GO",stop:"STOP",hint:"Tap GO to start a measured HTTP test.",download:"Download",upload:"Upload",latency:"HTTP Latency",jitter:"Jitter",pending:"Pending",probeNote:"HTTP probe ≠ packet loss",live:"Live",throughput:"Throughput",videoEyebrow:"Video",videoTitle:"Streaming suitability",videoNote:"Estimate from the latest measured download speed. This is not a playback test.",statusEyebrow:"Status",statusTitle:"Network context",statusNote:"Only provider metadata and verified request state are shown.",ip:"Client IP",isp:"ISP / ASN",edge:"Provider edge",area:"Client area",endpoint:"Measurement endpoint",integrity:"Result integrity",integrityValue:"HTTP 2xx + measured bytes",mapTitle:"Map-safe mode",mapNote:"No verified coordinates are available, so Zipspeed does not invent a map pin.",historyEyebrow:"History",historyTitle:"Completed tests",settingsEyebrow:"Settings",settingsTitle:"Simple by default",settingsNote:"Preferences stay on this device.",language:"Language",theme:"Theme",profile:"Test profile",methodTitle:"Measurement truth",methodText:"Throughput uses actual transferred bytes and elapsed time. Failed or incomplete tests are not saved.",speed:"Speed",video:"Video",status:"Status",history:"History",settings:"Settings",quick:"Quick",standard:"Standard",online:"Online",offline:"Offline",checking:"Checking…",reachable:"Reachable",unavailable:"Unavailable",testing:"Testing…",complete:"Complete",stopped:"Stopped",error:"Error",shared:"Share opened.",copied:"Copied result.",noResult:"No completed result yet.",historyEmpty:"No completed tests yet.",cleared:"History cleared.",light:"Light",dark:"Dark",share:"Share",export:"Export JSON",clear:"Clear",supported:"Suitable",insufficient:"Insufficient",unknown:"--",transferred:"transferred",sent:"sent",timeout:"Measurement timed out.",overhead:"protocol overhead",probeFail:"HTTP probe fail",themeChoice:"Light / Dark",profileChoice:"Quick / Standard",profileLocked:"Stop the active test before changing profile.",timestamp:"Timestamp",downloadError:"Download measurement failed.",uploadError:"Upload measurement failed.",latencyError:"Latency measurement failed.",genericError:"Measurement failed.",versionLabel:"Version",healthEyebrow:"Network Health",healthTitle:"Measured connection index",healthNote:"Derived from this HTTP test. Not a universal network rating.",excellent:"Excellent",good:"Good",fair:"Fair",limited:"Limited",browsing:"Browsing",videoCall:"Video call",gaming:"Gaming",streaming4k:"4K streaming",suitable:"Suitable",notSuitable:"Limited",testService:"Test service",serverLocation:"Server location",notAvailable:"Not available",variation:"Throughput variation",variationHint:"Lower is steadier",sampleRange:"Sample range",measuredFlags:"Measured flags",flagsHint:"Zipspeed thresholds",thresholdsMet:"Checked thresholds met",variationMetric:"Variation",connectionMode:"Connection mode",singleConnection:"Single connection",multiConnection:"Multi connection (4 streams)",connectionChoice:"Single / Multi",connectionLocked:"Stop the active test before changing connection mode.",stream:"stream",streams:"streams",loadedLatency:"Loaded HTTP latency",loadedLatencyHint:"Probes started while download is active",privacyEyebrow:"Privacy & Data",privacyTitle:"What this build actually does",privacyNote:"These facts are derived from the current app source and must change if the implementation changes.",privacyNetworkTitle:"Measurement traffic",privacyNetworkBody:"Speed tests contact the listed measurement provider directly. Your IP/network metadata can be visible to that provider and may be shown in Status.",privacyHistoryTitle:"Local history",privacyHistoryBody:"Completed test history is stored locally on this device. Client IP and ISP metadata are not written into Zipspeed history.",privacyPermissionsTitle:"Device permissions",privacyPermissionsBody:"This Android build requests internet/network-state access and does not request camera, microphone or device location permissions.",privacyCommerceTitle:"Ads & billing",privacyCommerceBody:"No advertising or billing SDK is present in this build. Store declarations must be updated before either is added.",exportCsv:"Export CSV",compareEyebrow:"Comparison",compareTitle:"Latest vs previous matching test",compareNeedTwo:"Needs two completed tests with the same profile and connection mode.",compareReady:"Same profile + mode",downloadChange:"Download change",uploadChange:"Upload change",latencyChange:"Latency change",ipVersion:"IP version",loadImpact:"Load latency delta",loadImpactHint:"Loaded − idle HTTP latency • Zipspeed thresholds",impactLow:"Low impact",impactModerate:"Moderate impact",impactHigh:"High impact",evidenceEyebrow:"Measurement Evidence",evidenceTitle:"Latest completed test",validatedPayload:"Validated payload",testDuration:"Test duration",measurementMode:"Measurement mode",evidenceNote:"Payload bytes are recorded only after transfer-length validation succeeds."},th:{brandSubtitle:"วัดเครือข่ายจากข้อมูลจริง",speedEyebrow:"ทดสอบความเร็ว",speedTitle:"วัดการเชื่อมต่อของคุณ",ready:"พร้อม",go:"GO",stop:"หยุด",hint:"แตะ GO เพื่อเริ่มการทดสอบ HTTP ที่วัดจริง",download:"ดาวน์โหลด",upload:"อัปโหลด",latency:"เวลาแฝง HTTP",jitter:"จิตเตอร์",pending:"รอผล",probeNote:"HTTP probe ไม่ใช่ packet loss",live:"สด",throughput:"ความเร็วแบบเรียลไทม์",videoEyebrow:"วิดีโอ",videoTitle:"ความเหมาะสมในการสตรีม",videoNote:"ประเมินจากความเร็วดาวน์โหลดที่วัดล่าสุด ไม่ใช่การเล่นวิดีโอจริง",statusEyebrow:"สถานะ",statusTitle:"บริบทเครือข่าย",statusNote:"แสดงเฉพาะเมทาดาทาจากผู้ให้บริการและสถานะคำขอที่ตรวจได้จริง",ip:"IP ผู้ใช้",isp:"ISP / ASN",edge:"Provider edge",area:"พื้นที่ผู้ใช้",endpoint:"ปลายทางทดสอบ",integrity:"ความถูกต้องของผล",integrityValue:"HTTP 2xx + ไบต์ที่วัดจริง",mapTitle:"โหมดแผนที่ปลอดการเดา",mapNote:"ไม่มีพิกัดที่ยืนยันได้ จึงไม่สร้างหมุดแผนที่ขึ้นเอง",historyEyebrow:"ประวัติ",historyTitle:"ผลที่ทดสอบสำเร็จ",settingsEyebrow:"ตั้งค่า",settingsTitle:"เรียบง่ายเป็นค่าเริ่มต้น",settingsNote:"การตั้งค่าเก็บบนเครื่องนี้",language:"ภาษา",theme:"ธีม",profile:"รูปแบบทดสอบ",methodTitle:"หลักการวัด",methodText:"ความเร็วคำนวณจากไบต์ที่รับส่งจริงและเวลาจริง ผลที่ล้มเหลวหรือไม่ครบจะไม่ถูกบันทึก",speed:"สปีด",video:"วิดีโอ",status:"สถานะ",history:"ประวัติ",settings:"ตั้งค่า",quick:"แบบเร็ว",standard:"มาตรฐาน",online:"ออนไลน์",offline:"ออฟไลน์",checking:"กำลังตรวจ…",reachable:"เชื่อมต่อได้",unavailable:"ใช้งานไม่ได้",testing:"กำลังทดสอบ…",complete:"เสร็จสิ้น",stopped:"หยุดแล้ว",error:"ผิดพลาด",shared:"เปิดหน้าต่างแชร์แล้ว",copied:"คัดลอกผลแล้ว",noResult:"ยังไม่มีผลทดสอบที่สมบูรณ์",historyEmpty:"ยังไม่มีผลทดสอบที่สมบูรณ์",cleared:"ล้างประวัติแล้ว",light:"สว่าง",dark:"มืด",share:"แชร์",export:"ส่งออก JSON",clear:"ล้าง",supported:"เหมาะสม",insufficient:"ไม่เพียงพอ",unknown:"--",transferred:"รับแล้ว",sent:"ส่งแล้ว",timeout:"หมดเวลาการวัด",overhead:"ส่วนเกินโปรโตคอล",probeFail:"HTTP probe ล้มเหลว",themeChoice:"สว่าง / มืด",profileChoice:"แบบเร็ว / มาตรฐาน",profileLocked:"หยุดการทดสอบก่อนเปลี่ยนรูปแบบ",timestamp:"เวลา",downloadError:"วัดดาวน์โหลดไม่สำเร็จ",uploadError:"วัดอัปโหลดไม่สำเร็จ",latencyError:"วัดเวลาแฝงไม่สำเร็จ",genericError:"การวัดไม่สำเร็จ",versionLabel:"เวอร์ชัน",healthEyebrow:"สุขภาพเครือข่าย",healthTitle:"ดัชนีจากผลวัดครั้งนี้",healthNote:"คำนวณจากการทดสอบ HTTP ครั้งนี้ ไม่ใช่มาตรฐานสากล",excellent:"ยอดเยี่ยม",good:"ดี",fair:"พอใช้",limited:"จำกัด",browsing:"ท่องเว็บ",videoCall:"วิดีโอคอล",gaming:"เกม",streaming4k:"สตรีม 4K",suitable:"เหมาะสม",notSuitable:"จำกัด",testService:"บริการทดสอบ",serverLocation:"ตำแหน่งเซิร์ฟเวอร์",notAvailable:"ไม่มีข้อมูล",variation:"ความแกว่งของความเร็ว",variationHint:"ยิ่งต่ำยิ่งคงที่",sampleRange:"ช่วงค่าตัวอย่าง",measuredFlags:"ธงวัดผล",flagsHint:"เกณฑ์ของ Zipspeed",thresholdsMet:"ผ่านเกณฑ์ที่ตรวจ",variationMetric:"ความแกว่ง",connectionMode:"โหมดการเชื่อมต่อ",singleConnection:"การเชื่อมต่อเดี่ยว",multiConnection:"หลายการเชื่อมต่อ (4 สตรีม)",connectionChoice:"เดี่ยว / หลาย",connectionLocked:"หยุดการทดสอบก่อนเปลี่ยนโหมดการเชื่อมต่อ",stream:"สตรีม",streams:"สตรีม",loadedLatency:"เวลาแฝง HTTP ขณะดาวน์โหลด",loadedLatencyHint:"เริ่ม probe ระหว่างที่ดาวน์โหลดกำลังทำงาน",privacyEyebrow:"ความเป็นส่วนตัวและข้อมูล",privacyTitle:"สิ่งที่ build นี้ทำจริง",privacyNote:"ข้อมูลนี้อ้างอิงจาก source ปัจจุบันและต้องอัปเดตเมื่อ implementation เปลี่ยน",privacyNetworkTitle:"ทราฟฟิกการวัด",privacyNetworkBody:"การทดสอบติดต่อผู้ให้บริการวัดที่ระบุโดยตรง ผู้ให้บริการอาจเห็น IP/ข้อมูลเครือข่ายและ Zipspeed อาจแสดงข้อมูลนั้นในหน้าสถานะ",privacyHistoryTitle:"ประวัติบนเครื่อง",privacyHistoryBody:"ผลทดสอบที่สำเร็จถูกเก็บไว้บนอุปกรณ์นี้ โดย Zipspeed ไม่เขียน IP ผู้ใช้หรือข้อมูล ISP ลงในประวัติ",privacyPermissionsTitle:"สิทธิ์อุปกรณ์",privacyPermissionsBody:"Android build นี้ขอสิทธิ์อินเทอร์เน็ต/สถานะเครือข่าย และไม่ขอสิทธิ์กล้อง ไมโครโฟน หรือตำแหน่งอุปกรณ์",privacyCommerceTitle:"โฆษณาและการชำระเงิน",privacyCommerceBody:"build นี้ยังไม่มี SDK โฆษณาหรือระบบชำระเงิน ต้องอัปเดตคำประกาศ Store ก่อนเพิ่มระบบดังกล่าว",exportCsv:"ส่งออก CSV",compareEyebrow:"เปรียบเทียบ",compareTitle:"ผลล่าสุดเทียบครั้งก่อนที่เงื่อนไขตรงกัน",compareNeedTwo:"ต้องมีผลสำเร็จอย่างน้อย 2 ครั้งที่ใช้โปรไฟล์และโหมดการเชื่อมต่อเดียวกัน",compareReady:"โปรไฟล์ + โหมดตรงกัน",downloadChange:"ดาวน์โหลดเปลี่ยน",uploadChange:"อัปโหลดเปลี่ยน",latencyChange:"เวลาแฝงเปลี่ยน",ipVersion:"เวอร์ชัน IP",loadImpact:"ผลกระทบเวลาแฝงเมื่อมีโหลด",loadImpactHint:"เวลาแฝงขณะโหลด − เวลาแฝงปกติ • เกณฑ์ Zipspeed",impactLow:"ผลกระทบต่ำ",impactModerate:"ผลกระทบปานกลาง",impactHigh:"ผลกระทบสูง",evidenceEyebrow:"หลักฐานการวัด",evidenceTitle:"ผลสำเร็จล่าสุด",validatedPayload:"เพย์โหลดที่ตรวจยืนยันแล้ว",testDuration:"ระยะเวลาทดสอบ",measurementMode:"โหมดการวัด",evidenceNote:"บันทึกจำนวนไบต์หลังตรวจยืนยันความยาวการรับส่งสำเร็จเท่านั้น"}};
let lang=localStorage.getItem("zipspeed_language")||((navigator.language||"").toLowerCase().startsWith("th")?"th":"en"),theme=localStorage.getItem("zipspeed_theme")||"light",profileId=localStorage.getItem("zipspeed_profile")||"standard",connectionModeId=localStorage.getItem("zipspeed_connection_mode")||"single";if(!TEST_PROFILES[profileId])profileId="standard";if(!CONNECTION_MODES[connectionModeId])connectionModeId="single";
const HISTORY_KEY="zipspeed_history";const LEGACY_HISTORY_KEYS=["zipspeed_history_v51","zipspeed_history_v50"];let running=false,runId=0,controller=null,currentXhrs=new Set(),history=[],lastResult=null,chartSamples=[];function readHistoryKey(key){try{const raw=JSON.parse(localStorage.getItem(key)||"[]");return Array.isArray(raw)?raw:[]}catch{return[]}}history=mergeHistoryRecords(readHistoryKey(HISTORY_KEY),...LEGACY_HISTORY_KEYS.map(readHistoryKey));if(history.length)localStorage.setItem(HISTORY_KEY,JSON.stringify(history));for(const key of LEGACY_HISTORY_KEYS)localStorage.removeItem(key);lastResult=history.at(-1)||null;
const t=k=>I18N[lang][k]??I18N.en[k]??k;
let appVersionValue=null;
function applyVersionLabel(){
  const el=$("appVersion");if(!el)return;
  const value=appVersionValue||"--";
  el.textContent=appVersionValue?`v${appVersionValue}`:"v--";
  el.setAttribute("aria-label",`${t("versionLabel")} ${value}`);
}
async function loadAppVersion(){
  try{
    const response=await fetch("./package.json",{cache:"no-store"});
    if(!response.ok)throw new Error("Version metadata unavailable");
    const data=await response.json();
    const value=typeof data.version==="string"?data.version.trim():"";
    if(!/^\d+\.\d+\.\d+(?:[-+][0-9A-Za-z.-]+)?$/.test(value))throw new Error("Invalid version metadata");
    appVersionValue=value;
  }catch{
    appVersionValue=null;
  }
  applyVersionLabel();
}
function toast(m){ui.toast.textContent=m;ui.toast.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>ui.toast.classList.remove("show"),2500)}function setText(id,key){const el=$(id);if(el)el.textContent=t(key)}
function applyTheme(next){theme=next;document.documentElement.dataset.theme=theme;localStorage.setItem("zipspeed_theme",theme);$("themeValue").textContent=t(theme==="dark"?"dark":"light");drawChart()}
function applyLanguage(next){lang=next;document.documentElement.lang=lang;localStorage.setItem("zipspeed_language",lang);$("langButton").textContent=lang==="en"?"TH":"EN";const map={brandSubtitle:"brandSubtitle",speedEyebrow:"speedEyebrow",speedTitle:"speedTitle",labelDownload:"download",labelUpload:"upload",labelLatency:"latency",labelJitter:"jitter",chartEyebrow:"live",chartTitle:"throughput",videoEyebrow:"videoEyebrow",videoTitle:"videoTitle",videoNote:"videoNote",statusEyebrow:"statusEyebrow",statusTitle:"statusTitle",statusNote:"statusNote",ipLabel:"ip",ipVersionLabel:"ipVersion",ispLabel:"isp",edgeLabel:"edge",areaLabel:"area",endpointLabel:"endpoint",integrityLabel:"integrity",integrityValue:"integrityValue",mapTitle:"mapTitle",mapNote:"mapNote",historyEyebrow:"historyEyebrow",historyTitle:"historyTitle",settingsEyebrow:"settingsEyebrow",settingsTitle:"settingsTitle",settingsNote:"settingsNote",languageLabel:"language",themeLabel:"theme",profileLabel:"profile",connectionModeLabel:"connectionMode",methodTitle:"methodTitle",methodText:"methodText",healthEyebrow:"healthEyebrow",healthTitle:"healthTitle",healthNote:"healthNote",useBrowsingLabel:"browsing",useCallLabel:"videoCall",useGamingLabel:"gaming",use4kLabel:"streaming4k",serviceLabel:"testService",serverLocationLabel:"serverLocation",variationLabel:"variation",variationHint:"variationHint",rangeLabel:"sampleRange",flagsLabel:"measuredFlags",flagsHint:"flagsHint",loadedLatencyLabel:"loadedLatency",loadedLatencyHint:"loadedLatencyHint",loadImpactLabel:"loadImpact",loadImpactHint:"loadImpactHint",privacyEyebrow:"privacyEyebrow",privacyTitle:"privacyTitle",privacyNote:"privacyNote",privacyNetworkTitle:"privacyNetworkTitle",privacyNetworkBody:"privacyNetworkBody",privacyHistoryTitle:"privacyHistoryTitle",privacyHistoryBody:"privacyHistoryBody",privacyPermissionsTitle:"privacyPermissionsTitle",privacyPermissionsBody:"privacyPermissionsBody",privacyCommerceTitle:"privacyCommerceTitle",privacyCommerceBody:"privacyCommerceBody",evidenceEyebrow:"evidenceEyebrow",evidenceTitle:"evidenceTitle",evidencePayloadLabel:"validatedPayload",evidenceDurationLabel:"testDuration",evidenceModeLabel:"measurementMode",evidenceNote:"evidenceNote",compareEyebrow:"compareEyebrow",compareTitle:"compareTitle",compareNote:"compareNeedTwo",compareDownloadLabel:"downloadChange",compareUploadLabel:"uploadChange",compareLatencyLabel:"latencyChange",navSpeed:"speed",navVideo:"video",navStatus:"status",navHistory:"history",navSettings:"settings"};Object.entries(map).forEach(([id,key])=>setText(id,key));$("shareButton").textContent=t("share");$("exportButton").textContent=t("export");$("exportCsvButton").textContent=t("exportCsv");$("clearButton").textContent=t("clear");$("languageValue").textContent=lang==="th"?"ไทย":"English";applyVersionLabel();$("themeValue").textContent=t(theme==="dark"?"dark":"light");$("themeSetting").textContent=t("themeChoice");$("profileSetting").textContent=t("profileChoice");$("connectionModeSetting").textContent=t("connectionChoice");updateProfileUi();updateConnectionModeUi();updateOnlineState();renderHistory();renderVideo();renderHealth();applyServerInfo();if(!running){ui.phase.textContent=t("ready");$("testHint").textContent=t("hint");ui.go.textContent=t("go");resetLabels()}}
function resetLabels(){if(ui.down.textContent==="--")ui.downState.textContent=t("pending");if(ui.up.textContent==="--")ui.upState.textContent=t("pending");if(ui.latency.textContent==="--")ui.latencyState.textContent=t("pending");if(ui.jitter.textContent==="--")ui.probeState.textContent=t("probeNote")}
function updateProfileUi(){
  const p=TEST_PROFILES[profileId],quick=profileId==="quick",mode=CONNECTION_MODES[connectionModeId];
  $("quickProfile").classList.toggle("active",quick);
  $("standardProfile").classList.toggle("active",!quick);
  $("quickProfile").setAttribute("aria-pressed",String(quick));
  $("standardProfile").setAttribute("aria-pressed",String(!quick));
  $("quickProfile").textContent=t("quick");
  $("standardProfile").textContent=t("standard");
  $("profileValue").textContent=t(profileId);
  $("profileData").textContent=`≈ ${formatMiB(p.downloadBytes+p.uploadBytes)} MiB + ${t("overhead")} • ${mode.streams} ${t(mode.streams===1?"stream":"streams")}`;
}
function selectProfile(id){
  if(running){toast(t("profileLocked"));return}
  if(!TEST_PROFILES[id])return;
  profileId=id;
  localStorage.setItem("zipspeed_profile",id);
  updateProfileUi();
}
function updateConnectionModeUi(){
  const multi=connectionModeId==="multi";
  $("connectionModeValue").textContent=t(multi?"multiConnection":"singleConnection");
  $("connectionModeSetting").textContent=t("connectionChoice");
  $("connectionModeSetting").setAttribute("aria-pressed",String(multi));
  updateProfileUi();
}
function selectConnectionMode(id){
  if(running){toast(t("connectionLocked"));return}
  if(!CONNECTION_MODES[id])return;
  connectionModeId=id;
  localStorage.setItem("zipspeed_connection_mode",id);
  updateConnectionModeUi();
}
function updateOnlineState(){const online=navigator.onLine;ui.online.textContent=online?t("online"):t("offline");ui.online.className=`status-chip ${online?"ok":"bad"}`}window.addEventListener("online",updateOnlineState);window.addEventListener("offline",updateOnlineState);
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>{const target=btn.dataset.target;document.querySelectorAll(".view").forEach(v=>v.classList.toggle("active",v.dataset.view===target));document.querySelectorAll(".nav-item").forEach(v=>{const active=v.dataset.target===target;v.classList.toggle("active",active);if(active)v.setAttribute("aria-current","page");else v.removeAttribute("aria-current")});if(target==="history")renderHistory();if(target==="video")renderVideo()}));
$("quickProfile").addEventListener("click",()=>selectProfile("quick"));$("standardProfile").addEventListener("click",()=>selectProfile("standard"));$("profileSetting").addEventListener("click",()=>selectProfile(profileId==="quick"?"standard":"quick"));$("connectionModeSetting").addEventListener("click",()=>selectConnectionMode(connectionModeId==="single"?"multi":"single"));$("langButton").addEventListener("click",()=>applyLanguage(lang==="en"?"th":"en"));$("languageSetting").addEventListener("click",()=>applyLanguage(lang==="en"?"th":"en"));$("themeButton").addEventListener("click",()=>applyTheme(theme==="light"?"dark":"light"));$("themeSetting").addEventListener("click",()=>applyTheme(theme==="light"?"dark":"light"));
function setGauge(mbps){const f=speedFraction(mbps);ui.arc.style.strokeDasharray=`${(f*100).toFixed(2)} 100`;ui.needle.style.transform=`rotate(${-120+240*f}deg)`;ui.live.textContent=Number.isFinite(mbps)?(mbps>=100?mbps.toFixed(0):mbps.toFixed(1)):"--"}function setProgress(p){ui.progress.style.width=`${Math.max(0,Math.min(100,p))}%`}function setPhase(k){ui.phase.textContent=t(k)}function setRunning(v){running=v;ui.go.classList.toggle("running",v);const label=v?t("stop"):t("go");ui.go.textContent=label;ui.go.setAttribute("aria-label",label);ui.go.setAttribute("aria-pressed",String(v))}
function resetForRun(){renderHealth(null);for(const el of[ui.down,ui.up,ui.latency,ui.jitter])el.textContent="--";ui.downState.textContent=ui.upState.textContent=ui.latencyState.textContent=t("pending");ui.probeState.textContent=t("probeNote");ui.transfer.textContent="--";chartSamples=[];setGauge(null);setProgress(0);drawChart();$("endpointValue").textContent=t("checking")}
function linkedController(timeoutMs){const child=new AbortController();let timedOut=false;const parent=controller?.signal,relay=()=>child.abort();if(parent){if(parent.aborted)child.abort();else parent.addEventListener("abort",relay,{once:true})}const timer=setTimeout(()=>{timedOut=true;child.abort()},timeoutMs);return{signal:child.signal,get timedOut(){return timedOut},parent,abort(){child.abort()},cleanup(){clearTimeout(timer);parent?.removeEventListener("abort",relay)}}}function ensureRun(id){if(!running||id!==runId||controller?.signal.aborted)throw new DOMException("Aborted","AbortError")}
async function loadMetadata(id){$("endpointValue").textContent=t("checking");try{const scope=linkedController(10000);try{const r=await fetch(`${ENDPOINT}/meta?ts=${Date.now()}`,{cache:"no-store",signal:scope.signal,headers:{Accept:"application/json"}});ensureRun(id);if(!r.ok)throw new Error(`Metadata HTTP ${r.status}`);const m=parseProviderMeta(await r.json());$("ipValue").textContent=m.clientIp;$("ipVersionValue").textContent=m.ipVersion;$("ispValue").textContent=m.isp;$("edgeValue").textContent=m.edge;$("areaValue").textContent=m.clientArea;$("endpointValue").textContent=t("reachable");return m}finally{scope.cleanup()}}catch(e){if(e?.name==="AbortError")throw e;$("endpointValue").textContent=t("unavailable");return null}}
async function measureLatency(id){const p=TEST_PROFILES[profileId],samples=[];let failed=0;setPhase("testing");ui.latencyState.textContent=t("testing");for(let i=0;i<p.latencyProbes;i++){ensureRun(id);const started=performance.now(),scope=linkedController(8000);try{const r=await fetch(`${ENDPOINT}/__down?bytes=1&ts=${Date.now()}-${i}`,{cache:"no-store",signal:scope.signal});if(!r.ok)throw new Error(`Latency HTTP ${r.status}`);const buf=await r.arrayBuffer();if(buf.byteLength!==1)throw new Error("Incomplete latency probe");const ms=performance.now()-started;samples.push(ms);ui.latency.textContent=ms.toFixed(1)}catch(e){if(controller?.signal.aborted)throw new DOMException("Aborted","AbortError");failed++}finally{scope.cleanup()}setProgress(8+((i+1)/p.latencyProbes)*17)}if(samples.length<p.minLatencySuccess)throw new Error("Not enough successful latency probes");const latency=median(samples),jitter=latencyJitter(samples),failPct=probeFailPercent(failed,p.latencyProbes);ui.latency.textContent=latency.toFixed(1);ui.jitter.textContent=jitter.toFixed(1);ui.latencyState.textContent="";ui.probeState.textContent=`${failPct.toFixed(0)}% ${t("probeFail")}`;return{latency,jitter,failPct}}
async function measureLoadedHttpLatency(id,probeIndex){
  const scope=linkedController(8000),started=performance.now();
  try{
    const response=await fetch(`${ENDPOINT}/__down?bytes=1&ts=${Date.now()}-loaded-${id}-${probeIndex}`,{cache:"no-store",signal:scope.signal});
    ensureRun(id);
    if(!response.ok)return null;
    const buffer=await response.arrayBuffer();
    if(buffer.byteLength!==1)return null;
    return performance.now()-started;
  }catch(error){
    if(controller?.signal.aborted)throw new DOMException("Aborted","AbortError");
    return null;
  }finally{scope.cleanup()}
}
async function measureDownload(id){
  const p=TEST_PROFILES[profileId],mode=CONNECTION_MODES[connectionModeId],chunks=splitTransferBytes(p.downloadBytes,mode.streams);
  if(!chunks)throw new Error("Invalid download stream plan");
  const scope=linkedController(profileId==="quick"?60000:180000),receivedByStream=new Array(chunks.length).fill(0);
  const started=performance.now(),loadedProbeFractions=[0.25,0.5,0.75],loadedProbePromises=[];
  let lastPaint=started,lastSampleAt=started,lastSampleBytes=0,nextLoadedProbe=0;
  ui.downState.textContent=t("testing");setPhase("testing");
  const totalReceived=()=>receivedByStream.reduce((sum,value)=>sum+value,0);
  const paint=(now,force=false)=>{
    if(!force&&now-lastPaint<250)return;
    const received=totalReceived(),mbps=calculateMbps(received,now-started),sampleMbps=calculateMbps(received-lastSampleBytes,now-lastSampleAt);
    if(mbps!==null){ui.down.textContent=mbps.toFixed(1);setGauge(mbps)}
    if(sampleMbps!==null&&sampleMbps>0){chartSamples.push(sampleMbps);if(chartSamples.length>80)chartSamples.shift();drawChart()}
    lastSampleBytes=received;lastSampleAt=now;lastPaint=now;
    ui.transfer.textContent=`${formatMiB(received)} MiB ${t("transferred")}`;
    if(!force){const fraction=received/p.downloadBytes;while(nextLoadedProbe<loadedProbeFractions.length&&fraction>=loadedProbeFractions[nextLoadedProbe]){loadedProbePromises.push(measureLoadedHttpLatency(id,nextLoadedProbe));nextLoadedProbe++}}
    setProgress(25+40*(received/p.downloadBytes));
  };
  try{
    await Promise.all(chunks.map(async(bytes,index)=>{
      const response=await fetch(`${ENDPOINT}/__down?bytes=${bytes}&ts=${Date.now()}-${id}-${index}`,{cache:"no-store",signal:scope.signal});
      if(!response.ok)throw new Error(`Download HTTP ${response.status}`);
      if(response.body?.getReader){
        const reader=response.body.getReader();
        while(true){
          ensureRun(id);
          const{done,value}=await reader.read();
          if(done)break;
          receivedByStream[index]+=value?.byteLength||0;
          paint(performance.now());
        }
      }else receivedByStream[index]=(await response.arrayBuffer()).byteLength;
      if(receivedByStream[index]!==bytes)throw new Error(`Incomplete download stream ${index+1}: ${receivedByStream[index]}/${bytes}`);
    }));
    ensureRun(id);
    paint(performance.now(),true);
    const received=totalReceived();
    if(received!==p.downloadBytes)throw new Error(`Incomplete download ${received}/${p.downloadBytes}`);
    const durationMs=performance.now()-started,mbps=calculateMbps(received,durationMs);
    if(mbps===null||mbps<=0)throw new Error("Download unavailable");
    ui.down.textContent=mbps.toFixed(1);ui.downState.textContent="";setGauge(mbps);setProgress(65);
    const settled=await Promise.allSettled(loadedProbePromises),loadedSamples=settled.filter(item=>item.status==="fulfilled"&&Number.isFinite(item.value)&&item.value>=0).map(item=>item.value);
    return{mbps,receivedBytes:received,durationMs,stats:throughputStats(chartSamples),loadedLatencyMs:loadedSamples.length?median(loadedSamples):null,loadedLatencySampleCount:loadedSamples.length};
  }catch(error){
    scope.abort();
    if(controller?.signal.aborted)throw new DOMException("Aborted","AbortError");
    if(scope.timedOut)throw new Error(t("timeout"));
    throw error;
  }finally{scope.cleanup()}
}
function abortCurrentUploads(){
  for(const xhr of [...currentXhrs]){try{xhr.abort()}catch{}}
}
function measureUpload(id){
  const p=TEST_PROFILES[profileId],mode=CONNECTION_MODES[connectionModeId],chunks=splitTransferBytes(p.uploadBytes,mode.streams);
  if(!chunks)return Promise.reject(new Error("Invalid upload stream plan"));
  ui.upState.textContent=t("testing");setPhase("testing");
  return new Promise((resolve,reject)=>{
    const sentByStream=new Array(chunks.length).fill(0),started=performance.now();
    let completed=0,settled=false;
    const totalSent=()=>sentByStream.reduce((sum,value)=>sum+value,0);
    const cleanup=xhr=>currentXhrs.delete(xhr);
    const fail=error=>{
      if(settled)return;
      settled=true;
      abortCurrentUploads();
      reject(error);
    };
    const finish=()=>{
      if(settled||completed!==chunks.length)return;
      try{
        ensureRun(id);
        const sent=totalSent();
        if(sent!==p.uploadBytes)throw new Error(`Incomplete upload ${sent}/${p.uploadBytes}`);
        const durationMs=performance.now()-started,mbps=calculateMbps(sent,durationMs);
        if(mbps===null||mbps<=0)throw new Error("Upload unavailable");
        settled=true;
        ui.up.textContent=mbps.toFixed(1);ui.upState.textContent="";setGauge(mbps);setProgress(95);
        resolve({mbps,sentBytes:sent,durationMs});
      }catch(error){fail(error)}
    };
    chunks.forEach((bytes,index)=>{
      const xhr=new XMLHttpRequest();
      currentXhrs.add(xhr);
      xhr.open("POST",`${ENDPOINT}/__up?ts=${Date.now()}-${id}-${index}`,true);
      xhr.timeout=profileId==="quick"?60000:180000;
      xhr.upload.onprogress=event=>{
        if(settled)return;
        sentByStream[index]=Math.min(Number(event.loaded)||0,bytes);
        const sent=totalSent(),mbps=calculateMbps(sent,performance.now()-started);
        if(mbps!==null){ui.up.textContent=mbps.toFixed(1);setGauge(mbps)}
        ui.transfer.textContent=`${formatMiB(sent)} MiB ${t("sent")}`;
        setProgress(65+30*(sent/p.uploadBytes));
      };
      xhr.onload=()=>{
        cleanup(xhr);
        if(settled)return;
        try{
          ensureRun(id);
          if(xhr.status<200||xhr.status>=300)throw new Error(`Upload HTTP ${xhr.status}`);
          sentByStream[index]=bytes;
          completed++;
          finish();
        }catch(error){fail(error)}
      };
      xhr.onerror=()=>{cleanup(xhr);fail(new Error("Upload network error"))};
      xhr.ontimeout=()=>{cleanup(xhr);fail(new Error(t("timeout")))};
      xhr.onabort=()=>{cleanup(xhr);if(!settled)fail(new DOMException("Aborted","AbortError"))};
      xhr.send(new Uint8Array(bytes));
    });
  });
}
function userError(error){const message=String(error?.message||"");if(message===t("timeout"))return message;if(/latency/i.test(message))return t("latencyError");if(/download/i.test(message))return t("downloadError");if(/upload/i.test(message))return t("uploadError");return t("genericError")}async function startOrStop(){if(running){controller?.abort();abortCurrentUploads();return}running=true;runId++;const id=runId,testStarted=performance.now();controller=new AbortController();setRunning(true);resetForRun();try{const meta=await loadMetadata(id);setProgress(8);const latency=await measureLatency(id),downloadResult=await measureDownload(id),download=downloadResult.mbps,uploadResult=await measureUpload(id),upload=uploadResult.mbps;ensureRun(id);setProgress(100);setPhase("complete");ui.transfer.textContent=t("complete");const result={completed:true,aborted:false,downloadMbps:download,uploadMbps:upload,downloadBytes:downloadResult.receivedBytes,uploadBytes:uploadResult.sentBytes,downloadDurationMs:downloadResult.durationMs,uploadDurationMs:uploadResult.durationMs,testDurationMs:performance.now()-testStarted,endpointId:ACTIVE_SERVER?.id||"--",measurementProvider:ACTIVE_SERVER?.provider||"--",latencyMs:latency.latency,jitterMs:latency.jitter,probeFailPct:latency.failPct,throughputVariationPct:downloadResult.stats?.variationPct??null,throughputMinMbps:downloadResult.stats?.minMbps??null,throughputMaxMbps:downloadResult.stats?.maxMbps??null,throughputSampleCount:downloadResult.stats?.sampleCount??0,loadedLatencyMs:downloadResult.loadedLatencyMs??null,loadedLatencySampleCount:downloadResult.loadedLatencySampleCount??0,loadedLatencyDeltaMs:Number.isFinite(downloadResult.loadedLatencyMs)?downloadResult.loadedLatencyMs-latency.latency:null,profile:profileId,connectionMode:connectionModeId,streamCount:CONNECTION_MODES[connectionModeId].streams,edge:meta?.edge||"--",timestamp:new Date().toISOString()};if(isCompleteResult(result)){history.push(result);history=history.slice(-100);lastResult=result;localStorage.setItem(HISTORY_KEY,JSON.stringify(history));renderHistory();renderVideo();renderHealth()}}catch(e){if(e?.name==="AbortError"){setPhase("stopped");ui.transfer.textContent=t("stopped")}else{const message=userError(e);setPhase("error");ui.transfer.textContent=message;toast(message)}}finally{if(id===runId){setRunning(false);controller=null;currentXhrs.clear()}}}
function stopActiveTest(){if(running){controller?.abort();abortCurrentUploads()}}window.zipspeedStopForLifecycle=stopActiveTest;ui.go.addEventListener("click",startOrStop);document.addEventListener("visibilitychange",()=>{if(document.hidden)stopActiveTest()});

function metricUnit(key){return key==="download"||key==="upload"?"Mbps":key==="probeFail"?"%":"ms"}
function useCaseReason(item,result){
  if(!item||!result)return"--";
  if(item.supported)return t("thresholdsMet");
  const key=item.failures[0],actual=Number(result[key==="download"?"downloadMbps":key==="upload"?"uploadMbps":key==="latency"?"latencyMs":key==="jitter"?"jitterMs":"probeFailPct"]);
  const threshold=item.rule[key],operator=key==="download"||key==="upload"?"<":">";
  return Number.isFinite(actual)?`${t(key)} ${actual.toFixed(1)} ${operator} ${threshold} ${metricUnit(key)}`:"--";
}
function renderHealth(result=lastResult){
  const index=networkHealthIndex(result);
  const band=healthBand(index);
  const value=$("healthValue"),bandEl=$("healthBand");
  value.textContent=index===null?"--":String(index);
  bandEl.textContent=index===null?"--":t(band);
  bandEl.className=index===null?"":band;
  const cases=useCaseSuitability(result);
  const targets={
    browsing:["useBrowsingValue","useBrowsingReason"],
    videoCall:["useCallValue","useCallReason"],
    gaming:["useGamingValue","useGamingReason"],
    streaming4k:["use4kValue","use4kReason"]
  };
  for(const [id,[target,reasonTarget]] of Object.entries(targets)){
    const el=$(target),reason=$(reasonTarget),item=cases?.find(x=>x.id===id);
    el.textContent=!item?"--":t(item.supported?"suitable":"notSuitable");
    el.className=!item?"":item.supported?"good":"bad";
    reason.textContent=useCaseReason(item,result);
  }
  const variation=Number(result?.throughputVariationPct),min=Number(result?.throughputMinMbps),max=Number(result?.throughputMaxMbps);
  $("variationValue").textContent=Number.isFinite(variation)?`${variation.toFixed(1)}%`:"--";
  $("rangeValue").textContent=Number.isFinite(min)&&Number.isFinite(max)?`${min.toFixed(1)}–${max.toFixed(1)}`:"--";
  const flags=diagnosticFlags(result);
  $("flagsValue").textContent=result?String(flags.length):"--";
  const loadedLatency=Number(result?.loadedLatencyMs);$("loadedLatencyValue").textContent=Number.isFinite(loadedLatency)?`${loadedLatency.toFixed(1)} ms`:"--";const impact=loadImpact(result?.latencyMs,result?.loadedLatencyMs),impactEl=$("loadImpactValue");impactEl.textContent=impact?`${impact.deltaMs>=0?"+":""}${impact.deltaMs.toFixed(1)} ms • ${t(impact.band==="low"?"impactLow":impact.band==="moderate"?"impactModerate":"impactHigh")}`:"--";impactEl.className=impact?.band||"";
}
function applyServerInfo(){
  $("serviceValue").textContent=ACTIVE_SERVER?.name||t("notAvailable");
  $("serverLocationValue").textContent=serverLocationLabel(ACTIVE_SERVER)||t("notAvailable");
}
function renderVideo(){const grid=$("videoGrid");grid.innerHTML="";for(const item of videoSuitability(lastResult?.downloadMbps)){const card=document.createElement("article");card.className="video-card "+(item.suitable===true?"good":item.suitable===false?"bad":"");const state=item.suitable===null?t("unknown"):item.suitable?t("supported"):t("insufficient");card.innerHTML=`<span>${item.label} • ≥ ${item.required} Mbps</span><strong>${state}</strong>`;grid.appendChild(card)}}
function signed(value,digits=1,suffix=""){return Number.isFinite(value)?`${value>0?"+":""}${value.toFixed(digits)}${suffix}`:"--"}
function renderHistoryComparison(){
  const pair=latestComparablePair(history),comparison=pair?compareResults(pair.current,pair.previous):null;
  $("compareNote").textContent=comparison?t("compareReady"):t("compareNeedTwo");
  $("compareContext").textContent=comparison?`${t(comparison.profile)} • ${t(comparison.connectionMode==="multi"?"multiConnection":"singleConnection")}`:"--";
  $("compareDownloadValue").textContent=comparison?signed(comparison.downloadPct,1,"%"):"--";
  $("compareUploadValue").textContent=comparison?signed(comparison.uploadPct,1,"%"):"--";
  $("compareLatencyValue").textContent=comparison?signed(comparison.latencyDeltaMs,1," ms"):"--";
}
function renderMeasurementEvidence(){
  const r=lastResult;
  $("evidenceEndpoint").textContent=r?.endpointId&&r.endpointId!=="--"?r.endpointId:"--";
  $("evidencePayloadValue").textContent=r&&Number.isFinite(r.downloadBytes)&&Number.isFinite(r.uploadBytes)?`↓ ${formatMiB(r.downloadBytes)} + ↑ ${formatMiB(r.uploadBytes)} MiB`:"--";
  $("evidenceDurationValue").textContent=r&&Number.isFinite(r.testDurationMs)?`${(r.testDurationMs/1000).toFixed(2)} s`:"--";
  $("evidenceModeValue").textContent=r?`${t(r.profile||"standard")} • ${t((r.connectionMode||"single")==="multi"?"multiConnection":"singleConnection")} • ${Number(r.streamCount)||1} ${t((Number(r.streamCount)||1)===1?"stream":"streams")}`:"--";
}
function renderHistory(){const list=$("historyList"),empty=$("historyEmpty");list.innerHTML="";empty.textContent=t("historyEmpty");empty.hidden=history.length>0;renderMeasurementEvidence();renderHistoryComparison();[...history].reverse().forEach(r=>{const item=document.createElement("article");item.className="history-item";item.innerHTML=`<div class="history-main"><strong>↓ ${r.downloadMbps.toFixed(1)} / ↑ ${r.uploadMbps.toFixed(1)} Mbps</strong><span>${new Date(r.timestamp).toLocaleString(lang==="th"?"th-TH":"en-US")} • ${t(r.profile||"standard")} • ${t((r.connectionMode||"single")==="multi"?"multiConnection":"singleConnection")}</span></div><div class="history-meta">${r.latencyMs.toFixed(1)} ms<br>${r.edge||"--"}</div>`;list.appendChild(item)})}
function resultText(r){return isCompleteResult(r)?`Zipspeed\n${t("download")}: ${r.downloadMbps.toFixed(1)} Mbps\n${t("upload")}: ${r.uploadMbps.toFixed(1)} Mbps\n${t("latency")}: ${r.latencyMs.toFixed(1)} ms\n${t("jitter")}: ${r.jitterMs.toFixed(1)} ms\n${t("probeFail")}: ${r.probeFailPct.toFixed(1)}%\n${Number.isFinite(r.loadedLatencyMs)?`${t("loadedLatency")}: ${r.loadedLatencyMs.toFixed(1)} ms\n`:""}${Number.isFinite(r.loadedLatencyDeltaMs)?`${t("loadImpact")}: ${r.loadedLatencyDeltaMs>=0?"+":""}${r.loadedLatencyDeltaMs.toFixed(1)} ms\n`:""}${Number.isFinite(r.throughputVariationPct)?`${t("variationMetric")}: ${r.throughputVariationPct.toFixed(1)}%\n`:""}${t("edge")}: ${r.edge||"--"}\n${t("profile")}: ${t(r.profile||"standard")}\n${t("connectionMode")}: ${t((r.connectionMode||"single")==="multi"?"multiConnection":"singleConnection")}\n${r.endpointId?`Endpoint: ${r.endpointId}\n`:""}${Number.isFinite(r.testDurationMs)?`${t("testDuration")}: ${(r.testDurationMs/1000).toFixed(2)} s\n`:""}${t("timestamp")}: ${r.timestamp}`:null}
async function shareLatest(){const text=resultText(lastResult);if(!text){toast(t("noResult"));return}if(navigator.share){try{await navigator.share({title:"Zipspeed",text});toast(t("shared"));return}catch(e){if(e?.name==="AbortError")return}}try{await navigator.clipboard.writeText(text);toast(t("copied"))}catch{toast(t("unavailable"))}}
function downloadBlob(content,type,extension){const blob=new Blob([content],{type}),url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download=`zipspeed_history_${Date.now()}.${extension}`;a.click();URL.revokeObjectURL(url)}
$("shareButton").addEventListener("click",shareLatest);
$("exportButton").addEventListener("click",()=>{if(!history.length){toast(t("noResult"));return}downloadBlob(JSON.stringify(history,null,2),"application/json","json")});
$("exportCsvButton").addEventListener("click",()=>{const csv=historyToCsv(history);if(!csv){toast(t("noResult"));return}downloadBlob(csv,"text/csv;charset=utf-8","csv")});
$("clearButton").addEventListener("click",()=>{history=[];lastResult=null;localStorage.removeItem(HISTORY_KEY);renderHistory();renderVideo();renderHealth();toast(t("cleared"))});
const ctx=ui.chart.getContext("2d");function drawChart(){const rect=ui.chart.getBoundingClientRect(),dpr=window.devicePixelRatio||1,w=Math.max(1,rect.width),h=180;if(ui.chart.width!==Math.round(w*dpr)||ui.chart.height!==Math.round(h*dpr)){ui.chart.width=Math.round(w*dpr);ui.chart.height=Math.round(h*dpr)}ctx.setTransform(dpr,0,0,dpr,0,0);ctx.clearRect(0,0,w,h);ctx.strokeStyle=theme==="dark"?"rgba(255,255,255,.07)":"rgba(20,33,61,.07)";ctx.lineWidth=1;for(let i=1;i<4;i++){ctx.beginPath();ctx.moveTo(0,h*i/4);ctx.lineTo(w,h*i/4);ctx.stroke()}if(chartSamples.length<2)return;const max=Math.max(...chartSamples,1);ctx.strokeStyle="#3B82F6";ctx.lineWidth=3;ctx.lineJoin="round";ctx.beginPath();chartSamples.forEach((v,i)=>{const x=i/(chartSamples.length-1)*w,y=h-12-(v/max)*(h-24);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke()}window.addEventListener("resize",drawChart);
applyTheme(theme);applyLanguage(lang);updateProfileUi();updateConnectionModeUi();updateOnlineState();renderHistory();renderVideo();setGauge(null);drawChart();
applyServerInfo();renderHealth();loadAppVersion();
