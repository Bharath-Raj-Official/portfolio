'use client';
import {useEffect,useRef,type RefObject} from 'react';
import {projects} from '@/content/projects';
import {presentations} from '@/content/presentation';
import type {BrowserMemory} from './ProjectScene';
import styles from './DesktopFiles.module.css';
export default function DesktopFiles({active,memory,go}:{active:boolean;memory:RefObject<BrowserMemory|null>;go:(path:string,audible?:boolean)=>void}){
 const root=useRef<HTMLDivElement>(null),selected=useRef(memory.current?.selected??0),visited=useRef(false);
 useEffect(()=>{if(active&&visited.current)root.current?.querySelectorAll<HTMLButtonElement>('button')[selected.current]?.focus();visited.current=true;},[active]);
 function select(index:number){selected.current=index;memory.current={position:index,selected:index,spinX:memory.current?.spinX??0,spinY:memory.current?.spinY??0,orientation:memory.current?.orientation??null};}
 return <div ref={root} className={styles.files} data-project-view="index" data-files-view="" aria-label="Project files" inert={!active} onKeyDown={e=>{if(!active||document.querySelector('[role=dialog],[role=menu]'))return;const items=[...root.current!.querySelectorAll<HTMLButtonElement>('button')],current=items.indexOf(document.activeElement as HTMLButtonElement);if(current<0)return;const columns=getComputedStyle(root.current!).gridTemplateColumns.split(' ').length;const delta:Record<string,number>={ArrowRight:1,ArrowLeft:-1,ArrowDown:columns,ArrowUp:-columns};const next=e.key==='Home'?0:e.key==='End'?items.length-1:e.key in delta?Math.max(0,Math.min(items.length-1,current+delta[e.key])):null;if(next!==null){e.preventDefault();items[next].focus();}}}>
 {projects.map((project,index)=><button key={project.slug} data-project-tile="" aria-label={'Open '+project.name} onFocus={()=>select(index)} onClick={()=>{if(active&&!document.querySelector('[role=dialog],[role=menu]')){select(index);go('/projet/'+project.slug,true);}}}><span className={styles.document} aria-hidden="true"><img src={presentations[index].cover} alt=""/></span><span className={styles.name}>{project.name}</span><span className={styles.category}>{project.category}</span></button>)}
 </div>;
}
