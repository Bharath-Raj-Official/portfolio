import {it,expect} from 'vitest';
import {caseEntryMode} from '../lib/case-entry';
it('commits a completed next-cover handoff without replaying an entry fade',()=>{
 expect(caseEntryMode('case','case','next',false)).toBe('next');
 expect(caseEntryMode('projects','case',undefined,false)).toBe('spatial');
 expect(caseEntryMode('case','case',undefined,true)).toBe('fade');
 expect(caseEntryMode('home','case','next',false)).toBe('fade');
 expect(caseEntryMode('case','home','next',false)).toBe('fade');
});
