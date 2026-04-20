---
id: sistema-numerico-posicional
topicId: natural-numbers
title: Sistema Numérico Posicional
difficulty: Fácil
estimatedMinutes: 35
order: 0
summary: Explica como algarismos, posições, ordens, classes e bases formam números no sistema posicional.
status: ready
goals:
  - Diferenciar algarismo, dígito e número
  - Entender valor absoluto e valor relativo
  - Ler ordens e classes no sistema decimal
  - Representar números em outras bases
prerequisites:
  - Contagem básica
  - Leitura dos algarismos de 0 a 9
tags:
  - valor-posicional
  - sistema-decimal
  - bases-numericas
canonicalIds:
  - NUM.01.01
  - NUM.01.02
  - NUM.01.03
  - NUM.01.04
  - NUM.01.05
  - NUM.01.07
---
# Sistema Numérico Posicional

## Introdução

Imagine que, para cada quantidade diferente, fosse necessário inventar um símbolo novo.

Um símbolo para um objeto. Outro símbolo para dois objetos. Outro para três. Outro para cinquenta. Outro para mil. Em pouco tempo, a escrita dos números ficaria impossível de memorizar.

A grande ideia de um sistema numérico posicional é evitar esse problema. Em vez de criar um símbolo diferente para cada quantidade, escolhemos poucos símbolos e combinamos esses símbolos em posições diferentes.

No sistema decimal, usamos dez símbolos:

$$
0,\ 1,\ 2,\ 3,\ 4,\ 5,\ 6,\ 7,\ 8,\ 9
$$

Com apenas esses dez símbolos conseguimos escrever números pequenos, como $7$, e números muito grandes, como $2\,508\,913$.

O segredo não está só nos símbolos. Está principalmente no lugar que cada símbolo ocupa.

Pense no número $32$. Ele usa os mesmos símbolos que o número $23$: o $2$ e o $3$. Mesmo assim, $32$ e $23$ não representam a mesma quantidade. A diferença está na posição. Em $32$, o $3$ vale três dezenas. Em $23$, o $3$ vale três unidades.

Por isso, em um sistema posicional, o valor de cada algarismo depende de duas coisas:

1. o símbolo usado;
2. a posição que esse símbolo ocupa.

Essa é a intuição principal. A fórmula abaixo só escreve essa ideia com linguagem matemática:

$$
(a_n a_{n-1}\ldots a_2a_1a_0)_b
=
a_n\cdot b^n + a_{n-1}\cdot b^{n-1}+\ldots+a_2\cdot b^2+a_1\cdot b^1+a_0\cdot b^0
$$

Nessa fórmula:

- $b$ é a **base** do sistema;
- cada $a_i$ é um **algarismo** permitido nessa base;
- o expoente mostra a **posição** do algarismo;
- o valor total é a soma dos valores de cada posição.

No sistema decimal, a base é $10$. Por isso, cada posição vale uma potência de $10$:

$$
10^0 = 1,\quad 10^1 = 10,\quad 10^2 = 100,\quad 10^3 = 1000
$$

Por exemplo:

$$
325 = 3\cdot 10^2 + 2\cdot 10^1 + 5\cdot 10^0
$$

Logo:

$$
325 = 300 + 20 + 5
$$

Essa decomposição mostra por que o algarismo $3$, no número $325$, vale $300$, e não apenas $3$.

Mais adiante, vamos usar símbolos estranhos, como `#`, `$` e `@`, para mostrar algo importante: $0$, $1$ e $2$ não são a essência do sistema. Eles são símbolos escolhidos. A essência é a regra posicional.

## Algarismos e Dígitos

Observe estes símbolos:

$$
1,\ 5,\ 9,\ A,\ b,\ K,\ \#,\ @
$$

Os símbolos $1$, $5$ e $9$ são algarismos do sistema decimal. Os símbolos $A$, $b$ e $K$ são letras. Os símbolos $\#$ e $@$ são sinais usados em outros contextos, como computadores, senhas ou endereços digitais.

Um símbolo só ganha significado completo dentro de um sistema. A letra "a", por exemplo, pode ser apenas uma letra, mas também pode formar a palavra "asa" quando combinada com outras letras. Da mesma forma, o algarismo $2$ pode representar a quantidade dois sozinho, mas também pode participar de números como $20$, $203$ ou $2\,500$.

No dia a dia, é comum chamar os símbolos $0$, $1$, $2$, $3$, $4$, $5$, $6$, $7$, $8$ e $9$ de "números". Tecnicamente, porém, é melhor separar:

- **algarismo** ou **dígito**: cada símbolo usado para escrever números;
- **número**: a quantidade ou valor representado por um ou mais algarismos.

Exemplos:

| Escrita | O que aparece | Quantos algarismos? | Valor representado |
|---|---|---|---|
| $7$ | um algarismo | 1 | sete |
| $42$ | dois algarismos | 2 | quarenta e dois |
| $508$ | três algarismos | 3 | quinhentos e oito |

Assim, $508$ é um número escrito com três algarismos: $5$, $0$ e $8$.

### Exercícios de verificação

1. No número $704$, quais são os algarismos usados?
2. Quantos algarismos há em $19\,030$?
3. Em "João mora no apartamento 302", o símbolo $302$ está sendo usado para indicar quantidade, código ou posição? Explique.
4. A placa "BR-101" usa algarismos. Eles representam uma quantidade comum? Por quê?

## Valor Absoluto e Valor Relativo

A primeira regra para compreender números posicionais é diferenciar o **valor absoluto** do **valor relativo** de um algarismo.

O **valor absoluto** é o valor próprio do algarismo, independentemente da posição em que ele aparece.

Exemplos:

- em "Maria correu $4$ km", o algarismo $4$ representa quatro;
- em "as $4$ estações do ano", o algarismo $4$ representa quatro;
- em "caminhonete $4$ por $4$", cada algarismo $4$ continua tendo valor absoluto quatro.

O **valor relativo** é o valor que o algarismo assume dentro de um número, de acordo com sua posição.

Compare estes quatro números:

$$
N_1 = 2,\quad N_2 = 3,\quad N_3 = 32,\quad N_4 = 23
$$

Nos números $N_1$ e $N_2$, os algarismos estão sozinhos. Então, nesses casos, valor absoluto e valor relativo coincidem:

$$
2 = 2\cdot 1
$$

$$
3 = 3\cdot 1
$$

Mas nos números $32$ e $23$ a posição muda tudo.

No número $32$:

| Algarismo | Valor absoluto | Posição | Valor relativo |
|---|---|---|---|
| $3$ | $3$ | dezenas | $30$ |
| $2$ | $2$ | unidades | $2$ |

Portanto:

$$
32 = 3\cdot 10 + 2\cdot 1 = 30 + 2
$$

No número $23$:

| Algarismo | Valor absoluto | Posição | Valor relativo |
|---|---|---|---|
| $2$ | $2$ | dezenas | $20$ |
| $3$ | $3$ | unidades | $3$ |

Portanto:

$$
23 = 2\cdot 10 + 3\cdot 1 = 20 + 3
$$

Os mesmos algarismos, $2$ e $3$, formam números diferentes porque trocaram de posição.

Esse é o ponto central do sistema posicional: a posição do algarismo altera seu valor relativo.

### Exercícios de verificação

1. No número $64$, qual é o valor absoluto do algarismo $6$? E o valor relativo?
2. No número $46$, qual é o valor absoluto do algarismo $6$? E o valor relativo?
3. Explique por que $64$ e $46$ são diferentes mesmo usando os mesmos algarismos.
4. No texto "A linha 7 do ônibus custa 7 reais", os dois algarismos $7$ têm o mesmo uso? Explique.
5. Em $909$, o algarismo $9$ aparece duas vezes. O valor relativo dele é o mesmo nas duas posições?

## Ordem

Chamamos de **ordem** cada posição ocupada por um algarismo dentro de um número.

No sistema decimal, as ordens crescem da direita para a esquerda:

| Posição | Ordem | Valor da posição |
|---|---|---|
| 1ª | unidade | $10^0 = 1$ |
| 2ª | dezena | $10^1 = 10$ |
| 3ª | centena | $10^2 = 100$ |
| 4ª | unidade de milhar | $10^3 = 1000$ |
| 5ª | dezena de milhar | $10^4 = 10\,000$ |
| 6ª | centena de milhar | $10^5 = 100\,000$ |

Observe o número:

$$
47\,582
$$

Da direita para a esquerda:

| Algarismo | Ordem | Valor relativo |
|---|---|---|
| $2$ | unidade | $2$ |
| $8$ | dezena | $80$ |
| $5$ | centena | $500$ |
| $7$ | unidade de milhar | $7\,000$ |
| $4$ | dezena de milhar | $40\,000$ |

Então:

$$
47\,582 = 40\,000 + 7\,000 + 500 + 80 + 2
$$

Perceba que a leitura do número depende das ordens. O algarismo $4$ está na dezena de milhar, por isso vale $40\,000$. Se ele estivesse na unidade, valeria apenas $4$.

### Exercícios de verificação

1. Decomponha $3\,418$ em soma de valores relativos.
2. No número $52\,706$, qual algarismo ocupa a ordem das centenas?
3. No número $8\,305$, qual é o valor relativo do algarismo $8$?
4. Escreva um número de quatro algarismos em que o algarismo $6$ esteja na ordem das centenas.
5. O que muda entre $7\,012$ e $70\,012$?

## Classe

As ordens são agrupadas em conjuntos de três. Cada grupo de três ordens recebe o nome de **classe**.

No sistema decimal:

| Classe | Ordens |
|---|---|
| unidades simples | unidade, dezena, centena |
| milhares | unidade de milhar, dezena de milhar, centena de milhar |
| milhões | unidade de milhão, dezena de milhão, centena de milhão |
| bilhões | unidade de bilhão, dezena de bilhão, centena de bilhão |

As classes ajudam a ler números grandes.

Observe:

$$
384\,726\,105
$$

Separando em classes:

$$
\boxed{384}\ \boxed{726}\ \boxed{105}
$$

Lemos:

> trezentos e oitenta e quatro milhões, setecentos e vinte e seis mil, cento e cinco.

Cada bloco de três algarismos é lido como um grupo:

- $384$: classe dos milhões;
- $726$: classe dos milhares;
- $105$: classe das unidades simples.

Sem as classes, a leitura de números grandes fica muito mais difícil.

### Exercícios de verificação

1. Separe $45\,891$ em classes.
2. Separe $7\,305\,004$ em classes e leia o número em voz alta.
3. Em $920\,140\,003$, qual é a classe do grupo $920$?
4. Qual grupo representa a classe dos milhares em $18\,450\,209$?
5. Escreva um número que tenha classe dos milhões, dos milhares e das unidades simples.

## Outras Bases

O sistema decimal usa base $10$, mas ele não é o único sistema posicional possível.

Em uma base $b$, usamos $b$ algarismos diferentes. Geralmente escolhemos os símbolos de $0$ até $b-1$, mas isso é uma convenção. O que a base exige é a quantidade de símbolos, não quais símbolos eles precisam ser.

Exemplos:

| Base | Algarismos permitidos | Nome comum |
|---|---|---|
| $2$ | $0, 1$ | binária |
| $3$ | $0, 1, 2$ | ternária |
| $8$ | $0,1,2,3,4,5,6,7$ | octal |
| $10$ | $0,1,2,3,4,5,6,7,8,9$ | decimal |

O número escrito como $101$ pode representar valores diferentes dependendo da base.

Na base $10$:

$$
(101)_{10} = 1\cdot 10^2 + 0\cdot 10^1 + 1\cdot 10^0 = 101
$$

Na base $2$:

$$
(101)_2 = 1\cdot 2^2 + 0\cdot 2^1 + 1\cdot 2^0 = 4 + 0 + 1 = 5
$$

Na base $3$:

$$
(101)_3 = 1\cdot 3^2 + 0\cdot 3^1 + 1\cdot 3^0 = 9 + 0 + 1 = 10
$$

Portanto, a escrita $101$ sozinha é ambígua. Para evitar confusão, indicamos a base com um índice:

$$
(101)_2,\quad (101)_3,\quad (101)_{10}
$$

### Exercícios de verificação

1. Quais algarismos são permitidos na base $4$?
2. O número $(12)_3$ é válido? E o número $(13)_3$?
3. Calcule o valor decimal de $(21)_3$.
4. Calcule o valor decimal de $(110)_2$.
5. Explique por que $(29)_8$ não é uma escrita válida na base $8$.

## Conversões entre Bases

Quando trabalhamos com bases diferentes, precisamos deixar claro em qual base o número está escrito.

A convenção mais comum é escrever a base como índice:

| Escrita | Leitura |
|---|---|
| $(101)_2$ | $101$ escrito na base $2$ |
| $(101)_3$ | $101$ escrito na base $3$ |
| $(101)_{10}$ | $101$ escrito na base $10$ |

Em texto puro, algumas pessoas escrevem algo como `(101)2`, mas a notação com índice, $(101)_2$, é mais clara.

### De uma base qualquer para decimal

Para converter um número da base $b$ para a base decimal, usamos a decomposição posicional.

Exemplo com base $2$:

$$
(1101)_2
$$

Da direita para a esquerda, as posições valem:

| Algarismo | Posição | Valor da posição | Contribuição |
|---|---|---|---|
| $1$ | $2^0$ | $1$ | $1\cdot 1=1$ |
| $0$ | $2^1$ | $2$ | $0\cdot 2=0$ |
| $1$ | $2^2$ | $4$ | $1\cdot 4=4$ |
| $1$ | $2^3$ | $8$ | $1\cdot 8=8$ |

Somando as contribuições:

$$
(1101)_2 = 1\cdot 2^3 + 1\cdot 2^2 + 0\cdot 2^1 + 1\cdot 2^0
$$

$$
(1101)_2 = 8 + 4 + 0 + 1 = 13
$$

Então:

$$
(1101)_2 = (13)_{10}
$$

Essa conversão é muito comum hoje porque computadores usam base $2$. Cada posição binária é uma potência de $2$: $1$, $2$, $4$, $8$, $16$, $32$, $64$, e assim por diante.

Outro exemplo, agora em base $3$:

$$
(212)_3 = 2\cdot 3^2 + 1\cdot 3^1 + 2\cdot 3^0
$$

$$
(212)_3 = 18 + 3 + 2 = 23
$$

Logo:

$$
(212)_3 = (23)_{10}
$$

### Do decimal para outra base

Para converter um número decimal para outra base, fazemos divisões sucessivas pela base desejada e guardamos os restos.

Exemplo: converter $(13)_{10}$ para base $2$.

| Divisão | Quociente | Resto |
|---|---|---|
| $13\div 2$ | $6$ | $1$ |
| $6\div 2$ | $3$ | $0$ |
| $3\div 2$ | $1$ | $1$ |
| $1\div 2$ | $0$ | $1$ |

Agora lemos os restos de baixo para cima:

$$
1,\ 1,\ 0,\ 1
$$

Portanto:

$$
(13)_{10} = (1101)_2
$$

Exemplo: converter $(25)_{10}$ para base $3$.

| Divisão | Quociente | Resto |
|---|---|---|
| $25\div 3$ | $8$ | $1$ |
| $8\div 3$ | $2$ | $2$ |
| $2\div 3$ | $0$ | $2$ |

Lendo os restos de baixo para cima:

$$
2,\ 2,\ 1
$$

Logo:

$$
(25)_{10} = (221)_3
$$

### De uma base para outra

Quando a conversão é de uma base não decimal para outra base não decimal, o caminho mais didático é usar a base decimal como ponte.

Por exemplo, para converter $(1011)_2$ para base $3$:

1. converta $(1011)_2$ para decimal;
2. converta o resultado decimal para base $3$.

Primeiro:

$$
(1011)_2 = 1\cdot 2^3 + 0\cdot 2^2 + 1\cdot 2^1 + 1\cdot 2^0
$$

$$
(1011)_2 = 8 + 0 + 2 + 1 = 11
$$

Agora convertemos $(11)_{10}$ para base $3$:

| Divisão | Quociente | Resto |
|---|---|---|
| $11\div 3$ | $3$ | $2$ |
| $3\div 3$ | $1$ | $0$ |
| $1\div 3$ | $0$ | $1$ |

Restos de baixo para cima:

$$
1,\ 0,\ 2
$$

Então:

$$
(1011)_2 = (102)_3
$$

### Exercícios de verificação

1. Converta $(101)_2$ para decimal.
2. Converta $(1110)_2$ para decimal.
3. Converta $(20)_{10}$ para base $2$.
4. Converta $(14)_{10}$ para base $3$.
5. Converta $(100)_3$ para decimal.
6. Converta $(22)_3$ para base $2$, usando o decimal como ponte.

## Construindo o Sistema `#$@`

Agora vamos abandonar, de propósito, os algarismos usuais da base ternária.

Neste sistema, os únicos algarismos permitidos são:

```text
#   $   @
```

Vou chamar esse sistema de `#$@`.

Aqui, note: não existe um algarismo chamado `3`, e também não estamos usando os símbolos `0`, `1` e `2` para escrever os números do próprio sistema. O alfabeto inteiro do sistema é só `#`, `$` e `@`.

O que torna o sistema `#$@` uma base de três símbolos é isto:

- em cada posição, só cabem `#`, `$` ou `@`;
- depois de `@`, não aparece um quarto símbolo;
- quando passa de `@`, a contagem cria uma nova posição à esquerda.

Para comparar com o decimal, podemos dizer que os símbolos têm estes papéis:

| Símbolo do sistema `#$@` | Papel dentro da posição |
|---|---|
| `#` | nenhum grupo daquela posição |
| `$` | um grupo daquela posição |
| `@` | dois grupos daquela posição |

Mas, dentro do sistema `#$@`, pense assim: `#` não é "o zero bonitinho", `$` não é "o um fantasiado", e `@` não é "o dois com outro desenho". Eles são os algarismos reais do sistema.

As posições continuam sendo posicionais. Da direita para a esquerda:

| Posição no sistema `#$@` | O que a posição conta |
|---|---|
| primeira posição | unidades soltas |
| segunda posição | grupos de três unidades |
| terceira posição | grupos de três grupos de três unidades |
| quarta posição | grupos de três grupos de três grupos de três unidades |

Agora conte usando só o sistema `#$@`:

| Quantidade falada em português | Escrita no sistema `#$@` |
|---|---|
| nada | `#` |
| uma unidade | `$` |
| duas unidades | `@` |
| um grupo de três e nada solto | `$#` |
| um grupo de três e uma unidade solta | `$$` |
| um grupo de três e duas unidades soltas | `$@` |
| dois grupos de três e nada solto | `@#` |
| dois grupos de três e uma unidade solta | `@$` |
| dois grupos de três e duas unidades soltas | `@@` |
| um grupo de nove e nada depois | `$##` |
| um grupo de nove, nada no meio e uma unidade solta | `$#$` |

Perceba o momento importante:

```text
#, $, @, $#, $$, $@, @#, @$, @@, $##, ...
```

Depois de `@`, não vem um novo algarismo. Vem `$#`.

Por quê?

Porque `@` já é o maior algarismo disponível em uma posição. Se aparece mais uma unidade depois de `@`, a posição da direita volta para `#`, e a posição da esquerda sobe para `$`.

É a mesma lógica que faz, no decimal, depois de $9$ vir $10$. Só que aqui os símbolos são outros:

```text
@  ->  $#
@@ ->  $##
```

Na escrita `@@`, temos dois grupos de três e duas unidades soltas. Se acrescentamos mais uma unidade, as unidades soltas completam um novo grupo de três. Por isso `@@` vira `$##`: um grupo de nove, nenhum grupo de três solto, nenhuma unidade solta.

### Lendo `@$@`

Agora vamos ler uma escrita maior:

```text
@$@
```

Da direita para a esquerda:

| Símbolo | Posição | Interpretação |
|---|---|---|
| `@` | unidades soltas | duas unidades |
| `$` | grupos de três | um grupo de três |
| `@` | grupos de nove | dois grupos de nove |

Então `@$@` significa:

```text
dois grupos de nove + um grupo de três + duas unidades
```

Em decimal, só para comparar com nosso sistema usual:

$$
\texttt{@\$@}=2\cdot 9 + 1\cdot 3 + 2\cdot 1 = 23
$$

Logo:

$$
\texttt{@\$@} = (23)_{10}
$$

O ponto principal é: a conta decimal aparece apenas como tradução. A escrita própria do sistema inventado é `@$@`.

### Convertendo entre decimal e `#$@`

Se quisermos converter uma quantidade decimal para o sistema `#$@`, podemos usar o mesmo método das divisões sucessivas por três. A diferença é que, no final, trocamos os restos pelos símbolos:

| Resto decimal | Símbolo em `#$@` |
|---|---|
| $0$ | `#` |
| $1$ | `$` |
| $2$ | `@` |

Exemplo: converter $(23)_{10}$ para `#$@`.

| Divisão | Quociente | Resto | Símbolo |
|---|---|---|---|
| $23\div 3$ | $7$ | $2$ | `@` |
| $7\div 3$ | $2$ | $1$ | `$` |
| $2\div 3$ | $0$ | $2$ | `@` |

Lendo os símbolos de baixo para cima:

```text
@ $ @
```

Portanto:

$$
(23)_{10} = \texttt{@\$@}
$$

Agora a ideia fica bem nítida: converter para `#$@` não é escrever $(212)_3$ e depois "decorar". A escrita final do sistema inventado é `@$@`.

### Binário com símbolos inventados

A mesma ideia funcionaria em base $2$.

Uma base $2$ precisa de dois símbolos. Normalmente usamos $0$ e $1$, mas poderíamos escolher apenas:

```text
#   $
```

Nesse sistema binário inventado:

| Símbolo | Papel |
|---|---|
| `#` | nenhum grupo daquela posição |
| `$` | um grupo daquela posição |

A contagem ficaria:

| Quantidade falada em português | Escrita binária com `#` e `$` |
|---|---|
| nada | `#` |
| uma unidade | `$` |
| um grupo de duas e nada solto | `$#` |
| um grupo de duas e uma unidade solta | `$$` |
| um grupo de quatro e nada depois | `$##` |
| um grupo de quatro e uma unidade solta | `$#$` |

Isso mostra que "binário" não significa obrigatoriamente usar os desenhos $0$ e $1$. Binário significa usar duas possibilidades em cada posição.

### Exercícios de verificação

1. Continue a contagem do sistema `#$@` por mais cinco linhas depois de `$#$`.
2. Explique por que depois de `@` vem `$#`.
3. Leia `@$` usando a ideia de grupos de três e unidades soltas.
4. Leia `@#@` usando a ideia de grupos de nove, grupos de três e unidades soltas.
5. Converta $(14)_{10}$ para o sistema `#$@`.
6. Se uma base $2$ usasse `A` para "nenhum grupo" e `B` para "um grupo", como ficariam as cinco primeiras escritas?

## Fechamento

O sistema numérico posicional permite escrever infinitos números usando poucos algarismos. A ideia central é simples, mas poderosa: cada algarismo tem um valor próprio e um valor que depende da posição.

No sistema decimal, as posições são potências de $10$. Em outras bases, as posições são potências da base escolhida. Por isso, compreender valor absoluto, valor relativo, ordem, classe e base é essencial para ler números com segurança e para entender conteúdos futuros, como operações, potências, notação científica e sistemas de computação.
