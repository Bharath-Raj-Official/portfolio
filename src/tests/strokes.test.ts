import {it,expect} from 'vitest';
import {decodeStrokes} from '../lib/strokes';
it('rejects truncated or unsupported portrait geometry rather than reading out of bounds',()=>{expect(()=>decodeStrokes(new ArrayBuffer(3))).toThrow();const b=new ArrayBuffer(8);new DataView(b).setUint32(0,99,true);expect(()=>decodeStrokes(b)).toThrow();});
it('decodes the complete versioned geometry without mixing tone and length',()=>{const b=new ArrayBuffer(28),v=new DataView(b);v.setUint32(0,1,true);v.setUint32(4,1,true);new Float32Array(b,8).set([1,2,3,.5,4]);const out=decodeStrokes(b);expect([...out.data]).toEqual([1,2,3,.5]);expect([...out.length]).toEqual([4]);});
