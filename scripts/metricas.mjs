import { readFile, readdir, stat, writeFile, mkdir } from 'node:fs/promises';
const luminance = hex => {
 const rgb = hex.match(/[a-f\d]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
 return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;
};
const pairs = [
 ['Texto padrão','#1F2A24','#FFFFFF'],['Texto secundário','#4A5A51','#FFFFFF'],
 ['Botão primário','#FFFFFF','#1F6F4A'],['Foco padrão','#8A4B00','#FFFFFF'],
 ['Borda funcional','#65776B','#FFFFFF'],['Texto alto contraste','#FFFFFF','#000000'],
 ['Link e foco alto contraste','#FFFF00','#000000'],['Texto alto em superfície','#FFFFFF','#1A1A1A'],
 ['Erro alto contraste','#FFB4AB','#000000'],['Sucesso alto contraste','#A8FFB0','#000000']
].map(([name,foreground,background])=>{const a=luminance(foreground),b=luminance(background);return {name,foreground,background,ratio:+((Math.max(a,b)+.05)/(Math.min(a,b)+.05)).toFixed(2)};});
const images=[];
for(const file of await readdir('imagens')) if(/\.(png|jpg)$/.test(file)) {
 const webp=file.replace(/\.(png|jpg)$/,'.webp');
 const before=(await stat('imagens/'+file)).size, after=(await stat('imagens/'+webp)).size;
 images.push({original:file,webp,before,after,reduction:+(100*(1-after/before)).toFixed(2)});
}
await mkdir('reports',{recursive:true});
await writeFile('reports/metricas.json',JSON.stringify({contrast:pairs,images,note:'Pares de tokens, não certificação WCAG completa. Imagens já otimizadas nas EPs anteriores, preservadas na EP IV. Bytes não equivalem a tempo.'},null,2));
console.log(JSON.stringify({contrast:pairs,images},null,2));
