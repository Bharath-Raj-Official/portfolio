import {it,expect} from 'vitest';
import {timelineStops,clampTimeline,nearestTimelineStep,timelineWheel,timelineVelocity,timelineHashStep,timelineKeyStep} from '../lib/experience';

it('centres actual measured cards and clamps continuous travel to its endpoints',()=>{
 const stops=timelineStops(1440,[331,1123,1914]);expect(stops).toEqual([389,-403,-1194]);
 expect(clampTimeline(900,stops)).toBe(389);expect(clampTimeline(-2000,stops)).toBe(-1194);
 expect(nearestTimelineStep(-400,stops)).toBe(1);expect(nearestTimelineStep(-7,stops)).toBe(0);
});
it('uses the dominant wheel axis and source line mode; drag velocity is bounded at one millisecond',()=>{
 expect(timelineWheel(25,10,0)).toBe(25);expect(timelineWheel(-10,-20,1)).toBe(-320);
 expect(timelineWheel(10,-10,2)).toBe(-10);expect(timelineVelocity(20,10,1)).toBeCloseTo(1.8);
 expect(timelineVelocity(2,0,0)).toBeCloseTo(1.6);
});
it('resolves narrative fragments and throttles repeated keys without wrapping',()=>{
 const ids=['bsc2023','tech2026','next2026'];expect(timelineHashStep('#tech2026',ids)).toBe(1);expect(timelineHashStep('#missing',ids)).toBe(0);
 expect(timelineKeyStep('ArrowRight',0,3,false,0,10)).toBe(1);
 expect(timelineKeyStep('ArrowDown',1,3,true,100,339)).toBeNull();
 expect(timelineKeyStep('ArrowDown',1,3,true,100,340)).toBe(2);
 expect(timelineKeyStep('ArrowRight',2,3,false,0,1)).toBeNull();
 expect(timelineKeyStep('Home',2,3,true,100,101)).toBe(0);expect(timelineKeyStep('End',0,3,false,0,1)).toBe(2);
});
