---
name: exponencial-ui-maintenance
description: Use when changing Exponencial's React UI, navigation, persistence, renderer behavior, or architectural boundaries. Keep content out of components, prefer extraction over inflating App.tsx, and preserve the renderer-first model.
---

# Exponencial UI Maintenance

Leia nesta ordem:

1. `AGENTS.md`
2. `docs/architecture.md`
3. `docs/content-authoring.md` se a mudança tocar filtros, agrupamentos ou taxonomia
4. o componente ou módulo de domínio diretamente relacionado à tarefa

## Objetivo

Mudanças de UI devem preservar estas fronteiras:

- conteúdo em `src/content/**` e `src/content/**/*.questions.md`
- regras em `src/lib/**`
- configuração em `src/config/**`
- composição e shell em `src/app/**`
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

- `src/app/useAppController.ts` ainda coordena vários hooks
- algumas views recebem muitas props e devem continuar enxutas
- `src/components/QuestionSolutionView.tsx` deve concentrar a evolução de soluções animadas, não `ExerciseView.tsx`
- teoria e questões carregam por lição; preserve os loaders em `src/content/*` em vez de reintroduzir import monolítico
- o catálogo já considera taxonomia canônica, status e agrupamento por ramo; evolua isso a partir de `src/lib/learning.ts`, `src/content/index.ts` e dos scripts canônicos, não com listas manuais em componente

Ao tocar nessas áreas, melhore a separação em vez de aprofundar o acoplamento.
