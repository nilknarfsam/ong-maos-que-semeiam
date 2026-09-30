/*
 * Validação do formulário de cadastro.
 * Regras: cada campo (pelo atributo name) aponta para uma função que devolve
 * a mensagem de erro, ou texto vazio quando o dado está certo.
 * Não grava nada e não conhece o localStorage: quem decide o que fazer é a tela.
 */
import { idade, dataValida } from './datas.js';

const querVoluntario = (form) => ['voluntario', 'ambos'].includes(form.elements.tipo.value);
const querDoar = (form) => ['doador', 'ambos'].includes(form.elements.tipo.value);

// Confere os dois dígitos verificadores do CPF
export function cpfValido(texto) {
    const d = texto.replace(/\D/g, '');
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;   // 111.111.111-11 etc.
    const digito = (quantidade) => {
        let soma = 0;
        for (let i = 0; i < quantidade; i++) soma += Number(d[i]) * (quantidade + 1 - i);
        const resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };
    return digito(9) === Number(d[9]) && digito(10) === Number(d[10]);
}

const obrigatorio = (mensagem) => (v) => (v ? '' : mensagem);

export const regras = {
    tipo: obrigatorio('Escolha como você quer colaborar.'),
    nome: (v) => !v ? 'Informe seu nome completo.'
        : /^[A-Za-zÀ-ÿ']+( [A-Za-zÀ-ÿ']+)+$/.test(v) ? '' : 'Informe nome e sobrenome, só com letras.',
    cpf: (v) => !v ? 'Informe o CPF.'
        : cpfValido(v) ? '' : 'CPF inválido. Confira os números.',
    nascimento: (v) => !v ? 'Informe a data de nascimento.'
        : !dataValida(v) ? 'Informe uma data válida, que não esteja no futuro.'
        : idade(v) < 16 ? 'É preciso ter 16 anos ou mais.' : '',
    email: (v) => !v ? 'Informe o e-mail.'
        : /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v) ? '' : 'Informe um e-mail com @ e domínio.',
    telefone: (v) => !v ? 'Informe o celular.'
        : /^\(\d{2}\) 9\d{4}-\d{4}$/.test(v) ? '' : 'Informe o celular: (00) 90000-0000.',
    cep: (v) => !v ? 'Informe o CEP.'
        : /^\d{5}-\d{3}$/.test(v) ? '' : 'Informe o CEP: 00000-000.',
    logradouro: obrigatorio('Informe a rua ou avenida.'),
    numero: (v) => !v ? 'Informe o número.'
        : /^(\d+|S\/N)$/i.test(v) ? '' : 'Informe somente números ou S/N.',
    bairro: obrigatorio('Informe o bairro.'),
    cidade: obrigatorio('Informe a cidade.'),
    uf: obrigatorio('Selecione o estado.'),
    interesses: (v, form) => querVoluntario(form) && v.length === 0
        ? 'Marque pelo menos um projeto de interesse.' : '',
    horas: (v, form) => {
        if (!v) return querVoluntario(form) ? 'Informe quantas horas por semana você tem.' : '';
        const n = Number(v);
        return Number.isInteger(n) && n >= 2 && n <= 40 ? '' : 'Informe um número inteiro entre 2 e 40.';
    },
    frequencia: (v, form) => querDoar(form) && !v ? 'Escolha a frequência da doação.' : '',
    valor: (v, form) => {
        if (!v) return querDoar(form) ? 'Informe o valor da doação.' : '';
        const n = Number(v);
        return n >= 10 && n <= 100000 ? '' : 'Informe um valor entre R$ 10,00 e R$ 100.000,00.';
    },
    lgpd: (v) => v ? '' : 'É preciso autorizar o uso dos dados para enviar o cadastro.'
};

// Valor de um campo pelo name: texto sem espaços nas pontas, valor do radio marcado,
// lista dos checkboxes marcados (interesses) ou true/false (checkbox único).
export function valorDoCampo(form, nome) {
    const campo = form.elements[nome];
    if (!campo) return '';
    if (campo instanceof RadioNodeList) {
        if (campo[0].type === 'checkbox') {
            return Array.from(campo).filter((c) => c.checked).map((c) => c.value);
        }
        return campo.value;
    }
    if (campo.type === 'checkbox') return campo.checked;
    return campo.value.trim();
}

// Bloco visual do campo: .campo nos campos comuns e o fieldset nos grupos de opções
function blocoDo(campo) {
    return campo.closest('.campo') || campo.closest('fieldset');
}

// Muda o estilo e a mensagem conforme o resultado
export function mostrarEstado(campo, mensagem) {
    const bloco = blocoDo(campo);
    const form = campo.form;
    const erro = form.querySelector('#erro-' + campo.name);
    const valor = valorDoCampo(form, campo.name);
    const preenchido = Array.isArray(valor) ? valor.length > 0 : Boolean(valor);

    bloco.classList.toggle('campo--erro', Boolean(mensagem));
    bloco.classList.toggle('campo--sucesso', !mensagem && preenchido);

    const grupo = form.elements[campo.name];
    const campos = grupo instanceof RadioNodeList ? Array.from(grupo) : [campo];
    campos.forEach((c) => c.setAttribute('aria-invalid', String(Boolean(mensagem))));

    if (erro) erro.textContent = mensagem;
}

export function validarCampo(campo) {
    const regra = regras[campo.name];
    if (!regra) return '';
    const mensagem = regra(valorDoCampo(campo.form, campo.name), campo.form);
    mostrarEstado(campo, mensagem);
    return mensagem;
}

// Valida todos os campos com regra e devolve a lista dos que falharam (um por grupo)
export function validarFormulario(form) {
    return Object.keys(regras)
        .map((nome) => form.elements[nome])
        .filter(Boolean)
        .map((campo) => (campo instanceof RadioNodeList ? campo[0] : campo))
        .filter((campo) => validarCampo(campo) !== '');
}

// Limpa os estados visuais (usado no reset do formulário)
export function limparEstados(form) {
    form.querySelectorAll('.campo--erro, .campo--sucesso')
        .forEach((bloco) => bloco.classList.remove('campo--erro', 'campo--sucesso'));
    form.querySelectorAll('[aria-invalid]').forEach((campo) => campo.removeAttribute('aria-invalid'));
}
