# Autoria de Conteúdo

Hoje o projeto usa **Markdown como fonte principal** para tópico, teoria, exercícios e gabaritos.

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
  - `src/generated/question-manifest.ts`

## Comandos

```bash
npm run content:scaffold
npm run content:generate
npm run dev
npm run build
npm run lint
```

- `content:scaffold`: cria a base do currículo sem sobrescrever arquivos já existentes.
- `content:generate`: lê os `.md`, valida o frontmatter e gera os manifestos TypeScript.
- `dev`, `build` e `lint` já executam `content:generate` antes.

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

Campos opcionais:

- `goals`
- `prerequisites`
- `tags`

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

1. Escolha o tópico em `src/content/.../<topic-id>/`.
2. Edite ou crie a lição em Markdown.
3. Se houver prática, edite ou crie o `*.questions.md` da mesma lição.
4. Rode `npm run content:generate`.
5. Rode `npm run dev`.
6. Commit normalmente.

## Observações

- Para adicionar um novo tópico, crie uma pasta nova com `_topic.md`.
- Para adicionar uma nova lição, crie um novo `.md` no mesmo diretório do tópico.
- Para adicionar questões, crie o `*.questions.md` apontando para o `lessonId` da lição.
- Para adicionar resolução animável no futuro, prefira `### Solução` estruturada em vez de empilhar tudo em `### Explicação`.
- O app lê as lições pelo `topicId` e as questões pelo `lessonId`, então não é necessário editar o código para novo conteúdo se o frontmatter estiver correto.
- Não edite `src/generated/content-manifest.ts` nem `src/generated/question-manifest.ts` manualmente.
- Não use PDFs como dependência do runtime final.
