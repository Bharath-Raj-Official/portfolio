export function spherePositions(count:number):[number,number,number][]{
 if(count<=0)return [];const result:[number,number,number][]=[[0,0,1]];
 for(let i=1;i<count;i++){const y=1-2*(i-.5)/(count-1),angle=i*Math.PI*(3-Math.sqrt(5)),r=Math.sqrt(Math.max(0,1-y*y));result.push([Math.cos(angle)*r,y,Math.sin(angle)*r]);}return result;
}
