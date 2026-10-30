import {expect,it} from 'vitest';
import {advanceStartup,POWER_ON_MS} from '../lib/startup';
import {readPreferences} from '../lib/state';
it('separates terminal exit, power-on and interactive entry',()=>{
 expect(advanceStartup('terminal','terminal-exited')).toBe('powering-on');
 expect(advanceStartup('powering-on','power-finished')).toBe('entered');
 expect(POWER_ON_MS).toBe(780);
});
it('ignores duplicate input and out-of-order completion',()=>{
 expect(advanceStartup('terminal','power-finished')).toBe('terminal');
 expect(advanceStartup('powering-on','terminal-exited')).toBe('powering-on');
 expect(advanceStartup('entered','terminal-exited')).toBe('entered');
 expect(advanceStartup('entered','power-finished')).toBe('entered');
});
it('finishes entry immediately when reduced motion is requested',()=>{
 expect(advanceStartup('terminal','terminal-exited',true)).toBe('entered');
 expect(advanceStartup('powering-on','reduce-motion')).toBe('entered');
});
it('discards legacy Calm without changing the other display controls',()=>{
 expect(readPreferences('{"calm":true,"theme":"neon","sound":false,"crt":false,"portraitCycle":false}')).toEqual({theme:'phosphor',sound:false,crt:false,portraitCycle:false});
 expect(readPreferences('{"calm":false}')).not.toHaveProperty('calm');
});
