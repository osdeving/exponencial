import { CANONICAL_SUBSECTIONS } from '../generated/canonical-taxonomy';
import {
  CanonicalMasteryBucket,
  CanonicalMasteryOverview,
  CanonicalMasteryRecord,
  Lesson,
  UserProgress,
} from '../types';

export const MASTERY_THRESHOLD = 80;

interface CanonicalSkillMeta {
  canonicalId: string;
  subsectionId: string;
  subsectionTitle: string;
  branchTitle: string;
}

const CANONICAL_SUBSECTION_MAP = new Map(
  CANONICAL_SUBSECTIONS.map((subsection) => [subsection.id, subsection]),
);

const CANONICAL_SKILL_MAP = new Map<string, CanonicalSkillMeta>(
  CANONICAL_SUBSECTIONS.flatMap((subsection) =>
    subsection.lessons.map((lesson) => [
      lesson.id,
      {
        canonicalId: lesson.id,
        subsectionId: subsection.id,
        subsectionTitle: subsection.title,
        branchTitle: subsection.branchTitle,
      },
    ]),
  ),
);

// Permite recuperar a subsecao canonica a partir de IDs folha como NUM.06.01.
export function getCanonicalSubsectionId(canonicalId: string) {
  return canonicalId.split('.').slice(0, 2).join('.');
}

function getCanonicalSkillMeta(canonicalId: string): CanonicalSkillMeta {
  const mapped = CANONICAL_SKILL_MAP.get(canonicalId);
  if (mapped) {
    return mapped;
  }

  const subsectionId = getCanonicalSubsectionId(canonicalId);
  const subsection = CANONICAL_SUBSECTION_MAP.get(subsectionId);

  return {
    canonicalId,
    subsectionId,
    subsectionTitle: subsection?.title ?? subsectionId,
    branchTitle: subsection?.branchTitle ?? 'Taxonomia canônica',
  };
}

export function normalizeCanonicalMastery(value: unknown): UserProgress['canonicalMastery'] {
  if (!value || typeof value !== 'object') {
    return {};
  }

  return Object.fromEntries(
    Object.entries(value).flatMap(([canonicalId, candidate]) => {
      if (!candidate || typeof candidate !== 'object') {
        return [];
      }

      const record = candidate as Record<string, unknown>;
      const subsectionId =
        typeof record.subsectionId === 'string' && record.subsectionId.length > 0
          ? record.subsectionId
          : getCanonicalSubsectionId(canonicalId);

      if (
        typeof record.bestScore !== 'number' ||
        typeof record.latestScore !== 'number' ||
        typeof record.attemptCount !== 'number' ||
        typeof record.lastLessonId !== 'string' ||
        typeof record.updatedAt !== 'string'
      ) {
        return [];
      }

      return [
        [
          canonicalId,
          {
            canonicalId,
            subsectionId,
            bestScore: record.bestScore,
            latestScore: record.latestScore,
            attemptCount: record.attemptCount,
            mastered: typeof record.mastered === 'boolean' ? record.mastered : record.bestScore >= MASTERY_THRESHOLD,
            lastLessonId: record.lastLessonId,
            updatedAt: record.updatedAt,
          } satisfies CanonicalMasteryRecord,
        ],
      ];
    }),
  );
}

// Atualiza dominio por habilidade canonica sem depender de componentes React.
export function buildCanonicalMasteryAfterLessonCompletion({
  currentMastery,
  lesson,
  percentage,
  completedAt,
}: {
  currentMastery: UserProgress['canonicalMastery'];
  lesson: Lesson;
  percentage: number;
  completedAt: string;
}): UserProgress['canonicalMastery'] {
  const canonicalIds = Array.from(new Set(lesson.canonicalIds ?? []));
  if (canonicalIds.length === 0) {
    return currentMastery;
  }

  const nextMastery = { ...currentMastery };

  canonicalIds.forEach((canonicalId) => {
    const meta = getCanonicalSkillMeta(canonicalId);
    const previous = nextMastery[canonicalId];
    const bestScore = Math.max(previous?.bestScore ?? 0, percentage);

    nextMastery[canonicalId] = {
      canonicalId,
      subsectionId: meta.subsectionId,
      bestScore,
      latestScore: percentage,
      attemptCount: (previous?.attemptCount ?? 0) + 1,
      mastered: bestScore >= MASTERY_THRESHOLD,
      lastLessonId: lesson.id,
      updatedAt: completedAt,
    };
  });

  return nextMastery;
}

function buildBucket({
  subsectionId,
  subsectionTitle,
  branchTitle,
  totalSkills,
  records,
}: {
  subsectionId: string;
  subsectionTitle: string;
  branchTitle: string;
  totalSkills: number;
  records: CanonicalMasteryRecord[];
}): CanonicalMasteryBucket {
  const attemptedSkills = records.length;
  const masteredSkills = records.filter((record) => record.mastered).length;
  const activeDebtSkills = attemptedSkills - masteredSkills;
  const untouchedSkills = Math.max(totalSkills - attemptedSkills, 0);

  return {
    subsectionId,
    subsectionTitle,
    branchTitle,
    totalSkills,
    masteredSkills,
    attemptedSkills,
    activeDebtSkills,
    untouchedSkills,
    masteryPercent: totalSkills === 0 ? 0 : Math.round((masteredSkills / totalSkills) * 100),
  };
}

// Agrega dominio e divida por subsecao para o dashboard.
export function buildCanonicalMasteryOverview(progress: UserProgress): CanonicalMasteryOverview {
  const records = Object.values(progress.canonicalMastery);
  const recordsBySubsection = records.reduce<Record<string, CanonicalMasteryRecord[]>>((accumulator, record) => {
    const currentRecords = accumulator[record.subsectionId] ?? [];
    currentRecords.push(record);
    accumulator[record.subsectionId] = currentRecords;
    return accumulator;
  }, {});

  const buckets = CANONICAL_SUBSECTIONS.map((subsection) =>
    buildBucket({
      subsectionId: subsection.id,
      subsectionTitle: subsection.title,
      branchTitle: subsection.branchTitle,
      totalSkills: subsection.lessons.length,
      records: recordsBySubsection[subsection.id] ?? [],
    }),
  );

  const totalSkills = CANONICAL_SUBSECTIONS.reduce((sum, subsection) => sum + subsection.lessons.length, 0);
  const attemptedSkills = records.length;
  const masteredSkills = records.filter((record) => record.mastered).length;
  const activeDebtSkills = attemptedSkills - masteredSkills;
  const untouchedSkills = Math.max(totalSkills - attemptedSkills, 0);
  const activeDebtBuckets = buckets
    .filter((bucket) => bucket.activeDebtSkills > 0)
    .sort((left, right) => {
      if (right.activeDebtSkills !== left.activeDebtSkills) {
        return right.activeDebtSkills - left.activeDebtSkills;
      }

      return left.masteryPercent - right.masteryPercent;
    });

  return {
    totalSkills,
    masteredSkills,
    attemptedSkills,
    activeDebtSkills,
    untouchedSkills,
    masteryPercent: totalSkills === 0 ? 0 : Math.round((masteredSkills / totalSkills) * 100),
    buckets,
    activeDebtBuckets,
  };
}
