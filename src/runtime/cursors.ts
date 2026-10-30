
'use client';
import grids from '@/content/cursor-grids.json';
/** Six measured two-pixel grids, redrawn for each selected palette. */
export function setCursors(foreground:string,background:string){for(const spec of grids){const canvas=document.createElement('canvas');canvas.width=spec.rows[0].length*2;canvas.height=spec.rows.length*2;const ctx=canvas.getContext('2d')!;spec.rows.forEach((row,y)=>[...row].forEach((pixel,x)=>{if(pixel==='.')return;ctx.fillStyle=pixel==='#'?background:foreground;ctx.fillRect(x*2,y*2,2,2);}));document.documentElement.style.setProperty('--cursor-'+spec.name,`url("${canvas.toDataURL()}") ${spec.x} ${spec.y}, ${spec.fallback}`);}}
