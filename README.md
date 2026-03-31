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

Hoje o projeto já está orientado a conteúdo no fluxo curricular:

- tópicos e lições teóricas vivem em `src/content/**`
- exercícios e gabaritos vivem em arquivos `*.questions.md` ao lado das lições
- soluções passo a passo também podem viver no próprio `*.questions.md`
- os manifestos são gerados em `src/generated/content-manifest.ts` e `src/generated/question-manifest.ts`

Ou seja: teoria, exercícios e gabaritos entram no app por conteúdo declarativo. A UI continua responsável só por renderizar contratos estáveis e comportamentos do produto.

Na aplicação, a divisão atual é:

- `src/content/**` e `src/generated/*`: fonte e manifestos curriculares
- `src/config/*`: badges, trilhas e ranking
- `src/app/*`: shell, views e hooks de persistência/navegação
- `src/components/*`: blocos visuais e renderers
- `src/lib/*`: regras de domínio

## Regra prática

Se a mudança for apenas curricular, a preferência é:

1. editar Markdown em `src/content/**`
2. usar `*.questions.md` para prática e gabarito da lição
3. usar `### Solução` quando a questão precisar de resolução estruturada
4. não editar `src/generated/*.ts` manualmente
