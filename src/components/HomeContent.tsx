'use client';
import {siteUrl} from '@/lib/hosting';
import {type ReactNode} from 'react';
import {profile} from '@/content/profile';
import {featuredProjects} from '@/content/projects';
import type {Pose} from '@/content/presentation';
import styles from './Redesign.module.css';
export default function HomeContent({children,hidden,setPose,go,entered,reduced}:{children:ReactNode;hidden:boolean;setPose:(pose:Pose)=>void;go:(path:string)=>void;entered:boolean;reduced:boolean}){
 return <section hidden={hidden} className={styles.home} data-home="" aria-label="Home"><div className={styles.homeInner}>
  <div className={styles.hero}><header className={styles.heroCopy} data-home-mast=""><h1 className={styles.name} data-reveal="title">Bharath</h1><h2 className={styles.role} data-reveal="lines" data-reveal-delay="320">Software engineering.<br/>Computer vision &amp; applied AI.</h2><p className={styles.intro}>{profile.homeIntroduction}</p><div className={styles.actions}><a className={styles.primaryAction} href={siteUrl("/projects")} onPointerEnter={()=>setPose('projects')} onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();go('/projects');}}>Explore projects <span aria-hidden="true">→</span></a><a className={styles.secondaryAction} href={siteUrl("/resume")} onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();go('/resume');}}>Read résumé <span aria-hidden="true">↗</span></a></div></header>
   <div className={styles.portraitFrame} data-portrait-owner="home" data-entered={entered} data-reduced={reduced}><div className={styles.portraitStage} data-portrait-framed="">{children}</div><span className={styles.portraitCaption} data-portrait-caption="" aria-hidden="true">{reduced?'BHARATH / PORTRAIT':'MOVE TO REVEAL / DRAG TO TURN'}</span></div>
  </div>
  <section className={styles.selected} data-selected-work=""><div className={styles.sectionHead}><h2>Selected engineering work</h2><a href={siteUrl("/projects")} onClick={e=>{e.preventDefault();go('/projects');}}>All seven projects →</a></div>{featuredProjects.map((p,i)=><a className={styles.selectedRow} data-selected-project="" key={p.slug} href={siteUrl('/projet/'+p.slug)} onClick={e=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();go('/projet/'+p.slug);}}><span className={styles.number}>0{i+1}</span><h3>{p.name}</h3><span className={styles.focus}>{p.focus}</span><span className={styles.tag}>{p.evidenceLabel}</span></a>)}</section>

 </div></section>;
}
