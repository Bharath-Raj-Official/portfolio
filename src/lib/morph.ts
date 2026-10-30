function generator(seed:number){let value=seed>>>0;return()=>{value=(Math.imul(value,1664525)+1013904223)>>>0;return value/4294967295;};}
const fract=(x:number)=>x-Math.floor(x);
export function cloudStrokes(count:number){const next=generator(7),data=new Float32Array(count*4),length=new Float32Array(count);for(let i=0;i<count;i++){const theta=next()*Math.PI*2,phi=Math.acos(next()*2-1),radius=235+next()*130;data[i*4]=Math.sin(phi)*Math.cos(theta)*radius;data[i*4+1]=Math.cos(phi)*radius*.8;data[i*4+2]=Math.sin(phi)*Math.sin(theta)*radius;}return {data,length};}
export function strokeSeeds(count:number){const next=generator(23);return Float32Array.from({length:count},next);}
export function morphProgress(blend:number,seed:number){const x=Math.min(1,Math.max(0,blend*1.45-seed*.45));return x*x*(3-2*x);}
/** Retarget live marks before empty sample cells; preserve a one-to-one assignment. */
export function assignStrokeTargets(source:Float32Array,target:Float32Array,sequence:number,rank?:{from:(index:number)=>number;to:(index:number)=>number}){
 const sourceLive:number[]=[],sourceOff:number[]=[],targetLive:number[]=[],targetOff:number[]=[];
 for(let i=0;i<source.length;i++)(source[i]**2>.04?sourceLive:sourceOff).push(i);
 for(let i=0;i<target.length;i++)(target[i]**2>.04?targetLive:targetOff).push(i);
 const next=generator((2654435769^Math.imul(sequence,2246822507))>>>0);
 for(const array of [targetLive,targetOff])for(let i=array.length-1;i>0;i--){const j=Math.min(i,Math.floor(next()*(i+1)));[array[i],array[j]]=[array[j],array[i]];}
 if(rank){for(let i=sourceLive.length-1;i>0;i--){const j=Math.min(i,Math.floor(next()*(i+1)));[sourceLive[i],sourceLive[j]]=[sourceLive[j],sourceLive[i]];}const band=(value:number)=>Math.max(0,Math.min(255,Math.floor(value*256)));sourceLive.sort((a,b)=>band(rank.from(a))-band(rank.from(b)));targetLive.sort((a,b)=>band(rank.to(a))-band(rank.to(b)));}
 const order=new Uint32Array(source.length),targets=[...targetLive,...targetOff];let index=0;for(const i of [...sourceLive,...sourceOff])order[i]=targets[index++];return order;
}
export function strokeTravel(x:number,y:number,targetX:number,targetY:number,seed:number,sequence:number):[number,number,number]{
 const dx=targetX-x,dy=targetY-y,distance=Math.hypot(dx,dy),a=fract(seed*97.31+sequence*.61803398875),b=fract(seed*43.17+sequence*.38196601125),c=fract(seed*71.93+sequence*.754877666),bend=(a<.5?-1:1)*(18+Math.min(42,distance*.16)+b*12),px=distance>.001?-dy/distance:Math.cos(a*Math.PI*2),py=distance>.001?dx/distance:Math.sin(a*Math.PI*2);
 return[px*bend,py*bend,(c<.5?-1:1)*(46+fract(c*11.37)*44)];
}
export function freezeStrokes(from:Float32Array,to:Float32Array,lengths:Float32Array,seeds:Float32Array,travel:Float32Array,blend:number){for(let i=0;i<seeds.length;i++){const t=morphProgress(blend,seeds[i]),arc=Math.sin(Math.PI*t);for(let j=0;j<4;j++)from[i*4+j]+=(to[i*4+j]-from[i*4+j])*t+(j<3?travel[i*3+j]*arc:0);lengths[i*2]+=(lengths[i*2+1]-lengths[i*2])*t;} }
