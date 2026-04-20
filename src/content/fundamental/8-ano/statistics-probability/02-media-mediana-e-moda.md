---
id: stats-average
topicId: statistics-probability
title: Média, Mediana e Moda
difficulty: Médio
estimatedMinutes: 17
order: 2
summary: Apresenta medidas-resumo de conjuntos de dados.
status: ready
goals:
  - Calcular média
  - Encontrar mediana
  - Reconhecer moda
prerequisites:
  - Tabelas e gráficos
  - Divisão
  - Ordem crescente
tags:
canonicalIds:
  - DAT.02.01
  - DAT.02.02
  - DAT.02.03
  - DAT.02.04
  - DAT.02.05
  - DAT.02.06
  - DAT.02.07
  - DAT.02.10
---
# Média, Mediana e Moda

## Medidas-resumo

Quando temos uma lista de dados, às vezes queremos um número que resuma o conjunto.

Exemplo: notas de cinco atividades:

$$
6,\ 7,\ 7,\ 8,\ 10
$$

Podemos perguntar:

- qual é o valor médio?
- qual fica no meio?
- qual aparece mais?

Essas perguntas levam a três medidas importantes: **média**, **mediana** e **moda**.

Elas são como diferentes representações de uma mesma coleção de dados. No sistema posicional, $325$ pode ser lido como $300+20+5$. Em estatística, um conjunto de dados pode ser resumido por média, mediana e moda. Cada resumo mostra uma parte da história.

## Média

A média é a soma dos valores dividida pela quantidade de valores.

Para as notas:

$$
6,\ 7,\ 7,\ 8,\ 10
$$

Somamos:

$$
6+7+7+8+10=38
$$

Há $5$ notas. Então:

$$
\text{média}=\frac{38}{5}=7,6
$$

A média funciona como um ponto de equilíbrio.

## Mediana

A mediana é o valor central quando os dados estão em ordem.

No conjunto:

$$
6,\ 7,\ 7,\ 8,\ 10
$$

O valor do meio é:

$$
7
$$

Então a mediana é $7$.

Se houver quantidade par de dados, a mediana é a média dos dois valores centrais.

Exemplo:

$$
4,\ 6,\ 8,\ 10
$$

Os dois valores centrais são $6$ e $8$.

$$
\text{mediana}=\frac{6+8}{2}=7
$$

## Moda

A moda é o valor que mais aparece.

No conjunto:

$$
6,\ 7,\ 7,\ 8,\ 10
$$

O número $7$ aparece duas vezes. Os outros aparecem uma vez.

Logo, a moda é $7$.

Um conjunto pode:

- ter uma moda;
- ter mais de uma moda;
- não ter moda, se todos aparecem o mesmo número de vezes.

## Comparando as três medidas

Use o conjunto:

$$
2,\ 3,\ 3,\ 4,\ 18
$$

| Medida | Cálculo | Resultado |
|---|---|---:|
| média | $\frac{2+3+3+4+18}{5}$ | $6$ |
| mediana | valor central de $2,3,3,4,18$ | $3$ |
| moda | valor mais frequente | $3$ |

A média ficou $6$ por causa do valor $18$, que é muito maior que os outros.

A mediana e a moda ficaram $3$, mostrando melhor o centro do grupo mais comum.

Por isso, não existe uma única medida "sempre melhor". Depende da pergunta.

## Quando usar cada uma?

| Situação | Medida útil | Por quê |
|---|---|---|
| notas sem valores extremos | média | resume bem o desempenho geral |
| renda de pessoas com valores muito altos | mediana | evita distorção por extremos |
| tamanho de camiseta mais vendido | moda | mostra o valor mais frequente |
| tempo típico de espera com alguns atrasos enormes | mediana | representa melhor o caso comum |

## Passo a passo seguro

Para não se perder:

1. coloque os dados em ordem crescente;
2. conte quantos dados existem;
3. calcule a média pela soma dividida pela quantidade;
4. encontre a mediana no centro;
5. conte repetições para achar a moda.

## Exercícios sugeridos

1. Calcule média, mediana e moda de $5, 6, 6, 7, 9$.
2. Calcule média e mediana de $2, 4, 8, 10$.
3. Em $1, 2, 2, 3, 3, 4$, há uma única moda? Explique.
4. Um aluno tirou $4$, $9$ e $10$. Qual foi a média?
5. Crie um conjunto em que a média seja maior que a mediana por causa de um valor extremo.
