import {describe,it,expect} from 'vitest';
import {parseRoute,routeFor,readPreferences,closeRoute,windowBounds} from '../lib/state';
import {bootInput,initialBoot,stepBoot} from '../lib/boot';
describe('desktop navigation',()=>{
 it('parses modes, cases and aliases without allowing unknown projects',()=>{
  expect(parseRoute('/projets/index').view).toBe('index');
  expect(parseRoute('/projets/gallery').view).toBe('gallery');
  expect(parseRoute('/projets?vue=gallery').view).toBe('gallery');
  expect(parseRoute('/projects/gaze-sketchpad').project).toBe('gaze-sketchpad');
  expect(parseRoute('/projet/unknown').room).toBe('notfound');
  expect(parseRoute('/projects/gaze-sketchpad/extra').room).toBe('notfound');
  expect(parseRoute('/cv').room).toBe('experience');
 });
 it('round trips every valid room and project',()=>{
  for(const path of ['/','/cv','/profile','/contact','/projets','/projets/index','/projets/gallery','/projet/eyespy'])expect(routeFor(parseRoute(path))).toBe(path);
 });
 it('closes cases to projects and rooms to home',()=>{
  expect(closeRoute(parseRoute('/projet/terra'))).toBe('/projets');
  expect(closeRoute({...parseRoute('/projet/terra'),view:'gallery'})).toBe('/projets/gallery');
  expect(closeRoute(parseRoute('/contact'))).toBe('/');
 });
 it('clamps dragged windows inside the available desktop, including small screens',()=>{
  expect(windowBounds({x:-500,y:900},{width:680,height:480},{width:1440,height:900,top:49})).toEqual({x:8,y:412});
  expect(windowBounds({x:100,y:100},{width:680,height:480},{width:390,height:400,top:49})).toEqual({x:8,y:57});
 });
});
describe('display preferences',()=>{
 it('rejects malformed and unknown settings, preserving valid false values',()=>{
  expect(readPreferences('{"portraitCycle":false}').portraitCycle).toBe(false);
  expect(readPreferences('invalid')).toEqual({theme:'phosphor',crt:true,sound:true,portraitCycle:true});
  expect(readPreferences('{"theme":"neon","crt":false,"sound":false}')).toEqual({theme:'phosphor',crt:false,sound:false,portraitCycle:true});
  expect(readPreferences('{"theme":"missing","crt":"false","sound":null}')).toEqual({theme:'phosphor',crt:true,sound:true,portraitCycle:true});
 });
});
describe('boot input state machine',()=>{
 it('early input completes readiness but cannot enter on that same input',()=>{
  const b=bootInput(initialBoot,100);expect(b.phase).toBe('ready');
  expect(bootInput(b,449).phase).toBe('ready');expect(bootInput(b,450).phase).toBe('exiting');
 });
 it('completes seven diagnostic rows and refuses duplicate exit input',()=>{
  let b=initialBoot;for(let i=1;i<=8;i++)b=stepBoot(b,i*130);
  expect(b.phase).toBe('ready');expect(b.rows).toBe(7);
  const exit=bootInput(b,2000);expect(bootInput(exit,2001)).toEqual(exit);
 });
 it('waits for boot resources before its final diagnostic and readies on the next cadence',()=>{
  let b=initialBoot;for(let i=1;i<=9;i++)b=stepBoot(b,i*130,false);
  expect(b.rows).toBe(6);expect(b.phase).toBe('loading');
  b=stepBoot(b,1300,true);expect(b.rows).toBe(7);expect(b.phase).toBe('loading');
  b=stepBoot(b,1430,true);expect(b.phase).toBe('ready');expect(b.readyAt).toBe(1430);
 });
});
