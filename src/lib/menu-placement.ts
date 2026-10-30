/** Source fixed submenus overlap one pixel and retain an eight-pixel viewport edge. */
export function positionSubmenu({triggerTop,parentRight,width,height,viewportWidth,viewportHeight,zoom}:{triggerTop:number;parentRight:number;width:number;height:number;viewportWidth:number;viewportHeight:number;zoom:number}){
 return{left:Math.min(parentRight-zoom,viewportWidth-width-8*zoom)/zoom,top:Math.min(triggerTop-7*zoom,viewportHeight-height-8*zoom)/zoom};
}
