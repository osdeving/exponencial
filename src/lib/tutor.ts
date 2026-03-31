import { LESSONS, PATHS, QUESTIONS } from '../data';
import { Lesson, Topic } from '../types';

const TOPIC_TIPS: Record<string, string[]> = {
  fractions: [
    'Compare frações olhando primeiro para o denominador: ele mostra o tamanho de cada parte.',
    'Antes de operar, veja se dá para simplificar a fração e deixar a conta mais leve.',
    'Para somar denominadores diferentes, use um múltiplo comum antes de juntar os numeradores.',
  ],
  'linear-equations': [
    'Pense na equação como uma balança: o que sai de um lado precisa sair do outro.',
    'Se aparecer texto, transforme frase por frase em símbolos antes de resolver.',
    'Ao terminar, substitua o valor encontrado para conferir.',
  ],
  'geometry-basics': [
    'Área mede espaço interno; perímetro mede o contorno.',
    'Em triângulos, confirme se a altura está perpendicular à base.',
    'Desenhar a figura e marcar medidas costuma evitar erro de interpretação.',
  ],
  trigonometry: [
    'Escolha o ângulo antes de definir quem é oposto e adjacente.',
    'Guarde os ângulos notáveis em pares: sen 30 = cos 60, sen 60 = cos 30.',
    'Se a hipotenusa aparecer, há chance de seno ou cosseno estarem envolvidos.',
  ],
  functions: [
    'Função é regra: entrada entra, saída sai.',
    'Ler gráfico é observar tendência, interceptos e crescimento.',
    'Sempre calcule f(0) para entender onde a reta corta o eixo y.',
  ],
  'calculus-intro': [
    'Limite fala de aproximação; derivada fala de variação.',
    'Comece pela intuição antes de se prender à formalização.',
    'Pergunte: o que a função faz quando x chega perto desse valor?',
  ],
};

const TOPIC_EXAMPLES: Record<string, string> = {
  fractions:
    'Exemplo: 3/4 de uma pizza significa 3 pedaços de um total de 4. Se você somar 1/4 + 2/4, obtém 3/4.',
  'linear-equations':
    'Exemplo: 2x + 3 = 11. Subtraia 3 dos dois lados, ficando 2x = 8. Depois divida por 2: x = 4.',
  'geometry-basics':
    'Exemplo: um triângulo com base 10 e altura 6 tem área (10 × 6) / 2 = 30.',
  trigonometry:
    'Exemplo: se o cateto oposto vale 6 e a hipotenusa vale 10, então sen(θ) = 6/10 = 3/5.',
  functions:
    'Exemplo: em f(x) = 3x - 2, se x = 4 então f(4) = 12 - 2 = 10.',
  'calculus-intro':
    'Exemplo: se f(x) = x + 5, quando x tende a 2 o valor da função se aproxima de 7.',
};

const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

const stripMarkdown = (value: string) =>
  value
    .replace(/[#*_`>-]/g, '')
    .replace(/\$/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim();

const getLessonQuestions = (lessonId?: string | null) =>
  lessonId ? QUESTIONS.filter((question) => question.lessonId === lessonId) : [];

const getSummary = (lesson?: Lesson | null, topic?: Topic | null) => {
  if (lesson) {
    const content = stripMarkdown(lesson.content).split('\n').filter(Boolean).slice(0, 6).join('\n');
    return `Resumo da lição **${lesson.title}**:\n\n${content}`;
  }

  if (topic) {
    const lessons = LESSONS.filter((item) => item.topicId === topic.id)
      .sort((a, b) => a.order - b.order)
      .map((item) => `- ${item.title}`)
      .join('\n');

    return `Resumo do tópico **${topic.title}**:\n\n${topic.description}\n\nLições disponíveis:\n${lessons}`;
  }

  return 'Posso resumir qualquer tópico. Escolha uma trilha, um tópico ou uma lição para eu focar melhor.';
};

const getPractice = (lesson?: Lesson | null, topic?: Topic | null) => {
  const question = getLessonQuestions(lesson?.id)[0];
  if (question) {
    return `Treino rápido:\n\n**${question.text}**\n\nDica: ${question.hint ?? 'quebre o problema em passos pequenos.'}\n\nSe quiser, eu também posso corrigir sua resposta.`;
  }

  if (topic) {
    return `Desafio de ${topic.title}:\n\n${TOPIC_EXAMPLES[topic.id]}\n\nAgora tente criar uma variação mudando apenas os números.`;
  }

  return 'Posso montar um treino rápido para Frações, Equações, Geometria, Trigonometria, Funções ou Cálculo.';
};

const getFormula = (topic?: Topic | null) => {
  switch (topic?.id) {
    case 'fractions':
      return 'Frações úteis:\n\n- Soma com mesmo denominador: mantenha o denominador e some os numeradores.\n- Soma com denominadores diferentes: use MMC antes de somar.';
    case 'linear-equations':
      return 'Equações do 1º grau não têm fórmula única. A técnica principal é isolar a incógnita mantendo o equilíbrio da igualdade.';
    case 'geometry-basics':
      return 'Fórmulas principais:\n\n- Área do triângulo: $A = (b \\times h) / 2$\n- Perímetro: soma de todos os lados.';
    case 'trigonometry':
      return 'Razões trigonométricas:\n\n- $\\sin = oposto / hipotenusa$\n- $\\cos = adjacente / hipotenusa$\n- $\\tan = oposto / adjacente$';
    case 'functions':
      return 'Funções usam regra de associação. Em funções lineares, uma forma comum é $f(x) = ax + b$.';
    case 'calculus-intro':
      return 'No cálculo introdutório, foque mais no significado:\n\n- Limite: aproximação\n- Derivada: taxa de variação';
    default:
      return 'Me diga o tópico e eu separo as fórmulas ou relações mais importantes.';
  }
};

const getStudyPlan = (topic?: Topic | null) => {
  if (topic) {
    const matchingPath = PATHS.find((path) => path.topicIds.includes(topic.id));
    const tips = TOPIC_TIPS[topic.id]?.map((tip) => `- ${tip}`).join('\n');

    return `Plano de estudo para **${topic.title}**:\n\n${tips}\n\n${matchingPath ? `Se quiser, siga a trilha **${matchingPath.title}** para aprofundar.` : ''}`;
  }

  const paths = PATHS.map((path) => `- **${path.title}**: ${path.focus}`).join('\n');
  return `Posso sugerir estes caminhos:\n\n${paths}`;
};

const getGeneralHelp = (input: string, topic?: Topic | null, lesson?: Lesson | null) => {
  const relevantTopic = topic?.id ? TOPIC_TIPS[topic.id]?.[0] : undefined;
  const example = topic?.id ? TOPIC_EXAMPLES[topic.id] : undefined;
  const contextLine = lesson
    ? `Estou olhando para a lição **${lesson.title}**.`
    : topic
      ? `Estou olhando para o tópico **${topic.title}**.`
      : 'Nenhum tópico está aberto agora.';

  return `${contextLine}\n\nPergunta recebida: "${input.trim()}".\n\n${relevantTopic ?? 'Se você me disser o tópico, eu consigo responder de forma mais direta.'}\n\n${example ?? 'Se quiser, peça um resumo, uma fórmula, um exemplo ou um exercício.'}`;
};

export function generateTutorReply(input: string, currentTopic?: Topic | null, currentLesson?: Lesson | null) {
  const normalizedInput = normalize(input);

  if (/^(oi|ola|olá|e ai|e aí|bom dia|boa tarde|boa noite)/.test(normalizedInput)) {
    return `Oi. Posso ajudar com **resumo**, **exemplo**, **fórmula**, **dica** ou **exercício**${currentTopic ? ` em **${currentTopic.title}**` : ''}.`;
  }

  if (normalizedInput.includes('resumo') || normalizedInput.includes('resum')) {
    return getSummary(currentLesson, currentTopic);
  }

  if (normalizedInput.includes('formula') || normalizedInput.includes('fórmula')) {
    return getFormula(currentTopic);
  }

  if (
    normalizedInput.includes('exercicio') ||
    normalizedInput.includes('exercício') ||
    normalizedInput.includes('questao') ||
    normalizedInput.includes('questão') ||
    normalizedInput.includes('pratic')
  ) {
    return getPractice(currentLesson, currentTopic);
  }

  if (normalizedInput.includes('exemplo')) {
    if (currentTopic?.id) {
      return TOPIC_EXAMPLES[currentTopic.id];
    }

    return 'Escolha um tópico e eu monto um exemplo resolvido passo a passo.';
  }

  if (normalizedInput.includes('dica') || normalizedInput.includes('trav')) {
    const question = getLessonQuestions(currentLesson?.id)[0];

    if (question?.hint) {
      return `Dica para a lição **${currentLesson?.title}**:\n\n${question.hint}`;
    }

    if (currentTopic?.id) {
      return `Dica de **${currentTopic.title}**:\n\n${TOPIC_TIPS[currentTopic.id]?.join('\n')}`;
    }

    return 'Conte em qual parte você travou e eu tento destravar em passos menores.';
  }

  if (normalizedInput.includes('plano') || normalizedInput.includes('estudo') || normalizedInput.includes('rotina')) {
    return getStudyPlan(currentTopic);
  }

  if (normalizedInput.includes('corrige') || normalizedInput.includes('corrigir')) {
    const question = getLessonQuestions(currentLesson?.id)[0];

    if (question) {
      return `Resposta esperada para praticar correção:\n\n**${question.text}**\n\nAlternativa correta: **${question.options[question.correctAnswer]}**\n\nExplicação: ${question.explanation}`;
    }

    return 'Mande a conta ou o raciocínio que eu corrijo passo a passo.';
  }

  return getGeneralHelp(input, currentTopic, currentLesson);
}

export const TUTOR_SUGGESTIONS = [
  'Resume essa lição',
  'Me dá um exemplo',
  'Cria um exercício',
  'Qual fórmula eu uso?',
];
