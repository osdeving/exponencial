# Autoria de Conteúdo

## Regra editorial para a fase atual

O produto ainda está validando loops de aprendizagem e mecânicas de domínio. Por isso:

- conteúdo final não é pré-requisito para desenvolver feature
- placeholders em Markdown são aceitáveis para validar fluxo
- o status da lição deve refletir a maturidade real: `outline`, `in-progress` ou `ready`

A ordem recomendada é:

1. validar a funcionalidade com conteúdo simples
2. estabilizar contrato, renderer e telemetria
3. substituir o placeholder por material editorial definitivo

Hoje o projeto usa **Markdown como fonte principal** para tópico, teoria, exercícios e gabaritos.

Além disso, o setup inicial do app parte de uma **taxonomia canônica** em `docs/estrutura/*`. O scaffold usa essa taxonomia para garantir que a grade já exista no sistema, mesmo quando parte do conteúdo ainda estiver só como placeholder.

## Estrutura

Os arquivos vivem em `src/content/`:

```text
src/content/
  fundamental/
    6-ano/
      fractions/
        _topic.md
        01-introducao-as-fracoes.md
        02-operacoes-com-fracoes.md
        02-operacoes-com-fracoes.questions.md
```

- `_topic.md` define os metadados do tópico.
- Cada lição é um `.md` separado.
- Cada arquivo `*.questions.md` descreve a prática de uma lição.
- Os manifestos consumidos pela aplicação são gerados automaticamente em:
  - `src/generated/content-manifest.ts`
  - `src/generated/lesson-content-index.ts`
  - `src/generated/question-index.ts`

## Comandos

```bash
npm run content:scaffold
npm run content:generate
npm run dev
npm run build
npm run lint
```

- `content:scaffold`: combina a semente editorial com `docs/estrutura/*` e cria placeholders para tudo o que ainda não existir em `src/content/`.
- `content:generate`: lê os `.md`, valida o frontmatter e gera os manifestos TypeScript e os módulos lazy por lição.
- `dev`, `build` e `lint` já executam `content:generate` antes.

## Status de conteúdo

Use estes valores em lições:

- `outline`: a estrutura existe, mas o conteúdo ainda é placeholder
- `in-progress`: a lição está sendo construída e já pode ter texto parcial
- `ready`: a lição está pronta

O tópico herda o status a partir das lições.

## Frontmatter do tópico

Exemplo de `src/content/fundamental/6-ano/fractions/_topic.md`:

```md
---
id: fractions
title: Frações
description: Representação, equivalência, comparação e operações com frações.
level: Fundamental
stage: 6º ano
category: Números e Operações
icon: Divide
order: 20
tags:
  - fracoes
  - racionais
canonicalIds:
  - NUM.06
---
# Frações

Visão geral do tópico.
```

Campos obrigatórios:

- `id`
- `title`
- `description`
- `level`
- `stage`
- `category`
- `icon`
- `order`

Campo obrigatório no padrão canônico:

- `canonicalIds`

## Frontmatter da lição

Exemplo:

```md
---
id: fractions-intro
topicId: fractions
title: Introdução às Frações
difficulty: Fácil
estimatedMinutes: 12
order: 1
summary: Apresenta a ideia de parte de um todo e a leitura de numerador e denominador.
status: ready
goals:
  - Entender numerador e denominador
  - Ler frações no cotidiano
prerequisites:
tags:
canonicalIds:
  - NUM.06.01
---
# O que é uma Fração?

Conteúdo em Markdown.
```

Campos obrigatórios:

- `id`
- `topicId`
- `title`
- `difficulty`
- `estimatedMinutes`
- `order`
- `summary`
- `status`
- `canonicalIds`

Campos opcionais:

- `goals`
- `prerequisites`
- `tags`

## Taxonomia canônica

O elo entre o conteúdo do app e a grade curricular ampla é feito com `canonicalIds`.

- em `_topic.md`, `canonicalIds` aponta para subseções como `NUM.06`, `SET.02`, `CAL.01`
- em lições, `canonicalIds` aponta para itens folha como `NUM.06.01`

Quando um tópico real ainda não existir, `npm run content:scaffold` cria o diretório e os arquivos `.md` iniciais automaticamente com base em `docs/estrutura/*`.

Exemplo de placeholder scaffoldado:

```text
src/content/fundamental/6-ano/set-02-teoria-elementar-dos-conjuntos/
  _topic.md
  01-set-02-01-nocao-de-conjunto.md
  02-set-02-02-pertinencia.md
```

Esse é o comportamento desejado do projeto: a grade já vem montada, e o trabalho editorial passa a ser preencher ou refinar os Markdown existentes.

## KaTeX

O app renderiza matemática com `remark-math` + `rehype-katex`.

Use inline:

```md
$a^2 + b^2 = c^2$
```

Use bloco:

```md
$$
x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}
$$
```

## Arquivo de questões

Cada lição pode ter um arquivo irmão com o mesmo prefixo e sufixo `.questions.md`.

Exemplo:

```text
src/content/fundamental/6-ano/fractions/
  03-equivalencia-e-comparacao.md
  03-equivalencia-e-comparacao.questions.md
```

### Frontmatter da questão

Exemplo:

```md
---
lessonId: fractions-equivalence
source: TQM - Frações.pdf
defaultType: self-check
defaultSection: Equivalência e comparação
defaultHint: Simplifique, reduza ao mesmo denominador ou compare usando um todo comum.
---
```

Campos:

- `lessonId` obrigatório e deve apontar para a lição
- `source` opcional
- `defaultType` opcional: `self-check` ou `multiple-choice`
- `defaultSection` opcional
- `defaultHint` opcional

### Metadados de recuperação por questão

Quando quiser guiar o motor local de recuperação, você pode adicionar estes blocos opcionais:

- `### Lacunas`: lista curta de misconceptions ou faltas conceituais
- `### Pré-requisitos`: `canonicalIds` folha que ajudam a explicar o erro
- `### Recuperação`: `lessonId`s que o aluno deve revisar antes de reabrir a prática

Exemplo:

```md
### Lacunas
- soma de frações com denominadores diferentes
- taxa de trabalho

### Pré-requisitos
- NUM.06.12
- NUM.06.13

### Recuperação
- fractions-intro
```

Regra prática:

- se `### Recuperação` existir, ela tem prioridade sobre o fallback automático
- se só `### Pré-requisitos` existir, o app tenta localizar lições com esses `canonicalIds`
- se nada existir, o app cai no fallback local, revisando a lição anterior do tópico ou a teoria atual

### Blocos de questão

Use um bloco por questão:

```md
## Questão 1
### Enunciado
Ordene $\frac{1}{2}$, $\frac{2}{3}$ e $\frac{3}{4}$ em ordem crescente.

### Resposta
`1/2 < 2/3 < 3/4`

### Explicação
Reduzindo a um mesmo denominador, fica mais fácil comparar.

### Dica
Transforme as frações em denominadores equivalentes.
```

Para múltipla escolha:

```md
## Questão 2
### Tipo
multiple-choice

### Enunciado
Se $f(x) = 2x + 1$, qual é o valor de $f(4)$?

### Opções
- 9
- 8
- 7
- 5

### Correta
1
```

Campos aceitos por bloco:

- `### Enunciado` obrigatório
- `### Resposta` ou `### Gabarito` obrigatório para `self-check`
- `### Opções` e `### Correta` obrigatórios para `multiple-choice`
- `### Explicação` opcional
- `### Dica` opcional
- `### Solução` opcional
- `### Tipo` opcional
- `### Seção` opcional
- `### Fonte` opcional

### Solução estruturada

Quando você quiser deixar a questão pronta para uma resolução passo a passo, use `### Solução`.

O formato aceito hoje é:

- texto Markdown simples
- ou um bloco cercado por crases com JSON estruturado

Exemplo mínimo com texto simples:

```md
### Solução
Some os numeradores depois de reduzir as frações ao mesmo denominador.
```

Exemplo estruturado:

````md
### Solução
```json
{
  "mode": "step-by-step",
  "summary": "Use MMC para igualar os denominadores e só depois some.",
  "steps": [
    {
      "type": "markdown",
      "title": "Identifique as frações",
      "content": "Temos $\\frac{1}{4}$ e $\\frac{1}{6}$."
    },
    {
      "type": "algorithm",
      "layout": "mmc",
      "title": "Calcule o MMC",
      "lines": [
        "2 | 4  6",
        "2 | 2  3",
        "3 | 1  3",
        "  | 1  1"
      ],
      "result": "MMC(4, 6) = 12"
    },
    {
      "type": "equation",
      "title": "Reescreva e some",
      "content": "$$\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$$"
    }
  ]
}
```
````

Campos do schema:

- `mode`: `static` ou `step-by-step`
- `summary`: resumo opcional da estratégia
- `steps`: lista obrigatória

Tipos de passo aceitos:

- `markdown`: bloco explicativo com `content`
- `equation`: bloco matemático com `content`
- `scratchpad`: rascunho com `lines`
- `algorithm`: algoritmo visual com `layout`, `lines`, `result` e `annotations`

Layouts de `algorithm` aceitos:

- `mmc`
- `long-division`
- `continued-division`
- `custom`

## Fluxo recomendado

1. Se a mudança for estrutural, rode `npm run content:scaffold`.
2. Escolha o tópico em `src/content/.../<topic-id>/`.
3. Edite ou crie a lição em Markdown.
4. Se houver prática, edite ou crie o `*.questions.md` da mesma lição.
5. Rode `npm run content:generate`.
6. Rode `npm run dev`.
7. Commit normalmente.

## Observações

- Para adicionar um novo tópico, crie uma pasta nova com `_topic.md`.
- Para ampliar a cobertura curricular base, prefira primeiro revisar a taxonomia em `docs/estrutura/*` e então rodar `npm run content:scaffold`.
- Para adicionar uma nova lição, crie um novo `.md` no mesmo diretório do tópico.
- Para adicionar questões, crie o `*.questions.md` apontando para o `lessonId` da lição.
- Para adicionar resolução animável no futuro, prefira `### Solução` estruturada em vez de empilhar tudo em `### Explicação`.
- O app lê as lições pelo `topicId` e as questões pelo `lessonId`, então não é necessário editar o código para novo conteúdo se o frontmatter estiver correto.
- Não edite `src/generated/content-manifest.ts`, `src/generated/lesson-content-index.ts`, `src/generated/question-index.ts`, `src/generated/canonical-taxonomy.ts` nem `src/generated/topic-taxonomy.ts` manualmente.
- Não use PDFs como dependência do runtime final.
