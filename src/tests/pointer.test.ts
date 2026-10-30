import {describe,it,expect} from 'vitest';
import {createPointerResponse} from '../lib/pointer';
describe('pointer response envelope',()=>{it('does not create a pulse from the first pointer location',()=>{const p=createPointerResponse();p.move(720,350);expect(p.step(1/60)).toBe(0);});it('responds to movement and settles after the pointer leaves',()=>{const p=createPointerResponse();p.move(0,0);p.move(30,0);expect(p.step(1/60)).toBeGreaterThan(0);p.leave();for(let i=0;i<200;i++)p.step(1/60);expect(p.step(1/60)).toBe(0);});});
