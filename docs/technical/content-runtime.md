# Runtime de Conteúdo

## Objetivo

Definir como teoria e exercícios devem ser publicados e servidos em runtime sem exigir redeploy do frontend.

## Estado atual versus alvo

Hoje o repositório ainda opera com conteúdo versionado em `src/content/**` e manifesto gerado em build por `npm run content:generate`.

Este documento descreve o **modelo-alvo** de runtime remoto, publicação e rollback, que ainda não substituiu o fluxo local atual.

## Princípios

- Markdown continua sendo a fonte canônica de autoria
- o frontend não recompila para cada ajuste editorial
- cada publicação gera uma release identificável
- lições e exercícios são carregados sob demanda

## Fonte de autoria

Continuam válidos:

- tópicos em `_topic.md`
- lições em `*.md`
- exercícios em `*.questions.md`

O repositório continua sendo a fonte de revisão, histórico e governança editorial.

## Pipeline de publicação alvo

1. autor altera Markdown
2. pipeline valida contratos e consistência
3. pipeline gera uma release publicada
4. manifesto e documentos são enviados ao backend
5. release é marcada como ativa

## Modelo recomendado de publicação

### Manifesto publicado

O app deve começar pela leitura de um manifesto de release, contendo:

- `release_id`
- `published_at`
- lista de tópicos
- lista de lições com metadados
- referência para teoria
- referência para exercícios

### Conteúdo de teoria

Estratégia recomendada:

- armazenar o corpo Markdown em bucket ou tabela dedicada
- o manifesto aponta para a localização e versão do documento

### Conteúdo de exercícios

Estratégia recomendada:

- publicar conjunto estruturado de questões em JSON derivado do Markdown canônico
- manter referência da origem e da release correspondente

## Exemplo de contrato do manifesto

```json
{
  "releaseId": "content-2026-04-05-001",
  "publishedAt": "2026-04-05T12:00:00Z",
  "topics": [],
  "lessons": [
    {
      "id": "fractions-intro",
      "topicId": "fractions",
      "title": "Introdução às Frações",
      "theoryPath": "theory/fractions-intro.md",
      "questionsPath": "questions/fractions-intro.json"
    }
  ]
}
```

## Consumo no frontend

Fluxo recomendado:

1. buscar release ativa
2. carregar manifesto
3. montar catálogo com base no manifesto
4. ao abrir uma lição, buscar teoria e questões daquela release

## Cache e invalidação

- manifesto pode ser cacheado por curto período
- teoria e questões devem ser versionadas por release
- mudança de release invalida referências anteriores sem quebrar histórico

## Rollback

Requisito operacional:

- o sistema deve permitir reativar uma release anterior
- o frontend deve passar a consumir a release reativada sem novo deploy

## Benefícios do modelo

- edição editorial desacoplada do ciclo de deploy do shell
- rollback seguro
- auditoria por release
- menor acoplamento entre UI e conteúdo

## Riscos técnicos

- manifestos inconsistentes entre teoria e questões
- cache apontando para release errada
- contratos de frontmatter insuficientes para novos formatos

## Estratégia de teste

- validar parser e publicação
- validar manifesto
- validar carregamento em runtime
- validar rollback de release
