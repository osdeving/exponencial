import fs from 'node:fs/promises';
import path from 'node:path';
import { buildCanonicalPlaceholderCurriculum, resolveTopicCanonicalIds } from './canonical-taxonomy.mjs';
import { curriculum, getLessonMarkdown, getTopicMarkdown } from './curriculum-seed.mjs';
import {
  contentRoot,
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

for (const filePath of await getMarkdownFiles(contentRoot)) {
  if (!isTopicMarkdownFile(filePath)) {
    continue;
  }

  const source = await fs.readFile(filePath, 'utf8');
  const { data } = parseFrontmatter(source, filePath);
  const explicitCanonicalIds = Array.isArray(data.canonicalIds) ? data.canonicalIds.map(String) : [];

  resolveTopicCanonicalIds(String(data.id), explicitCanonicalIds).forEach((canonicalId) => {
    coveredCanonicalIds.add(canonicalId);
  });
}

const scaffoldCurriculum = [...curriculum, ...(await buildCanonicalPlaceholderCurriculum(Array.from(coveredCanonicalIds)))];

for (const topicEntry of scaffoldCurriculum) {
  const topicDir = path.join(contentRoot, slugify(topicEntry.level), slugify(topicEntry.stage), topicEntry.id);
  const topicFile = path.join(topicDir, '_topic.md');
  const topicMarkdown = getTopicMarkdown(topicEntry);

  if (await writeFileIfMissing(topicFile, `${serializeFrontmatter(topicMarkdown.frontmatter)}${topicMarkdown.body.trim()}\n`)) {
    createdTopics += 1;
  }

  for (const lessonEntry of topicEntry.lessons) {
    const lessonFile = path.join(topicDir, `${padOrder(lessonEntry.order)}-${lessonEntry.slug}.md`);
    const lessonMarkdown = getLessonMarkdown(topicEntry, lessonEntry);

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
