/*
 * Envio do cadastro (melhoria progressiva).
 *
 * Sem JavaScript, o navegador valida o formulário sozinho (required, pattern...).
 * Com JavaScript:
 * - envio inválido: mostra um alerta com a quantidade de campos a corrigir,
 *   rola até ele e põe o foco no primeiro campo inválido;
 * - envio válido: como ainda não há back-end, abre o modal de confirmação
 *   com o primeiro nome digitado. Ao fechar, limpa o formulário e mostra um toast.
 */
(function () {
    const form = document.getElementById('form-cadastro');
    const alerta = document.getElementById('erros-formulario');
    const alertaTexto = document.getElementById('erros-formulario-texto');
    const modal = document.getElementById('modal-cadastro');
    const modalNome = document.getElementById('modal-cadastro-nome');
    if (!form || !alerta || !modal) return;

    // A validação passa a ser feita aqui, com mensagens próprias
    form.noValidate = true;

    // Campos inválidos, contando cada grupo de radio uma vez só
    function camposInvalidos() {
        const vistos = new Set();
        return Array.from(form.elements).filter(function (campo) {
            if (!campo.willValidate || campo.validity.valid) return false;
            const chave = campo.type === 'radio' ? 'radio:' + campo.name : campo;
            if (vistos.has(chave)) return false;
            vistos.add(chave);
            return true;
        });
    }

    form.addEventListener('submit', function (evento) {
        evento.preventDefault();   // não há back-end nesta etapa

        if (!form.checkValidity()) {
            const invalidos = camposInvalidos();
            const total = invalidos.length;
            form.classList.add('formulario--enviado');
            alertaTexto.textContent = total === 1
                ? 'Confira o campo destacado: 1 campo precisa de correção.'
                : 'Confira os campos destacados: ' + total + ' campos precisam de correção.';
            alerta.hidden = false;
            alerta.scrollIntoView({ block: 'center' });
            if (invalidos[0]) invalidos[0].focus({ preventScroll: true });
            return;
        }

        alerta.hidden = true;
        form.classList.remove('formulario--enviado');
        const primeiroNome = form.elements.nome.value.trim().split(/\s+/)[0];
        modalNome.textContent = primeiroNome;
        modal.showModal();
    });

    // Fechar o modal (botão, Esc ou clique no fundo): limpa o formulário e confirma com um toast
    modal.addEventListener('close', function () {
        form.reset();
        if (window.mostrarToast) window.mostrarToast('Cadastro enviado com sucesso!', 'sucesso');
    });

    // Botão "Limpar formulário": some com o alerta e com os destaques de erro
    form.addEventListener('reset', function () {
        alerta.hidden = true;
        form.classList.remove('formulario--enviado');
    });
})();
