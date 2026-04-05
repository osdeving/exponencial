# RMS - Requisito Mestre de Sistema

## Objetivo

Consolidar os requisitos mestres do Exponencial em formato rastreável, com foco em:

- o que o sistema deve fazer
- quais regras de negócio são obrigatórias
- como cada requisito será verificado
- em qual fase cada requisito entra

Os requisitos aqui definidos são a referência principal para implementação e aceite.

## Convenção

- `RMS-FR-*`: requisito funcional
- `RMS-BR-*`: regra de negócio
- `RMS-NFR-*`: requisito não funcional

Colunas:

- `Prioridade`: `Must`, `Should`, `Could`
- `Verificação`: `Teste`, `Inspeção`, `Demonstração` ou combinação

## Requisitos funcionais

| ID | Requisito | Prioridade | Fase | Verificação |
| --- | --- | --- | --- | --- |
| RMS-FR-001 | O sistema deve permitir cadastro por email e senha. | Must | F1 | Teste + Demonstração |
| RMS-FR-002 | O sistema deve permitir autenticação por ao menos um provedor social inicial. | Should | F1 | Teste + Demonstração |
| RMS-FR-003 | O sistema deve associar perfil, progresso e preferências a um usuário autenticado persistido em Supabase. | Must | F1 | Teste |
| RMS-FR-004 | O sistema deve recuperar sessão válida e permitir logout seguro. | Must | F1 | Teste |
| RMS-FR-005 | O sistema deve expor a grade curricular de matemática até o ensino médio. | Must | F2 | Inspeção + Demonstração |
| RMS-FR-006 | O sistema deve permitir navegação e busca por tópico, lição, trilha e etapa curricular. | Must | F2 | Teste + Demonstração |
| RMS-FR-007 | O sistema deve consumir um manifesto publicado de conteúdo em runtime. | Must | F2 | Teste |
| RMS-FR-008 | O sistema deve carregar teoria em Markdown sob demanda sem exigir redeploy do frontend. | Must | F2 | Teste + Demonstração |
| RMS-FR-009 | O sistema deve carregar exercícios, gabaritos e soluções sob demanda sem exigir redeploy do frontend. | Must | F2 | Teste + Demonstração |
| RMS-FR-010 | O sistema deve persistir tentativas, progresso e indicadores de avanço na nuvem. | Must | F3 | Teste |
| RMS-FR-011 | O sistema deve registrar domínio por habilidade canônica e por unidade curricular. | Must | F3 | Teste |
| RMS-FR-012 | O sistema deve apresentar sensação de progresso por lição, tópico, trilha e progresso global. | Must | F3 | Demonstração |
| RMS-FR-013 | O sistema deve bloquear a sequência padrão quando o aluno não atingir o domínio mínimo exigido. | Must | F3 | Teste + Demonstração |
| RMS-FR-014 | O sistema deve informar claramente o motivo do bloqueio e a ação recomendada. | Must | F3 | Teste + Demonstração |
| RMS-FR-015 | O sistema deve oferecer modo aberto somente após confirmação deliberada do usuário. | Must | F3 | Teste + Demonstração |
| RMS-FR-016 | O sistema deve persistir o estado do modo aberto por usuário e permitir reversão. | Must | F3 | Teste |
| RMS-FR-017 | O sistema deve montar uma fila diária de revisão baseada em heurística de esquecimento. | Must | F4 | Teste |
| RMS-FR-018 | O sistema deve priorizar revisões vencidas na recomendação principal quando aplicável. | Must | F4 | Teste + Demonstração |
| RMS-FR-019 | O sistema deve registrar histórico de revisões e seu impacto no domínio do aluno. | Must | F4 | Teste |
| RMS-FR-020 | O sistema deve atribuir pontos, badges e streak com base em ações de estudo válidas. | Should | F5 | Teste |
| RMS-FR-021 | O sistema deve expor ranking multiusuário com dados persistidos e regras mínimas anti-abuso. | Should | F5 | Teste + Demonstração |
| RMS-FR-022 | O sistema deve permitir publicar e corrigir conteúdo alterando apenas arquivos Markdown. | Must | F2 | Teste + Demonstração |
| RMS-FR-023 | O sistema deve versionar releases de conteúdo e permitir rollback. | Must | F2 | Teste |
| RMS-FR-024 | O sistema deve associar cada tentativa do aluno à release de conteúdo vigente no momento da tentativa. | Must | F3 | Teste |
| RMS-FR-025 | O sistema deve registrar eventos críticos de autenticação, progresso, modo aberto, revisão, ranking e publicação. | Must | F3-F6 | Teste + Inspeção |

## Regras de negócio

| ID | Regra | Prioridade | Fase | Verificação |
| --- | --- | --- | --- | --- |
| RMS-BR-001 | A progressão padrão do produto é guiada por domínio e sequência curricular. | Must | F3 | Inspeção + Demonstração |
| RMS-BR-002 | O modo aberto existe como exceção deliberada, não como comportamento padrão. | Must | F3 | Demonstração |
| RMS-BR-003 | O sistema deve explicar ao usuário que o modo aberto descaracteriza a proposta pedagógica principal antes da confirmação. | Must | F3 | Teste + Demonstração |
| RMS-BR-004 | Toda tentativa deve referenciar a versão publicada de conteúdo usada no momento da resolução. | Must | F3 | Teste |
| RMS-BR-005 | Revisões vencidas têm precedência sobre novo conteúdo quando a heurística indicar risco relevante de esquecimento. | Must | F4 | Teste |
| RMS-BR-006 | Ranking e gamificação devem refletir estudo válido, não apenas navegação ou cliques superficiais. | Should | F5 | Inspeção + Teste |

## Requisitos não funcionais mestre

| ID | Requisito | Prioridade | Fase | Verificação |
| --- | --- | --- | --- | --- |
| RMS-NFR-001 | O produto deve manter experiência fluida de estudo e navegação. | Must | F2-F6 | Teste |
| RMS-NFR-002 | O produto deve proteger autenticação, segredos e isolamento de dados por usuário. | Must | F1-F6 | Teste + Inspeção |
| RMS-NFR-003 | O produto deve respeitar princípios de privacidade e LGPD. | Must | F1-F6 | Inspeção |
| RMS-NFR-004 | O produto deve ser auditável quanto a bloqueios, revisões, overrides e releases de conteúdo. | Must | F3-F6 | Teste + Inspeção |
| RMS-NFR-005 | O produto deve possuir observabilidade suficiente para operação e evolução. | Must | F1-F6 | Inspeção + Demonstração |
| RMS-NFR-006 | O produto deve ser testável por contratos, integração e aceite. | Must | F1-F6 | Teste |
| RMS-NFR-007 | O conteúdo deve permanecer authorable em Markdown e desacoplado do frontend. | Must | F2-F6 | Inspeção |
| RMS-NFR-008 | O produto deve ser acessível nas jornadas principais. | Must | F2-F6 | Teste + Inspeção |
| RMS-NFR-009 | O crescimento de conteúdo e usuários não deve exigir reescrita frequente da UI. | Must | F2-F6 | Inspeção |
| RMS-NFR-010 | O custo operacional deve permanecer proporcional ao estágio do produto. | Should | F1-F6 | Inspeção |
| RMS-NFR-011 | O produto deve garantir integridade, versionamento e rollback seguro das releases de conteúdo. | Must | F2-F6 | Teste + Inspeção |
| RMS-NFR-012 | O conteúdo deve permanecer portável em Markdown, sem dependência de ferramenta proprietária de autoria. | Should | F2-F6 | Inspeção |

## Matriz resumida de rastreabilidade

| Tema | Requisitos mestre | Histórias | Aceite |
| --- | --- | --- | --- |
| Identidade e sessão | RMS-FR-001 a 004 | US-001 a US-003 | CDT-AUTH-* |
| Conteúdo em runtime | RMS-FR-005 a 009, 022, 023, RMS-NFR-011, RMS-NFR-012 | US-004 a US-006, US-017, US-018 | CDT-CONT-* |
| Progresso e domínio | RMS-FR-010 a 012, 024 | US-007 a US-009 | CDT-PRG-* |
| Gating e modo aberto | RMS-FR-013 a 016, RMS-BR-001 a 004 | US-010 a US-012 | CDT-GATE-* |
| Revisão e retenção | RMS-FR-017 a 019, RMS-BR-005 | US-013 e US-014 | CDT-REV-* |
| Gamificação e ranking | RMS-FR-020 e 021, RMS-BR-006 | US-015 e US-016 | CDT-GAM-* e CDT-RANK-* |
| Auditoria e operação | RMS-FR-025, RMS-NFR-004, RMS-NFR-005 | US-019 | CDT-AUD-* |

## Regra de manutenção

Qualquer mudança que altere:

- autenticação
- modelo de progresso
- regra de gating
- heurística de revisão
- pipeline de conteúdo
- ranking e gamificação

deve atualizar este RMS antes ou junto da implementação.
