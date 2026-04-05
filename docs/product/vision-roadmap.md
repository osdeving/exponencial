# Visão e Roadmap

## Objetivo do produto

O Exponencial deve ser um software web multiusuário de aprendizagem de matemática que permita:

- acessar teoria e exercícios do currículo escolar até o ensino médio
- seguir uma sensação clara de progresso na ordem habitual dos tópicos
- avançar por domínio, e não apenas por navegação livre
- salvar progresso na nuvem e continuar em qualquer dispositivo
- revisar no tempo certo com base em heurísticas ligadas à curva de esquecimento
- usar gamificação para reforçar constância, não apenas volume de cliques

## Problema que o produto resolve

O aluno geralmente enfrenta quatro problemas ao estudar matemática:

- o currículo aparece fragmentado e sem noção de sequência
- o progresso não é claro nem acumulativo
- o esquecimento acontece sem revisão estruturada
- a maior parte das plataformas mede consumo de conteúdo, não domínio real

O Exponencial existe para transformar o estudo em um fluxo contínuo:

1. entender a teoria
2. praticar
3. comprovar domínio
4. revisar antes de esquecer
5. enxergar o avanço total no currículo

## Estado-alvo do produto

No estado-alvo, o sistema deve oferecer:

- autenticação por email e senha
- ao menos um login social inicial
- progresso, domínio e fila de revisão persistidos em Supabase
- experiência multiusuário com ranking e gamificação
- bloqueio padrão por domínio mínimo
- modo especial de exploração total, liberado só por escolha deliberada e confirmada
- conteúdo publicado em Markdown e servido em runtime, sem exigir redeploy do frontend para ajustes editoriais

## Público-alvo principal

### Aluno

Usuário que deseja estudar matemática do currículo escolar com trilha, revisão e sensação de progresso.

### Autor de conteúdo

Pessoa que publica teoria e exercícios alterando arquivos Markdown e passando por um fluxo de validação e publicação.

### Operador de produto

Pessoa que prioriza fases, acompanha métricas, define critérios de aceite e governa releases.

### Administrador da plataforma

Pessoa responsável por autenticação, dados, observabilidade, suporte operacional e políticas de acesso.

## Princípios de produto

- progresso deve ser visível, cumulativo e explicável
- a progressão padrão deve respeitar pré-requisitos e domínio
- o usuário pode optar por abrir tudo, mas isso nunca deve ser o default
- teoria e exercícios precisam continuar vindo de fontes declarativas
- mudança editorial não deve exigir rebuild completo do app
- o sistema deve ser auditável: precisa explicar bloqueios, revisões, override e ranking
- cada fase deve entregar valor verificável e não apenas infraestrutura isolada

## Escopo funcional do produto final

### 1. Catálogo curricular completo

- cobertura do currículo escolar até o ensino médio
- trilhas por etapa, ramo e objetivo
- busca e filtros por série, ramo, status e perfil

### 2. Runtime de aprendizagem

- teoria em Markdown
- exercícios e gabaritos em Markdown estruturado
- carregamento de conteúdo em runtime
- versão publicada de conteúdo rastreável

### 3. Progressão e domínio

- progresso por lição, tópico, trilha e habilidade canônica
- critérios mínimos de passagem
- bloqueio de avanço por falta de domínio
- explicação clara do motivo do bloqueio

### 4. Revisão e retenção

- fila diária de revisão
- heurística de esquecimento
- rechecagem de habilidades já dominadas
- histórico de revisões e impacto no domínio

### 5. Gamificação e ranking

- pontos
- streak
- badges
- leaderboard multiusuário

### 6. Camada cloud e multiusuário

- login e cadastro
- login social
- Supabase Auth
- progresso em nuvem
- associação entre identidade, progresso e eventos

## Fora de escopo imediato

- CMS WYSIWYG complexo para autoria
- autoria diretamente no app do aluno
- múltiplos painéis administrativos avançados
- política comercial final, refund e regras jurídicas completas
- múltiplos provedores cloud além do Supabase

## Roadmap por fases

### F0: Baseline documental e alinhamento

Objetivo:

- consolidar visão, RMS, histórias, DAS, documentação técnica, CDT e plano por fases

Critério de saída:

- o time consegue iniciar desenvolvimento sem ambiguidade de escopo

### F1: Identidade e base cloud

Objetivo:

- estabelecer o modo multiusuário do produto

Escopo:

- cadastro por email e senha
- login
- recuperação de sessão
- pelo menos um provedor social inicial
- perfil associado ao usuário autenticado
- baseline de RLS e observabilidade de autenticação

Critério de saída:

- o aluno consegue entrar, sair e recuperar a própria conta com dados isolados por usuário

### F2: Runtime de conteúdo remoto em Markdown

Objetivo:

- permitir publicação e alteração de conteúdo sem redeploy do frontend

Escopo:

- manifesto publicado em runtime
- teoria e exercícios armazenados/versionados via Supabase
- pipeline de validação e publicação de Markdown
- carregamento sob demanda de lições e questionários
- rollback para release anterior de conteúdo

Critério de saída:

- uma alteração editorial publicada aparece no app sem rebuild do shell web

### F3: Progresso cloud, domínio e gating

Objetivo:

- transformar o fluxo de estudo em progressão orientada por domínio e persistida na nuvem

Escopo:

- progresso em nuvem por usuário
- tentativas, score e domínio por habilidade
- bloqueio por domínio mínimo
- explicação de bloqueio
- modo aberto deliberado com confirmação explícita

Critério de saída:

- o aluno percebe progresso claro, tem dados persistidos na nuvem e só avança por domínio, salvo quando deliberadamente decide abrir tudo

### F4: Retenção e revisão guiada por esquecimento

Objetivo:

- reduzir esquecimento e manter domínio ao longo do tempo

Escopo:

- fila diária de revisão
- heurística de agendamento
- priorização do que está vencido
- histórico de revisões
- eventos e métricas de retenção

Critério de saída:

- habilidades dominadas retornam para revisão no momento certo e a recomendação principal já considera isso

### F5: Gamificação, ranking e compromisso

Objetivo:

- reforçar constância e percepção de avanço com sinais sociais e metas

Escopo:

- pontos
- badges
- streak
- ranking/leaderboard
- regras de elegibilidade e anti-abuso mínimas

Critério de saída:

- o aluno enxerga reconhecimento contínuo e comparação segura com outros usuários

### F6: Hardening e readiness de operação

Objetivo:

- preparar o produto para operação estável

Escopo:

- observabilidade completa
- auditoria de eventos críticos
- performance e acessibilidade
- segurança, LGPD e rotinas operacionais
- rollout controlado

Critério de saída:

- a plataforma está pronta para operar com risco técnico e operacional conhecidos

## Linha de corte recomendada

### MVP funcional

F1 + F2 + F3 + F4.

Esse corte já entrega:

- multiusuário
- conteúdo remoto em Markdown
- progresso em nuvem
- gating por domínio
- revisão orientada por esquecimento

### V1 comercialmente mais forte

MVP + F5 + itens essenciais de F6.

## Medidas de sucesso

- taxa de ativação: percentual de usuários que concluem onboarding e iniciam a primeira lição
- taxa de persistência: percentual de usuários que retornam em outro dia com a mesma conta
- taxa de progressão: percentual de alunos que avançam em tópicos na ordem proposta
- taxa de revisão concluída: percentual de revisões vencidas realmente executadas
- retenção de domínio: percentual de habilidades que se mantêm acima do limiar após revisões
- engajamento saudável: streak, badges e ranking sem aumento artificial de cliques vazios
