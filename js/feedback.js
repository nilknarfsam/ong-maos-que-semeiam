/* Componentes de feedback: modal, toast e alertas que podem ser fechados. */
(function () {
    // ---------- Modal (<dialog>) ----------
    document.querySelectorAll('[data-abrir-modal]').forEach(function (gatilho) {
        const modal = document.getElementById(gatilho.dataset.abrirModal);
        if (!modal) return;
        gatilho.addEventListener('click', function () {
            modal.showModal();
        });
    });
    document.querySelectorAll('[data-fechar-modal]').forEach(function (botao) {
        botao.addEventListener('click', function () {
            botao.closest('dialog').close();
        });
    });
    // Clique no fundo escuro (fora da caixa) também fecha
    document.querySelectorAll('dialog.modal').forEach(function (modal) {
        modal.addEventListener('click', function (evento) {
            if (evento.target === modal) modal.close();
        });
    });

    // ---------- Toast ----------
    const area = document.querySelector('.toast-area');
    const icones = {
        sucesso: '<path d="M5 12l5 5L20 7"/>',
        aviso: '<path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/>'
    };

    function fecharToast(toast) {
        toast.classList.add('toast--saindo');
        toast.addEventListener('animationend', function () { toast.remove(); }, { once: true });
        setTimeout(function () { toast.remove(); }, 400);
    }

    window.mostrarToast = function (mensagem, tipo) {
        if (!area) return;
        tipo = tipo || 'sucesso';
        const toast = document.createElement('div');
        toast.className = 'toast toast--' + tipo;
        toast.innerHTML =
            '<svg class="toast__icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + icones[tipo] + '</svg>' +
            '<p class="toast__texto"></p>' +
            '<button type="button" class="botao-icone" aria-label="Fechar notificação">' +
            '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
        toast.querySelector('.toast__texto').textContent = mensagem;
        toast.querySelector('button').addEventListener('click', function () { fecharToast(toast); });
        area.appendChild(toast);
        setTimeout(function () { if (toast.isConnected) fecharToast(toast); }, 5000);
    };

    document.querySelectorAll('[data-toast]').forEach(function (gatilho) {
        gatilho.addEventListener('click', function () {
            window.mostrarToast(gatilho.dataset.toast, gatilho.dataset.toastTipo);
        });
    });

    // ---------- Alertas com botão fechar ----------
    document.querySelectorAll('[data-fechar-alerta]').forEach(function (botao) {
        botao.addEventListener('click', function () {
            botao.closest('.alerta').hidden = true;
        });
    });
})();
