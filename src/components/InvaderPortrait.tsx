'use client';
import {siteUrl} from '@/lib/hosting';
import {useEffect,useMemo,useRef,type RefObject} from 'react';
import {Canvas,useThree} from '@react-three/fiber';
import * as T from 'three';
import {themes} from '@/content/presentation';
import type {ThemeId} from '@/lib/state';
import type {Game} from '@/lib/game';
import type {decodeStrokes} from '@/lib/strokes';
import {cloudStrokes,strokeSeeds} from '@/lib/morph';
import {createRevealFluid,portraitUv} from '@/lib/reveal-fluid';
import {debugEnabled,subscribeFrame} from '@/runtime/clock';
import {vertex,fragment} from './PortraitScene';

type Sample=ReturnType<typeof decodeStrokes>;
export type GameLayout={height:number;scale:number;centerY:number};
export type GamePointer={x:number;y:number;active:boolean};
type Props={sample:Sample;game:RefObject<Game>;layout:RefObject<GameLayout>;pointer:RefObject<GamePointer>;theme:ThemeId;reduced:boolean;playing:RefObject<boolean>};
const portraitVertex=vertex.replaceAll('380.','736.').replaceAll('475.','414.');
const portraitFragment=fragment.replace('uniform float opacity;','uniform float opacity;uniform sampler2D damage;').replace('if(live<.5)discard;','if(live<.5||texture2D(damage,card).r<.5)discard;');
const photoVertex=`uniform vec2 viewport;uniform float scale;uniform vec2 center;uniform float yaw;uniform float tilt;varying vec2 card;void main(){card=uv;vec3 p=vec3(position.x*736.,position.y*414.,10.);float c=cos(yaw),s=sin(yaw);p=vec3(p.x*c+p.z*s,p.y,-p.x*s+p.z*c);c=cos(tilt);s=sin(tilt);p=vec3(p.x,p.y*c-p.z*s,p.y*s+p.z*c)*scale;float k=max(.05,(2400.-p.z)/2400.);vec2 q=center+p.xy/k;gl_Position=vec4(q/viewport*2.*k,0.,k);}`;
const photoFragment=`uniform sampler2D photo;uniform sampler2D mask;uniform sampler2D damage;varying vec2 card;void main(){vec4 c=texture2D(photo,card);float reveal=smoothstep(.02,.7,texture2D(mask,card).r);gl_FragColor=vec4(c.rgb,c.a*reveal*texture2D(damage,card).r);}`;
function Field({sample,game,layout,pointer,theme,reduced,playing}:Props){
 const {gl,size,advance}=useThree(),elapsed=useRef(0),animation=useRef(0),lastImpact=useRef(-1),lastDestroyed=useRef(0),brush=useRef<{u:number;v:number;x:number;y:number}|null>(null);
 const fluid=useMemo(()=>createRevealFluid(96,54),[]),mask=useMemo(()=>{const t=new T.DataTexture(fluid.texels,96,54,T.RGBAFormat);t.minFilter=t.magFilter=T.LinearFilter;t.needsUpdate=true;return t;},[fluid]);
 const damageCanvas=useMemo(()=>{const c=document.createElement('canvas');c.width=736;c.height=414;const ctx=c.getContext('2d')!;ctx.fillStyle='white';ctx.fillRect(0,0,736,414);return c;},[]),damage=useMemo(()=>{const t=new T.CanvasTexture(damageCanvas);t.minFilter=t.magFilter=T.LinearFilter;return t;},[damageCanvas]);
 const geometry=useMemo(()=>{const count=sample.length.length,g=new T.InstancedBufferGeometry(),cloud=cloudStrokes(count),lens=new Float32Array(count*2);for(let i=0;i<count;i++)lens[i*2]=lens[i*2+1]=sample.length[i];g.setAttribute('position',new T.BufferAttribute(new Float32Array([-.5,-1,0,.5,-1,0,-.5,1,0,.5,1,0]),3));g.setIndex([0,1,2,2,1,3]);g.setAttribute('aFrom',new T.InstancedBufferAttribute(cloud.data,4));g.setAttribute('aTo',new T.InstancedBufferAttribute(sample.data,4));g.setAttribute('aLength',new T.InstancedBufferAttribute(lens,2).setUsage(T.DynamicDrawUsage));g.setAttribute('aTravel',new T.InstancedBufferAttribute(new Float32Array(count*3),3));g.setAttribute('aSeed',new T.InstancedBufferAttribute(strokeSeeds(count),1));g.instanceCount=count;return g;},[sample]);
 const uniforms=useMemo(()=>({blend:{value:1},clock:{value:0},viewport:{value:new T.Vector2()},scale:{value:1},center:{value:new T.Vector2()},yaw:{value:0},tilt:{value:.12},pointer:{value:new T.Vector2(-10000,-10000)},push:{value:0},spread:{value:0},zoom:{value:1},stroke:{value:.72},opacity:{value:1},colors:{value:[] as T.Color[]},mask:{value:mask},damage:{value:damage},photo:{value:null as T.Texture|null}}),[mask,damage]);
 const material=useMemo(()=>new T.ShaderMaterial({vertexShader:portraitVertex,fragmentShader:portraitFragment,uniforms,transparent:true,depthTest:false,depthWrite:false,side:T.DoubleSide}),[uniforms]),photoMaterial=useMemo(()=>new T.ShaderMaterial({vertexShader:photoVertex,fragmentShader:photoFragment,uniforms,transparent:true,depthTest:false,depthWrite:false,side:T.DoubleSide}),[uniforms]);
 useEffect(()=>{uniforms.colors.value=[0,2,3,4,5].map(i=>new T.Color(themes[theme].colors[i]).convertLinearToSRGB());},[theme,uniforms]);
 useEffect(()=>{let active=true;const im=new Image();im.onload=()=>{if(!active)return;const framed=document.createElement('canvas');framed.width=736;framed.height=414;framed.getContext('2d')!.drawImage(im,0,im.naturalHeight*.05,im.naturalWidth,im.naturalWidth*414/736,0,0,736,414);const t=new T.CanvasTexture(framed);t.colorSpace=T.NoColorSpace;t.minFilter=T.LinearMipmapLinearFilter;t.anisotropy=4;t.needsUpdate=true;uniforms.photo.value=t;};im.src=siteUrl('/portraits/welcome.png');return()=>{active=false;uniforms.photo.value?.dispose();};},[uniforms]);
 useEffect(()=>subscribeFrame((_,dt)=>{
  elapsed.current+=dt;if(playing.current)animation.current+=dt;const box=layout.current,ratio=size.width/800,s=box.scale*ratio,yaw=reduced?0:Math.sin(animation.current*.32)*.2,tilt=reduced?0:.12,c=Math.cos(yaw),sn=Math.sin(yaw),ct=Math.cos(tilt),st=Math.sin(tilt),cy=size.height/2-box.centerY*ratio;
  uniforms.blend.value=reduced?1:Math.min(1,elapsed.current/1.15);uniforms.scale.value=s;uniforms.center.value.set(0,cy);uniforms.yaw.value=yaw;uniforms.tilt.value=tilt;uniforms.viewport.value.set(size.width,size.height);uniforms.stroke.value=.72*Math.min(1.4,Math.sqrt(s/1.2));
  const g=game.current;for(let i=0;i<g.particles.length;i++){const p=g.particles[i];if(!p.alive)continue;const x=sample.data[i*4],y=sample.data[i*4+1],z=sample.data[i*4+2],rx=x*c+z*sn,rz=-x*sn+z*c,ry=y*ct-rz*st,depth=(y*st+rz*ct)*s,k=Math.max(.05,(2400-depth)/2400);p.x=400+rx*s/k/ratio;p.y=(size.height/2-(ry*s+cy)/k)/ratio;}
  const q=pointer.current;if(!reduced&&q.active){const uv=portraitUv(q.x-size.width/2,size.height/2-q.y,s,yaw,tilt,0,cy);if(uv){const u=(uv.u-.5)*380/736+.5,v=(uv.v-.5)*475/414+.5,previous=brush.current,moved=previous&&Math.hypot(q.x-previous.x,q.y-previous.y)>.1;fluid.splat(u,v,moved?(u-previous.u)/Math.max(.001,dt):0,moved?(v-previous.v)/Math.max(.001,dt):0,dt,Math.max(1.5,Math.min(10.125,54/Math.max(1,736*s)*96)));brush.current={u,v,x:q.x,y:q.y};}}else brush.current=null;if(fluid.step(dt))mask.needsUpdate=true;
 },10),[size,uniforms,layout,game,sample,reduced,playing,pointer,fluid,mask]);
 useEffect(()=>subscribeFrame(t=>{
  const g=game.current,ctx=damageCanvas.getContext('2d')!;if(g.destroyed<lastDestroyed.current){ctx.fillStyle='white';ctx.fillRect(0,0,736,414);damage.needsUpdate=true;fluid.reset();mask.needsUpdate=true;}if(g.destroyed!==lastDestroyed.current){const lens=geometry.getAttribute('aLength') as T.InstancedBufferAttribute;for(let i=0;i<g.particles.length;i++)lens.array[i*2]=lens.array[i*2+1]=g.particles[i].alive?sample.length[i]:0;lens.needsUpdate=true;lastDestroyed.current=g.destroyed;}
  if(g.time!==lastImpact.current){lastImpact.current=g.time;const ratio=size.width/800;ctx.fillStyle='black';for(const effect of g.effects){if(effect.kind!=='portrait')continue;ctx.beginPath();for(let i=0;i<=40;i++){const angle=i/40*Math.PI*2,x=(effect.x+Math.cos(angle)*effect.radius)*ratio-size.width/2,y=size.height/2-(effect.y+Math.sin(angle)*effect.radius)*ratio,p=portraitUv(x,y,uniforms.scale.value,uniforms.yaw.value,uniforms.tilt.value,0,uniforms.center.value.y);if(p)ctx.lineTo((p.u-.5)*380+368,414-((p.v-.5)*475+207));}ctx.closePath();ctx.fill();damage.needsUpdate=true;}}
  advance(t,true);if(debugEnabled)(window as unknown as {__eddyGame:unknown}).__eddyGame={portraitParticles:g.particles.length,calls:gl.info.render.calls,triangles:gl.info.render.triangles,geometries:gl.info.memory.geometries,textures:gl.info.memory.textures,layout:layout.current,destroyed:g.destroyed};
 },30),[game,damageCanvas,damage,fluid,mask,geometry,sample,size,uniforms,advance,gl,layout]);
 useEffect(()=>()=>{geometry.dispose();material.dispose();photoMaterial.dispose();mask.dispose();damage.dispose();},[geometry,material,photoMaterial,mask,damage]);
 return <><mesh material={photoMaterial} renderOrder={0}><planeGeometry args={[1,1]}/></mesh><mesh geometry={geometry} material={material} frustumCulled={false} renderOrder={1}/></>;
}
export default function InvaderPortrait(props:Props){return <div data-game-portrait="" aria-hidden="true" style={{position:'absolute',inset:0,pointerEvents:'none',zoom:'calc(1 / var(--ui-zoom))'}}><Canvas frameloop="never" flat dpr={[1,2]} gl={{alpha:true,antialias:false,powerPreference:'high-performance'}} onCreated={({gl})=>gl.setClearColor(0,0)} fallback={<span>Portrait renderer unavailable</span>}><Field {...props}/></Canvas></div>;}
