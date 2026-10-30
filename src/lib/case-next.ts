const clamp=(p:number)=>Math.max(0,Math.min(1,p));
const ease=(p:number,a:number,b:number)=>{const t=clamp((p-a)/(b-a));return t*t*(3-2*t);};
export function nextCaseState(progress:number){const p=clamp(progress);return{formation:clamp(p/.46),opening:ease(p,.52,.98),reveal:ease(p,.52,.88),description:ease(p,.78,.96),eyebrow:1-ease(p,.52,.64),complete:p>=1};}
export function nextCasePlane(width:number,height:number,opening:number,zoom:number){const square=Math.min(width-48*zoom,height-48*zoom),size=square/(1+square*((8/380+92/380)*1.35)/(2400*zoom)),t=clamp(opening);return{width:size+(width-size)*t,height:size+(height-size)*t,depth:size*1.35*(1-t)};}
