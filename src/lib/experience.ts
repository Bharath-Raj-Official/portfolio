export function timelineStops(width:number,centers:readonly number[]){return centers.map(center=>Math.round(width/2-center));}
export function clampTimeline(value:number,stops:readonly number[]){return stops.length?Math.min(stops[0],Math.max(stops[stops.length-1],value)):0;}
export function nearestTimelineStep(value:number,stops:readonly number[]){let index=0,distance=Infinity;stops.forEach((stop,i)=>{const next=Math.abs(stop-value);if(next<distance){index=i;distance=next;}});return index;}
export function timelineWheel(x:number,y:number,mode:number){return(Math.abs(x)>Math.abs(y)?x:y)*(mode===1?16:1);}
export function timelineVelocity(delta:number,milliseconds:number,previous:number){return delta/Math.max(1,milliseconds)*.8+previous*.2;}
export function timelineHashStep(hash:string,ids:readonly string[]){return Math.max(0,ids.indexOf(hash.startsWith('#')?hash.slice(1):hash));}
export function timelineKeyStep(key:string,index:number,count:number,repeat:boolean,last:number,now:number):number|null{
 if(count<1)return null;if(key==='Home')return 0;if(key==='End')return count-1;
 const direction=key==='ArrowRight'||key==='ArrowDown'?1:key==='ArrowLeft'||key==='ArrowUp'?-1:0;
 if(!direction||repeat&&now-last<240)return null;const next=index+direction;return next>=0&&next<count?next:null;
}
