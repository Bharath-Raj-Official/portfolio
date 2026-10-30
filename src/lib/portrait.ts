/** Pixel evidence -> deterministic dithered horizontal strokes. Plane dimensions are measured from the reference. */
export function samplePortrait(rgba:Uint8ClampedArray,cols:number,rows:number,options:{width?:number;height?:number;centerY?:number;depthBase?:number;depthRange?:number;adaptiveBackground?:boolean}={}){
 if(cols<2||rows<2||rgba.length!==cols*rows*4)throw Error('Invalid portrait pixel grid');
 const data=new Float32Array(cols*rows*4),length=new Float32Array(cols*rows);
 const smooth=(a:number,b:number,x:number)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t);};
 const distance=(r:number,g:number,b:number,i:number)=>Math.sqrt(.25*(r-rgba[i*4]/255)**2+.5*(g-rgba[i*4+1]/255)**2+.25*(b-rgba[i*4+2]/255)**2);
 let transparent=false;for(let i=3;i<rgba.length;i+=4)if(rgba[i]<255){transparent=true;break;}
 const border=[[],[],[]] as number[][],sides=[0,1].map(()=>[[],[],[]] as number[][]);const bw=Math.max(1,Math.round(cols*.15)),bh=Math.max(1,Math.round(rows*.12));
 for(let y=0;y<bh;y++)for(let x=0;x<bw;x++)for(const [side,xx] of [x,cols-1-x].entries())for(let c=0;c<3;c++){const v=rgba[(y*cols+xx)*4+c]/255;border[c].push(v);sides[side][c].push(v);}
 const background=border.map(list=>list.sort((a,b)=>a-b)[Math.floor(list.length/2)]);
 const backgrounds=options.adaptiveBackground?sides.map(s=>s.map(list=>list.sort((a,b)=>a-b)[Math.floor(list.length/2)])):[background],width=options.width??380,height=options.height??475,centerY=options.centerY??0,depthBase=options.depthBase??10,depthRange=options.depthRange??42;
 const thresholds=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){
  const n=y*cols+x,r=rgba[n*4]/255,g=rgba[n*4+1]/255,b=rgba[n*4+2]/255,lum=r*.299+g*.587+b*.114;
  const d=Math.min(...backgrounds.map(bg=>Math.sqrt(.25*(r-bg[0])**2+.5*(g-bg[1])**2+.25*(b-bg[2])**2))),foreground=transparent?1:smooth(.035,.2,d);
  const edge=smooth(.018,.11,Math.max(distance(r,g,b,x>0?n-1:n),distance(r,g,b,x+1<cols?n+1:n),distance(r,g,b,y>0?n-cols:n),distance(r,g,b,y+1<rows?n+cols:n)));
  const adaptive=options.adaptiveBackground?.1+.9*foreground:1,warm=smooth(-.01,.16,r-b)*adaptive,bright=smooth(.55,.82,lum)*smooth(-.05,.1,r-b)*adaptive,importance=Math.max(warm,bright,.55*foreground,.72*edge);
  const coverage=rgba[n*4+3]/255*Math.max(0,Math.min(1,lum*(.05+.95*importance)+.1*edge+.22*foreground));
  const live=coverage>(thresholds[(y%4)*4+x%4]+.5)/16;
  data[n*4]=x/(cols-1)*width-width/2;data[n*4+1]=centerY+height/2-y/(rows-1)*height;
  data[n*4+2]=depthBase+(live?Math.max(0,Math.min(1,.62*coverage+.23*foreground+.15*edge))*depthRange:0);
  data[n*4+3]=live?.2+coverage*.8:0;length[n]=live?width/(cols-1)*.72:0;
 }
 return {data,length};
}
