'use client';
import {useLayoutEffect,useMemo,useRef,useState} from 'react';
import {projects} from '@/content/projects';
import {themes} from '@/content/presentation';
import {commandSelection,type ThemeId} from '@/lib/state';
import type {Action} from './Header';
import {revealDither} from '@/runtime/reveal';
import styles from './Desktop.module.css';
export default function CommandPalette({go,action,theme,onClose,reduced}:{go:(path:string)=>void;action:(a:Action)=>void;theme:(id:ThemeId)=>void;onClose:()=>void;reduced:boolean}){
 const [query,setQuery]=useState(''),[selected,setSelected]=useState(0);const input=useRef<HTMLInputElement>(null),box=useRef<HTMLDivElement>(null);
 useLayoutEffect(()=>{const previous=document.activeElement as HTMLElement|null;input.current?.focus();const stop=box.current&&!reduced?revealDither(box.current):()=>{};return()=>{stop();previous?.focus?.({preventScroll:true});};},[reduced]);
 const items=useMemo(()=>[
  ...projects.map(p=>({label:p.name,detail:'OPEN PROJECT',run:()=>go('/projet/'+p.slug)})),
  ...[{label:'cv_bharath.txt',detail:'READ RÉSUMÉ',path:'/resume'},{label:'contact.app',detail:'CONTACT METHODS',path:'/contact'},{label:'profil.sys',detail:'PROFILE · SKILLS · METHOD',path:'/profile'}].map(i=>({...i,run:()=>go(i.path)})),
  ...([{label:'surprise me',detail:'A RANDOM PROJECT',a:'random'},{label:'open résumé PDF',detail:'PDF',a:'print'},{label:'full screen',detail:'TOGGLE',a:'fullscreen'},{label:'CRT',detail:'ON / OFF',a:'crt'},{label:'mute / enable sound',detail:'AUDIO',a:'sound'}] as const).map(i=>({...i,run:()=>action(i.a)})),
  ...Object.entries(themes).filter(([id])=>id==='phosphor').map(([id,t])=>({label:t.label.toLowerCase()+' theme',detail:'CHANGE THEME',run:()=>theme(id as ThemeId)})),
  ...([{label:'copy my email',detail:'CLIPBOARD',a:'copy-email'},{label:'copy page address',detail:'CLIPBOARD',a:'copy-link'},{label:'keyboard shortcuts',detail:'HELP',a:'keys'},{label:'about bharath-os',detail:'VERSION 0.1',a:'about'}] as const).map(i=>({...i,run:()=>action(i.a)})),
 ].filter(i=>(i.label+' '+i.detail).toLowerCase().includes(query.toLowerCase())),[query,go,action,theme]);
 const execute=(i:number)=>{if(items[i]){onClose();items[i].run();}};
 return <div className={styles.paletteOverlay} onPointerDown={e=>{if(e.target===e.currentTarget)onClose();}}><div ref={box} className={styles.paletteBox} role="dialog" aria-modal="true" aria-label="Command palette" onKeyDown={e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();onClose();}if(e.key==='Tab'){e.preventDefault();input.current?.focus();}}}><div className={styles.paletteSearch}><span>⌘K</span><input ref={input} value={query} onChange={e=>{setQuery(e.target.value);setSelected(0);}} placeholder="type a command or volume…" aria-label="Search commands" role="combobox" aria-controls="commands" aria-expanded="true" aria-autocomplete="list" aria-activedescendant={items.length?'command-'+selected:undefined} onKeyDown={e=>{if(['ArrowDown','ArrowUp'].includes(e.key)){e.preventDefault();const n=commandSelection(selected,e.key==='ArrowDown'?1:-1,items.length);setSelected(n||0);document.getElementById('command-'+n)?.scrollIntoView({block:'nearest'});}if(e.key==='Enter'){e.preventDefault();execute(selected);}}}/></div><div className={styles.commandList} role="listbox" id="commands">{items.map((item,i)=><button role="option" aria-selected={i===selected} id={'command-'+i} key={item.label} tabIndex={-1} onClick={()=>execute(i)}><span>{item.label}</span><small>{item.detail}</small></button>)}{!items.length&&<p className={styles.dialogText}>No matching command.</p>}</div></div></div>;
}
