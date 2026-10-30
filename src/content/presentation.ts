import {siteUrl} from '../lib/hosting';
import {projects,type ProjectSlug} from './projects';
import {profile} from './profile';
export const themes={
 phosphor:{label:'Phosphor',colors:['#14100A','#3A2A14','#8C2A18','#E0501E','#FFA02E','#FFE2B0']},
 candy:{label:'Candy',colors:['#01141D','#0F323F','#0B5A66','#82BA88','#FAA4B5','#FFF183']},
 sorbet:{label:'Sorbet',colors:['#22070E','#442229','#832758','#70C1E1','#F8B77C','#FAF4C1']},
 lagoon:{label:'Lagoon',colors:['#041606','#1D3420','#0B5A66','#398847','#70C1E1','#FFF183']},
 marshmallow:{label:'Marshmallow',colors:['#22070E','#442229','#2B5E10','#C85C88','#FFF183','#FDF9D0']},
 neon:{label:'Neon',colors:['#1E0D00','#41270E','#803705','#0B96AF','#82BA88','#FAA4B5']},
} as const;
export type ProjectPresentation={slug:ProjectSlug;layout:'sequence'|'editorial'|'offset'|'product';galleryAxis:'horizontal'|'vertical';cover:string;number:string};
const layouts=['sequence','editorial','offset','product','product','editorial','offset'] as const;
const galleryAxes=['vertical','horizontal','horizontal','vertical','horizontal','vertical','horizontal'] as const;
export const presentations:ProjectPresentation[]=projects.map((p,i)=>({slug:p.slug,layout:layouts[i],galleryAxis:galleryAxes[i],number:String(i+1).padStart(2,'0'),cover:p.media.find(m=>m.kind==='image')?.src||siteUrl('/projects/'+p.slug+'/cover.svg')}));
export const portfolioContent={...profile,projects};
export type PortfolioContent=typeof portfolioContent;
export const poses={welcome:siteUrl('/portraits/welcome.png'),projects:siteUrl('/portraits/projects.png'),experience:siteUrl('/portraits/experience.png'),profile:siteUrl('/portraits/about.png'),contact:siteUrl('/portraits/contact.png')} as const;
export type Pose=keyof typeof poses;
export const milestones=[
 {id:'bsc2023',branch:'education',title:'University of London / SIM',role:'BSc (Honours) Computer Science',dates:'October 2023 — September 2026',text:profile.education[0].details,tags:['computer science','machine learning','artificial intelligence']},
 {id:'tech2026',branch:'work',title:'TechVerse Consulting',role:profile.experience[0].role,dates:'6 April — 18 September 2026',text:profile.experience[0].description,tags:['full stack','debugging','testing']},
 {id:'next2026',branch:'work',title:'The next chapter',role:'Computer science graduate',dates:'Available from 21 December 2026',text:profile.introduction,tags:['software engineering','data','testing','applied AI']},
];
