---
id: natural-numbers-operations
topicId: natural-numbers
title: Operações Fundamentais e Expressões
difficulty: Médio
estimatedMinutes: 16
order: 2
summary: Aplicar as quatro operações em expressões numéricas.
status: ready
goals:
  - Resolver expressões
  - Respeitar prioridade das operações
  - Justificar etapas
prerequisites:
  - Leitura e ordem de números naturais
  - Valor posicional decimal
tags:
canonicalIds:
  - NUM.02.01
  - NUM.02.02
  - NUM.02.03
  - NUM.02.04
  - NUM.02.05
  - NUM.02.06
  - NUM.02.07
  - NUM.02.08
  - NUM.02.09
  - NUM.02.10
---
# Operações Fundamentais e Expressões

## Por que as contas funcionam?

As quatro operações fundamentais são:

| Operação | Ideia principal | Exemplo |
|---|---|---|
| adição | juntar | $28 + 14$ |
| subtração | retirar ou comparar | $28 - 14$ |
| multiplicação | repetir parcelas iguais | $7\cdot 6$ |
| divisão | repartir ou medir grupos | $42\div 6$ |

Quando fazemos contas "armadas", não estamos apenas seguindo um ritual. Estamos usando o sistema decimal: unidades com unidades, dezenas com dezenas, centenas com centenas.

É por isso que alinhar as casas é tão importante.

## Adição e o vai um

Calcule:

$$
278 + 146
$$

Decompondo:

$$
278 = 200 + 70 + 8
$$

$$
146 = 100 + 40 + 6
$$

Somando por posições:

| Ordem | Soma | Resultado |
|---|---:|---:|
| unidades | $8 + 6$ | $14$ unidades |
| dezenas | $70 + 40$ | $110$ |
| centenas | $200 + 100$ | $300$ |

As $14$ unidades viram $1$ dezena e $4$ unidades. Esse é o famoso **vai um**.

Na verdade, "vai um" significa:

> juntei dez unidades e troquei por uma dezena.

Então:

$$
278 + 146 = 424
$$

## Subtração e o empresta

Calcule:

$$
304 - 178
$$

A dificuldade aparece porque não dá para tirar $8$ unidades de $4$ unidades.

Mas $304$ tem $3$ centenas e $0$ dezenas. Podemos trocar uma centena por dez dezenas:

$$
304 = 2\text{ centenas} + 10\text{ dezenas} + 4\text{ unidades}
$$

Depois trocamos uma dezena por dez unidades:

$$
304 = 2\text{ centenas} + 9\text{ dezenas} + 14\text{ unidades}
$$

Agora a subtração fica possível:

| Ordem | Conta |
|---|---:|
| unidades | $14 - 8 = 6$ |
| dezenas | $9 - 7 = 2$ |
| centenas | $2 - 1 = 1$ |

Logo:

$$
304 - 178 = 126
$$

O "empresta" também não é mágica. É troca entre casas do sistema decimal.

## Multiplicação como repetição e como área

Multiplicar $23\cdot 4$ é somar $23$ quatro vezes:

$$
23 + 23 + 23 + 23 = 92
$$

Mas também podemos usar valor posicional:

$$
23\cdot4 = (20 + 3)\cdot4
$$

$$
23\cdot4 = 20\cdot4 + 3\cdot4 = 80 + 12 = 92
$$

Para multiplicações maiores, essa decomposição continua funcionando:

$$
34\cdot12 = 34\cdot(10 + 2)
$$

$$
34\cdot12 = 340 + 68 = 408
$$

Quando a conta armada "desloca uma casa" na segunda linha, ela está multiplicando por dez.

## Divisão como repartir e como medir

A divisão pode aparecer de duas formas.

Se $48$ figurinhas serão repartidas entre $6$ pessoas:

$$
48\div6 = 8
$$

Cada pessoa recebe $8$ figurinhas.

Mas também podemos perguntar:

> Quantos grupos de $6$ cabem em $48$?

Também são $8$ grupos.

Essas duas ideias são próximas, mas a pergunta muda:

| Situação | Pergunta |
|---|---|
| repartir | quanto cada grupo recebe? |
| medir grupos | quantos grupos cabem? |

## Prioridade das operações

Em expressões numéricas, a ordem de resolução evita ambiguidade.

A prioridade usual é:

1. parênteses;
2. multiplicação e divisão, da esquerda para a direita;
3. adição e subtração, da esquerda para a direita.

Exemplo:

$$
18 + 6\cdot 4
$$

Primeiro a multiplicação:

$$
18 + 24 = 42
$$

Se fosse para somar antes, os parênteses deveriam aparecer:

$$
(18 + 6)\cdot4 = 24\cdot4 = 96
$$

A mesma escrita, com ou sem parênteses, pode mudar tudo. Isso lembra o sistema posicional: o valor depende da regra de leitura.

## Exercícios sugeridos

1. Calcule $458 + 367$ e explique onde aparece o "vai um".
2. Calcule $602 - 249$ mostrando as trocas entre centenas, dezenas e unidades.
3. Resolva $37\cdot 8$ usando decomposição.
4. Resolva $156\div 12$ e confira com multiplicação.
5. Calcule $40 - 6\cdot 5 + 8$.
6. Compare os resultados de $(40 - 6)\cdot5$ e $40 - 6\cdot5$.
