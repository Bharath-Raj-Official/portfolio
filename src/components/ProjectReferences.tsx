import {siteUrl} from '@/lib/hosting';
import {projects} from '@/content/projects';
export default function ProjectReferences({text,go}:{text:string;go:(path:string)=>void}){
 const names=projects.map(p=>p.name),pattern=new RegExp('('+names.map(n=>n.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')','g');
 return <>{text.split(pattern).map((part,i)=>{const project=projects.find(p=>p.name===part);return project?<a key={i} href={siteUrl('/projet/'+project.slug)} onClick={e=>{if(e.metaKey||e.ctrlKey||e.altKey||e.shiftKey)return;e.preventDefault();go('/projet/'+project.slug);}} style={{textDecoration:'underline',textUnderlineOffset:4}}>{part}</a>:part;})}</>;
}
