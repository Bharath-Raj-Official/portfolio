import {it,expect} from 'vitest';
import {collapsedWindow,windowOutlineBox} from '../lib/window-motion';
it('uses a centred 12-percent origin when no launcher is available',()=>{expect(collapsedWindow({left:100,top:80,width:500,height:400})).toEqual({left:320,top:256,width:60,height:48});});
it('follows five quadratic outline landmarks and reaches the measured window exactly',()=>{const a={left:0,top:0,width:10,height:10},b={left:100,top:200,width:510,height:410};expect(windowOutlineBox(a,b,1)).toEqual({left:36,top:72,width:190,height:154});expect(windowOutlineBox(a,b,5)).toEqual(b);});
