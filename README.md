# Exponencial

Plataforma de estudos de matemática orientada a conteúdo. A meta do projeto é simples: o site deve se comportar como um **renderer** com trilhas, teoria, exercícios, gabaritos e progresso, enquanto o conteúdo curricular vem de arquivos declarativos e não de código espalhado pela UI.

## Leitura rápida

- Arquitetura e limites do sistema: [docs/architecture.md](docs/architecture.md)
- Fluxo de autoria de conteúdo: [docs/content-authoring.md](docs/content-authoring.md)
- Instruções operacionais para IA e agentes: [AGENTS.md](AGENTS.md)

## Rodar localmente

Pré-requisito: Node.js.

```bash
npm install
npm run dev
```

Outros comandos úteis:

```bash
npm run content:scaffold
npm run content:generate
npm run lint
npm run build
```

## Modelo atual de conteúdo

Hoje o projeto já está parcialmente orientado a conteúdo:

- tópicos e lições teóricas vivem em `src/content/**`
- o manifesto de conteúdo é gerado em `src/generated/content-manifest.ts`
- exercícios e gabaritos ainda vivem em `src/content/exercises/*.ts`

Ou seja: a teoria já está próxima do modelo final de "editar texto e publicar". A parte de exercícios ainda não.

## Regra prática

Se a mudança for apenas curricular, a preferência é:

1. editar Markdown em `src/content/**`
2. só tocar em TypeScript quando a fonte atual ainda não tiver migrado, como acontece com exercícios
3. não editar `src/generated/content-manifest.ts` manualmente
