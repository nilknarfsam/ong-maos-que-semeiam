/*
 * Tela de projetos: gera os cartões a partir dos dados com os templates
 * e guarda o projeto escolhido no botão "Quero ajudar este projeto".
 */
import { projetos } from '../dados/projetos.js';
import { renderizarLista, cartaoProjeto } from '../modules/templates.js';
import { salvar } from '../modules/armazenamento.js';

export function iniciarProjetos(app) {
    const container = app.querySelector('#lista-projetos');
    if (container) renderizarLista(container, projetos, cartaoProjeto);
}

export function registrarEventosProjetos(app) {
    app.addEventListener('click', (evento) => {
        const botao = evento.target.closest('[data-acao="ajudar"]');
        if (botao) salvar('projeto-interesse', botao.dataset.projeto);
        // o href="#/cadastro" continua: o roteador abre a tela de cadastro
    });
}
