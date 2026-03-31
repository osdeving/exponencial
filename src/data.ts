import { Badge, LearningPath, Lesson, Question, RankingEntry, Topic } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'fractions',
    title: 'Frações',
    description: 'Entenda partes de um todo, simplificação e contas com denominadores diferentes.',
    level: 'Fundamental',
    category: 'Aritmética',
    icon: 'Divide',
  },
  {
    id: 'linear-equations',
    title: 'Equações do 1º Grau',
    description: 'A base da álgebra para isolar incógnitas e resolver problemas do cotidiano.',
    level: 'Fundamental',
    category: 'Álgebra',
    icon: 'Variable',
  },
  {
    id: 'geometry-basics',
    title: 'Geometria Básica',
    description: 'Áreas, perímetros e leitura geométrica para resolver problemas visuais.',
    level: 'Fundamental',
    category: 'Geometria',
    icon: 'Square',
  },
  {
    id: 'trigonometry',
    title: 'Trigonometria',
    description: 'Seno, cosseno, tangente e leitura de triângulos retângulos.',
    level: 'Médio',
    category: 'Geometria',
    icon: 'Triangle',
  },
  {
    id: 'functions',
    title: 'Funções',
    description: 'Domínio, imagem, tabelas e leitura de gráficos.',
    level: 'Médio',
    category: 'Álgebra',
    icon: 'Activity',
  },
  {
    id: 'calculus-intro',
    title: 'Introdução ao Cálculo',
    description: 'Limites, variação e a ideia central da derivada.',
    level: 'Superior',
    category: 'Análise',
    icon: 'TrendingUp',
  },
];

export const LESSONS: Lesson[] = [
  {
    id: 'fractions-intro',
    topicId: 'fractions',
    title: 'Introdução às Frações',
    difficulty: 'Fácil',
    estimatedMinutes: 12,
    order: 1,
    goals: ['Entender numerador e denominador', 'Ler frações no cotidiano'],
    content: `
# O que é uma Fração?

Uma fração representa uma **parte de um todo**. Se uma pizza foi dividida em 8 pedaços e você comeu 3, então comeu **3/8**.

## Componentes

- **Numerador:** quantas partes você está considerando.
- **Denominador:** em quantas partes o todo foi dividido.

## Leituras comuns

- $1/2$ = metade
- $1/4$ = um quarto
- $3/5$ = três quintos

## Dica prática

Se o denominador aumenta, cada parte fica menor.
    `,
  },
  {
    id: 'fractions-operations',
    topicId: 'fractions',
    title: 'Operações com Frações',
    difficulty: 'Médio',
    estimatedMinutes: 16,
    order: 2,
    goals: ['Somar frações com mesmo denominador', 'Resolver soma com MMC'],
    content: `
# Somando e Subtraindo Frações

## Mesmo denominador

Quando o denominador é igual, você soma apenas os numeradores:

$\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}$

## Denominadores diferentes

Encontre um denominador comum, geralmente pelo **MMC**.

Exemplo:

$\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$

## Multiplicação

Multiplique numerador com numerador e denominador com denominador:

$\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$
    `,
  },
  {
    id: 'linear-intro',
    topicId: 'linear-equations',
    title: 'O que é uma Equação?',
    difficulty: 'Fácil',
    estimatedMinutes: 14,
    order: 1,
    goals: ['Interpretar igualdade como equilíbrio', 'Isolar o valor de x'],
    content: `
# Equações do 1º Grau

Uma equação funciona como uma **balança em equilíbrio**. O objetivo é descobrir qual valor deixa os dois lados iguais.

## Regra de ouro

Tudo que você fizer de um lado da igualdade deve fazer do outro.

## Exemplo

$x + 5 = 12$

Subtraindo 5 dos dois lados:

$x = 7$
    `,
  },
  {
    id: 'linear-problems',
    topicId: 'linear-equations',
    title: 'Problemas com Equações',
    difficulty: 'Médio',
    estimatedMinutes: 18,
    order: 2,
    goals: ['Traduzir frases em equações', 'Modelar problemas simples'],
    content: `
# Modelando Situações

Muitas questões de texto podem ser resolvidas transformando a frase em equação.

## Passo a passo

1. Defina a incógnita.
2. Traduza a informação do enunciado.
3. Resolva a equação.
4. Confira se a resposta faz sentido.

## Exemplo

"O dobro de um número mais 3 é 17."

Se o número é $x$, então:

$2x + 3 = 17$

$2x = 14$

$x = 7$
    `,
  },
  {
    id: 'geometry-triangles',
    topicId: 'geometry-basics',
    title: 'Triângulos e Áreas',
    difficulty: 'Médio',
    estimatedMinutes: 15,
    order: 1,
    goals: ['Calcular área de triângulos', 'Interpretar base e altura'],
    content: `
# Área de Triângulos

A área de um triângulo é metade da área de um retângulo com a mesma base e a mesma altura.

## Fórmula

$A = \\frac{b \\times h}{2}$

## Atenção

A altura precisa ser **perpendicular** à base.
    `,
  },
  {
    id: 'geometry-perimeter',
    topicId: 'geometry-basics',
    title: 'Perímetros e Polígonos',
    difficulty: 'Fácil',
    estimatedMinutes: 13,
    order: 2,
    goals: ['Somar lados de figuras', 'Distinguir área de perímetro'],
    content: `
# O que é Perímetro?

Perímetro é a medida do **contorno** de uma figura.

## Exemplos

- Quadrado de lado 4: $4 + 4 + 4 + 4 = 16$
- Retângulo de lados 6 e 2: $6 + 2 + 6 + 2 = 16$

## Diferença importante

- **Área:** espaço interno
- **Perímetro:** contorno
    `,
  },
  {
    id: 'trigonometry-intro',
    topicId: 'trigonometry',
    title: 'Seno, Cosseno e Tangente',
    difficulty: 'Médio',
    estimatedMinutes: 17,
    order: 1,
    goals: ['Reconhecer razões trigonométricas', 'Ler triângulos retângulos'],
    content: `
# Razões Trigonométricas

No triângulo retângulo:

- **Seno:** cateto oposto / hipotenusa
- **Cosseno:** cateto adjacente / hipotenusa
- **Tangente:** cateto oposto / cateto adjacente

## Dica

Sempre escolha um ângulo de referência antes de decidir quem é oposto ou adjacente.
    `,
  },
  {
    id: 'trigonometry-angles',
    topicId: 'trigonometry',
    title: 'Ângulos Notáveis',
    difficulty: 'Médio',
    estimatedMinutes: 15,
    order: 2,
    goals: ['Memorizar valores clássicos', 'Resolver problemas rápidos'],
    content: `
# Ângulos de 30°, 45° e 60°

Os ângulos notáveis aparecem com frequência em provas.

## Valores importantes

- $\\sin 30° = 1/2$
- $\\cos 60° = 1/2$
- $\\sin 45° = \\cos 45° = \\sqrt{2}/2$

## Estratégia

Monte uma pequena tabela mental e treine reconhecer padrões.
    `,
  },
  {
    id: 'functions-intro',
    topicId: 'functions',
    title: 'O que é uma Função?',
    difficulty: 'Fácil',
    estimatedMinutes: 14,
    order: 1,
    goals: ['Relacionar entrada e saída', 'Entender domínio e imagem'],
    content: `
# Funções Matemáticas

Uma função associa cada valor de entrada a um único valor de saída.

## Notação

$f(x) = y$

Se $f(x) = 2x + 3$, então:

- $f(1) = 5$
- $f(2) = 7$
- $f(5) = 13$
    `,
  },
  {
    id: 'functions-graphs',
    topicId: 'functions',
    title: 'Gráficos e Crescimento',
    difficulty: 'Médio',
    estimatedMinutes: 16,
    order: 2,
    goals: ['Ler pontos de um gráfico', 'Identificar crescimento e decrescimento'],
    content: `
# Lendo Gráficos

Um gráfico mostra como a função se comporta visualmente.

## Observações importantes

- Quando a reta sobe, a função é crescente.
- Quando a reta desce, a função é decrescente.
- O ponto onde corta o eixo $y$ é o valor de $f(0)$.
    `,
  },
  {
    id: 'calculus-limits',
    topicId: 'calculus-intro',
    title: 'Conceito de Limite',
    difficulty: 'Difícil',
    estimatedMinutes: 18,
    order: 1,
    goals: ['Entender aproximação', 'Ler comportamento perto de um ponto'],
    content: `
# O que é um Limite?

O limite descreve o comportamento de uma função quando $x$ se aproxima de um valor.

## Ideia principal

Mesmo que a função não esteja definida exatamente naquele ponto, podemos entender **para onde ela vai**.

## Exemplo

Se $f(x) = x + 2$, então quando $x \\to 3$, o limite vale 5.
    `,
  },
  {
    id: 'calculus-derivative',
    topicId: 'calculus-intro',
    title: 'Ideia de Derivada',
    difficulty: 'Difícil',
    estimatedMinutes: 20,
    order: 2,
    goals: ['Relacionar derivada e variação', 'Ler taxa de mudança'],
    content: `
# Derivada como Taxa de Variação

A derivada mede o quanto uma função muda em relação à variável.

## Intuição

Se a posição depende do tempo, a derivada da posição representa a velocidade.

## Leitura simples

- Derivada positiva: função crescendo
- Derivada negativa: função diminuindo
- Derivada zero: ponto crítico
    `,
  },
];

export const QUESTIONS: Question[] = [
  {
    id: 'q-fractions-1',
    lessonId: 'fractions-intro',
    text: 'Se uma barra tem 12 partes e você come 6, qual fração representa a parte comida em forma simplificada?',
    options: ['6/12', '1/2', '3/4', '2/3'],
    correctAnswer: 1,
    explanation: '6/12 simplifica para 1/2 porque numerador e denominador podem ser divididos por 6.',
    hint: 'Simplifique a fração dividindo numerador e denominador pelo mesmo número.',
  },
  {
    id: 'q-fractions-2',
    lessonId: 'fractions-operations',
    text: 'Quanto vale 1/2 + 1/4?',
    options: ['2/6', '3/4', '1/6', '2/4'],
    correctAnswer: 1,
    explanation: 'Transforme 1/2 em 2/4. Depois some: 2/4 + 1/4 = 3/4.',
    hint: 'Use denominador comum 4.',
  },
  {
    id: 'q-linear-1',
    lessonId: 'linear-intro',
    text: 'Resolva a equação x + 9 = 14.',
    options: ['x = 23', 'x = 5', 'x = 14', 'x = 9'],
    correctAnswer: 1,
    explanation: 'Subtraia 9 dos dois lados da equação: x = 14 - 9 = 5.',
    hint: 'Para isolar x, leve o 9 para o outro lado subtraindo.',
  },
  {
    id: 'q-linear-2',
    lessonId: 'linear-problems',
    text: 'O triplo de um número menos 2 é 16. Qual é esse número?',
    options: ['4', '5', '6', '7'],
    correctAnswer: 2,
    explanation: 'Monte 3x - 2 = 16. Então 3x = 18 e x = 6.',
    hint: 'Transforme a frase em 3x - 2 = 16.',
  },
  {
    id: 'q-geometry-1',
    lessonId: 'geometry-triangles',
    text: 'Qual é a área de um triângulo com base 8 e altura 6?',
    options: ['48', '24', '14', '28'],
    correctAnswer: 1,
    explanation: 'A área é (8 × 6) / 2 = 48 / 2 = 24.',
    hint: 'Use a fórmula base vezes altura dividido por 2.',
  },
  {
    id: 'q-geometry-2',
    lessonId: 'geometry-perimeter',
    text: 'Um retângulo tem lados 5 e 3. Qual é o perímetro?',
    options: ['8', '15', '16', '30'],
    correctAnswer: 2,
    explanation: 'Perímetro é a soma de todos os lados: 5 + 3 + 5 + 3 = 16.',
    hint: 'Some todos os lados da figura.',
  },
  {
    id: 'q-trig-1',
    lessonId: 'trigonometry-intro',
    text: 'Se o cateto oposto mede 3 e a hipotenusa mede 5, qual é o seno do ângulo?',
    options: ['3/5', '5/3', '3/2', '2/5'],
    correctAnswer: 0,
    explanation: 'Seno = cateto oposto / hipotenusa = 3/5.',
    hint: 'Seno sempre usa cateto oposto dividido pela hipotenusa.',
  },
  {
    id: 'q-trig-2',
    lessonId: 'trigonometry-angles',
    text: 'Qual é o valor de sen 30°?',
    options: ['1', '1/2', '√2/2', '√3/2'],
    correctAnswer: 1,
    explanation: 'O valor notável de sen 30° é 1/2.',
    hint: 'É um dos valores clássicos mais cobrados.',
  },
  {
    id: 'q-functions-1',
    lessonId: 'functions-intro',
    text: 'Se f(x) = 2x + 1, qual é o valor de f(4)?',
    options: ['9', '8', '7', '5'],
    correctAnswer: 0,
    explanation: 'f(4) = 2 × 4 + 1 = 9.',
    hint: 'Substitua x por 4 na expressão.',
  },
  {
    id: 'q-functions-2',
    lessonId: 'functions-graphs',
    text: 'Se o gráfico de uma reta sobe da esquerda para a direita, a função é:',
    options: ['Constante', 'Decrescente', 'Crescente', 'Indefinida'],
    correctAnswer: 2,
    explanation: 'Quando a reta sobe da esquerda para a direita, a função é crescente.',
    hint: 'Observe o comportamento da reta ao avançar no eixo x.',
  },
  {
    id: 'q-calculus-1',
    lessonId: 'calculus-limits',
    text: 'Qual é o limite de x + 1 quando x tende a 4?',
    options: ['4', '5', '1', 'Indefinido'],
    correctAnswer: 1,
    explanation: 'Em funções lineares simples, basta substituir: 4 + 1 = 5.',
    hint: 'Substitua o valor que x está se aproximando.',
  },
  {
    id: 'q-calculus-2',
    lessonId: 'calculus-derivative',
    text: 'Se a derivada é positiva em um intervalo, a função está:',
    options: ['Crescente', 'Parada', 'Decrescente', 'Sem solução'],
    correctAnswer: 0,
    explanation: 'Derivada positiva indica crescimento da função.',
    hint: 'Pense em uma subida no gráfico.',
  },
];

export const BADGES: Badge[] = [
  {
    id: 'fraction-master',
    title: 'Mestre das Frações',
    description: 'Fez 100% em todas as lições de Frações.',
    icon: 'Divide',
    requirement: 'fractions',
  },
  {
    id: 'algebra-warrior',
    title: 'Guerreiro da Álgebra',
    description: 'Dominou completamente Equações do 1º Grau.',
    icon: 'Variable',
    requirement: 'linear-equations',
  },
  {
    id: 'geometry-explorer',
    title: 'Explorador Geométrico',
    description: 'Concluiu Geometria com acerto perfeito.',
    icon: 'Square',
    requirement: 'geometry-basics',
  },
  {
    id: 'trig-scout',
    title: 'Batedor Trigonométrico',
    description: 'Acertou todas as lições de Trigonometria.',
    icon: 'Triangle',
    requirement: 'trigonometry',
  },
  {
    id: 'function-reader',
    title: 'Leitor de Gráficos',
    description: 'Fechou o módulo de Funções sem erros.',
    icon: 'Activity',
    requirement: 'functions',
  },
  {
    id: 'calculus-rookie',
    title: 'Cálculo em Movimento',
    description: 'Concluiu Introdução ao Cálculo com 100%.',
    icon: 'TrendingUp',
    requirement: 'calculus-intro',
  },
];

export const PATHS: LearningPath[] = [
  {
    id: 'exam-prep',
    title: 'Recuperação para Provas',
    description: 'Uma trilha enxuta para reforçar base e subir nota rápido.',
    topicIds: ['fractions', 'linear-equations', 'geometry-basics'],
    color: '#FF6B6B',
    estimatedWeeks: 3,
    focus: 'Base, resolução rápida e recuperação de conteúdo.',
    featuredLessonId: 'fractions-intro',
  },
  {
    id: 'geometry-deep',
    title: 'Aprofundamento em Geometria',
    description: 'Parte do básico e avança até relações trigonométricas.',
    topicIds: ['geometry-basics', 'trigonometry'],
    color: '#4ECDC4',
    estimatedWeeks: 4,
    focus: 'Visualização, perímetros, áreas e triângulos retângulos.',
    featuredLessonId: 'geometry-triangles',
  },
  {
    id: 'calculus-start',
    title: 'Ponte para o Superior',
    description: 'Constrói a base algébrica antes de chegar em limites e derivadas.',
    topicIds: ['functions', 'calculus-intro'],
    color: '#FFE66D',
    estimatedWeeks: 4,
    focus: 'Leitura de funções, gráficos e primeiros conceitos de cálculo.',
    featuredLessonId: 'functions-intro',
  },
];

export const MOCK_RANKING: RankingEntry[] = [
  { name: 'Ana Silva', points: 2450, avatar: 'https://picsum.photos/seed/ana/100' },
  { name: 'Bruno Costa', points: 2100, avatar: 'https://picsum.photos/seed/bruno/100' },
  { name: 'Camila Rocha', points: 1820, avatar: 'https://picsum.photos/seed/camila/100' },
  { name: 'Diego Nunes', points: 1690, avatar: 'https://picsum.photos/seed/diego/100' },
  { name: 'Erika Souza', points: 1580, avatar: 'https://picsum.photos/seed/erika/100' },
];
