export const scrollRanges=(height:number)=>{const h=Math.max(1,height);return {profileHeight:4*h,profileTravel:3*h,nextHeight:1.925*h,nextTravel:.925*h};};
export const scrollProgress=(offset:number,travel:number)=>Math.max(0,Math.min(1,offset/Math.max(1,travel)));
