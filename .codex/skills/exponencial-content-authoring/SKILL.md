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
- scaffold curricular: `scripts/curriculum-seed.mjs`
- exercícios e gabaritos no estado atual: `src/content/exercises/*.ts`

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

O projeto ainda está híbrido:

- teoria já está em Markdown
- exercícios ainda estão em TypeScript

Não invente um pipeline novo no meio de uma tarefa pequena. Se a solicitação for editorial, siga o modelo atual do repositório.
