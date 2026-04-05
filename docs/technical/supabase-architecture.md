# Arquitetura Supabase

## Objetivo

Definir como Supabase deve ser usado como backend principal do Exponencial.

## Serviços previstos

- Supabase Auth
- Supabase Postgres
- Supabase Storage
- funções server-side e jobs agendados quando necessários

## Domínios de dados

### 1. Identidade

Tabelas recomendadas:

- `profiles`
- `user_preferences`
- `user_sessions_audit`

Responsabilidade:

- dados básicos do aluno
- preferências de objetivo e uso
- trilha mínima de autenticação

### 2. Conteúdo publicado

Tabelas recomendadas:

- `content_releases`
- `content_topics`
- `content_lessons`
- `content_question_sets`

Buckets recomendados:

- `content-theory`
- `content-questions`
- `content-assets`

Responsabilidade:

- versionar releases
- expor manifesto ativo
- armazenar teoria e exercícios publicados

### 3. Aprendizagem e progresso

Tabelas recomendadas:

- `lesson_attempts`
- `lesson_progress`
- `topic_progress`
- `mastery_records`
- `open_mode_events`

Responsabilidade:

- registrar tentativas
- calcular e persistir domínio
- manter estado de progressão
- registrar overrides de modo aberto

### 4. Revisão e retenção

Tabelas recomendadas:

- `review_queue`
- `review_events`
- `review_policies`

Responsabilidade:

- agendar revisão
- manter fila do usuário
- registrar execução e resultado de revisão

### 5. Gamificação e ranking

Tabelas recomendadas:

- `user_points_ledger`
- `user_badges`
- `leaderboard_snapshots`

Responsabilidade:

- materializar pontuação
- registrar badges
- expor ranking

### 6. Auditoria

Tabelas recomendadas:

- `audit_events`
- `content_publish_audit`

Responsabilidade:

- registrar autenticação, publicação, bloqueios, revisões e overrides

## Regras de acesso

### Princípios de RLS

- usuário só lê e escreve dados próprios de progresso
- conteúdo publicado pode ter leitura pública controlada
- publicação e rollback exigem papel operacional adequado
- auditoria não deve ser exposta ao usuário final sem filtragem apropriada

## Jobs e automações recomendados

### Review scheduler

Responsabilidade:

- calcular revisões vencidas e futuras

### Leaderboard refresh

Responsabilidade:

- consolidar ranking a partir do ledger de pontuação

### Content release publish

Responsabilidade:

- registrar release nova e ativá-la

## Fluxos principais no backend

### Login

- Supabase Auth autentica
- app carrega `profiles` e `user_preferences`

### Tentativa

- frontend envia tentativa
- backend persiste em `lesson_attempts`
- atualiza `lesson_progress`, `topic_progress` e `mastery_records`

### Revisão

- scheduler atualiza `review_queue`
- frontend lê fila do usuário
- conclusão da revisão gera `review_events`

### Publicação de conteúdo

- pipeline sobe artefatos para storage
- cria registro em `content_releases`
- ativa release

## Observações de modelagem

- tentativas devem carregar `content_release_id`
- ranking deve preferir snapshot/materialização, não cálculo pesado a cada requisição
- regras de domínio e revisão devem ser explicitamente versionáveis quando crescerem

## Integrações críticas

- Auth <-> perfil
- progresso <-> release de conteúdo
- revisão <-> domínio
- ranking <-> ledger de pontos

## Riscos e cuidados

- misturar conteúdo draft com conteúdo publicado
- recalcular ranking de forma síncrona demais
- deixar RLS incompleta nas tabelas de usuário
- não versionar release de conteúdo nas tentativas
