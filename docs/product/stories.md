# Histórias e Critérios de Aceite

## Objetivo

Definir as histórias prioritárias do produto com critérios de aceite claros e rastreáveis.

Cada história abaixo deve ser tratada como unidade funcional de planejamento.

## Epic E1: Identidade e multiusuário

### US-001 - Cadastro por email e senha

Como aluno, quero criar uma conta com email e senha para que meu progresso fique associado a uma identidade persistida.

Critérios de aceite:

- o sistema permite cadastro com email e senha válidos
- o sistema impede cadastro duplicado para o mesmo email
- após o cadastro, o usuário já possui perfil persistido associado à conta
- o usuário autenticado entra no app com sessão válida

Rastreabilidade:

- RMS-FR-001
- RMS-FR-003

### US-002 - Login social inicial

Como aluno, quero entrar com um provedor social para reduzir fricção de acesso.

Critérios de aceite:

- o sistema oferece ao menos um provedor social inicial
- após autenticar pelo provedor, o usuário entra com conta válida no produto
- o perfil do usuário fica associado à identidade autenticada em Supabase
- o fluxo trata falha de autenticação com mensagem clara

Rastreabilidade:

- RMS-FR-002
- RMS-FR-003

### US-003 - Sessão persistida e segura

Como aluno, quero voltar ao sistema sem perder minha sessão ativa e poder encerrar a sessão quando quiser.

Critérios de aceite:

- o sistema restaura sessão válida ao reabrir o app
- o sistema permite logout explícito
- o sistema trata sessão expirada sem corromper dados de progresso
- o usuário nunca vê dados de outro usuário autenticado

Rastreabilidade:

- RMS-FR-004
- RMS-NFR-002

## Epic E2: Catálogo e conteúdo em runtime

### US-004 - Explorar o currículo completo

Como aluno, quero ver a grade curricular de matemática até o ensino médio para saber o que existe e o que falta estudar.

Critérios de aceite:

- o catálogo cobre o escopo curricular definido para o produto
- o usuário consegue filtrar e buscar por etapa, ramo e tópico
- o sistema indica status de progresso e disponibilidade por item curricular
- a navegação entre trilha, tópico e lição é consistente

Rastreabilidade:

- RMS-FR-005
- RMS-FR-006

### US-005 - Abrir teoria publicada em runtime

Como aluno, quero abrir a teoria de uma lição a partir do conteúdo publicado mais recente para estudar sem depender de nova versão do frontend.

Critérios de aceite:

- o app consulta o manifesto publicado em runtime
- ao abrir a lição, a teoria correta é carregada sob demanda
- a mudança editorial publicada aparece no app sem redeploy do frontend
- a versão do conteúdo carregado é identificável

Rastreabilidade:

- RMS-FR-007
- RMS-FR-008
- RMS-FR-023

### US-006 - Abrir exercícios e soluções publicadas em runtime

Como aluno, quero resolver exercícios e consultar gabaritos e soluções da release de conteúdo publicada.

Critérios de aceite:

- o app carrega exercícios, gabaritos e soluções sob demanda
- o conjunto exibido corresponde à release publicada vigente
- o usuário consegue iniciar prática sem depender de rebuild do frontend
- a solução acompanha o contrato definido para o tipo de questão

Rastreabilidade:

- RMS-FR-009
- RMS-FR-023

## Epic E3: Progresso em nuvem e sensação de avanço

### US-007 - Continuar em outro dispositivo

Como aluno, quero que meu progresso fique salvo na nuvem para continuar de onde parei em qualquer dispositivo.

Critérios de aceite:

- tentativas e progresso são persistidos no backend
- ao autenticar em outro dispositivo, o mesmo progresso aparece
- o sistema evita perda silenciosa de progresso confirmado
- o histórico fica associado ao usuário autenticado

Rastreabilidade:

- RMS-FR-010
- RMS-FR-024

### US-008 - Ver meu avanço por lição, tópico e trilha

Como aluno, quero sentir que estou “matando” o currículo pouco a pouco.

Critérios de aceite:

- o app mostra progresso por lição, tópico, trilha e visão global
- o usuário consegue identificar o próximo passo natural
- o painel deixa claro o que já foi concluído e o que ainda falta
- a recomendação principal é coerente com o estado do aluno

Rastreabilidade:

- RMS-FR-012

### US-009 - Persistir domínio por habilidade

Como produto, quero registrar domínio por habilidade canônica para que o gating e a revisão tenham base explícita.

Critérios de aceite:

- cada tentativa atualiza o domínio das habilidades impactadas
- o domínio fica persistido no backend
- o sistema consegue reconstruir o estado atual de domínio do aluno
- o painel consegue consumir esse estado de forma consistente

Rastreabilidade:

- RMS-FR-011
- RMS-FR-024

## Epic E4: Gating, explicabilidade e modo aberto

### US-010 - Bloqueio por domínio mínimo

Como aluno, quero ser impedido de avançar na sequência padrão quando eu ainda não dominar a base necessária.

Critérios de aceite:

- a próxima etapa da sequência padrão não é liberada sem domínio mínimo
- o critério de domínio é aplicado de forma consistente
- o sistema diferencia conteúdo estudável de conteúdo bloqueado
- a regra funciona por usuário autenticado

Rastreabilidade:

- RMS-FR-013
- RMS-BR-001

### US-011 - Motivo do bloqueio e próximo passo

Como aluno, quero entender por que fui bloqueado e o que devo fazer para destravar.

Critérios de aceite:

- o bloqueio mostra motivo compreensível
- o sistema indica a ação seguinte recomendada
- a explicação é baseada em dados reais de desempenho e domínio
- a decisão fica auditável

Rastreabilidade:

- RMS-FR-014
- RMS-NFR-004

### US-012 - Modo aberto deliberado

Como aluno, quero poder abrir todo o conteúdo se eu decidir conscientemente sair da progressão guiada.

Critérios de aceite:

- o sistema explica que isso não representa a proposta pedagógica padrão
- o usuário precisa confirmar explicitamente a decisão
- após a confirmação, o conteúdo fica navegável sem bloqueio padrão
- o usuário pode voltar ao modo guiado
- a decisão fica registrada para auditoria

Rastreabilidade:

- RMS-FR-015
- RMS-FR-016
- RMS-BR-002
- RMS-BR-003

## Epic E5: Retenção e revisão

### US-013 - Fila diária de revisão

Como aluno, quero receber uma fila diária de revisão para praticar o que está vencendo ou sendo esquecido.

Critérios de aceite:

- o sistema cria itens de revisão a partir da heurística definida
- o usuário vê a fila diária em local claro da interface
- a fila distingue o que está vencido e o que está próximo de vencer
- a execução da revisão altera o estado correspondente

Rastreabilidade:

- RMS-FR-017
- RMS-FR-019

### US-014 - Revisão priorizada sobre novo conteúdo

Como produto, quero que a recomendação principal favoreça revisão quando houver risco alto de esquecimento.

Critérios de aceite:

- o sistema calcula prioridade de revisão
- quando a prioridade ultrapassa o limiar definido, a revisão aparece antes do novo conteúdo
- o usuário entende por que aquela revisão foi priorizada
- a regra pode ser auditada

Rastreabilidade:

- RMS-FR-018
- RMS-BR-005

## Epic E6: Gamificação e ranking

### US-015 - Pontos, badges e streak

Como aluno, quero receber sinais claros de progresso e constância.

Critérios de aceite:

- o sistema calcula pontos a partir de ações de estudo válidas
- o sistema atualiza streak e badges conforme regras publicadas
- o aluno consegue ver esses indicadores no dashboard
- a pontuação não depende apenas de abrir telas sem estudo real

Rastreabilidade:

- RMS-FR-020
- RMS-BR-006

### US-016 - Ranking multiusuário

Como aluno, quero comparar meu progresso com outros usuários em um ranking.

Critérios de aceite:

- o ranking é calculado com dados persistidos
- o usuário vê sua posição relativa
- o ranking respeita isolamento de dados pessoais
- o sistema prevê regras mínimas anti-abuso

Rastreabilidade:

- RMS-FR-021
- RMS-NFR-002

## Epic E7: Conteúdo e operação editorial

### US-017 - Publicar conteúdo alterando só Markdown

Como autor de conteúdo, quero incluir ou corrigir teoria e exercícios mexendo apenas em arquivos Markdown.

Critérios de aceite:

- o fluxo de autoria parte de Markdown versionado
- a publicação valida o conteúdo antes de disponibilizá-lo
- o contrato de frontmatter e questões é checado no pipeline
- a alteração publicada não exige mudança manual em componentes React

Rastreabilidade:

- RMS-FR-022
- RMS-NFR-007
- RMS-NFR-011
- RMS-NFR-012

### US-018 - Corrigir conteúdo sem redeploy do shell

Como operador, quero publicar uma nova release editorial sem precisar gerar nova build do frontend.

Critérios de aceite:

- o shell consulta conteúdo em runtime
- a nova release é disponibilizada sem redeploy do frontend
- o sistema consegue rollback para release anterior
- as tentativas antigas preservam referência à versão usada

Rastreabilidade:

- RMS-FR-007
- RMS-FR-023
- RMS-FR-024

### US-019 - Auditar eventos críticos

Como administrador da plataforma, quero rastrear autenticação, progresso, revisão, modo aberto e publicação de conteúdo.

Critérios de aceite:

- os eventos críticos ficam registrados
- o sistema permite identificar usuário, momento e contexto do evento
- o operador consegue correlacionar evento com release de conteúdo e fase do fluxo
- a trilha de auditoria não vaza dados de outros usuários

Rastreabilidade:

- RMS-FR-025
- RMS-NFR-004
- RMS-NFR-005

## Regra de uso

Uma fase só deve ser considerada concluída quando as histórias nela contidas:

- tiverem implementação entregue
- tiverem critérios de aceite atendidos
- tiverem cenários correspondentes cobertos no CDT
