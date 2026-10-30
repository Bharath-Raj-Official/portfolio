import {expect,it} from 'vitest';
import {scrollRanges,scrollProgress} from '../lib/scroll-ranges';
it('halves pinned travel using the real reading height',()=>{expect(scrollRanges(800)).toEqual({profileHeight:3200,profileTravel:2400,nextHeight:1540,nextTravel:740});});
it('clamps progress and supports reversing through the same range',()=>{expect(scrollProgress(-1,740)).toBe(0);expect(scrollProgress(370,740)).toBe(.5);expect(scrollProgress(740,740)).toBe(1);expect(scrollProgress(2000,740)).toBe(1);});
