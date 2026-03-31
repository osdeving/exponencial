---
name: exponencial-content-authoring
description: Use when adding, removing, restructuring, or revising curriculum content, theory lessons, exercises, or answer keys in Exponencial. Prefer Markdown and declarative content sources; avoid touching React components unless the renderer contract truly needs to change.
---

# Exponencial Content Authoring

Leia nesta ordem:

1. `AGENTS.md`
2. `docs/architecture.md`
3. `docs/content-authoring.md`

## Regra principal

O site deve ser tratado como renderer. Se a mudança puder ser resolvida na fonte de conteúdo, **não mexa na UI**.

## Onde editar

- tópico: `src/content/**/_topic.md`
- lição teórica: `src/content/**/*.md`
- exercícios e gabaritos: `src/content/**/*.questions.md`
- scaffold curricular: `scripts/curriculum-seed.mjs`
- parser de questões: `scripts/question-utils.mjs`

Se a questão precisar de resolução passo a passo:

- use `### Solução`
- prefira o schema estruturado em JSON dentro do Markdown
- use tipos como `markdown`, `equation`, `scratchpad` e `algorithm`

## Nunca faça

- não edite `src/generated/content-manifest.ts`
- não espalhe texto curricular em TSX
- não dependa de PDF no runtime

## Fluxo

1. Identifique se a mudança é teoria, scaffold ou exercício.
2. Edite a fonte mínima possível.
3. Gere/valide o manifesto com `npm run content:generate`.
4. Rode `npm run lint`.
5. Rode `npm run build`.

## Observação importante

O projeto já usa um pipeline declarativo para currículo, teoria, exercícios e gabaritos.

Se a solicitação for editorial, siga o modelo atual do repositório e altere conteúdo antes de pensar em UI.
