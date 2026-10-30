import {expect,it} from 'vitest';
import {parseRoute,routeFor,closeRoute,readPreferences} from '../lib/state';
import {projects} from '../content/projects';
import {curatedProjects,selectProjects} from '../lib/curation';

it('opens the readable overview while keeping legacy project destinations intact',()=>{
 expect(parseRoute('/projects').view).toBe('overview');
 expect(parseRoute('/projets').view).toBe('sphere');
 expect(parseRoute('/projets/index').view).toBe('index');
 expect(parseRoute('/projets/gallery').view).toBe('gallery');
 expect(parseRoute('/resume').room).toBe('resume');
 for(const path of ['/projects','/resume','/projets','/projets/gallery'])expect(routeFor(parseRoute(path))).toBe(path);
 expect(closeRoute({...parseRoute('/projet/gaze-sketchpad'),view:'overview'})).toBe('/projects');
});
it('normalises older palettes, preserves controls and validates calm preferences',()=>{
 expect(readPreferences('{"theme":"neon","crt":false,"sound":false,"portraitCycle":false,"calm":true}')).toEqual({theme:'phosphor',crt:false,sound:false,portraitCycle:false});
 expect(readPreferences('{"calm":"false"}')).not.toHaveProperty('calm');
 expect(readPreferences('null')).not.toHaveProperty('calm');
});
it('curates seven unique projects and keeps the selected order evidence-led',()=>{
 expect(curatedProjects).toHaveLength(7);
 expect(new Set(curatedProjects.map(p=>p.slug)).size).toBe(projects.length);
 expect(selectProjects('selected').map(p=>p.slug)).toEqual(['gaze-sketchpad','eyespy','cuneiform-reader']);
 expect(selectProjects('vision').map(p=>p.slug)).toEqual(['gaze-sketchpad','cuneiform-reader']);
 expect(selectProjects('data').map(p=>p.slug)).toEqual(['data-explorer','poetry-assistant']);
 expect(selectProjects('all')).toHaveLength(7);
 expect(selectProjects('invalid')).toHaveLength(0);
 expect(curatedProjects.filter(p=>p.repo===null).every(p=>p.evidenceLabel==='Architecture case')).toBe(true);
});
