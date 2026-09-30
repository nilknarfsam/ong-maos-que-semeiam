/* Menu hambúrguer: o JS só alterna o estado; toda a aparência está no CSS. */
(function () {
    const botao = document.querySelector('.menu__botao');
    const menu = document.querySelector('.menu');
    if (!botao || !menu) return;

    function definirAberto(aberto) {
        menu.classList.toggle('menu--aberto', aberto);
        botao.setAttribute('aria-expanded', String(aberto));
        botao.querySelector('.menu__texto').textContent = aberto ? 'Fechar' : 'Menu';
    }

    botao.addEventListener('click', function () {
        definirAberto(botao.getAttribute('aria-expanded') !== 'true');
    });

    // Esc fecha o menu e devolve o foco ao botão
    document.addEventListener('keydown', function (evento) {
        if (evento.key === 'Escape' && menu.classList.contains('menu--aberto')) {
            definirAberto(false);
            botao.focus();
        }
    });
})();
