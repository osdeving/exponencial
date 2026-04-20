const QUESTION_HEADING_PATTERN = /^##\s+Quest[aã]o\s+(\d+)\s*$/i;
const FIELD_HEADING_PATTERN = /^###\s+(.+?)\s*$/;

const FIELD_MAP = {
  enunciado: 'text',
  resposta: 'answer',
  gabarito: 'answer',
  explicacao: 'explanation',
  dica: 'hint',
  solucao: 'solution',
  opcoes: 'options',
  correta: 'correctAnswer',
  tipo: 'type',
  secao: 'section',
  fonte: 'source',
  lacunas: 'misconceptionTags',
  'pre-requisitos': 'prerequisiteCanonicalIds',
  prerequisitos: 'prerequisiteCanonicalIds',
  recuperacao: 'recoveryLessonIds',
  recuperação: 'recoveryLessonIds',
};

// Normaliza acentos para aceitar "Pré-requisitos" e "pre-requisitos" no mesmo parser.
function normalizeHeadingKey(value) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

function trimBlock(lines) {
  return lines.join('\n').trim();
}

function normalizeStringArray(value) {
  return Array.isArray(value)
    ? value
        .filter((item) => typeof item === 'string')
        .map((item) => item.trim().replace(/^[-*+]\s+/, ''))
        .filter(Boolean)
    : [];
}

function parseOptions(rawOptions, filePath, number) {
  const options = rawOptions
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => line.replace(/^[-*+]\s+/, '').replace(/^\d+\.\s+/, '').trim())
    .filter(Boolean);

  if (options.length === 0) {
    throw new Error(`Questão ${number} sem opções válidas em ${filePath}.`);
  }

  return options;
}

function parseCorrectAnswer(rawValue, filePath, number, optionsLength) {
  const value = rawValue.trim();
  if (!value) {
    throw new Error(`Questão ${number} sem alternativa correta em ${filePath}.`);
  }

  if (/^\d+$/.test(value)) {
    const parsed = Number(value);
    const zeroBased = parsed === 0 ? 0 : parsed - 1;
    if (zeroBased < 0 || zeroBased >= optionsLength) {
      throw new Error(`Questão ${number} com alternativa correta fora do intervalo em ${filePath}.`);
    }
    return zeroBased;
  }

  if (/^[a-z]$/i.test(value)) {
    const zeroBased = value.toUpperCase().charCodeAt(0) - 65;
    if (zeroBased < 0 || zeroBased >= optionsLength) {
      throw new Error(`Questão ${number} com alternativa correta inválida em ${filePath}.`);
    }
    return zeroBased;
  }

  throw new Error(`Questão ${number} com formato de alternativa correta inválido em ${filePath}: ${value}`);
}

function parseSolutionFence(rawValue) {
  const trimmed = rawValue.trim();
  const fenceMatch = trimmed.match(/^```(?:json|solution|question-solution)\s*\n([\s\S]*?)\n```$/);
  return fenceMatch ? fenceMatch[1].trim() : null;
}

function parseSolutionStep(step, filePath, number, index) {
  if (!step || typeof step !== 'object') {
    throw new Error(`Questão ${number} com passo de solução inválido em ${filePath}.`);
  }

  const type = step.type;
  const title = typeof step.title === 'string' && step.title.trim() ? step.title.trim() : undefined;
  const id = typeof step.id === 'string' && step.id.trim() ? step.id.trim() : undefined;
  const revealMs = typeof step.revealMs === 'number' ? step.revealMs : undefined;

  if (type === 'markdown' || type === 'equation') {
    if (typeof step.content !== 'string' || !step.content.trim()) {
      throw new Error(`Questão ${number} com passo ${index + 1} sem conteúdo em ${filePath}.`);
    }

    return {
      type,
      title,
      id,
      revealMs,
      content: step.content.trim(),
    };
  }

  if (type === 'scratchpad') {
    const lines = normalizeStringArray(step.lines);
    if (lines.length === 0) {
      throw new Error(`Questão ${number} com rascunho vazio no passo ${index + 1} em ${filePath}.`);
    }

    return {
      type,
      title,
      id,
      revealMs,
      lines,
    };
  }

  if (type === 'algorithm') {
    const lines = normalizeStringArray(step.lines);
    if (lines.length === 0) {
      throw new Error(`Questão ${number} com algoritmo vazio no passo ${index + 1} em ${filePath}.`);
    }

    const layout = step.layout ?? 'custom';
    if (!['mmc', 'long-division', 'continued-division', 'custom'].includes(layout)) {
      throw new Error(`Questão ${number} com layout de algoritmo inválido no passo ${index + 1} em ${filePath}.`);
    }

    return {
      type,
      layout,
      title,
      id,
      revealMs,
      lines,
      result: typeof step.result === 'string' && step.result.trim() ? step.result.trim() : undefined,
      annotations: normalizeStringArray(step.annotations),
    };
  }

  throw new Error(`Questão ${number} com tipo de passo inválido (${String(type)}) em ${filePath}.`);
}

function parseSolution(rawValue, filePath, number) {
  const trimmed = rawValue.trim();
  if (!trimmed) {
    return undefined;
  }

  const fencedJson = parseSolutionFence(trimmed);
  if (fencedJson) {
    let parsed;
    try {
      parsed = JSON.parse(fencedJson);
    } catch (error) {
      throw new Error(`Questão ${number} com JSON de solução inválido em ${filePath}: ${error.message}`);
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error(`Questão ${number} com solução inválida em ${filePath}.`);
    }

    const mode = parsed.mode === 'step-by-step' ? 'step-by-step' : 'static';
    const steps = Array.isArray(parsed.steps) ? parsed.steps.map((step, index) => parseSolutionStep(step, filePath, number, index)) : [];

    if (steps.length === 0) {
      throw new Error(`Questão ${number} sem passos de solução em ${filePath}.`);
    }

    return {
      mode,
      summary: typeof parsed.summary === 'string' && parsed.summary.trim() ? parsed.summary.trim() : undefined,
      steps,
    };
  }

  return {
    mode: 'static',
    steps: [
      {
        type: 'markdown',
        content: trimmed,
      },
    ],
  };
}

// Parser do contrato *.questions.md: blocos "## Questao" com campos "###".
export function parseQuestionFile(source, filePath, frontmatter) {
  if (!frontmatter.lessonId) {
    throw new Error(`Arquivo de questões sem lessonId em ${filePath}.`);
  }

  const lines = source.split('\n');
  const rawQuestions = [];
  let currentQuestion = null;
  let currentField = null;

  const flushQuestion = () => {
    if (!currentQuestion) {
      return;
    }

    rawQuestions.push(currentQuestion);
    currentQuestion = null;
    currentField = null;
  };

  for (const line of lines) {
    const questionHeading = line.match(QUESTION_HEADING_PATTERN);
    if (questionHeading) {
      flushQuestion();
      currentQuestion = {
        number: Number(questionHeading[1]),
        fields: {},
      };
      continue;
    }

    if (!currentQuestion) {
      if (line.trim().length > 0) {
        throw new Error(`Conteúdo fora de um bloco de questão em ${filePath}: ${line}`);
      }
      continue;
    }

    const fieldHeading = line.match(FIELD_HEADING_PATTERN);
    if (fieldHeading) {
      const fieldKey = FIELD_MAP[normalizeHeadingKey(fieldHeading[1])];
      if (!fieldKey) {
        throw new Error(`Campo desconhecido em ${filePath}: ${fieldHeading[1]}`);
      }
      currentField = fieldKey;
      currentQuestion.fields[currentField] = [];
      continue;
    }

    if (!currentField) {
      if (line.trim().length > 0) {
        throw new Error(`Linha sem campo ativo na questão ${currentQuestion.number} em ${filePath}: ${line}`);
      }
      continue;
    }

    currentQuestion.fields[currentField].push(line);
  }

  flushQuestion();

  if (rawQuestions.length === 0) {
    throw new Error(`Arquivo de questões sem blocos ## Questão em ${filePath}.`);
  }

  const seenNumbers = new Set();

  return rawQuestions
    .sort((left, right) => left.number - right.number)
    .map((question) => {
      if (seenNumbers.has(question.number)) {
        throw new Error(`Número de questão duplicado (${question.number}) em ${filePath}.`);
      }
      seenNumbers.add(question.number);

      const rawText = trimBlock(question.fields.text ?? []);
      if (!rawText) {
        throw new Error(`Questão ${question.number} sem enunciado em ${filePath}.`);
      }

      const rawType = trimBlock(question.fields.type ?? []);
      const resolvedType = rawType || (question.fields.options ? 'multiple-choice' : frontmatter.defaultType || 'self-check');
      const type = resolvedType === 'multiple-choice' ? 'multiple-choice' : 'self-check';
      const sourceOverride = trimBlock(question.fields.source ?? []);
      const sectionOverride = trimBlock(question.fields.section ?? []);
      const hint = trimBlock(question.fields.hint ?? []);
      const answer = trimBlock(question.fields.answer ?? []);
      const explanation = trimBlock(question.fields.explanation ?? []);
      const solution = parseSolution(trimBlock(question.fields.solution ?? []), filePath, question.number);
      const misconceptionTags = normalizeStringArray(question.fields.misconceptionTags ?? []);
      const prerequisiteCanonicalIds = normalizeStringArray(question.fields.prerequisiteCanonicalIds ?? []);
      const recoveryLessonIds = normalizeStringArray(question.fields.recoveryLessonIds ?? []);

      const baseQuestion = {
        id: `${String(frontmatter.lessonId)}-question-${question.number}`,
        lessonId: String(frontmatter.lessonId),
        text: rawText,
        type,
        explanation: explanation || answer || 'Sem explicação cadastrada.',
        hint: hint || (frontmatter.defaultHint ? String(frontmatter.defaultHint) : undefined),
        number: question.number,
        section: sectionOverride || (frontmatter.defaultSection ? String(frontmatter.defaultSection) : undefined),
        source: sourceOverride || (frontmatter.source ? String(frontmatter.source) : undefined),
        misconceptionTags: misconceptionTags.length > 0 ? misconceptionTags : undefined,
        prerequisiteCanonicalIds: prerequisiteCanonicalIds.length > 0 ? prerequisiteCanonicalIds : undefined,
        recoveryLessonIds: recoveryLessonIds.length > 0 ? recoveryLessonIds : undefined,
        solution,
      };

      if (type === 'multiple-choice') {
        const options = parseOptions(trimBlock(question.fields.options ?? []), filePath, question.number);
        const correctAnswer = parseCorrectAnswer(
          trimBlock(question.fields.correctAnswer ?? []),
          filePath,
          question.number,
          options.length,
        );

        return {
          ...baseQuestion,
          options,
          correctAnswer,
          answer: answer || undefined,
          explanation: explanation || options[correctAnswer],
        };
      }

      if (!answer) {
        throw new Error(`Questão ${question.number} sem resposta oficial em ${filePath}.`);
      }

      return {
        ...baseQuestion,
        answer,
      };
    });
}
