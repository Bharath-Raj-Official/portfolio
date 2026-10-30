import {describe,it,expect} from 'vitest';
import {nextCaseState,nextCasePlane} from '../lib/case-next';
describe('next project choreography',()=>{
 it('forms a readable artifact before opening and revealing its photograph',()=>{const a=nextCaseState(.46);expect(a.formation).toBe(1);expect(a.opening).toBe(0);expect(a.reveal).toBe(0);expect(a.description).toBe(0);const b=nextCaseState(.9);expect(b.reveal).toBe(1);expect(b.opening).toBeLessThan(1);expect(b.description).toBeGreaterThan(0);});
 it('clamps interrupted scroll progress and completes only at the end',()=>{expect(nextCaseState(-3).formation).toBe(0);expect(nextCaseState(.999).complete).toBe(false);expect(nextCaseState(2)).toMatchObject({formation:1,opening:1,reveal:1,description:1,eyebrow:0,complete:true});});
 it('preserves a square portrait with relief allowance, then fits the destination exactly',()=>{const a=nextCasePlane(1440,828,0,1);expect(a.width).toBe(a.height);expect(a.width).toBeLessThan(780);expect(a.depth).toBeGreaterThan(0);expect(nextCasePlane(1440,828,1,1)).toMatchObject({width:1440,height:828,depth:0});});
});
