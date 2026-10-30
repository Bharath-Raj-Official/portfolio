import {projects} from '../content/projects';
export const curatedProjects=[...projects].sort((a,b)=>a.order-b.order);
export type ProjectFilter='selected'|'all'|'vision'|'software'|'data';
export function selectProjects(filter:string){
 if(filter==='all')return curatedProjects;
 if(filter==='selected')return curatedProjects.filter(p=>p.featured);
 if(['vision','software','data'].includes(filter))return curatedProjects.filter(p=>p.group===filter);
 return [];
}
