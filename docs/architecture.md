# Arquitetura do Exponencial

## Objetivo de produto

O estado desejado do projeto é:

- o site ser um **renderer** de conteúdo
- teoria, exercícios e gabaritos virem de fontes declarativas
- a UI mudar pouco quando o currículo crescer
- agentes e IAs conseguirem operar lendo poucos arquivos de orientação

## Como o projeto funciona hoje

### 1. Fonte de conteúdo

- **Tópicos e lições**: `src/content/**/_topic.md` e `src/content/**/*.md`
- **Exercícios e gabaritos**: `src/content/exercises/*.ts`

Hoje o sistema é híbrido. A teoria já é Markdown-first. A prática ainda não.

### 2. Geração

- `scripts/content-utils.mjs`: utilitários de frontmatter e filesystem
- `scripts/generate-content-manifest.mjs`: lê Markdown e gera `src/generated/content-manifest.ts`
- `scripts/scaffold-curriculum.mjs`: cria estrutura inicial sem sobrescrever conteúdo existente
- `scripts/curriculum-seed.mjs`: semente declarativa do scaffold

### 3. Composição de dados

- `src/data.ts` junta:
  - `TOPICS` e `LESSONS` gerados
  - bancos de questões
  - badges
  - trilhas
  - ranking mockado

Essa camada é um ponto de composição, mas hoje ainda mistura currículo com configuração de produto.

### 4. Domínio e regras

- `src/lib/learning.ts`: busca, progresso, badges, recomendação, trilhas
- `src/lib/questions.ts`: interpretação de questões
- `src/lib/tutor.ts`: tutor local baseado em regras

Esses arquivos já seguem uma divisão melhor de responsabilidade do que `App.tsx`.

### 5. Renderer/UI

- `src/App.tsx`: shell da aplicação, navegação e orquestração de estado
- `src/components/*`: telas e blocos de interface
- `src/components/MarkdownContent.tsx`: renderer de Markdown + KaTeX

## Avaliação de extensibilidade e manutenção

### Onde o projeto está bem

- **Teoria em Markdown**: adicionar ou remover lições já é simples e escalável.
- **Manifesto gerado**: evita duplicação manual entre conteúdo e UI.
- **Regras em `lib/`**: progresso, badges e recomendações não estão espalhados por componentes.
- **Renderer único de Markdown**: facilita manter KaTeX, links e layout da teoria em um só lugar.

### Onde o projeto ainda não está no ponto ideal

- **Exercícios e gabaritos não são Markdown-first**.
  - Hoje ainda exigem edição em TypeScript.
  - Isso quebra a meta de "mexer só em texto".
- **`src/App.tsx` está grande demais**.
  - Hoje ele centraliza navegação, persistência, busca e vários handlers.
  - Em escala, isso dificulta refactor, teste e orientação para IA.
- **`src/data.ts` mistura coisas demais**.
  - Questões, trilhas, badges e mocks convivem na mesma composição.
  - Isso aumenta acoplamento entre currículo e produto.
- **Há ativos de origem impressa fora do fluxo final**.
  - PDFs e imagens intermediárias não devem fazer parte do ciclo normal de manutenção.

## Resposta objetiva

### O projeto atual é extensível e manutenível?

**Parcialmente.**

Ele já é bom para escalar **teoria** e estrutura curricular. Ainda não está bom o suficiente para dizer que o site é "apenas um renderer" de ponta a ponta, porque **exercícios, gabaritos e parte da configuração pedagógica ainda estão no código**.

## Meta recomendada para o próximo estágio

Para ficar no modelo que você quer, o alvo técnico deveria ser este:

1. **Tudo curricular fora da UI**
   - teoria em Markdown
   - exercícios em arquivo declarativo por lição ou por tópico
   - gabaritos no mesmo fluxo declarativo

2. **UI só renderiza contratos estáveis**
   - `Topic[]`
   - `Lesson[]`
   - `Question[]`
   - `LearningPath[]`
   - `Badge[]`

3. **Shell enxuto**
   - `App.tsx` vira composição de telas e hooks
   - regras ficam em `lib/` ou hooks dedicados

## Refactors prioritários para atingir esse alvo

### Prioridade 1

Migrar `src/content/exercises/*.ts` para um pipeline declarativo.

Opções válidas:

- Markdown com frontmatter por conjunto de exercícios
- JSON/YAML por lição
- Markdown da teoria com seção de questões acoplada e parser dedicado

O importante não é o formato exato. O importante é remover a dependência de editar TypeScript para atualizar prática e gabarito.

### Prioridade 2

Quebrar `src/App.tsx` em camadas menores.

Sugestão mínima:

- `src/app/useAppState.ts`
- `src/app/usePersistentProfile.ts`
- `src/app/usePersistentProgress.ts`
- `src/app/AppShell.tsx`
- `src/app/views/*`

### Prioridade 3

Separar configuração de produto de conteúdo acadêmico.

Exemplos:

- `src/config/paths.ts`
- `src/config/badges.ts`
- `src/config/ranking.ts`

## Mapa de mudança

Se você quer:

- **adicionar ou remover tópico**: edite `src/content/.../_topic.md`
- **adicionar ou remover lição teórica**: edite `src/content/**/*.md`
- **alterar scaffold base**: edite `scripts/curriculum-seed.mjs`
- **alterar parser/manifesto**: edite `scripts/generate-content-manifest.mjs`
- **alterar exercícios/gabaritos hoje**: edite `src/content/exercises/*.ts`
- **alterar regra de progresso**: edite `src/lib/learning.ts`
- **alterar renderer de teoria**: edite `src/components/MarkdownContent.tsx`
- **alterar layout e navegação**: edite `src/App.tsx` e `src/components/*`

## Regras de manutenção

- Nunca editar `src/generated/content-manifest.ts` manualmente.
- Mudança curricular não deve entrar em componente React se puder ser resolvida na fonte de conteúdo.
- Conteúdo novo não deve depender de PDF no runtime.
- PDFs de origem devem ficar fora do commit normal.
- Toda alteração de conteúdo deve passar por:
  - `npm run content:generate`
  - `npm run lint`
  - `npm run build`

## O que uma IA deve concluir rapidamente ao ler este arquivo

- A teoria já é content-driven.
- Exercícios ainda não são.
- O renderer existe, mas o modelo alvo ainda não foi concluído.
- O melhor lugar para mexer depende do tipo de mudança.
- `App.tsx` e `src/data.ts` são os principais pontos de atenção em escala.
