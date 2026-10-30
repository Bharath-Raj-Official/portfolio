import {describe,it,expect} from 'vitest';
import {siteUrl,internalPath,initialBrowserPath} from '../lib/hosting';
import {staticRoutes} from '../lib/static-routes';
import {projectSlugs} from '../content/projects';
import {parseRoute} from '../lib/state';

describe('GitHub Pages hosting',()=>{
 it('prefixes local URLs once and preserves external destinations',()=>{
  expect(siteUrl('/')).toBe('/portfolio/');
  expect(siteUrl('/projects')).toBe('/portfolio/projects/');
  expect(siteUrl('/portraits/welcome.png')).toBe('/portfolio/portraits/welcome.png');
  expect(siteUrl('/portfolio/projects/')).toBe('/portfolio/projects/');
  expect(siteUrl('/projets?vue=gallery#top')).toBe('/portfolio/projets/?vue=gallery#top');
  for(const url of ['https://example.com','mailto:hello@example.com','#top','//example.com/a'])expect(siteUrl(url)).toBe(url);
 });
 it('removes only the exact deployment prefix',()=>{
  expect(internalPath('/portfolio')).toBe('/');
  expect(internalPath('/portfolio/projets/?vue=index')).toBe('/projets/?vue=index');
  expect(internalPath('/portfolio-other/projects')).toBe('/portfolio-other/projects');
  expect(parseRoute(internalPath('/portfolio/projects/terra/')).project).toBe('terra');
 });
 it('hydrates query views only for the matching prerendered route',()=>{
  expect(initialBrowserPath('/projets','/portfolio/projets/','?vue=gallery')).toBe('/projets/?vue=gallery');
  expect(parseRoute(initialBrowserPath('/projets','/portfolio/projets/','?vue=index')).view).toBe('index');
  expect(initialBrowserPath('/404','/portfolio/missing/','?vue=gallery')).toBe('/404');
 });
 it('enumerates all valid pages and both project URL forms',()=>{
  expect(staticRoutes).toHaveLength(23);
  expect(new Set(staticRoutes).size).toBe(staticRoutes.length);
  for(const route of ['/','/projects','/projets','/projets/index','/projets/gallery','/resume','/cv','/profile','/contact'])expect(staticRoutes).toContain(route);
  for(const slug of projectSlugs)for(const prefix of ['/projet/','/projects/'])expect(staticRoutes).toContain(prefix+slug);
  for(const route of staticRoutes)expect(parseRoute(route).room).not.toBe('notfound');
 });
});
