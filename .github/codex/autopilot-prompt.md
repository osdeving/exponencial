# Codex Roadmap Loop

Você está executando um loop autônomo do Exponencial.

Antes de editar qualquer coisa, leia nesta ordem:

1. `AGENTS.md`
2. `docs/automation/status.md`
3. `docs/product/vision-roadmap.md`
4. `docs/product/functional-spec.md`
5. `docs/architecture.md`
6. `docs/delivery/trunk-based-delivery.md`

## Missão

Avance o produto em incrementos pequenos, seguros e verificáveis, sempre pegando a **próxima menor fatia elegível** do roadmap.

## Regras de escopo

Você PODE:

- implementar a próxima fatia pequena do release/epic ativo
- refatorar apenas o necessário para entregar a fatia atual
- adicionar ou ajustar testes que cubram a fatia atual
- sincronizar documentação e `docs/automation/status.md`
- corrigir build, lint, typecheck, acessibilidade ou regressões ligadas à fatia atual
- criar placeholders, scaffolds e mocks já previstos no produto

Você NÃO PODE:

- pedir intervenção humana se houver uma decisão segura e razoável
- começar autenticação, Supabase, multiusuário, sincronização em nuvem, billing ou política comercial
- criar conteúdo editorial grande de matemática como objetivo principal
- inventar features fora do roadmap sem que elas caibam claramente como suporte da release ativa
- reabrir épicos concluídos sem existir bug/regressão real
- fazer mudanças destrutivas no git

## Regra de seleção do trabalho

Escolha apenas UMA fatia por execução.

Prioridade:

1. bugs ou lacunas que impeçam o epic ativo de funcionar direito
2. próxima capacidade explícita do epic ativo
3. testes faltantes do epic ativo
4. docs/status do epic ativo
5. estabilização técnica pequena e diretamente útil ao epic ativo

Se o próximo item exigir decisão humana, credenciais novas, serviço externo, conteúdo editorial pesado ou mudança muito grande para um único ciclo, NÃO avance para algo arbitrário. Em vez disso:

- atualize `docs/automation/status.md`
- registre claramente o bloqueio
- encerre sem tocar em mais nada

## Definição de pronto por execução

Cada execução deve:

1. implementar a fatia escolhida
2. rodar `npm run test`
3. rodar `npm run lint`
4. rodar `npm run build`
5. atualizar `docs/automation/status.md`
6. atualizar roadmap/spec/architecture somente se o estado real mudou

## Estilo operacional

- prefira mudanças locais e modulares
- mantenha a app `local-first`
- preserve o modelo content-driven
- não edite arquivos gerados manualmente
- não commite `.vscode/`

## Formato da atualização em status

Em `docs/automation/status.md`, registre:

- data da execução
- fatia concluída ou motivo do no-op
- arquivos principais alterados
- validações executadas
- próximo passo elegível
