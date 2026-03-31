# Visão e Roadmap

## Visão do produto

O Exponencial não deve ser apenas um catálogo de aulas e listas. O alvo é uma plataforma de domínio matemático em que o aluno:

- sabe exatamente o que já domina e o que ainda deve
- só avança quando demonstra domínio mínimo
- é redirecionado para revisão quando o erro indica lacuna
- revisa no momento certo para não esquecer
- enxerga progresso real até "zerar" a matemática coberta pela plataforma

## Estado atual

Hoje a base do produto já permite:

- currículo amplo scaffoldado a partir da taxonomia canônica
- teoria, exercícios e gabaritos em fontes declarativas
- renderer web estável para teoria e prática
- progresso e perfil locais
- gamificação inicial ainda simples

Hoje ainda não existe:

- autenticação real de alunos
- persistência remota de progresso
- trava de domínio real por habilidade canônica
- recuperação obrigatória
- repetição espaçada inteligente
- trilhas dinâmicas geradas pelo mapa curricular

## Princípios de produto

- avanço por domínio, não por tempo
- currículo completo desde o início, mesmo com placeholders
- erro como diagnóstico, não só como nota
- revisão como parte obrigatória do loop
- roadmap incremental com entregas pequenas e auditáveis
- conteúdo editorial definitivo pode entrar depois que o mecanismo estiver validado

## Estratégia de validação

Nas primeiras releases, conteúdo final não é o foco principal. É aceitável usar:

- teoria placeholder em Markdown
- questões placeholder com estrutura real
- gabaritos simples

Isso existe para validar:

- onboarding
- fluxo de teoria e prática
- gating de avanço
- remediação
- repetição espaçada
- telemetria e persistência

## Macrocapacidades do produto

### 1. Base curricular

- taxonomia canônica cobrindo toda a grade
- tópicos e lições scaffoldados
- filtros por ramo, ano, perfil de prova e status

### 2. Runtime de aprendizagem

- teoria
- exercícios
- gabaritos
- soluções passo a passo
- progresso por lição, tópico e habilidade canônica

### 3. Motor de domínio

- critérios de aprovação
- bloqueio e desbloqueio por mastery
- rastreamento de dívida matemática

### 4. Motor de recuperação

- detecção de lacuna por erro
- trilhas curtas de revisão
- reaplicação obrigatória antes do desbloqueio

### 5. Motor de retenção

- repetição espaçada
- fila de revisão
- rechecagem de habilidades já dominadas

### 6. Camada operacional

- perfil local, contas e sincronização em fases diferentes
- analytics
- versionamento e release
- observabilidade

## Roadmap de releases

### Release R0: Foundation Loop

Objetivo: validar o loop básico do produto em modo single-user, com governança de entrega e base local-first sólida.

Escopo:

- documentação de produto, arquitetura e entrega
- trunk-based com CI, templates e releases
- melhoria das trilhas default a partir da taxonomia
- contrato explícito de storage e sessão, mantendo adapter local como implementação padrão
- perfil local e progresso local mais consistentes
- placeholders suficientes para validar os fluxos centrais
- telemetria mínima de produto para estudar o loop principal

Artefatos de entrega:

- PRD e roadmap publicados
- arquitetura-alvo documentada
- contrato de storage/session documentado
- CI obrigatória
- templates de issue e PR
- milestones de release

Critério de sucesso:

- um aluno consegue estudar em modo local, ser guiado por trilhas melhores e fechar um loop consistente de teoria, prática e progresso no mesmo dispositivo

### Release R1: Mastery Engine

Objetivo: transformar o app em uma plataforma com avanço por domínio.

Escopo:

- modelo de mastery por `canonicalId`
- critérios mínimos de aprovação por lição e tópico
- bloqueio de avanço quando o aluno não passa
- dashboard de dívida matemática
- novas trilhas default guiadas por objetivo

Artefatos de entrega:

- contratos de domínio
- regras de desbloqueio
- métricas de aprovação
- eventos analíticos principais

Critério de sucesso:

- o aluno não consegue avançar sem atingir o patamar definido para o bloco atual

### Release R2: Recovery Loop

Objetivo: transformar erro em gatilho de recuperação obrigatória.

Escopo:

- tags de lacuna e pré-requisito por questão
- diagnóstico mínimo de erro
- microtrilhas de revisão obrigatória
- reaplicação após revisão
- lógica de desbloqueio por recuperação concluída

Artefatos de entrega:

- mapa de misconceptions inicial
- contrato de remediação
- telas de bloqueio e recuperação

Critério de sucesso:

- um erro relevante gera revisão obrigatória e novo teste antes do desbloqueio

### Release R3: Retention Engine

Objetivo: reduzir esquecimento por revisão inteligente.

Escopo:

- agenda de repetição espaçada
- fila de revisão diária
- degradação controlada de domínio
- histórico de revisões
- lembretes iniciais in-app

Artefatos de entrega:

- scheduler de revisão
- schema de agenda e recall
- métricas de retenção

Critério de sucesso:

- habilidades dominadas voltam para revisão no tempo certo e o aluno enxerga a fila de manutenção

### Release R4: Challenge Economy

Objetivo: transformar domínio em compromisso mensurável, com persistência confiável e modelo comercial sólido.

Escopo:

- autenticação e sincronização em nuvem
- persistência remota de progresso, agenda e ledger mínimo
- gamificação séria baseada em domínio e consistência
- definição operacional de "zerar" a matemática coberta
- elegibilidade para eventual política de devolução
- auditoria mínima anti-fraude
- ranking e provas cumulativas

Artefatos de entrega:

- arquitetura de contas e sync documentada
- schema inicial de Supabase
- política de elegibilidade
- ledger de progresso auditável
- critérios comerciais e jurídicos documentados

Critério de sucesso:

- a plataforma consegue provar, com rastros mínimos, por que um aluno chegou ou não ao estado de conclusão total

## Onde estamos hoje

Hoje o projeto está entre a pré-base e o início de R0:

- arquitetura de conteúdo já está pronta para escala
- governança de produto e entrega está sendo formalizada
- o próximo salto real é fortalecer o loop single-user com trilhas, domínio local e contrato de storage bem definido

## O que não vamos fazer agora

- não vamos perseguir conteúdo editorial definitivo como gargalo
- não vamos tentar lançar toda a matemática com todas as mecânicas de uma vez
- não vamos introduzir autenticação e multiusuário antes de provar o loop principal em modo local
- não vamos introduzir múltiplos backends; quando a camada remota fizer sentido, Supabase continua sendo o primeiro candidato

## Medidas de sucesso por etapa

- R0: loop single-user estável, trilhas coerentes e progresso local consistente
- R1: taxa de aprovação e bloqueio coerentes
- R2: taxa de recuperação concluída e redução de reincidência
- R3: aderência à fila de revisão e retenção de domínio
- R4: sincronização confiável, ledger auditável, completion rate e elegibilidade auditável
