---
name: exponencial-ui-maintenance
description: Use when changing Exponencial's React UI, navigation, persistence, renderer behavior, or architectural boundaries. Keep content out of components, prefer extraction over inflating App.tsx, and preserve the renderer-first model.
---

# Exponencial UI Maintenance

Leia nesta ordem:

1. `AGENTS.md`
2. `docs/architecture.md`
3. o componente ou módulo de domínio diretamente relacionado à tarefa

## Objetivo

Mudanças de UI devem preservar estas fronteiras:

- conteúdo em `src/content/**` ou `src/content/exercises/*.ts`
- regras em `src/lib/**`
- composição e configuração em `src/data.ts`
- renderização em `src/components/**`

## Regras

- não coloque texto curricular em componentes
- não edite arquivos gerados manualmente
- se `App.tsx` crescer mais por causa da tarefa, extraia lógica para hooks, helpers ou componentes de tela
- prefira funções puras em `src/lib/**` para busca, progresso, navegação derivada e transformação de dados

## Quando extrair

Extraia de `App.tsx` quando a mudança introduzir:

- estado novo reutilizável
- regra de negócio
- fluxo de navegação com lógica própria
- transformação não trivial de dados

## Validação mínima

1. `npm run lint`
2. `npm run build`
3. se a mudança afetar fluxo principal, faça smoke test local

## Dívida conhecida

- `src/App.tsx` está maior do que deveria
- `src/data.ts` ainda mistura camadas

Ao tocar nessas áreas, melhore a separação em vez de aprofundar o acoplamento.
