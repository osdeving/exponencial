---
id: algebra-patterns
topicId: algebra-foundations
title: Padrões, Sequências e Generalização
difficulty: Médio
estimatedMinutes: 18
order: 3
summary: Liga padrões numéricos e figurais à construção de leis de formação.
status: ready
goals:
  - Descrever padrões
  - Criar lei de formação
  - Preparar funções futuras
prerequisites:
tags:
canonicalIds:
  - ALG.01.08
---
# Padrões, Sequências e Generalização

Um padrão aparece quando uma regra se repete. A álgebra entra quando conseguimos transformar essa regra em uma expressão que vale para qualquer posição.

Observe a sequência:

$$
3,\ 6,\ 9,\ 12,\ 15,\ldots
$$

Ela aumenta de 3 em 3. Podemos continuar fazendo termo por termo, mas a álgebra permite perguntar: **qual é o termo da posição 100?**

## Sequência e posição

Uma sequência tem termos organizados por posição.

| Posição $n$ | Termo |
| --- | --- |
| 1 | 3 |
| 2 | 6 |
| 3 | 9 |
| 4 | 12 |
| 5 | 15 |

O termo é sempre 3 vezes a posição:

$$
a_n = 3n
$$

Se $n = 100$:

$$
a_{100} = 3\cdot 100 = 300
$$

## Lei de formação

A lei de formação é a regra que gera os termos.

Exemplo:

$$
5,\ 9,\ 13,\ 17,\ldots
$$

A sequência começa em 5 e aumenta de 4 em 4.

Para encontrar a lei, observe:

| Posição $n$ | Termo | Como aparece |
| --- | --- | --- |
| 1 | 5 | $4\cdot1+1$ |
| 2 | 9 | $4\cdot2+1$ |
| 3 | 13 | $4\cdot3+1$ |
| 4 | 17 | $4\cdot4+1$ |

Então:

$$
a_n = 4n + 1
$$

## Padrões figurais

Também podemos criar fórmulas a partir de desenhos.

Imagine uma sequência de fileiras com quadradinhos:

```text
Figura 1: ■
Figura 2: ■ ■
Figura 3: ■ ■ ■
Figura 4: ■ ■ ■ ■
```

A figura $n$ tem $n$ quadradinhos.

Agora veja outro padrão:

```text
Figura 1: ■ ■ ■
Figura 2: ■ ■ ■ ■ ■
Figura 3: ■ ■ ■ ■ ■ ■ ■
```

As quantidades são:

$$
3,\ 5,\ 7,\ldots
$$

Cada figura aumenta 2 quadradinhos. A lei pode ser:

$$
a_n = 2n + 1
$$

Testando:

- figura 1: $2\cdot1 + 1 = 3$;
- figura 2: $2\cdot2 + 1 = 5$;
- figura 3: $2\cdot3 + 1 = 7$.

## Diferença constante

Quando a diferença entre termos consecutivos é sempre a mesma, a sequência costuma ter uma lei do tipo:

$$
a_n = dn + b
$$

Aqui, $d$ é a diferença constante.

Exemplo:

$$
10,\ 15,\ 20,\ 25,\ldots
$$

A diferença é 5, então a fórmula começa com $5n$.

Testando:

- para $n=1$, $5n = 5$, mas queremos 10;
- faltam 5.

Então:

$$
a_n = 5n + 5
$$

## Generalizar

Generalizar é sair do caso específico e criar uma regra geral.

Exemplo:

> O dobro de qualquer número mais 1.

Se o número é $n$, a regra geral é:

$$
2n + 1
$$

Isso representa todos os números ímpares positivos quando $n$ é natural começando em 0.

## Erros comuns

- olhar só os dois primeiros termos e criar regra apressada;
- confundir posição com termo;
- esquecer de testar a lei em mais de uma posição;
- achar que todo padrão cresce somando sempre a mesma coisa.

## Prática guiada

1. Encontre a lei de $2,\ 4,\ 6,\ 8,\ldots$.
2. Encontre a lei de $7,\ 10,\ 13,\ 16,\ldots$.
3. Qual é o 20º termo da sequência $a_n = 5n - 2$?
4. Uma figura tem $3n$ palitos na posição $n$. Quantos palitos tem a figura 8?
5. Crie uma sequência cuja lei seja $a_n = 2n + 4$.

## Ideia para guardar

Um padrão mostra repetição. Uma fórmula mostra a repetição de forma geral, permitindo calcular qualquer posição sem desenhar ou listar tudo.
