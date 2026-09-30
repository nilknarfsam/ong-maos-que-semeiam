/*
 * Feedback: toast, modal e alertas que podem ser fechados.
 * Camada de interface: reaproveitável em qualquer tela (inclusive no guia de estilo).
 * Os eventos usam delegação: um listener em document atende elementos que
 * ainda nem existem quando a página carrega (views trocadas pelo roteador).
 */
import { toast } from './templates.js';

const DURACAO_TOAST = 5000;

function fecharToast(elemento) {
    if (!elemento.isConnected) return;
    elemento.classList.add('toast--saindo');
    elemento.addEventListener('animationend', () => elemento.remove(), { once: true });
    setTimeout(() => elemento.remove(), 400);   // reserva, caso a animação esteja desligada
}

export function mostrarToast(mensagem, tipo = 'sucesso') {
    const area = document.querySelector('.toast-area');
    if (!area) return;
    area.insertAdjacentHTML('beforeend', toast(mensagem, tipo));
    const novo = area.lastElementChild;
    setTimeout(() => fecharToast(novo), DURACAO_TOAST);
}

export function abrirModal(modal) {
    if (modal && !modal.open) modal.showModal();
}

export function registrarEventosFeedback() {
    document.addEventListener('click', (evento) => {
        const alvo = evento.target;

        const abrir = alvo.closest('[data-abrir-modal]');
        if (abrir) abrirModal(document.getElementById(abrir.dataset.abrirModal));

        const fechar = alvo.closest('[data-fechar-modal]');
        if (fechar) fechar.closest('dialog').close();

        // Clique no fundo escuro: o alvo é o próprio <dialog>, fora da caixa de conteúdo
        if (alvo.matches('dialog.modal')) alvo.close();

        const gatilhoToast = alvo.closest('[data-toast]');
        if (gatilhoToast) mostrarToast(gatilhoToast.dataset.toast, gatilhoToast.dataset.toastTipo);

        const fecharAviso = alvo.closest('[data-acao="fechar-toast"]');
        if (fecharAviso) fecharToast(fecharAviso.closest('.toast'));

        const fecharAlerta = alvo.closest('[data-acao="fechar-alerta"], [data-fechar-alerta]');
        if (fecharAlerta) fecharAlerta.closest('.alerta').hidden = true;
    });
}
