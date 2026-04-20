---
id: probability-basics
topicId: statistics-probability
title: Experimentos Aleatórios e Probabilidade Básica
difficulty: Médio
estimatedMinutes: 18
order: 3
summary: Trabalha espaço amostral simples e chance de eventos.
status: ready
goals:
  - Descrever espaço amostral
  - Calcular probabilidades simples
  - Interpretar resultados
prerequisites:
  - Frações
  - Porcentagem
  - Tabelas
tags:
canonicalIds:
  - DAT.04.01
  - DAT.04.02
  - DAT.04.03
  - DAT.04.04
  - DAT.04.05
  - DAT.04.06
  - DAT.04.09
---
# Experimentos Aleatórios e Probabilidade Básica

## O que é um experimento aleatório?

Um experimento aleatório é uma situação em que sabemos quais resultados podem acontecer, mas não sabemos qual deles vai acontecer em uma tentativa específica.

Exemplos:

- lançar uma moeda;
- lançar um dado;
- sortear uma carta;
- retirar uma bola de uma urna sem olhar.

Antes de lançar uma moeda, sabemos que pode sair cara ou coroa. Mas não sabemos o resultado exato daquele lançamento.

## Espaço amostral

O **espaço amostral** é o conjunto de todos os resultados possíveis.

Para uma moeda:

$$
S=\{\text{cara},\text{coroa}\}
$$

Para um dado comum:

$$
S=\{1,2,3,4,5,6\}
$$

O espaço amostral é parecido com escolher uma base ou um sistema de escrita: primeiro definimos quais símbolos ou resultados são permitidos. Depois interpretamos os acontecimentos dentro desse conjunto.

![Espaço amostral de dois lançamentos de moeda](/content-assets/fundamental/probability-sample-space.svg)

## Evento

Um **evento** é uma parte do espaço amostral.

No lançamento de um dado:

$$
S=\{1,2,3,4,5,6\}
$$

Evento "sair número par":

$$
E=\{2,4,6\}
$$

Evento "sair número maior que $4$":

$$
E=\{5,6\}
$$

Evento "sair $7$":

$$
E=\{\}
$$

Esse último é impossível em um dado comum, porque $7$ não pertence ao espaço amostral.

## Probabilidade em casos igualmente prováveis

Quando todos os resultados têm a mesma chance, usamos:

$$
P(E)=\frac{\text{número de resultados favoráveis}}{\text{número de resultados possíveis}}
$$

Exemplo: chance de sair número par em um dado.

Resultados favoráveis:

$$
\{2,4,6\}
$$

São $3$ resultados favoráveis.

Resultados possíveis:

$$
\{1,2,3,4,5,6\}
$$

São $6$ resultados possíveis.

Logo:

$$
P(\text{par})=\frac{3}{6}=\frac{1}{2}=50\%
$$

## Probabilidade de dois lançamentos de moeda

Ao lançar duas moedas ou lançar a mesma moeda duas vezes, o espaço amostral é:

$$
S=\{CC, CK, KC, KK\}
$$

Aqui, $C$ representa cara e $K$ representa coroa.

Evento "sair duas caras":

$$
E=\{CC\}
$$

Então:

$$
P(\text{duas caras})=\frac{1}{4}=25\%
$$

Evento "sair pelo menos uma cara":

$$
E=\{CC,CK,KC\}
$$

Então:

$$
P(\text{pelo menos uma cara})=\frac{3}{4}=75\%
$$

## Evento complementar

O complementar de um evento é tudo que faz o evento não acontecer.

No dado, evento "sair número maior que $4$":

$$
E=\{5,6\}
$$

Complementar:

$$
E^c=\{1,2,3,4\}
$$

Como as probabilidades somam $100\%$:

$$
P(E^c)=1-P(E)
$$

Nesse caso:

$$
P(E)=\frac{2}{6}=\frac{1}{3}
$$

$$
P(E^c)=1-\frac{1}{3}=\frac{2}{3}
$$

## Frequência não é garantia

Se a chance de sair cara é $50\%$, isso não significa que em dois lançamentos sempre sairá uma cara e uma coroa.

Probabilidade fala de tendência, não de garantia.

Em poucos lançamentos, os resultados podem oscilar bastante. Em muitos lançamentos, a frequência tende a ficar mais próxima da probabilidade teórica.

| Lançamentos | Caras observadas | Frequência de caras |
|---:|---:|---:|
| $10$ | $7$ | $70\%$ |
| $100$ | $53$ | $53\%$ |
| $1\,000$ | $508$ | $50,8\%$ |

Quanto maior o número de repetições, mais sentido faz comparar frequência observada com probabilidade esperada.

## Exercícios sugeridos

1. Escreva o espaço amostral do lançamento de um dado.
2. No dado, qual é a probabilidade de sair número maior que $2$?
3. No dado, qual é a probabilidade de sair múltiplo de $3$?
4. Em uma urna há $3$ bolas vermelhas e $2$ azuis. Qual é a probabilidade de retirar uma bola azul?
5. Ao lançar duas moedas, qual é a probabilidade de sair exatamente uma cara?
6. Explique por que $50\%$ de chance não significa alternância perfeita entre cara e coroa.
