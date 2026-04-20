---
id: natural-numbers-reading
topicId: natural-numbers
title: Leitura, Ordem e Valor Posicional
difficulty: Fácil
estimatedMinutes: 14
order: 1
summary: Organizar números naturais e interpretar ordens e classes.
status: ready
goals:
  - Ler números grandes
  - Comparar números
  - Usar valor posicional
prerequisites:
  - Contagem básica
  - Sistema numérico posicional
tags:
canonicalIds:
  - NUM.01.01
  - NUM.01.02
  - NUM.01.03
  - NUM.01.04
  - NUM.01.05
  - NUM.01.06
  - NUM.01.07
---
# Leitura, Ordem e Valor Posicional

## A ideia central

Números naturais são os números que usamos para contar: $0, 1, 2, 3, 4, \ldots$

Mas escrever números naturais grandes só fica prático porque usamos um **sistema posicional**. O mesmo símbolo muda de valor conforme a casa em que aparece.

Pense no algarismo $7$:

- em $7$, ele vale $7$ unidades;
- em $70$, ele vale $7$ dezenas, isto é, $70$;
- em $700$, ele vale $7$ centenas, isto é, $700$.

O símbolo é o mesmo. A posição é que muda o valor.

Essa é a mesma ideia da aula do sistema numérico posicional: os algarismos não carregam todo o significado sozinhos. Eles precisam de uma regra de leitura.

![Quadro de valor posicional do número 47.582](/content-assets/fundamental/place-value-columns.svg)

## Ordens e classes

Cada posição de um algarismo é chamada de **ordem**.

No sistema decimal, as ordens crescem da direita para a esquerda:

| Ordem | Nome | Valor da posição |
|---|---|---|
| 1ª | unidade | $1$ |
| 2ª | dezena | $10$ |
| 3ª | centena | $100$ |
| 4ª | unidade de milhar | $1\,000$ |
| 5ª | dezena de milhar | $10\,000$ |
| 6ª | centena de milhar | $100\,000$ |

As ordens também podem ser agrupadas em **classes**, normalmente de três em três:

| Classe | Ordens | Exemplo |
|---|---|---|
| unidades simples | unidade, dezena, centena | $582$ |
| milhares | unidade, dezena e centena de milhar | $47\,000$ |
| milhões | unidade, dezena e centena de milhão | $3\,000\,000$ |

Por isso, separar um número em grupos de três ajuda a ler:

$$
47\,582
$$

Lemos:

> quarenta e sete mil, quinhentos e oitenta e dois.

O grupo $47$ está na classe dos milhares. O grupo $582$ está na classe das unidades simples.

## Decomposição

Decompor um número é mostrar quanto cada algarismo vale na posição em que está.

Exemplo:

$$
47\,582 = 40\,000 + 7\,000 + 500 + 80 + 2
$$

Outra forma, usando potências de $10$:

$$
47\,582 = 4\cdot10^4 + 7\cdot10^3 + 5\cdot10^2 + 8\cdot10^1 + 2\cdot10^0
$$

Isso parece mais técnico, mas a intuição é simples:

- o $4$ está na casa de $10\,000$;
- o $7$ está na casa de $1\,000$;
- o $5$ está na casa de $100$;
- o $8$ está na casa de $10$;
- o $2$ está na casa de $1$.

## Comparação de números

Para comparar números naturais, comece pela esquerda, porque as posições da esquerda valem mais.

Compare:

$$
12\,350 \quad \text{e} \quad 12\,305
$$

Até $12\,3$, eles parecem iguais:

| Posição | $12\,350$ | $12\,305$ |
|---|---:|---:|
| dezena de milhar | $1$ | $1$ |
| unidade de milhar | $2$ | $2$ |
| centena | $3$ | $3$ |
| dezena | $5$ | $0$ |
| unidade | $0$ | $5$ |

A primeira diferença está na dezena: $5$ dezenas é maior que $0$ dezenas.

Então:

$$
12\,350 > 12\,305
$$

Repare que o $5$ de $12\,350$ vale $50$, enquanto o $5$ de $12\,305$ vale só $5$. De novo, a posição decide.

## O zero também fala

O zero não significa apenas "nada". Em um número posicional, ele também pode funcionar como **marcador de posição**.

Compare:

| Número | Leitura | O que o zero faz |
|---|---|---|
| $507$ | quinhentos e sete | mostra que não há dezenas |
| $570$ | quinhentos e setenta | mostra que não há unidades |
| $5\,070$ | cinco mil e setenta | segura a casa das centenas |

Sem o zero, $507$ viraria $57$, que é outro número.

## Usando um sistema inventado para entender melhor

Imagine uma base com três símbolos:

| Símbolo | Valor |
|---|---:|
| `#` | zero |
| `$` | um |
| `@` | dois |

Nessa escrita, o símbolo sozinho não basta. A posição também importa.

Por exemplo, em base três, a casa da direita vale $1$ e a casa seguinte vale $3$.

Então a escrita `@$` representa:

$$
@\cdot3 + \$\cdot1
$$

Como `@` vale dois e `$` vale um:

$$
@\$ = 2\cdot3 + 1 = 7
$$

O importante não é decorar `#`, `$` e `@`. O importante é perceber que $0, 1, 2, 3, \ldots$ também são símbolos escolhidos. O sistema funciona porque existe uma regra de posição.

## Exercícios sugeridos

1. Decomponha $8\,406$ em milhares, centenas, dezenas e unidades.
2. Escreva por extenso o número $235\,019$.
3. Compare usando $>$, $<$ ou $=$: $9\,080$ e $9\,800$.
4. Explique por que o zero em $4\,205$ é importante.
5. No número $72\,727$, qual é o valor relativo de cada algarismo $7$?
6. No sistema inventado com `#`, `$` e `@`, explique por que `@$` não é a mesma coisa que `$@`.
