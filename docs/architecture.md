# Arquitetura do Exponencial

## Objetivo de produto

O estado desejado do projeto é:

- o site ser um **renderer** de conteúdo
- teoria, exercícios e gabaritos virem de fontes declarativas
- a UI mudar pouco quando o currículo crescer
- agentes e IAs conseguirem operar lendo poucos arquivos de orientação

## Como o projeto funciona hoje

### 1. Fonte de conteúdo

- **Tópicos**: `src/content/**/_topic.md`
- **Lições**: `src/content/**/*.md`
- **Exercícios e gabaritos**: `src/content/**/*.questions.md`

Hoje o currículo principal já é declarativo de ponta a ponta.

O setup inicial agora é guiado por duas camadas:

- `scripts/curriculum-seed.mjs`: semente editorial dos tópicos mais curados
- `docs/estrutura/*`: taxonomia canônica ampla, usada para scaffoldar o restante da grade

### 2. Geração

- `scripts/content-utils.mjs`: utilitários de frontmatter e filesystem
- `scripts/question-utils.mjs`: parser de exercícios e gabaritos declarativos
- `scripts/canonical-taxonomy.mjs`: leitura da taxonomia canônica e montagem do scaffold complementar
- `scripts/generate-content-manifest.mjs`: lê Markdown e gera:
  - `src/generated/content-manifest.ts`
  - `src/generated/lesson-content-index.ts`
  - `src/generated/question-index.ts`
  - `src/generated/canonical-taxonomy.ts`
  - `src/generated/topic-taxonomy.ts`
  - `src/generated/lessons/*`
  - `src/generated/questions/*`
- `scripts/scaffold-curriculum.mjs`: cria estrutura inicial sem sobrescrever conteúdo existente
- `scripts/curriculum-seed.mjs`: semente declarativa do scaffold

### 3. Composição de dados

- `src/content/index.ts` expõe:
  - `TOPICS`
  - `LESSONS`
- `src/generated/canonical-taxonomy.ts` expõe a taxonomia canônica já pronta para filtros e agrupamentos
- `src/generated/topic-taxonomy.ts` enriquece os tópicos do app com `canonicalIds`, ramo, perfis e faixas
- `src/content/queries.ts` oferece contagem e loaders lazy de teoria/questões por lição
- `src/content/useLessonContent.ts` e `src/content/useLessonQuestions.ts` fazem a ponte assíncrona para a UI
- `Question` já aceita `solution` estruturada para resolução passo a passo declarativa
- `src/config/*` separa:
  - `badges.ts`
  - `paths.ts`
  - `ranking.ts`

A composição deixou de depender de um arquivo-bal­de único.

### 4. Domínio e regras

- `src/lib/learning.ts`: busca, progresso, badges, recomendação, trilhas
- `src/lib/questions.ts`: interpretação de questões
- `src/lib/tutor.ts`: tutor local baseado em regras

Esses arquivos já seguem uma divisão melhor de responsabilidade do que `App.tsx`.

### 5. Renderer/UI

- `src/App.tsx`: shell fino que compõe as telas
- `src/app/useAppController.ts`: composição de hooks da aplicação
- `src/app/navigation/*`: navegação e seleção de telas
- `src/app/catalog/*`: busca e filtros
- `src/app/profile/*`: ações de perfil
- `src/app/progress/*`: fluxos de progresso e continuidade
- `src/app/usePersistentState.ts`: base única de persistência local
- `src/app/usePersistentProfile.ts`, `src/app/usePersistentProgress.ts` e `src/app/usePersistentTutorMessages.ts`: persistência normalizada
- `src/app/views/*`: telas grandes do app
- `src/components/*`: telas e blocos de interface
- `src/components/exercise/*`: sessão, modal de gabarito e fluxo de prática
- `src/components/MarkdownContent.tsx`: renderer de Markdown + KaTeX
- `src/components/QuestionSolutionView.tsx`: renderer de resolução estruturada com passos

## Avaliação de extensibilidade e manutenção

### Onde o projeto está bem

- **Currículo em Markdown**: adicionar ou remover lições e exercícios já é simples e escalável.
- **Grade ampla desde o início**: o scaffold canônico permite que filtros e agrupamentos existam antes da teoria definitiva.
- **Manifestos gerados**: evitam duplicação manual entre conteúdo e UI.
- **Carregamento lazy por lição**: teoria e prática deixaram de inflar o bundle inicial no mesmo nível de antes.
- **Regras em `lib/`**: progresso, badges e recomendações não estão espalhados por componentes.
- **Renderer único de Markdown**: facilita manter KaTeX, links e layout da teoria em um só lugar.

### Onde o projeto ainda não está no ponto ideal

- **Parte da configuração de produto ainda é estática**.
  - Trilhas, badges e ranking mockado vivem em `src/config/*`.
  - Se isso crescer muito, convém separar contratos, fontes e validação.
- **A solução passo a passo está preparada, mas não no estágio final de animação rica**.
  - O schema declarativo já existe.
  - O renderer já entende passos, rascunho e algoritmo.
  - O próximo salto seria animar escrita/desenho por tipo de passo.
- **Ainda existe espaço para reduzir o shell principal**.
  - `useAppController` já está mais fino.
  - Mesmo assim, navegação, perfil, catálogo e progresso ainda se encontram nele no ponto de composição.
- **Há ativos de origem impressa fora do fluxo final**.
  - PDFs e imagens intermediárias não devem fazer parte do ciclo normal de manutenção.

## Resposta objetiva

### O projeto atual é extensível e manutenível?

**Sim.**

Ele já está bom para escalar o **conteúdo curricular** porque teoria, exercícios, gabaritos e agora também soluções passo a passo saem de fonte declarativa. A UI está separada em shell, views, hooks e configuração. As dívidas que restam são de evolução, não mais de acoplamento bruto.

## Meta recomendada para o próximo estágio

Para ficar no modelo que você quer, o alvo técnico deveria ser este:

1. **Tudo curricular fora da UI**
  - teoria em Markdown
  - exercícios em `*.questions.md`
  - gabaritos no mesmo fluxo declarativo
  - taxonomia canônica em `docs/estrutura/*`
  - placeholders scaffoldados para tudo que ainda estiver em aberto

2. **UI só renderiza contratos estáveis**
   - `Topic[]`
   - `Lesson[]`
   - `Question[]` carregadas sob demanda
   - `LearningPath[]`
   - `Badge[]`

3. **Shell enxuto**
   - `App.tsx` vira composição de telas e hooks
   - regras ficam em `lib/` ou hooks dedicados

## Refactors prioritários para atingir esse alvo

### Prioridade 1

Evoluir o sistema de soluções estruturadas.

Sugestão mínima:

- ampliar o schema de `Question.solution`
- suportar animações por tipo de passo
- manter fallback para Markdown simples

### Prioridade 2

Evoluir `src/config/*` quando badges, trilhas e ranking deixarem de ser simples.

Exemplos:

- adicionar validação declarativa
- separar mocks de dados reais
- criar contratos por área

## Mapa de mudança

Se você quer:

- **adicionar ou remover tópico**: edite `src/content/.../_topic.md`
- **adicionar ou remover lição teórica**: edite `src/content/**/*.md`
- **adicionar ou remover exercício/gabarito**: edite `src/content/**/*.questions.md`
- **expandir a grade canônica inicial**: revise `docs/estrutura/*` e rode `npm run content:scaffold`
- **alterar scaffold base**: edite `scripts/curriculum-seed.mjs`
- **alterar parser/manifesto**: edite `scripts/generate-content-manifest.mjs`
- **alterar parser de exercícios**: edite `scripts/question-utils.mjs`
- **alterar solução passo a passo**: edite `src/content/**/*.questions.md` e, se necessário, `src/components/QuestionSolutionView.tsx`
- **alterar regra de progresso**: edite `src/lib/learning.ts`
- **alterar renderer de teoria**: edite `src/components/MarkdownContent.tsx`
- **alterar layout e navegação**: edite `src/app/*` e `src/components/*`

## Regras de manutenção

- Nunca editar `src/generated/content-manifest.ts`, `src/generated/lesson-content-index.ts`, `src/generated/question-index.ts`, `src/generated/canonical-taxonomy.ts` ou `src/generated/topic-taxonomy.ts` manualmente.
- Mudança curricular não deve entrar em componente React se puder ser resolvida na fonte de conteúdo.
- Conteúdo novo não deve depender de PDF no runtime.
- PDFs de origem devem ficar fora do commit normal.
- Toda alteração de conteúdo deve passar por:
  - `npm run content:scaffold` quando a mudança mexer na grade base
  - `npm run content:generate`
  - `npm run lint`
  - `npm run build`

## O que uma IA deve concluir rapidamente ao ler este arquivo

- Teoria, exercícios e gabaritos já são content-driven.
- A taxonomia canônica também participa do setup inicial do app.
- Soluções passo a passo também já entram por contrato declarativo.
- O renderer existe e consome contratos gerados, com teoria e prática lazy por lição.
- O principal débito agora está na evolução do renderer de solução, na configuração de produto e em manter `canonicalIds` explícitos no próprio conteúdo.
- O melhor lugar para mexer depende do tipo de mudança.
- `src/components/QuestionSolutionView.tsx` e `src/config/*` são os principais pontos de atenção em escala.
