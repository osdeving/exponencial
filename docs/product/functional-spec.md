# Especificação Funcional

## Escopo

Este documento descreve o comportamento funcional esperado do produto em evolução. Ele não assume que tudo será entregue de uma vez.

## Atores

### Aluno

Usuário principal da plataforma. Estuda, faz exercícios, recebe bloqueios, revisa e acumula progresso.

### Operador de produto

Pessoa que organiza roadmap, releases, métricas e priorização.

### Autor de conteúdo

Pessoa que mantém tópicos, lições e exercícios em Markdown, sem depender de alterar a UI para cada novo bloco.

### Administrador da plataforma

Pessoa que acompanha ambiente, autenticação, storage, incidentes e políticas operacionais.

## Domínios funcionais

### 1. Identidade e perfil do aluno

Capacidades:

- perfil local básico
- série alvo, objetivo e ritmo
- histórico de progresso persistido no dispositivo
- contrato explícito de sessão/storage para futura sincronização
- conta e login em fase posterior

Histórias:

- Como aluno, quero configurar meu perfil sem depender de backend para começar a estudar.
- Como aluno, quero voltar depois e continuar de onde parei no mesmo dispositivo.
- Como produto, quero preparar um contrato de storage que permita sincronização futura sem reescrever a UI.

### 2. Exploração curricular e trilhas

Capacidades:

- navegar pela grade completa
- filtrar por ramo, ano, perfil de prova e status
- entrar em trilhas default
- ver tópicos em `outline`, `in-progress` e `ready`

Histórias:

- Como aluno, quero ver toda a grade, mesmo quando parte do conteúdo ainda estiver em construção.
- Como aluno, quero entrar numa trilha alinhada ao meu objetivo.
- Como operador, quero gerar trilhas default a partir da taxonomia canônica.

### 3. Experiência de teoria

Capacidades:

- abrir lição
- renderizar Markdown com KaTeX
- mostrar status do conteúdo
- manter estrutura estável mesmo com texto placeholder

Histórias:

- Como autor, quero publicar teoria em Markdown sem tocar na UI.
- Como aluno, quero estudar uma lição com layout consistente, independentemente da origem do texto.

### 4. Prática e gabarito

Capacidades:

- responder exercícios
- receber correção
- ver gabarito
- abrir solução estruturada

Histórias:

- Como aluno, quero praticar e ver a resolução quando errar.
- Como produto, quero rastrear tentativas e taxa de acerto por habilidade.

### 5. Avanço por domínio

Capacidades:

- definir critério mínimo de passagem
- bloquear avanço quando o critério falhar
- destravar quando o aluno comprovar domínio
- mostrar dívida matemática acumulada

Histórias:

- Como aluno, quero saber por que estou bloqueado.
- Como plataforma, quero impedir avanço superficial.
- Como produto, quero medir dívida por `canonicalId`.

### 6. Recuperação obrigatória

Capacidades:

- detectar lacuna provável a partir do erro
- abrir microtrilha de revisão
- exigir revisão antes do desbloqueio
- reaplicar avaliação

Histórias:

- Como aluno, quero entender qual base está faltando.
- Como plataforma, quero forçar recomposição antes de liberar o próximo bloco.

### 7. Repetição espaçada

Capacidades:

- agendar revisões
- priorizar o que está em risco de esquecimento
- reapresentar habilidade dominada
- degradar domínio quando houver esquecimento recorrente

Histórias:

- Como aluno, quero receber revisão no momento certo.
- Como plataforma, quero reduzir o esquecimento e manter domínio vivo.

### 8. Gamificação séria

Capacidades:

- badges
- streak
- mapa de progresso
- campanhas e metas
- eventual elegibilidade para política de devolução

Histórias:

- Como aluno, quero sentir progresso e desafio real.
- Como produto, quero premiar consistência e domínio, não só volume de cliques.

### 9. Operação e governança

Capacidades:

- roadmap visível
- releases versionadas
- backlog estruturado
- critérios de aceite claros
- métricas básicas por feature

Histórias:

- Como operador, quero saber em que release cada feature entra.
- Como time, queremos entregar em pequenos sucessos sólidos.

## Regras funcionais principais

### RF-01

O app deve permitir representar a grade curricular completa, mesmo quando parte do conteúdo estiver em placeholder.

### RF-02

O app deve permitir que teoria, exercícios, gabaritos e soluções sejam publicados por conteúdo declarativo.

### RF-03

O app deve persistir perfil e progresso por um contrato explícito de storage, com implementação local-first nas releases iniciais.

### RF-04

Quando a fase multiusuário entrar, o app deve permitir autenticar alunos e associar progresso a uma identidade persistida.

### RF-05

O app deve registrar tentativas, acertos, erros e progresso por habilidade canônica.

### RF-06

O app deve bloquear avanço quando o aluno não atingir o domínio mínimo definido para a etapa atual.

### RF-07

O app deve gerar revisão obrigatória quando um erro indicar lacuna relevante.

### RF-08

O app deve agendar revisões futuras para evitar esquecimento das habilidades dominadas.

### RF-09

O app deve expor trilhas default coerentes com os objetivos do aluno e com a taxonomia canônica.

### RF-10

O app deve fornecer visibilidade clara de status, bloqueios, revisões pendentes e progresso total.

## Backlog por épico

### Epic A: Plataforma Base

Status atual: `em andamento`

- [x] perfil local mais robusto
- [x] contrato de storage/session
- [x] trilhas default guiadas pela taxonomia
- [ ] telemetria mínima
- [x] placeholders para validação do loop

### Epic B: Mastery

Status atual: `em andamento`

- [x] mastery ledger
- [ ] travas de avanço
- [x] score por habilidade
- [x] dashboard de dívida matemática

### Epic C: Recovery

Status atual: `planejado`

- erro para lacuna
- revisão obrigatória
- reavaliação

### Epic D: Retention

Status atual: `planejado`

- fila de revisão
- spaced repetition
- histórico de recall

### Epic E: Challenge

Status atual: `planejado`

- campanha de conclusão
- ranking mais sério
- critério de conclusão total
- políticas de elegibilidade comercial

### Epic F: Accounts & Cloud Sync

Status atual: `planejado`

- autenticação de aluno
- sincronização entre dispositivos
- storage remoto inicial em Supabase
- ledger auditável de progresso

## Artefatos obrigatórios por feature

Cada feature do roadmap deve ter, no mínimo:

- issue ou epic no GitHub
- critério de aceite
- release alvo
- impacto em dados e telemetria documentado
- decisão de rollout
- atualização dos documentos afetados

## Fora de escopo imediato

- CMS próprio para autoria
- múltiplos papéis administrativos complexos
- conteúdo editorial definitivo como pré-requisito para implementar o motor do produto
