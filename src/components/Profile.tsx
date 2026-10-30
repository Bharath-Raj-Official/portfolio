'use client';
import dynamic from 'next/dynamic';
import {useRef} from 'react';
import ProjectReferences from './ProjectReferences';
import {profile} from '@/content/profile';
import type {ThemeId} from '@/lib/state';
import {useReading} from '@/runtime/useReading';
import styles from './Profile.module.css';
const Story=dynamic(()=>import('./ProfileStory'),{ssr:false});
const Title=dynamic(()=>import('./ProfileTitle'),{ssr:false});
const Portraits=dynamic(()=>import('./ProfilePortraits'),{ssr:false});
const roles=profile.capabilities.map(role=>({...role,title:<>{role.lines[0]}<br/>{role.lines[1]}</>}));
export default function Profile({reduced,go,theme}:{reduced:boolean;go:(path:string)=>void;theme:ThemeId}){
 const root=useRef<HTMLElement>(null);useReading(root,reduced,'profile');
 return <section className={styles.profile} ref={root} data-profile=""><div><Title root={root} reduced={reduced}/><Portraits root={root} theme={theme} reduced={reduced}/><header className={styles.profileHeader}><p className={styles.eyebrow}><span data-reveal="type">08 / PROFIL.SYS</span></p><h1 data-reveal="">{profile.title}</h1><div className={styles.profileIntro}><div><small data-reveal="type" data-reveal-delay="620">TODAY</small><p data-reveal="lines" data-reveal-delay="740">{profile.introduction}</p></div><div><small data-reveal="type" data-reveal-delay="780">MY BACKGROUND</small><p data-reveal="lines" data-reveal-delay="900">{profile.about}</p><p data-reveal="lines" data-reveal-delay="900">University of London / SIM · October 2023–September 2026. Full Stack Developer Intern at TechVerse Consulting, April–September 2026.</p></div></div></header><section className={styles.roles}><div className={styles.rolesIntro}><h2 data-reveal="">The areas I work in</h2><div className={styles.rolePortraits} data-role-slot=""/><ol className={styles.roleNames} data-role-names="" aria-hidden="true">{roles.map(role=><li key={role.name}>{role.name}</li>)}</ol></div><div className={styles.roleCapabilities}>{roles.map(role=><section className={styles.roleCapability} data-role-copy="" key={role.name}><div className={styles.roleCopy}><h3 data-reveal="">{role.title}</h3><p data-reveal="lines" data-reveal-delay="140"><ProjectReferences text={role.body} go={go}/></p><div className={styles.roleProof} data-reveal="type" data-reveal-delay="320">{role.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><div className={styles.roleSlot} data-role-slot=""/></section>)}</div></section><Story root={root} theme={theme} reduced={reduced} go={go}/><footer className={styles.profileFooter}><div className={styles.profileContactBar}><span>Want to discuss the work?</span><button onClick={()=>go('/contact')}>Get in touch <span aria-hidden="true">↗</span></button></div></footer></div></section>;
}
