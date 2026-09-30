import { spawnSync } from 'node:child_process';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
const files = ['dist/index.html','dist/projetos.html','dist/cadastro.html','dist/design-system.html','dist/html/design-system.html'];
for (const file of await readdir('reports/html')) if(file.endsWith('.html')) files.push('reports/html/'+file);
const result = spawnSync('java',['-jar','node_modules/vnu-jar/build/dist/vnu.jar','--errors-only',...files],{encoding:'utf8'});
await mkdir('reports',{recursive:true});
await writeFile('reports/nu.txt',(result.stdout||'')+(result.stderr||'')+(result.status===0 ? '\nNu: zero erros nos documentos e nas três views renderizadas.\n' : ''));
console.log(result.stdout, result.stderr);if(result.error) console.error(result.error);process.exit(result.status ?? 1);
