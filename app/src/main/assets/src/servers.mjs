export const SERVER_DIRECTORY=Object.freeze([
  Object.freeze({
    id:"cloudflare-speed",
    name:"Cloudflare Speed Test",
    provider:"Cloudflare",
    baseUrl:"https://speed.cloudflare.com",
    region:null,
    city:null,
    coordinates:null,
    capabilities:Object.freeze(["metadata","download","upload"])
  })
]);

export function defaultServer(){
  return SERVER_DIRECTORY[0]??null;
}

export function serverLocationLabel(server){
  if(!server)return null;
  if(server.city&&server.region)return `${server.city}, ${server.region}`;
  if(server.region)return server.region;
  return null;
}


export const MLAB_LOCATE_URL="https://locate.measurementlab.net/v2/nearest/ndt/ndt7";

export const DISCOVERY_PROVIDERS=Object.freeze([
  Object.freeze({
    id:"mlab-ndt7-discovery",
    name:"Measurement Lab NDT7",
    provider:"Measurement Lab",
    discoveryUrl:MLAB_LOCATE_URL,
    measurementEnabled:false,
    publicMeasurementDataIfEnabled:true,
    capabilities:Object.freeze(["nearest-server-discovery"])
  })
]);

export function parseMlabLocateResponse(input){
  const raw=Array.isArray(input?.results)?input.results:[];
  return raw.map(item=>{
    const machine=typeof item?.machine==="string"?item.machine.trim():"";
    const city=typeof item?.location?.city==="string"?item.location.city.trim():"";
    const country=typeof item?.location?.country==="string"?item.location.country.trim():"";
    const urls=item?.urls&&typeof item.urls==="object"?item.urls:{};
    return{
      machine:machine||null,
      city:city||null,
      country:country||null,
      downloadAvailable:typeof urls["wss:///ndt/v7/download"]==="string",
      uploadAvailable:typeof urls["wss:///ndt/v7/upload"]==="string"
    };
  }).filter(item=>item.machine).slice(0,4);
}
