import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mkdir, writeFile } from 'node:fs/promises';
async function open(page, route) {
 await page.goto('./#/' + route);
 await expect(page.locator('#app h1')).toHaveCount(1);
 await expect(page.locator('#app')).not.toHaveAttribute('aria-busy','true');
}
for (const width of [320,390,768,1280]) for (const theme of ['padrao','alto']) {
 test(`rotas, axe e responsividade ${width} ${theme}`, async ({page}) => {
  await page.setViewportSize({width,height:900});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  for (const route of ['inicio','projetos','cadastro']) {
   await open(page,route);
   if(theme==='alto' && await page.locator('button[data-contraste]').getAttribute('aria-pressed')!=='true') await page.locator('button[data-contraste]').click();
   await expect(page.locator('html')).toHaveAttribute('data-contraste',theme);
   expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
   const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
   expect(result.violations,JSON.stringify(result.violations)).toEqual([]);
   expect(await page.locator('img').evaluateAll(imgs=>imgs.filter(i=>i.complete && !i.naturalWidth).map(i=>i.src))).toEqual([]);
   if([390,1280].includes(width)) {
    await mkdir('reports/capturas',{recursive:true});
    await page.screenshot({path:`reports/capturas/${route}-${width}-${theme}.png`,fullPage:true});
   }
   if(width===1280 && theme==='padrao') {
    await mkdir('reports/html',{recursive:true});
    await writeFile(`reports/html/${route}.html`,await page.content());
   }
  }
  expect(errors).toEqual([]);
 });
}
test('teclado móvel, contraste persistente, atalho e foco de seção',async({page})=>{
 await page.setViewportSize({width:390,height:844});await open(page,'inicio');
 await page.locator('.menu__botao').focus();await page.keyboard.press('Enter');
 await expect(page.locator('.menu__botao')).toHaveAttribute('aria-expanded','true');
 await expect(page.locator('.menu__lista')).toBeVisible();await page.keyboard.press('Tab');await expect(page.locator('.menu__lista a').first()).toBeFocused();
 await page.keyboard.press('Escape');await expect(page.locator('.menu__botao')).toBeFocused();
 await expect(page.locator('.menu__botao')).toHaveAttribute('aria-expanded','false');
 await page.locator('button[data-contraste]').focus();await page.keyboard.press('Space');
 await expect(page.locator('button[data-contraste]')).toHaveAttribute('aria-pressed','true');
 expect(await page.locator('button[data-contraste]').evaluate(el=>getComputedStyle(el).outlineStyle)).not.toBe('none');
 await page.reload();await expect(page.locator('button[data-contraste]')).toHaveAttribute('aria-pressed','true');
 await page.locator('.pular-link').focus();await page.keyboard.press('Enter');await expect(page.locator('#app')).toBeFocused();
 await page.goto('./#/projetos/horta');await expect(page.locator('#horta')).toBeFocused();
});
test('submenu desktop: Tab, Escape e reabertura',async({page})=>{
 await open(page,'inicio');await page.locator('.menu__item--submenu > a').focus();await expect(page.locator('.submenu')).toBeVisible();await page.keyboard.press('Tab');
 await expect(page.locator('.submenu a').first()).toBeFocused();await page.keyboard.press('Escape');
 await expect(page.locator('.menu__item--submenu > a')).toBeFocused();await expect(page.locator('.submenu')).not.toBeVisible();
 await page.keyboard.press('ArrowDown');await expect(page.locator('.submenu a').first()).toBeFocused();
});
async function fillForm(page) {
 await page.locator('#tipo-voluntario').check();
 for(const [id,value] of Object.entries({nome:'Pessoa Teste',cpf:'52998224725',nascimento:'2000-01-01',email:'teste@example.org',telefone:'92999999999',cep:'69000000',logradouro:'Rua Teste',numero:'123',bairro:'Centro',horas:'4'})) await page.locator('#'+id).fill(value);
 await page.locator('#int-horta').check();await page.locator('#lgpd').check();
}
test('formulário: erros, rascunho, envio, modal, Day.js, persistência e limpeza',async({page})=>{
 await open(page,'cadastro');await page.locator('[type=submit]').click();
 await expect(page.locator('#erros-formulario')).toBeVisible();await expect(page.locator('#tipo-voluntario')).toBeFocused();
 await expect(page.locator('#nome')).toHaveAttribute('aria-invalid','true');await page.locator('#nome').fill('Pessoa Teste');
 await expect.poll(()=>page.evaluate(()=>JSON.parse(localStorage.getItem('ong:rascunho')||'{}').nome)).toBe('Pessoa Teste');
 await page.reload();await expect(page.locator('#nome')).toHaveValue('Pessoa Teste');await fillForm(page);
 await page.locator('[type=submit]').focus();await page.keyboard.press('Enter');await expect(page.locator('#modal-cadastro')).toBeVisible();
 for(let n=0;n<5;n++) await page.keyboard.press('Tab');
 expect(await page.evaluate(()=>document.activeElement.closest('dialog')!==null)).toBe(true);
 await page.keyboard.press('Escape');await expect(page.locator('#modal-cadastro')).not.toBeVisible();
 await expect(page.locator('[type=submit]')).toBeFocused();await expect(page.locator('#lista-cadastros')).toContainText('Pessoa Teste');
 await expect(page.locator('.registro__data')).toContainText(' de ');expect(await page.evaluate(()=>typeof window.dayjs)).toBe('function');
 await page.reload();await expect(page.locator('#lista-cadastros')).toContainText('Pessoa Teste');
 await page.locator('[data-acao="limpar-dados"]').click();await expect(page.locator('#meus-cadastros')).not.toBeVisible();await expect(page.locator('#titulo-duvidas')).toBeFocused();
});
test('rotas, histórico, rota inválida, erro HTTP e recuperação',async({page})=>{
 await open(page,'inicio');await page.locator('.menu__lista > li > a[href="#/projetos"]').click();
 await expect(page.locator('#lista-projetos .cartao')).toHaveCount(4);await page.goBack();await expect(page).toHaveTitle(/Início/);
 await page.goto('./#/inexistente');await expect(page).toHaveURL(/#\/inicio$/);
 await page.route('**/html/cadastro.html',r=>r.fulfill({status:404,body:'não encontrado'}));await page.goto('./#/cadastro');
 await expect(page.locator('#app')).toContainText('Página indisponível');await expect(page.locator('#app')).not.toHaveAttribute('aria-busy','true');
 await page.unroute('**/html/cadastro.html');await page.locator('[data-acao="recarregar-view"]').click();await expect(page.locator('#form-cadastro')).toBeVisible();
});
test('storage bloqueado e Day.js ausente',async({page})=>{
 await page.addInitScript(()=>Object.defineProperty(window,'localStorage',{get(){throw new DOMException('Bloqueado','SecurityError');}}));
 await page.route('**/js/vendor/**',r=>r.abort());await open(page,'cadastro');await page.locator('button[data-contraste]').click();
 await expect(page.locator('html')).toHaveAttribute('data-contraste','alto');await fillForm(page);await page.locator('[type=submit]').click();
 await expect(page.locator('#modal-cadastro')).toBeVisible();await expect(page.locator('.toast-area')).toContainText('não permitiu guardar');
});
test('guia visual e endereços antigos preservados',async({page})=>{
 for(const route of ['projetos','cadastro']) {
  await page.goto(`./${route}.html`);await expect(page).toHaveURL(new RegExp('#/'+route));await expect(page.locator('#app h1')).toHaveCount(1);
 }
 await page.goto('./design-system.html');await expect(page).toHaveURL(/html\/design-system.html/);await page.locator('button[data-contraste]').click();
 await expect(page.locator('html')).toHaveAttribute('data-contraste','alto');
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations,JSON.stringify(result.violations)).toEqual([]);
});

test('doador: valida dependências e mantém erro acessível nos dois temas',async({page})=>{
 await open(page,'cadastro');await fillForm(page);await page.locator('#tipo-doador').check();await page.locator('[type=submit]').click();
 await expect(page.locator('#freq-unica')).toBeFocused();await expect(page.locator('#erro-valor')).toBeVisible();
 for(const alto of [false,true]) {
  if(alto) await page.locator('button[data-contraste]').click();
  const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations,JSON.stringify(result.violations)).toEqual([]);
 }
 await page.locator('#freq-unica').check();await page.locator('#valor').fill('50');await page.locator('[type=submit]').click();
 await expect(page.locator('#modal-cadastro')).toBeVisible();
 const result=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();expect(result.violations,JSON.stringify(result.violations)).toEqual([]);
});
test('JSON corrompido, movimento reduzido e interesse do projeto',async({page})=>{
 await page.addInitScript(()=>{localStorage.setItem('ong:cadastros','{');localStorage.setItem('ong:rascunho','{');});
 await page.emulateMedia({reducedMotion:'reduce'});await open(page,'projetos');
 expect(await page.locator('html').evaluate(el=>getComputedStyle(el).scrollBehavior)).toBe('auto');
 await page.locator('#horta [data-projeto]').click();await expect(page.locator('#int-horta')).toBeChecked();
 await expect(page.locator('#meus-cadastros')).not.toBeVisible();
});
test('falha de rede na view não prende aria-busy',async({page})=>{
 await page.route('**/html/projetos.html',r=>r.abort());await page.goto('./#/projetos');
 await expect(page.locator('#app')).toContainText('Página indisponível');await expect(page.locator('#app')).not.toHaveAttribute('aria-busy','true');
 await page.unroute('**/html/projetos.html');await page.locator('[data-acao="recarregar-view"]').click();await expect(page.locator('#lista-projetos .cartao')).toHaveCount(4);
});
