import {expect,it} from 'vitest';
import {presentations} from '../content/presentation';

it('keeps the measured screenshot direction for each assigned reference template',()=>{
 expect(Object.fromEntries(presentations.map(p=>[p.slug,'galleryAxis' in p?p.galleryAxis:null]))).toEqual({
  'cuneiform-reader':'vertical','gaze-sketchpad':'horizontal',eyespy:'horizontal',
  'data-explorer':'vertical','poetry-assistant':'horizontal',snooker:'vertical',terra:'horizontal',
 });
});
