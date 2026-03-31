# Pacote — visões da matemática pré-superior

Este pacote foi montado para servir como **base de filtros e geração de planos de estudo**.

## Ideia central
Em vez de repetir conteúdo em várias árvores diferentes, o pacote separa:

1. **fonte de verdade**
   - `01_topicos_canonicos.md`

2. **projeções / facetas**
   - `02_visao_por_grandes_ramos.md`
   - `03_visao_por_ano_escolar.md`
   - `04_visao_por_nivel.md`
   - `05_visao_por_perfil_de_prova.md`

3. **metadados de normalização**
   - `06_crosswalk_curriculos_e_sistemas.md`
   - `99_index_ids.csv`

## Como usar no app

### Modo recomendado
- use `topic_id` como chave única
- use os outros arquivos como catálogos de navegação

### Exemplo de fluxo
- usuário escolhe `perfil = ENEM`
- app puxa os IDs em `05_visao_por_perfil_de_prova.md`
- app cruza com o nível atual do aluno
- app ordena pela visão por ano ou por nível
- app monta o plano

## Convenções
- `[opcional]` = nem todo currículo cobra
- `[intermediário]` = muito comum do fim do EF ao EM
- `[avançado]` = comum em trilhas fortes, vestibulares exigentes ou alguns currículos internacionais
- `[ponte]` = tópico de transição entre blocos

## Aviso de escopo
- este pacote cobre **matemática escolar pré-superior**
- foco em **títulos e sub-títulos**
- não contém teoria, explicações ou exemplos resolvidos
