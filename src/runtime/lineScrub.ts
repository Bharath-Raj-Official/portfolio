'use client';

/** Measured line-wise reading mask, reversible without replacing React text nodes. */
export function createLineScrub(element:HTMLElement){
 type Row={top:number;height:number;left:number;right:number};
 let rows:Row[]=[],width=-1,last=-1,caret:HTMLSpanElement|null=null;
 const originalPosition=element.style.position;
 const clear=()=>{caret?.remove();caret=null;for(const key of ['mask-image','mask-size','mask-position','mask-repeat'])element.style.removeProperty(key);};
 return{
  set(progress:number){const p=Math.max(0,Math.min(1,progress));if(p>=1){if(last!==Infinity)clear();last=Infinity;return;}
   const zoom=Math.max(1,Math.min(3,Math.min(innerWidth/1440,innerHeight/900))),box=element.getBoundingClientRect(),currentWidth=box.width/zoom;if(currentWidth<1)return;
   if(Math.abs(currentWidth-width)>.5){clear();rows=[];const range=document.createRange();range.selectNodeContents(element);for(const rect of range.getClientRects()){if(rect.width<.5||rect.height<.5)continue;const row={top:(rect.top-box.top)/zoom,height:rect.height/zoom,left:(rect.left-box.left)/zoom,right:(rect.right-box.left)/zoom},existing=rows.find(r=>Math.abs(r.top-row.top)<r.height*.5);if(existing){existing.left=Math.min(existing.left,row.left);existing.right=Math.max(existing.right,row.right);existing.height=Math.max(existing.height,row.height);}else rows.push(row);}rows.sort((a,b)=>a.top-b.top);width=currentWidth;last=-1;}
   if(!rows.length)return;const steps=rows.length*4,step=Math.round(p*steps);if(step===last)return;last=step;
   if(step===0){caret?.remove();caret=null;element.style.maskImage='linear-gradient(#000,#000)';element.style.maskSize='0 0';element.style.maskPosition='0 0';element.style.maskRepeat='no-repeat';return;}
   let distance=step/steps*rows.reduce((sum,row)=>sum+row.right-row.left,0),index=0;while(index<rows.length-1&&distance>rows[index].right-rows[index].left){distance-=rows[index].right-rows[index].left;index++;}
   const row=rows[index],x=row.left+Math.min(distance,row.right-row.left),caretWidth=row.height*.42;
   if(!caret){caret=document.createElement('span');caret.className='textRevealCaret';caret.ariaHidden='true';if(getComputedStyle(element).position==='static')element.style.position='relative';element.append(caret);}
   element.style.maskImage='linear-gradient(#000,#000),linear-gradient(#000,#000)';element.style.maskSize=`${width+2}px ${Math.max(0,row.top)}px, ${x+caretWidth}px ${row.height}px`;element.style.maskPosition=`0 0,0 ${row.top}px`;element.style.maskRepeat='no-repeat';caret.style.cssText=`left:${x}px;top:${row.top+row.height*.14}px;width:${caretWidth}px;height:${row.height*.72}px`;
  },
  dispose(){clear();element.style.position=originalPosition;},
 };
}
