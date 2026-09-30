/*
 * Menu hambúrguer: o JS só alterna o estado; toda a aparência está no CSS da EP2.
 * Também marca o link da tela atual com aria-current="page".
 */
let botao;
let menu;

function definirAberto(aberto) {
    menu.classList.toggle('menu--aberto', aberto);
    botao.setAttribute('aria-expanded', String(aberto));
    botao.querySelector('.menu__texto').textContent = aberto ? 'Fechar' : 'Menu';
}

export function fecharMenu() {
    if (menu && menu.classList.contains('menu--aberto')) definirAberto(false);
}

export function iniciarMenu() {
    botao = document.querySelector('.menu__botao');
    menu = document.querySelector('.menu');
    if (!botao || !menu) return;

    botao.addEventListener('click', () => {
        definirAberto(botao.getAttribute('aria-expanded') !== 'true');
    });

    menu.querySelectorAll('.menu__item--submenu').forEach((item) => {
        item.addEventListener('focusout', (evento) => {
            if (!item.contains(evento.relatedTarget)) delete item.dataset.fechado;
        });
        item.addEventListener('pointerleave', () => delete item.dataset.fechado);
        item.addEventListener('keydown', (evento) => {
            if (evento.key === 'ArrowDown') {
                delete item.dataset.fechado;
                item.querySelector('.submenu a').focus();
                evento.preventDefault();
            }
        });
    });

    // Esc fecha o menu e devolve o foco ao botão
    document.addEventListener('keydown', (evento) => {
        if (evento.key === 'Escape') {
            const item = document.activeElement.closest('.menu__item--submenu');
            if (item && matchMedia('(min-width: 768px)').matches) {
                item.dataset.fechado = '';
                item.querySelector('a').focus();
            }
        }
        if (evento.key === 'Escape' && menu.classList.contains('menu--aberto')) {
            definirAberto(false);
            botao.focus();
        }
    });
}

// Move o aria-current="page" para os links (menu e rodapé) que apontam para a rota atual
export function marcarMenuAtivo(nome) {
    document.querySelectorAll('.menu__link, .rodape__lista a').forEach((link) => {
        const ativo = link.getAttribute('href') === '#/' + nome;
        if (ativo) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
    });
}
