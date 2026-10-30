'use client';
import {useEffect} from 'react';
import {PerfHeadless,getPerf} from 'r3f-perf';
export default function Profiler(){useEffect(()=>{const timer=setInterval(()=>{const report=getPerf();(window as unknown as {__eddyProfiler:unknown}).__eddyProfiler={source:'r3f-perf/PerfHeadless',fps:report.log?.fps??null,cpuMs:report.log?.cpu??null,gpuMs:report.log?.gpu??null};},500);return()=>clearInterval(timer);},[]);return <PerfHeadless/>;}
