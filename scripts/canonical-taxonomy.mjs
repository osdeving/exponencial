import fs from 'node:fs/promises';
import path from 'node:path';
import { projectRoot, slugify } from './content-utils.mjs';

const structureRoot = path.join(projectRoot, 'docs', 'estrutura');
const idsPath = path.join(structureRoot, '99_index_ids.json');
const schoolYearViewPath = path.join(structureRoot, '03_visao_por_ano_escolar.md');
const levelViewPath = path.join(structureRoot, '04_visao_por_nivel.md');
const examViewPath = path.join(structureRoot, '05_visao_por_perfil_de_prova.md');

const subsectionPattern = /^-\s+\*\*([A-Z]{3}\.\d{2})\s+—\s+(.+?)\*\*$/;
const headingPattern = /^##\s+(.+?)\s*$/;
const sectionIcons = {
  SET: 'Braces',
  NUM: 'Calculator',
  ALG: 'Variable',
  FUN: 'ChartSpline',
  GEO: 'Ruler',
  TRI: 'Triangle',
  AGE: 'Map',
  DAT: 'BarChart3',
  CAL: 'Infinity',
};

function stripFlags(value) {
  return value.replace(/\s*\[[^\]]+\]\s*/g, ' ').replace(/\s+/g, ' ').trim();
}

function uniqueSorted(values, order) {
  return Array.from(new Set(values)).sort((left, right) => (order.get(left) ?? Number.MAX_SAFE_INTEGER) - (order.get(right) ?? Number.MAX_SAFE_INTEGER));
}

function parseInlineFlags(value) {
  const matches = value.match(/\[([^\]]+)\]/g) ?? [];
  return matches
    .flatMap((match) =>
      match
        .slice(1, -1)
        .split('/')
        .map((item) => item.trim().toLowerCase())
        .filter(Boolean),
    );
}

function getSchoolYearMeta(label) {
  const normalized = label.trim();

  if (normalized === 'Pré / Educação infantil / Kindergarten') {
    return {
      level: 'Fundamental',
      stageLabel: 'Base inicial',
      stageDir: 'base-inicial',
      order: 0,
    };
  }

  const fundamentalMatch = normalized.match(/^(\d+)º ano do EF$/);
  if (fundamentalMatch) {
    const year = Number(fundamentalMatch[1]);
    return {
      level: 'Fundamental',
      stageLabel: `${year}º ano`,
      stageDir: `${year}-ano`,
      order: year,
    };
  }

  const secondaryMatch = normalized.match(/^(\d+)ª série do EM$/);
  if (secondaryMatch) {
    const year = Number(secondaryMatch[1]);
    return {
      level: 'Médio',
      stageLabel: `${year}ª série`,
      stageDir: `${year}-serie`,
      order: 100 + year,
    };
  }

  return {
    level: normalized.includes('EM') ? 'Médio' : 'Fundamental',
    stageLabel: normalized,
    stageDir: slugify(normalized) || 'geral',
    order: 999,
  };
}

async function parseGroupedView(filePath, sanitizeHeading) {
  const source = await fs.readFile(filePath, 'utf8');
  const groupsBySubsectionId = new Map();
  const headingOrder = new Map();
  let currentHeading = null;

  for (const line of source.split('\n')) {
    const headingMatch = line.match(headingPattern);
    if (headingMatch) {
      currentHeading = sanitizeHeading ? sanitizeHeading(headingMatch[1].trim()) : headingMatch[1].trim();
      if (!headingOrder.has(currentHeading)) {
        headingOrder.set(currentHeading, headingOrder.size);
      }
      continue;
    }

    const subsectionMatch = line.match(subsectionPattern);
    if (subsectionMatch && currentHeading) {
      const subsectionId = subsectionMatch[1];
      const currentGroups = groupsBySubsectionId.get(subsectionId) ?? [];
      currentGroups.push(currentHeading);
      groupsBySubsectionId.set(subsectionId, currentGroups);
    }
  }

  return {
    groupsBySubsectionId,
    headingOrder,
  };
}

export async function loadCanonicalTaxonomy() {
  try {
    await fs.access(idsPath);
    await fs.access(schoolYearViewPath);
    await fs.access(levelViewPath);
    await fs.access(examViewPath);
  } catch {
    throw new Error(
      'A taxonomia canônica não foi encontrada em docs/estrutura. Garanta que a pasta docs/estrutura esteja versionada antes de rodar o scaffold ou a geração de manifesto.',
    );
  }

  const ids = JSON.parse(await fs.readFile(idsPath, 'utf8'));
  const sections = ids.filter((item) => item.kind === 'section');
  const subsections = ids.filter((item) => item.kind === 'subsection');
  const leafTopics = ids.filter((item) => item.kind === 'topic');

  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const leafTopicsBySubsectionId = leafTopics.reduce((accumulator, topic) => {
    const currentTopics = accumulator.get(topic.parent_id) ?? [];
    currentTopics.push({
      id: topic.id,
      title: stripFlags(topic.title),
      flags: Array.isArray(topic.flags) ? topic.flags : parseInlineFlags(topic.title),
    });
    accumulator.set(topic.parent_id, currentTopics);
    return accumulator;
  }, new Map());

  const schoolYearView = await parseGroupedView(schoolYearViewPath);
  const levelView = await parseGroupedView(levelViewPath);
  const examView = await parseGroupedView(examViewPath, (heading) => heading.replace(/^Perfil\s+\d+\s+—\s+/, '').trim());

  const subsectionRecords = subsections.map((subsection, index) => {
    const section = sectionById.get(subsection.parent_id);
    const schoolYearBands = uniqueSorted(
      schoolYearView.groupsBySubsectionId.get(subsection.id) ?? [],
      schoolYearView.headingOrder,
    );
    const levelBands = uniqueSorted(
      levelView.groupsBySubsectionId.get(subsection.id) ?? [],
      levelView.headingOrder,
    );
    const examProfiles = uniqueSorted(
      examView.groupsBySubsectionId.get(subsection.id) ?? [],
      examView.headingOrder,
    );
    const topicFlags = Array.from(
      new Set([
        ...parseInlineFlags(subsection.title),
        ...(leafTopicsBySubsectionId.get(subsection.id) ?? []).flatMap((topic) => topic.flags),
      ]),
    );
    const schoolYearMeta = schoolYearBands.map(getSchoolYearMeta).sort((left, right) => left.order - right.order);
    const primaryYear = schoolYearMeta[0];
    const lastYear = schoolYearMeta[schoolYearMeta.length - 1];
    const stageLabel =
      primaryYear && lastYear && primaryYear.stageLabel !== lastYear.stageLabel
        ? `${primaryYear.stageLabel} ao ${lastYear.stageLabel}`
        : primaryYear?.stageLabel ?? 'Geral';
    const levelBandsNormalized = Array.from(
      new Set(schoolYearMeta.map((entry) => entry.level).filter(Boolean)),
    );

    return {
      id: subsection.id,
      title: stripFlags(subsection.title),
      rawTitle: subsection.title,
      sectionId: subsection.parent_id,
      sectionTitle: stripFlags(section?.title ?? subsection.parent_id),
      branchTitle: stripFlags(section?.title ?? subsection.parent_id),
      order: index,
      icon: sectionIcons[subsection.parent_id] ?? 'BookOpen',
      schoolYearBands,
      levelBands: levelBandsNormalized,
      taxonomyLevelBands: levelBands,
      examProfiles,
      flags: topicFlags,
      lessons: leafTopicsBySubsectionId.get(subsection.id) ?? [],
      primaryLevel: primaryYear?.level ?? levelBandsNormalized[0] ?? 'Fundamental',
      primaryStage: stageLabel,
      primaryStageDir: primaryYear?.stageDir ?? 'geral',
    };
  });

  return {
    sections,
    subsections: subsectionRecords,
    leafTopicIds: new Set(leafTopics.map((topic) => topic.id)),
    subsectionById: new Map(subsectionRecords.map((record) => [record.id, record])),
  };
}

export function buildTopicTaxonomyEntry(canonicalIds, canonicalSubsectionById) {
  const resolvedCanonicalIds = Array.from(new Set(canonicalIds)).filter(Boolean);
  const canonicalRecords = resolvedCanonicalIds
    .map((canonicalId) => canonicalSubsectionById.get(canonicalId))
    .filter(Boolean);

  const branchIds = Array.from(new Set(canonicalRecords.map((record) => record.sectionId)));
  const branchTitles = Array.from(new Set(canonicalRecords.map((record) => record.branchTitle)));
  const schoolYearBands = Array.from(new Set(canonicalRecords.flatMap((record) => record.schoolYearBands)));
  const levelBands = Array.from(new Set(canonicalRecords.flatMap((record) => record.levelBands)));
  const taxonomyLevelBands = Array.from(new Set(canonicalRecords.flatMap((record) => record.taxonomyLevelBands)));
  const examProfiles = Array.from(new Set(canonicalRecords.flatMap((record) => record.examProfiles)));
  const flags = Array.from(new Set(canonicalRecords.flatMap((record) => record.flags)));

  return {
    canonicalIds: resolvedCanonicalIds,
    canonicalPrimaryId: resolvedCanonicalIds[0],
    canonicalTitles: canonicalRecords.map((record) => record.title),
    branchIds,
    branchTitle: branchTitles[0],
    branchTitles,
    schoolYearBands,
    levelBands,
    taxonomyLevelBands,
    examProfiles,
    flags,
  };
}

function buildCanonicalTopicId(record) {
  return `${record.id.toLowerCase().replace(/\./g, '-')}-${slugify(record.title)}`;
}

function buildCanonicalLessonId(topicId, lessonRecord) {
  return `${topicId}-${lessonRecord.id.toLowerCase().replace(/\./g, '-')}`;
}

function buildCanonicalLessonSlug(lessonRecord) {
  return `${lessonRecord.id.toLowerCase().replace(/\./g, '-')}-${slugify(lessonRecord.title)}`;
}

function buildPlaceholderGoals(title) {
  return [
    `Entender o conceito central de ${title.toLowerCase()}`,
    `Resolver exercícios básicos de ${title.toLowerCase()}`,
    `Aplicar ${title.toLowerCase()} em problemas guiados`,
  ];
}

export async function buildCanonicalPlaceholderCurriculum(existingCanonicalIds = []) {
  const { subsections } = await loadCanonicalTaxonomy();
  const coveredCanonicalIds = new Set(existingCanonicalIds);

  return subsections
    .filter((record) => !coveredCanonicalIds.has(record.id))
    .map((record) => {
      const topicId = buildCanonicalTopicId(record);

      return {
        id: topicId,
        canonicalIds: [record.id],
        title: record.title,
        description: `Estrutura canônica de ${record.title.toLowerCase()}, pronta para receber teoria, exercícios e gabaritos em Markdown.`,
        level: record.primaryLevel,
        stage: record.primaryStage,
        category: record.branchTitle,
        icon: record.icon,
        order: 1000 + record.order,
        tags: [
          slugify(record.id),
          ...record.flags.map((flag) => slugify(flag)),
        ],
        overview: `Este módulo foi scaffoldado a partir da taxonomia canônica (${record.id}). O conteúdo ainda pode ser expandido e refinado, mas a estrutura inicial já existe para filtro, agrupamento e edição posterior em Markdown.`,
        lessons: record.lessons.map((lessonRecord, index) => ({
          id: buildCanonicalLessonId(topicId, lessonRecord),
          canonicalIds: [lessonRecord.id],
          slug: buildCanonicalLessonSlug(lessonRecord),
          title: lessonRecord.title,
          summary: `Estrutura inicial para o item canônico ${lessonRecord.id}. Substitua este placeholder pela teoria definitiva em Markdown.`,
          goals: buildPlaceholderGoals(lessonRecord.title),
          difficulty: 'Médio',
          estimatedMinutes: 12,
          order: index + 1,
          prerequisites: [],
          tags: [
            slugify(lessonRecord.id),
            ...lessonRecord.flags.map((flag) => slugify(flag)),
          ],
          status: 'outline',
        })),
      };
    });
}
