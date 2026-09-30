/*
 * Ponto de entrada da SPA (carregado pelo index.html com type="module").
 * É o único arquivo que conhece todos os módulos: monta o mapa de rotas,
 * registra os eventos UMA vez (delegação) e inicia o roteador.
 */
import { iniciarRoteador } from './modules/roteador.js';
import { iniciarContraste } from './modules/contraste.js';
import { iniciarMenu } from './modules/menu.js';
import { registrarEventosFeedback } from './modules/feedback.js';
import { iniciarProjetos, registrarEventosProjetos } from './telas/projetos.js';
import { iniciarCadastro, registrarEventosCadastro } from './telas/cadastro.js';

const rotas = {
    inicio: { view: 'html/inicio.html', titulo: 'Início' },
    projetos: { view: 'html/projetos.html', titulo: 'Projetos', iniciar: iniciarProjetos },
    cadastro: { view: 'html/cadastro.html', titulo: 'Cadastro', iniciar: iniciarCadastro }
};

const app = document.getElementById('app');

iniciarContraste();
iniciarMenu();
registrarEventosFeedback();
registrarEventosProjetos(app);
registrarEventosCadastro(app);
iniciarRoteador(rotas);
