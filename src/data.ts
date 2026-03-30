import { Topic, Lesson, Question, Badge, LearningPath, RankingEntry } from './types';

export const TOPICS: Topic[] = [
  {
    id: 'fractions',
    title: 'Frações',
    description: 'Entenda partes de um todo, operações e simplificação.',
    level: 'Fundamental',
    category: 'Aritmética',
    icon: 'Divide'
  },
  {
    id: 'linear-equations',
    title: 'Equações do 1º Grau',
    description: 'A base da álgebra: encontrando o valor de x.',
    level: 'Fundamental',
    category: 'Álgebra',
    icon: 'Variable'
  },
  {
    id: 'geometry-basics',
    title: 'Geometria Básica',
    description: 'Áreas, perímetros e formas fundamentais.',
    level: 'Fundamental',
    category: 'Geometria',
    icon: 'Square'
  },
  {
    id: 'trigonometry',
    title: 'Trigonometria',
    description: 'Seno, cosseno e as relações no triângulo retângulo.',
    level: 'Médio',
    category: 'Geometria',
    icon: 'Triangle'
  },
  {
    id: 'functions',
    title: 'Funções',
    description: 'Domínio, imagem e o comportamento de gráficos.',
    level: 'Médio',
    category: 'Álgebra',
    icon: 'Activity'
  },
  {
    id: 'calculus-intro',
    title: 'Introdução ao Cálculo',
    description: 'Limites, derivadas e a taxa de variação.',
    level: 'Superior',
    category: 'Análise',
    icon: 'TrendingUp'
  }
];

export const LESSONS: Lesson[] = [
  {
    id: 'fractions-intro',
    topicId: 'fractions',
    title: 'Introdução às Frações',
    difficulty: 'Fácil',
    content: `
# O que é uma Fração?

Uma fração representa uma **parte de um todo**. Imagine uma pizza cortada em 8 pedaços. Se você comer 3 pedaços, você comeu 3/8 da pizza.

### Componentes:
- **Numerador (em cima):** Quantas partes temos.
- **Denominador (embaixo):** Em quantas partes o todo foi dividido.

### Exemplo Visual:
[ 1 ] [ 1 ] [ 0 ] [ 0 ] -> Isso representa 2/4 ou 1/2.
    `
  },
  {
    id: 'linear-intro',
    topicId: 'linear-equations',
    title: 'O que é uma Equação?',
    difficulty: 'Fácil',
    content: `
# Equações do 1º Grau

Uma equação é como uma balança em equilíbrio. O objetivo é isolar a incógnita (geralmente o **x**).

### Regra de Ouro:
Tudo o que você fizer de um lado da igualdade, deve fazer do outro.

**Exemplo:**
x + 5 = 12
Subtraímos 5 de ambos os lados:
x = 12 - 5
x = 7
    `
  },
  {
    id: 'geometry-triangles',
    topicId: 'geometry-basics',
    title: 'Triângulos e Áreas',
    difficulty: 'Médio',
    content: `
# Áreas de Triângulos

A área de um triângulo é metade da área de um retângulo com a mesma base e altura.

**Fórmula:**
A = (Base × Altura) / 2
    `
  },
  {
    id: 'calculus-limits',
    topicId: 'calculus-intro',
    title: 'Conceito de Limite',
    difficulty: 'Difícil',
    content: `
# O que é um Limite?

O limite descreve o comportamento de uma função à medida que o argumento se aproxima de um determinado valor.

É a base para entender a **Derivada**.

### Exemplo:
Seja $f(x) = \frac{x^2 - 1}{x - 1}$. Para $x=1$, a função é indefinida. Mas o limite quando $x \to 1$ é 2!
    `
  },
  {
    id: 'trigonometry-intro',
    topicId: 'trigonometry',
    title: 'Seno e Cosseno',
    difficulty: 'Médio',
    content: `
# O Triângulo Retângulo

Em um triângulo retângulo, as relações entre os lados e os ângulos são fundamentais.

- **Seno ($\sin$):** Cateto Oposto / Hipotenusa
- **Cosseno ($\cos$):** Cateto Adjacente / Hipotenusa
- **Tangente ($\tan$):** Cateto Oposto / Cateto Adjacente

### Círculo Trigonométrico:
O raio é 1. O eixo $x$ é o cosseno e o eixo $y$ é o seno.
    `
  },
  {
    id: 'functions-intro',
    topicId: 'functions',
    title: 'O que é uma Função?',
    difficulty: 'Fácil',
    content: `
# Funções Matemáticas

Uma função é uma regra que relaciona cada elemento de um conjunto (Domínio) a exatamente um elemento de outro conjunto (Contradomínio).

### Notação:
$f(x) = y$

Onde $x$ é a entrada e $y$ é a saída.
    `
  }
];

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    lessonId: 'fractions-intro',
    text: 'Se uma barra de chocolate tem 10 pedaços e você come 4, qual a fração simplificada do que você comeu?',
    options: ['4/10', '2/5', '1/2', '3/5'],
    correctAnswer: 1,
    explanation: '4/10 pode ser simplificado dividindo ambos por 2, resultando em 2/5.'
  },
  {
    id: 'q2',
    lessonId: 'linear-intro',
    text: 'Resolva a equação: 2x - 4 = 10',
    options: ['x = 3', 'x = 5', 'x = 7', 'x = 14'],
    correctAnswer: 2,
    explanation: '2x = 10 + 4 => 2x = 14 => x = 7.'
  },
  {
    id: 'q3',
    lessonId: 'geometry-triangles',
    text: 'Qual a área de um triângulo com base 10 e altura 5?',
    options: ['50', '25', '15', '10'],
    correctAnswer: 1,
    explanation: 'A = (10 * 5) / 2 = 50 / 2 = 25.'
  },
  {
    id: 'q4',
    lessonId: 'trigonometry-intro',
    text: 'Em um triângulo retângulo, se o cateto oposto é 3 e a hipotenusa é 5, qual o valor do seno?',
    options: ['3/4', '4/5', '3/5', '1'],
    correctAnswer: 2,
    explanation: 'Seno = Cateto Oposto / Hipotenusa = 3/5.'
  },
  {
    id: 'q5',
    lessonId: 'functions-intro',
    text: 'Se f(x) = 2x + 3, qual o valor de f(5)?',
    options: ['10', '13', '15', '8'],
    correctAnswer: 1,
    explanation: 'f(5) = 2(5) + 3 = 10 + 3 = 13.'
  },
  {
    id: 'q6',
    lessonId: 'calculus-limits',
    text: 'Qual o limite de f(x) = x + 2 quando x tende a 3?',
    options: ['3', '5', '2', 'Indefinido'],
    correctAnswer: 1,
    explanation: 'Basta substituir: 3 + 2 = 5.'
  }
];

export const BADGES: Badge[] = [
  {
    id: 'fraction-master',
    title: 'Mestre das Frações',
    description: 'Concluiu todos os exercícios de Frações com 100% de acerto.',
    icon: 'Divide',
    requirement: 'fractions'
  },
  {
    id: 'algebra-warrior',
    title: 'Guerreiro da Álgebra',
    description: 'Resolveu 5 equações seguidas sem errar.',
    icon: 'Variable',
    requirement: 'linear-equations'
  },
  {
    id: 'geometry-explorer',
    title: 'Explorador Geométrico',
    description: 'Dominou as áreas e perímetros.',
    icon: 'Square',
    requirement: 'geometry-basics'
  }
];

export const PATHS: LearningPath[] = [
  {
    id: 'exam-prep',
    title: 'Recuperação para Provas',
    description: 'Foco nos temas mais cobrados em provas bimestrais.',
    topicIds: ['fractions', 'linear-equations'],
    color: '#FF6B6B'
  },
  {
    id: 'geometry-deep',
    title: 'Aprofundamento em Geometria',
    description: 'Do básico ao avançado em formas e relações espaciais.',
    topicIds: ['geometry-basics', 'trigonometry'],
    color: '#4ECDC4'
  },
  {
    id: 'calculus-start',
    title: 'Introdução ao Cálculo',
    description: 'Prepare-se para o ensino superior com limites e derivadas.',
    topicIds: ['functions', 'calculus-intro'],
    color: '#FFE66D'
  }
];

export const MOCK_RANKING: RankingEntry[] = [
  { name: 'Ana Silva', points: 2450, avatar: 'https://picsum.photos/seed/ana/100' },
  { name: 'Bruno Costa', points: 2100, avatar: 'https://picsum.photos/seed/bruno/100' },
  { name: 'Carla Dias', points: 1850, avatar: 'https://picsum.photos/seed/carla/100' },
  { name: 'Daniel Oliveira', points: 1600, avatar: 'https://picsum.photos/seed/daniel/100' },
  { name: 'Eduarda Lima', points: 1450, avatar: 'https://picsum.photos/seed/edu/100' }
];
