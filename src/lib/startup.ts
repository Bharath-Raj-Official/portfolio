export type StartupPhase='terminal'|'powering-on'|'entered';
export type StartupEvent='terminal-exited'|'power-finished'|'reduce-motion';
export const POWER_ON_MS=780;
export function advanceStartup(phase:StartupPhase,event:StartupEvent,reduced=false):StartupPhase{
 if(event==='reduce-motion')return 'entered';
 if(phase==='terminal'&&event==='terminal-exited')return reduced?'entered':'powering-on';
 if(phase==='powering-on'&&event==='power-finished')return 'entered';
 return phase;
}
