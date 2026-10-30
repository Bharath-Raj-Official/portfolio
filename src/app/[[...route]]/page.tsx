import {staticRoutes} from '@/lib/static-routes';
import Desktop from '@/components/Desktop';
import {parseRoute} from '@/lib/state';
import {notFound} from 'next/navigation';
import {projects} from '@/content/projects';
export async function generateMetadata({params}:{params:Promise<{route?:string[]}>}){const {route=[]}=await params;const state=parseRoute('/'+route.join('/'));const label=state.project?projects.find(p=>p.slug===state.project)?.name:({resume:'Résumé',home:'Computer science graduate',projects:'Projects',experience:'Experience',profile:'Profile',contact:'Contact',notfound:'Not found',case:'Project'}[state.room]);return {title:label+' — Bharath'};}
export const dynamicParams=false;
export function generateStaticParams(){return staticRoutes.map(path=>({route:path==='/'?[]:path.slice(1).split('/')}));}
export default async function Page({params}:{params:Promise<{route?:string[]}>}){const {route=[]}=await params;const path='/'+route.join('/');if(parseRoute(path).room==='notfound')notFound();return <Desktop initialPath={path}/>;}
