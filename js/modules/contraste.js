import { ler, salvar } from './armazenamento.js';

export function iniciarContraste() {
    const botao = document.querySelector('button[data-contraste]');
    if (!botao) return;
    function aplicar(ativo) {
        document.documentElement.dataset.contraste = ativo ? 'alto' : 'padrao';
        botao.setAttribute('aria-pressed', String(ativo));
    }
    aplicar(ler('contraste', false) === true);
    botao.addEventListener('click', () => {
        const ativo = botao.getAttribute('aria-pressed') !== 'true';
        aplicar(ativo);
        salvar('contraste', ativo);
    });
    window.addEventListener('storage', () => aplicar(ler('contraste', false) === true));
}
