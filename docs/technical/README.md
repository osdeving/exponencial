# Documentação Técnica

## Objetivo

Concentrar os documentos técnicos que detalham contratos, fluxos e modelo-alvo de implementação.

## Ordem de leitura recomendada

1. [../architecture.md](../architecture.md)
2. [content-runtime.md](content-runtime.md)
3. [supabase-architecture.md](supabase-architecture.md)

## Papel de cada documento

- [../architecture.md](../architecture.md): DAS da solução.
- [content-runtime.md](content-runtime.md): modelo técnico de publicação e consumo de conteúdo em Markdown.
- [supabase-architecture.md](supabase-architecture.md): modelo técnico de auth, dados, storage, RLS e jobs.

## Regra prática

Se uma mudança tocar:

- autenticação
- schema de dados
- release de conteúdo
- runtime de lição/exercício
- revisão
- ranking

então estes documentos devem ser atualizados junto da implementação.
