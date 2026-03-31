import { Question } from '../../types';

type PromptBlock = {
  start: number;
  end: number;
  text: string;
};

const SOURCE = 'TQM - Frações.pdf';

const QUESTION_BLOCKS: PromptBlock[] = [
  {
    start: 1,
    end: 10,
    text: `
- **1.** Dentre as frações $\\frac{3}{4}$, $\\frac{5}{6}$, $\\frac{9}{7}$, $\\frac{11}{10}$, $\\frac{100}{3}$, $\\frac{6}{3}$, $\\frac{3}{1000}$ e $\\frac{36}{4}$, determine:
  a) a(s) própria(s);
  b) a(s) imprópria(s);
  c) a(s) aparente(s);
  d) a(s) decimal(is);
  e) a(s) ordinária(s).
- **2.** Coloque as frações $\\frac{3}{4}$, $\\frac{2}{3}$, $\\frac{5}{6}$ e $\\frac{1}{2}$ em ordem crescente.
- **3.** Na festa de aniversário de Tubério, seus amigos Anfilóquio, Tobias e Élbio comeram, respectivamente, $\\frac{2}{7}$, $\\frac{1}{3}$ e $\\frac{1}{5}$ do bolo. Se o restante do bolo foi comido pelo aniversariante, diga quais foram o mais e o menos "gulosos" deles.
- **4.** Três corredores partem juntos, do mesmo ponto, para uma corrida. Após 20 minutos, constatou-se que o primeiro havia percorrido $\\frac{2}{3}$, o segundo $\\frac{9}{16}$ e o terceiro $\\frac{5}{6}$ do trajeto total. Pergunta-se: nesse momento, qual dos três está mais próximo da linha de chegada?
- **5.** Calcule $\\frac{2}{3}$ de 600 azeitonas.
- **6.** Determine $\\frac{3}{4}$ dos $\\frac{6}{5}$ dos $\\frac{7}{12}$ de 120 caracóis.
- **7.** Determine o valor da expressão

$$
\\frac{\\left(3\\frac{1}{4}\\right)\\cdot\\left(3-\\frac{1}{2}\\right)}{\\frac{2}{5}\\cdot\\left(2-\\frac{3}{4}\\right)}.
$$

- **8.** Calcule o resultado de $4\\frac{3}{4} - 6 \\div 2 \\cdot 3$.
- **9.** Que número devemos somar ao resultado de

$$
\\frac{1}{1+\\frac{1}{1+\\frac{1}{2}}}
$$

para obtermos uma unidade?
- **10.** Obter uma fração equivalente à fração $\\frac{15}{20}$ cuja soma dos termos seja igual a 84.
`.trim(),
  },
  {
    start: 11,
    end: 30,
    text: `
- **11.** Obter uma fração equivalente à fração $\\frac{28}{35}$ cujo MMC dos termos seja igual a 100.
- **12.** Determine frações equivalentes às frações $\\frac{4}{3}$, $\\frac{7}{10}$ e $\\frac{6}{5}$ de modo que o numerador da primeira, o denominador da segunda e o numerador da terceira sejam iguais.
- **13.** Determine o valor de $x$ de modo que a fração $\\frac{17+x}{41+x}$ seja equivalente ao quadrado de uma fração irredutível cujos termos são dois números ímpares consecutivos.
- **14.** Em um campeonato de futebol, o jogador Bromário fez 21 gols, o equivalente a $\\frac{3}{5}$ do número de gols marcado pelo jogador Bedmundo. Quantos gols marcou o segundo jogador?
- **15.** Carlos só pode pagar $\\frac{2}{5}$ de uma dívida. Se possuísse mais R$ 10.200,00, poderia pagar 70% desta mesma dívida. Quanto Carlos devia?
- **16.** As despesas mensais de um funcionário são: $\\frac{3}{5}$ do ordenado com aluguel da casa; $\\frac{1}{3}$ do resto com outras obrigações. Além desses gastos, ainda tem que pagar R$ 540,00 por mês de compras feitas pela esposa. Como seu ordenado não cobria todas essas despesas, o funcionário teve que fazer um empréstimo mensal de R$ 200,00 até liquidar a dívida total da esposa. Qual o ordenado do funcionário?
- **17.** Que dia é hoje, se à metade dos dias transcorridos desde o início do ano adicionarmos a terça parte dos dias que ainda faltam para o seu término e encontrarmos o número de dias que já passou?
- **18.** Azarildo foi assaltado por um ladrão "camarada", o qual, ao anunciar o assalto, pediu-lhe apenas $\\frac{3}{7}$ da quantia que carregava no bolso. Se a desafortunada vítima, após tal acontecimento, ainda ficou com R$ 480,00, qual a quantia roubada?
- **19.** Um pedreiro levanta um muro em 12 dias e um outro executa o mesmo serviço em 4 dias. Em quantos dias, os dois juntos, levantarão um muro idêntico?
- **20.** Uma torneira enche um reservatório em 4 horas enquanto outra enche o mesmo reservatório em 6 horas. Estando o reservatório vazio e abrindo-se as duas simultaneamente, em quanto tempo elas encherão juntas esse reservatório?
- **21.** Uma torneira pode encher um reservatório em 6 horas e o ralo pode esvaziá-lo em 9 horas. Estando o reservatório vazio, abre-se simultaneamente a torneira e o ralo. Se esse reservatório é um paralelepípedo de altura 12 m, após 3 horas, a que altura se encontra o nível d'água em seu interior?
- **22.** Uma torneira enche um tanque em 6 horas, outra torneira enche o mesmo tanque em 4 horas e um ralo pode esvaziá-lo totalmente em 3 horas. Estando o tanque vazio e abrindo-se, ao mesmo tempo, as duas torneiras e o ralo, em quanto tempo o tanque encherá?
- **23.** Uma torneira enche um reservatório em 24 horas, outra em 36 horas e uma terceira o faz em $x$ horas. Estando o reservatório vazio e abertas as três torneiras simultaneamente, ele enche totalmente após 8 horas. Determine o valor de $x$.
- **24.** Após a morte de Aguiar, aberto o seu testamento, esta era a sua vontade: "Deixo $\\frac{2}{5}$ de meu patrimônio, mais R$ 3.000.000,00 para meu filho Edgar; deixo $\\frac{2}{3}$ do resto, mais R$ 6.000.000,00 para minha sogra Cascavélia; e os R$ 5.000.000,00 restantes deixo para o meu gato Mimi". Qual era o patrimônio de Aguiar?
- **25.** Um sargento aplicou $\\frac{1}{3}$ de suas economias na caderneta de poupança, $\\frac{2}{5}$ em ações e os R$ 1.200,00 restantes deixou em sua conta corrente. Quanto ele aplicou em ações?
- **26.** Para prestar uma prova de português tive que ler um certo livro em três dias: no primeiro dia li a metade do livro; no segundo dia li mais 32 páginas; e no terceiro li o que faltava, ou seja, a quarta parte do livro. Quantas páginas tinha esse livro?
- **27.** Dona Benta comprou certo número de ovos na feira. Na volta para casa escorregou e um terço dos ovos se quebrou. Ao chegar a casa usou $\\frac{1}{5}$ dos ovos restantes para fazer um bolo e observou que sobraram ainda 20 ovos. Quantos ovos ela havia comprado?
- **28.** Dona Maricota, eficiente secretária de dois advogados, comprou certa quantidade de clips. Com os processos do Dr. Tancredo ela gastou $\\frac{1}{5}$ dos clips e com os do Dr. Pascácio $\\frac{17}{35}$ do restante. Se ainda sobrou uma grosa de clips, quantos clips ela comprou?
- **29.** Adquiri uma bateria para meu celular da marca "Troquia", cuja economia era de 15 horas com o telefone ligado em "stand by" ou de duas horas e meia de conversação. Às 13 horas liguei o aparelho com a bateria totalmente carregada e às 19 horas ela descarregou completamente. Durante quanto tempo eu falei nesse celular durante o período citado?
- **30.** Um tonel está cheio de vinho. Tiram-se $\\frac{2}{5}$ de sua capacidade, que são substituídos por água. Em seguida retiram-se os $\\frac{3}{5}$ da mistura, substituindo-os por água. Sabe-se que a quantidade de vinho restante no tonel é inferior à metade de sua capacidade em 140 litros. Qual a capacidade desse tonel?
`.trim(),
  },
  {
    start: 31,
    end: 38,
    text: `
- **31.** (CM) Se $a = \\frac{11}{13}$, $b = \\frac{5}{7}$ e $c = \\frac{2}{3}$, então é correto afirmar qual relação de ordem entre esses valores?
- **32.** (CAP-UFRJ) Em uma calculadora a tecla de divisão está quebrada. Se você precisasse dividir um número por 40 usando esta calculadora, deveria então multiplicá-lo por quanto?
- **33.** (CM) Entre os números inteiros 1 e 100, quantas frações irredutíveis existem cujo denominador é 15?
- **34.** (ENEM) O Pantanal é a maior área úmida continental do planeta, com aproximadamente 210 mil km², sendo 140 mil km² em território brasileiro. Durante o período chuvoso, as cheias chegam a cobrir até $\\frac{2}{3}$ da área pantaneira. A área alagada pode chegar a qual valor aproximado?
- **35.** (ENEM) O gráfico do material mostra a distribuição da produção de gás carbônico em 1996. Se a produção dos países desenvolvidos era de 3,2 bilhões de toneladas, estime a produção dos países em desenvolvimento.
- **36.** (ENEM) Segundo a OIT, na década de 1990 o trabalho feminino correspondeu a $\\frac{2}{3}$ do total de horas trabalhadas no planeta, enquanto o trabalho masculino ficou com $\\frac{1}{3}$. Em termos de horas trabalhadas, como comparar o trabalho das mulheres com o dos homens?
- **37.** (CM) No concurso de admissão ao CMJF, o edital apresentava 40 vagas para a 5ª série do Ensino Fundamental e 10 vagas para a 1ª série do Ensino Médio. A tabela do material informa os totais de inscritos nos concursos 2003/2004 e 2004/2005. Com base nesses dados, assinale a alternativa correta.
- **38.** (ENEM) Em dois jogadores que atuam na mesma posição, o jogador I converteu 45 gols em 60 chutes, enquanto o jogador II converteu 50 gols em 75 chutes. Quem deve ser escolhido para o próximo jogo?
`.trim(),
  },
  {
    start: 39,
    end: 48,
    text: `
- **39.** (ENEM) Um trecho musical de oito compassos, cuja fórmula é $\\frac{3}{4}$, poderia ser preenchido com qual combinação de figuras musicais?
- **40.** (CM) Num jogo de vôlei entre dois times A e B, o time A fez $x$ bloqueios e marcou pontos em 60% deles, mais 3. O time B também fez $x$ bloqueios e marcou pontos em $\\frac{2}{5}$ deles, menos 2. Qual polinômio representa a diferença entre os bloqueios que geraram pontos para o time A e os que geraram pontos para o time B?
- **41.** (CN) Um fabricante observou que pode aumentar, mensalmente, sua produção em $\\frac{1}{5}$ da produção do mês anterior. Se, em janeiro de 2004, a produção for $P$, em que mês desse mesmo ano ela será, pela primeira vez, maior ou igual a $2P$?
- **42.** (CM) Em um determinado dia, foi contabilizado o número de adultos e crianças presentes em um parque de diversões. Sabendo-se que o número de adultos equivalia a $\\frac{2}{3}$ do número de crianças e que havia 450 pessoas no local, qual era a quantidade de crianças presentes?
- **43.** (CEFET) Kaio, Pedro e Lucas dividiram igualmente uma quantidade $Q$ de bolas de gude. Antes mesmo de começarem a jogar, chegou o amigo Vítor. Resolveram então dividir a quantidade $Q$ igualmente entre os quatro. Sabendo que para isso bastou que cada um dos três desse 25 bolas a Vítor, determine $Q$.
- **44.** (UFRJ) Uma fita de vídeo foi programada para gravar 6 horas. Quanto tempo já se passou, se o que resta para terminar a fita é $\\frac{3}{5}$ do que já passou?
- **45.** (EPCAR) Uma senhora vai à feira e gasta, em frutas, $\\frac{2}{7}$ do que tem na bolsa. Gasta depois $\\frac{3}{5}$ do resto em verduras e ainda lhe sobram R$ 8,00. Quanto ela levava, em reais, ao sair de casa?
- **46.** (EPCAR) Isabela e Ana Beatriz saíram para vender pastéis na praia. Juntas tinham 460 pastéis. No final do dia, Isabela vendeu $\\frac{3}{5}$ dos pastéis que levara e Ana Beatriz vendeu $\\frac{5}{8}$ dos pastéis que levara. O número de pastéis que restou para Ana Beatriz era a metade do que restou para Isabela. Se Ana Beatriz levou $x$ pastéis para vender, qual é a soma dos algarismos de $x$?
- **47.** (EPCAR) No 1º ano do ensino médio de uma escola, $\\frac{1}{3}$ dos alunos têm menos de 14 anos, $\\frac{1}{4}$ têm de 14 a 17 anos e os 80 alunos restantes têm mais de 18 anos. Com base nisso, assinale a afirmativa correta.
- **48.** (EPCAR) Mateus ganhou 100 g de bala de goma e Lucas ganhou 60 g de bala delícia. Cada um come a mesma quantidade de bala por segundo. Mateus terminou em 40 minutos e Lucas em 1 hora. Considerando que eles começaram a comer no mesmo instante, assinale a alternativa falsa.
`.trim(),
  },
  {
    start: 49,
    end: 59,
    text: `
- **49.** (EPCAR) Um caminhão-tanque com capacidade para transportar $V$ litros faz a distribuição de óleo em três fábricas: $a$, $b$ e $c$. Partindo com o tanque cheio, deixou $\\frac{3}{20}$ do total em $a$. Se em $b$ deixou $\\frac{5}{17}$ do que restou e em $c$ os últimos 12.600 litros, então assinale a alternativa correta.
- **50.** (EPCAR) Três blocos de gelo são tais que o volume do primeiro excede de $\\frac{1}{8}$ o do segundo, que por sua vez é $\\frac{16}{27}$ do volume do terceiro. O volume desse terceiro bloco excede o do primeiro em 1.005 litros. Sabendo-se que o volume da água aumenta de $\\frac{1}{9}$ ao congelar-se, determine a quantidade de água necessária para obter os três blocos.
- **51.** (CJ) De uma cesta de mangas, o pai retira $\\frac{1}{3}$ dessas mangas, a mãe $\\frac{1}{5}$ do restante, os três filhos mais velhos $\\frac{1}{4}$, $\\frac{1}{3}$ e $\\frac{1}{2}$ dos restos sucessivos, e o mais jovem tira as mangas que sobraram. Qual o número de mangas existentes na cesta?
- **52.** (CEFET) Uma gráfica tem uma encomenda de 2.400 cartões de Natal. No 1º dia foi fabricado $\\frac{1}{4}$ do total da encomenda, tendo sido rejeitado pelo controle de qualidade $\\frac{1}{3}$ dessa produção. No 2º dia foram fabricados mais $\\frac{2}{5}$ do total da encomenda e rejeitados $\\frac{5}{12}$ desse lote. Quantos cartões ainda faltavam para completar os 2.400 após o 2º dia?
- **53.** (EPCAR) No concurso CPCAR, $\\frac{1}{10}$ dos aprovados foi selecionado para entrevista com psicólogos, a ser feita em 2 dias. Sabendo-se que 20 candidatos desistiram e que, se cada psicólogo atendesse 9 candidatos por dia, ainda restariam 34 jovens sem atendimento, enquanto com 10 candidatos por dia a meta seria cumprida, assinale a alternativa correta sobre o número de aprovados no concurso.
- **54.** (CM) João Carlos selecionou para gravar alguns videoclipes e, em casa, possui três velocidades de gravação: SP, LP e EP. O primeiro videoclipe foi programado para 1 hora e o segundo para 1 hora e 30 minutos, usando a velocidade SP. Hoje ele quer gravar um terceiro videoclipe na mesma fita e usar a velocidade EP. Quanto tempo de gravação ainda resta?
- **55.** (UNICAMP) Uma torneira enche um tanque em 12 minutos, enquanto uma segunda torneira gasta 18 minutos para encher o mesmo tanque. Com o tanque inicialmente vazio, abre-se a primeira durante $x$ minutos; ao fim desse tempo fecha-se essa torneira e abre-se a segunda, que termina de encher o tanque em $x+3$ minutos. Calcule o tempo gasto para encher o tanque.
- **56.** (CM) Uma torneira tem capacidade de encher um tanque em 5 horas e outra em 3 horas. No tanque existe um ralo que o esvazia em 2 horas. Estando o tanque vazio, abrem-se as duas torneiras; após meia hora abre-se também o ralo. Quanto tempo o tanque levará para ficar cheio?
- **57.** (EsPCEx) Um tanque de combustível dispõe de duas torneiras que o enchem em 5 e 6 horas, respectivamente, e uma torneira de saída que o esvazia em 3 horas. Estando o tanque totalmente vazio, se as três torneiras são abertas simultaneamente, quantas horas são necessárias para encher o tanque?
- **58.** (CN) Um tanque tem duas torneiras para enchê-lo: a primeira com vazão de 6 litros por minuto e a segunda com vazão de 4 litros por minuto. Se metade do tanque é enchida pela primeira em um tempo $t_1$ e o restante pela segunda em um tempo $t_2$, qual deveria ser a vazão de uma única torneira para encher completamente o tanque no tempo $t_1+t_2$?
- **59.** (EPCAR) Um reservatório possui 4 torneiras. A primeira gasta 15 horas para enchê-lo, a segunda 20 horas, a terceira 30 horas e a quarta 60 horas. As 4 são abertas simultaneamente por 5 horas; depois disso, fecham-se a primeira e a segunda. Considerando fluxo constante, assinale a alternativa correta sobre o tempo gasto, em minutos, para que as demais completem o reservatório.
`.trim(),
  },
];

const ANSWERS: Record<number, string> = {
  1: [
    'a) próprias: `3/4` e `5/6`',
    'b) impróprias: `9/7`, `11/10`, `100/3` e `36/4`',
    'c) aparentes: `6/3` e `36/4`',
    'd) decimais: `11/10` e `3/1000`',
    'e) ordinárias: `3/4`, `5/6`, `9/7`, `100/3`, `6/3` e `36/4`',
  ].join('\n'),
  2: '`1/2 < 2/3 < 3/4 < 5/6`',
  3: 'Tobias e Tubério.',
  4: 'Alternativa B.',
  5: '400 azeitonas.',
  6: '63 caracóis.',
  7: '`65/4`',
  8: '`-17/4`',
  9: '`2/5`',
  10: '`36/48`',
  11: '`20/25`',
  12: '`60/45`, `42/60` e `60/50`',
  13: '`8`',
  14: '`35`',
  15: 'R$ 34.000,00.',
  16: 'R$ 1.275,00.',
  17: '26 de maio.',
  18: 'R$ 360,00.',
  19: '3 dias.',
  20: '2 h 24 min.',
  21: '2 m.',
  22: '12 h.',
  23: '18 h.',
  24: 'R$ 60.000.000,00.',
  25: 'R$ 1.800,00.',
  26: '`128`',
  27: '`48`',
  28: '`360`',
  29: '1 h 48 min.',
  30: '1.000 litros.',
  31: 'Alternativa E.',
  32: '`0,025`',
  33: 'Alternativa B.',
  34: 'Alternativa C.',
  35: 'Alternativa B.',
  36: 'Alternativa D.',
  37: 'Alternativa A.',
  38: 'Alternativa A.',
  39: 'Alternativa D.',
  40: 'Alternativa D.',
  41: 'Alternativa B.',
  42: 'Alternativa C.',
  43: '`300`',
  44: '4 h 30 min.',
  45: 'Alternativa D.',
  46: 'Alternativa B.',
  47: 'Alternativa C.',
  48: 'Alternativa C.',
  49: 'Alternativa B.',
  50: 'Alternativa A.',
  51: 'Alternativa D.',
  52: '`1440`',
  53: 'Alternativa A.',
  54: 'Alternativa D.',
  55: '15 min.',
  56: 'Alternativa D.',
  57: '`30`',
  58: 'Alternativa B.',
  59: 'Alternativa B.',
};

function getQuestionBlock(number: number) {
  const block = QUESTION_BLOCKS.find((entry) => number >= entry.start && number <= entry.end);
  if (!block) {
    throw new Error(`Questão de frações sem bloco mapeado: ${number}`);
  }

  return block;
}

function getMetadata(number: number) {
  if (number <= 6) {
    return {
      lessonId: 'fractions-intro',
      section: 'Conceito, tipos e leitura',
      hint: 'Classifique a fração olhando primeiro para a relação entre numerador e denominador.',
    };
  }

  if (number <= 13) {
    return {
      lessonId: 'fractions-equivalence',
      section: 'Equivalência e comparação',
      hint: 'Simplifique, reduza ao mesmo denominador ou compare usando um todo comum.',
    };
  }

  if (number <= 30) {
    return {
      lessonId: 'fractions-operations',
      section: 'Operações e problemas',
      hint: 'Antes de operar, veja se precisa igualar denominadores ou inverter a segunda fração.',
    };
  }

  return {
    lessonId: 'fractions-review',
    section: 'Aplicações e questões de prova',
    hint: 'Transforme o texto em fração, organize as etapas e só depois faça as contas.',
  };
}

function buildPrompt(number: number) {
  const block = getQuestionBlock(number);

  return [
    `Resolva o item **${number}** do material-base de frações.`,
    '',
    `Abaixo está a transcrição digitada do bloco **${block.start} a ${block.end}**:`,
    '',
    block.text,
  ].join('\n');
}

export const FRACTION_QUESTIONS: Question[] = Array.from({ length: 59 }, (_, index) => {
  const number = index + 1;
  const metadata = getMetadata(number);

  return {
    id: `fractions-${number}`,
    lessonId: metadata.lessonId,
    type: 'self-check',
    number,
    section: metadata.section,
    source: SOURCE,
    text: buildPrompt(number),
    answer: ANSWERS[number],
    explanation: `Gabarito oficial do material: ${ANSWERS[number]}`,
    hint: metadata.hint,
  };
});
