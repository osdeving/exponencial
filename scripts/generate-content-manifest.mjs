import fs from 'node:fs/promises';
import path from 'node:path';
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

const topicFiles = [];
const lessonFiles = [];
const questionFiles = [];

try {
  await fs.access(contentRoot);
} catch {
  throw new Error('src/content não existe. Rode `npm run content:scaffold` primeiro.');
}

for (const filePath of await getMarkdownFiles(contentRoot)) {
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
  });
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
  });
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

const output = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Edite os arquivos em src/content/**/*.md.

import { Lesson, Topic } from '../types';

export const TOPICS: Topic[] = ${JSON.stringify(topics, null, 2)};

export const LESSONS: Lesson[] = ${JSON.stringify(lessons, null, 2)};
`;

const questionsOutput = `/* eslint-disable */
// Arquivo gerado automaticamente por scripts/generate-content-manifest.mjs
// Edite os arquivos em src/content/**/*.questions.md.

import { Question } from '../types';

export const QUESTIONS: Question[] = ${JSON.stringify(questions, null, 2)};
`;

await ensureDirectory(generatedRoot);
await fs.writeFile(path.join(generatedRoot, 'content-manifest.ts'), output, 'utf8');
await fs.writeFile(path.join(generatedRoot, 'question-manifest.ts'), questionsOutput, 'utf8');

console.log(`Manifestos gerados: ${topics.length} tópicos, ${lessons.length} lições e ${questions.length} questões.`);
