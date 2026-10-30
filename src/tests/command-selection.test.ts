import {it,expect} from 'vitest';
import {commandSelection} from '../lib/state';
it('clamps command selection at either end and handles no results',()=>{expect(commandSelection(0,-1,7)).toBe(0);expect(commandSelection(6,1,7)).toBe(6);expect(commandSelection(2,1,7)).toBe(3);expect(commandSelection(2,-1,7)).toBe(1);expect(commandSelection(0,1,0)).toBe(0);});
