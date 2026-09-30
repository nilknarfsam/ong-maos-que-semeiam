# Instituto Mãos que Semeiam: plataforma web para uma organização do terceiro setor

**Universidade Cruzeiro do Sul** · Curso Superior de Tecnologia em Análise e Desenvolvimento de Sistemas
**Disciplina:** Desenvolvimento Front-End para Web · 2º semestre de 2026
**Aluno:** Franklin Carvalho · [github.com/nilknarfsam](https://github.com/nilknarfsam)
**Atividades:** Experiências Práticas I a IV (projeto único, evoluído a cada entrega)

---

## Acesso

| | Endereço |
|---|---|
| **Site publicado (GitHub Pages)** | https://nilknarfsam.github.io/ong-maos-que-semeiam/ |
| **Repositório** | https://github.com/nilknarfsam/ong-maos-que-semeiam |

### Páginas

| Página | Link direto | Conteúdo |
|---|---|---|
| Início | [index.html](https://nilknarfsam.github.io/ong-maos-que-semeiam/index.html) | Apresentação da ONG: quem somos, missão, visão, valores, impacto, formas de ajudar e contatos |
| Projetos | [projetos.html](https://nilknarfsam.github.io/ong-maos-que-semeiam/projetos.html) | Os 4 projetos sociais, o passo a passo do voluntariado, as campanhas de doação e os resultados |
| Cadastro | [cadastro.html](https://nilknarfsam.github.io/ong-maos-que-semeiam/cadastro.html) | Formulário de voluntários e doadores, com validação nativa e máscaras de CPF, telefone e CEP |
| **Design System** | [design-system.html](https://nilknarfsam.github.io/ong-maos-que-semeiam/design-system.html) | Guia visual da plataforma: variáveis, botões, badges, alertas, validação, modal e toast (EP II) |

---

## Sumário
1. [Contexto e problema](#1-contexto-e-problema)
2. [Objetivos](#2-objetivos)
3. [Andamento das entregas](#3-andamento-das-entregas)
4. [Estrutura de pastas](#4-estrutura-de-pastas)
5. [EP I: estrutura semântica em HTML5](#5-ep-i-estrutura-semântica-em-html5)
6. [EP II: Design System, layouts responsivos e componentes](#6-ep-ii-design-system-layouts-responsivos-e-componentes)
7. [Acessibilidade](#7-acessibilidade)
8. [Validação e testes](#8-validação-e-testes)
9. [Como executar](#9-como-executar)
10. [Metodologia de trabalho e uso de IA](#10-metodologia-de-trabalho-e-uso-de-ia)
11. [Histórico de versões](#11-histórico-de-versões)
12. [Referências](#12-referências)

---

## 1. Contexto e problema

O terceiro setor brasileiro reúne mais de 820 mil organizações da sociedade civil, segundo o IBGE, e só cerca de 30% delas têm presença digital adequada (dados apresentados no enunciado da disciplina). Muitas ONGs não têm orçamento nem equipe técnica para manter uma plataforma própria, e isso limita a captação de recursos e de voluntários.

O projeto propõe a plataforma web do **Instituto Mãos que Semeiam**, uma ONG **fictícia** da Zona Leste de Manaus (AM). A ONG mantém quatro projetos permanentes:

| Projeto | Área |
|---|---|
| Reforço Escolar Semente | Educação |
| Cozinha Solidária | Alimentação |
| Jovem Conectado | Tecnologia e inclusão digital |
| Horta Comunitária Viva | Meio ambiente |

O site precisa apresentar a organização, divulgar os projetos, mostrar a prestação de contas e converter visitantes em **voluntários** e **doadores**. O público mistura voluntários de várias idades, famílias atendidas e doadores, em grande parte acessando pelo celular. Por isso **acessibilidade, leitura fácil e desempenho em redes móveis** são requisitos do projeto, e não extras.

## 2. Objetivos

**Objetivo geral:** desenvolver o front-end de uma plataforma institucional para uma ONG, aplicando progressivamente HTML5 semântico, CSS3, JavaScript e boas práticas de publicação.

**Objetivos específicos:**
- estruturar as páginas com HTML5 semântico, hierarquia correta de títulos e formulários acessíveis (EP I);
- criar um *Design System* com variáveis CSS para cores, tipografia e espaçamentos (EP II);
- construir layouts responsivos com CSS Grid de 12 colunas, Flexbox e cinco *breakpoints* (EP II);
- desenvolver menu responsivo com *dropdown* e hambúrguer, cartões, estados de botões, validação visual e componentes de *feedback* (EP II);
- versionar e publicar o projeto com Git, GitHub e GitHub Pages (todas as EPs).

## 3. Andamento das entregas

| Entrega | Tema | Situação | Versão |
|---|---|---|---|
| EP I | Fundamentos e estruturação: HTML5 semântico, formulário e diretórios | ✅ Entregue | tag `ep1` |
| EP II | Design System, CSS3, Grid, Flexbox e componentes interativos | 🔄 Em andamento | — |
| EP III | (aguardando enunciado) | — | — |
| EP IV | (aguardando enunciado) | — | — |

**Estado atual da EP II:** o Design System, o layout e os componentes estão prontos e documentados na página `design-system.html`. A próxima etapa é aplicar essas classes em `index.html`, `projetos.html` e `cadastro.html`, que ainda estão com a estrutura da EP I, sem estilo.

## 4. Estrutura de pastas

```
projeto-ong/
├── index.html            → página inicial
├── projetos.html         → projetos, voluntariado, doações e resultados
├── cadastro.html         → formulário de voluntários e doadores
├── design-system.html    → guia visual do Design System (EP II)
├── README.md
├── css/                  → (EP II) carregados nesta ordem:
│   ├── variaveis.css     → tokens: cores, tipografia, espaçamentos, sombras, camadas
│   ├── base.css          → reset leve, tipografia global, links, foco visível
│   ├── layout.css        → container, grid de 12 colunas, cabeçalho, seções, rodapé
│   ├── componentes.css   → menu, botões, cartões, badges, alertas, formulário, modal, toast
│   ├── utilitarios.css   → pequenas classes de apoio
│   └── guia.css          → estilos exclusivos da página design-system.html
├── js/
│   ├── mascaras.js       → (EP I) formata CPF, telefone e CEP durante a digitação
│   ├── menu.js           → (EP II) abre e fecha o menu hambúrguer, fecha com Esc
│   └── feedback.js       → (EP II) modal, toast e alertas que podem ser fechados
└── img/                  → logotipo (SVG) e ilustrações em WebP + JPG/PNG
```

A arquitetura do CSS separa **o que o sistema é** (tokens), **como a página se organiza** (layout) e **as peças reutilizáveis** (componentes). A ordem de carregamento vai do mais genérico ao mais específico, o que reduz conflitos de especificidade.

## 5. EP I: estrutura semântica em HTML5

- **Semântica:** `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`, `address`, `figure`/`figcaption`, `dl`, `table` com `caption` e `th scope`, `progress`, `details`/`summary`.
- **Hierarquia:** um único `h1` por página, dentro do `main`, sem pular níveis. O nome da ONG no cabeçalho não é título, para não competir com o `h1`.
- **Imagens:** `<picture>` com WebP e alternativa JPG/PNG, `srcset` nos tamanhos 800 e 1200, `width`/`height` para evitar saltos de layout e `loading="lazy"`. O `alt` descreve a função (no logo com link) ou o conteúdo (nas ilustrações).
- **Formulário:** seis `fieldset` com `legend` (tipo de colaboração, dados pessoais, endereço, voluntariado, doação e consentimento LGPD). Usa os tipos `email`, `tel`, `date`, `number`, `radio` e `checkbox`, além de `required`, `pattern`, `min`/`max` e `minlength`/`maxlength`.
- **Máscaras:** o `pattern` valida CPF (`000.000.000-00`), telefone (`(00) 00000-0000`) e CEP (`00000-000`) mesmo sem JavaScript. O `js/mascaras.js` só formata enquanto a pessoa digita.

## 6. EP II: Design System, layouts responsivos e componentes

### 6.1 Design System (`css/variaveis.css`)

Todos os valores visuais são **variáveis CSS** declaradas em `:root`. Nenhum componente usa cor, fonte ou espaço digitado diretamente. Para adaptar a plataforma a outra ONG, basta trocar este arquivo.

**Cores:** 12 variáveis, derivadas do logotipo. O contraste foi medido com a fórmula da WCAG 2.1.

| Grupo | Variável | Valor | Uso | Contraste |
|---|---|---|---|---|
| Primária | `--cor-primaria` | `#1F6F4A` | links, menu, botões | 6,1:1 no branco |
| | `--cor-primaria-escura` | `#14492F` | hover, títulos, rodapé | 10,4:1 com branco |
| | `--cor-primaria-clara` | `#E6F2EA` | fundos de destaque, halo de foco | — |
| Secundária | `--cor-secundaria` | `#F2A541` | botões de doação (sempre com texto escuro) | 7,2:1 com o texto |
| | `--cor-secundaria-escura` | `#8A4B00` | âmbar em texto, anel de foco | 6,8:1 no branco |
| Neutras | `--cor-texto` | `#1F2A24` | texto principal | 14,8:1 no branco |
| | `--cor-texto-suave` | `#4A5A51` | legendas e dicas | 7,3:1 no branco |
| | `--cor-fundo` | `#FFFFFF` | fundo padrão | — |
| | `--cor-fundo-alt` | `#F8F4EA` | fundo creme das seções alternadas | — |
| | `--cor-borda` | `#D5DDD8` | bordas decorativas | — |
| Feedback | `--cor-erro` | `#B3261E` | erros | 6,5:1 no branco |
| | `--cor-sucesso` | `#1E7A3E` | confirmações | 5,4:1 no branco |

A combinação branco sobre âmbar dá só 2,05:1 e **reprova** na WCAG. Por isso o âmbar nunca recebe texto branco.

**Tipografia:** escala modular de razão 1,25 (*Major Third*) a partir de 16px, em `rem`. Os títulos usam Nunito e o texto usa a pilha de fontes do sistema, que não precisa ser baixada.

| Variável | Tamanho | Uso |
|---|---|---|
| `--fonte-xxl` | 2,441rem (39px), com `clamp()` | h1 |
| `--fonte-xl` | 1,953rem (31px), com `clamp()` | h2 |
| `--fonte-lg` | 1,563rem (25px) | h3 |
| `--fonte-md` | 1,25rem (20px) | h4 |
| `--fonte-base` | 1rem (16px) | texto |
| `--fonte-xs` | 0,875rem (14px) | legendas, dicas e badges (mínimo legível) |

**Espaçamentos:** escala de 8px, de `--esp-1` (4px) a `--esp-7` (64px): 4, 8, 16, 24, 32, 48 e 64px.

O sistema também define raio de borda, duas sombras, a duração das transições (`--transicao: 250ms`), a área mínima de toque (`--area-toque: 44px`), a largura do container e as camadas de `z-index`.

### 6.2 Layout: Grid de 12 colunas e breakpoints (`css/layout.css`)

- **Container:** `width: min(100% - 2 * var(--esp-3), var(--largura-container))`, com 1200px de largura máxima (1320px a partir de 1400px).
- **Grid:** `.grid { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: var(--gap-grid); }`. Os filhos ocupam as 12 colunas por padrão, e as classes `.col-{breakpoint}-{n}` (ex.: `.col-md-6`, `.col-lg-4`) mudam a largura em cada faixa.
- **Estratégia *mobile first*:** o CSS base é o do celular, e cada `@media (min-width)` só acrescenta mudanças.

| Breakpoint | Dispositivo | O que muda |
|---|---|---|
| base (< 576px) | celular | uma coluna visual, menu hambúrguer |
| 576px | celular grande ou na horizontal | botões lado a lado, impacto em 2 colunas |
| 768px | tablet | menu horizontal com dropdown, cartões 2 por linha, campos em pares |
| 992px | notebook | conteúdo em 8 colunas e aside em 4, cartões 3 por linha |
| 1200px | desktop | cartões 4 por linha, espaço entre colunas de 32px |
| 1400px | desktop panorâmico | container de 1320px |

- **Grid e Flexbox:** o Grid organiza a página em duas dimensões. O **Flexbox** alinha o conteúdo dentro de cada componente: cabeçalho, menu, botões, cartões (botão alinhado na base com `margin-top: auto`), campos, grupos de opções e rodapé.

### 6.3 Componentes (`css/componentes.css`)

As classes seguem a convenção **BEM** (`.bloco__elemento--modificador`).

| Componente | Classes principais | Destaques |
|---|---|---|
| Menu | `.menu`, `.menu__botao`, `.menu__lista`, `.submenu` | Hambúrguer abaixo de 768px (vira X por `[aria-expanded="true"]`). Dropdown aberto por `:hover` (só em `@media (hover: hover)`) e por `:focus-within`, para funcionar pelo teclado. É escondido com `visibility`/`opacity`/`transform`, o que permite a transição. |
| Botões | `.botao--primario`, `--doar`, `--contorno` | Estados `:hover` (escurece, sobe 2px e ganha sombra), `:focus-visible` (anel de 3px), `:active` (afunda 1px) e `:disabled` (50% de opacidade, sem movimento). |
| Cartões | `.cartao`, `__midia`, `__corpo`, `__acoes` | Flexbox em coluna; o cartão se eleva em `:hover` e `:focus-within`. |
| Badges | `.badge--educacao`, `--alimentacao`, `--tecnologia`, `--ambiente`, `--sucesso`, `--aviso`, `--erro`, `--neutro` | Categorias e status, sempre com texto; a cor e o ícone só reforçam a informação. |
| Alertas | `.alerta--info`, `--sucesso`, `--aviso`, `--erro` | Ícone, título e borda lateral. O fundo claro é gerado com `color-mix()` a partir do token, sem criar cor nova. `role="alert"` nos erros. |
| Formulário | `.campo`, `.campo__entrada`, `.campo__erro`, `.opcoes` | Validação visual com `:user-invalid`/`:user-valid`, que só age depois da interação, e *fallback* `:not(:placeholder-shown):invalid`. Erro com borda, ícone e mensagem; sucesso com borda e ícone de confirmação. |
| Modal | `.modal` (elemento `<dialog>`) | `showModal()` nativo: prende o foco, fecha com Esc e usa `::backdrop` translúcido. |
| Toast | `.toast-area`, `.toast` | Notificação não obstrutiva com `aria-live="polite"`, que some em 5 s. A função `mostrarToast(mensagem, tipo)` fica disponível para integração com o back-end. |

## 7. Acessibilidade

O projeto segue as recomendações da **WCAG 2.1, nível AA**:
- **Contraste:** todas as combinações de texto têm contraste de pelo menos 4,5:1, medido com a fórmula de luminância relativa da WCAG.
- **A cor nunca é o único sinal:** erros, alertas e badges trazem sempre texto e, quando há espaço, ícone.
- **Teclado:** link "Pular para o conteúdo", foco visível com `:focus-visible`, dropdown acessível por `:focus-within`, Esc para fechar o menu e o modal.
- **Leitores de tela:** `aria-current` no menu, `aria-expanded`/`aria-controls` no botão do hambúrguer, `aria-describedby` ligando dicas e erros aos campos, `aria-live` nos toasts e `role="alert"` nos erros.
- **Toque:** área mínima de 44 × 44px em links de menu, botões e opções.
- **Preferências do usuário:** tamanhos em `rem`, que respeitam o zoom e a fonte escolhida no navegador, e `@media (prefers-reduced-motion: reduce)`, que desliga as animações.

## 8. Validação e testes

| Verificação | Ferramenta | Resultado |
|---|---|---|
| HTML das 3 páginas da EP I | W3C Nu Html Checker | 0 erros e 0 avisos |
| HTML de `design-system.html` | W3C Nu Html Checker (`vnu.jar`) | 0 erros |
| CSS dos 6 arquivos | Validador de CSS do `vnu.jar` | 0 erros |
| Contraste de cores | Script com a fórmula da WCAG 2.1 | todas as combinações de texto ≥ 4,5:1 |
| Responsividade | Chromium (Playwright) em 390px e 1280px | sem rolagem horizontal no celular |
| Formulário | testes manuais com entradas inválidas e incompletas | envio bloqueado e mensagens exibidas |

## 9. Como executar

Não há dependências nem etapa de *build*:
1. clone o repositório: `git clone https://github.com/nilknarfsam/ong-maos-que-semeiam.git`;
2. abra o `index.html` no navegador, ou acesse o [site publicado](https://nilknarfsam.github.io/ong-maos-que-semeiam/).

A fonte Nunito vem do Google Fonts. Sem internet, os títulos usam a fonte do sistema.

## 10. Metodologia de trabalho e uso de IA

Cada Experiência Prática seguiu o mesmo ciclo:
1. **Planejamento:** as questões do AVA foram respondidas antes da codificação e funcionaram como especificação do projeto.
2. **Registro:** as decisões técnicas, com data e justificativa, ficaram registradas em um diário de bordo por entrega.
3. **Implementação:** o código seguiu o que foi respondido. Os prints entregues são do código real, rodando no navegador.
4. **Verificação:** validação no W3C, medição de contraste e testes em diferentes larguras de tela.
5. **Publicação:** commit, tag por entrega e GitHub Pages.

Uma ferramenta de IA generativa (Claude, da Anthropic) foi usada como apoio no planejamento, na revisão e na geração de código. Todo o conteúdo foi revisado, testado e validado pelo aluno, que é o responsável pelas decisões do projeto.

## 11. Histórico de versões

| Versão | Data | Descrição |
|---|---|---|
| `ep1` | 28/09/2026 | Estrutura HTML5 semântica, 3 páginas, formulário com validação nativa e máscaras, imagens otimizadas |
| EP II (em andamento) | 29/09/2026 | Design System em variáveis CSS, arquitetura em 6 arquivos CSS, Grid de 12 colunas, menu responsivo, componentes de feedback e página `design-system.html` |

## 12. Referências

- MOZILLA DEVELOPER NETWORK. *CSS Grid Layout*. Disponível em: https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_grid_layout. Acesso em: 29 set. 2026.
- MOZILLA DEVELOPER NETWORK. *CSS: Cascading Style Sheets*. Disponível em: https://developer.mozilla.org/pt-BR/docs/Web/CSS. Acesso em: 29 set. 2026.
- MOZILLA DEVELOPER NETWORK. *&lt;dialog&gt;: o elemento de diálogo*. Disponível em: https://developer.mozilla.org/pt-BR/docs/Web/HTML/Element/dialog. Acesso em: 29 set. 2026.
- W3C. *Web Content Accessibility Guidelines (WCAG) 2.1*. 2018. Disponível em: https://www.w3.org/TR/WCAG21/. Acesso em: 29 set. 2026.
- W3C. *Nu Html Checker*. Disponível em: https://validator.w3.org/nu/. Acesso em: 29 set. 2026.
- W3C WAI. *ARIA Authoring Practices Guide: Disclosure (Show/Hide) Navigation Menu*. Disponível em: https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/. Acesso em: 29 set. 2026.
- UNIVERSIDADE CRUZEIRO DO SUL. *Desenvolvimento Front-End para Web*: material teórico das unidades 1 a 4 e enunciados das Experiências Práticas. São Paulo, 2026.

---

> **Aviso:** o Instituto Mãos que Semeiam é uma organização **fictícia**, criada exclusivamente para fins acadêmicos. Nomes, endereços, números e campanhas são ilustrativos.
