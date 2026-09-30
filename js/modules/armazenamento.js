/*
 * Armazenamento local (localStorage).
 * Camada base: é o ÚNICO arquivo que toca no localStorage. Não mexe no DOM.
 *
 * Chaves usadas (todas com o prefixo "ong:"):
 * - ong:cadastros          array com os cadastros enviados
 * - ong:rascunho           o que já foi digitado no formulário (sem o CPF)
 * - ong:projeto-interesse  id do projeto escolhido no botão "Quero ajudar este projeto"
 */
const PREFIXO = 'ong:';

// Grava qualquer valor convertendo para texto com JSON.stringify.
// Devolve false se o navegador bloquear (modo privado, armazenamento cheio).
export function salvar(chave, valor) {
    try {
        localStorage.setItem(PREFIXO + chave, JSON.stringify(valor));
        return true;
    } catch (erro) {
        return false;
    }
}

// Lê e converte de volta com JSON.parse.
// Chave inexistente (null) ou texto corrompido devolvem o valor padrão.
// Se o padrão é uma lista e o valor salvo não é (ex.: alguém gravou um objeto
// na chave pelo console), também volta o padrão: o JSON era válido, mas o formato não.
export function ler(chave, padrao) {
    try {
        const texto = localStorage.getItem(PREFIXO + chave);
        if (texto === null) return padrao;
        const valor = JSON.parse(texto);
        if (Array.isArray(padrao) && !Array.isArray(valor)) return padrao;
        return valor;
    } catch (erro) {
        return padrao;
    }
}

export function remover(chave) {
    try {
        localStorage.removeItem(PREFIXO + chave);
    } catch (erro) {
        // sem acesso ao armazenamento: não há o que remover
    }
}

// Apaga todas as chaves do site (botão "Limpar meus dados")
export function limparTudo() {
    try {
        Object.keys(localStorage)
            .filter((chave) => chave.startsWith(PREFIXO))
            .forEach((chave) => localStorage.removeItem(chave));
        return true;
    } catch (erro) {
        return false;
    }
}
