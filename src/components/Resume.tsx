import {resumePdfUrl} from '@/content/resume';
import styles from './Redesign.module.css';
import pdf from './Resume.module.css';

export default function Resume(){return <section className={styles.reader} aria-label="Résumé"><div className={styles.pageInner}><div className={styles.resumeTools}><p>Résumé / Bharath Raj Rajamohan</p><div className={pdf.actions}><a className={styles.secondaryAction} href={resumePdfUrl} target="_blank" rel="noopener noreferrer">Open PDF ↗</a><a className={styles.primaryAction} href={resumePdfUrl} download="Bharath_Raj_Rajamohan_Resume.pdf">Download PDF ↓</a></div></div><object className={pdf.preview} data={resumePdfUrl} type="application/pdf" aria-label="Bharath Raj Rajamohan résumé PDF"><p>Your browser cannot preview this PDF. <a href={resumePdfUrl} target="_blank" rel="noopener noreferrer">Open the résumé PDF</a> to read or print it.</p></object></div></section>;}
