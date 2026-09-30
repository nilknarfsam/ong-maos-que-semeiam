/*
 * Templates: funções PURAS que recebem dados e devolvem HTML (Template Literals).
 * Camada base: não tocam no DOM, não gravam dados e não registram eventos.
 * Quem injeta o resultado na página é a tela (js/telas/...).
 */

// Troca caracteres especiais por entidades. Todo texto vindo de dados passa aqui,
// inclusive o que a pessoa digitou no formulário (evita injeção de HTML).
export const escapar = (texto) => String(texto ?? '')
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

const ICONES_ALERTA = {
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 11v6M12 7.5v.5"/>',
    sucesso: '<circle cx="12" cy="12" r="10"/><path d="M7.5 12.5l3 3 6-6.5"/>',
    aviso: '<path d="M10.3 3.9L1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z"/><path d="M12 9v4M12 17v.5"/>',
    erro: '<circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/>'
};

const ICONES_TOAST = {
    sucesso: '<path d="M5 12l5 5L20 7"/>',
    aviso: '<path d="M12 8v5M12 16.5v.5"/><circle cx="12" cy="12" r="9"/>'
};

const ICONE_FECHAR = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';

export const badge = (texto, tipo) =>
    `<li class="badge badge--${tipo}">${escapar(texto)}</li>`;

// Cartão de projeto (mesmas classes BEM do Design System da EP2)
export const cartaoProjeto = (p) => `
<article class="cartao col-md-6 col-xl-3" id="${escapar(p.id)}">
    <div class="cartao__corpo">
        <h3>${escapar(p.titulo)}</h3>
        <figure class="cartao__midia">
            <picture>
                <source type="image/webp" srcset="imagens/${escapar(p.imagem)}.webp">
                <img src="imagens/${escapar(p.imagem)}.png" alt="${escapar(p.alt)}" width="400" height="240" loading="lazy">
            </picture>
            <figcaption>${escapar(p.legenda)}</figcaption>
        </figure>
        <ul class="badges" aria-label="Categoria e status">
            ${badge(p.categoria.nome, p.categoria.tipo)}${badge(p.status.nome, p.status.tipo)}
        </ul>
        <p>${escapar(p.descricao)}</p>
        <dl class="ficha">
            <dt>Público</dt>
            <dd>${escapar(p.publico)}</dd>
            <dt>Quando</dt>
            <dd>${escapar(p.horario)}</dd>
        </dl>
        <h4>Como ajudar</h4>
        <ul>
            <li><strong>Voluntário:</strong> ${escapar(p.voluntario)}</li>
            <li><strong>Doação:</strong> ${escapar(p.doacao)}</li>
        </ul>
    </div>
    <div class="cartao__acoes">
        <a class="botao botao--primario" href="#/cadastro" data-acao="ajudar" data-projeto="${escapar(p.id)}">Quero ajudar este projeto</a>
    </div>
</article>`;

// Alerta dentro da página. Erro usa role="alert" (anuncia na hora); os outros, role="status".
export const alerta = (tipo, titulo, texto, fechavel = false) => `
<div class="alerta alerta--${tipo}" role="${tipo === 'erro' ? 'alert' : 'status'}">
    <svg class="alerta__icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES_ALERTA[tipo]}</svg>
    <div class="alerta__conteudo">
        <p class="alerta__titulo">${escapar(titulo)}</p>
        <p>${escapar(texto)}</p>
    </div>
    ${fechavel ? `<button class="botao-icone" type="button" aria-label="Fechar alerta" data-acao="fechar-alerta">${ICONE_FECHAR}</button>` : ''}
</div>`;

// Toast (notificação que some sozinha)
export const toast = (mensagem, tipo = 'sucesso') => `
<div class="toast toast--${tipo}">
    <svg class="toast__icone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONES_TOAST[tipo] || ICONES_TOAST.sucesso}</svg>
    <p class="toast__texto">${escapar(mensagem)}</p>
    <button type="button" class="botao-icone" aria-label="Fechar notificação" data-acao="fechar-toast">${ICONE_FECHAR}</button>
</div>`;

const TIPOS = { voluntario: 'Voluntário', doador: 'Doador', ambos: 'Voluntário e doador' };
const TIPO_BADGE = { voluntario: 'educacao', doador: 'alimentacao', ambos: 'tecnologia' };

// Item da lista "Cadastros feitos neste navegador".
// A data já chega formatada (quem formata é o datas.js), então o template continua puro.
export const itemCadastro = (c, dataFormatada) => `
<li class="registro">
    <p class="registro__nome">${escapar(c.nome)}</p>
    <ul class="badges" aria-label="Tipo de colaboração">
        ${badge(TIPOS[c.tipo] || c.tipo, TIPO_BADGE[c.tipo] || 'neutro')}
    </ul>
    <p class="registro__data">Enviado em <time datetime="${escapar(c.data)}">${escapar(dataFormatada)}</time></p>
</li>`;

// Tela de erro do roteador (view não encontrada ou sem conexão)
export const telaErro = (titulo, texto) => `
<div class="secao">
    <div class="container">
        <h1>${escapar(titulo)}</h1>
        ${alerta('aviso', 'Não foi possível abrir esta página', texto)}
        <p class="grupo-botoes">
            <button class="botao botao--primario" type="button" data-acao="recarregar-view">Tentar de novo</button>
            <a class="botao botao--contorno" href="#/inicio">Voltar ao início</a>
        </p>
    </div>
</div>`;

// Monta uma lista inteira com map() + join() e injeta de uma vez só
export function renderizarLista(container, itens, template) {
    container.innerHTML = itens.map(template).join('');
}
