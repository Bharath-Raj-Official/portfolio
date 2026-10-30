import {describe,it,expect} from 'vitest';
import {cyclicOffset,galleryLayout,indexRowHeight,indexPreview,projectParticleColumns,indexNeedsScroll} from './project-layout';
describe('measured project layouts',()=>{
 it('wraps a seven-project selection continuously without duplicating projects',()=>{expect(cyclicOffset(6,0,7)).toBe(-1);expect(cyclicOffset(0,6,7)).toBe(1);expect(cyclicOffset(0,7,7)).toBe(0);expect(cyclicOffset(1,.5,7)).toBe(.5);});
 it('uses the measured gallery size and diagonal steps',()=>{const l=galleryLayout(1440,828);expect(l.size).toBeCloseTo(285.66);expect(l.stepX).toBeCloseTo(94.2678);expect(l.stepY).toBeCloseTo(54.2754);expect(galleryLayout(390,772).size).toBeCloseTo(202.8);});
 it('keeps the selected index row and preview in the measured slots',()=>{expect(indexRowHeight(900)).toBeCloseTo(92.49);const p=indexPreview(1440,828);expect(p.x+p.width/2).toBeCloseTo(979.2);expect(p.width).toBeGreaterThan(790);expect(p.y).toBeCloseTo(34.56);});
 it('samples particles at the reference logical viewport density',()=>{expect(projectParticleColumns(390,844)).toBe(96);expect(projectParticleColumns(1440,900)).toBe(168);expect(projectParticleColumns(1920,1080)).toBe(187);expect(projectParticleColumns(3440,900)).toBe(252);});
 it('only scrolls the index when the rows exceed the available height',()=>{expect(indexNeedsScroll(7,900,1440,828)).toBe(false);expect(indexNeedsScroll(7,390,844,318)).toBe(true);expect(indexNeedsScroll(17,900,1440,828)).toBe(true);expect(indexNeedsScroll(7,900,1440,500)).toBe(true);});
});

import {galleryFormation} from './project-layout';
it('uses displaced gallery position for dust formation and restores a selected plane',()=>{const l={x:500,y:400,stepX:100,stepY:100};expect(galleryFormation(2,100,l,1000,800,0,0)).toBeCloseTo(.2604166667);expect(galleryFormation(2,0,l,1000,800,0,0)).toBeCloseTo(.5208333333);expect(galleryFormation(20,0,l,1000,800,1,0)).toBe(1);expect(galleryFormation(20,0,l,1000,800,0,.65)).toBe(1);});
