import { LESSONS } from '../content';
import { getQuestionsByLessonId } from '../content/queries';
import { PATHS } from '../config';
import { getOfficialAnswer } from './questions';
import { Lesson, Topic } from '../types';

const TOPIC_TIPS: Record<string, string[]> = {
  'natural-numbers': [
    'Leia da esquerda para a direita e compare primeiro a maior ordem.',
    'Em expressões numéricas, resolva parênteses e multiplicações antes de somas.',
    'Divisibilidade ajuda a simplificar contas e reconhecer padrões.',
  ],
  fractions: [
    'Compare frações olhando primeiro para o denominador: ele mostra o tamanho de cada parte.',
    'Antes de operar, veja se dá para simplificar a fração e deixar a conta mais leve.',
    'Para somar denominadores diferentes, use um múltiplo comum antes de juntar os numeradores.',
  ],
  'ratio-proportion-percentage': [
    'Razão compara grandezas; proporção afirma igualdade entre razões.',
    'Regra de três funciona melhor quando as grandezas e unidades estão bem organizadas.',
    'Porcentagem é uma razão sobre 100 e conversa bem com frações e decimais.',
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
  'function-affine': [
    'Na função afim, o coeficiente angular mostra a inclinação da reta.',
    'O valor de b indica onde o gráfico corta o eixo y.',
    'Se a variação é constante, há boa chance de modelagem afim.',
  ],
  'function-quadratic': [
    'Na parábola, o coeficiente a controla a concavidade.',
    'Os zeros da função mostram onde o gráfico toca o eixo x.',
    'O vértice ajuda a encontrar máximo ou mínimo.',
  ],
  'math-finance': [
    'Separe sempre capital, taxa e tempo antes de escolher a fórmula.',
    'Juros simples crescem linearmente; juros compostos crescem de forma multiplicativa.',
    'Compare montante final e não apenas o valor da parcela.',
  ],
  'powers-roots': [
    'Antes de operar, confira se os parênteses fazem o sinal entrar ou não na potência.',
    'Produto e quociente de potências pedem atenção ao expoente e não apenas ao valor numérico.',
    'Na notação científica, deixe um único algarismo não nulo antes da vírgula e ajuste a potência de 10.',
  ],
};

const TOPIC_EXAMPLES: Record<string, string> = {
  'natural-numbers':
    'Exemplo: entre 54.321 e 54.299, o maior é 54.321 porque na casa das dezenas 2 é menor do que 3.',
  fractions:
    'Exemplo: 3/4 de uma pizza significa 3 pedaços de um total de 4. Se você somar 1/4 + 2/4, obtém 3/4.',
  'ratio-proportion-percentage':
    'Exemplo: se 20% de um valor é 30, então 100% é 150, porque 30 ÷ 0,2 = 150.',
  'linear-equations':
    'Exemplo: 2x + 3 = 11. Subtraia 3 dos dois lados, ficando 2x = 8. Depois divida por 2: x = 4.',
  'geometry-basics':
    'Exemplo: um triângulo com base 10 e altura 6 tem área (10 × 6) / 2 = 30.',
  trigonometry:
    'Exemplo: se o cateto oposto vale 6 e a hipotenusa vale 10, então sen(θ) = 6/10 = 3/5.',
  functions:
    'Exemplo: em f(x) = 3x - 2, se x = 4 então f(4) = 12 - 2 = 10.',
  'function-affine':
    'Exemplo: em y = 2x + 1, quando x aumenta 1 unidade, y aumenta 2.',
  'function-quadratic':
    'Exemplo: em y = x^2 - 4, os zeros são x = 2 e x = -2.',
  'math-finance':
    'Exemplo: com capital de 1000 a 10% ao ano em juros simples, após 2 anos os juros são 200.',
  'powers-roots':
    'Exemplo: $3^4 \\cdot 3^2 = 3^6$ e $734.000 = 7,34 \\times 10^5$.',
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
  const question = getQuestionsByLessonId(lesson?.id)[0];
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
    case 'function-affine':
      return 'Função afim:\n\n- Forma geral: $f(x) = ax + b$\n- $a$ controla inclinação\n- $b$ é o intercepto em $y$.';
    case 'function-quadratic':
      return 'Função quadrática:\n\n- Forma geral: $f(x) = ax^2 + bx + c$\n- Delta: $\\Delta = b^2 - 4ac$';
    case 'math-finance':
      return 'Fórmulas úteis:\n\n- Juros simples: $J = C \\cdot i \\cdot t$\n- Montante: $M = C + J$';
    case 'powers-roots':
      return 'Potenciação e notação científica:\n\n- Produto de mesma base: $a^m \\cdot a^n = a^{m+n}$\n- Quociente de mesma base: $a^m / a^n = a^{m-n}$\n- Potência de potência: $(a^m)^n = a^{mn}$\n- Notação científica: $N = x \\times 10^n$ com $1 \\leq x < 10$.';
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
    const question = getQuestionsByLessonId(currentLesson?.id)[0];

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
    const question = getQuestionsByLessonId(currentLesson?.id)[0];

    if (question) {
      return `Resposta esperada para praticar correção:\n\n**${question.text}**\n\nGabarito oficial: **${getOfficialAnswer(question)}**\n\nExplicação: ${question.explanation}`;
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
