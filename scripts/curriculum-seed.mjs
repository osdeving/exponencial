const ready = 'ready';
const outline = 'outline';

const lesson = (
  id,
  slug,
  title,
  summary,
  goals,
  {
    difficulty = 'Médio',
    estimatedMinutes = 18,
    order = 1,
    prerequisites = [],
    tags = [],
    status = outline,
    body,
  } = {},
) => ({
  id,
  slug,
  title,
  summary,
  goals,
  difficulty,
  estimatedMinutes,
  order,
  prerequisites,
  tags,
  status,
  body,
});

const topic = (
  {
    id,
    title,
    description,
    level,
    stage,
    category,
    icon,
    order,
    tags = [],
    overview,
  },
  lessons,
) => ({
  id,
  title,
  description,
  level,
  stage,
  category,
  icon,
  order,
  tags,
  overview,
  lessons,
});

const placeholderBody = (title, summary, goals) => `
# ${title}

> Estrutura pronta para conteúdo. Substitua este texto pelo tutorial completo em Markdown.

## Resumo da aula

${summary}

## Objetivos de aprendizagem

${goals.map((goal) => `- ${goal}`).join('\n')}

## Pré-requisitos

- Revise os conceitos anteriores do módulo.
- Traga exemplos curtos antes de formalizar.

## Desenvolvimento

Escreva aqui a explicação principal, exemplos resolvidos, observações e contraexemplos.

### Exemplo com KaTeX

Use fórmulas inline como $a^2 + b^2 = c^2$ ou blocos:

$$
\\frac{x+3}{2} = 5
$$

## Exercícios sugeridos

1. Crie 3 exercícios diretos.
2. Adicione 2 exercícios contextualizados.
3. Feche com 1 questão de revisão.
`;

export const curriculum = [
  topic(
    {
      id: 'natural-numbers',
      title: 'Números Naturais e Expressões',
      description: 'Leitura, comparação, múltiplos, divisores e expressões numéricas do início do Fundamental II.',
      level: 'Fundamental',
      stage: '6º ano',
      category: 'Números e Operações',
      icon: 'Hash',
      order: 10,
      tags: ['numeros', 'operacoes', 'divisibilidade'],
      overview: 'Módulo de entrada para o 6º ano com leitura numérica, operações e organização do raciocínio.',
    },
    [
      lesson('natural-numbers-reading', 'leitura-e-ordem', 'Leitura, Ordem e Valor Posicional', 'Organizar números naturais e interpretar ordens e classes.', ['Ler números grandes', 'Comparar números', 'Usar valor posicional'], { difficulty: 'Fácil', estimatedMinutes: 14, order: 1 }),
      lesson('natural-numbers-operations', 'operacoes-fundamentais', 'Operações Fundamentais e Expressões', 'Aplicar as quatro operações em expressões numéricas.', ['Resolver expressões', 'Respeitar prioridade das operações', 'Justificar etapas'], { difficulty: 'Médio', estimatedMinutes: 16, order: 2 }),
      lesson('natural-numbers-divisibility', 'multiplos-e-divisores', 'Múltiplos, Divisores e Critérios', 'Introduzir divisibilidade, primos e decomposição simples.', ['Encontrar múltiplos e divisores', 'Reconhecer números primos', 'Aplicar critérios de divisibilidade'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'fractions',
      title: 'Frações',
      description: 'Representação, equivalência, comparação e operações com frações.',
      level: 'Fundamental',
      stage: '6º ano',
      category: 'Números e Operações',
      icon: 'Divide',
      order: 20,
      tags: ['fracoes', 'racionais'],
      overview: 'Frações aparecem em leitura de partes, razões e operações. O módulo foi estruturado para crescer por lição.',
    },
    [
      lesson(
        'fractions-intro',
        'introducao-as-fracoes',
        'Introdução às Frações',
        'Apresenta a ideia de parte de um todo e a leitura de numerador e denominador.',
        ['Entender numerador e denominador', 'Ler frações no cotidiano'],
        {
          difficulty: 'Fácil',
          estimatedMinutes: 12,
          order: 1,
          status: ready,
          body: `
# O que é uma Fração?

Uma fração representa uma **parte de um todo**. Se uma pizza foi dividida em 8 pedaços e você comeu 3, então comeu **3/8**.

## Componentes

- **Numerador:** quantas partes você está considerando.
- **Denominador:** em quantas partes o todo foi dividido.

## Leituras comuns

- $1/2$ = metade
- $1/4$ = um quarto
- $3/5$ = três quintos

## Dica prática

Se o denominador aumenta, cada parte fica menor.
`,
        },
      ),
      lesson(
        'fractions-operations',
        'operacoes-com-fracoes',
        'Operações com Frações',
        'Consolida soma, subtração e multiplicação com frações.',
        ['Somar frações com mesmo denominador', 'Resolver soma com MMC'],
        {
          difficulty: 'Médio',
          estimatedMinutes: 16,
          order: 2,
          prerequisites: ['fractions-intro'],
          status: ready,
          body: `
# Somando e Subtraindo Frações

## Mesmo denominador

Quando o denominador é igual, você soma apenas os numeradores:

$\\frac{2}{7} + \\frac{3}{7} = \\frac{5}{7}$

## Denominadores diferentes

Encontre um denominador comum, geralmente pelo **MMC**.

Exemplo:

$\\frac{1}{2} + \\frac{1}{3} = \\frac{3}{6} + \\frac{2}{6} = \\frac{5}{6}$

## Multiplicação

Multiplique numerador com numerador e denominador com denominador:

$\\frac{2}{3} \\times \\frac{4}{5} = \\frac{8}{15}$
`,
        },
      ),
      lesson('fractions-equivalence', 'equivalencia-e-comparacao', 'Equivalência e Comparação de Frações', 'Mostrar quando frações representam a mesma quantidade e como comparar valores.', ['Reconhecer frações equivalentes', 'Comparar frações com segurança', 'Usar simplificação como ferramenta'], { difficulty: 'Médio', estimatedMinutes: 17, order: 3, prerequisites: ['fractions-intro'] }),
    ],
  ),
  topic(
    {
      id: 'decimal-numbers',
      title: 'Números Decimais',
      description: 'Leitura, operações, relação com frações e uso em dinheiro e medidas.',
      level: 'Fundamental',
      stage: '6º ano',
      category: 'Números e Operações',
      icon: 'Calculator',
      order: 30,
      tags: ['decimais', 'medidas', 'dinheiro'],
      overview: 'Módulo para conectar escrita decimal, medidas e aplicações cotidianas.',
    },
    [
      lesson('decimal-reading', 'leitura-e-valor-posicional', 'Leitura e Valor Posicional em Decimais', 'Introduz décimos, centésimos e milésimos.', ['Ler números decimais', 'Relacionar casas decimais', 'Comparar valores'], { difficulty: 'Fácil', estimatedMinutes: 14, order: 1 }),
      lesson('decimal-operations', 'operacoes-com-decimais', 'Operações com Números Decimais', 'Resolver contas com alinhamento das casas e estimativa.', ['Somar e subtrair decimais', 'Multiplicar e dividir decimais', 'Conferir resultados'], { difficulty: 'Médio', estimatedMinutes: 16, order: 2 }),
      lesson('decimal-fractions', 'fracoes-e-decimais', 'Relação entre Frações e Decimais', 'Converter representações e interpretar percentuais simples.', ['Converter frações em decimais', 'Ler medidas e preços', 'Preparar base para porcentagem'], { difficulty: 'Médio', estimatedMinutes: 17, order: 3, prerequisites: ['fractions-intro'] }),
    ],
  ),
  topic(
    {
      id: 'geometry-basics',
      title: 'Geometria Básica',
      description: 'Formas planas, medidas, perímetro e área como base geométrica do Fundamental.',
      level: 'Fundamental',
      stage: '6º ano',
      category: 'Geometria',
      icon: 'Square',
      order: 40,
      tags: ['geometria', 'perimetro', 'area'],
      overview: 'Reúne leitura geométrica, perímetro, área e organização espacial para o Fundamental.',
    },
    [
      lesson(
        'geometry-perimeter',
        'perimetros-e-poligonos',
        'Perímetros e Polígonos',
        'Distingue contorno e área com figuras simples.',
        ['Somar lados de figuras', 'Distinguir área de perímetro'],
        {
          difficulty: 'Fácil',
          estimatedMinutes: 13,
          order: 1,
          status: ready,
          body: `
# O que é Perímetro?

Perímetro é a medida do **contorno** de uma figura.

## Exemplos

- Quadrado de lado 4: $4 + 4 + 4 + 4 = 16$
- Retângulo de lados 6 e 2: $6 + 2 + 6 + 2 = 16$

## Diferença importante

- **Área:** espaço interno
- **Perímetro:** contorno
`,
        },
      ),
      lesson(
        'geometry-triangles',
        'triangulos-e-areas',
        'Triângulos e Áreas',
        'Apresenta a fórmula da área do triângulo e a ideia de base e altura.',
        ['Calcular área de triângulos', 'Interpretar base e altura'],
        {
          difficulty: 'Médio',
          estimatedMinutes: 15,
          order: 2,
          status: ready,
          body: `
# Área de Triângulos

A área de um triângulo é metade da área de um retângulo com a mesma base e a mesma altura.

## Fórmula

$A = \\frac{b \\times h}{2}$

## Atenção

A altura precisa ser **perpendicular** à base.
`,
        },
      ),
      lesson('geometry-units', 'medidas-e-conversoes', 'Medidas, Unidades e Conversões', 'Organiza medidas de comprimento, área e capacidade em situações práticas.', ['Converter unidades', 'Escolher unidade adequada', 'Resolver problemas com medidas'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'integers',
      title: 'Números Inteiros',
      description: 'Comparação, módulo, reta numérica e operações com sinais.',
      level: 'Fundamental',
      stage: '7º ano',
      category: 'Números e Operações',
      icon: 'Minus',
      order: 50,
      tags: ['inteiros', 'sinais', 'reta numerica'],
      overview: 'Módulo focado em interpretação de sinais e operações com números inteiros.',
    },
    [
      lesson('integers-meaning', 'significado-e-reta', 'Reta Numérica e Significado dos Sinais', 'Apresenta os inteiros em situações como temperatura e saldo.', ['Ler números negativos', 'Usar reta numérica', 'Comparar inteiros'], { difficulty: 'Fácil', estimatedMinutes: 14, order: 1 }),
      lesson('integers-operations', 'operacoes-com-inteiros', 'Operações com Números Inteiros', 'Trabalha adição, subtração, multiplicação e divisão com sinais.', ['Somar inteiros', 'Aplicar regra de sinais', 'Resolver expressões'], { difficulty: 'Médio', estimatedMinutes: 17, order: 2 }),
      lesson('integers-problems', 'problemas-com-inteiros', 'Problemas com Inteiros', 'Contextualiza os inteiros em saldo, altitude e variação.', ['Modelar problemas', 'Escolher operação correta', 'Interpretar resultados'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'ratio-proportion-percentage',
      title: 'Razão, Proporção e Porcentagem',
      description: 'Escalas, comparações, taxas e resolução de problemas proporcionais.',
      level: 'Fundamental',
      stage: '7º ano',
      category: 'Álgebra',
      icon: 'Percent',
      order: 60,
      tags: ['razao', 'proporcao', 'porcentagem'],
      overview: 'Estrutura clássica de 7º ano para porcentagem, regra de três e leitura proporcional.',
    },
    [
      lesson('ratio-concept', 'razao-e-escala', 'Razão e Escala', 'Introduz comparação entre grandezas e leitura de escalas.', ['Montar razões', 'Interpretar escalas', 'Comparar grandezas'], { difficulty: 'Fácil', estimatedMinutes: 15, order: 1 }),
      lesson('proportion-rule', 'proporcao-e-regra-de-tres', 'Proporção e Regra de Três', 'Formaliza proporcionalidade direta e inversa em problemas simples.', ['Resolver regra de três', 'Montar proporções', 'Conferir unidades'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('percentage-intro', 'porcentagem-no-cotidiano', 'Porcentagem no Cotidiano', 'Conecta porcentagem a descontos, acréscimos e interpretações rápidas.', ['Transformar porcentagem em fração e decimal', 'Calcular percentuais', 'Interpretar variações'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'algebra-foundations',
      title: 'Álgebra Inicial',
      description: 'Expressões algébricas, padrões, sequência de raciocínio e generalização.',
      level: 'Fundamental',
      stage: '7º ano',
      category: 'Álgebra',
      icon: 'Variable',
      order: 70,
      tags: ['algebra', 'expressoes', 'padroes'],
      overview: 'Prepara o terreno para equações por meio de linguagem algébrica e padrões.',
    },
    [
      lesson('algebra-variables', 'variaveis-e-expressoes', 'Variáveis e Expressões', 'Introduz letras como representação de valores e expressões simples.', ['Ler expressões algébricas', 'Substituir valores', 'Relacionar linguagem e símbolos'], { difficulty: 'Fácil', estimatedMinutes: 14, order: 1 }),
      lesson('algebra-like-terms', 'termos-semelhantes', 'Termos Semelhantes e Simplificação', 'Agrupa termos e simplifica expressões com sentido.', ['Identificar termos semelhantes', 'Simplificar expressões', 'Evitar erros de sinal'], { difficulty: 'Médio', estimatedMinutes: 17, order: 2 }),
      lesson('algebra-patterns', 'padroes-e-generalizacao', 'Padrões, Sequências e Generalização', 'Liga padrões numéricos à construção de fórmulas.', ['Descrever padrões', 'Criar lei de formação', 'Preparar funções futuras'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'angles-polygons',
      title: 'Ângulos e Polígonos',
      description: 'Leitura angular, classificação de figuras e propriedades de polígonos.',
      level: 'Fundamental',
      stage: '7º ano',
      category: 'Geometria',
      icon: 'Protractor',
      order: 80,
      tags: ['angulos', 'poligonos'],
      overview: 'Dá base para somas de ângulos, classificação de triângulos e leitura geométrica.',
    },
    [
      lesson('angles-measure', 'medida-e-classificacao', 'Medida e Classificação de Ângulos', 'Classifica ângulos e usa transferidor conceitualmente.', ['Reconhecer tipos de ângulo', 'Estimar medidas', 'Ler abertura angular'], { difficulty: 'Fácil', estimatedMinutes: 14, order: 1 }),
      lesson('polygons-properties', 'classificacao-de-poligonos', 'Classificação de Polígonos', 'Organiza polígonos por lados, ângulos e regularidade.', ['Nomear polígonos', 'Comparar propriedades', 'Classificar figuras'], { difficulty: 'Médio', estimatedMinutes: 16, order: 2 }),
      lesson('triangles-angles', 'soma-dos-angulos', 'Soma dos Ângulos e Triângulos', 'Relaciona soma angular e classificação de triângulos.', ['Aplicar soma dos ângulos internos', 'Classificar triângulos', 'Resolver problemas geométricos'], { difficulty: 'Médio', estimatedMinutes: 17, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'linear-equations',
      title: 'Equações do 1º Grau',
      description: 'Equilíbrio algébrico, modelagem de problemas e resolução de equações lineares.',
      level: 'Fundamental',
      stage: '8º ano',
      category: 'Álgebra',
      icon: 'Variable',
      order: 90,
      tags: ['equacoes', '1-grau', 'algebra'],
      overview: 'Módulo central do 8º ano para resolver equações e problemas por modelagem.',
    },
    [
      lesson(
        'linear-intro',
        'o-que-e-uma-equacao',
        'O que é uma Equação?',
        'Interpreta a igualdade como equilíbrio e introduz procedimentos de isolamento.',
        ['Interpretar igualdade como equilíbrio', 'Isolar o valor de x'],
        {
          difficulty: 'Fácil',
          estimatedMinutes: 14,
          order: 1,
          status: ready,
          body: `
# Equações do 1º Grau

Uma equação funciona como uma **balança em equilíbrio**. O objetivo é descobrir qual valor deixa os dois lados iguais.

## Regra de ouro

Tudo que você fizer de um lado da igualdade deve fazer do outro.

## Exemplo

$x + 5 = 12$

Subtraindo 5 dos dois lados:

$x = 7$
`,
        },
      ),
      lesson(
        'linear-problems',
        'problemas-com-equacoes',
        'Problemas com Equações',
        'Transforma enunciados em equações lineares simples.',
        ['Traduzir frases em equações', 'Modelar problemas simples'],
        {
          difficulty: 'Médio',
          estimatedMinutes: 18,
          order: 2,
          prerequisites: ['linear-intro'],
          status: ready,
          body: `
# Modelando Situações

Muitas questões de texto podem ser resolvidas transformando a frase em equação.

## Passo a passo

1. Defina a incógnita.
2. Traduza a informação do enunciado.
3. Resolva a equação.
4. Confira se a resposta faz sentido.

## Exemplo

"O dobro de um número mais 3 é 17."

Se o número é $x$, então:

$2x + 3 = 17$

$2x = 14$

$x = 7$
`,
        },
      ),
      lesson('linear-equations-forms', 'equacoes-com-parenteses-e-fracoes', 'Equações com Parênteses e Frações', 'Amplia o repertório para equações lineares mais elaboradas.', ['Resolver distributiva em equações', 'Lidar com frações em equações', 'Revisar etapas algébricas'], { difficulty: 'Difícil', estimatedMinutes: 19, order: 3, prerequisites: ['linear-problems'] }),
    ],
  ),
  topic(
    {
      id: 'linear-systems',
      title: 'Sistemas Lineares',
      description: 'Interseção de equações, substituição e interpretação de soluções.',
      level: 'Fundamental',
      stage: '8º ano',
      category: 'Álgebra',
      icon: 'GitMerge',
      order: 100,
      tags: ['sistemas', 'equacoes'],
      overview: 'Módulo para resolver sistemas 2x2 e compreender o significado geométrico da solução.',
    },
    [
      lesson('systems-intro', 'duas-equacoes-duas-incognitas', 'Duas Equações e Duas Incógnitas', 'Apresenta o que significa resolver um sistema linear 2x2.', ['Interpretar solução de sistema', 'Relacionar pares ordenados', 'Ler problemas com duas incógnitas'], { difficulty: 'Médio', estimatedMinutes: 16, order: 1 }),
      lesson('systems-substitution', 'metodo-da-substituicao', 'Método da Substituição', 'Resolve sistemas isolando uma variável e substituindo.', ['Isolar variáveis', 'Substituir corretamente', 'Verificar solução'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('systems-problems', 'problemas-com-sistemas', 'Problemas com Sistemas', 'Modela situações com duas informações e duas incógnitas.', ['Montar sistemas por texto', 'Interpretar solução', 'Comparar métodos'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'powers-roots',
      title: 'Potenciação e Radiciação',
      description: 'Potências, raízes, notação científica e propriedades operatórias.',
      level: 'Fundamental',
      stage: '8º ano',
      category: 'Números e Operações',
      icon: 'Sigma',
      order: 110,
      tags: ['potencias', 'raizes', 'notacao-cientifica'],
      overview: 'Conecta expoentes, raízes e escrita abreviada de números muito grandes ou muito pequenos.',
    },
    [
      lesson('powers-exponents', 'potencias-e-propriedades', 'Potências e Propriedades', 'Apresenta base, expoente e regras iniciais.', ['Ler potências', 'Aplicar propriedades simples', 'Comparar ordens de grandeza'], { difficulty: 'Médio', estimatedMinutes: 16, order: 1 }),
      lesson('roots-square', 'raiz-quadrada-e-cubica', 'Raiz Quadrada e Cúbica', 'Interpreta radiciação como operação inversa da potenciação.', ['Reconhecer quadrados perfeitos', 'Estimar raízes', 'Relacionar potência e raiz'], { difficulty: 'Médio', estimatedMinutes: 17, order: 2 }),
      lesson('scientific-notation', 'notacao-cientifica', 'Notação Científica', 'Aplica potências de 10 à escrita científica.', ['Escrever em notação científica', 'Comparar ordens de grandeza', 'Ler dados reais'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
      lesson('powers-chapter-review', 'revisao-e-gabarito-de-potenciacao', 'Revisão e Gabarito de Potenciação', 'Consolida o capítulo com aplicações, questões de prova e gabarito completo.', ['Revisar propriedades de potência', 'Aplicar potências de 10 e ordem de grandeza', 'Conferir respostas com gabarito oficial'], { difficulty: 'Difícil', estimatedMinutes: 28, order: 4, prerequisites: ['powers-exponents', 'scientific-notation'] }),
    ],
  ),
  topic(
    {
      id: 'statistics-probability',
      title: 'Estatística e Probabilidade',
      description: 'Leitura de tabelas, gráficos e experimentos aleatórios básicos.',
      level: 'Fundamental',
      stage: '8º ano',
      category: 'Estatística',
      icon: 'BarChart3',
      order: 120,
      tags: ['estatistica', 'probabilidade', 'graficos'],
      overview: 'Introduz análise de dados e eventos aleatórios com linguagem acessível.',
    },
    [
      lesson('stats-tables', 'tabelas-e-graficos', 'Tabelas e Gráficos', 'Organiza dados e interpreta representações visuais.', ['Ler tabelas', 'Interpretar gráficos', 'Comparar categorias'], { difficulty: 'Fácil', estimatedMinutes: 14, order: 1 }),
      lesson('stats-average', 'media-mediana-e-moda', 'Média, Mediana e Moda', 'Apresenta medidas-resumo de conjuntos de dados.', ['Calcular média', 'Encontrar mediana', 'Reconhecer moda'], { difficulty: 'Médio', estimatedMinutes: 17, order: 2 }),
      lesson('probability-basics', 'experimentos-aleatorios', 'Experimentos Aleatórios e Probabilidade Básica', 'Trabalha espaço amostral simples e chance de eventos.', ['Descrever espaço amostral', 'Calcular probabilidades simples', 'Interpretar resultados'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'functions',
      title: 'Funções',
      description: 'Introdução à ideia de dependência entre grandezas, tabelas e gráficos.',
      level: 'Fundamental',
      stage: '9º ano',
      category: 'Álgebra',
      icon: 'Activity',
      order: 130,
      tags: ['funcoes', 'graficos', 'plano-cartesiano'],
      overview: 'Faz a ponte do 9º ano para o Ensino Médio por meio do conceito de função.',
    },
    [
      lesson(
        'functions-intro',
        'o-que-e-uma-funcao',
        'O que é uma Função?',
        'Relaciona entrada, saída, domínio e imagem em exemplos simples.',
        ['Relacionar entrada e saída', 'Entender domínio e imagem'],
        {
          difficulty: 'Fácil',
          estimatedMinutes: 14,
          order: 1,
          status: ready,
          body: `
# Funções Matemáticas

Uma função associa cada valor de entrada a um único valor de saída.

## Notação

$f(x) = y$

Se $f(x) = 2x + 3$, então:

- $f(1) = 5$
- $f(2) = 7$
- $f(5) = 13$
`,
        },
      ),
      lesson(
        'functions-graphs',
        'graficos-e-crescimento',
        'Gráficos e Crescimento',
        'Lê tendências e comportamento de uma função em gráfico simples.',
        ['Ler pontos de um gráfico', 'Identificar crescimento e decrescimento'],
        {
          difficulty: 'Médio',
          estimatedMinutes: 16,
          order: 2,
          status: ready,
          body: `
# Lendo Gráficos

Um gráfico mostra como a função se comporta visualmente.

## Observações importantes

- Quando a reta sobe, a função é crescente.
- Quando a reta desce, a função é decrescente.
- O ponto onde corta o eixo $y$ é o valor de $f(0)$.
`,
        },
      ),
      lesson('functions-cartesian', 'plano-cartesiano-e-pares-ordenados', 'Plano Cartesiano e Pares Ordenados', 'Conecta localização no plano a leitura de gráficos e tabelas.', ['Localizar pontos', 'Ler eixos', 'Relacionar tabela e gráfico'], { difficulty: 'Médio', estimatedMinutes: 17, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'quadratic-equations',
      title: 'Equações do 2º Grau',
      description: 'Fatoração, raízes, discriminante e interpretação algébrica.',
      level: 'Fundamental',
      stage: '9º ano',
      category: 'Álgebra',
      icon: 'FunctionSquare',
      order: 140,
      tags: ['equacoes', '2-grau', 'bhaskara'],
      overview: 'Módulo do 9º ano para avançar da álgebra linear à quadrática.',
    },
    [
      lesson('quadratic-intro', 'forma-geral-e-exemplos', 'Forma Geral e Exemplos', 'Apresenta o que caracteriza uma equação do 2º grau.', ['Identificar equações quadráticas', 'Organizar a forma geral', 'Comparar com 1º grau'], { difficulty: 'Médio', estimatedMinutes: 16, order: 1 }),
      lesson('quadratic-factoring', 'fatoracao-e-produto-nulo', 'Fatoração e Produto Nulo', 'Resolve equações fatoráveis com interpretação das raízes.', ['Fatorar expressões', 'Aplicar produto nulo', 'Checar soluções'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('quadratic-bhaskara', 'formula-de-bhaskara', 'Fórmula de Bhaskara', 'Usa discriminante e fórmula para resolver equações gerais.', ['Calcular delta', 'Aplicar Bhaskara', 'Interpretar número de raízes'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'geometry-similarity',
      title: 'Semelhança e Relações Métricas',
      description: 'Semelhança de triângulos, Teorema de Pitágoras e relações métricas.',
      level: 'Fundamental',
      stage: '9º ano',
      category: 'Geometria',
      icon: 'Triangle',
      order: 150,
      tags: ['semelhanca', 'pitagoras', 'triangulos'],
      overview: 'Organiza os resultados geométricos mais cobrados na transição para o Ensino Médio.',
    },
    [
      lesson('similarity-concept', 'semelhanca-de-triangulos', 'Semelhança de Triângulos', 'Trabalha proporcionalidade entre lados correspondentes.', ['Reconhecer figuras semelhantes', 'Montar proporções', 'Comparar escalas'], { difficulty: 'Médio', estimatedMinutes: 17, order: 1 }),
      lesson('pythagoras-theorem', 'teorema-de-pitagoras', 'Teorema de Pitágoras', 'Aplica a relação $a^2+b^2=c^2$ em problemas clássicos.', ['Identificar hipotenusa', 'Aplicar Pitágoras', 'Resolver problemas geométricos'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('metric-relations', 'relacoes-metricas-no-triangulo-retangulo', 'Relações Métricas no Triângulo Retângulo', 'Amplia Pitágoras para projeções e alturas.', ['Usar relações métricas', 'Relacionar projeções', 'Resolver questões mais elaboradas'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'spatial-geometry',
      title: 'Geometria Espacial',
      description: 'Prismas, pirâmides, cilindros, volume e área total.',
      level: 'Fundamental',
      stage: '9º ano',
      category: 'Geometria',
      icon: 'Boxes',
      order: 160,
      tags: ['espacial', 'volume', 'solidos'],
      overview: 'Fecha o ciclo do Fundamental com sólidos geométricos e cálculo de volumes.',
    },
    [
      lesson('spatial-solids', 'solidos-geometricos', 'Sólidos Geométricos e Planificações', 'Apresenta prismas, pirâmides, cones, cilindros e esferas.', ['Reconhecer sólidos', 'Relacionar faces, vértices e arestas', 'Interpretar planificações'], { difficulty: 'Fácil', estimatedMinutes: 15, order: 1 }),
      lesson('spatial-volume', 'volume-de-prismas-e-cilindros', 'Volume de Prismas e Cilindros', 'Calcula volume e compara capacidade.', ['Usar fórmulas de volume', 'Comparar unidades cúbicas', 'Resolver problemas práticos'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('spatial-area', 'area-total-dos-solidos', 'Área Total dos Sólidos', 'Calcula superfície total a partir das faces e planificações.', ['Somar áreas de faces', 'Relacionar planificação e sólido', 'Escolher fórmula adequada'], { difficulty: 'Médio', estimatedMinutes: 18, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'function-affine',
      title: 'Função Afim',
      description: 'Coeficientes, gráfico de reta, taxa de variação e aplicações.',
      level: 'Médio',
      stage: '1ª série',
      category: 'Funções',
      icon: 'LineChart',
      order: 170,
      tags: ['funcao-afim', 'reta', 'taxa-de-variacao'],
      overview: 'Primeiro módulo do Médio para formalizar funções lineares e leitura de coeficientes.',
    },
    [
      lesson('affine-concept', 'coeficientes-e-forma-ax-b', 'Coeficientes e Forma $ax+b$', 'Interpreta coeficientes angular e linear.', ['Reconhecer forma afim', 'Ler coeficientes', 'Relacionar regra e gráfico'], { difficulty: 'Médio', estimatedMinutes: 17, order: 1 }),
      lesson('affine-graph', 'grafico-da-funcao-afim', 'Gráfico da Função Afim', 'Constrói retas a partir de pares ordenados e interceptos.', ['Encontrar pontos', 'Traçar reta', 'Interpretar crescimento'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('affine-problems', 'modelagem-com-funcao-afim', 'Modelagem com Função Afim', 'Aplica função afim em custo fixo, tarifa e variação constante.', ['Modelar situações reais', 'Identificar taxa constante', 'Resolver problemas'], { difficulty: 'Difícil', estimatedMinutes: 19, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'function-quadratic',
      title: 'Função Quadrática',
      description: 'Parábola, vértice, zeros e interpretação de concavidade.',
      level: 'Médio',
      stage: '1ª série',
      category: 'Funções',
      icon: 'FunctionSquare',
      order: 180,
      tags: ['funcao-quadratica', 'parabola'],
      overview: 'Expande a visão funcional para o comportamento da parábola e seus elementos principais.',
    },
    [
      lesson('quadratic-function-concept', 'forma-ax2-bx-c', 'Forma $ax^2+bx+c$', 'Identifica coeficientes e concavidade da parábola.', ['Reconhecer função quadrática', 'Interpretar coeficiente a', 'Comparar gráficos'], { difficulty: 'Médio', estimatedMinutes: 17, order: 1 }),
      lesson('quadratic-function-zeros', 'zeros-e-intersecoes', 'Zeros da Função e Interseções', 'Relaciona raízes da equação aos pontos no eixo x.', ['Encontrar zeros', 'Relacionar equação e gráfico', 'Analisar discriminante'], { difficulty: 'Médio', estimatedMinutes: 19, order: 2 }),
      lesson('quadratic-function-vertex', 'vertice-e-maximos', 'Vértice, Máximos e Mínimos', 'Usa o vértice para interpretar extremos e problemas.', ['Calcular vértice', 'Interpretar máximos e mínimos', 'Resolver problemas de otimização simples'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'trigonometry',
      title: 'Trigonometria',
      description: 'Razões trigonométricas, ângulos notáveis e aplicações no triângulo retângulo.',
      level: 'Médio',
      stage: '1ª série',
      category: 'Geometria',
      icon: 'Triangle',
      order: 190,
      tags: ['trigonometria', 'triangulo-retangulo'],
      overview: 'Módulo estruturado para leitura de triângulos, razões e aplicações.',
    },
    [
      lesson(
        'trigonometry-intro',
        'seno-cosseno-e-tangente',
        'Seno, Cosseno e Tangente',
        'Apresenta as razões trigonométricas no triângulo retângulo.',
        ['Reconhecer razões trigonométricas', 'Ler triângulos retângulos'],
        {
          difficulty: 'Médio',
          estimatedMinutes: 17,
          order: 1,
          status: ready,
          body: `
# Razões Trigonométricas

No triângulo retângulo:

- **Seno:** cateto oposto / hipotenusa
- **Cosseno:** cateto adjacente / hipotenusa
- **Tangente:** cateto oposto / cateto adjacente

## Dica

Sempre escolha um ângulo de referência antes de decidir quem é oposto ou adjacente.
`,
        },
      ),
      lesson(
        'trigonometry-angles',
        'angulos-notaveis',
        'Ângulos Notáveis',
        'Organiza senos e cossenos de 30°, 45° e 60°.',
        ['Memorizar valores clássicos', 'Resolver problemas rápidos'],
        {
          difficulty: 'Médio',
          estimatedMinutes: 15,
          order: 2,
          status: ready,
          body: `
# Ângulos de 30°, 45° e 60°

Os ângulos notáveis aparecem com frequência em provas.

## Valores importantes

- $\\sin 30° = 1/2$
- $\\cos 60° = 1/2$
- $\\sin 45° = \\cos 45° = \\sqrt{2}/2$

## Estratégia

Monte uma pequena tabela mental e treine reconhecer padrões.
`,
        },
      ),
      lesson('trigonometry-applications', 'aplicacoes-no-triangulo-retangulo', 'Aplicações no Triângulo Retângulo', 'Resolve altura, distância e inclinação com trigonometria.', ['Escolher razão adequada', 'Montar equação trigonométrica simples', 'Interpretar contexto geométrico'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'combinatorics-probability',
      title: 'Análise Combinatória e Probabilidade',
      description: 'Contagem, arranjos intuitivos, princípio multiplicativo e probabilidades.',
      level: 'Médio',
      stage: '1ª série',
      category: 'Estatística',
      icon: 'Shuffle',
      order: 200,
      tags: ['combinatoria', 'probabilidade'],
      overview: 'Módulo para contagem e cálculo de chances em problemas mais estruturados.',
    },
    [
      lesson('counting-principle', 'principio-fundamental-da-contagem', 'Princípio Fundamental da Contagem', 'Conta possibilidades por multiplicação de etapas.', ['Separar etapas', 'Aplicar princípio multiplicativo', 'Evitar dupla contagem'], { difficulty: 'Médio', estimatedMinutes: 17, order: 1 }),
      lesson('combinatorics-arrangements', 'arranjos-permutacoes-e-combinacoes', 'Arranjos, Permutações e Combinações', 'Organiza quando ordem importa e quando não importa.', ['Distinguir tipos de contagem', 'Escolher fórmula adequada', 'Interpretar ordem'], { difficulty: 'Difícil', estimatedMinutes: 21, order: 2 }),
      lesson('probability-combinatorics', 'probabilidade-com-espaco-amostral', 'Probabilidade com Espaço Amostral Finito', 'Liga contagem a probabilidade em problemas combinatórios.', ['Construir espaço amostral', 'Calcular probabilidades', 'Usar contagem como apoio'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'exponential-logarithmic',
      title: 'Função Exponencial e Logarítmica',
      description: 'Crescimento exponencial, mudança de base e leitura de fenômenos.',
      level: 'Médio',
      stage: '2ª série',
      category: 'Funções',
      icon: 'TrendingUp',
      order: 210,
      tags: ['exponencial', 'logaritmo'],
      overview: 'Reúne crescimento exponencial, função logarítmica e aplicações em escalas e juros.',
    },
    [
      lesson('exponential-function', 'funcao-exponencial', 'Função Exponencial', 'Apresenta crescimento e decrescimento exponencial.', ['Ler potência com variável no expoente', 'Comparar crescimento', 'Interpretar gráficos exponenciais'], { difficulty: 'Médio', estimatedMinutes: 18, order: 1 }),
      lesson('logarithm-concept', 'conceito-de-logaritmo', 'Conceito de Logaritmo', 'Mostra logaritmo como operação inversa da exponenciação.', ['Relacionar exponencial e logaritmo', 'Resolver igualdades simples', 'Interpretar base'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 2 }),
      lesson('exp-log-applications', 'aplicacoes-em-juros-e-escalas', 'Aplicações em Juros e Escalas', 'Conecta exponenciais e logaritmos a juros compostos e escalas.', ['Modelar crescimento percentual', 'Interpretar escalas logarítmicas', 'Ler problemas contextualizados'], { difficulty: 'Difícil', estimatedMinutes: 21, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'progressions',
      title: 'Progressões',
      description: 'PA, PG, termos gerais, soma e leitura de padrões.',
      level: 'Médio',
      stage: '2ª série',
      category: 'Álgebra',
      icon: 'ListOrdered',
      order: 220,
      tags: ['pa', 'pg', 'sequencias'],
      overview: 'Módulo para sequências, regularidade e fórmulas fechadas de PA e PG.',
    },
    [
      lesson('progressions-patterns', 'sequencias-e-padroes', 'Sequências e Padrões', 'Identifica regularidades antes de formalizar PA e PG.', ['Descrever regularidades', 'Comparar variações', 'Construir próximos termos'], { difficulty: 'Fácil', estimatedMinutes: 15, order: 1 }),
      lesson('arithmetic-progression', 'progressao-aritmetica', 'Progressão Aritmética', 'Trabalha razão, termo geral e soma de termos.', ['Calcular razão', 'Encontrar termo geral', 'Somar termos'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('geometric-progression', 'progressao-geometrica', 'Progressão Geométrica', 'Apresenta crescimento multiplicativo e soma finita.', ['Calcular razão geométrica', 'Encontrar termos', 'Comparar PA e PG'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'analytic-geometry',
      title: 'Geometria Analítica',
      description: 'Plano cartesiano, distância, ponto médio e equações de reta.',
      level: 'Médio',
      stage: '2ª série',
      category: 'Geometria',
      icon: 'Map',
      order: 230,
      tags: ['geometria-analitica', 'reta', 'plano-cartesiano'],
      overview: 'Transforma geometria em linguagem algébrica por meio do plano cartesiano.',
    },
    [
      lesson('analytic-points', 'distancia-e-ponto-medio', 'Distância entre Pontos e Ponto Médio', 'Calcula medidas no plano cartesiano.', ['Aplicar fórmula da distância', 'Encontrar ponto médio', 'Interpretar coordenadas'], { difficulty: 'Médio', estimatedMinutes: 18, order: 1 }),
      lesson('analytic-line', 'equacao-reduzida-da-reta', 'Equação Reduzida da Reta', 'Relaciona inclinação, intercepto e equação da reta.', ['Ler coeficiente angular', 'Montar equação da reta', 'Relacionar gráfico e equação'], { difficulty: 'Médio', estimatedMinutes: 19, order: 2 }),
      lesson('analytic-parallelism', 'paralelismo-e-perpendicularidade', 'Paralelismo e Perpendicularidade', 'Usa coeficientes angulares para comparar retas.', ['Comparar inclinações', 'Reconhecer paralelismo', 'Resolver problemas analíticos'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'matrices-systems',
      title: 'Matrizes, Determinantes e Sistemas',
      description: 'Organização matricial, operações e solução de sistemas lineares.',
      level: 'Médio',
      stage: '2ª série',
      category: 'Álgebra',
      icon: 'Table2',
      order: 240,
      tags: ['matrizes', 'determinantes', 'sistemas'],
      overview: 'Introduz linguagem matricial e sua aplicação à resolução de sistemas.',
    },
    [
      lesson('matrices-intro', 'matrizes-e-operacoes', 'Matrizes e Operações Básicas', 'Apresenta ordem, elementos e operações iniciais.', ['Ler matrizes', 'Somar matrizes', 'Multiplicar por escalar'], { difficulty: 'Médio', estimatedMinutes: 18, order: 1 }),
      lesson('determinants-intro', 'determinantes-de-ordem-2-e-3', 'Determinantes de Ordem 2 e 3', 'Calcula determinantes simples e interpreta singularidade.', ['Calcular determinantes', 'Usar regra de Sarrus', 'Comparar resultados'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 2 }),
      lesson('matrices-systems-solving', 'sistemas-por-matrizes', 'Sistemas por Matrizes', 'Conecta sistema linear a matriz associada e resolução.', ['Montar matriz aumentada', 'Interpretar soluções', 'Revisar sistemas lineares'], { difficulty: 'Difícil', estimatedMinutes: 21, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'polynomials',
      title: 'Polinômios',
      description: 'Operações, fatoração e identidades algébricas.',
      level: 'Médio',
      stage: '3ª série',
      category: 'Álgebra',
      icon: 'Sigma',
      order: 250,
      tags: ['polinomios', 'fatoracao'],
      overview: 'Reúne manipulação algébrica mais formal para vestibular e revisão de base.',
    },
    [
      lesson('polynomials-operations', 'operacoes-com-polinomios', 'Operações com Polinômios', 'Soma, subtração e multiplicação algébrica entre polinômios.', ['Organizar termos', 'Multiplicar polinômios', 'Reduzir expressão final'], { difficulty: 'Médio', estimatedMinutes: 18, order: 1 }),
      lesson('polynomials-factorization', 'fatoracao-e-produtos-notaveis', 'Fatoração e Produtos Notáveis', 'Apresenta casos clássicos de fatoração e expansão.', ['Reconhecer produtos notáveis', 'Fatorar expressões', 'Escolher estratégia algébrica'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 2 }),
      lesson('polynomials-division', 'divisao-e-teorema-do-resto', 'Divisão de Polinômios e Teorema do Resto', 'Amplia o repertório para divisão e análise de raízes.', ['Executar divisão algébrica', 'Aplicar teorema do resto', 'Relacionar com raízes'], { difficulty: 'Difícil', estimatedMinutes: 22, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'complex-numbers',
      title: 'Números Complexos',
      description: 'Unidade imaginária, forma algébrica e operações em $\\mathbb{C}$.',
      level: 'Médio',
      stage: '3ª série',
      category: 'Álgebra',
      icon: 'Orbit',
      order: 260,
      tags: ['complexos', 'imaginaros'],
      overview: 'Apresenta o conjunto dos complexos como extensão natural dos reais.',
    },
    [
      lesson('complex-unit', 'unidade-imaginaria', 'Unidade Imaginária e Forma Algébrica', 'Introduz $i$ e a escrita $a+bi$.', ['Reconhecer unidade imaginária', 'Escrever forma algébrica', 'Comparar parte real e imaginária'], { difficulty: 'Médio', estimatedMinutes: 17, order: 1 }),
      lesson('complex-operations', 'operacoes-com-complexos', 'Operações com Complexos', 'Soma, subtração, multiplicação e potências de $i$.', ['Operar complexos', 'Usar ciclo de potências de i', 'Simplificar resultados'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 2 }),
      lesson('complex-equations', 'equacoes-e-aplicacoes', 'Equações e Aplicações com Complexos', 'Relaciona complexos a equações sem solução real.', ['Resolver exemplos simples', 'Interpretar raízes complexas', 'Conectar com polinômios'], { difficulty: 'Difícil', estimatedMinutes: 21, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'descriptive-statistics',
      title: 'Estatística Descritiva',
      description: 'Leitura de gráficos, dispersão, interpretação de dados e tomada de decisão.',
      level: 'Médio',
      stage: '3ª série',
      category: 'Estatística',
      icon: 'ChartColumn',
      order: 270,
      tags: ['estatistica', 'dados', 'graficos'],
      overview: 'Módulo de interpretação de dados com foco em leitura crítica e vestibular.',
    },
    [
      lesson('descriptive-graphics', 'graficos-e-leitura-critica', 'Gráficos e Leitura Crítica', 'Compara escalas, eixos e possíveis distorções visuais.', ['Ler gráficos criticamente', 'Comparar escalas', 'Evitar interpretações apressadas'], { difficulty: 'Médio', estimatedMinutes: 17, order: 1 }),
      lesson('descriptive-dispersion', 'amplitude-e-dispersao', 'Amplitude e Dispersão', 'Introduz medidas que descrevem espalhamento dos dados.', ['Calcular amplitude', 'Interpretar dispersão', 'Comparar conjuntos'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('descriptive-decision', 'estatistica-para-tomada-de-decisao', 'Estatística para Tomada de Decisão', 'Aplica leitura de dados em contextos reais e argumentação.', ['Interpretar indicadores', 'Justificar decisões com dados', 'Comparar cenários'], { difficulty: 'Difícil', estimatedMinutes: 19, order: 3 }),
    ],
  ),
  topic(
    {
      id: 'math-finance',
      title: 'Matemática Financeira',
      description: 'Porcentagem, juros simples, juros compostos e análise de parcelamentos.',
      level: 'Médio',
      stage: '3ª série',
      category: 'Aplicações',
      icon: 'Wallet',
      order: 280,
      tags: ['juros', 'financeira', 'porcentagem'],
      overview: 'Fecha o ciclo do Médio com aplicações financeiras e leitura crítica de valores.',
    },
    [
      lesson('finance-review', 'porcentagem-e-variacao', 'Porcentagem e Variação Percentual', 'Revisa percentuais em cenários de aumento e desconto.', ['Calcular variações percentuais', 'Interpretar crescimento e queda', 'Ler preços e taxas'], { difficulty: 'Médio', estimatedMinutes: 16, order: 1 }),
      lesson('simple-interest', 'juros-simples', 'Juros Simples', 'Modela crescimento linear de capital por taxa e tempo.', ['Aplicar fórmula de juros simples', 'Interpretar montante', 'Resolver problemas básicos'], { difficulty: 'Médio', estimatedMinutes: 18, order: 2 }),
      lesson('compound-interest', 'juros-compostos', 'Juros Compostos e Parcelamentos', 'Trabalha crescimento exponencial e comparação de propostas.', ['Aplicar juros compostos', 'Comparar parcelamentos', 'Interpretar custo total'], { difficulty: 'Difícil', estimatedMinutes: 20, order: 3 }),
    ],
  ),
];

export function getTopicMarkdown(topicEntry) {
  const frontmatter = {
    id: topicEntry.id,
    title: topicEntry.title,
    description: topicEntry.description,
    level: topicEntry.level,
    stage: topicEntry.stage,
    category: topicEntry.category,
    icon: topicEntry.icon,
    order: topicEntry.order,
    tags: topicEntry.tags,
  };

  return { frontmatter, body: `# ${topicEntry.title}\n\n${topicEntry.overview}\n` };
}

export function getLessonMarkdown(topicEntry, lessonEntry) {
  const frontmatter = {
    id: lessonEntry.id,
    topicId: topicEntry.id,
    title: lessonEntry.title,
    difficulty: lessonEntry.difficulty,
    estimatedMinutes: lessonEntry.estimatedMinutes,
    order: lessonEntry.order,
    summary: lessonEntry.summary,
    status: lessonEntry.status,
    goals: lessonEntry.goals,
    prerequisites: lessonEntry.prerequisites,
    tags: lessonEntry.tags,
  };

  return {
    frontmatter,
    body: lessonEntry.body ?? placeholderBody(lessonEntry.title, lessonEntry.summary, lessonEntry.goals),
  };
}
