'use client';
import {useEffect,useMemo,useRef} from 'react';
import {Canvas,useFrame,useThree} from '@react-three/fiber';
import * as THREE from 'three';
import {themes} from '@/content/presentation';
import type {ThemeId} from '@/lib/state';
import {debugEnabled,subscribeFrame} from '@/runtime/clock';
import styles from './Desktop.module.css';
const shader=`precision highp float;varying vec2 screenUv;uniform vec2 resolution;uniform float time;uniform float motion;uniform vec3 paper;uniform vec3 ink;
float noiseAt(vec2 pixel){vec3 q=fract(vec3(pixel.x,pixel.y,pixel.x)*.1031);q+=dot(q,q.yzx+33.33);return fract((q.x+q.y)*q.z);}
void main(){vec2 p=screenUv*resolution;float corner=clamp(resolution.y*.028,16.,32.);vec2 edge=abs(p-resolution*.5)-(resolution*.5-corner);float distance=length(max(edge,0.))+min(max(edge.x,edge.y),0.)-corner;float inside=1.-smoothstep(-1.25,1.25,distance);
float scan=.5+.5*sin(p.y*2.0944),grille=.5+.5*sin(p.x*1.5708);float grain=motion*.07*(noiseAt(p+fract(time*61.7)*vec2(391.,827.))-.5);float v=pow(max(0.,16.*screenUv.x*screenUv.y*(1.-screenUv.x)*(1.-screenUv.y)),.22);float rim=(1.-smoothstep(0.,.1,min(min(screenUv.x,screenUv.y),min(1.-screenUv.x,1.-screenUv.y))))*.13;float flicker=1.+motion*.05*sin(time*43.)*(.55+.45*sin(time*13.7));float shade=clamp((scan*.17+grille*.085+(1.-v)*.18+rim)*flicker+min(grain,0.),0.,.85);float band=(screenUv.y-fract(time*.11))*14.;float light=(motion*.05*exp(-band*band)*1.8+max(grain,0.)*.8)*flicker;float reflection=max(0.,1.-length((screenUv-vec2(.32,.86))*vec2(1.5,2.4)));reflection=reflection*reflection*.05;vec3 bezel=paper*.3;vec3 surface=bezel*shade+paper*.6+ink*light+reflection;gl_FragColor=vec4(mix(bezel,surface,inside),mix(1.,shade+light+reflection,inside));}`;
function Glass({theme,reduced,enabled}:{theme:ThemeId;reduced:boolean;enabled:boolean}){
 const {size,advance,gl}=useThree();const last=useRef(-1);const mesh=useRef<THREE.Mesh>(null);
 const uniforms=useMemo(()=>({resolution:{value:new THREE.Vector2(1,1)},time:{value:0},motion:{value:1},paper:{value:new THREE.Color()},ink:{value:new THREE.Color()}}),[]);
 const material=useMemo(()=>new THREE.ShaderMaterial({vertexShader:'varying vec2 screenUv;void main(){screenUv=uv;gl_Position=vec4(position.xy,0.,1.);}',fragmentShader:shader,uniforms,blending:THREE.NoBlending,transparent:true,depthTest:false,depthWrite:false}),[uniforms]);
 useEffect(()=>()=>material.dispose(),[material]);
 useEffect(()=>{uniforms.paper.value.set(themes[theme].colors[0]).convertLinearToSRGB();uniforms.ink.value.set(themes[theme].colors[4]).convertLinearToSRGB();uniforms.motion.value=reduced?0:1;uniforms.resolution.value.set(size.width,size.height);advance(0,true);},[theme,reduced,size,uniforms,advance,enabled]);
 useEffect(()=>{if(!enabled)return;let settleFrames=8;last.current=-1;return subscribeFrame(t=>{if(reduced&&settleFrames<=0)return;if(t-last.current<1/30)return;last.current=t;settleFrames--;advance(t,true);},40);},[advance,reduced,enabled]);
 useEffect(()=>{if(!debugEnabled)return;const paint=()=>advance(performance.now()/1000,true);document.addEventListener('research:crt-frame',paint);return()=>document.removeEventListener('research:crt-frame',paint);},[advance]);
 useFrame(()=>{uniforms.time.value=reduced?0:performance.now()/1000;gl.domElement.dataset.motion=String(uniforms.motion.value);gl.domElement.dataset.actualMotion=String(mesh.current?(mesh.current.material as THREE.ShaderMaterial).uniforms.motion?.value:'unmounted');});
 return <mesh ref={mesh} frustumCulled={false}><planeGeometry args={[2,2]}/><primitive object={material} attach="material"/></mesh>;
}
export default function CrtScene({theme,reduced,enabled=true}:{theme:ThemeId;reduced:boolean;enabled?:boolean}){return <div hidden={!enabled} className={styles.crt} data-crt-backend="overlay" aria-hidden="true"><Canvas frameloop="never" flat dpr={[1,1.25]} gl={{alpha:true,antialias:false,depth:false,stencil:false}} style={{pointerEvents:'none'}} onCreated={({gl})=>{gl.setClearColor(0,0);gl.domElement.dataset.crtBackend='overlay';}}><Glass theme={theme} reduced={reduced} enabled={enabled}/></Canvas></div>;}
