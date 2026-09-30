/*
 * Roteador da SPA (navegação por hash: #/inicio, #/projetos, #/cadastro).
 * Não importa as telas: recebe o mapa de rotas pronto do main.js.
 * Rota: { view: 'html/x.html', titulo: 'X', iniciar: funcaoDaTela }
 *
 * Correções feitas nos testes da Etapa 4 (ver EP3 - Diário de Bordo):
 * - resposta.ok conferido: uma view inexistente (404) não injeta a página de erro do servidor;
 * - try/catch no fetch: sem conexão, aparece uma tela de aviso com "Tentar de novo";
 * - contador de navegação: uma resposta lenta que chega atrasada é descartada;
 * - hashes que não começam com "#/" (ex.: o link "Pular para o conteúdo") não são rotas;
 * - rota inexistente vira #/inicio, para a URL e o menu ativo baterem com a tela.
 */
import { marcarMenuAtivo, fecharMenu } from './menu.js';
import { telaErro } from './templates.js';

let rotas = {};
let app;
const cache = new Map();
let navegacaoAtual = 0;

async function carregarView(caminho) {
    if (!cache.has(caminho)) {
        const resposta = await fetch(caminho);
        if (!resposta.ok) throw new Error('HTTP ' + resposta.status + ' em ' + caminho);
        cache.set(caminho, await resposta.text());
    }
    return cache.get(caminho);
}

async function renderizar() {
    let [nome, secao] = location.hash.slice(2).split('/');
    if (!nome || !rotas[nome]) {
        nome = 'inicio';
        secao = undefined;
        history.replaceState(null, '', '#/inicio');
    }
    const rota = rotas[nome];
    const esta = ++navegacaoAtual;
    app.setAttribute('aria-busy', 'true');

    let html;
    let titulo = rota.titulo;
    let sucesso = true;
    try {
        html = await carregarView(rota.view);
    } catch (erro) {
        console.error('[roteador]', erro);
        sucesso = false;
        titulo = 'Página indisponível';
        html = telaErro(titulo, navigator.onLine
            ? 'O conteúdo desta tela não foi encontrado. Tente de novo em alguns instantes.'
            : 'Parece que você está sem conexão com a internet. Confira a rede e tente de novo.');
    }

    // Outra navegação começou enquanto esta esperava: descarta o resultado atrasado
    if (esta !== navegacaoAtual) return;

    const molde = document.createElement('template');
    molde.innerHTML = html;
    app.replaceChildren(molde.content);
    app.removeAttribute('aria-busy');
    document.title = 'Instituto Mãos que Semeiam | ' + titulo;
    marcarMenuAtivo(sucesso ? nome : '');

    if (sucesso && rota.iniciar) {
        try {
            rota.iniciar(app);
        } catch (erro) {
            console.error('[roteador] erro ao iniciar a tela ' + nome, erro);
        }
    }

    const alvo = (secao && document.getElementById(secao)) || app.querySelector('h1');
    alvo.setAttribute('tabindex', '-1');
    alvo.focus();
}

export function iniciarRoteador(mapaDeRotas) {
    rotas = mapaDeRotas;
    app = document.getElementById('app');

    window.addEventListener('hashchange', () => {
        // Âncora comum dentro da página (ex.: #app do link "Pular para o conteúdo"): não é rota
        if (!location.hash.startsWith('#/')) return;
        fecharMenu();
        renderizar();
    });
    window.addEventListener('DOMContentLoaded', renderizar);

    // Botão "Tentar de novo" da tela de erro
    app.addEventListener('click', (evento) => {
        if (evento.target.closest('[data-acao="recarregar-view"]')) renderizar();
    });
}
