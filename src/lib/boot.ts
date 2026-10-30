export type BootState={phase:'loading'|'ready'|'exiting'|'entered';rows:number;readyAt:number};
export const initialBoot:BootState={phase:'loading',rows:0,readyAt:0};
export function stepBoot(state:BootState,now:number,resourcesReady=true):BootState{
 if(state.phase!=='loading')return state;
 if(state.rows===6&&!resourcesReady)return state;
 if(state.rows===7)return {...state,phase:'ready',readyAt:now};
 return {...state,rows:state.rows+1};
}
export function bootInput(state:BootState,now:number):BootState{
 if(state.phase==='loading')return {phase:'ready',rows:7,readyAt:now};
 if(state.phase==='ready'&&now-state.readyAt>=350)return {...state,phase:'exiting'};
 return state;
}
