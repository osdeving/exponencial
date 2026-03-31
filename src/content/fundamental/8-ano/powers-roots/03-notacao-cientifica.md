---
id: scientific-notation
topicId: powers-roots
title: Notação Científica
difficulty: Médio
estimatedMinutes: 18
order: 3
summary: Aplica potências de 10 à escrita científica.
status: ready
goals:
  - Escrever em notação científica
  - Comparar ordens de grandeza
  - Ler dados reais
prerequisites:
  - Potências com expoentes inteiros
  - Leitura de números decimais
tags:
  - notacao-cientifica
  - potencias-de-10
  - ordem-de-grandeza
canonicalIds:
  - NUM.10.09
  - NUM.10.10
  - NUM.10.11
  - NUM.10.12
---
# Notação Científica

Notação científica é uma forma prática de escrever números muito grandes ou muito pequenos usando **potências de 10**.

## Potências de 10

Alguns desenvolvimentos importantes:

- $10^1 = 10$
- $10^3 = 1000$
- $10^5 = 100000$
- $10^{-1} = 0,1$
- $10^{-3} = 0,001$

Quando o expoente é positivo, o número cresce. Quando o expoente é negativo, obtemos um decimal.

## Como escrever um número com potência de 10

### Caso 1: número maior ou igual a 1

Contamos quantas casas a vírgula precisa andar para a esquerda até sobrar apenas um algarismo não nulo antes dela.

Exemplos:

- $784000 = 7,84 \times 10^5$
- $325000000 = 3,25 \times 10^8$
- $38,475 = 3,8475 \times 10^1$

### Caso 2: número entre 0 e 1

Contamos quantas casas a vírgula precisa andar para a direita até o primeiro algarismo significativo.

Exemplos:

- $0,00048 = 4,8 \times 10^{-4}$
- $0,000006 = 6 \times 10^{-6}$
- $0,00000002 = 2 \times 10^{-8}$

## Forma padrão

Um número está em notação científica quando aparece na forma:

$$
N = x \times 10^n
$$

com

$$
1 \leq x < 10
$$

Esse intervalo garante que a escrita fique padronizada e fácil de comparar.

## Ordem de grandeza

Depois de escrever o número como $x \times 10^n$, observamos o valor de $x$:

- se $x < 3,16$, a ordem de grandeza é $10^n$;
- se $x > 3,16$, a ordem de grandeza é $10^{n+1}$.

O número $3,16$ aparece porque é aproximadamente $\sqrt{10}$ e funciona como fronteira entre uma potência de 10 e a seguinte.

Exemplos:

- $3,12 \times 10^4$ tem ordem de grandeza $10^4$
- $6,403 \times 10^{-7}$ tem ordem de grandeza $10^{-6}$
- $4,72 \times 10^5$ tem ordem de grandeza $10^6$

## Prefixos mais usados

O material-base também relaciona potências de 10 com prefixos do Sistema Internacional:

- quilo: $10^3$
- mega: $10^6$
- giga: $10^9$
- tera: $10^{12}$

Isso aparece em unidades como quilômetro, megabyte e gigabit.

## Estratégia para não errar

1. escreva a parte significativa com apenas um algarismo antes da vírgula;
2. conte quantas casas a vírgula se moveu;
3. use expoente positivo se o número original era grande;
4. use expoente negativo se o número original era pequeno;
5. só depois decida a ordem de grandeza.

## Prática no site

Os exercícios desta lição cobrem reescrita em potências de 10, notação científica e ordem de grandeza. Se quiser conferir sem sair da lista, abra o gabarito oficial dentro do próprio exercício.
