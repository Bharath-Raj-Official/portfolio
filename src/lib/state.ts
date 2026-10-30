import {projectSlugs,type ProjectSlug} from '../content/projects';
export const themeIds=['phosphor','candy','sorbet','lagoon','marshmallow','neon'] as const;
export type ThemeId=typeof themeIds[number];
export type DisplayPreferences={theme:ThemeId;crt:boolean;sound:boolean;portraitCycle:boolean};
export type Room='home'|'projects'|'experience'|'profile'|'contact'|'case'|'resume'|'notfound';
export type ProjectView='sphere'|'index'|'gallery'|'overview';
export type DesktopState={room:Room;view:ProjectView;project:ProjectSlug|null};
const home:DesktopState={room:'home',view:'sphere',project:null};
export function parseRoute(path:string):DesktopState{
 const parts=path.split(/[?#]/)[0].split('/').filter(Boolean);
 if(!parts.length)return {...home};
 if(parts.length===1&&parts[0]==='projects')return {...home,room:'projects',view:'overview'};
 if((parts[0]==='projet'||parts[0]==='projects')&&parts.length===2&&projectSlugs.includes(parts[1] as ProjectSlug))return {...home,room:'case',project:parts[1] as ProjectSlug};
 if(parts[0]==='projets'&&(parts.length===1||(parts.length===2&&['index','gallery'].includes(parts[1])))){const query=new URLSearchParams(path.split('?')[1]||'').get('vue');return {...home,room:'projects',view:(parts[1]||(['index','gallery'].includes(query||'')?query:'sphere')) as ProjectView};}
 if(parts.length===1){const rooms:Record<string,Room>={resume:'resume',cv:'experience',profile:'profile',contact:'contact',projects:'projects'};if(rooms[parts[0]])return {...home,room:rooms[parts[0]]};}
 return {...home,room:'notfound'};
}
export function routeFor(state:DesktopState):string{
 if(state.room==='case')return '/projet/'+state.project;
 if(state.room==='projects'&&state.view==='overview')return '/projects';
 if(state.room==='projects')return '/projets'+(state.view==='sphere'?'':'/'+state.view);
 return ({home:'/',resume:'/resume',experience:'/cv',profile:'/profile',contact:'/contact',notfound:'/404'} as const)[state.room];
}
export function closeRoute(state:DesktopState){return state.room==='case'&&state.view==='overview'?'/projects':state.room==='case'?'/projets'+(state.view==='sphere'?'':'/'+state.view):'/';}
export function overlayBackground(current:DesktopState,saved:DesktopState,next:DesktopState):DesktopState{const window=(s:DesktopState)=>s.room==='contact';return window(next)?window(current)?saved:current:next;}
export function readPreferences(raw:string|null):DisplayPreferences{
 const defaults:DisplayPreferences={theme:'phosphor',crt:true,sound:true,portraitCycle:true};
 try{const value=JSON.parse(raw||'{}');if(!value||typeof value!=='object')return defaults;return {theme:'phosphor',crt:typeof value.crt==='boolean'?value.crt:true,sound:typeof value.sound==='boolean'?value.sound:true,portraitCycle:typeof value.portraitCycle==='boolean'?value.portraitCycle:true};}catch{return defaults;}
}
export function windowBounds(position:{x:number;y:number},size:{width:number;height:number},viewport:{width:number;height:number;top:number}){
 return {x:Math.max(8,Math.min(position.x,viewport.width-size.width-8)),y:Math.max(viewport.top+8,Math.min(position.y,viewport.height-size.height-8))};
}

export function commandSelection(current:number,direction:-1|1,count:number){return Math.max(0,Math.min(Math.max(0,count-1),current+direction));}
