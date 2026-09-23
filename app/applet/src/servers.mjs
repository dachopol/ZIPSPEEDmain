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
