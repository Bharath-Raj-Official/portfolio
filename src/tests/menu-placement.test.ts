import {expect,it} from 'vitest';
import {positionSubmenu} from '../lib/menu-placement';
it('overlaps the parent border and aligns seven logical pixels above the trigger',()=>{expect(positionSubmenu({triggerTop:200,parentRight:509,width:240,height:278,viewportWidth:1440,viewportHeight:900,zoom:1})).toEqual({left:508,top:193});});
it('keeps the theme submenu above the lower landscape boundary',()=>{expect(positionSubmenu({triggerTop:200,parentRight:509,width:240,height:278,viewportWidth:844,viewportHeight:390,zoom:1})).toEqual({left:508,top:104});});
it('converts measured physical bounds back to zoomed CSS coordinates',()=>{const p=positionSubmenu({triggerTop:240,parentRight:610.8,width:288,height:333.6,viewportWidth:1920,viewportHeight:1080,zoom:1.2});expect(p.left).toBeCloseTo(508);expect(p.top).toBeCloseTo(193);expect(positionSubmenu({triggerTop:200,parentRight:900,width:240,height:278,viewportWidth:1000,viewportHeight:900,zoom:1}).left).toBe(752);});
