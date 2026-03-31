# Automação do Roadmap

## Objetivo

Permitir que o Exponencial rode um loop autônomo de implementação em cima do roadmap, sempre escolhendo a próxima fatia pequena, segura e verificável.

O objetivo da automação não é inventar produto novo a cada rodada. O objetivo é:

- reduzir trabalho repetitivo
- manter o backlog andando em pequenas entregas
- atualizar documentação de estado continuamente
- parar sozinha quando não houver trabalho seguro

## Artefatos da automação

- workflow: `.github/workflows/codex-roadmap-loop.yml`
- prompt persistente: `.github/codex/autopilot-prompt.md`
- estado operacional: `docs/automation/status.md`
- regras gerais do repositório: `AGENTS.md`

`docs/automation/status.md` também carrega um frontmatter simples para controle do loop:

- `loopAction: continue|stop`
- `lastOutcome: changed|noop|blocked|bootstrap`

## Como o loop decide o próximo passo

Em cada execução, o agente deve ler:

1. `AGENTS.md`
2. `docs/automation/status.md`
3. `docs/product/vision-roadmap.md`
4. `docs/product/functional-spec.md`
5. `docs/architecture.md`
6. `docs/delivery/trunk-based-delivery.md`

Depois disso, ele pega apenas a menor fatia elegível do epic ativo.

## O que é elegível para automação

- pequenas features do release/epic ativo
- refactors necessários para fechar a pequena feature atual
- testes faltantes da feature atual
- sincronização de docs/roadmap/status
- estabilização local de build, lint, typecheck e regressões ligadas à feature atual

## O que não é elegível para automação

- qualquer item que dependa de decisão humana de produto, conteúdo editorial ou negócio
- autenticação, Supabase, sincronização em nuvem e multiusuário antes da fase prevista
- conteúdo matemático grande como objetivo principal
- políticas comerciais, garantia de devolução, regras jurídicas e critérios financeiros
- mudanças grandes demais para um ciclo pequeno e verificável

## Comportamento de no-op

Se não houver trabalho seguro, a automação deve:

1. não mexer em feature aleatória
2. registrar o bloqueio em `docs/automation/status.md`
3. encerrar com o repositório consistente

Quando realmente não houver mais fatia segura para engatar, o arquivo deve ficar com:

- `loopAction: stop`
- `lastOutcome: noop` ou `blocked`

## Validação obrigatória

Toda rodada que fizer mudanças deve rodar:

- `npm run test`
- `npm run lint`
- `npm run build`

## Bootstrap operacional

Para o loop funcionar de ponta a ponta no GitHub, ainda existe um setup único fora do código:

- configurar `OPENAI_API_KEY` nos secrets do repositório
- garantir que o workflow consiga gravar no repositório

Observação importante:

- se a `main` estiver protegida contra pushes do `github-actions[bot]`, o workflow vai precisar de uma exceção explícita ou de uma estratégia alternativa de branch/PR automático
- pushes feitos com `GITHUB_TOKEN` não disparam workflows de `push`; se o loop precisar acionar outro workflow depois de um commit automático, ele deve disparar isso explicitamente
- isso é governança do repositório, não lógica do app

## Estado atual recomendado

Hoje a automação deve focar no próximo epic ativo do produto e continuar em modo `local-first`, sem abrir frentes de cloud, auth ou conteúdo editorial pesado.
