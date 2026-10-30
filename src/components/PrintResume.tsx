import ResumeContent from './ResumeContent';
import desktop from './Desktop.module.css';
import styles from './Redesign.module.css';
export default function PrintResume(){return <div className={`${styles.printOnly} ${desktop.printResume}`} data-print-resume=""><ResumeContent/></div>;}
