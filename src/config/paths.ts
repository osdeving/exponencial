import { LESSONS, TOPICS } from '../content';
import { LearningPath, Topic } from '../types';

type PathSpec = Omit<LearningPath, 'topicIds' | 'estimatedWeeks' | 'featuredLessonId'> & {
  minWeeks?: number;
  maxWeeks?: number;
  preferredTopicIds?: string[];
  predicate: (topic: Topic) => boolean;
};

const STATUS_PRIORITY: Record<NonNullable<Topic['status']>, number> = {
  ready: 0,
  'in-progress': 1,
  outline: 2,
};

const PATH_ALIAS_BY_LEGACY_ID: Record<string, string> = {
  'exam-prep': 'core-rebuild',
  'geometry-deep': 'geometry-visual',
  'algebra-track': 'algebra-functions-ladder',
  'vestibular-essentials': 'enem-nuclear',
};

const CORE_BRANCH_IDS = new Set(['NUM', 'ALG', 'FUN']);
const GEOMETRY_BRANCH_IDS = new Set(['GEO', 'AGE', 'TRI']);
const ENEM_PROFILE = 'ENEM';
const MILITARY_BASE_PROFILE = 'Militar base (CPCAR/EPCAR-style)';
const SCHOOL_CORE_PROFILE = 'Escolar básico / BNCC núcleo';

const hasAny = (left: string[] | undefined, right: Iterable<string>) => {
  if (!left || left.length === 0) {
    return false;
  }

  const rightSet = right instanceof Set ? right : new Set(right);
  return left.some((item) => rightSet.has(item));
};

const includesProfile = (topic: Topic, profile: string) => (topic.examProfiles ?? []).includes(profile);

const compareTopicsForPath = (left: Topic, right: Topic) => {
  const leftStatus = STATUS_PRIORITY[left.status ?? 'outline'];
  const rightStatus = STATUS_PRIORITY[right.status ?? 'outline'];

  return (
    leftStatus - rightStatus ||
    left.order - right.order ||
    left.title.localeCompare(right.title, 'pt-BR')
  );
};

function sortTopicIds(topicIds: string[], preferredTopicIds: string[] = []) {
  const preferredOrder = new Map(preferredTopicIds.map((topicId, index) => [topicId, index]));

  return [...new Set(topicIds)]
    .map((topicId) => TOPICS.find((topic) => topic.id === topicId))
    .filter((topic): topic is Topic => Boolean(topic))
    .sort((left, right) => {
      const leftPreferred = preferredOrder.get(left.id);
      const rightPreferred = preferredOrder.get(right.id);

      if (typeof leftPreferred === 'number' || typeof rightPreferred === 'number') {
        if (typeof leftPreferred !== 'number') {
          return 1;
        }

        if (typeof rightPreferred !== 'number') {
          return -1;
        }

        return leftPreferred - rightPreferred;
      }

      return compareTopicsForPath(left, right);
    })
    .map((topic) => topic.id);
}

function getFeaturedLessonId(topicIds: string[]) {
  const orderedLessons = topicIds.flatMap((topicId) =>
    LESSONS.filter((lesson) => lesson.topicId === topicId).sort((left, right) => left.order - right.order),
  );

  return (
    orderedLessons.find((lesson) => lesson.status !== 'outline')?.id ??
    orderedLessons[0]?.id ??
    LESSONS[0]?.id ??
    ''
  );
}

function getEstimatedWeeks(topicIds: string[], minWeeks = 4, maxWeeks = 24) {
  const lessonCount = topicIds.reduce(
    (total, topicId) => total + LESSONS.filter((lesson) => lesson.topicId === topicId).length,
    0,
  );

  return Math.max(minWeeks, Math.min(maxWeeks, Math.ceil(lessonCount / 6)));
}

function createPath(spec: PathSpec): LearningPath {
  const topicIds = sortTopicIds(
    TOPICS.filter(spec.predicate).map((topic) => topic.id),
    spec.preferredTopicIds,
  );

  return {
    id: spec.id,
    title: spec.title,
    description: spec.description,
    topicIds,
    color: spec.color,
    estimatedWeeks: getEstimatedWeeks(topicIds, spec.minWeeks, spec.maxWeeks),
    focus: spec.focus,
    featuredLessonId: getFeaturedLessonId(topicIds),
  };
}

const PATH_SPECS: PathSpec[] = [
  {
    id: 'core-rebuild',
    title: 'Reconstrução da Base',
    description: 'Números, frações, equações e leitura funcional para corrigir lacunas antes de acelerar.',
    color: '#FF6B6B',
    focus: 'Base numérica, álgebra inicial e retomada segura do Fundamental.',
    minWeeks: 5,
    preferredTopicIds: ['fractions', 'powers-roots', 'linear-equations', 'functions'],
    predicate: (topic) =>
      topic.level === 'Fundamental' &&
      hasAny(topic.branchIds, CORE_BRANCH_IDS) &&
      (includesProfile(topic, SCHOOL_CORE_PROFILE) || topic.status !== 'outline'),
  },
  {
    id: 'fundamental-complete',
    title: 'Base Completa do Fundamental',
    description: 'Percorre a espinha dorsal do Fundamental com visão curricular ampla, mesmo onde ainda houver placeholder.',
    color: '#FFE66D',
    focus: 'Cobertura escolar ampla para consolidar a base antes do Médio.',
    minWeeks: 10,
    preferredTopicIds: ['fractions', 'geometry-basics', 'linear-equations', 'powers-roots', 'functions'],
    predicate: (topic) => topic.level === 'Fundamental',
  },
  {
    id: 'algebra-functions-ladder',
    title: 'Escada de Álgebra e Funções',
    description: 'Organiza a progressão simbólica da pré-álgebra até funções do Ensino Médio.',
    color: '#B8F2E6',
    focus: 'Expressões, equações, funções e modelagem algébrica em ordem de progressão.',
    minWeeks: 8,
    preferredTopicIds: [
      'algebra-foundations',
      'linear-equations',
      'functions',
      'function-affine',
      'function-quadratic',
      'exponential-logarithmic',
    ],
    predicate: (topic) => hasAny(topic.branchIds, ['ALG', 'FUN']),
  },
  {
    id: 'geometry-visual',
    title: 'Geometria e Visualização',
    description: 'Geometria plana, espacial, analítica e trigonometria em uma trilha visualmente encadeada.',
    color: '#4ECDC4',
    focus: 'Figuras, medidas, espaço, leitura geométrica e interpretação visual.',
    minWeeks: 7,
    preferredTopicIds: ['geometry-basics', 'geometry-similarity', 'spatial-geometry', 'trigonometry', 'analytic-geometry'],
    predicate: (topic) => hasAny(topic.branchIds, GEOMETRY_BRANCH_IDS),
  },
  {
    id: 'enem-nuclear',
    title: 'ENEM Nuclear',
    description: 'Seleciona os blocos mais recorrentes do ENEM, combinando base escolar e interpretação.',
    color: '#C7F464',
    focus: 'Funções, números, geometria, dados e leitura de problemas com perfil ENEM.',
    minWeeks: 8,
    preferredTopicIds: [
      'fractions',
      'ratio-proportion-percentage',
      'linear-equations',
      'functions',
      'function-affine',
      'function-quadratic',
      'trigonometry',
      'descriptive-statistics',
      'math-finance',
    ],
    predicate: (topic) => includesProfile(topic, ENEM_PROFILE),
  },
  {
    id: 'military-base',
    title: 'Militar Base',
    description: 'Monta um núcleo mais exigente para provas militares de entrada, sem pular a base simbólica.',
    color: '#F7B267',
    focus: 'Base algébrica forte, geometria, conjuntos e contagem com viés de prova militar.',
    minWeeks: 9,
    preferredTopicIds: [
      'set-02-teoria-elementar-dos-conjuntos',
      'algebra-foundations',
      'linear-equations',
      'linear-systems',
      'geometry-basics',
      'combinatorics-probability',
    ],
    predicate: (topic) => includesProfile(topic, MILITARY_BASE_PROFILE),
  },
  {
    id: 'zero-math-journey',
    title: 'Rota de Zerar Matemática',
    description: 'Campanha longa que percorre o catálogo inteiro do app em ordem curricular crescente.',
    color: '#9AD1D4',
    focus: 'Percurso amplo para quem quer transformar o app em um desafio de conclusão total.',
    minWeeks: 14,
    maxWeeks: 24,
    preferredTopicIds: ['fractions', 'linear-equations', 'powers-roots', 'functions', 'trigonometry'],
    predicate: () => true,
  },
];

export const PATHS: LearningPath[] = PATH_SPECS.map(createPath).filter((path) => path.topicIds.length > 0);

export function getCanonicalPathId(pathId: string) {
  return PATH_ALIAS_BY_LEGACY_ID[pathId] ?? pathId;
}

export function getPathById(pathId: string) {
  const canonicalId = getCanonicalPathId(pathId);
  return PATHS.find((path) => path.id === canonicalId);
}
