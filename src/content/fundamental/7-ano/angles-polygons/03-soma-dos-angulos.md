---
id: triangles-angles
topicId: angles-polygons
title: Soma dos Ângulos e Triângulos
difficulty: Médio
estimatedMinutes: 17
order: 3
summary: Relaciona soma dos ângulos internos, ângulos externos e classificação de triângulos.
status: ready
goals:
  - Aplicar soma dos ângulos internos
  - Classificar triângulos
  - Resolver problemas geométricos
prerequisites:
tags:
canonicalIds:
  - GEO.02.05
  - GEO.02.06
  - GEO.03.04
  - GEO.03.05
---
# Soma dos Ângulos e Triângulos

Triângulos são os polígonos mais simples: têm 3 lados, 3 vértices e 3 ângulos internos.

A propriedade mais importante nesta etapa é:

$$
\text{soma dos ângulos internos de um triângulo} = 180^\circ
$$

Isso vale para qualquer triângulo: grande, pequeno, equilátero, escaleno, retângulo ou obtusângulo.

## Usando a soma dos ângulos

Se dois ângulos de um triângulo medem $50^\circ$ e $70^\circ$, o terceiro mede:

$$
180^\circ - 50^\circ - 70^\circ = 60^\circ
$$

Então o terceiro ângulo é $60^\circ$.

## Triângulo equilátero

Um triângulo equilátero tem os três lados iguais. Por consequência, os três ângulos também são iguais.

Como a soma é $180^\circ$:

$$
\frac{180^\circ}{3}=60^\circ
$$

Todo triângulo equilátero tem três ângulos de $60^\circ$.

## Classificação quanto aos lados

| Tipo | Característica |
| --- | --- |
| equilátero | 3 lados iguais |
| isósceles | 2 lados iguais |
| escaleno | 3 lados diferentes |

No triângulo isósceles, os ângulos da base são iguais.

Exemplo:

Um triângulo isósceles tem ângulo do vértice medindo $40^\circ$. Os outros dois são iguais.

$$
180^\circ - 40^\circ = 140^\circ
$$

Dividindo entre os dois ângulos da base:

$$
\frac{140^\circ}{2}=70^\circ
$$

Logo, os ângulos são $40^\circ$, $70^\circ$ e $70^\circ$.

## Classificação quanto aos ângulos

| Tipo | Característica |
| --- | --- |
| acutângulo | 3 ângulos agudos |
| retângulo | 1 ângulo reto |
| obtusângulo | 1 ângulo obtuso |

Um triângulo não pode ter dois ângulos retos, porque dois ângulos de $90^\circ$ já somariam $180^\circ$ e não sobraria medida para o terceiro.

## Soma dos ângulos internos de polígonos

Todo polígono pode ser dividido em triângulos a partir de um vértice.

Por isso, a soma dos ângulos internos de um polígono de $n$ lados é:

$$
S = (n-2)\cdot 180^\circ
$$

Exemplo: quadrilátero.

$$
S = (4-2)\cdot 180^\circ = 360^\circ
$$

Exemplo: pentágono.

$$
S = (5-2)\cdot 180^\circ = 540^\circ
$$

## Ângulos externos

Em um polígono convexo, a soma dos ângulos externos, tomando um em cada vértice, é sempre:

$$
360^\circ
$$

Isso ajuda em problemas com polígonos regulares. Em um hexágono regular, por exemplo, cada ângulo externo mede:

$$
\frac{360^\circ}{6}=60^\circ
$$

## Exemplo completo

Um pentágono tem quatro ângulos medindo $100^\circ$, $110^\circ$, $95^\circ$ e $120^\circ$. Qual é o quinto ângulo?

Primeiro, calcule a soma interna do pentágono:

$$
S = (5-2)\cdot180^\circ = 540^\circ
$$

Agora some os quatro conhecidos:

$$
100^\circ+110^\circ+95^\circ+120^\circ = 425^\circ
$$

Então o quinto ângulo é:

$$
540^\circ - 425^\circ = 115^\circ
$$

## Erros comuns

- usar $360^\circ$ como soma interna de qualquer polígono;
- esquecer que triângulo sempre soma $180^\circ$;
- confundir ângulo interno com externo;
- achar que todo triângulo isósceles é equilátero.

## Prática guiada

1. Um triângulo tem ângulos $30^\circ$ e $80^\circ$. Qual é o terceiro?
2. Um triângulo equilátero tem ângulos de quantos graus?
3. Um quadrilátero tem três ângulos de $90^\circ$. Quanto mede o quarto?
4. Qual é a soma interna de um hexágono?
5. Qual é cada ângulo externo de um octógono regular?

## Ideia para guardar

Triângulos somam $180^\circ$. Polígonos maiores podem ser divididos em triângulos, por isso a fórmula $(n-2)\cdot180^\circ$ aparece naturalmente.
