loopAction: continue
lastOutcome: bootstrap
---

# Status da Automação

## Missão

Avançar o Exponencial por fatias pequenas, seguras e verificáveis, sem depender de intervenção humana durante cada execução.

## Release ativa

- release: `R3`
- epic: `Epic D / Retention`
- status: `pronto para iniciar`

## Último marco concluído

- `R2 / Epic C` concluído
- recuperação obrigatória já cobre:
  - diagnóstico mínimo por questão
  - revisão obrigatória
  - retorno ao reteste original
  - bloqueio até aprovação
  - painel local de recuperação

## Próximas fatias elegíveis

- [ ] introduzir contrato local de fila de revisão
- [ ] agendar revisões vencidas por lição/habilidade já dominada
- [ ] priorizar revisão vencida na recomendação principal
- [ ] mostrar fila diária de revisão no dashboard e/ou home
- [ ] cobrir scheduler e fila com testes automatizados
- [ ] marcar `R3` como iniciado nas docs quando a primeira fatia entrar

## Itens não elegíveis sem direção humana

- auth, Supabase, multiusuário e sync em nuvem
- pricing, refund, regras comerciais e critérios jurídicos
- expansão grande de conteúdo editorial real
- features fora do roadmap ativo

## Regra de no-op

Se a próxima fatia segura não estiver clara, a automação deve:

1. registrar o bloqueio aqui
2. não inventar escopo novo
3. encerrar sem mudanças paralelas

## Validação obrigatória

- `npm run test`
- `npm run lint`
- `npm run build`

## Última atualização

- data: `2026-03-31`
- origem: `bootstrap manual do loop autônomo`
- resultado: `workflow, prompt persistente e status operacional criados`
- próximo passo: `abrir a primeira fatia de R3 com contrato local de fila de revisão`
