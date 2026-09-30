/*
 * Dados dos projetos da ONG.
 * Camada base: só dados, sem DOM e sem eventos.
 * Para mudar um cartão da página de Projetos, altere o objeto aqui.
 * Para criar um projeto novo, acrescente um objeto ao array.
 */
export const projetos = [
    {
        id: 'reforco',
        titulo: 'Reforço Escolar Semente',
        imagem: 'projeto-reforco',
        alt: 'Ilustração de um livro aberto, símbolo do projeto de reforço escolar',
        legenda: 'Turmas pequenas, de até 12 crianças, com acompanhamento individual.',
        categoria: { nome: 'Educação', tipo: 'educacao' },
        status: { nome: 'Vagas abertas', tipo: 'sucesso' },
        descricao: 'Aulas de reforço em português e matemática para crianças do ensino fundamental, no contraturno escolar.',
        publico: 'Crianças de 7 a 14 anos',
        horario: 'Segunda a quinta, das 14h às 17h',
        voluntario: 'dar aulas ou acompanhar a lição de casa.',
        doacao: 'material escolar e lanches para as turmas.'
    },
    {
        id: 'cozinha',
        titulo: 'Cozinha Solidária',
        imagem: 'projeto-cozinha',
        alt: 'Ilustração de uma panela com vapor, símbolo da Cozinha Solidária',
        legenda: 'Refeições preparadas com alimentos doados e da horta comunitária.',
        categoria: { nome: 'Alimentação', tipo: 'alimentacao' },
        status: { nome: 'Últimas vagas', tipo: 'aviso' },
        descricao: 'Refeições gratuitas para famílias em situação de insegurança alimentar e distribuição mensal de cestas básicas.',
        publico: 'Famílias cadastradas no bairro',
        horario: 'Terça, quinta e sábado, a partir das 11h',
        voluntario: 'cozinhar, servir ou montar as cestas.',
        doacao: 'alimentos não perecíveis e gás de cozinha.'
    },
    {
        id: 'jovem',
        titulo: 'Jovem Conectado',
        imagem: 'projeto-jovem',
        alt: 'Ilustração de um notebook com código na tela, símbolo do projeto Jovem Conectado',
        legenda: 'Laboratório com 15 computadores recondicionados.',
        categoria: { nome: 'Tecnologia', tipo: 'tecnologia' },
        status: { nome: 'Vagas abertas', tipo: 'sucesso' },
        descricao: 'Oficinas de informática básica, pacote de escritório e introdução à programação web para jovens em busca do primeiro emprego.',
        publico: 'Jovens de 15 a 24 anos',
        horario: 'Sábados, das 8h às 12h',
        voluntario: 'ser instrutor ou mentor de carreira.',
        doacao: 'computadores usados e internet do laboratório.'
    },
    {
        id: 'horta',
        titulo: 'Horta Comunitária Viva',
        imagem: 'projeto-horta',
        alt: 'Ilustração de uma horta com mudas, símbolo da Horta Comunitária Viva',
        legenda: 'Canteiros cuidados por famílias e voluntários.',
        categoria: { nome: 'Meio ambiente', tipo: 'ambiente' },
        status: { nome: 'Nova turma em breve', tipo: 'neutro' },
        descricao: 'Cultivo de hortaliças sem agrotóxicos, com oficinas de educação ambiental. Parte da colheita abastece a Cozinha Solidária.',
        publico: 'Famílias e escolas da região',
        horario: 'Mutirões aos domingos, das 7h às 10h',
        voluntario: 'participar dos mutirões de plantio e colheita.',
        doacao: 'mudas, adubo e ferramentas.'
    }
];
