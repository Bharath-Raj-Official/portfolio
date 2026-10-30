export type WindowBox={left:number;top:number;width:number;height:number};
export function collapsedWindow(box:WindowBox):WindowBox{return{left:box.left+box.width*.44,top:box.top+box.height*.44,width:box.width*.12,height:box.height*.12};}
export function windowOutlineBox(from:WindowBox,to:WindowBox,step:number):WindowBox{const t=Math.min(1,Math.max(0,step/5)),p=1-(1-t)*(1-t),mix=(a:number,b:number)=>Math.round((a+(b-a)*p)*1e8)/1e8;return{left:mix(from.left,to.left),top:mix(from.top,to.top),width:mix(from.width,to.width),height:mix(from.height,to.height)};}
