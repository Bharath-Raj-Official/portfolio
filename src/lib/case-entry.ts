export function caseEntryMode(from:string,to:string,source:'next'|undefined,audible:boolean):'next'|'spatial'|'fade'{
 if(to!=='case')return 'fade';
 if(from==='case'&&source==='next')return 'next';
 return from==='projects'&&!audible?'spatial':'fade';
}
