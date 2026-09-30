/*
 * Máscaras de digitação para CPF, telefone e CEP.
 * Como usar: coloque data-mascara="cpf", "telefone" ou "cep" no <input>.
 * A tela chama aplicarMascara(campo) no evento input (delegado).
 */
const mascaras = {
    // 000.000.000-00
    cpf: (d) => d.slice(0, 11)
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'),

    // (00) 0000-0000 ou (00) 00000-0000
    telefone: (d) => {
        d = d.slice(0, 11);
        if (d.length <= 2) return d.replace(/^(\d{1,2})/, '($1');
        if (d.length <= 6) return d.replace(/^(\d{2})(\d+)/, '($1) $2');
        if (d.length <= 10) return d.replace(/^(\d{2})(\d{4})(\d+)/, '($1) $2-$3');
        return d.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    },

    // 00000-000
    cep: (d) => d.slice(0, 8).replace(/^(\d{5})(\d)/, '$1-$2'),
};

export function aplicarMascara(campo) {
    const aplicar = mascaras[campo.dataset.mascara];
    if (!aplicar) return;
    campo.value = aplicar(campo.value.replace(/\D/g, ''));
}
