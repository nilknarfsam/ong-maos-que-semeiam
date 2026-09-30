/*
 * Datas: isola a biblioteca externa Day.js (js/vendor/dayjs.min.js + pt-br.js).
 * Só este arquivo conhece o objeto global window.dayjs. O resto do código
 * usa idade() e formatarData(). Se o Day.js não carregar, as funções usam
 * Date e Intl.DateTimeFormat nativos como reserva.
 */
const dayjs = window.dayjs;
if (dayjs) dayjs.locale('pt-br');

// Idade em anos completos na data de hoje. "nascimento" vem do input type="date" (AAAA-MM-DD).
export function idade(nascimento) {
    if (dayjs) return dayjs().diff(dayjs(nascimento), 'year');

    const [ano, mes, dia] = nascimento.split('-').map(Number);
    const hoje = new Date();
    let anos = hoje.getFullYear() - ano;
    if (hoje.getMonth() + 1 < mes || (hoje.getMonth() + 1 === mes && hoje.getDate() < dia)) anos--;
    return anos;
}

// true se a data existe e não está no futuro
export function dataValida(texto) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(texto)) return false;
    const [ano, mes, dia] = texto.split('-').map(Number);
    const data = new Date(ano, mes - 1, dia);
    const existe = data.getFullYear() === ano && data.getMonth() === mes - 1 && data.getDate() === dia;
    return existe && data <= new Date();
}

// "2026-09-29T18:30:00.000Z" -> "29 de setembro de 2026 às 14:30" (fuso do navegador)
export function formatarData(iso) {
    if (dayjs) return dayjs(iso).format('D [de] MMMM [de] YYYY [às] HH:mm');

    const data = new Date(iso);
    const dia = new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(data);
    const hora = new Intl.DateTimeFormat('pt-BR', { timeStyle: 'short' }).format(data);
    return dia + ' às ' + hora;
}
