import type {Pose} from '../content/presentation';
const order:Pose[]=['welcome','projects','experience','profile','contact'];
export const nextPortrait=(pose:Pose):Pose=>order[(order.indexOf(pose)+1)%order.length];
export const cycleAllowed=(enabled:boolean,reduced:boolean,blocked:boolean)=>enabled&&!reduced&&!blocked;
export const crtRequest=(requested:boolean)=>!requested;
