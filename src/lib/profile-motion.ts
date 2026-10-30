export type ProfilePose={pair:number;mix:number};
/** Adjacent morphs reach their shared endpoint before changing geometry pools. */
export function advanceProfilePose(current:ProfilePose,requested:ProfilePose,delta:number,reduced:boolean){
 if(current.pair<0)return{pair:requested.pair,mix:reduced?Math.round(requested.mix):requested.mix,changed:true};
 let pair=current.pair,mix=current.mix,target=requested.mix,changed=false;
 if(requested.pair!==pair){const edge=requested.pair>pair?1:0;target=edge;if(mix===edge||Math.abs(requested.pair-pair)>1||reduced){pair=requested.pair;mix=1-edge;target=requested.mix;changed=true;}}
 if(reduced)return{pair,mix:Math.round(target),changed};
 const dt=Math.max(0,Math.min(.1,delta)),step=(target-mix)*(1-Math.exp(-dt*14));mix+=Math.max(-2.6*dt,Math.min(2.6*dt,step));if(Math.abs(target-mix)<.002)mix=target;
 return{pair,mix,changed};
}
