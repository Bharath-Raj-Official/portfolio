import {projectSlugs} from '../content/projects';

export const staticRoutes=[
 '/','/projects','/projets','/projets/index','/projets/gallery',
 '/resume','/cv','/profile','/contact',
 ...projectSlugs.flatMap(slug=>['/projet/'+slug,'/projects/'+slug]),
];
