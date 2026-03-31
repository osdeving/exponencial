import assert from 'node:assert/strict';
import test from 'node:test';
import { DEFAULT_PROGRESS, getLessonById } from '../src/lib/learning.ts';
import {
  assignRecoveryForLesson,
  buildRecoveryAssignment,
  getActiveRecoveryAssignment,
  getNextRecoveryLessonId,
  markRecoveryLessonVisited,
  resolveRecoveryForLesson,
} from '../src/lib/recovery.ts';
import { loadQuestionsByLessonId } from '../src/content/queries.ts';

test('buildRecoveryAssignment usa metadados das questões erradas para montar a rota', async () => {
  const lesson = getLessonById('fractions-operations');
  assert.ok(lesson, 'A lição fractions-operations precisa existir.');

  const questions = await loadQuestionsByLessonId('fractions-operations');
  const targetQuestion = questions.find((question) => question.number === 20);
  assert.ok(targetQuestion, 'A questão 20 precisa existir.');

  const assignment = buildRecoveryAssignment({
    lesson,
    questions,
    incorrectQuestionIds: [targetQuestion.id],
    attemptedAt: '2026-03-31T10:00:00.000Z',
  });

  assert.ok(assignment);
  assert.deepEqual(assignment.targetLessonIds, ['fractions-intro']);
  assert.deepEqual(assignment.misconceptionTags, [
    'soma de frações com denominadores diferentes',
    'taxa de trabalho',
  ]);
  assert.deepEqual(assignment.prerequisiteCanonicalIds, ['NUM.06.12', 'NUM.06.13']);
  assert.equal(assignment.status, 'active');
});

test('markRecoveryLessonVisited conclui a recuperacao quando todas as revisoes foram abertas', () => {
  const progress = assignRecoveryForLesson({
    progress: DEFAULT_PROGRESS,
    lesson: {
      id: 'fractions-operations',
      topicId: 'fractions',
      title: 'Operações com Frações',
      content: '',
      difficulty: 'Médio',
      estimatedMinutes: 20,
      order: 2,
      summary: '',
      goals: [],
      prerequisites: [],
      tags: [],
      status: 'ready',
      canonicalIds: ['NUM.06.12'],
    },
    questions: [
      {
        id: 'fractions-operations-question-20',
        lessonId: 'fractions-operations',
        text: 'Demo',
        type: 'self-check',
        answer: '42',
        explanation: 'Demo',
        recoveryLessonIds: ['fractions-intro'],
      },
    ],
    incorrectQuestionIds: ['fractions-operations-question-20'],
    attemptedAt: '2026-03-31T10:00:00.000Z',
  });

  const activeAssignment = getActiveRecoveryAssignment('fractions-operations', progress);
  assert.ok(activeAssignment);
  assert.equal(getNextRecoveryLessonId(activeAssignment), 'fractions-intro');

  const revisited = markRecoveryLessonVisited(progress, 'fractions-intro', '2026-03-31T10:05:00.000Z');
  const completedAssignment = revisited.recoveryAssignments['fractions-operations'];

  assert.equal(completedAssignment.status, 'completed');
  assert.deepEqual(completedAssignment.revisitedLessonIds, ['fractions-intro']);
  assert.equal(getActiveRecoveryAssignment('fractions-operations', revisited), undefined);
});

test('resolveRecoveryForLesson encerra pendencia quando a licao finalmente passa', () => {
  const baseProgress = {
    ...DEFAULT_PROGRESS,
    recoveryAssignments: {
      'fractions-operations': {
        lessonId: 'fractions-operations',
        createdAt: '2026-03-31T10:00:00.000Z',
        status: 'active' as const,
        targetLessonIds: ['fractions-intro'],
        revisitedLessonIds: ['fractions-intro'],
        sourceQuestionIds: ['fractions-operations-question-20'],
        misconceptionTags: ['soma de frações com denominadores diferentes'],
        prerequisiteCanonicalIds: ['NUM.06.12'],
        summary: 'Revise a base.',
      },
    },
  };

  const resolved = resolveRecoveryForLesson(baseProgress, 'fractions-operations', '2026-03-31T10:20:00.000Z');

  assert.equal(resolved.recoveryAssignments['fractions-operations']?.status, 'completed');
  assert.equal(resolved.recoveryAssignments['fractions-operations']?.completedAt, '2026-03-31T10:20:00.000Z');
});
