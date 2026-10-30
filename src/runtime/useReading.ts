'use client';
import {useEffect,type RefObject} from 'react';
import {scrollRanges} from '@/lib/scroll-ranges';
import Lenis from 'lenis';
import {ScrollTrigger,subscribeFrame} from './clock';
import {watchTextReveals} from './reveal';
const readers=new WeakMap<HTMLElement,Lenis>();
export function scrollReading(owner:HTMLElement,top:number,options:{immediate?:boolean;duration?:number;easing?:(t:number)=>number}={}){const lenis=readers.get(owner);if(lenis)lenis.scrollTo(top,{...options,userData:{requestedScroll:Math.max(0,Math.min(lenis.limit,top))},force:true});else owner.scrollTo({top,behavior:options.immediate?'instant':'smooth'});}
export function readingTarget(owner:HTMLElement){const lenis=readers.get(owner),requested=lenis?.userData.requestedScroll;return lenis?.isScrolling==='smooth'&&typeof requested==='number'?requested:lenis?.targetScroll??owner.scrollTop;}
export function stopReading(owner:HTMLElement){readers.get(owner)?.scrollTo(owner.scrollTop,{immediate:true,force:true});}
export function useReading(root:RefObject<HTMLElement|null>,reduced:boolean,identity:string){
 useEffect(()=>{const wrapper=root.current,content=wrapper?.firstElementChild as HTMLElement|null;if(!wrapper||!content)return;const zoom=()=>Math.max(1,Math.min(3,Math.min(innerWidth/1440,innerHeight/900))),lenis=reduced?null:new Lenis({wrapper,content,autoRaf:false,smoothWheel:true,lerp:.12,prevent:node=>!!node.closest('[data-native-scroll],input,textarea,select,[role=dialog]'),overscroll:false,wheelMultiplier:1/zoom(),touchMultiplier:1/zoom(),virtualScroll:({event})=>!(event instanceof WheelEvent&&event.ctrlKey)});const off=subscribeFrame(t=>{if(!lenis)return;if(wrapper.checkVisibility())lenis.raf(t*1000);},-20);lenis?.on('scroll',ScrollTrigger.update);
  if(lenis)readers.set(wrapper,lenis);let stopReveals=()=>{},revealsStarted=false;const desktop=wrapper.closest('[data-desktop]'),beginReveals=()=>{if(revealsStarted||desktop?.getAttribute('data-entered')==='false')return;revealsStarted=true;entryObserver.disconnect();stopReveals=watchTextReveals(wrapper,reduced);},entryObserver=new MutationObserver(beginReveals);if(desktop)entryObserver.observe(desktop,{attributes:true,attributeFilter:['data-entered']});beginReveals();
  const measure=()=>{const h=wrapper.clientHeight,r=scrollRanges(h);wrapper.style.setProperty('--reading-height',h+'px');wrapper.style.setProperty('--profile-story-height',r.profileHeight+'px');wrapper.style.setProperty('--next-runway-height',r.nextHeight+'px');lenis?.resize();};const observer=new ResizeObserver(measure);observer.observe(wrapper);measure();const visibility=()=>{if(document.hidden)stopReading(wrapper);};document.addEventListener('visibilitychange',visibility);const resize=()=>{if(lenis){lenis.options.wheelMultiplier=1/zoom();lenis.options.touchMultiplier=1/zoom();}};window.addEventListener('resize',resize);const timer=setTimeout(()=>ScrollTrigger.refresh(),100);return()=>{observer.disconnect();document.removeEventListener('visibilitychange',visibility);stopReading(wrapper);clearTimeout(timer);window.removeEventListener('resize',resize);entryObserver.disconnect();stopReveals();off();lenis?.destroy();readers.delete(wrapper);for(const trigger of ScrollTrigger.getAll())if(trigger.scroller===wrapper)trigger.kill();ScrollTrigger.scrollerProxy(wrapper);
   // GSAP 3.15 removes the element and vertical getter, but leaves its horizontal
   // getter in the shared cache. That getter retains the entire detached page.
   const scrollers=(ScrollTrigger as unknown as {core?:{_scrollers?:unknown[]}}).core?._scrollers;
   if(scrollers)for(let i=scrollers.length-1;i>=0;i--){const entry=scrollers[i];if(typeof entry==='function'&&(entry as unknown as {target?:HTMLElement}).target===wrapper)scrollers.splice(i,1);}};
 },[root,reduced,identity]);
}
