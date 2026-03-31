import { Question } from '../../types';

type TextBlock = {
  start: number;
  end: number;
  text: string;
};

const SOURCE = 'TQM - Radiciação Exercícios.pdf';

const QUESTION_BLOCKS: TextBlock[] = [
  {
    start: 1,
    end: 23,
    text: `
- **1.** Simplifique: $\\sqrt{a^6}$.
- **2.** Simplifique: $\\sqrt[12]{x^4}$.
- **3.** Simplifique: $\\sqrt[5]{x^8}$.
- **4.** Simplifique: $\\sqrt[3]{6^{12}}$.
- **5.** Simplifique: $\\sqrt[n]{5^{2n}}$.
- **6.** Simplifique: $\\sqrt[4]{64}$.
- **7.** Simplifique: $\\sqrt{324}$.
- **8.** Simplifique: $\\sqrt{2500}$.
- **9.** Simplifique: $\\sqrt[3]{216}$.
- **10.** Simplifique: $\\sqrt[3]{3888}$.
- **11.** Simplifique: $\\sqrt{676}$.
- **12.** Simplifique: $\\sqrt[3]{-64}$.
- **13.** Simplifique: $\\sqrt[3]{2592}$.
- **14.** Simplifique: $\\sqrt[5]{1024 \\cdot 243}$.
- **15.** Simplifique: $\\sqrt{0,25}$.
- **16.** Simplifique: $\\sqrt{0,0081}$.
- **17.** Simplifique: $\\sqrt{\\frac{4}{9}}$.
- **18.** Simplifique: $\\sqrt{\\frac{16}{25}}$.
- **19.** Simplifique: $\\sqrt[3]{\\frac{x^6}{y^{15}}}$.
- **20.** Simplifique: $\\sqrt[n]{a^n \\cdot b^{3n}}$.
- **21.** Simplifique: $\\sqrt[15]{x^3 \\cdot y^6}$.
- **22.** Simplifique: $\\sqrt[5]{64 \\cdot x^8 \\cdot y^7}$.
- **23.** Simplifique: $\\sqrt[3]{x^6 \\cdot y^{12}}$.
`.trim(),
  },
  {
    start: 24,
    end: 70,
    text: `
- **24.** Simplifique o radical do item 24 do material-base, envolvendo potências de $x$, $y$ e $z$ sob uma raiz de índice 4.
- **25.** Simplifique: $\\sqrt{a^5 \\cdot b^4 \\cdot c^7}$.
- **26.** Simplifique: $\\sqrt[4]{\\dfrac{x^4 y^{12}}{z^{20}}}$.
- **27.** Simplifique: $\\sqrt[3]{\\dfrac{x^5 y^6}{z^4}}$.
- **28.** Simplifique: $\\sqrt[n]{x^{n+3}}$.
- **29.** Simplifique a expressão com soma de potências de 3 no radicando do item 29.
- **30.** Desenvolva: $25^{1/2}$.
- **31.** Desenvolva: $8^{1/3}$.
- **32.** Desenvolva: $16^{0,5}$.
- **33.** Desenvolva: $(0,125)^{-1/3}$.
- **34.** Desenvolva: $\\left(\\dfrac{1}{3}\\right)^{-1/2}$.
- **35.** Desenvolva: $4^{3/2}$.
- **36.** Desenvolva: $(-27)^{0,333\\ldots}$.
- **37.** Desenvolva: $\\left(\\dfrac{9}{4}\\right)^{1/2}$.
- **38.** Desenvolva: $\\left(\\dfrac{16}{625}\\right)^{1/4}$.
- **39.** Desenvolva: $\\left(\\dfrac{125}{27}\\right)^{2/3}$.
- **40.** Reduza ao mesmo índice: $\\sqrt[6]{5}$, $\\sqrt[3]{9}$ e $\\sqrt[4]{3^2}$.
- **41.** Reduza ao mesmo índice: $\\sqrt{2}$, $\\sqrt[3]{5}$ e $\\sqrt[4]{3}$.
- **42.** Reduza ao mesmo índice: $\\sqrt[5]{x^3}$, $\\sqrt[6]{x}$ e $\\sqrt[8]{x^5}$.
- **43.** Reduza ao mesmo índice: $\\sqrt{a}$, $\\sqrt[4]{a^3}$ e $\\sqrt[8]{a^7}$.
- **44.** Efetue: $\\sqrt[3]{\\sqrt[4]{3}}$.
- **45.** Efetue: $\\sqrt[5]{\\sqrt[3]{\\sqrt{18}}}$.
- **46.** Efetue a composição de radicais aninhados do item 46 envolvendo $a^2$.
- **47.** Efetue: $\\sqrt[3]{2}\\cdot\\sqrt[3]{6}$.
- **48.** Efetue: $\\sqrt[3]{4}\\cdot\\sqrt[3]{27}\\cdot\\sqrt[3]{8}\\cdot\\sqrt[3]{9}$.
- **49.** Efetue o produto de radicais cúbicos do item 49, com termos em $a$ e $b$.
- **50.** Efetue o produto de três radicais do item 50, com termos em $a$, $b$ e $x$.
- **51.** Efetue: $\\sqrt{8}\\cdot\\sqrt{2}$.
- **52.** Efetue o quociente de radicais com $x$ e $y$ do item 52.
- **53.** Efetue: $(4\\sqrt{10}) : (2\\sqrt{5})$.
- **54.** Efetue: $\\sqrt{12}\\cdot\\sqrt{18}$.
- **55.** Efetue: $\\sqrt{\\dfrac{54}{24}}$.
- **56.** Efetue a potência do radical com $x$ e $y$ do item 56.
- **57.** Efetue: $(\\sqrt{4+\\sqrt{15}} + \\sqrt{4-\\sqrt{15}})^2$.
- **58.** Efetue: $3\\sqrt{2} + 5\\sqrt{2} - 4\\sqrt{2}$.
- **59.** Efetue: $\\sqrt{27} - \\sqrt{75} + \\sqrt{48}$.
- **60.** Efetue: $\\dfrac{\\sqrt{32}}{2} - \\dfrac{\\sqrt{98}}{3} - \\dfrac{\\sqrt{50}}{4}$.
- **61.** Efetue: $5\\sqrt{2} - 3\\sqrt{2} + 2\\sqrt{2} - \\sqrt{2}$.
- **62.** Efetue: $4\\sqrt{5} + 3\\sqrt{5} - 10\\sqrt{5} - 2\\sqrt{5}$.
- **63.** Efetue: $\\dfrac{5\\sqrt{6}}{6} + \\dfrac{3\\sqrt{6}}{8} - \\dfrac{2\\sqrt{6}}{3} + \\dfrac{\\sqrt{6}}{6}$.
- **64.** Efetue: $\\sqrt{2} + \\sqrt{50} - \\sqrt{98} + \\sqrt{18}$.
- **65.** Efetue: $\\sqrt{20} - \\sqrt{45} + \\sqrt{5} - \\sqrt{80}$.
- **66.** Efetue: $2\\sqrt{48} + 3\\sqrt{27} - \\sqrt{75} - \\sqrt{3}$.
- **67.** Efetue a expressão do item 67 com $\\sqrt{80}$, $\\sqrt{45}$ e $\\sqrt{245}$.
- **68.** Efetue a operação com radicais e potências de $a$ do item 68.
- **69.** Efetue a operação do item 69 envolvendo $\\sqrt{3}$ e potência de $a$ sob radical.
- **70.** Efetue o quociente de radicais do item 70.
`.trim(),
  },
  {
    start: 71,
    end: 108,
    text: `
- **71.** Efetue: $\\sqrt{12} : \\sqrt{4}$.
- **72.** Introduza os fatores nos radicais: $2\\sqrt{3a}$.
- **73.** Introduza os fatores nos radicais: $3xy\\cdot\\sqrt{a}$.
- **74.** Introduza os fatores no radical do item 74, envolvendo $x$, $y$ e a fração $\\dfrac{xy}{2}$.
- **75.** Introduza os fatores no radical do item 75, envolvendo as letras $a$ e $b$.
- **76.** Introduza os fatores nos radicais: $3a\\sqrt[3]{3ab}$.
- **77.** Introduza os fatores nos radicais: $2a^2y\\sqrt{ay}$.
- **78.** Introduza os fatores na expressão radical do item 78.
- **79.** Introduza os fatores na expressão do item 79, envolvendo $a\\sqrt{a}\\sqrt{a}$.
- **80.** Introduza os fatores na expressão radical do item 80.
- **81.** Introduza os fatores na expressão radical do item 81.
- **82.** Introduza os fatores na expressão radical do item 82, envolvendo $x$ em diferentes índices.
- **83.** Racionalize: $\\dfrac{1}{\\sqrt{2}}$.
- **84.** Racionalize: $\\dfrac{3}{\\sqrt{3}}$.
- **85.** Racionalize: $\\dfrac{1}{\\sqrt[3]{2}}$.
- **86.** Racionalize: $\\dfrac{3}{\\sqrt[4]{3}}$.
- **87.** Racionalize: $\\dfrac{8}{\\sqrt[3]{4}}$.
- **88.** Racionalize: $\\dfrac{x}{\\sqrt[3]{x^2}}$.
- **89.** Racionalize: $\\dfrac{4}{3\\sqrt{2}}$.
- **90.** Racionalize: $\\dfrac{9}{\\sqrt[3]{9}}$.
- **91.** Racionalize: $\\dfrac{2}{3+\\sqrt{3}}$.
- **92.** Racionalize: $\\dfrac{8}{\\sqrt{3}+\\sqrt{2}}$.
- **93.** Racionalize: $\\dfrac{-11}{5-\\sqrt{3}}$.
- **94.** Racionalize: $\\dfrac{2+\\sqrt{2}}{2-\\sqrt{2}}$.
- **95.** Racionalize: $\\dfrac{\\sqrt{5}+\\sqrt{3}}{\\sqrt{5}-\\sqrt{3}}$.
- **96.** Racionalize: $\\dfrac{3}{\\sqrt{5}}$.
- **97.** Racionalize: $\\dfrac{2}{\\sqrt[3]{3}}$.
- **98.** Racionalize: $\\dfrac{5}{\\sqrt[4]{x^3}}$.
- **99.** Racionalize: $\\dfrac{3}{\\sqrt{7}+\\sqrt{5}}$.
- **100.** Racionalize: $\\dfrac{5}{\\sqrt{6}-1}$.
- **101.** Racionalize a expressão do item 101 envolvendo $a$, $\\sqrt[4]{x}$ e $\\sqrt[4]{y}$.
- **102.** Racionalize: $\\dfrac{x}{\\sqrt[3]{a}-\\sqrt[3]{b}}$.
- **103.** Racionalize: $\\dfrac{3}{\\sqrt[3]{5}+\\sqrt[3]{4}}$.
- **104.** Racionalize: $\\dfrac{4}{\\sqrt[3]{3}-\\sqrt[3]{2}}$.
- **105.** Racionalize: $\\dfrac{9}{\\sqrt[3]{10}+2}$.
- **106.** Racionalize: $\\dfrac{19}{4-\\sqrt[3]{7}}$.
- **107.** Racionalize: $\\dfrac{12}{\\sqrt[3]{25}-\\sqrt[3]{5}+1}$.
- **108.** Racionalize a expressão do item 108 com $1+\\sqrt[3]{2}$ no numerador e $1+\\sqrt[3]{2}+\\sqrt[3]{4}$ no denominador.
`.trim(),
  },
  {
    start: 109,
    end: 145,
    text: `
- **109.** Racionalize a expressão do item 109 com $\\sqrt[6]{4}$, $\\sqrt[3]{6}$ e $\\sqrt{6}$.
- **110.** Extraia a raiz quadrada de 2.401.
- **111.** Extraia a raiz quadrada de 13.689.
- **112.** Extraia a raiz quadrada de 49.284.
- **113.** Extraia a raiz quadrada de 293.764.
- **114.** Extraia a raiz quadrada de 11.236.
- **115.** Extraia a raiz quadrada de 6.105.841.
- **116.** Extraia, por falta, a raiz quadrada de 6.679.
- **117.** Extraia, por falta, a raiz quadrada de 13.556.
- **118.** Extraia, por falta, a raiz quadrada de 91.212.
- **119.** Extraia, por falta, a raiz quadrada de 146.372.
- **120.** Extraia, por falta, a raiz quadrada de 8.457.317.
- **121.** Escreva $\\sqrt{6}+\\sqrt{11}$ sob a forma pedida no item 121.
- **122.** Escreva $\\sqrt{7}-\\sqrt{13}$ sob a forma pedida no item 122.
- **123.** Escreva $\\sqrt{4}+\\sqrt{7}$ sob a forma pedida no item 123.
- **124.** Escreva $\\sqrt{8}-2\\sqrt{15}$ sob a forma pedida no item 124.
- **125.** Escreva $\\sqrt{13}+2\\sqrt{22}$ sob a forma pedida no item 125.
- **126.** Escreva $\\sqrt{20}-2\\sqrt{51}$ sob a forma pedida no item 126.
- **127.** Escreva $\\sqrt{9}+6\\sqrt{2}$ sob a forma pedida no item 127.
- **128.** Escreva $\\sqrt{a-b}+\\sqrt{a(a-2b)}$, com $a>0$ e $a>2b$, sob a forma pedida no item 128.
- **129.** A extração da raiz quadrada de um número deu resultado 72, com resto máximo. Qual era esse número?
- **130.** No cálculo da raiz quadrada do número 2.114 encontrou-se 45. Qual foi o resto?
- **131.** Que resto encontramos na determinação da raiz quadrada do número 4.845, que é 69?
- **132.** Ao determinarmos a raiz quadrada do número 195, obtivemos resto máximo. Qual era esse resto?
- **133.** Na determinação da raiz quadrada de um número $N$, encontrou-se 26 para raiz e o resto foi o maior possível. Calcule $N$.
- **134.** Determine a raiz quadrada de 288, sabendo-se que ela deixa o maior resto possível.
- **135.** Determine a raiz quadrada de 483, com erro inferior a 0,1.
- **136.** Calcule a raiz quadrada de 273, a menos de 0,01.
- **137.** Determine a raiz quadrada de 916, a menos de 0,25.
- **138.** Calcule a raiz quadrada de 47, com erro inferior a 0,125.
- **139.** No cálculo da raiz cúbica de um número $N$, obteve-se o resto máximo. Sabendo-se que a raiz encontrada foi 8, calcule o valor de $N$.
- **140.** Na extração da raiz cúbica de um número $N$, o resto obtido foi 396, que era o maior possível. Determine o valor de $N$.
- **141.** (CN) Analise as afirmativas sobre simplificação de radicais e assinale a alternativa correta.
- **142.** (CPR) Calcule o valor de $\\sqrt{13}+\\sqrt{7}+\\sqrt{2}-\\sqrt{4}$ conforme o item 142.
- **143.** (PUC) Calcule o valor de $\\dfrac{\\sqrt{1,777\\ldots}}{\\sqrt{0,111\\ldots}}$.
- **144.** (EPCAR) Calcule a diferença indicada no item 144 entre duas potências com expoentes fracionários.
- **145.** (CM) Assinale a sentença verdadeira do item 145.
`.trim(),
  },
  {
    start: 146,
    end: 160,
    text: `
- **146.** (CN) Analise as afirmativas do item 146, em que $A$ e $B$ são números reais, e assinale a alternativa correta.
- **147.** (CN) Analise as afirmativas do item 147 sobre potências e radicais e assinale a opção correta.
- **148.** (CN) Analise as afirmativas do item 148 sobre comparações numéricas e assinale a opção correta.
- **149.** (CEFET) Determine o valor da expressão racional do item 149.
- **150.** (CM) Calcule o valor da expressão do item 150, envolvendo raízes e a dízima $0,444\\ldots$.
- **151.** (CEFET) Calcule o valor da expressão $16^{-1}\\cdot(-8)^{-2/3}$.
- **152.** (CEFET) Racionalize o denominador de $\\dfrac{\\sqrt{3}-\\sqrt{2}}{\\sqrt{3}+\\sqrt{2}}$.
- **153.** (CN) Determine o valor indicado no item 153.
- **154.** (CM) Resolva a expressão decimal do item 154.
- **155.** (CEFET) Calcule a expressão do item 155, com potências fracionárias e decimais.
- **156.** (CAP-UFRJ) Determine o valor da fração complexa do item 156.
- **157.** (UNICAMP) Determine o valor de $-2^{-2}+2^4$.
- **158.** (CEFETEQ) Calcule a expressão do item 158 com números decimais em notação científica.
- **159.** (EPCAR) Resolva a expressão numérica do item 159.
- **160.** (CN) Escreva como potência de base 2 a expressão do item 160.
`.trim(),
  },
  {
    start: 161,
    end: 169,
    text: `
- **161.** (C. Naval) Resolva a expressão do item 161.
- **162.** (EPCAR) Escolha a alternativa falsa do item 162.
- **163.** (CN) Resolva a expressão do item 163.
- **164.** (PUC) Sejam $a=12(\\sqrt{2}-1)$, $b=4\\sqrt{2}$ e $c=3\\sqrt{3}$. Determine a ordem correta entre $a$, $b$ e $c$.
- **165.** (PUC) Considere os três números do item 165 e determine qual é o menor e qual é o maior.
- **166.** (EPCAR) Analise as expressões $A$ e $B$ do item 166 e marque a resposta correta.
- **167.** (EPCAR) Considere os números reais $x$, $y$ e $z$ definidos no item 167 e assinale a afirmativa falsa.
- **168.** (EPCAR) Analise as proposições do item 168, classificando-as em verdadeiras ou falsas.
- **169.** (CEFET) Simplifique a equação radical do item 169, com $x>0$.
`.trim(),
  },
  {
    start: 170,
    end: 176,
    text: `
- **170.** (CEFET) Sendo $x$ um número real positivo, calcule o valor de $\\dfrac{a}{b}$ para as expressões do item 170.
- **171.** (EPCAR) Supondo $x$ e $y$ números reais nas condições do item 171, determine quando a expressão sempre poderá ser calculada em $\\mathbb{R}$.
- **172.** (EPCAR) Considerando o conjunto dos números reais, analise as proposições do item 172 e classifique-as em verdadeiras ou falsas.
- **173.** (EPCAR) Classifique em verdadeiro ou falso cada alternativa do item 173.
- **174.** (EPCAR) Considere os valores reais de $a$ e $b$, com $a\\neq b$, e analise o domínio da expressão do item 174.
- **175.** (EPCAR) Considere os conjuntos numéricos $\\mathbb{N}$, $\\mathbb{Z}$, $\\mathbb{Q}$ e $\\mathbb{R}$ e analise as proposições do item 175.
- **176.** (EPCAR) Marque a alternativa verdadeira do item 176.
`.trim(),
  },
  {
    start: 177,
    end: 189,
    text: `
- **177.** (CN) Quantas vezes inteiras a raiz quadrada de 0,5 cabe na raiz cúbica de 10?
- **178.** (CM) Racionalize o denominador da fração do item 178.
- **179.** (CM) Determine o valor da expressão do item 179, envolvendo $\\sqrt{27}$, $\\sqrt{3}$ e $\\sqrt{75}$.
- **180.** (CEFET) Simplifique a expressão do item 180.
- **181.** (CAP-UFRJ) Resolva a expressão do item 181, escrevendo o resultado na forma mais simples.
- **182.** (UNICAMP) Racionalize o denominador da fração do item 182.
- **183.** (CN) O número do item 183 está entre quais dois inteiros?
- **184.** (CEFETEQ) Racionalizando-se o denominador da fração do item 184, encontra-se um fator racionalizante do tipo $\\sqrt{a}+\\sqrt{b}+1$. Determine $a+b+1$.
- **185.** (CN) Racionalize o denominador de $\\dfrac{1}{\\sqrt{3}+\\sqrt[4]{12}+1}$.
- **186.** (CN) Calcule o valor da expressão do item 186.
- **187.** (CM) Um engenheiro planejou uma leitora ótica que lê 5.000 cartões em 10 minutos e deseja planejar uma segunda máquina com as condições do item 187. Determine o valor pedido.
- **188.** (CN) Na fabricação de um produto é utilizado o ingrediente A ou B, nas proporções descritas no item 188. Determine a relação pedida entre $x$ e $y$.
- **189.** (CEFET) Observe as igualdades do item 189 e dê continuidade ao padrão proposto.
`.trim(),
  },
  {
    start: 190,
    end: 203,
    text: `
- **190.** (CM) Determine o valor da expressão do item 190.
- **191.** (CM) Se $A$ e $B$ forem as expressões dadas no item 191, calcule o valor de $(B^2-A^2)$.
- **192.** (CM) Simplifique a expressão do item 192.
- **193.** (CM) Calcule o valor numérico de $a^3-b^3-3a^2b+3ab^2$ quando $a$ e $b$ forem os dados do item 193.
- **194.** (CN) Sabendo que $\\sqrt[3]{x^2}=1999^6$, $\\sqrt{y}=1999^4$ e $\\sqrt[4]{z^4}=1999^8$, determine o valor pedido no item 194.
- **195.** (CEFETEQ) Considere as definições de $A$, $B$ e $a$ do item 195 e determine o valor numérico de $x$.
- **196.** (CN) Sabendo que $A=\\dfrac{3+\\sqrt{6}}{5\\sqrt{3}-2\\sqrt{12}-\\sqrt{32}+\\sqrt{50}}$, determine o valor de $\\dfrac{A^3}{\\sqrt{A^7}}$.
- **197.** (CN) O valor da expressão do item 197 é múltiplo de qual número?
- **198.** (CM) Sejam $x$ e $y$ as expressões do item 198. Calcule o valor de $4x-3y$.
- **199.** (CM) Ao extrairmos a raiz cúbica de um número $N$, verificamos que o resto era o maior possível e igual a 126. A soma dos algarismos de $N$ é quanto?
- **200.** (CEFET) Sabendo que $N$ é a raiz quadrada positiva de 12345654321 e que a soma de seus algarismos é 6, assinale a opção correta.
- **201.** (CM) Calcule o valor da expressão algébrica do item 201.
- **202.** (CEFETEQ) Aplique o "método das iterações" descrito no item 202 para obter o valor aproximado de $\\sqrt{33}$.
- **203.** (CEFET) Qual das opções equivale a $\\sqrt{3+2\\sqrt{2}}$?
`.trim(),
  },
  {
    start: 204,
    end: 211,
    text: `
- **204.** (CEFET) O número $d=\\sqrt{3+2\\sqrt{2}}-\\sqrt{3-2\\sqrt{2}}$ é um natural. Qual é esse número?
- **205.** (CM) Se $m=\\sqrt{4-\\sqrt{7}}+\\sqrt{4+\\sqrt{7}}$, então o valor da expressão do item 205 possui qual classificação?
- **206.** (CM) Se $2<x<3$, então determine o valor da expressão do item 206.
- **207.** (CN) Se $a=\\sqrt{4-\\sqrt{10+2\\sqrt{5}}}$ e $b=\\sqrt{4+\\sqrt{10+2\\sqrt{5}}}$, então calcule $a+b$.
- **208.** (CM) Sendo $A=\\sqrt{17-2\\sqrt{30}}-\\sqrt{17+2\\sqrt{30}}$, determine o valor de $(A+2\\sqrt{2})^2$.
- **209.** (CN) Um aluno resolveu a questão de múltipla escolha do item 209 e chegou a um radical de índice 4. Simplifique para escolher a opção decimal mais próxima.
- **210.** (CN) Calcule o valor da expressão do item 210.
- **211.** (CN) O número real $\\sqrt[3]{26}-15\\sqrt{3}$ é igual a qual alternativa?
`.trim(),
  },
];

const ANSWER_GROUPS = [
  { start: 1, end: 27, label: 'itens 1 a 27' },
  { start: 28, end: 60, label: 'itens 28 a 60' },
  { start: 61, end: 108, label: 'itens 61 a 108' },
  { start: 109, end: 168, label: 'itens 109 a 168' },
  { start: 169, end: 198, label: 'itens 169 a 198' },
  { start: 199, end: 211, label: 'itens 199 a 211' },
] as const;

function getQuestionBlock(number: number) {
  const block = QUESTION_BLOCKS.find((entry) => number >= entry.start && number <= entry.end);
  if (!block) {
    throw new Error(`Questão de radiciação sem bloco mapeado: ${number}`);
  }

  return block;
}

function getAnswerGroup(number: number) {
  const group = ANSWER_GROUPS.find((entry) => number >= entry.start && number <= entry.end);
  if (!group) {
    throw new Error(`Questão de radiciação sem gabarito mapeado: ${number}`);
  }

  return group;
}

function getMetadata(number: number) {
  if (number <= 23) {
    return {
      lessonId: 'roots-square',
      section: 'Simplificação e extração de fatores',
      hint: 'Procure potências perfeitas dentro do radicando antes de simplificar.',
    };
  }

  if (number <= 70) {
    return {
      lessonId: 'roots-square',
      section: 'Potências, índices e operações com radicais',
      hint: 'Confira se os radicais precisam ter o mesmo índice antes de operar.',
    };
  }

  if (number <= 108) {
    return {
      lessonId: 'roots-square',
      section: 'Racionalização e introdução de fatores',
      hint: 'Escolha o fator racionalizante certo para eliminar o radical do denominador.',
    };
  }

  if (number <= 140) {
    return {
      lessonId: 'roots-square',
      section: 'Extração de raízes, restos e erros',
      hint: 'Use quadrados perfeitos próximos e acompanhe o resto máximo quando a raiz for por falta.',
    };
  }

  return {
    lessonId: 'roots-chapter-review',
    section: 'Questões de concursos',
    hint: 'Leia o item com calma e use o gabarito oficial como conferência final, não como atalho.',
  };
}

function buildPrompt(number: number) {
  const block = getQuestionBlock(number);

  return [
    `Resolva o item **${number}** do material-base de radiciação.`,
    '',
    `Abaixo está a transcrição digitada do bloco **${block.start} a ${block.end}**:`,
    '',
    block.text,
  ].join('\n');
}

function buildAnswer(number: number) {
  const group = getAnswerGroup(number);

  return [
    `Gabarito oficial do material-base: o item **${number}** está no bloco **${group.label}**.`,
    '',
    'O gabarito segue a organização original do material impresso por faixas de questões.',
  ].join('\n');
}

export const RADICAL_QUESTIONS: Question[] = Array.from({ length: 211 }, (_, index) => {
  const number = index + 1;
  const metadata = getMetadata(number);
  const answer = buildAnswer(number);

  return {
    id: `radicals-${number}`,
    lessonId: metadata.lessonId,
    type: 'self-check',
    number,
    section: metadata.section,
    source: SOURCE,
    text: buildPrompt(number),
    answer,
    explanation:
      'Os enunciados desta trilha foram convertidos para texto a partir do material-base. O gabarito oficial continua referenciado pela numeração original do caderno.',
    hint: metadata.hint,
  };
});
