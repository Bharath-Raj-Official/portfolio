import {describe,it,expect} from 'vitest';
import {parseRoute,overlayBackground} from '../lib/state';
describe('desktop window background',()=>{it('keeps the previous room while a contact window opens',()=>{const gallery=parseRoute('/projets/gallery');expect(overlayBackground(gallery,gallery,parseRoute('/contact'))).toEqual(gallery);});it('replaces the background on ordinary room navigation',()=>{const home=parseRoute('/'),profile=parseRoute('/profile');expect(overlayBackground(parseRoute('/contact'),home,profile)).toEqual(profile);});});
