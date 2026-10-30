'use client';
import ResumeContent from './ResumeContent';
import styles from './Redesign.module.css';
export default function Resume(){return <section className={styles.reader} aria-label="Résumé"><div className={styles.pageInner}><div className={styles.resumeTools}><p>Résumé / Bharath Raj Rajamohan</p><button className={styles.primaryAction} onClick={()=>window.print()}>Print / save PDF ↗</button></div><ResumeContent/></div></section>;}
