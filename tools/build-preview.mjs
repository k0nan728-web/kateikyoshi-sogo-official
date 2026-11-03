import {cp,mkdir,readdir,rm} from 'node:fs/promises';
import path from 'node:path';
const root=process.cwd(),dist=path.join(root,'dist');
await rm(dist,{recursive:true,force:true});await mkdir(dist);
for(const entry of await readdir(root,{withFileTypes:true})){
 if(entry.name.startsWith('.')||['dist','tools','docs','functions'].includes(entry.name))continue;
 if(entry.isFile()&&!/\.(html|css|js|json|xml|svg|png|jpg|jpeg|avif|webp|mp4)$/i.test(entry.name)&&entry.name!=='_headers')continue;
 await cp(path.join(root,entry.name),path.join(dist,entry.name),{recursive:true});
}
console.log('Static preview assembled in dist/; production Functions are unchanged.');
