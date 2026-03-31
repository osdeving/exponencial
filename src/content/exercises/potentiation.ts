import { Question } from '../../types';

type ExerciseSeed = [number, string, string, string?];

const SOURCE = 'Potenciação - Exercícios.pdf';

const getMetadata = (number: number) => {
  if (number <= 48) {
    return {
      lessonId: 'powers-exponents',
      section: 'Desenvolvimento de Potências',
      hint: 'Identifique a base, o expoente e verifique se o sinal está dentro dos parênteses.',
    };
  }

  if (number <= 86) {
    return {
      lessonId: 'powers-exponents',
      section: 'Propriedades Operatórias',
      hint: 'Use primeiro as propriedades de produto, quociente ou potência de potência.',
    };
  }

  if (number <= 108) {
    return {
      lessonId: 'scientific-notation',
      section: 'Potências de 10, Notação Científica e Ordem de Grandeza',
      hint: 'Reescreva o número com um único algarismo não nulo antes da vírgula e ajuste a potência de 10.',
    };
  }

  if (number <= 121) {
    return {
      lessonId: 'powers-chapter-review',
      section: 'Aplicação das Potências',
      hint: 'Resolva as potências primeiro e só depois avance para as demais operações.',
    };
  }

  return {
    lessonId: 'powers-chapter-review',
    section: 'Questões de Concursos',
    hint: 'Leia a alternativa ou o contexto com calma e reduza a expressão por etapas.',
  };
};

const buildQuestion = ([number, text, answer, explanation]: ExerciseSeed): Question => {
  const metadata = getMetadata(number);

  return {
    id: `potentiation-${number}`,
    lessonId: metadata.lessonId,
    type: 'self-check',
    number,
    section: metadata.section,
    source: SOURCE,
    text,
    answer,
    explanation: explanation ?? `Gabarito oficial do material: ${answer}`,
    hint: metadata.hint,
  };
};

const seeds: ExerciseSeed[] = [
  [1, `Desenvolva: $5^3$.`, `$125$`],
  [2, `Desenvolva: $\\left(\\frac{3}{2}\\right)^5$.`, `$\\frac{243}{32}$`],
  [3, `Desenvolva: $10^5$.`, `$100000$`],
  [4, `Desenvolva: $(0,2)^5$.`, `$0,00032$`],
  [5, `Desenvolva: $\\left(-\\frac{1}{2}\\right)^6$.`, `$\\frac{1}{64}$`],
  [6, `Desenvolva: $(+10)^3$.`, `$1000$`],
  [7, `Desenvolva: $(-0,1)^4$.`, `$0,0001$`],
  [8, `Desenvolva: $(-1)^{50}$.`, `$1$`],
  [9, `Desenvolva: $2^4$.`, `$16$`],
  [10, `Desenvolva: $2^5$.`, `$32$`],
  [11, `Desenvolva: $\\left(\\frac{2}{5}\\right)^3$.`, `$\\frac{8}{125}$`],
  [12, `Desenvolva: $(0,1)^2$.`, `$0,01$`],
  [13, `Desenvolva: $(-2)^4$.`, `$16$`],
  [14, `Desenvolva: $(-0,2)^2$.`, `$0,04$`],
  [15, `Desenvolva: $(-2)^3$.`, `$-8$`],
  [16, `Desenvolva: $\\left(-\\frac{2}{5}\\right)^3$.`, `$-\\frac{8}{125}$`],
  [17, `Desenvolva: $\\left(-\\frac{1}{x}\\right)^5$.`, `$-\\frac{1}{x^5}$`],
  [18, `Desenvolva: $3^3$.`, `$27$`],
  [19, `Desenvolva: $\\left(-\\frac{1}{3}\\right)^4$.`, `$\\frac{1}{81}$`],
  [20, `Desenvolva: $1^0$.`, `$1$`],
  [21, `Desenvolva: $(0,01)^2$.`, `$0,0001$`],
  [22, `Desenvolva: $(+3)^4$.`, `$81$`],
  [23, `Desenvolva: $0^3$.`, `$0$`],
  [24, `Desenvolva: $(+3)^5$.`, `$243$`],
  [25, `Desenvolva: $(-0,1)^3$.`, `$-0,001$`],
  [26, `Simplifique: $2 \\cdot 2^3 \\cdot 2^5$.`, `$512$`],
  [27, `Simplifique: $(-1)^2 \\cdot (-1)^5 \\cdot (-1)^4$.`, `$-1$`],
  [28, `Simplifique: $\\left(-\\frac{2}{5}\\right)^{-6}$.`, `$\\frac{15625}{64}$`],
  [29, `Simplifique: $3^{-2}$.`, `$\\frac{1}{9}$`],
  [30, `Simplifique: $-3^{-2}$.`, `$-\\frac{1}{9}$`],
  [31, `Simplifique: $\\left(\\frac{4}{5}\\right)^{-3}$.`, `$\\frac{125}{64}$`],
  [32, `Simplifique: $x^3 \\cdot x^2$.`, `$x^5$`],
  [33, `Simplifique: $x^6 \\cdot x^5 \\cdot x^{-3}$.`, `$x^8$`],
  [34, `Simplifique: $\\left(-\\frac{2}{5}\\right)^5 \\cdot \\left(-\\frac{2}{5}\\right)^3$.`, `$\\frac{256}{390625}$`],
  [35, `Simplifique: $a^{-1} \\div a^{-3}$.`, `$a^2$`],
  [36, `Simplifique: $\\left(-\\frac{1}{3}\\right)^{-2} \\cdot \\left(-\\frac{1}{3}\\right)^{-5}$.`, `$-2187$`],
  [37, `Simplifique: $3^2 \\cdot 3^5 \\cdot 3^{-3}$.`, `$81$`],
  [38, `Simplifique: $x^a \\cdot x^b \\cdot x^c$.`, `$x^{a+b+c}$`],
  [39, `Simplifique: $\\left(\\frac{1}{2}\\right)^3 \\cdot \\left(\\frac{1}{2}\\right)^2 \\cdot \\left(\\frac{1}{2}\\right)$.`, `$\\frac{1}{64}$`],
  [40, `Simplifique: $(-0,1)^2 \\cdot (-0,1)^{-3} \\cdot (-0,1)^3$.`, `$0,01$`],
  [41, `Simplifique: $\\left(-\\frac{1}{5}\\right)^0$.`, `$1$`],
  [42, `Simplifique: $(-0,2)^3 \\cdot (-0,2)^2 \\cdot (-0,2)^{-5}$.`, `$1$`],
  [43, `Simplifique: $x^a \\div x^{-b} \\div x^{-c}$.`, `$x^{a+b+c}$`],
  [44, `Simplifique: $x^{-3} \\div x^{-4} \\div x^{-2}$.`, `$x^3$`],
  [45, `Simplifique: $\\left(\\frac{2}{5}\\right)^2 \\div \\left(\\frac{2}{5}\\right)^{-1}$.`, `$\\frac{8}{125}$`],
  [46, `Simplifique: $(-0,2)^{-2} \\div (-0,2)$.`, `$-125$`],
  [47, `Simplifique: $(-1)^5 \\div (-1)^{-3}$.`, `$1$`],
  [48, `Simplifique: $\\dfrac{\\left(\\frac{1}{x}\\right)^{-3} \\cdot x^5}{x^{-2} \\cdot \\left(-\\frac{1}{x}\\right)^{-2}}$.`, `$x^8$`],
  [49, `Simplifique a expressão escaneada do material: $\\dfrac{0,25^{-3} \\cdot 0,2^{-2}}{(0,444\\ldots)^{-2}}$.`, `$2400$`, `O gabarito oficial do PDF registra $2400$. Mantive a resposta oficial mesmo com a transcrição vindo de um escaneamento.`],
  [50, `Simplifique: $\\left[(-2)^3\\right]^2$.`, `$64$`],
  [51, `Simplifique: $-3^{2^3}$.`, `$-6561$`],
  [52, `Simplifique: $(-0,7)^0$.`, `$1$`],
  [53, `Simplifique a potência composta do item do material: $2^{5^{0^6}}$.`, `$2$`, `O gabarito oficial do material registra o valor final $2$.`],
  [54, `Simplifique: $(x^2 \\cdot y^3 \\cdot z)^m$.`, `$x^{2m} \\cdot y^{3m} \\cdot z^m$`],
  [55, `Simplifique: $50^3 \\cdot 2^3$.`, `$1000000$`],
  [56, `Simplifique: $2^{15} \\cdot (0,125)^{15} \\cdot 4^{15}$.`, `$1$`],
  [57, `Simplifique: $\\left(\\frac{4}{3}\\right)^2$.`, `$\\frac{16}{9}$`],
  [58, `Simplifique: $\\left(\\dfrac{x^2 \\cdot y^3}{z^4}\\right)^7$.`, `$\\dfrac{x^{14} \\cdot y^{21}}{z^{28}}$`],
  [59, `Simplifique: $\\left(\\frac{3}{5}\\right)^2 \\div \\left(-\\frac{3}{4}\\right)^2$.`, `$\\frac{16}{25}$`],
  [60, `Simplifique: $3^{-1}$.`, `$\\frac{1}{3}$`],
  [61, `Simplifique: $\\left(-\\frac{3}{5}\\right)^{-2}$.`, `$\\frac{25}{9}$`],
  [62, `Simplifique: $-5^{-2}$.`, `$-\\frac{1}{25}$`],
  [63, `Simplifique: $\\dfrac{2^{-3} \\cdot 5^{-1}}{3^{-2}}$.`, `$\\frac{9}{40}$`],
  [64, `Simplifique: $(3^2)^3$.`, `$729$`],
  [65, `Simplifique: $\\{[(-1)^2]^3\\}^5$.`, `$1$`],
  [66, `Simplifique: $2^{4^3}$.`, `$2^{64}$`],
  [67, `Simplifique: $(\\sqrt{2} + \\sqrt{3})^0$.`, `$1$`],
  [68, `Simplifique: $(a \\cdot b \\cdot c)^3$.`, `$a^3 \\cdot b^3 \\cdot c^3$`],
  [69, `Simplifique: $(x^2 \\cdot y)^3$.`, `$x^6 \\cdot y^3$`],
  [70, `Simplifique: $(a^2 \\cdot a^2 \\cdot a^2)^5$.`, `$a^{30}$`],
  [71, `Simplifique: $\\left(\\dfrac{2^4}{3^2}\\right)^5$.`, `$\\dfrac{2^{20}}{3^{10}}$`],
  [72, `Simplifique: $100^3 \\div 25^3$.`, `$64$`],
  [73, `Simplifique: $(0,32)^5 \\div (-0,16)^5$.`, `$-32$`],
  [74, `Simplifique: $\\left(\\frac{1}{5}\\right)^{-1}$.`, `$5$`],
  [75, `Simplifique: $(-0,7)^{-2}$.`, `$\\frac{100}{49}$`],
  [76, `Simplifique: $(-3)^{-4}$.`, `$\\frac{1}{81}$`],
  [77, `Simplifique: $\\left[(x^{-3})^{-2}\\right]^3$.`, `$x^{18}$`],
  [78, `Simplifique: $\\left[\\left(\\frac{1}{x}\\right)^{-1}\\right]^{-3}$.`, `$\\frac{1}{x^3}$`],
  [79, `Simplifique: $-2^{2^3}$.`, `$-256$`],
  [80, `Simplifique: $(x^{-2} \\cdot x^3 \\cdot x^{-5})^2$.`, `$x^{-8}$`],
  [81, `Simplifique: $(x^{\\frac{1}{2}} \\cdot x^{\\frac{1}{3}} \\cdot x^{\\frac{1}{6}})^6$.`, `$x^6$`],
  [82, `Simplifique: $2^3 \\cdot 4^3 \\cdot 5^3 \\div (0,5)^2 \\cdot (0,2)^2$.`, `$64.000,01$`, `O gabarito escaneado registra exatamente $64.000,01$; mantive a escrita oficial do material.`],
  [83, `Simplifique: $64^5 \\div 32^5$.`, `$32$`],
  [84, `Simplifique: $(-24)^5 \\div (-8)^5$.`, `$243$`],
  [85, `Simplifique: $1000^{-2} \\div 125^{-2}$.`, `$\\frac{1}{64}$`],
  [86, `Simplifique: $\\left(-x^{\\frac{1}{2}} + y^{\\frac{1}{2}}\\right)\\left(x^{\\frac{1}{2}} + y^{\\frac{1}{2}}\\right)$.`, `$y - x$`],
  [87, `Escreva $10.000$ usando potência de 10.`, `$10^4$`],
  [88, `Escreva $0,0001$ usando potência de 10.`, `$10^{-4}$`],
  [89, `Escreva $5.000$ usando potência de 10.`, `$5 \\times 10^3$`],
  [90, `Escreva $160.000$ usando potência de 10.`, `$16 \\times 10^4$`],
  [91, `Escreva $0,000012$ usando potência de 10.`, `$12 \\times 10^{-6}$`],
  [92, `Escreva $1.000.000$ usando potência de 10.`, `$10^6$`],
  [93, `Escreva $0,000001$ usando potência de 10.`, `$10^{-6}$`],
  [94, `Escreva $300.000$ usando potência de 10.`, `$3 \\times 10^5$`],
  [95, `Escreva $0,0002$ usando potência de 10.`, `$2 \\times 10^{-4}$`],
  [96, `Escreva $0,00000235$ usando potência de 10.`, `$2,35 \\times 10^{-6}$`],
  [97, `Escreva $734.000$ em notação científica e dê a ordem de grandeza.`, `$7,34 \\times 10^5$ e O.G. $= 10^6$`],
  [98, `Escreva $210.000.000$ em notação científica e dê a ordem de grandeza.`, `$2,1 \\times 10^8$ e O.G. $= 10^8$`],
  [99, `Escreva $819$ em notação científica e dê a ordem de grandeza.`, `$8,19 \\times 10^2$ e O.G. $= 10^3$`],
  [100, `Escreva $0,426$ em notação científica e dê a ordem de grandeza.`, `$4,26 \\times 10^{-1}$ e O.G. $= 10^0$`],
  [101, `Escreva $0,000341$ em notação científica e dê a ordem de grandeza.`, `$3,41 \\times 10^{-4}$ e O.G. $= 10^{-4}$`],
  [102, `Escreva $0,00000002$ em notação científica e dê a ordem de grandeza.`, `$2 \\times 10^{-8}$ e O.G. $= 10^{-8}$`],
  [103, `Escreva $38,475$ em notação científica e dê a ordem de grandeza.`, `$3,8475 \\times 10^1$ e O.G. $= 10^2$`],
  [104, `Escreva $4,93714$ em notação científica e dê a ordem de grandeza.`, `$4,93714 \\times 10^0$ e O.G. $= 10^1$`],
  [105, `Escreva $22.900$ em notação científica e dê a ordem de grandeza.`, `$2,29 \\times 10^4$ e O.G. $= 10^4$`],
  [106, `Escreva $37.400$ em notação científica e dê a ordem de grandeza.`, `$3,74 \\times 10^4$ e O.G. $= 10^5$`],
  [107, `Escreva $0,01$ em notação científica e dê a ordem de grandeza.`, `$1 \\times 10^{-2}$ e O.G. $= 10^{-2}$`],
  [108, `Escreva $0,00000403$ em notação científica e dê a ordem de grandeza.`, `$4,03 \\times 10^{-6}$ e O.G. $= 10^{-5}$`],
  [109, `Simplifique: $-3^2 \\cdot (2^3 - 3^3)$.`, `$171$`],
  [110, `Simplifique: $-40 \\div 10 \\times 4$.`, `$-16$`],
  [111, `Simplifique: $2^{-3} \\cdot [4^0 - 5 \\cdot (2^{-2} + 9^{\\frac{1}{2}})]$.`, `$-\\frac{61}{32}$`],
  [112, `Simplifique: $\\left(\\frac{1}{2}\\right)^{-3} \\cdot \\left(\\frac{2}{3}\\right)^4 \\cdot (1,333\\ldots)^{-2}$.`, `$\\frac{8}{9}$`],
  [113, `Simplifique: $\\left(\\frac{4}{3}\\right)^2 \\cdot (0,4)^{-3} \\cdot (0,2)^3$.`, `$\\frac{2}{9}$`],
  [114, `Resolva a expressão do material: $-3 - \\{4 - 2^0 - [3^2 - 2^3 \\cdot (30 \\div 6 \\times 3 + 1)]\\}$.`, `$1$`, `A transcrição foi normalizada a partir do PDF escaneado; o gabarito oficial registra o resultado $1$.`],
  [115, `Calcule: $\\dfrac{0,02 \\times 30 \\times 10^6}{0,1 \\times 0,6 \\times 10^5}$.`, `$100$`],
  [116, `Calcule: $\\dfrac{0,01 \\times 1000}{10^{-2} \\times 0,001 \\times 10^4}$.`, `$100$`],
  [117, `Calcule: $\\dfrac{0,001 \\times 10000}{0,00001 \\times 100}$.`, `$10^4$`],
  [118, `Calcule: $\\dfrac{(0,01)^2 \\times (1000)^4}{(0,0001)^{-5} \\times (100)^{-7}}$.`, `$10^2$`],
  [119, `Calcule: $\\dfrac{(0,0002)^3 \\times (3000)^{-2}}{0,000072 \\times (0,001)^4}$.`, `$\\frac{1}{81}$`],
  [120, `Determine o valor de $\\left\\{\\left[(2^3)^4 \\div (-2)^8 \\cdot (-2)^{10}\\right] \\div (-2)^{14}\\right\\}$.`, `$1$`, `A expressão foi reconstruída a partir do escaneamento; o valor oficial indicado no gabarito é $1$.`],
  [121, `Determine o valor de $\\dfrac{2^{-1} - (-2)^2 + (-2)^{-1}}{2^2 + 2^{-2}}$.`, `$-\\frac{16}{17}$`],
  [122, `Resolva a expressão numérica e escolha a alternativa correta:

- a) $\\frac{2}{7}$
- b) $\\frac{1}{2}$
- c) $2$
- d) $\\frac{7}{2}$
- e) $\\frac{4}{3}$

Expressão: $-4 + \\left[3^2 \\div \\frac{3}{5} \\div \\left(0,5 + 0,3 \\div \\frac{9}{2}\\right)\\right]^{-1}$.`, `Alternativa E: $\\frac{4}{3}$`],
  [123, `Calcule o valor numérico e escolha a alternativa correta:

$$
y = \\left(\\frac{2}{3}\\right)^{-2} - \\left(-\\frac{1}{2}\\right)^{-1} + \\left(-\\frac{1}{4}\\right)^{-2}
$$

- a) $\\frac{75}{4}$
- b) $-\\frac{47}{4}$
- c) $\\frac{81}{4}$
- d) $-\\frac{53}{4}$`, `Alternativa C: $\\frac{81}{4}$`],
  [124, `A expressão $3^{N+2} + 3^N$ é igual a:

- a) $3^2 \\cdot 3^N$
- b) $6^{2N} + 2$
- c) $3^{2(N+1)}$
- d) $10 \\cdot 3^N$`, `Alternativa D: $10 \\cdot 3^N$`],
  [125, `Para $a = 0,2$ e $b = 0,1$, calcule o valor da expressão

$$
\\frac{a^2b - ab^2}{a^2b^2}
$$

- a) $0,5$
- b) $5$
- c) $10$
- d) $50$`, `Alternativa B: $5$`],
  [126, `O valor de $5^5 + 5^5 + 5^5 + 5^5 + 5^5$ é:

- a) $5^6$
- b) $5^{25}$
- c) $25^5$
- d) $25^{25}$`, `Alternativa A: $5^6$`],
  [127, `Determine o valor de

$$
\\frac{2^{20} + 2^{19}}{2^{18}}
$$`, `$6$`],
  [128, `Sendo $2^x = b$, então $2^{-2 + 3x}$ vale:

- a) $3b^2$
- b) $\\frac{b^3}{4}$ com sinal negativo
- c) $\\frac{b^3}{4}$
- d) $4b$
- e) $2b^3$`, `Alternativa C: $\\frac{b^3}{4}$`],
  [129, `O valor da expressão

$$
\\frac{4^{37} - 8^{24}}{4^{36} + 2^{73}}
$$

é:

- a) $1$
- b) $2$
- c) $4$
- d) $8$
- e) $16$`, `Alternativa A: $1$`],
  [130, `Simplificando a expressão

$$
\\frac{2^{10} - 3^6}{2^5 + 3^3}
$$

obtemos:

- a) $59$
- b) $50$
- c) $25$
- d) $15$
- e) $5$`, `Alternativa D: $15$`],
  [131, `Se consideramos $a = 2^3 - 5 \\times 2$, então o valor de $a$ é:

- a) $6$
- b) $2$
- c) $-4$
- d) $-2$`, `Alternativa D: $-2$`],
  [132, `O quociente de $50^{50}$ por $25^{25}$ é igual a:

- a) $25^{25}$
- b) $10^{25}$
- c) $100^{25}$
- d) $2^2$
- e) $2 \\times 25^{25}$`, `Alternativa C: $100^{25}$`],
  [133, `Considere os números do enunciado do material, escritos com potências de base 4: $a = 4^{4/3}$, $b = 4^{5/4}$ e $c = 4^{6/5}$. Assinale a afirmação correta:

- a) $a > c$
- b) $b < c$
- c) $a < b < c$
- d) $c < -a$
- e) $a = b = c$`, `Alternativa A`],
  [134, `Compare os números do enunciado do material-base e assinale a ordem correta entre $x$, $y$ e $z$:

- a) $x < y < z$
- b) $x < z < y$
- c) $y < x < z$
- d) $y < z < x$
- e) $z < x < y$`, `Alternativa C`],
  [135, `Dados os números racionais $m = 0,03 \\cdot 10^{-20}$, $k = 0,3 \\cdot 10^{-21}$ e $p = 300 \\cdot 10^{-22}$, assinale a relação correta:

- a) $m < k < p$
- b) $m = k > p$
- c) $k < m < p$
- d) $m = k < p$`, `Alternativa D`],
  [136, `Para $x = 2013$, determine o valor da expressão com potências de $(-1)$ apresentada no material.

- a) $-4$
- b) $-2$
- c) $0$
- d) $1$
- e) $4$`, `Alternativa A: $-4$`],
  [137, `Considere o número racional $M$ definido no enunciado do material e determine seu valor:

- a) $-17$
- b) $-1$
- c) $0$
- d) $1$
- e) $17$`, `Alternativa D: $1$`],
  [138, `Determine o valor da expressão do item 138:

- a) $0$
- b) $-4$
- c) $-8$
- d) $-16$
- e) $28$`, `Alternativa E: $28$`],
  [139, `Calcule o valor de $M$ na expressão fracionária apresentada no material:

- a) $\\frac{101}{10}$
- b) $6$
- c) $0$
- d) $\\frac{57}{3}$
- e) $-37$`, `Alternativa E: $-37$`],
  [140, `O resultado da multiplicação $(1 - \\frac{1}{3})(1 - \\frac{1}{4})(1 - \\frac{1}{5})\\cdots(1 - \\frac{1}{10})$ pode ser indicado por:

- a) $0,2 \\times 10^0$
- b) $0,8 \\times 10^0$
- c) $0,5 \\times 10^{-1}$
- d) $0,8 \\times 10^{-1}$
- e) $0,9 \\times 10^{-1}$`, `Alternativa A`],
  [141, `Sejam $x$ e $y$ os números definidos no item 141 do material. Qual é a ordem de grandeza de $xy$?

- a) $10^4$
- b) $10^5$
- c) $10^6$
- d) $10^7$`, `Alternativa D: $10^7$`],
  [142, `Que termos devem ser retirados da expressão $2^0 + 4^0 + 6^0 + 8^0 + 10^0 + 12^0$ para que a soma dos restantes seja igual a 1?

- a) $8^0$ e $10^0$
- b) $2^0$ e $4^0$
- c) $6^0$ e $8^0$
- d) $8^0$ e $4^0$
- e) $12^0$ e $10^0$`, `Alternativa A`],
  [143, `Se $a^2 = 99^6$, $b^3 = 99^7$ e $c^4 = 99^8$, então $(abc)^{12}$ vale:

- a) $99^{12}$
- b) $99$
- c) $99^{78}$
- d) $99^{99}$
- e) $99^{90}$`, `Alternativa D`],
  [144, `A expressão do item 144 é equivalente a:

- a) $2^4 \\cdot (2^{65} + 1)$
- b) $1 - 2^{65}$
- c) $9 \\cdot 2^4$
- d) $3 \\cdot (1 - 2^{65})$
- e) $2^{65} \\cdot (2^{60} + 1)$`, `Alternativa A`],
  [145, `A expressão

$$
\\frac{10^{10} + 10^{20} + 10^{30}}{10^0 + 10^{10} + 10^{20}}
$$

é equivalente a:

- a) $1 + 10^{10}$
- b) $\\frac{10^2}{2}$
- c) $10^{10}$
- d) $10^{-10}$
- e) $\\frac{10^9 - 1}{2}$`, `Alternativa C: $10^{10}$`],
  [146, `Use a igualdade com somas de potências apresentada no item 146 do material e determine o inteiro positivo $n$.`, `$32$`, `A expressão veio de um escaneamento de concurso. O gabarito oficial registra $n = 32$.`],
  [147, `No item 147, analise as três afirmativas sobre potências e assinale a alternativa correta:

- a) apenas a afirmativa I é verdadeira
- b) apenas as afirmativas I e III são verdadeiras
- c) apenas a afirmativa II é verdadeira
- d) apenas as afirmativas II e III são verdadeiras
- e) as afirmativas I, II e III são falsas`, `Alternativa E`],
  [148, `Simplificando-se a expressão do item 148, obtém-se:

- a) $-x^{94}$
- b) $x^{94}$
- c) $x^{-94}$
- d) $-x^{-94}$`, `Alternativa A: $-x^{94}$`],
  [149, `No item 149, o valor de $x$ fica compreendido entre:

- a) $-1$ e $-0,9$
- b) $-0,9$ e $-0,8$
- c) $-0,8$ e $-0,7$
- d) $-0,7$ e $0,6$`, `Alternativa A`],
  [150, `Calcule o valor de $k$ no item 150, em que a expressão do material deve ser escrita na forma $4^{5k}$.`, `$13$`, `O gabarito oficial do item 150 registra $k = 13$.`],
  [151, `A dose diária recomendada de um remédio é de 40 gotas. Cada gota pesa, em média, $5 \\times 10^{-2}$ gramas. Num frasco com 80 gramas, o medicamento é suficiente para no máximo:

- a) 10 dias
- b) 15 dias
- c) 20 dias
- d) 30 dias
- e) 40 dias`, `Alternativa E: 40 dias`],
  [152, `Observando a tabela de áreas dos oceanos Pacífico, Atlântico e Glacial Ártico, podemos dizer que a ordem de grandeza, respectivamente, é:

- a) $10^6$, $10^6$ e $10^5$
- b) $10^7$, $10^7$ e $10^6$
- c) $10^8$, $10^8$ e $10^7$
- d) $10^8$, $10^8$ e $10^7$
- e) $10^8$, $10^9$ e $10^8$`, `Alternativa D`],
  [153, `Ronaldo empilhou caixas numeradas em linhas seguindo o padrão do esquema do material. Qual será a soma da 9ª linha?

- a) $9$
- b) $45$
- c) $64$
- d) $81$
- e) $285$`, `Alternativa D: $81$`],
  [154, `Um ganhador da Mega Sena distribuiu o prêmio entre três instituições:

- Creche Raio de Sol: $\\frac{2}{5}$ do prêmio, mais $6 \\times 10^6$ reais
- Abrigo da Felicidade: $\\frac{1}{3}$ do prêmio, mais $9 \\times 10^6$ reais
- Maternidade da Luz: o restante, correspondente a $33 \\times 10^5$ reais

Calcule o valor do prêmio, em milhões de reais.`, `R$ 18.000.000,00`],
  [155, `No problema da folha de papel dobrada ao meio em cada etapa, em quantas etapas, no mínimo, formaríamos uma pilha de cerca de 200 m?

- a) 21 etapas
- b) 201 etapas
- c) 2001 etapas
- d) infinitas etapas`, `Alternativa A: 21 etapas`],
  [156, `Se $N$ é o número 1 seguido de 100 zeros, então o número $N^0$ é o número 1 seguido de:

- a) 100 zeros
- b) 102 zeros
- c) 110 zeros
- d) $N^2$ zeros
- e) $N^3$ zeros`, `Alternativa A`],
  [157, `Observe as configurações espaciais de cubos idênticos do material e determine a quantidade de cubos da 10ª configuração que segue o mesmo padrão.`, `$440$`],
  [158, `Dividindo $60^2 \\cdot 10^2$ por $b$ obtém-se quociente 6 e resto $r$, sendo $b$ e $r$ naturais. Determine a soma dos valores possíveis para $b$.

- a) $254$
- b) $386$
- c) $408$
- d) $504$
- e) $614$`, `Alternativa D: $504$`],
  [159, `Sabendo que $n$ é natural não nulo e usando a operação $\\#$ definida no enunciado do item 159, determine o valor pedido:

- a) $127$
- b) $128$
- c) $255$
- d) $256$
- e) $511$`, `Alternativa C: $255$`, `O item 159 usa um operador especial definido no PDF. O gabarito oficial aponta a alternativa C, correspondente a $255$.`],
];

export const POTENTIATION_QUESTIONS: Question[] = seeds.map(buildQuestion);
