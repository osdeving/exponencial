import { LearningPath } from '../types';

export const PATHS: LearningPath[] = [
  {
    id: 'exam-prep',
    title: 'Recuperação para Provas',
    description: 'Reforça a base de números, equações e leitura de gráficos.',
    topicIds: ['fractions', 'linear-equations', 'functions'],
    color: '#FF6B6B',
    estimatedWeeks: 4,
    focus: 'Base, recomposição de conteúdo e ganho rápido de confiança.',
    featuredLessonId: 'fractions-intro',
  },
  {
    id: 'geometry-deep',
    title: 'Aprofundamento em Geometria',
    description: 'Parte do plano, passa por semelhança e fecha com trigonometria.',
    topicIds: ['geometry-basics', 'geometry-similarity', 'trigonometry', 'analytic-geometry'],
    color: '#4ECDC4',
    estimatedWeeks: 6,
    focus: 'Visualização espacial, triângulos e leitura geométrica para provas.',
    featuredLessonId: 'geometry-perimeter',
  },
  {
    id: 'algebra-track',
    title: 'Trilha de Álgebra',
    description: 'Cobre linguagem algébrica, equações e funções da base ao Médio.',
    topicIds: ['algebra-foundations', 'linear-equations', 'functions', 'function-affine', 'function-quadratic'],
    color: '#FFE66D',
    estimatedWeeks: 7,
    focus: 'Progressão natural para vestibular e resolução simbólica.',
    featuredLessonId: 'linear-intro',
  },
  {
    id: 'vestibular-essentials',
    title: 'Essenciais para Vestibular',
    description: 'Seleciona os blocos mais recorrentes nas provas.',
    topicIds: [
      'function-affine',
      'function-quadratic',
      'trigonometry',
      'combinatorics-probability',
      'descriptive-statistics',
      'math-finance',
    ],
    color: '#B8F2E6',
    estimatedWeeks: 8,
    focus: 'Funções, análise de dados, trigonometria e interpretação de problemas.',
    featuredLessonId: 'affine-concept',
  },
];

export function getPathById(pathId: string) {
  return PATHS.find((path) => path.id === pathId);
}
