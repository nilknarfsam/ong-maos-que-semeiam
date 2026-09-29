# Instituto Mãos que Semeiam: site institucional

Projeto da **Experiência Prática I** da disciplina **Desenvolvimento Front-End para Web**
(Análise e Desenvolvimento de Sistemas, Universidade Cruzeiro do Sul, 2º semestre de 2026).

Site em **HTML5 semântico** para uma ONG fictícia de Manaus (AM), com três páginas:

| Página | Conteúdo |
|---|---|
| `index.html` | Apresentação da ONG: quem somos, missão, visão, valores, impacto, formas de ajudar e contatos |
| `projetos.html` | Os 4 projetos sociais, o passo a passo do voluntariado, as campanhas de doação e os resultados |
| `cadastro.html` | Formulário de cadastro de voluntários e doadores, com validação nativa e máscaras de CPF, telefone e CEP |

## Estrutura de pastas
```
projeto-ong/
├── index.html
├── projetos.html
├── cadastro.html
├── README.md
├── img/   → logotipo (SVG) e imagens otimizadas em WebP + JPG/PNG
└── js/    → mascaras.js (formata CPF, telefone e CEP enquanto a pessoa digita)
```

## Destaques técnicos
- Tags semânticas: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`, `figure`.
- Hierarquia de títulos: um único `h1` por página, sem pular níveis.
- Acessibilidade: link "Pular para o conteúdo", `aria-current` no menu, `alt` em todas as imagens, `label` ligado a cada campo e dicas com `aria-describedby`.
- Imagens responsivas com `<picture>` (WebP com alternativa JPG/PNG), `srcset`, `width`/`height` e `loading="lazy"`.
- Formulário: seis `fieldset` com `legend`, tipos `email`, `tel`, `date`, `number`, `radio` e `checkbox`, além de `required`, `pattern`, `min`/`max`, `minlength`/`maxlength`.
- Máscaras: o `pattern` valida o formato (funciona sem JavaScript) e o `js/mascaras.js` só formata a digitação.
- **Validado no W3C Nu Html Checker sem erros e sem avisos.**

## Como abrir
Basta abrir o `index.html` no navegador. Não há dependências nem etapa de build.
