# Trunk-Based Delivery

## Objetivo

Estabelecer um fluxo profissional de entrega para o Exponencial com `main` como trunk protegida, PRs pequenas e releases cumulativas.

## Estratégia

- `main` é a única branch de longa duração
- toda feature sai de branch curta derivada de `main`
- merge preferencial via squash
- cada merge em `main` representa um incremento potencialmente liberável
- releases são recortes intencionais do que já está estável em `main`

## Convenções de branch

- `feat/<escopo-curto>`
- `fix/<escopo-curto>`
- `docs/<escopo-curto>`
- `chore/<escopo-curto>`
- `refactor/<escopo-curto>`

Exemplos:

- `feat/local-mastery-gating`
- `fix/path-locking`
- `docs/r1-mastery-roadmap`

## Convenções de issue

Use issue templates para manter o backlog operacional:

- epic
- feature
- bug
- tech debt

Cada issue deve carregar:

- release alvo
- área
- prioridade
- critério de aceite

## Fluxo de PR

1. abrir branch curta a partir de `main`
2. implementar uma fatia pequena do roadmap
3. atualizar documentação e testes necessários
4. abrir PR usando o template padrão
5. passar na CI
6. fazer squash merge em `main`

## Definition of Ready

Uma entrega está pronta para entrar em desenvolvimento quando:

- o problema está descrito
- a release alvo está definida
- o critério de aceite está claro
- o impacto em dados, UX e telemetria foi considerado

## Definition of Done

Uma entrega só está pronta quando:

- código e docs estão sincronizados
- CI passou
- roadmap ou backlog foi atualizado quando necessário
- mudanças de produto têm critério de aceite verificável
- mudanças de storage ou contrato têm nota arquitetural mínima

## Esteira de GitHub

### CI

Toda PR e todo push para `main` devem executar:

- geração de conteúdo
- typecheck
- testes
- build

### Release notes

O repositório mantém draft de release automaticamente com base em labels de PR.

### Deploy

Push em `main` continua gerando deploy do GitHub Pages.

## Versionamento

O projeto deve usar tags `v0.x.y` enquanto o produto ainda estiver amadurecendo.

Sugestão:

- `major`: mudança incompatível de contrato
- `minor`: nova capacidade funcional relevante
- `patch`: correção ou ajuste incremental

## Cadência de release

No estágio atual, a cadência recomendada é:

- merges contínuos em `main`
- revisão semanal do backlog
- tag de release ao fechar um marco verificável do roadmap

## Artefatos por release

Cada release deve ter:

- milestone
- conjunto claro de issues
- release notes
- estado arquitetural atualizado se houver mudança estrutural
- nota sobre rollout e riscos

## Ambientes

Hoje:

- local
- produção em GitHub Pages

Próximo estágio sugerido:

- manter produção em Pages no curto prazo
- consolidar primeiro o loop local-first e os contratos de storage/session
- introduzir Supabase como primeira camada remota quando sincronização e contas passarem a ser prioridade real

## Regras de governança

- `main` protegida
- force push desabilitado
- merge só com PR
- CI obrigatória
- histórico linear
- branch apagada após merge

## Relação com conteúdo

O fluxo trunk-based vale tanto para engenharia quanto para conteúdo. Mesmo quando a entrega for só Markdown:

- a mudança entra por branch curta
- o PR documenta o que mudou
- a release sabe onde a plataforma está
