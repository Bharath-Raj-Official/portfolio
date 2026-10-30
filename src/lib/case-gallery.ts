export function galleryKeyTarget(key:string,pending:number,last:number,outside:boolean):number|null{
 const value=Math.max(0,Math.min(last,pending));
 if((key==='ArrowUp'||key==='ArrowDown')&&(outside||(key==='ArrowUp'?value<=.001:value>=last-.001)))return null;
 const target=key==='ArrowRight'||key==='ArrowDown'?Math.floor(value+.001)+1:
  key==='ArrowLeft'||key==='ArrowUp'?Math.ceil(value-.001)-1:key==='Home'?0:key==='End'?last:null;
 return target===null?null:Math.max(0,Math.min(last,target));
}
