import path from 'node:path';
import { curriculum, getLessonMarkdown, getTopicMarkdown } from './curriculum-seed.mjs';
import { contentRoot, padOrder, serializeFrontmatter, slugify, writeFileIfMissing } from './content-utils.mjs';

let createdTopics = 0;
let createdLessons = 0;

for (const topicEntry of curriculum) {
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
