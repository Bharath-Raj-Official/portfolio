import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root=fileURLToPath(new URL('../out/',import.meta.url));
const base='/portfolio',port=Number(process.env.PORT||3022);
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.webm':'video/webm','.woff2':'font/woff2','.ttf':'font/ttf','.bin':'application/octet-stream','.txt':'text/plain; charset=utf-8'};
await stat(path.join(root,'index.html')).catch(()=>{throw Error('Build the static site first: npm run build');});
const server=http.createServer(async(req,res)=>{
 try{
  const url=new URL(req.url,'http://127.0.0.1'),pathname=decodeURIComponent(url.pathname);
  if(pathname===base){res.writeHead(308,{Location:base+'/'+url.search});res.end();return;}
  if(!pathname.startsWith(base+'/')){res.writeHead(404);res.end('Not found');return;}
  const relative=pathname.slice(base.length+1),target=path.resolve(root,relative);
  if(target!==path.resolve(root)&&!target.startsWith(path.resolve(root)+path.sep)){res.writeHead(404);res.end('Not found');return;}
  let file=target,status=200;
  try{
   if((await stat(file)).isDirectory()){
    if(!pathname.endsWith('/')){res.writeHead(308,{Location:pathname+'/'+url.search});res.end();return;}
    file=path.join(file,'index.html');
   }
   await stat(file);
  }catch{file=path.join(root,'404.html');status=404;}
  const body=await readFile(file);
  res.writeHead(status,{'Content-Type':types[path.extname(file)]||'application/octet-stream','Content-Length':body.length,'Cache-Control':'no-store'});
  res.end(req.method==='HEAD'?undefined:body);
 }catch{res.writeHead(400);res.end('Bad request');}
});
server.listen(port,'127.0.0.1',()=>console.log(`Static preview: http://127.0.0.1:${port}${base}/`));
