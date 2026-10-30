import {describe,it,expect} from 'vitest';
import {createRevealFluid,portraitUv} from '../lib/reveal-fluid';
describe('fluid photograph reveal',()=>{
 it('begins clear with neutral displacement channels',()=>{const f=createRevealFluid();expect(f.masked()).toBe(false);expect([...f.texels.slice(0,4)]).toEqual([0,128,128,255]);});
 it('creates a local reveal, handles motion, and dissipates after leaving',()=>{const f=createRevealFluid();f.splat(.5,.5,0,0,1/60,5);f.step(1/60);expect(f.masked()).toBe(true);expect(f.texels[(36*64+32)*4]).toBeGreaterThan(0);expect(f.texels[0]).toBe(0);for(let i=0;i<1000;i++)f.step(1/60,4);expect(f.masked()).toBe(false);f.splat(.2,.5,5,1,1/60,5);f.step(1/60);expect(f.texels.every(Number.isFinite)).toBe(true);f.reset();expect(f.masked()).toBe(false);});
 it('inverts the projected portrait plane for pointer coordinates',()=>{const p=portraitUv(0,0,1,0,0);expect(p?.u).toBeCloseTo(.5);expect(p?.v).toBeCloseTo(.5);expect(portraitUv(100,0,1,0,0)?.u).toBeGreaterThan(.5);});
});

it('exports a neutral screen-flow map, moves it under pointer velocity, and resets it',()=>{const f=createRevealFluid(64,72,true);expect([...f.flowTexels!.slice(0,4)]).toEqual([128,128,0,255]);f.splat(.5,.5,2,0,1/60,5);f.step(1/60);expect(f.flowTexels!.some((value,index)=>index%4===0&&value>128)).toBe(true);f.reset();expect([...f.flowTexels!.slice(0,4)]).toEqual([128,128,0,255]);});
