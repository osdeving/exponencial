# Requisitos Não Funcionais

## Objetivo

Definir a barra mínima de qualidade do produto em seu estado-alvo multiusuário e cloud-first.

Este documento complementa o [RMS](rms.md) com foco em metas mensuráveis de operação, segurança, qualidade e manutenção.

## NFR-01: Performance

O produto deve manter boa percepção de fluidez para estudo contínuo.

Metas:

- shell inicial interativo em até 3 s em cenário móvel mediano
- carregamento de manifesto publicado em até 1 s p95 com cache quente
- abertura de teoria ou exercício em até 1 s p95 após seleção da lição
- submissão de tentativa com persistência em até 2 s p95
- navegação entre telas principais percebida como imediata após primeiro carregamento

## NFR-02: Disponibilidade

O produto deve ser operável em produção com disponibilidade consistente.

Metas:

- disponibilidade mensal alvo de 99,5% após entrada da fase cloud
- fallback degradado quando serviços auxiliares falharem, sem perda silenciosa de progresso confirmado
- releases de conteúdo devem ser reversíveis

## NFR-03: Segurança

O produto deve proteger autenticação, dados e segredos.

Exigências:

- autenticação centralizada em Supabase Auth
- RLS em todas as tabelas de dados de usuário
- segredos fora do cliente
- trilha de auditoria para login, publicação, override e eventos críticos
- proteção de `main` e CI obrigatória

## NFR-04: Privacidade e conformidade

O produto deve operar com mínimo de dados pessoais e respeitar LGPD.

Exigências:

- coletar apenas os dados necessários para operação e suporte
- prever consentimento, exclusão de conta e revogação de sessão
- tratar menores de idade com cautela extra de dados e comunicação
- documentar retenção de dados por categoria

## NFR-05: Auditabilidade

O sistema deve conseguir explicar decisões importantes.

Exigências:

- registrar por que um aluno foi bloqueado, liberado ou redirecionado para revisão
- registrar quando o modo aberto foi habilitado, por quem e quando
- associar tentativas à versão publicada do conteúdo
- permitir reconstruir a sequência mínima de eventos de estudo de um usuário

## NFR-06: Observabilidade

O sistema deve gerar sinais suficientes para operação e evolução do produto.

Eventos mínimos:

- cadastro concluído
- login concluído
- lição iniciada
- exercício enviado
- lição aprovada
- lição bloqueada
- modo aberto habilitado
- revisão agendada
- revisão iniciada
- revisão concluída
- conteúdo publicado

Exigências:

- erros de runtime precisam ser capturáveis
- métricas de funil precisam existir por fase
- integrações críticas precisam ter logs operacionais mínimos

## NFR-07: Testabilidade

O produto deve poder ser validado por automação e aceite.

Exigências:

- domínio, contratos, auth, publicação e gating precisam ter testes automatizados
- histórias críticas precisam ter cenários mapeados no CDT
- CI deve bloquear merge quebrado
- regressão de conteúdo precisa ser validável por pipeline

## NFR-08: Manutenibilidade

O produto deve continuar evoluindo sem acoplamento excessivo.

Exigências:

- conteúdo curricular permanece fora da UI
- contratos e versionamento de conteúdo permanecem documentados
- mudanças editoriais não devem exigir refactor do frontend
- novos colaboradores devem conseguir navegar pela base lendo poucos documentos

## NFR-09: Acessibilidade

O fluxo principal de estudo deve ser acessível.

Exigências:

- navegação por teclado nas jornadas principais
- contraste, foco visível e semântica adequados
- mensagens de bloqueio, erro e confirmação claras
- meta de aderência progressiva a WCAG 2.1 AA nas telas principais

## NFR-10: Escalabilidade funcional

O produto deve crescer em currículo, usuários e mecânicas sem reescrever a base.

Exigências:

- crescimento de conteúdo não pode exigir rebuild do frontend
- novas mecânicas entram por contratos claros
- ranking, revisão e auditoria devem suportar múltiplos usuários sem quebrar isolamento

## NFR-11: Governança de release

Cada entrega deve ser rastreável e verificável.

Exigências:

- toda entrega aponta fase alvo
- cada entrega atualiza os documentos afetados
- releases devem ser pequenas, cumulativas e reversíveis
- backlog oficial deve estar refletido em docs e/ou GitHub

## NFR-12: Custo operacional

O produto deve perseguir simplicidade operacional proporcional ao estágio.

Exigências:

- Supabase é o backend preferencial para auth, dados e storage
- novos serviços só entram com justificativa clara
- publicação de conteúdo deve evitar pipelines excessivamente caras
- ranking e revisão devem preferir processamento assíncrono quando o custo síncrono não se justificar

## NFR-13: Integridade de conteúdo

O produto deve impedir publicação inconsistente de teoria e exercícios.

Exigências:

- toda release de conteúdo passa por validação estrutural
- manifesto publicado deve ser imutável por versão
- rollback deve restaurar release íntegra anterior

## NFR-14: Portabilidade editorial

O conteúdo deve continuar sendo editável em formatos simples e versionáveis.

Exigências:

- Markdown permanece como formato canônico de autoria
- frontmatter e contratos de questões permanecem explícitos
- o pipeline de publicação não deve aprisionar o conteúdo em editor proprietário
