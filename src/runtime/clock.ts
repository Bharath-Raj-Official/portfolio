'use client';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {SplitText} from 'gsap/SplitText';
import {Flip} from 'gsap/Flip';
import {MorphSVGPlugin} from 'gsap/MorphSVGPlugin';
import {useGSAP} from '@gsap/react';
gsap.registerPlugin(useGSAP,ScrollTrigger,SplitText,Flip,MorphSVGPlugin);
gsap.ticker.lagSmoothing(0);
type Frame=(seconds:number,delta:number)=>void;
const frames=new Map<Frame,number>();let last=0;export const debugEnabled=typeof window!=='undefined'&&new URLSearchParams(location.search).get('debug')==='true';
function tick(time:number){const dt=Math.min(.1,Math.max(0,time-last));last=time;if(document.hidden)return;for(const [callback]of [...frames].sort((a,b)=>a[1]-b[1]))callback(time,dt);if(debugEnabled)(window as unknown as {__eddyClock:unknown}).__eddyClock={subscribers:frames.size,priorities:[...frames.values()]};}
export function subscribeFrame(callback:Frame,priority=0){if(!frames.size){last=gsap.ticker.time;gsap.ticker.add(tick);}frames.set(callback,priority);return()=>{frames.delete(callback);if(!frames.size)gsap.ticker.remove(tick);};}
export {gsap,ScrollTrigger,useGSAP};
