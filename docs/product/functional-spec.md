# Especificação Funcional

## Escopo

Este documento descreve como o produto deve se comportar do ponto de vista funcional.

Ele responde:

- o que o sistema precisa permitir fazer
- quais são as jornadas principais do usuário
- quais regras estruturam a experiência
- quais domínios funcionais compõem o produto

Os requisitos rastreáveis vivem no [RMS](rms.md). As histórias detalhadas vivem em [stories.md](stories.md).

## Atores

### Aluno

Usuário principal do sistema. Estuda teoria, resolve exercícios, acompanha progresso, aceita ou não o modo aberto e executa revisões.

### Autor de conteúdo

Mantém teoria e exercícios em Markdown, publica conteúdo e corrige material sem precisar alterar o frontend.

### Operador de produto

Planeja fases, define critérios de aceite, acompanha backlog, métricas e releases.

### Administrador da plataforma

Opera autenticação, segurança, dados, rotinas de publicação, auditoria e observabilidade.

## Jornadas principais

### 1. Acesso e onboarding

Fluxo esperado:

1. o aluno se cadastra ou faz login
2. escolhe objetivo e preferências iniciais
3. entra na plataforma com trilha recomendada
4. passa a ter progresso associado à própria conta

### 2. Exploração curricular

Fluxo esperado:

1. o aluno navega pela grade curricular até o ensino médio
2. filtra por etapa, ramo, objetivo ou status
3. escolhe tópico, lição ou trilha
4. enxerga claramente o que já estudou e o que ainda falta

### 3. Estudo de teoria

Fluxo esperado:

1. o app carrega a lição publicada
2. renderiza a teoria em Markdown com matemática
3. exibe metadados da lição
4. oferece entrada natural para a prática

### 4. Prática e avaliação

Fluxo esperado:

1. o aluno responde exercícios
2. o sistema corrige ou registra autocorreção conforme o tipo
3. persiste tentativa, score e resultado
4. apresenta gabarito e solução quando aplicável

### 5. Progressão guiada por domínio

Fluxo esperado:

1. o sistema avalia se o domínio mínimo foi alcançado
2. se sim, libera a próxima etapa habitual
3. se não, informa bloqueio e próximos passos
4. o aluno entende o motivo do bloqueio

### 6. Revisão e retenção

Fluxo esperado:

1. o sistema identifica o que precisa ser revisado
2. monta uma fila diária priorizada
3. recomenda revisão antes do próximo conteúdo novo quando fizer sentido
4. atualiza o estado de domínio após a revisão

### 7. Modo aberto deliberado

Fluxo esperado:

1. o aluno tenta abrir tudo
2. o sistema explica que isso não representa a proposta pedagógica padrão
3. só após confirmação explícita o bloqueio é suspenso
4. a decisão fica auditável e reversível

### 8. Gamificação e ranking

Fluxo esperado:

1. pontos, streaks e badges refletem o estudo realizado
2. o ranking é derivado de dados persistidos
3. o aluno vê sinais de progresso individual e social

### 9. Publicação editorial

Fluxo esperado:

1. o autor altera arquivos Markdown
2. a alteração passa por validação e publicação
3. uma nova release de conteúdo é disponibilizada
4. o app busca a versão publicada em runtime, sem exigir redeploy do shell

## Domínios funcionais

### D1. Identidade e sessão

- cadastro por email e senha
- login
- logout
- recuperação de sessão
- login social inicial
- perfil de aluno associado à identidade autenticada

### D2. Catálogo curricular

- grade curricular completa até o ensino médio
- filtros
- busca
- trilhas
- visão de status por tópico e lição

### D3. Conteúdo em runtime

- manifesto publicado de conteúdo
- teoria em Markdown
- exercícios em Markdown estruturado
- carregamento sob demanda
- versionamento de conteúdo

### D4. Progresso e persistência

- progresso em nuvem
- continuação entre dispositivos
- histórico de tentativas
- indicadores por lição, tópico e trilha

### D5. Domínio e gating

- limiar mínimo de domínio
- bloqueio da sequência padrão
- explicação de bloqueio
- override deliberado por modo aberto

### D6. Retenção e revisão

- agendamento de revisão
- fila diária
- priorização por risco de esquecimento
- histórico de revisão

### D7. Gamificação

- pontos
- streak
- badges
- ranking

### D8. Operação editorial e técnica

- publicação de conteúdo em Markdown
- rollback de release de conteúdo
- telemetria
- auditoria
- governança de release

## Regras funcionais principais

### RF-01

O sistema deve representar o currículo escolar de matemática até o ensino médio em uma estrutura navegável por etapa, tópico, lição e trilha.

### RF-02

O sistema deve buscar teoria e exercícios em runtime a partir de uma release publicada de conteúdo.

### RF-03

Mudanças editoriais em Markdown não devem exigir redeploy do frontend quando o contrato de conteúdo permanecer estável.

### RF-04

O sistema deve autenticar usuários e associar todo progresso a uma identidade persistida.

### RF-05

O sistema deve persistir progresso, tentativas, domínio e fila de revisão em nuvem.

### RF-06

O sistema deve apresentar sensação de progresso por lição, tópico, trilha e cobertura global.

### RF-07

O sistema deve bloquear a sequência padrão quando o aluno não comprovar domínio mínimo.

### RF-08

O sistema deve explicar o motivo do bloqueio e indicar o próximo passo recomendado.

### RF-09

O sistema deve permitir um modo aberto, mas só após confirmação deliberada do usuário.

### RF-10

O sistema deve manter uma heurística de revisão ligada a risco de esquecimento e transformá-la em fila diária de revisão.

### RF-11

O sistema deve priorizar revisão vencida quando ela for mais importante do que avançar em conteúdo novo.

### RF-12

O sistema deve expor gamificação coerente com estudo real: pontos, streak, badges e ranking.

### RF-13

O sistema deve registrar eventos suficientes para auditoria de autenticação, progresso, gating, modo aberto, revisão e publicação de conteúdo.

## Artefatos obrigatórios por feature

Cada feature que entrar em desenvolvimento deve ter, no mínimo:

- fase alvo
- história ou conjunto de histórias
- critério de aceite
- impacto em dados e integrações
- impacto em telemetria e auditoria
- atualização de RMS, DAS e CDT quando necessário

## Fora de escopo imediato

- CMS visual completo
- autoria diretamente no app do aluno
- múltiplos papéis corporativos avançados
- marketplace de conteúdo
- editor matemático visual rico como requisito de fase inicial
