export const BASE_PATH='/portfolio';

/** Turn an application route or public asset into a browser URL. */
export function siteUrl(value:string):string{
 if(!value.startsWith('/')||value.startsWith('//'))return value;
 const split=value.search(/[?#]/),pathname=split<0?value:value.slice(0,split),suffix=split<0?'':value.slice(split);
 const prefixed=pathname===BASE_PATH||pathname.startsWith(BASE_PATH+'/')?pathname:BASE_PATH+pathname;
 return prefixed+(/\.[^/]+$/.test(pathname)||prefixed.endsWith('/')?'':'/')+suffix;
}

/** Keep route state independent of the hosting directory. */
export function internalPath(value:string):string{
 if(value===BASE_PATH||value.startsWith(BASE_PATH+'?')||value.startsWith(BASE_PATH+'#'))return '/'+value.slice(BASE_PATH.length);
 return value.startsWith(BASE_PATH+'/')?value.slice(BASE_PATH.length):value;
}

/** Query strings are read after hydration, never during static rendering. */
export function initialBrowserPath(initial:string,pathname:string,search:string):string{
 const browser=internalPath(pathname),normalize=(path:string)=>path.replace(/\/+$/,'')||'/';
 return normalize(browser)===normalize(initial)?browser+search:initial;
}
