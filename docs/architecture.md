# DAS - Desenho de Arquitetura de Software

## Objetivo

Definir a arquitetura-alvo do Exponencial para suportar:

- produto web multiusuário
- autenticação e progresso em nuvem
- conteúdo curricular publicado em Markdown e servido em runtime
- progressão por domínio, revisão e gamificação

Este documento é a referência arquitetural oficial do projeto.

## Escopo

Este DAS cobre:

- visão lógica do sistema
- fronteiras entre frontend, backend, dados e pipeline editorial
- integrações com Supabase
- decisões estruturais para auth, conteúdo, progresso, revisão e ranking

## Estado atual do repositório

Hoje o repositório já oferece uma base útil de frontend e domínio local:

- app React/Vite
- conteúdo em Markdown
- parser e manifesto gerado
- progresso local
- lógica local de domínio, gating e recovery

Essa base deve ser tratada como ponto de partida, não como arquitetura final.

## Estado-alvo da solução

No estado-alvo:

- o frontend continua sendo o renderer da experiência
- o conteúdo é publicado em Markdown, mas consumido em runtime
- Supabase concentra autenticação, dados, storage e jobs simples
- progresso, domínio, revisão, override e ranking passam a ser multiusuário

## Drivers arquiteturais

- conteúdo deve continuar declarativo
- ajuste editorial não deve exigir redeploy do shell web
- progresso precisa ser persistido por usuário e dispositivo
- bloqueio e revisão precisam ser explicáveis e auditáveis
- o sistema deve crescer sem voltar a acoplar conteúdo à UI

## Contexto da solução

```text
Autores/Operadores
  -> Repositório Markdown + Pipeline de publicação
  -> Supabase Storage + Postgres

Alunos
  -> Web App React
  -> Supabase Auth
  -> APIs / RPC / queries em Postgres
  -> Storage para teoria e exercícios publicados
```

## Visão lógica por módulos

### 1. Web App

Responsabilidades:

- autenticação do usuário
- catálogo curricular
- renderer de teoria e prática
- dashboard de progresso, revisão e gamificação
- UX de gating e modo aberto

Responsabilidade explícita que não pertence ao frontend:

- persistir regra de domínio “na mão”
- decidir publicação editorial
- materializar ranking sem contrato de backend

### 2. Identity & Session

Responsabilidades:

- cadastro e login
- login social
- recuperação de sessão
- perfil do aluno
- isolamento de dados por usuário

Tecnologia alvo:

- Supabase Auth

### 3. Content Runtime

Responsabilidades:

- expor release publicada de conteúdo
- servir manifesto em runtime
- servir teoria, exercícios e soluções sob demanda
- associar tentativa a uma versão publicada

Princípio:

- o app não depende de rebuild do frontend para mudança editorial

### 4. Learning Domain

Responsabilidades:

- tentativas
- progresso
- domínio por habilidade canônica
- critérios de passagem
- sequência padrão
- explicação de bloqueio
- estado do modo aberto

### 5. Retention Engine

Responsabilidades:

- heurística de esquecimento
- agenda de revisão
- fila diária
- histórico de revisão
- priorização da recomendação principal

### 6. Gamification & Leaderboard

Responsabilidades:

- pontos
- streak
- badges
- ranking
- regras mínimas anti-abuso

### 7. Publish Pipeline

Responsabilidades:

- validar Markdown
- montar release de conteúdo
- publicar manifesto e documentos
- permitir rollback

## Fluxos principais

### Fluxo A - Login e início de sessão

1. usuário autentica via Supabase Auth
2. frontend recebe sessão
3. app carrega perfil, preferências e estado resumido do aluno
4. tela inicial monta recomendação principal

### Fluxo B - Carregamento de conteúdo em runtime

1. app busca a release publicada corrente
2. app lê o manifesto da release
3. catálogo usa metadados do manifesto
4. teoria e exercícios são carregados sob demanda ao abrir a lição

### Fluxo C - Tentativa e persistência

1. aluno responde exercícios
2. frontend envia tentativa e contexto da release
3. backend persiste tentativa, progresso e domínio
4. app recebe estado atualizado

### Fluxo D - Gating e modo aberto

1. backend calcula se o próximo conteúdo da sequência padrão está liberado
2. se não estiver, app exibe bloqueio e motivo
3. o usuário pode habilitar modo aberto por confirmação deliberada
4. a decisão fica registrada

### Fluxo E - Revisão e retenção

1. jobs ou funções calculam revisões vencidas
2. itens entram na fila do usuário
3. home/dashboard priorizam a revisão quando aplicável
4. após revisão, o estado de retenção é atualizado

## Arquitetura de dados

### Blocos de dados principais

- identidade e perfil
- release de conteúdo
- progresso e tentativas
- domínio por habilidade
- fila de revisão
- gamificação e ranking
- auditoria

### Princípio de versionamento

Toda tentativa relevante deve carregar:

- `user_id`
- `lesson_id`
- `content_release_id`
- score e contexto da execução

Isso permite reconstruir o estado pedagógico e operacional de um aluno.

## Arquitetura de publicação de conteúdo

### Fonte canônica de autoria

- arquivos Markdown no repositório

### Processo-alvo

1. autor edita Markdown
2. pipeline valida frontmatter, questões e consistência
3. pipeline gera release publicada
4. release sobe para Supabase Storage/Postgres
5. frontend passa a buscar a nova release em runtime

### Consequência arquitetural

O shell web é desacoplado da release editorial.

## Arquitetura de implantação

### Camadas previstas

- frontend web publicado em hosting estático
- Supabase Auth
- Supabase Postgres
- Supabase Storage
- jobs agendados e funções server-side quando necessário

### Ambientes mínimos

- desenvolvimento
- homologação opcional quando o custo se justificar
- produção

## Segurança e isolamento

- autenticação centralizada
- RLS em dados de usuário
- leitura pública apenas para conteúdo publicado e metadados autorizados
- trilhas de auditoria para ações críticas

## Observabilidade

O sistema deve produzir sinais para:

- login e falha de login
- carregamento de conteúdo
- tentativa enviada
- bloqueio
- modo aberto
- revisão criada e concluída
- publicação de conteúdo

## Decisões arquiteturais principais

### DAS-DEC-001

Markdown continua sendo a fonte de autoria de teoria e exercícios.

### DAS-DEC-002

Supabase é o backend preferencial para auth, dados, storage e funções auxiliares.

### DAS-DEC-003

O frontend permanece como renderer e não volta a embutir conteúdo curricular no código.

### DAS-DEC-004

A progressão padrão é bloqueada por domínio, com modo aberto apenas como exceção deliberada.

### DAS-DEC-005

Conteúdo deve ser servido por release publicada em runtime, com rollback explícito.

### DAS-DEC-006

Tentativas e revisões precisam ser auditáveis por usuário e versão de conteúdo.

## Estratégia de transição

### Etapa 1

Manter o frontend atual e introduzir autenticação + persistência cloud.

### Etapa 2

Substituir a dependência do manifesto build-time por release publicada em runtime.

### Etapa 3

Migrar progresso, domínio, revisão e ranking para backend multiusuário.

## Relação com a documentação

Este DAS deve permanecer sincronizado com:

- [docs/product/rms.md](product/rms.md)
- [docs/product/stories.md](product/stories.md)
- [docs/product/cdt.md](product/cdt.md)
- [docs/technical/README.md](technical/README.md)
