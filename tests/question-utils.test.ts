import assert from 'node:assert/strict';
import test from 'node:test';
import { parseQuestionFile } from '../scripts/question-utils.mjs';

test('parseQuestionFile converte solução em markdown simples para o formato estático', () => {
  const source = `## Questão 1

### Enunciado
Quanto é 2 + 2?

### Resposta
4

### Explicação
Some os dois termos.

### Solução
1. Some 2 com 2.
2. O resultado é 4.
`;

  const [question] = parseQuestionFile(source, 'memory://question.questions.md', {
    lessonId: 'lesson-demo',
    defaultSection: 'Aquecimento',
    source: 'Material Interno',
  });

  assert.equal(question.id, 'lesson-demo-question-1');
  assert.equal(question.type, 'self-check');
  assert.equal(question.section, 'Aquecimento');
  assert.equal(question.source, 'Material Interno');
  assert.equal(question.answer, '4');
  assert.equal(question.explanation, 'Some os dois termos.');
  assert.deepEqual(question.solution, {
    mode: 'static',
    steps: [
      {
        type: 'markdown',
        content: '1. Some 2 com 2.\n2. O resultado é 4.',
      },
    ],
  });
});

test('parseQuestionFile aceita solução estruturada passo a passo com algoritmo', () => {
  const source = `## Questão 2

### Enunciado
Qual é o MMC entre 4 e 6?

### Opções
- 8
- 12
- 16

### Correta
B

### Solução
\`\`\`json
{
  "mode": "step-by-step",
  "summary": "Decomponha os números até obter o MMC.",
  "steps": [
    {
      "type": "markdown",
      "title": "Observe os divisores",
      "content": "Vamos usar divisões sucessivas."
    },
    {
      "type": "algorithm",
      "layout": "mmc",
      "title": "Tabela do MMC",
      "lines": [
        "2 | 4  6",
        "2 | 2  3",
        "3 | 1  3",
        "| 1  1"
      ],
      "result": "MMC(4, 6) = 12",
      "annotations": [
        "Multiplique os divisores usados: 2 x 2 x 3."
      ]
    }
  ]
}
\`\`\`
`;

  const [question] = parseQuestionFile(source, 'memory://algorithm.questions.md', {
    lessonId: 'lesson-demo',
  });

  assert.equal(question.type, 'multiple-choice');

  if (question.type !== 'multiple-choice') {
    throw new Error('A questão deveria ser de múltipla escolha.');
  }

  if (!('options' in question) || !('correctAnswer' in question)) {
    throw new Error('A questão deveria expor opções e alternativa correta.');
  }

  assert.deepEqual(question.options, ['8', '12', '16']);
  assert.equal(question.correctAnswer, 1);
  assert.equal(question.explanation, '12');
  assert.equal(question.solution?.mode, 'step-by-step');
  assert.equal(question.solution?.summary, 'Decomponha os números até obter o MMC.');
  const algorithmStep = question.solution?.steps[1];

  assert.equal(algorithmStep?.type, 'algorithm');

  if (!algorithmStep || algorithmStep.type !== 'algorithm') {
    throw new Error('O segundo passo deveria ser um algoritmo.');
  }

  assert.equal(algorithmStep.layout, 'mmc');
  assert.equal(algorithmStep.title, 'Tabela do MMC');
  assert.equal(algorithmStep.result, 'MMC(4, 6) = 12');
  assert.deepEqual(algorithmStep.lines, ['2 | 4  6', '2 | 2  3', '3 | 1  3', '| 1  1']);
  assert.deepEqual(algorithmStep.annotations, ['Multiplique os divisores usados: 2 x 2 x 3.']);
});

test('parseQuestionFile aceita metadados de lacuna, prerequisito e recuperacao', () => {
  const source = `## Questão 4

### Enunciado
Some \\(\\frac{1}{2} + \\frac{1}{3}\\).

### Lacunas
- soma de frações com denominadores diferentes

### Pré-requisitos
- NUM.06.12
- NUM.06.13

### Recuperação
- fractions-intro

### Resposta
\\(\\frac{5}{6}\\)
`;

  const [question] = parseQuestionFile(source, 'memory://recovery.questions.md', {
    lessonId: 'fractions-operations',
  });

  assert.deepEqual(question.misconceptionTags, ['soma de frações com denominadores diferentes']);
  assert.deepEqual(question.prerequisiteCanonicalIds, ['NUM.06.12', 'NUM.06.13']);
  assert.deepEqual(question.recoveryLessonIds, ['fractions-intro']);
});

test('parseQuestionFile falha quando a solução estruturada traz layout inválido', () => {
  const source = `## Questão 3

### Enunciado
Resolva.

### Resposta
42

### Solução
\`\`\`json
{
  "mode": "step-by-step",
  "steps": [
    {
      "type": "algorithm",
      "layout": "unknown-layout",
      "lines": ["linha 1"]
    }
  ]
}
\`\`\`
`;

  assert.throws(
    () =>
      parseQuestionFile(source, 'memory://invalid.questions.md', {
        lessonId: 'lesson-demo',
      }),
    /layout de algoritmo inválido/i,
  );
});
