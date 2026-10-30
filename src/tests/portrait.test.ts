import {describe,it,expect} from 'vitest';
import {samplePortrait} from '../lib/portrait';
describe('portrait evidence sampling',()=>{
 it('keeps fully transparent pixels absent and returns finite geometry',()=>{const out=samplePortrait(new Uint8ClampedArray(4*4*4),4,4);expect([...out.length].every(x=>x===0)).toBe(true);expect([...out.data].every(Number.isFinite)).toBe(true);});
 it('produces deterministic strokes from the same pixels and preserves the source plane',()=>{const rgba=new Uint8ClampedArray(16*16*4).fill(255);const a=samplePortrait(rgba,16,16),b=samplePortrait(rgba,16,16);expect(a).toEqual(b);expect(a.length.some(v=>v>0)).toBe(true);for(let i=0;i<256;i++){expect(Math.abs(a.data[i*4])).toBeLessThanOrEqual(190);expect(Math.abs(a.data[i*4+1])).toBeLessThanOrEqual(237.5);}});
});
