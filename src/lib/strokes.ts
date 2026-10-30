export function decodeStrokes(buffer:ArrayBuffer){
 if(buffer.byteLength<8)throw Error('Truncated stroke header');const header=new DataView(buffer),version=header.getUint32(0,true),count=header.getUint32(4,true);
 if(version!==1||count>400000||buffer.byteLength!==8+count*20)throw Error('Unsupported or truncated portrait geometry');
 const packed=new Float32Array(buffer,8),data=new Float32Array(count*4),length=new Float32Array(count);
 for(let i=0;i<count;i++){for(let j=0;j<4;j++){const v=packed[i*5+j];if(!Number.isFinite(v))throw Error('Non-finite portrait geometry');data[i*4+j]=v;}const l=packed[i*5+4];if(!Number.isFinite(l)||l<0)throw Error('Invalid stroke length');length[i]=l;}
 return {data,length};
}
