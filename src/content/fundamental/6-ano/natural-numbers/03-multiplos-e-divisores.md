---
id: natural-numbers-divisibility
topicId: natural-numbers
title: Múltiplos, Divisores e Critérios
difficulty: Médio
estimatedMinutes: 18
order: 3
summary: Introduzir divisibilidade, primos e decomposição simples.
status: ready
goals:
  - Encontrar múltiplos e divisores
  - Reconhecer números primos
  - Aplicar critérios de divisibilidade
prerequisites:
  - Operações fundamentais
  - Tabuada
tags:
canonicalIds:
  - NUM.03.01
  - NUM.03.02
  - NUM.03.03
  - NUM.03.04
  - NUM.03.05
  - NUM.03.06
---
# Múltiplos, Divisores e Critérios

## Múltiplos: quando a contagem pula de um mesmo tamanho

Os múltiplos de um número aparecem quando contamos de tanto em tanto.

Múltiplos de $4$:

$$
0,\ 4,\ 8,\ 12,\ 16,\ 20,\ 24,\ldots
$$

Cada termo é resultado de $4$ vezes algum número natural:

| Conta | Múltiplo |
|---|---:|
| $4\cdot0$ | $0$ |
| $4\cdot1$ | $4$ |
| $4\cdot2$ | $8$ |
| $4\cdot3$ | $12$ |
| $4\cdot4$ | $16$ |

Então, dizer que $20$ é múltiplo de $4$ significa que $20$ aparece nessa contagem:

$$
20 = 4\cdot5
$$

## Divisores: quando a divisão é exata

Um número é divisor de outro quando divide sem deixar resto.

Exemplo:

$$
24\div6 = 4
$$

Como a divisão é exata, $6$ é divisor de $24$.

Também podemos dizer que:

$$
24 = 6\cdot4
$$

Por isso, múltiplos e divisores são duas formas de olhar para a mesma relação:

| Frase | Mesma ideia |
|---|---|
| $24$ é múltiplo de $6$ | $24 = 6\cdot4$ |
| $6$ é divisor de $24$ | $24\div6$ é exata |

## Lista de divisores

Para encontrar divisores de $36$, procure pares de multiplicação:

| Par | Conclusão |
|---|---|
| $1\cdot36$ | $1$ e $36$ são divisores |
| $2\cdot18$ | $2$ e $18$ são divisores |
| $3\cdot12$ | $3$ e $12$ são divisores |
| $4\cdot9$ | $4$ e $9$ são divisores |
| $6\cdot6$ | $6$ é divisor |

Logo:

$$
D(36)=\{1,2,3,4,6,9,12,18,36\}
$$

## Números primos

Um número natural maior que $1$ é **primo** quando tem exatamente dois divisores positivos: $1$ e ele mesmo.

Exemplos:

| Número | Divisores | É primo? |
|---|---|---|
| $2$ | $1,2$ | sim |
| $3$ | $1,3$ | sim |
| $4$ | $1,2,4$ | não |
| $5$ | $1,5$ | sim |
| $6$ | $1,2,3,6$ | não |

O número $1$ não é primo, porque tem apenas um divisor positivo.

## Critérios de divisibilidade

Alguns critérios funcionam por causa do sistema decimal. Como as casas têm valores $1$, $10$, $100$, $1000$ e assim por diante, certos padrões aparecem.

| Divisibilidade | Critério | Exemplo |
|---|---|---|
| por $2$ | termina em $0,2,4,6,8$ | $348$ é divisível por $2$ |
| por $3$ | soma dos algarismos é múltipla de $3$ | $372$: $3+7+2=12$ |
| por $5$ | termina em $0$ ou $5$ | $1\,235$ é divisível por $5$ |
| por $10$ | termina em $0$ | $8\,910$ é divisível por $10$ |

O critério do $10$ é o mais diretamente ligado ao sistema posicional: no decimal, uma dezena é $10$ unidades. Por isso, todo número terminado em zero tem unidades sobrando iguais a zero.

Exemplo:

$$
4\,830 = 483\cdot10
$$

Então $4\,830$ é múltiplo de $10$.

## Por que a soma dos algarismos ajuda no 3?

Observe:

$$
372 = 3\cdot100 + 7\cdot10 + 2
$$

No sistema decimal:

$$
100 = 99 + 1
$$

$$
10 = 9 + 1
$$

Como $99$ e $9$ são múltiplos de $3$, o que decide a divisibilidade por $3$ é a soma dos algarismos:

$$
3 + 7 + 2 = 12
$$

Como $12$ é múltiplo de $3$, $372$ também é múltiplo de $3$.

Você não precisa demonstrar isso sempre. Mas entender a origem evita decorar como se fosse truque.

## Exercícios sugeridos

1. Liste os múltiplos de $6$ de $0$ até $60$.
2. Encontre todos os divisores de $48$.
3. Explique por que $45$ é múltiplo de $9$.
4. Diga se $1\,248$ é divisível por $2$, por $3$ e por $5$.
5. Separe em primos e compostos: $11$, $15$, $17$, $21$, $29$.
6. Explique com suas palavras a diferença entre "ser múltiplo" e "ser divisor".
