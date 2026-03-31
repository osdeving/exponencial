# AGENTS.md

## Objetivo deste repositório

O Exponencial deve evoluir para um modelo em que o site funciona como **renderer** e o conteúdo vem de fontes declarativas. A preferência operacional é sempre:

1. mudar conteúdo
2. regenerar manifesto
3. evitar mexer na UI

## Ordem de leitura para IA

Leia estes arquivos antes de editar:

1. [docs/architecture.md](docs/architecture.md)
2. [docs/content-authoring.md](docs/content-authoring.md)
3. o skill mais adequado em `.codex/skills/`

## Onde mexer

### Currículo e teoria

- tópicos: `src/content/**/_topic.md`
- lições: `src/content/**/*.md`
- scaffold base: `scripts/curriculum-seed.mjs`

### Geração

- parser e manifesto: `scripts/content-utils.mjs`
- geração do manifesto: `scripts/generate-content-manifest.mjs`
- scaffold automático: `scripts/scaffold-curriculum.mjs`

### Exercícios e gabaritos

Estado atual:

- ainda vivem em `src/content/exercises/*.ts`

Então:

- se a mudança for em teoria, não edite TS
- se a mudança for em exercícios, edite só o banco correspondente

### UI e comportamento

- shell e navegação: `src/App.tsx`
- renderer markdown: `src/components/MarkdownContent.tsx`
- teoria: `src/components/LessonView.tsx`
- prática: `src/components/ExerciseView.tsx`
- progresso e regras: `src/lib/learning.ts`
- tutor local: `src/lib/tutor.ts`

## Regras operacionais

- Nunca editar `src/generated/content-manifest.ts` manualmente.
- Nunca misturar conteúdo curricular em componentes React se a alteração puder viver em conteúdo/configuração.
- Não commitar PDFs de origem nem artefatos de OCR.
- `public/materials/` não faz parte do fluxo final e não deve voltar a ser dependência da app.
- Mudanças em conteúdo devem validar:
  - `npm run content:generate`
  - `npm run lint`
  - `npm run build`

## Limites atuais da arquitetura

O projeto ainda não chegou no estado ideal. Ao mexer, trate estes pontos como dívida conhecida:

- `src/App.tsx` está grande e concentra muita orquestração.
- `src/data.ts` ainda mistura currículo, configuração e mocks.
- exercícios e gabaritos ainda não são Markdown-first.

## Regra de decisão

Se o pedido do usuário for:

- **"adicionar/remover lição"**: mexa em `src/content/**`
- **"mudar texto"**: mexa em Markdown
- **"mudar exercício/gabarito"**: mexa em `src/content/exercises/*.ts`
- **"mudar regra de progresso ou busca"**: mexa em `src/lib/learning.ts`
- **"mudar visual/comportamento"**: mexa em componentes e extraia lógica de `App.tsx` em vez de inflá-lo ainda mais

## Padrão desejado

- conteúdo em arquivos declarativos
- regras em `lib/`
- UI em componentes pequenos
- arquivos gerados tratados como saída, não como fonte
