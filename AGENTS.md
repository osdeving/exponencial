# AGENTS.md

## Objetivo deste repositório

O Exponencial deve evoluir para um modelo em que o site funciona como **renderer** e o conteúdo vem de fontes declarativas. A preferência operacional é sempre:

1. mudar conteúdo
2. regenerar manifesto
3. evitar mexer na UI

## Ordem de leitura para IA

Leia estes arquivos antes de editar:

1. [docs/architecture.md](docs/architecture.md)
2. [docs/product/README.md](docs/product/README.md) se a tarefa tocar roadmap, releases, produto ou operação
3. [docs/delivery/trunk-based-delivery.md](docs/delivery/trunk-based-delivery.md) se a tarefa tocar GitHub, CI/CD ou fluxo de merge
4. [docs/content-authoring.md](docs/content-authoring.md)
5. [docs/estrutura/00_README.md](docs/estrutura/00_README.md) se a tarefa for curricular ou de taxonomia
6. o skill mais adequado em `.codex/skills/`

## Onde mexer

### Currículo e teoria

- tópicos: `src/content/**/_topic.md`
- lições: `src/content/**/*.md`
- exercícios/gabaritos: `src/content/**/*.questions.md`
- scaffold base: `scripts/curriculum-seed.mjs`
- taxonomia canônica: `docs/estrutura/*`

### Geração

- parser e manifesto: `scripts/content-utils.mjs`
- parser de questões: `scripts/question-utils.mjs`
- leitura da taxonomia: `scripts/canonical-taxonomy.mjs`
- geração do manifesto: `scripts/generate-content-manifest.mjs`
- scaffold automático: `scripts/scaffold-curriculum.mjs`

### Exercícios e gabaritos

Estado atual:

- vivem em arquivos `*.questions.md` ao lado das lições

Então:

- se a mudança for em teoria, edite a lição `.md`
- se a mudança for em exercícios, edite só o `*.questions.md` correspondente
- se houver resolução passo a passo, prefira `### Solução` estruturada em vez de inflar `### Explicação`

### UI e comportamento

- shell e composição: `src/App.tsx`
- coordenação de navegação: `src/app/navigation/*`
- coordenação de catálogo: `src/app/catalog/*`
- coordenação de progresso: `src/app/progress/*`
- coordenação de perfil: `src/app/profile/*`
- composição de alto nível: `src/app/useAppController.ts`
- persistência: `src/app/usePersistent*.ts`, `src/app/usePersistentState.ts`
- views da aplicação: `src/app/views/*`
- configuração de produto: `src/config/*`
- conteúdo lazy: `src/content/index.ts`, `src/content/queries.ts`, `src/content/useLessonContent.ts`, `src/content/useLessonQuestions.ts`
- renderer markdown: `src/components/MarkdownContent.tsx`
- renderer de solução de questão: `src/components/QuestionSolutionView.tsx`
- teoria: `src/components/LessonView.tsx`
- prática: `src/components/ExerciseView.tsx`, `src/components/exercise/*`
- progresso e regras: `src/lib/learning.ts`
- tutor local: `src/lib/tutor.ts`

### Produto, roadmap e entrega

- visão e releases: `docs/product/vision-roadmap.md`
- escopo funcional: `docs/product/functional-spec.md`
- requisitos não funcionais: `docs/product/non-functional-requirements.md`
- fluxo trunk-based e releases: `docs/delivery/trunk-based-delivery.md`
- GitHub templates e workflows: `.github/*`

## Regras operacionais

- Nunca editar `src/generated/content-manifest.ts` manualmente.
- Nunca editar `src/generated/lesson-content-index.ts` ou `src/generated/question-index.ts` manualmente.
- Nunca editar `src/generated/canonical-taxonomy.ts` ou `src/generated/topic-taxonomy.ts` manualmente.
- Nunca misturar conteúdo curricular em componentes React se a alteração puder viver em conteúdo/configuração.
- Não commitar PDFs de origem nem artefatos de OCR.
- `public/materials/` não faz parte do fluxo final e não deve voltar a ser dependência da app.
- Mudanças em conteúdo devem validar:
  - `npm run content:scaffold` se a grade base tiver mudado
  - `npm run content:generate`
  - `npm run lint`
  - `npm run build`

## Limites atuais da arquitetura

O projeto ainda não chegou no estado ideal. Ao mexer, trate estes pontos como dívida conhecida:

- `src/app/useAppController.ts` agora é uma composição mais fina, mas ainda junta hooks de navegação, catálogo, perfil e progresso.
- `src/components/QuestionSolutionView.tsx` já suporta passos estruturados, mas ainda não anima escrita caractere a caractere nem desenhos matemáticos.
- ranking e trilhas continuam estáticos em `src/config/*`; se crescerem muito, extraia contratos e fontes dedicadas.
- a cobertura canônica ampla depende de `docs/estrutura/*` e de `canonicalIds` explícitos no frontmatter de tópicos e lições; não reintroduza ponte implícita em script.
- autenticação, perfis persistidos, domínio auditável e repetição espaçada ainda não saíram do roadmap para implementação.

## Regra de decisão

Se o pedido do usuário for:

- **"adicionar/remover lição"**: mexa em `src/content/**`
- **"mudar texto"**: mexa em Markdown
- **"mudar exercício/gabarito"**: mexa em `src/content/**/*.questions.md`
- **"expandir ou reorganizar a grade base"**: mexa em `docs/estrutura/*`, atualize os `canonicalIds` necessários em `src/content/**` e rode `npm run content:scaffold`
- **"mudar resolução passo a passo"**: mexa primeiro em `src/content/**/*.questions.md`; só depois ajuste `QuestionSolutionView` se o schema não cobrir o caso
- **"mudar regra de progresso ou busca"**: mexa em `src/lib/learning.ts`
- **"mudar roadmap, releases, PRD, histórias ou fluxo GitHub"**: mexa primeiro em `docs/product/*`, `docs/delivery/*` e `.github/*`
- **"mudar visual/comportamento"**: mexa em `src/app/*` e `src/components/*`, extraindo lógica do controller em vez de reinflar o shell

## Padrão desejado

- conteúdo em arquivos declarativos
- regras em `lib/`
- UI em componentes pequenos
- arquivos gerados tratados como saída, não como fonte
