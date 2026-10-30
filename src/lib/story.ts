export const storyLandmarks=[.14,.51,.85] as const;
export const clamp=(n:number)=>Math.max(0,Math.min(1,n));
/** Interpolate visible reading spans; gaps carry the transitions between scenes. */
export function storyReadingProgress(focus:number,entries:readonly {top:number;bottom:number}[],leadIn=240){
 const bands=[[.06,.33],[.385,.67],[.735,1]];let progress=0;
 for(let i=0;i<entries.length;i++){const entry=entries[i],[start,end]=bands[i]??[1,1];if(focus<entry.top){const from=i===0?entry.top-leadIn:entries[i-1].bottom,previous=i===0?0:bands[i-1][1];return previous+(start-previous)*clamp((focus-from)/Math.max(1,entry.top-from));}progress=start+(end-start)*clamp((focus-entry.top)/Math.max(1,entry.bottom-entry.top));if(focus<=entry.bottom)return progress;}
 return progress;
}
export function smooth(value:number,start:number,end:number){const t=clamp((value-start)/(end-start));return t*t*(3-2*t);}
export function storyState(value:number){const p=clamp(value),starts=[.06,.36,.71],ends=[.34,.69,1.04];return{p,chapter:p<.35?0:p<.7?1:2,intro:1-smooth(p,.015,.075),morph:smooth(p,.33,.385)+smooth(p,.67,.735),reveals:starts.map((start,i)=>smooth(p,start,start+.04)*(1-smooth(p,ends[i]-.02,ends[i])))};}
