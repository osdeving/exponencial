---
id: roots-square
topicId: powers-roots
title: Radiciação, Propriedades e Extração
difficulty: Médio
estimatedMinutes: 30
order: 2
summary: Consolida definição de radical, propriedades, operações e extração de raízes.
status: ready
goals:
  - Relacionar potência e raiz
  - Simplificar radicais e operar com segurança
  - Extrair raízes e estimar erros
prerequisites:
tags:
---
# Radiciação, Propriedades e Extração

A radiciação aparece como operação inversa da potenciação, mas no capítulo de radicais ela vai além disso: precisamos interpretar o índice, simplificar, operar e reconhecer quando uma raiz existe no conjunto dos números reais.

## Definição de radical

Se

$$
\sqrt[n]{A} = b
$$

então

$$
b^n = A
$$

com $n \in \mathbb{N}$ e $n \geq 2$.

## Raiz aritmética

Quando o índice é **par**, trabalhamos com a raiz aritmética, isto é, a raiz **não negativa**.

Exemplos:

- $\sqrt{4} = 2$
- $\sqrt{9} = 3$
- $\sqrt{16} = 4$

Por isso, no conjunto dos reais:

$$
\sqrt{4} \neq -2
$$

## Expoente fracionário

Todo expoente fracionário pode ser escrito como radical:

$$
a^{\frac{m}{n}} = \sqrt[n]{a^m}
$$

Exemplos:

$$
5^{\frac{2}{3}} = \sqrt[3]{5^2}
\qquad
\text{e}
\qquad
x^{\frac{3}{4}} = \sqrt[4]{x^3}
$$

## Propriedades básicas

### Raiz de uma potência

Para extrair a raiz de uma potência, dividimos o expoente pelo índice do radical:

$$
\sqrt[n]{a^m} = a^{\frac{m}{n}}
$$

Se a divisão não for exata, uma parte sai do radical e outra permanece.

### Raiz de produto

$$
\sqrt[n]{ab} = \sqrt[n]{a} \cdot \sqrt[n]{b}
$$

### Raiz de quociente

$$
\sqrt[n]{\frac{a}{b}} = \frac{\sqrt[n]{a}}{\sqrt[n]{b}}
\qquad (b \neq 0)
$$

### Radicais equivalentes

Podemos multiplicar ou dividir o índice e o expoente do radicando pelo mesmo número sem alterar a raiz:

$$
\sqrt[n]{a^m} = \sqrt[kn]{a^{km}}
$$

Isso ajuda bastante na redução ao mesmo índice.

## Simplificação e extração de fatores

O objetivo aqui é procurar potências perfeitas dentro do radicando.

Exemplo:

$$
\sqrt{72} = \sqrt{36 \cdot 2} = 6\sqrt{2}
$$

Outro exemplo:

$$
\sqrt[3]{54} = \sqrt[3]{27 \cdot 2} = 3\sqrt[3]{2}
$$

Se o expoente do fator for menor do que o índice, ele não sai do radical.

## Operações com radicais

### Radicais semelhantes

Só podemos somar ou subtrair radicais que tenham **mesmo índice** e **mesmo radicando**.

Exemplo:

$$
7\sqrt{2} + 4\sqrt{2} = 11\sqrt{2}
$$

### Multiplicação e divisão

Quando os índices são iguais, conservamos o índice e operamos os radicandos:

$$
\sqrt{3} \cdot \sqrt{12} = \sqrt{36} = 6
$$

Se os índices forem diferentes, primeiro reduzimos ao mesmo índice.

## Introdução de fator no radical

Se um fator estiver fora do radical, podemos introduzi-lo no radicando elevando-o ao índice:

$$
3\sqrt{2} = \sqrt{3^2 \cdot 2} = \sqrt{18}
$$

Esse movimento ajuda em simplificações e comparações.

## Racionalização de denominadores

Não deixamos radical no denominador quando podemos eliminá-lo.

### Denominador com um único radical quadrado

$$
\frac{3}{\sqrt{2}} = \frac{3\sqrt{2}}{2}
$$

### Denominador com radical de índice diferente de 2

Escolhemos um fator racionalizante que complete a potência necessária.

### Denominador com soma ou diferença de radicais

Usamos o **conjugado**:

$$
\frac{1}{\sqrt{a}+\sqrt{b}}
\cdot
\frac{\sqrt{a}-\sqrt{b}}{\sqrt{a}-\sqrt{b}}
$$

## Radical duplo

Em alguns casos, expressões como

$$
\sqrt{A + \sqrt{B}}
$$

podem ser reescritas como soma de radicais mais simples. Isso aparece nas questões de treino e em parte das questões de concurso do capítulo.

## Extração da raiz quadrada por falta

Quando a raiz não é exata, podemos obter uma raiz **por falta** e estudar o resto.

Exemplo clássico:

se a raiz quadrada por falta de um número é $N$, o resto máximo possível é:

$$
2N
$$

Já na raiz cúbica, o maior resto possível é:

$$
3N^2 + 3N
$$

## Erro inferior a um valor dado

Para obter $\sqrt{N}$ com erro inferior a $1/d$, calculamos:

$$
\frac{\sqrt{N \cdot d^2}}{d}
$$

Essa ideia aparece nas questões finais antes do bloco de concursos.

## O que treinar nesta lição

No site, esta aula reúne os itens **1 a 140** do material-base de radiciação. O bloco cobre:

- simplificação de radicais;
- operações e potências;
- racionalização;
- extração de raízes;
- restos e erros de aproximação.
