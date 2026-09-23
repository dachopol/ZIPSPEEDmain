export const QUALITY_MODEL_VERSION="1.1";
export const HEALTH_MODEL=Object.freeze({
  downloadTargetMbps:100,
  uploadTargetMbps:20,
  latencyIdealMs:25,
  latencyWorstMs:180,
  jitterIdealMs:5,
  jitterWorstMs:45,
  probeFailIdealPct:0,
  probeFailWorstPct:40,
  weights:Object.freeze({download:0.30,upload:0.20,latency:0.25,jitter:0.15,probeFail:0.10}),
  bands:Object.freeze({excellent:85,good:70,fair:50})
});

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
  const down=higherIsBetter(Number(result.downloadMbps),HEALTH_MODEL.downloadTargetMbps);
  const up=higherIsBetter(Number(result.uploadMbps),HEALTH_MODEL.uploadTargetMbps);
  const latency=lowerIsBetter(Number(result.latencyMs),HEALTH_MODEL.latencyIdealMs,HEALTH_MODEL.latencyWorstMs);
  const jitter=lowerIsBetter(Number(result.jitterMs),HEALTH_MODEL.jitterIdealMs,HEALTH_MODEL.jitterWorstMs);
  const probe=lowerIsBetter(Number(result.probeFailPct),HEALTH_MODEL.probeFailIdealPct,HEALTH_MODEL.probeFailWorstPct);
  if([down,up,latency,jitter,probe].some(v=>v===null))return null;
  return Math.round(
    down*HEALTH_MODEL.weights.download+
    up*HEALTH_MODEL.weights.upload+
    latency*HEALTH_MODEL.weights.latency+
    jitter*HEALTH_MODEL.weights.jitter+
    probe*HEALTH_MODEL.weights.probeFail
  );
}

export function healthBand(index){
  if(!Number.isFinite(index))return "unknown";
  if(index>=HEALTH_MODEL.bands.excellent)return "excellent";
  if(index>=HEALTH_MODEL.bands.good)return "good";
  if(index>=HEALTH_MODEL.bands.fair)return "fair";
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
  variation:35,
  loadImpact:50,
  uploadVariation:35
});

export function diagnosticFlags(result){
  if(!result||typeof result!=="object")return[];
  const flags=[];
  const add=(id,value,threshold,direction,unit)=>{
    if(Number.isFinite(value))flags.push({id,value,threshold,direction,unit});
  };
  const down=Number(result.downloadMbps),up=Number(result.uploadMbps),lat=Number(result.latencyMs),
    jit=Number(result.jitterMs),probe=Number(result.probeFailPct),variation=Number(result.throughputVariationPct),uploadVariation=Number(result.uploadThroughputVariationPct),impact=Number(result.loadedLatencyDeltaMs),uploadImpact=Number(result.uploadLoadedLatencyDeltaMs);
  if(Number.isFinite(down)&&down<DIAGNOSTIC_THRESHOLDS.download)add("download",down,DIAGNOSTIC_THRESHOLDS.download,"below","Mbps");
  if(Number.isFinite(up)&&up<DIAGNOSTIC_THRESHOLDS.upload)add("upload",up,DIAGNOSTIC_THRESHOLDS.upload,"below","Mbps");
  if(Number.isFinite(lat)&&lat>DIAGNOSTIC_THRESHOLDS.latency)add("latency",lat,DIAGNOSTIC_THRESHOLDS.latency,"above","ms");
  if(Number.isFinite(jit)&&jit>DIAGNOSTIC_THRESHOLDS.jitter)add("jitter",jit,DIAGNOSTIC_THRESHOLDS.jitter,"above","ms");
  if(Number.isFinite(probe)&&probe>DIAGNOSTIC_THRESHOLDS.probeFail)add("probeFail",probe,DIAGNOSTIC_THRESHOLDS.probeFail,"above","%");
  if(Number.isFinite(variation)&&variation>DIAGNOSTIC_THRESHOLDS.variation)add("variation",variation,DIAGNOSTIC_THRESHOLDS.variation,"above","%");
  if(Number.isFinite(uploadVariation)&&uploadVariation>DIAGNOSTIC_THRESHOLDS.uploadVariation)add("uploadVariation",uploadVariation,DIAGNOSTIC_THRESHOLDS.uploadVariation,"above","%");
  if(Number.isFinite(impact)&&impact>DIAGNOSTIC_THRESHOLDS.loadImpact)add("loadImpact",impact,DIAGNOSTIC_THRESHOLDS.loadImpact,"above","ms");
  if(Number.isFinite(uploadImpact)&&uploadImpact>DIAGNOSTIC_THRESHOLDS.loadImpact)add("uploadLoadImpact",uploadImpact,DIAGNOSTIC_THRESHOLDS.loadImpact,"above","ms");
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


export const LOAD_IMPACT_THRESHOLDS=Object.freeze({lowMax:20,moderateMax:50});

export function loadImpact(idleLatencyMs,loadedLatencyMs){
  if(idleLatencyMs===null||idleLatencyMs===undefined||loadedLatencyMs===null||loadedLatencyMs===undefined)return null;
  const idle=Number(idleLatencyMs),loaded=Number(loadedLatencyMs);
  if(!Number.isFinite(idle)||!Number.isFinite(loaded)||idle<0||loaded<0)return null;
  const deltaMs=loaded-idle;
  const band=deltaMs<=LOAD_IMPACT_THRESHOLDS.lowMax?"low":deltaMs<=LOAD_IMPACT_THRESHOLDS.moderateMax?"moderate":"high";
  return{deltaMs,band,idleLatencyMs:idle,loadedLatencyMs:loaded};
}


export function primaryDiagnostic(result){
  const flags=diagnosticFlags(result);
  if(!flags.length)return null;
  const scored=flags.map((flag,index)=>{
    let severityRatio=null;
    if(flag.direction==="above"&&flag.threshold>0)severityRatio=flag.value/flag.threshold;
    if(flag.direction==="below")severityRatio=flag.value>0?flag.threshold/flag.value:Number.POSITIVE_INFINITY;
    return{...flag,severityRatio,index};
  }).filter(item=>Number.isFinite(item.severityRatio)||item.severityRatio===Number.POSITIVE_INFINITY);
  if(!scored.length)return null;
  scored.sort((a,b)=>{
    if(a.severityRatio===b.severityRatio)return a.index-b.index;
    if(a.severityRatio===Number.POSITIVE_INFINITY)return-1;
    if(b.severityRatio===Number.POSITIVE_INFINITY)return 1;
    return b.severityRatio-a.severityRatio;
  });
  const top=scored[0];
  return{id:top.id,value:top.value,threshold:top.threshold,direction:top.direction,unit:top.unit,severityRatio:top.severityRatio};
}
