import {it,expect} from 'vitest';
import {createGalleryInertia} from '../lib/gallery-response';
it('uses the measured fast/slow response and suppresses rebase impulses',()=>{const response=createGalleryInertia();for(let i=1;i<=120;i++)response.step(i/6,1/60);expect(response.fast).toBeCloseTo(.5,6);expect(response.slow).toBeCloseTo(1.6,4);response.reset(20);response.step(20,1/60);expect(response.fast).toBe(0);expect(response.slow).toBe(0);for(let i=1;i<=120;i++)response.step(20+i,1/60);expect(response.fast).toBeLessThanOrEqual(2.2);expect(response.slow).toBe(2.2);});
