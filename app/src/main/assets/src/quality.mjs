export const QUALITY_MODEL_VERSION="1.0";

function clamp(value,min=0,max=100){
  return Math.max(min,Math.min(max,value));
}

function higherIsBetter(value,target){
  if(!Number.isFinite(value)||value<0)return null;
  return clamp((value/target)*100);
}

function lowerIsBetter(value,ideal,worst){
  if(!Number.isFinite(value)||value<0)return null;
  if(value<=ideal)return 100;
  if(value>=worst)return 0;
  return clamp(((worst-value)/(worst-ideal))*100);
}

export function networkHealthIndex(result){
  if(!result||typeof result!=="object")return null;
  const down=higherIsBetter(Number(result.downloadMbps),100);
  const up=higherIsBetter(Number(result.uploadMbps),20);
  const latency=lowerIsBetter(Number(result.latencyMs),25,180);
  const jitter=lowerIsBetter(Number(result.jitterMs),5,45);
  const probe=lowerIsBetter(Number(result.probeFailPct),0,40);
  if([down,up,latency,jitter,probe].some(v=>v===null))return null;
  return Math.round(
    down*0.30+
    up*0.20+
    latency*0.25+
    jitter*0.15+
    probe*0.10
  );
}

export function healthBand(index){
  if(!Number.isFinite(index))return "unknown";
  if(index>=85)return "excellent";
  if(index>=70)return "good";
  if(index>=50)return "fair";
  return "limited";
}

function pass(result,rule){
  const failures=[];
  if(rule.download!=null&&result.downloadMbps<rule.download)failures.push("download");
  if(rule.upload!=null&&result.uploadMbps<rule.upload)failures.push("upload");
  if(rule.latency!=null&&result.latencyMs>rule.latency)failures.push("latency");
  if(rule.jitter!=null&&result.jitterMs>rule.jitter)failures.push("jitter");
  if(rule.probeFail!=null&&result.probeFailPct>rule.probeFail)failures.push("probeFail");
  return{supported:failures.length===0,failures};
}

export const USE_CASE_RULES=Object.freeze({
  browsing:Object.freeze({download:5,latency:300}),
  videoCall:Object.freeze({download:3,upload:3,latency:150,jitter:30,probeFail:20}),
  gaming:Object.freeze({download:5,upload:1,latency:80,jitter:20,probeFail:10}),
  streaming4k:Object.freeze({download:25})
});

export function useCaseSuitability(result){
  if(!result||typeof result!=="object")return null;
  for(const key of["downloadMbps","uploadMbps","latencyMs","jitterMs","probeFailPct"]){
    if(!Number.isFinite(Number(result[key])))return null;
  }
  return Object.entries(USE_CASE_RULES).map(([id,rule])=>({id,...pass(result,rule),rule}));
}


export function throughputStats(samples){
  if(!Array.isArray(samples))return null;
  const values=samples.map(Number).filter(v=>Number.isFinite(v)&&v>0);
  if(values.length<2)return null;
  const mean=values.reduce((a,b)=>a+b,0)/values.length;
  if(!(mean>0))return null;
  const sorted=[...values].sort((a,b)=>a-b);
  const mid=Math.floor(sorted.length/2);
  const medianValue=sorted.length%2?sorted[mid]:(sorted[mid-1]+sorted[mid])/2;
  const variance=values.reduce((sum,v)=>sum+(v-mean)**2,0)/values.length;
  const variationPct=Math.sqrt(variance)/mean*100;
  return{
    sampleCount:values.length,
    meanMbps:mean,
    medianMbps:medianValue,
    minMbps:sorted[0],
    maxMbps:sorted.at(-1),
    variationPct
  };
}

export const DIAGNOSTIC_THRESHOLDS=Object.freeze({
  download:5,
  upload:3,
  latency:150,
  jitter:30,
  probeFail:20,
  variation:35
});

export function diagnosticFlags(result){
  if(!result||typeof result!=="object")return[];
  const flags=[];
  const add=(id,value,threshold,direction,unit)=>{
    if(Number.isFinite(value))flags.push({id,value,threshold,direction,unit});
  };
  const down=Number(result.downloadMbps),up=Number(result.uploadMbps),lat=Number(result.latencyMs),
    jit=Number(result.jitterMs),probe=Number(result.probeFailPct),variation=Number(result.throughputVariationPct);
  if(Number.isFinite(down)&&down<DIAGNOSTIC_THRESHOLDS.download)add("download",down,DIAGNOSTIC_THRESHOLDS.download,"below","Mbps");
  if(Number.isFinite(up)&&up<DIAGNOSTIC_THRESHOLDS.upload)add("upload",up,DIAGNOSTIC_THRESHOLDS.upload,"below","Mbps");
  if(Number.isFinite(lat)&&lat>DIAGNOSTIC_THRESHOLDS.latency)add("latency",lat,DIAGNOSTIC_THRESHOLDS.latency,"above","ms");
  if(Number.isFinite(jit)&&jit>DIAGNOSTIC_THRESHOLDS.jitter)add("jitter",jit,DIAGNOSTIC_THRESHOLDS.jitter,"above","ms");
  if(Number.isFinite(probe)&&probe>DIAGNOSTIC_THRESHOLDS.probeFail)add("probeFail",probe,DIAGNOSTIC_THRESHOLDS.probeFail,"above","%");
  if(Number.isFinite(variation)&&variation>DIAGNOSTIC_THRESHOLDS.variation)add("variation",variation,DIAGNOSTIC_THRESHOLDS.variation,"above","%");
  return flags;
}


function pctChange(current,previous){
  const a=Number(current),b=Number(previous);
  if(!Number.isFinite(a)||!Number.isFinite(b)||b===0)return null;
  return((a-b)/Math.abs(b))*100;
}

export function compareResults(current,previous){
  if(!current||!previous)return null;
  const required=["downloadMbps","uploadMbps","latencyMs","jitterMs","probeFailPct"];
  if(required.some(key=>!Number.isFinite(Number(current[key]))||!Number.isFinite(Number(previous[key]))))return null;
  return{
    downloadPct:pctChange(current.downloadMbps,previous.downloadMbps),
    uploadPct:pctChange(current.uploadMbps,previous.uploadMbps),
    latencyDeltaMs:Number(current.latencyMs)-Number(previous.latencyMs),
    jitterDeltaMs:Number(current.jitterMs)-Number(previous.jitterMs),
    probeFailDeltaPct:Number(current.probeFailPct)-Number(previous.probeFailPct),
    currentTimestamp:current.timestamp,
    previousTimestamp:previous.timestamp,
    profile:current.profile||"standard",
    connectionMode:current.connectionMode||"single"
  };
}
