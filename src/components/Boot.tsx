'use client';
import {useEffect,useRef,useState} from 'react';
import {bootInput,initialBoot,stepBoot,type BootState} from '@/lib/boot';
import {playSound} from '@/runtime/sound';
import {poses} from '@/content/presentation';
import styles from './Desktop.module.css';
const rows=['[ OK ] education.sys ................... BSc (Hons) CS','[ OK ] focus.sys ....................... SOFTWARE / AI','[ OK ] applications.vol ................ 7 projects','[ OK ] webgl.drv (three.js) ............. ready','[ OK ] crt.drv ......................... ready','[ OK ] input.sys ....................... keyboard / touch','[ .. ] mounting volumes ................ 7 / 7'];
export default function Boot({sound,toggleSound,onEntered,reduced}:{sound:boolean;toggleSound:()=>void;onEntered:()=>void;reduced:boolean}){
 const [state,setState]=useState<BootState>(initialBoot),[beam,setBeam]=useState(0),[clip,setClip]=useState(0);const inner=useRef<HTMLDivElement>(null);const enter=useRef(onEntered);enter.current=onEntered;const soundToggle=useRef(toggleSound);soundToggle.current=toggleSound;
 useEffect(()=>{if(reduced){enter.current();return;}let active=true,resourcesReady=false;const assets=Object.values(poses).map(src=>new Promise<void>(resolve=>{const image=new Image();image.onload=()=>resolve();image.onerror=()=>resolve();image.src=src;}));void Promise.allSettled([document.fonts.ready,...assets,import('./CrtScene')]).then(()=>{resourcesReady=true;});
  const input=(event:Event)=>{if(event instanceof KeyboardEvent){if(event.repeat||event.metaKey||event.ctrlKey||event.altKey)return;if(event.key.toLowerCase()==='s'){event.preventDefault();soundToggle.current();return;}}if((event.target as Element)?.closest('[data-boot-sound]'))return;event.preventDefault();setState(s=>bootInput(s,performance.now()));};
  const interval=window.setInterval(()=>{if(!active)return;setState(s=>stepBoot(s,performance.now(),resourcesReady));},130);
  const timeout=window.setTimeout(()=>{resourcesReady=true;},3500);
  document.addEventListener('keydown',input,true);document.querySelector('[data-boot]')?.addEventListener('click',input);
  return()=>{active=false;clearInterval(interval);clearTimeout(timeout);document.removeEventListener('keydown',input,true);document.querySelector('[data-boot]')?.removeEventListener('click',input);};
 },[reduced]);
 useEffect(()=>{if(state.phase!=='exiting')return;playSound('open');let frame=0,timer=0;const tick=()=>{frame++;setBeam(frame);const bounds=inner.current?.getBoundingClientRect();if(bounds)setClip(Math.max(0,Math.min(1,(innerHeight*frame/8-bounds.top)/bounds.height))*100);if(frame<8)timer=window.setTimeout(tick,1000/30);else enter.current();};tick();return()=>clearTimeout(timer);},[state.phase]);
 return <div className={styles.boot} data-boot="" data-boot-phase={state.phase} data-boot-rows={state.rows} role="dialog" aria-label="BHARATH-OS startup"><div ref={inner} className={styles.bootInner} style={{clipPath:beam?`inset(${clip}% 0 0 0)`:undefined}}><div className={styles.bootLogo}><span>BHARATH-OS</span><small>VERSION 0.1 — PHOSPHOR</small><div className={styles.paletteStrip}>{[0,1,2,3,4].map(i=><i key={i}/>)}</div></div><div className={styles.bootLog}>{rows.map((row,i)=><div key={row} style={{visibility:i<state.rows?'visible':'hidden'}}>{row}</div>)}<div className={styles.bootProgress}><i style={{width:`${state.rows/7*100}%`}}/></div></div><p className={styles.bootPrompt}>{state.phase==='loading'?'▮ MOUNTING VOLUMES… ▮':'▮ PRESS ANY KEY TO ENTER ▮'}</p><button data-boot-sound="" aria-pressed={sound} onClick={e=>{e.stopPropagation();toggleSound();}}>[S] SOUND: {sound?'ON':'OFF'}</button></div>{beam>0&&<i className={styles.bootBeam} style={{top:`${beam/8*100}%`}}/>}</div>;
}
