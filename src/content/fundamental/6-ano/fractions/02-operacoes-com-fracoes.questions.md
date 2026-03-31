---
lessonId: "fractions-operations"
source: "TQM - Frações.pdf"
defaultType: "self-check"
defaultSection: "Operações e problemas"
defaultHint: "Antes de operar, veja se precisa igualar denominadores ou inverter a segunda fração."
---
## Questão 14
### Enunciado
Em um campeonato de futebol, o jogador Bromário fez 21 gols, o equivalente a $\frac{3}{5}$ do número de gols marcado pelo jogador Bedmundo. Quantos gols marcou o segundo jogador?

### Resposta
`35`

## Questão 15
### Enunciado
Carlos só pode pagar $\frac{2}{5}$ de uma dívida. Se possuísse mais R$ 10.200,00, poderia pagar 70% desta mesma dívida. Quanto Carlos devia?

### Resposta
R$ 34.000,00.

## Questão 16
### Enunciado
As despesas mensais de um funcionário são: $\frac{3}{5}$ do ordenado com aluguel da casa; $\frac{1}{3}$ do resto com outras obrigações. Além desses gastos, ainda tem que pagar R$ 540,00 por mês de compras feitas pela esposa. Como seu ordenado não cobria todas essas despesas, o funcionário teve que fazer um empréstimo mensal de R$ 200,00 até liquidar a dívida total da esposa. Qual o ordenado do funcionário?

### Resposta
R$ 1.275,00.

## Questão 17
### Enunciado
Que dia é hoje, se à metade dos dias transcorridos desde o início do ano adicionarmos a terça parte dos dias que ainda faltam para o seu término e encontrarmos o número de dias que já passou?

### Resposta
26 de maio.

## Questão 18
### Enunciado
Azarildo foi assaltado por um ladrão "camarada", o qual, ao anunciar o assalto, pediu-lhe apenas $\frac{3}{7}$ da quantia que carregava no bolso. Se a desafortunada vítima, após tal acontecimento, ainda ficou com R$ 480,00, qual a quantia roubada?

### Resposta
R$ 360,00.

## Questão 19
### Enunciado
Um pedreiro levanta um muro em 12 dias e um outro executa o mesmo serviço em 4 dias. Em quantos dias, os dois juntos, levantarão um muro idêntico?

### Resposta
3 dias.

## Questão 20
### Enunciado
Uma torneira enche um reservatório em 4 horas enquanto outra enche o mesmo reservatório em 6 horas. Estando o reservatório vazio e abrindo-se as duas simultaneamente, em quanto tempo elas encherão juntas esse reservatório?

### Resposta
2 h 24 min.

### Solução
```json
{
  "mode": "step-by-step",
  "summary": "Transforme cada torneira em taxa de enchimento por hora, some as frações usando MMC e depois inverta a taxa conjunta para obter o tempo.",
  "steps": [
    {
      "type": "markdown",
      "title": "Escreva a taxa de cada torneira",
      "content": "Em 1 hora, a primeira torneira enche `1/4` do reservatório e a segunda enche `1/6`."
    },
    {
      "type": "algorithm",
      "layout": "mmc",
      "title": "Encontre o MMC de 4 e 6",
      "lines": [
        "2 | 4  6",
        "2 | 2  3",
        "3 | 1  3",
        "  | 1  1"
      ],
      "result": "MMC(4, 6) = 12"
    },
    {
      "type": "equation",
      "title": "Some as frações equivalentes",
      "content": "$$\\frac{1}{4} + \\frac{1}{6} = \\frac{3}{12} + \\frac{2}{12} = \\frac{5}{12}$$"
    },
    {
      "type": "scratchpad",
      "title": "Interprete a taxa conjunta",
      "lines": [
        "Em 1 hora as duas juntas enchem 5/12 do reservatório.",
        "Então o tempo total é 1 ÷ (5/12)."
      ]
    },
    {
      "type": "equation",
      "title": "Calcule o tempo final",
      "content": "$$1 \\div \\frac{5}{12} = \\frac{12}{5}\\text{ h} = 2\\text{ h }24\\text{ min}$$"
    }
  ]
}
```

## Questão 21
### Enunciado
Uma torneira pode encher um reservatório em 6 horas e o ralo pode esvaziá-lo em 9 horas. Estando o reservatório vazio, abre-se simultaneamente a torneira e o ralo. Se esse reservatório é um paralelepípedo de altura 12 m, após 3 horas, a que altura se encontra o nível d'água em seu interior?

### Resposta
2 m.

## Questão 22
### Enunciado
Uma torneira enche um tanque em 6 horas, outra torneira enche o mesmo tanque em 4 horas e um ralo pode esvaziá-lo totalmente em 3 horas. Estando o tanque vazio e abrindo-se, ao mesmo tempo, as duas torneiras e o ralo, em quanto tempo o tanque encherá?

### Resposta
12 h.

## Questão 23
### Enunciado
Uma torneira enche um reservatório em 24 horas, outra em 36 horas e uma terceira o faz em $x$ horas. Estando o reservatório vazio e abertas as três torneiras simultaneamente, ele enche totalmente após 8 horas. Determine o valor de $x$.

### Resposta
18 h.

## Questão 24
### Enunciado
Após a morte de Aguiar, aberto o seu testamento, esta era a sua vontade: "Deixo $\frac{2}{5}$ de meu patrimônio, mais R$ 3.000.000,00 para meu filho Edgar; deixo $\frac{2}{3}$ do resto, mais R$ 6.000.000,00 para minha sogra Cascavélia; e os R$ 5.000.000,00 restantes deixo para o meu gato Mimi". Qual era o patrimônio de Aguiar?

### Resposta
R$ 60.000.000,00.

## Questão 25
### Enunciado
Um sargento aplicou $\frac{1}{3}$ de suas economias na caderneta de poupança, $\frac{2}{5}$ em ações e os R$ 1.200,00 restantes deixou em sua conta corrente. Quanto ele aplicou em ações?

### Resposta
R$ 1.800,00.

## Questão 26
### Enunciado
Para prestar uma prova de português tive que ler um certo livro em três dias: no primeiro dia li a metade do livro; no segundo dia li mais 32 páginas; e no terceiro li o que faltava, ou seja, a quarta parte do livro. Quantas páginas tinha esse livro?

### Resposta
`128`

## Questão 27
### Enunciado
Dona Benta comprou certo número de ovos na feira. Na volta para casa escorregou e um terço dos ovos se quebrou. Ao chegar a casa usou $\frac{1}{5}$ dos ovos restantes para fazer um bolo e observou que sobraram ainda 20 ovos. Quantos ovos ela havia comprado?

### Resposta
`48`

## Questão 28
### Enunciado
Dona Maricota, eficiente secretária de dois advogados, comprou certa quantidade de clips. Com os processos do Dr. Tancredo ela gastou $\frac{1}{5}$ dos clips e com os do Dr. Pascácio $\frac{17}{35}$ do restante. Se ainda sobrou uma grosa de clips, quantos clips ela comprou?

### Resposta
`360`

## Questão 29
### Enunciado
Adquiri uma bateria para meu celular da marca "Troquia", cuja economia era de 15 horas com o telefone ligado em "stand by" ou de duas horas e meia de conversação. Às 13 horas liguei o aparelho com a bateria totalmente carregada e às 19 horas ela descarregou completamente. Durante quanto tempo eu falei nesse celular durante o período citado?

### Resposta
1 h 48 min.

## Questão 30
### Enunciado
Um tonel está cheio de vinho. Tiram-se $\frac{2}{5}$ de sua capacidade, que são substituídos por água. Em seguida retiram-se os $\frac{3}{5}$ da mistura, substituindo-os por água. Sabe-se que a quantidade de vinho restante no tonel é inferior à metade de sua capacidade em 140 litros. Qual a capacidade desse tonel?

### Resposta
1.000 litros.
