# Fases e Estimativas

## Objetivo

Dividir a evolução do Exponencial em fases executáveis e estimáveis.

## Premissas de estimativa

Estas estimativas assumem:

- equipe base com 2 engenheiros full-stack
- apoio parcial de produto/UX
- apoio parcial de QA ou automação de testes
- reaproveitamento do repositório atual como base de frontend
- Supabase como stack principal de backend

As estimativas abaixo não são compromisso fechado. São faixas de planejamento.

## Resumo por fase

| Fase | Objetivo | Dependências principais | Esforço estimado | Duração provável |
| --- | --- | --- | --- | --- |
| F0 | Baseline documental e alinhamento | nenhuma | 1 a 2 dev-semanas | 1 semana |
| F1 | Identidade e base cloud | F0 | 4 a 6 dev-semanas | 2 a 3 semanas |
| F2 | Conteúdo remoto em Markdown | F1 | 6 a 8 dev-semanas | 3 a 4 semanas |
| F3 | Progresso cloud, domínio e gating | F1 + F2 | 8 a 10 dev-semanas | 4 a 5 semanas |
| F4 | Retenção e revisão | F3 | 8 a 10 dev-semanas | 4 a 5 semanas |
| F5 | Gamificação e ranking | F3 | 6 a 8 dev-semanas | 3 a 4 semanas |
| F6 | Hardening e readiness operacional | F1 a F5 | 4 a 6 dev-semanas | 2 a 3 semanas |

## Detalhamento por fase

### F0 - Baseline documental e alinhamento

Entregas:

- visão, RMS, histórias, NFR, DAS, técnico e CDT
- backlog inicial pronto para decomposição

Riscos:

- ambiguidade remanescente em regras de domínio e heurística de revisão

### F1 - Identidade e base cloud

Entregas:

- cadastro e login por email/senha
- login social inicial
- perfil cloud
- sessão persistida
- baseline de RLS

Riscos:

- edge cases de autenticação social
- política de contas duplicadas

### F2 - Conteúdo remoto em Markdown

Entregas:

- manifesto publicado em runtime
- storage/versionamento de teoria e exercícios
- pipeline de validação e publicação
- rollback de release de conteúdo

Riscos:

- contrato de conteúdo insuficiente para todos os casos reais
- custo de invalidar cache e distribuir nova release

### F3 - Progresso cloud, domínio e gating

Entregas:

- tentativas e progresso em nuvem
- modelo de domínio por habilidade
- gating por domínio
- explicação de bloqueio
- modo aberto deliberado

Riscos:

- ajuste fino de limiar de domínio
- transição do estado local para cloud

### F4 - Retenção e revisão

Entregas:

- fila diária de revisão
- scheduler de revisão
- heurística inicial de esquecimento
- histórico e telemetria de revisão

Riscos:

- calibragem da heurística
- ruído na recomendação principal

### F5 - Gamificação e ranking

Entregas:

- pontos
- streak
- badges
- ranking

Riscos:

- incentivos errados de pontuação
- abuso ou gaming do ranking

### F6 - Hardening e readiness

Entregas:

- observabilidade ampliada
- auditoria
- tuning de performance
- acessibilidade
- rollout operacional

Riscos:

- custo extra de estabilização
- dívida acumulada das fases anteriores

## Linha de corte recomendada

### MVP de produto

F1 + F2 + F3 + F4.

Esforço acumulado:

- 26 a 34 dev-semanas

Duração provável com a equipe-base:

- 13 a 17 semanas

### Produto mais forte para escala e engajamento

MVP + F5 + F6.

Esforço acumulado:

- 36 a 48 dev-semanas

Duração provável com a equipe-base:

- 18 a 24 semanas

## Dependências críticas

- F2 depende de decisão estável sobre contrato de conteúdo
- F3 depende de F1 e F2 porque progresso cloud precisa conhecer usuário e release de conteúdo
- F4 depende do domínio já modelado em F3
- F5 depende de eventos e persistência corretos em F3
- F6 depende do fechamento mínimo das regras dos domínios anteriores

## Estratégia de planejamento

Cada fase deve ser quebrada em:

1. épicos
2. histórias
3. fatias pequenas com critério de aceite
4. cenários correspondentes no CDT

## Recomendação de execução

Não atacar múltiplas fases em paralelo no começo.

Ordem recomendada:

1. F1
2. F2
3. F3
4. F4
5. F5
6. F6

Motivo:

- identidade, conteúdo runtime e progresso cloud são a espinha do produto
- revisão e gamificação só fazem sentido quando essa espinha estiver estável
