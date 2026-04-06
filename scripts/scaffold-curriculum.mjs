import fs from 'node:fs/promises';
import path from 'node:path';
import { buildCanonicalPlaceholderCurriculum } from './canonical-taxonomy.mjs';
import {
  contentRoot,
  ensureDirectory,
  getMarkdownFiles,
  isTopicMarkdownFile,
  padOrder,
  parseFrontmatter,
  serializeFrontmatter,
  slugify,
  writeFileIfMissing,
} from './content-utils.mjs';

let createdTopics = 0;
let createdLessons = 0;

const coveredCanonicalIds = new Set();

await ensureDirectory(contentRoot);

for (const filePath of await getMarkdownFiles(contentRoot)) {
  if (!isTopicMarkdownFile(filePath)) {
    continue;
  }

  const source = await fs.readFile(filePath, 'utf8');
  const { data } = parseFrontmatter(source, filePath);
  const explicitCanonicalIds = Array.isArray(data.canonicalIds) ? data.canonicalIds.map(String) : [];

  if (explicitCanonicalIds.length === 0) {
    throw new Error(`Tópico sem canonicalIds em ${filePath}. O padrão canônico agora é obrigatório.`);
  }

  explicitCanonicalIds.forEach((canonicalId) => {
    coveredCanonicalIds.add(canonicalId);
  });
}

const scaffoldCurriculum = await buildCanonicalPlaceholderCurriculum(Array.from(coveredCanonicalIds));

for (const topicEntry of scaffoldCurriculum) {
  const topicDir = path.join(contentRoot, slugify(topicEntry.level), slugify(topicEntry.stage), topicEntry.id);
  const topicFile = path.join(topicDir, '_topic.md');
  const topicMarkdown = {
    frontmatter: {
      id: topicEntry.id,
      title: topicEntry.title,
      description: topicEntry.description,
      level: topicEntry.level,
      stage: topicEntry.stage,
      category: topicEntry.category,
      icon: topicEntry.icon,
      order: topicEntry.order,
      tags: topicEntry.tags,
      canonicalIds: topicEntry.canonicalIds,
    },
    body: `# ${topicEntry.title}\n\n${topicEntry.overview}\n`,
  };

  if (await writeFileIfMissing(topicFile, `${serializeFrontmatter(topicMarkdown.frontmatter)}${topicMarkdown.body.trim()}\n`)) {
    createdTopics += 1;
  }

  for (const lessonEntry of topicEntry.lessons) {
    const lessonFile = path.join(topicDir, `${padOrder(lessonEntry.order)}-${lessonEntry.slug}.md`);
    const lessonMarkdown = {
      frontmatter: {
        id: lessonEntry.id,
        topicId: topicEntry.id,
        title: lessonEntry.title,
        difficulty: lessonEntry.difficulty,
        estimatedMinutes: lessonEntry.estimatedMinutes,
        order: lessonEntry.order,
        summary: lessonEntry.summary,
        status: lessonEntry.status,
        goals: lessonEntry.goals,
        prerequisites: lessonEntry.prerequisites,
        tags: lessonEntry.tags,
        canonicalIds: lessonEntry.canonicalIds,
      },
      body: `
# ${lessonEntry.title}

> Estrutura pronta para conteúdo. Substitua este texto pelo tutorial completo em Markdown.

## Resumo da aula

${lessonEntry.summary}

## Objetivos de aprendizagem

${lessonEntry.goals.map((goal) => `- ${goal}`).join('\n')}

## Pré-requisitos

- Revise os conceitos anteriores do módulo.
- Traga exemplos curtos antes de formalizar.

## Desenvolvimento

Escreva aqui a explicação principal, exemplos resolvidos, observações e contraexemplos.

### Exemplo com KaTeX

Use fórmulas inline como $a^2 + b^2 = c^2$ ou blocos:

$$
\\frac{x+3}{2} = 5
$$

## Exercícios sugeridos

1. Crie 3 exercícios diretos.
2. Adicione 2 exercícios contextualizados.
3. Feche com 1 questão de revisão.
`,
    };

    if (
      await writeFileIfMissing(
        lessonFile,
        `${serializeFrontmatter(lessonMarkdown.frontmatter)}${lessonMarkdown.body.trim()}\n`,
      )
    ) {
      createdLessons += 1;
    }
  }
}

console.log(`Scaffold concluído: ${createdTopics} tópicos e ${createdLessons} lições criados em src/content.`);
