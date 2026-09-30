import { readdir, readFile, writeFile, mkdir, copyFile } from 'node:fs/promises';
import { extname, dirname, join } from 'node:path';
import { transform } from 'esbuild';
import { minify } from 'html-minifier-terser';
const roots = ['index.html', 'projetos.html', 'cadastro.html', 'design-system.html', 'html', 'css', 'js', 'imagens'];
const files = [];
async function walk(path) {
    const entries = await readdir(path, { withFileTypes: true });
    for (const e of entries) e.isDirectory() ? await walk(join(path, e.name)) : files.push(join(path, e.name));
}
for (const path of roots) path.includes('.') ? files.push(path) : await walk(path);
const rows = [];
for (const file of files.sort()) {
    const target = join('dist', file);
    await mkdir(dirname(target), { recursive: true });
    const source = await readFile(file);
    const ext = extname(file);
    let output = source;
    if (ext === '.html') output = Buffer.from(await minify(source.toString(), { collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true }));
    if (ext === '.css' || (ext === '.js' && !file.includes('vendor'))) {
        output = Buffer.from((await transform(source.toString(), { loader: ext.slice(1), minify: true, target: 'es2020', legalComments: 'inline' })).code);
    }
    await writeFile(target, output);
    rows.push({ file: file.replaceAll('\\', '/'), before: source.length, after: output.length, reduction: +(100 * (1 - output.length / source.length)).toFixed(2) });
}
await writeFile('dist/.nojekyll', '');
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
await writeFile('dist/version.json', JSON.stringify({ version: pkg.version }));
await mkdir('reports', { recursive: true });
const groups = {};
for (const ext of ['.html', '.css', '.js']) {
    const entries = rows.filter(r => r.file.endsWith(ext));
    const before = entries.reduce((n,r) => n+r.before, 0), after = entries.reduce((n,r) => n+r.after, 0);
    groups[ext] = { before, after, reduction: +(100*(1-after/before)).toFixed(2) };
}
await writeFile('reports/sizes.json', JSON.stringify({ method: 'Mesmos arquivos-fonte e caminhos em dist; bytes sem compressão HTTP. Vendor preservado. Não mede tempo de carregamento.', groups, files: rows }, null, 2));
console.log(groups);
