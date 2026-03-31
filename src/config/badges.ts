import { Badge } from '../types';

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
    description: 'Concluiu Geometria Básica com acerto perfeito.',
    icon: 'Square',
    requirement: 'geometry-basics',
  },
  {
    id: 'graph-reader',
    title: 'Leitor de Gráficos',
    description: 'Fechou o módulo de Funções sem erros.',
    icon: 'Activity',
    requirement: 'functions',
  },
  {
    id: 'trig-scout',
    title: 'Batedor Trigonométrico',
    description: 'Acertou todas as lições de Trigonometria.',
    icon: 'Triangle',
    requirement: 'trigonometry',
  },
  {
    id: 'finance-operator',
    title: 'Operador Financeiro',
    description: 'Concluiu Matemática Financeira com 100%.',
    icon: 'Wallet',
    requirement: 'math-finance',
  },
];
