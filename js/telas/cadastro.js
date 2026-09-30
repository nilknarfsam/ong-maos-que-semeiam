/*
 * Tela de cadastro: só junta as peças.
 * - validacao.js diz se o dado está certo;
 * - armazenamento.js guarda e lê do localStorage;
 * - templates.js desenha a lista de cadastros;
 * - feedback.js mostra o modal e o toast.
 *
 * iniciarCadastro(app): chamada pelo roteador toda vez que a view é aberta.
 * registrarEventosCadastro(app): chamada UMA vez pelo main.js (delegação no #app).
 */
import { validarCampo, validarFormulario, limparEstados, valorDoCampo } from '../modules/validacao.js';
import { ler, salvar, remover, limparTudo } from '../modules/armazenamento.js';
import { renderizarLista, itemCadastro } from '../modules/templates.js';
import { mostrarToast, abrirModal } from '../modules/feedback.js';
import { aplicarMascara } from '../modules/mascaras.js';
import { formatarData } from '../modules/datas.js';

const NAO_SALVAR_NO_RASCUNHO = ['cpf'];                          // dado sensível
const DEPENDEM_DO_TIPO = ['interesses', 'horas', 'frequencia', 'valor'];
const ATRASO_RASCUNHO = 400;                                       // ms sem digitar antes de gravar

const tocados = new WeakSet();
let esperaRascunho;

const formulario = () => document.getElementById('form-cadastro');

// ---------- Rascunho (ong:rascunho) ----------
function nomesDoFormulario(form) {
    const nomes = new Set();
    Array.from(form.elements).forEach((el) => {
        if (el.name && !NAO_SALVAR_NO_RASCUNHO.includes(el.name)) nomes.add(el.name);
    });
    return nomes;
}

function salvarRascunho(form) {
    const rascunho = {};
    nomesDoFormulario(form).forEach((nome) => {
        rascunho[nome] = valorDoCampo(form, nome);
    });
    salvar('rascunho', rascunho);
}

function restaurarRascunho(form) {
    const rascunho = ler('rascunho', null);
    if (!rascunho) return;
    Object.entries(rascunho).forEach(([nome, valor]) => {
        const campo = form.elements[nome];
        if (!campo || NAO_SALVAR_NO_RASCUNHO.includes(nome)) return;
        if (campo instanceof RadioNodeList && Array.isArray(valor)) {
            Array.from(campo).forEach((c) => { c.checked = valor.includes(c.value); });
        } else if (campo instanceof RadioNodeList) {
            campo.value = valor;
        } else if (campo.type === 'checkbox') {
            campo.checked = Boolean(valor);
        } else {
            campo.value = valor;
        }
    });
}

// ---------- Lista "Cadastros feitos neste navegador" (ong:cadastros) ----------
function atualizarLista() {
    const secao = document.getElementById('meus-cadastros');
    const lista = document.getElementById('lista-cadastros');
    if (!secao || !lista) return;
    const cadastros = ler('cadastros', []);
    secao.hidden = cadastros.length === 0;
    // mais recente primeiro
    renderizarLista(lista, cadastros.slice().reverse(), (c) => itemCadastro(c, formatarData(c.data)));
}

// ---------- Abertura da view ----------
export function iniciarCadastro() {
    const form = formulario();
    if (!form) return;
    form.noValidate = true;   // a partir daqui valem as regras e mensagens do validacao.js

    restaurarRascunho(form);

    // Projeto escolhido no botão "Quero ajudar este projeto"
    const projeto = ler('projeto-interesse', null);
    if (projeto) {
        const caixa = form.querySelector(`input[name="interesses"][value="${CSS.escape(projeto)}"]`);
        if (caixa) caixa.checked = true;
        remover('projeto-interesse');
        salvarRascunho(form);
    }

    atualizarLista();
}

// ---------- Eventos (registrados uma vez, com delegação no #app) ----------
function revalidarDependentes(form) {
    DEPENDEM_DO_TIPO.forEach((nome) => {
        const grupo = form.elements[nome];
        const campo = grupo instanceof RadioNodeList ? grupo[0] : grupo;
        if (campo && (tocados.has(campo) || form.classList.contains('formulario--enviado'))) {
            validarCampo(campo);
        }
    });
}

function primeiroDoGrupo(campo) {
    const grupo = campo.form.elements[campo.name];
    return grupo instanceof RadioNodeList ? grupo[0] : campo;
}

function aoDigitar(evento) {
    const campo = evento.target;
    const form = campo.form;
    if (!form || form.id !== 'form-cadastro' || !campo.name) return;

    if (campo.dataset.mascara) aplicarMascara(campo);

    const referencia = primeiroDoGrupo(campo);
    if (tocados.has(referencia) || form.classList.contains('formulario--enviado')) validarCampo(referencia);
    if (campo.name === 'tipo') revalidarDependentes(form);

    clearTimeout(esperaRascunho);
    esperaRascunho = setTimeout(() => salvarRascunho(form), ATRASO_RASCUNHO);
}

function aoSairDoCampo(evento) {
    const campo = evento.target;
    if (!campo.form || campo.form.id !== 'form-cadastro' || !campo.name) return;
    const referencia = primeiroDoGrupo(campo);
    tocados.add(referencia);
    validarCampo(referencia);
}

function aoEnviar(evento) {
    const form = evento.target;
    if (form.id !== 'form-cadastro') return;
    evento.preventDefault();   // sem back-end: a SPA controla o envio

    const alerta = document.getElementById('erros-formulario');
    const alertaTexto = document.getElementById('erros-formulario-texto');
    const invalidos = validarFormulario(form);

    if (invalidos.length > 0) {
        form.classList.add('formulario--enviado');
        alertaTexto.textContent = invalidos.length === 1
            ? 'Confira o campo destacado: 1 campo precisa de correção.'
            : 'Confira os campos destacados: ' + invalidos.length + ' campos precisam de correção.';
        alerta.hidden = false;
        alerta.scrollIntoView({ block: 'center' });
        invalidos[0].focus({ preventScroll: true });
        return;   // nada é salvo enquanto houver erro
    }

    alerta.hidden = true;
    const cadastro = {
        nome: valorDoCampo(form, 'nome'),
        email: valorDoCampo(form, 'email'),
        tipo: valorDoCampo(form, 'tipo'),
        interesses: valorDoCampo(form, 'interesses'),
        valor: valorDoCampo(form, 'valor') ? Number(valorDoCampo(form, 'valor')) : null,
        data: new Date().toISOString()
    };
    const cadastros = ler('cadastros', []);
    cadastros.push(cadastro);
    const salvou = salvar('cadastros', cadastros);
    clearTimeout(esperaRascunho);
    remover('rascunho');

    document.getElementById('modal-cadastro-nome').textContent = cadastro.nome.split(/\s+/)[0];
    abrirModal(document.getElementById('modal-cadastro'));
    if (!salvou) mostrarToast('Seu navegador não permitiu guardar o cadastro neste aparelho.', 'aviso');
}

function aoLimpar(evento) {
    const form = evento.target;
    if (form.id !== 'form-cadastro') return;
    document.getElementById('erros-formulario').hidden = true;
    form.classList.remove('formulario--enviado');
    limparEstados(form);
    clearTimeout(esperaRascunho);
    remover('rascunho');
}

function aoFecharModal(evento) {
    if (evento.target.id !== 'modal-cadastro') return;
    formulario()?.reset();
    atualizarLista();
    mostrarToast('Cadastro enviado com sucesso!', 'sucesso');
}

function aoClicar(evento) {
    const botao = evento.target.closest('[data-acao="limpar-dados"]');
    if (!botao) return;
    limparTudo();
    atualizarLista();
    // a seção sumiu junto com o botão: o foco vai para o título seguinte
    const titulo = document.getElementById('titulo-duvidas');
    titulo.setAttribute('tabindex', '-1');
    titulo.focus();
    mostrarToast('Seus dados foram apagados deste navegador.', 'sucesso');
}

export function registrarEventosCadastro(app) {
    app.addEventListener('input', aoDigitar);
    app.addEventListener('focusout', aoSairDoCampo);
    app.addEventListener('submit', aoEnviar);
    app.addEventListener('reset', aoLimpar);
    app.addEventListener('click', aoClicar);
    // "close" do <dialog> não borbulha: por isso o listener usa a fase de captura
    app.addEventListener('close', aoFecharModal, true);
}
