import {expect,it} from 'vitest';
import {galleryKeyTarget} from '../lib/case-gallery';

it('leaves vertical article scrolling available outside and at gallery edges',()=>{
 expect(galleryKeyTarget('ArrowUp',0,2,false)).toBeNull();
 expect(galleryKeyTarget('ArrowDown',2,2,false)).toBeNull();
 expect(galleryKeyTarget('ArrowDown',1,2,true)).toBeNull();
 expect(galleryKeyTarget('ArrowUp',1,2,true)).toBeNull();
 expect(galleryKeyTarget('ArrowRight',2,2,false)).toBe(2);
});
it('uses the pending fractional destination for repeated and reversed selection',()=>{
 expect(galleryKeyTarget('ArrowRight',.35,3,false)).toBe(1);
 expect(galleryKeyTarget('ArrowRight',1,3,false)).toBe(2);
 expect(galleryKeyTarget('ArrowLeft',1.6,3,false)).toBe(1);
 expect(galleryKeyTarget('Home',1.6,3,false)).toBe(0);
 expect(galleryKeyTarget('End',.2,3,false)).toBe(3);
 expect(galleryKeyTarget('Space',1,3,false)).toBeNull();
});
