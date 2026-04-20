import fs from 'node:fs/promises';
import path from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import { buildTopicTaxonomyEntry, loadCanonicalTaxonomy } from './canonical-taxonomy.mjs';
import {
  contentRoot,
  ensureDirectory,
  generatedRoot,
  getMarkdownFiles,
  isQuestionMarkdownFile,
  isTopicMarkdownFile,
  parseFrontmatter,
} from './content-utils.mjs';
import { parseQuestionFile } from './question-utils.mjs';

const validLessonStatuses = new Set(['outline', 'in-progress', 'ready']);
const topicFiles = [];
const lessonFiles = [];
const questionFiles = [];
const generatedLessonsRoot = path.join(generatedRoot, 'lessons');
const generatedQuestionsRoot = path.join(generatedRoot, 'questions');
const canonicalTaxonomy = await loadCanonicalTaxonomy();

// Evita duas geracoes concorrentes sobrescrevendo src/generated ao mesmo tempo.
async function acquireGenerationLock() {
  await ensureDirectory(generatedRoot);
  const lockPath = path.join(generatedRoot, '.content-generate.lock');

  for (let attempt = 0; attempt < 300; attempt += 1) {
    try {
      const handle = await fs.open(lockPath, 'wx');
      await handle.writeFile(
        JSON.stringify({
          pid: process.pid,
          acquiredAt: new Date().toISOString(),
        }),
      );

      return async () => {
        await handle.close();
        await fs.rm(lockPath, { force: true });
      };
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code !== 'EEXIST') {
        throw error;
      }

      try {
        const stats = await fs.stat(lockPath);
        if (Date.now() - stats.mtimeMs > 60_000) {
          await fs.rm(lockPath, { force: true });
          continue;
        }
      } catch {}

      await sleep(100);
    }
  }

  throw new Error('Não foi possível adquirir o lock de geração em src/generated/.content-generate.lock.');
}

try {
  await fs.access(contentRoot);
} catch {
  throw new Error('src/content não existe. Rode `npm run content:scaffold` primeiro.');
}

const releaseGenerationLock = await acquireGenerationLock();

try {

for (const filePath of await getMarkdownFiles(contentRoot)) {
  // A convencao de nome decide se o Markdown e topico, licao ou questoes.
  if (isQuestionMarkdownFile(filePath)) {
    questionFiles.push(filePath);
  } else if (isTopicMarkdownFile(filePath)) {
    topicFiles.push(filePath);
  } else {
    lessonFiles.push(filePath);
  }
}

const topics = [];

for (const filePath of topicFiles) {
  const source = await fs.readFile(filePath, 'utf8');
  const { data } = parseFrontmatter(source, filePath);

  const required = ['id', 'title', 'description', 'level', 'stage', 'category', 'icon', 'order'];
  for (const key of required) {
    if (!(key in data)) {
      throw new Error(`Campo obrigatório ausente em tópico (${filePath}): ${key}`);
    }
  }

  topics.push({
    id: String(data.id),
    title: String(data.title),
    description: String(data.description),
    level: String(data.level),
    stage: String(data.stage),
    category: String(data.category),
    icon: String(data.icon),
    order: Number(data.order),
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    canonicalIds: Array.isArray(data.canonicalIds) ? data.canonicalIds.map(String) : [],
  });
}

for (const topic of topics) {
  if ((topic.canonicalIds ?? []).length === 0) {
    throw new Error(`Tópico sem canonicalIds: ${topic.id}`);
  }

  for (const canonicalId of topic.canonicalIds ?? []) {
    if (!canonicalTaxonomy.subsectionById.has(canonicalId)) {
      throw new Error(`canonicalId inválido em tópico (${topic.id}): ${canonicalId}`);
    }
  }
}

const topicById = new Map(topics.map((topic) => [topic.id, topic]));
const topicIds = new Set();

for (const topic of topics) {
  if (topicIds.has(topic.id)) {
    throw new Error(`Topic id duplicado: ${topic.id}`);
  }
  topicIds.add(topic.id);
}

const lessons = [];
const lessonIds = new Set();
const lessonOrderIndex = new Map();

for (const filePath of lessonFiles) {
  const source = await fs.readFile(filePath, 'utf8');
  const { data, content } = parseFrontmatter(source, filePath);
  const required = ['id', 'topicId', 'title', 'difficulty', 'estimatedMinutes', 'order', 'summary', 'status'];

  for (const key of required) {
    if (!(key in data)) {
      throw new Error(`Campo obrigatório ausente em lição (${filePath}): ${key}`);
    }
  }

  const lessonId = String(data.id);
  if (lessonIds.has(lessonId)) {
    throw new Error(`Lesson id duplicado: ${lessonId}`);
  }
  lessonIds.add(lessonId);

  const topicId = String(data.topicId);
  if (!topicById.has(topicId)) {
    throw new Error(`Lição ${lessonId} aponta para topicId inexistente: ${topicId}`);
  }

  lessons.push({
    id: lessonId,
    topicId,
    title: String(data.title),
    content,
    difficulty: String(data.difficulty),
    estimatedMinutes: Number(data.estimatedMinutes),
    order: Number(data.order),
    summary: String(data.summary),
    goals: Array.isArray(data.goals) ? data.goals.map(String) : [],
    prerequisites: Array.isArray(data.prerequisites) ? data.prerequisites.map(String) : [],
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    status: String(data.status),
    canonicalIds: Array.isArray(data.canonicalIds) ? data.canonicalIds.map(String) : [],
  });

  if (!validLessonStatuses.has(String(data.status))) {
    throw new Error(
      `Status inválido em lição (${filePath}): ${String(data.status)}. Use outline, in-progress ou ready.`,
    );
  }
}

for (const lesson of lessons) {
  // Licoes apontam para folhas canonicas; topicos apontam para subsecoes canonicas.
  if ((lesson.canonicalIds ?? []).length === 0) {
    throw new Error(`Lição sem canonicalIds: ${lesson.id}`);
  }

  for (const canonicalId of lesson.canonicalIds ?? []) {
    const canonicalTopicId = canonicalId.split('.').slice(0, 2).join('.');
    const lessonCanonicalTopicIds = new Set(topicById.get(lesson.topicId)?.canonicalIds ?? []);

    if (canonicalId.split('.').length < 3) {
      throw new Error(`canonicalId inválido em lição (${lesson.id}): ${canonicalId}`);
    }

    if (!canonicalTaxonomy.leafTopicIds.has(canonicalId)) {
      throw new Error(`canonicalId de lição inexistente (${lesson.id}): ${canonicalId}`);
    }

    if (lessonCanonicalTopicIds.size > 0 && !lessonCanonicalTopicIds.has(canonicalTopicId)) {
      throw new Error(
        `canonicalId da lição ${lesson.id} não pertence aos canonicalIds do tópico ${lesson.topicId}: ${canonicalId}`,
      );
    }
  }
}

topics.sort((left, right) => left.order - right.order || left.title.localeCompare(right.title, 'pt-BR'));
lessons.sort(
  (left, right) =>
    topics.findIndex((topic) => topic.id === left.topicId) - topics.findIndex((topic) => topic.id === right.topicId) ||
    left.order - right.order ||
    left.title.localeCompare(right.title, 'pt-BR'),
);

for (const [index, lesson] of lessons.entries()) {
  lessonOrderIndex.set(lesson.id, index);
}

const questions = [];
const questionIds = new Set();

for (const filePath of questionFiles) {
  const source = await fs.readFile(filePath, 'utf8');
  const { data, content } = parseFrontmatter(source, filePath);
  const lessonId = String(data.lessonId);

  if (!lessonIds.has(lessonId)) {
    throw new Error(`Arquivo de questões aponta para lessonId inexistente (${lessonId}) em ${filePath}.`);
  }

  for (const question of parseQuestionFile(content, filePath, data)) {
    if (questionIds.has(question.id)) {
      throw new Error(`Question id duplicado: ${question.id}`);
    }
    questionIds.add(question.id);
    questions.push(question);
  }
}

questions.sort(
  (left, right) =>
    (lessonOrderIndex.get(left.lessonId) ?? Number.MAX_SAFE_INTEGER) -
      (lessonOrderIndex.get(right.lessonId) ?? Number.MAX_SAFE_INTEGER) ||
    (left.number ?? 0) - (right.number ?? 0) ||
    left.id.localeCompare(right.id, 'pt-BR'),
);

const lessonMetadata = lessons.map((lesson) => ({
  ...lesson,
  // O manifesto principal carrega metadados; o corpo Markdown fica em modulo lazy separado.
  content: '',
}));

const topicTaxonomyByTopicId = Object.fromEntries(
  topics.map((topic) => [
    topic.id,
    buildTopicTaxonomyEntry(topic.canonicalIds ?? [], canonicalTaxonomy.subsectionById),
  ]),
);

const questionsByLessonId = questions.reduce((accumulator, question) => {
  const currentQuestions = accumulator.get(question.lessonId) ?? [];
  currentQuestions.push(question);
  accumulator.set(question.lessonId, currentQuestions);
  return accumulator;
}, new Map());

const output = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Edite os arquivos em src/content/**/*.md.

import { Lesson, Topic } from '../types';

export const TOPICS: Topic[] = ${JSON.stringify(topics, null, 2)};

export const LESSONS: Lesson[] = ${JSON.stringify(lessonMetadata, null, 2)};
`;

const lessonContentIndexOutput = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Edite os arquivos em src/content/**/*.md.

export const LESSON_CONTENT_IMPORTERS = {
${lessons.map((lesson) => `  "${lesson.id}": () => import('./lessons/${lesson.id}.ts'),`).join('\n')}
} as const;
`;

const questionIndexOutput = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Edite os arquivos em src/content/**/*.questions.md.

export const QUESTION_COUNTS_BY_LESSON_ID: Record<string, number> = ${JSON.stringify(
  Object.fromEntries(
    lessons.map((lesson) => [lesson.id, questionsByLessonId.get(lesson.id)?.length ?? 0]),
  ),
  null,
  2,
)};

export const QUESTION_IMPORTERS = {
${Array.from(questionsByLessonId.keys())
  .sort((left, right) => (lessonOrderIndex.get(left) ?? 0) - (lessonOrderIndex.get(right) ?? 0))
  .map((lessonId) => `  "${lessonId}": () => import('./questions/${lessonId}.ts'),`)
  .join('\n')}
} as const;
`;

const canonicalTaxonomyOutput = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Fonte: docs/estrutura/*

export const CANONICAL_SUBSECTIONS = ${JSON.stringify(canonicalTaxonomy.subsections, null, 2)};
`;

const topicTaxonomyOutput = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Fonte: docs/estrutura/* + mapeamento de tópicos do app

export const TOPIC_TAXONOMY_BY_TOPIC_ID = ${JSON.stringify(topicTaxonomyByTopicId, null, 2)};
`;

await ensureDirectory(generatedRoot);
await fs.rm(generatedLessonsRoot, { recursive: true, force: true });
await fs.rm(generatedQuestionsRoot, { recursive: true, force: true });
await ensureDirectory(generatedLessonsRoot);
await ensureDirectory(generatedQuestionsRoot);

for (const lesson of lessons) {
  const lessonContentOutput = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Edite os arquivos em src/content/**/*.md.

export const CONTENT = ${JSON.stringify(lesson.content, null, 2)};
`;

  await fs.writeFile(path.join(generatedLessonsRoot, `${lesson.id}.ts`), lessonContentOutput, 'utf8');
}

for (const lessonId of Array.from(questionsByLessonId.keys()).sort(
  (left, right) => (lessonOrderIndex.get(left) ?? 0) - (lessonOrderIndex.get(right) ?? 0),
)) {
  const questionModuleOutput = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Edite os arquivos em src/content/**/*.questions.md.

import type { Question } from '../../types';

export const QUESTIONS: Question[] = ${JSON.stringify(questionsByLessonId.get(lessonId), null, 2)};
`;

  await fs.writeFile(path.join(generatedQuestionsRoot, `${lessonId}.ts`), questionModuleOutput, 'utf8');
}

await fs.writeFile(path.join(generatedRoot, 'content-manifest.ts'), output, 'utf8');
await fs.writeFile(path.join(generatedRoot, 'lesson-content-index.ts'), lessonContentIndexOutput, 'utf8');
await fs.writeFile(path.join(generatedRoot, 'canonical-taxonomy.ts'), canonicalTaxonomyOutput, 'utf8');
await fs.writeFile(path.join(generatedRoot, 'question-index.ts'), questionIndexOutput, 'utf8');
await fs.writeFile(path.join(generatedRoot, 'topic-taxonomy.ts'), topicTaxonomyOutput, 'utf8');
await fs.rm(path.join(generatedRoot, 'question-manifest.ts'), { force: true });

console.log(`Manifestos gerados: ${topics.length} tópicos, ${lessons.length} lições e ${questions.length} questões.`);
} finally {
  await releaseGenerationLock();
}
