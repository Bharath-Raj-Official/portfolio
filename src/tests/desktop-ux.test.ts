import {expect,it} from 'vitest';
import {nextPortrait,cycleAllowed,crtRequest} from '../lib/desktop-ux';
it('cycles all five portraits in order',()=>{expect(nextPortrait('welcome')).toBe('projects');expect(nextPortrait('contact')).toBe('welcome');});
it('suspends automatic motion while unavailable or reduced',()=>{expect(cycleAllowed(true,false,false)).toBe(true);expect(cycleAllowed(true,true,false)).toBe(false);expect(cycleAllowed(true,false,true)).toBe(false);expect(cycleAllowed(false,false,false)).toBe(false);});
it('retains the latest toggle intent independently of rendered state',()=>{expect(crtRequest(crtRequest(true))).toBe(true);expect(crtRequest(true)).toBe(false);});
