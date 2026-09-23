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
