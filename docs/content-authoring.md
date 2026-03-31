# Autoria de Conteúdo

Hoje o projeto usa **Markdown como fonte principal** de tópicos e lições.

Importante: **exercícios e gabaritos ainda não migraram totalmente para Markdown**. Eles continuam em `src/content/exercises/*.ts`. Isso é uma limitação conhecida da arquitetura atual.

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
```

- `_topic.md` define os metadados do tópico.
- Cada lição é um `.md` separado.
- O manifesto consumido pela aplicação é gerado automaticamente em `src/generated/content-manifest.ts`.
- Bancos de exercícios atuais ficam em `src/content/exercises/`.

## Comandos

```bash
npm run content:scaffold
npm run content:generate
npm run dev
npm run build
npm run lint
```

- `content:scaffold`: cria a base do currículo sem sobrescrever arquivos já existentes.
- `content:generate`: lê os `.md`, valida o frontmatter e gera o manifesto TypeScript.
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

## Fluxo recomendado

1. Escolha o tópico em `src/content/.../<topic-id>/`.
2. Edite ou crie a lição em Markdown.
3. Rode `npm run content:generate`.
4. Rode `npm run dev`.
5. Commit normalmente.

## Exercícios e gabaritos

O fluxo atual ainda é híbrido:

- **teoria**: `src/content/**/*.md`
- **exercícios/gabaritos**: `src/content/exercises/*.ts`

Enquanto a migração completa não existir, siga esta regra:

- se a mudança for só teoria, **não mexa na UI**
- se a mudança for exercício/gabarito, mexa apenas no banco correspondente em `src/content/exercises/`

## Observações

- Para adicionar um novo tópico, crie uma pasta nova com `_topic.md`.
- Para adicionar uma nova lição, crie um novo `.md` no mesmo diretório do tópico.
- O app lê as lições pelo `topicId`, então não é necessário editar o código para uma nova lição se o frontmatter estiver correto.
- Não edite `src/generated/content-manifest.ts` manualmente.
- Não use PDFs como dependência do runtime final.
