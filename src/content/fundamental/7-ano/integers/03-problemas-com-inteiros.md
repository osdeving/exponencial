---
id: integers-problems
topicId: integers
title: Problemas com Inteiros
difficulty: Médio
estimatedMinutes: 18
order: 3
summary: Modela problemas de temperatura, saldo, altitude e variações positivas ou negativas.
status: ready
goals:
  - Modelar problemas
  - Escolher operação correta
  - Interpretar resultados
prerequisites:
tags:
canonicalIds:
  - NUM.04.07
---
# Problemas com Inteiros

Problemas com inteiros costumam aparecer quando uma quantidade pode ir para dois lados: aumentar ou diminuir, subir ou descer, ganhar ou perder.

O segredo é traduzir o texto para uma variação com sinal.

| Situação | Sinal comum |
| --- | --- |
| ganho, subida, crédito, aumento | positivo |
| perda, descida, débito, queda | negativo |
| referência, origem, nível do mar | zero |

## Modelo básico

Muitos problemas seguem esta estrutura:

$$
\text{valor final} = \text{valor inicial} + \text{variação}
$$

Se há várias variações, some todas:

$$
\text{valor final} = \text{valor inicial} + v_1 + v_2 + v_3
$$

## Exemplo 1: temperatura

Às 6h, a temperatura era $-4^\circ C$. Ao meio-dia, subiu $9^\circ C$. Qual foi a temperatura ao meio-dia?

Subida é variação positiva:

$$
-4 + 9 = 5
$$

Resposta: $5^\circ C$.

## Exemplo 2: saldo bancário

Uma pessoa tinha saldo de R$ 30. Depois pagou uma conta de R$ 48. Qual ficou o saldo?

Pagar conta é saída de dinheiro, então:

$$
30 + (-48) = -18
$$

Resposta: saldo de R$ $-18$. Isso significa dívida de 18 reais.

## Exemplo 3: altitude

Um submarino estava a $-120$ m em relação ao nível do mar. Depois subiu 35 m e desceu 18 m. Qual é a nova posição?

Subir é positivo; descer é negativo:

$$
-120 + 35 - 18 = -103
$$

Resposta: o submarino está a $-103$ m, ou seja, 103 m abaixo do nível do mar.

## Exemplo 4: jogo com pontuação

Em um jogo, Ana fez estas jogadas:

| Jogada | Pontos |
| --- | --- |
| acertou a fase 1 | $+12$ |
| errou um desafio | $-5$ |
| acertou bônus | $+8$ |
| perdeu tempo extra | $-3$ |

Pontuação total:

$$
12 - 5 + 8 - 3 = 12
$$

Ana terminou com 12 pontos.

## Como escolher a operação

Pergunte:

1. Qual é o valor inicial?
2. O texto fala de aumento ou diminuição?
3. A variação é positiva ou negativa?
4. O problema quer o valor final, a variação ou o valor inicial?

Se o problema dá o valor inicial e as mudanças, some as variações. Se dá o valor inicial e o final, subtraia para descobrir a mudança.

Exemplo:

Uma temperatura foi de $-6^\circ C$ para $2^\circ C$.

$$
2 - (-6) = 8
$$

A variação foi de $+8^\circ C$.

## Erros comuns

- ver número negativo e sempre subtrair de novo;
- esquecer que uma dívida pode ser representada por saldo negativo;
- responder só o número e não interpretar o sinal;
- trocar "subiu para" com "subiu de". Subiu para $3$ é valor final; subiu de $3$ é aumento de 3 unidades.

## Prática guiada

1. A temperatura era $-7^\circ C$ e subiu $12^\circ C$. Qual ficou?
2. Um saldo era R$ $-15$ e entrou um depósito de R$ 40. Qual ficou?
3. Um elevador estava no andar $-2$ e subiu 6 andares. Em que andar chegou?
4. Um time perdeu 3 pontos e depois ganhou 8. Qual foi a variação total?
5. Um mergulhador saiu de $-30$ m e chegou a $-12$ m. Ele subiu ou desceu? Quantos metros?

## Ideia para guardar

Problema com inteiro não é só conta: é interpretação de sentido. Antes de calcular, marque cada variação como positiva ou negativa.

## Exercícios sugeridos

1. Crie 3 exercícios diretos.
2. Adicione 2 exercícios contextualizados.
3. Feche com 1 questão de revisão.
