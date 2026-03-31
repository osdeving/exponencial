# Crosswalk de sistemas curriculares e critérios de normalização

> Este arquivo explica **de onde vieram as visões** e como mapear sistemas diferentes para um registro único de tópicos.

## 1. Sistemas usados como referência de normalização

### Brasil
- BNCC — Educação Básica
- Uso nesta pasta:
  - visão por ano escolar em linguagem brasileira
  - núcleo escolar / BNCC
  - compatibilização com ENEM

### Estados Unidos
- Common Core State Standards for Mathematics
- Uso nesta pasta:
  - progressão K–8 por série
  - organização do ensino médio por grandes categorias conceituais

### Inglaterra
- National Curriculum in England — Mathematics Programmes of Study
- Uso nesta pasta:
  - progressão year-by-year em primary
  - key stages e separação de conteúdos estatutários / não estatutários
  - ênfase em fluência, raciocínio e resolução de problemas

### Índia
- CBSE / NCERT (IX–X e XI–XII)
- Uso nesta pasta:
  - reforço de trilhas com álgebra, trigonometria, matrizes, vetores, cálculo e probabilidade
  - referência para tópicos opcionais de fim de ensino médio

### China
- Compulsory Education Mathematics Curriculum Standards (referência de alto nível)
- Uso nesta pasta:
  - confirmação de uma espinha dorsal muito próxima da progressão internacional em números, álgebra, geometria, estatística e probabilidade

### IB / MYP
- MYP Mathematics
- Uso nesta pasta:
  - validação internacional dos eixos: number, algebra, geometry & trigonometry, statistics & probability

## 2. Equivalências aproximadas de etapas

### Brasil
- Educação Infantil
- Ensino Fundamental — 1º ao 9º ano
- Ensino Médio — 1ª à 3ª série

### EUA / Common Core
- Kindergarten
- Grade 1 a Grade 8
- High School — conceptual categories

### Inglaterra
- Year 1 a Year 6 — Key Stages 1 e 2
- Year 7 a Year 9 — Key Stage 3
- Year 10 e Year 11 — Key Stage 4 / GCSE phase

### Índia
- Classes I–V
- Classes VI–VIII
- Classes IX–X
- Classes XI–XII

### China
- Grades 1–6 — primary
- Grades 7–9 — lower secondary compulsory
- upper secondary varia por trilha e província

### IB
- MYP 1–5 — aproximadamente 11 a 16 anos
- depois depende da trilha DP/CP da escola

## 3. Regra de normalização adotada

### 3.1. Fonte de verdade
- `01_topicos_canonicos.md` é a fonte de verdade de IDs.

### 3.2. Semântica
- um tópico canônico deve representar **uma habilidade/conceito escolar reconhecível**
- as outras visões apenas **reagrupam** os mesmos IDs

### 3.3. Granularidade
- granularidade alvo: “sumário de livro grande”
- não é microgranularidade de item de aula
- exemplo:
  - inclui `frações equivalentes`
  - não desce até “exemplo 1: pizza / exemplo 2: régua”

### 3.4. Tags
- `[opcional]` — aparece em alguns sistemas, itinerários ou cursos, mas não em todos
- `[intermediário]` — típico do fim do EF e EM
- `[avançado]` — aparece fortemente em trilhas exigentes, vestibulares fortes ou currículos internacionais avançados
- `[ponte]` — tópico colocado como ligação entre blocos

## 4. Como ler as visões desta pasta

### 4.1. Visão por ramos
- melhor para taxonomia da disciplina
- útil para cadastro mestre de capítulos

### 4.2. Visão por ano escolar
- melhor para trilhas pedagógicas e plano espiral
- é uma **síntese de consenso**, não uma imposição legal universal

### 4.3. Visão por nível
- melhor para filtros de dificuldade / profundidade

### 4.4. Visão por perfil de prova
- melhor para filtros por objetivo
- útil para “modo ENEM”, “modo militar”, “modo ITA”

## 5. Observações importantes para o app

### 5.1. Não duplicação
- use o ID canônico como chave primária
- trate as demais visões como “índices” ou “facetas”

### 5.2. Relações úteis
- `topic_id`
- `title`
- `branch_view`
- `school_year_view`
- `level_view`
- `exam_profile_view`
- `is_optional`
- `is_advanced`

### 5.3. Sobre o ENEM
- o ENEM é oficialmente descrito por matriz de competências e habilidades
- a visão desta pasta é uma **topicalização operacional**
- portanto, a visão “ENEM” é um mapa prático, não uma transcrição literal do documento oficial

### 5.4. Sobre “nível militar”
- não existe um único “militar”
- nesta pasta o termo foi quebrado em:
  - militar base — CPCAR/EPCAR-style
  - militar médio/avançado — EsPCEx-style
  - topo / ITA-like

## 6. Estrutura sugerida de dados

```text
topic_id
parent_topic_id
title
branch
school_year_band
level_band
exam_profiles[]
flags[]
```

## 7. Arquivos desta pasta

- `01_topicos_canonicos.md`
- `02_visao_por_grandes_ramos.md`
- `03_visao_por_ano_escolar.md`
- `04_visao_por_nivel.md`
- `05_visao_por_perfil_de_prova.md`
- `06_crosswalk_curriculos_e_sistemas.md`
- `99_index_ids.csv`
