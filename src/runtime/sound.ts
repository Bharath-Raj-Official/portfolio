'use client';
export type Sound='open'|'close'|'tick'|'error'|'detent'|'key'|'zoomIn'|'zoomOut'|'sweep'|'tubeOff'|'tubeOn';
let context:AudioContext|null=null;let noise:AudioBuffer|null=null;let enabled=true;const last=new Map<string,number>();
export function enableSound(value:boolean){enabled=value;}
export function playSound(kind:Sound){
 if(!enabled||(!context&&navigator.userActivation&&!navigator.userActivation.hasBeenActive))return;
 try{
  context??=new AudioContext();const ctx=context;if(ctx.state==='suspended')void ctx.resume();
  const now=performance.now();if(['key','detent'].includes(kind)&&now-(last.get(kind)||0)<28)return;last.set(kind,now);
  const notes:Partial<Record<Sound,number[][]>>={open:[[660,0,.05],[880,.05,.05]],close:[[440,0,.05],[330,.05,.05]],tick:[[880,0,.03]],error:[[196,0,.09],[185,.09,.09]],detent:[[1320,0,.012]],key:[[1760,0,.008]],zoomIn:[[392,0,.03],[523,.033,.03],[659,.066,.03],[784,.1,.04]],zoomOut:[[784,0,.03],[659,.033,.03],[523,.066,.03],[392,.1,.04]],tubeOff:[[62,0,.18]],tubeOn:[[55,0,.22]]};
  for(const [frequency,delay,duration]of notes[kind]||[]){const oscillator=ctx.createOscillator(),gain=ctx.createGain(),at=ctx.currentTime+delay;oscillator.type=kind.startsWith('tube')?'sine':'square';oscillator.frequency.setValueAtTime(frequency,at);gain.gain.setValueAtTime(kind==='key'?.0105:kind==='detent'?.015:kind.startsWith('tube')?.09:kind==='zoomIn'||kind==='zoomOut'?.021:.03,at);gain.gain.exponentialRampToValueAtTime(.0001,at+duration);oscillator.connect(gain).connect(ctx.destination);oscillator.start(at);oscillator.stop(at+duration);oscillator.onended=()=>{oscillator.disconnect();gain.disconnect();};}
  if(['sweep','tubeOff','tubeOn'].includes(kind)){const duration=kind==='sweep'?.22:kind==='tubeOff'?.42:.6;if(!noise){noise=ctx.createBuffer(1,ctx.sampleRate*.5,ctx.sampleRate);const channel=noise.getChannelData(0);for(let i=0;i<channel.length;i++)channel[i]=Math.random()*2-1;}const buffer=noise;const source=ctx.createBufferSource(),filter=ctx.createBiquadFilter(),gain=ctx.createGain();source.buffer=buffer;source.loop=true;filter.type='bandpass';filter.Q.value=3;filter.frequency.setValueAtTime(kind==='tubeOff'?7000:kind==='tubeOn'?500:900,ctx.currentTime);filter.frequency.exponentialRampToValueAtTime(kind==='tubeOff'?400:kind==='tubeOn'?8000:4200,ctx.currentTime+duration);gain.gain.setValueAtTime(kind==='sweep'?.042:.036,ctx.currentTime);gain.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);source.connect(filter).connect(gain).connect(ctx.destination);source.start();source.stop(ctx.currentTime+duration);source.onended=()=>{source.disconnect();filter.disconnect();gain.disconnect();};}
 }catch{/* Silent controls still work if the browser has no audio device. */}
}
